import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    startRecording?: () => Promise<void>;
    stopRecording?: () => void;
  }
}

export interface SceneDurations {
  [key: string]: number;
}

export interface UseVideoPlayerOptions {
  durations: SceneDurations;
  onVideoEnd?: () => void;
  loop?: boolean;
  paused?: boolean;
}

export interface UseVideoPlayerReturn {
  currentScene: number;
  totalScenes: number;
  currentSceneKey: string;
  hasEnded: boolean;
}

export function useVideoPlayer(options: UseVideoPlayerOptions): UseVideoPlayerReturn {
  const { durations, onVideoEnd, loop = true, paused = false } = options;

  // All refs declared together — before any useEffect
  const sceneKeys = useRef(Object.keys(durations)).current;
  const totalScenes = sceneKeys.length;
  const durationsRef = useRef(durations);
  durationsRef.current = durations;

  const elapsedRef = useRef(0);        // ms elapsed in current scene so far
  const startTimeRef = useRef<number | null>(null); // when the current run started
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevSceneRef = useRef(0);       // detect external scene-jump

  const loopRef = useRef(loop);
  loopRef.current = loop;
  const onVideoEndRef = useRef(onVideoEnd);
  onVideoEndRef.current = onVideoEnd;

  const [currentScene, setCurrentScene] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const hasEndedRef = useRef(false);

  // Single combined effect: handles pause/resume/scene-advance
  useEffect(() => {
    // If the scene changed externally (jump), reset elapsed
    if (prevSceneRef.current !== currentScene) {
      elapsedRef.current = 0;
      startTimeRef.current = null;
      prevSceneRef.current = currentScene;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (paused) {
      // Accumulate elapsed up to the pause point
      if (startTimeRef.current !== null) {
        elapsedRef.current += performance.now() - startTimeRef.current;
        startTimeRef.current = null;
      }
      return;
    }

    // Resume: schedule the remaining time
    const sceneDuration = Object.values(durationsRef.current)[currentScene] ?? 2000;
    const remaining = Math.max(0, sceneDuration - elapsedRef.current);
    startTimeRef.current = performance.now();

    timerRef.current = setTimeout(() => {
      elapsedRef.current = 0;
      startTimeRef.current = null;

      setCurrentScene(prev => {
        const next = prev + 1;
        if (next >= totalScenes) {
          if (!hasEndedRef.current) {
            window.stopRecording?.();
            hasEndedRef.current = true;
            setHasEnded(true);
            onVideoEndRef.current?.();
          }
          return loopRef.current ? 0 : prev;
        }
        return next;
      });
    }, remaining);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentScene, paused, totalScenes]);

  // Start recording once on mount
  useEffect(() => {
    window.startRecording?.();
  }, []);

  return {
    currentScene,
    totalScenes,
    currentSceneKey: sceneKeys[currentScene],
    hasEnded,
  };
}

export function useSceneTimer(events: Array<{ time: number; callback: () => void }>) {
  const firedRef = useRef<Set<number>>(new Set());
  const callbacksRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    callbacksRef.current = events.map(e => e.callback);
  }, [events]);

  const scheduleKey = events.map((event, i) => `${i}:${event.time}`).join('|');

  useEffect(() => {
    firedRef.current = new Set();
    const timers = events.map(({ time }, index) =>
      setTimeout(() => {
        if (!firedRef.current.has(index)) {
          firedRef.current.add(index);
          callbacksRef.current[index]?.();
        }
      }, time),
    );
    return () => timers.forEach(clearTimeout);
  }, [scheduleKey]);
}
