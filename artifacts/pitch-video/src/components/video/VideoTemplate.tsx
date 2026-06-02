import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS: Record<string, number> = {
  hook: 3500,
  problem: 4500,
  transition: 3000,
  solution: 5000,
  beforeafter: 5500,
  outro: 4000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  hook: Scene1,
  problem: Scene2,
  transition: Scene3,
  solution: Scene4,
  beforeafter: Scene6,
  outro: Scene5,
};

const SCENE_LABELS: Record<string, string> = {
  hook: 'The Setup',
  problem: 'The Problem',
  transition: 'The Reality',
  solution: 'The Solution',
  beforeafter: 'Before vs After',
  outro: 'The Vision',
};

const bgOrbs = [
  { color: 'rgba(167,139,250,0.18)', x: '-10%', y: '-15%', size: '70vw' },
  { color: 'rgba(255,107,107,0.12)', x: '60%',  y: '50%',  size: '50vw' },
  { color: 'rgba(96,165,250,0.10)',  x: '30%',  y: '80%',  size: '40vw' },
];

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];
  const sceneLabel = SCENE_LABELS[baseSceneKey];
  const sceneDuration = durations[baseSceneKey] ?? durations[currentSceneKey] ?? 0;

  // Countdown — pauses when video is paused
  const [remaining, setRemaining] = useState(sceneDuration);
  const startRef = useRef(performance.now());
  const elapsedAtPauseRef = useRef(0);

  // Reset on scene change
  useEffect(() => {
    elapsedAtPauseRef.current = 0;
    startRef.current = performance.now();
    setRemaining(sceneDuration);
  }, [currentSceneKey, sceneDuration]);

  // Tick while playing; freeze while paused
  useEffect(() => {
    if (paused) {
      // Capture how much has elapsed so far
      elapsedAtPauseRef.current += performance.now() - startRef.current;
      return;
    }
    // Resume: restart the clock from where we left off
    startRef.current = performance.now();
    const id = window.setInterval(() => {
      const elapsed = elapsedAtPauseRef.current + (performance.now() - startRef.current);
      setRemaining(Math.max(0, sceneDuration - elapsed));
    }, 100);
    return () => window.clearInterval(id);
  }, [paused, currentSceneKey, sceneDuration]);

  const remainingSec = Math.ceil(remaining / 1000);
  const progress = sceneDuration > 0 ? Math.max(0, Math.min(1, 1 - remaining / sceneDuration)) : 0;
  const circumference = 2 * Math.PI * 14;

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg-light)' }}
    >
      {/* Ambient orbs */}
      {bgOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size, height: orb.size,
            left: orb.x, top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={paused ? {} : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Scene */}
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>

      {/* Pause overlay */}
      <AnimatePresence>
        {paused && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(7,7,15,0.45)', backdropFilter: 'blur(2px)' }}
            />
            <motion.div
              className="relative flex items-center gap-3"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div
                className="flex items-center gap-2 px-6 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="3" width="4" height="14" rx="1.5" fill="rgba(240,238,255,0.7)" />
                  <rect x="12" y="3" width="4" height="14" rx="1.5" fill="rgba(240,238,255,0.7)" />
                </svg>
                <span
                  className="text-sm font-semibold tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(240,238,255,0.7)' }}
                >
                  Paused
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene title badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={baseSceneKey}
          className="absolute top-7 left-8 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: 'linear-gradient(135deg, #FF6B6B, #A78BFA)' }}
            animate={paused ? { opacity: 0.4 } : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'rgba(240,238,255,0.7)', fontFamily: 'var(--font-body)' }}
          >
            {sceneLabel}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Countdown ring */}
      <div className="absolute top-7 right-8 z-50 flex items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
          <circle
            cx="18" cy="18" r="14"
            fill="none"
            stroke="url(#timerGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference * progress,
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>
        </svg>
        <span
          className="text-xs font-bold tabular-nums"
          style={{ color: 'rgba(240,238,255,0.55)', fontFamily: 'var(--font-body)', minWidth: '1.5ch' }}
        >
          {remainingSec}s
        </span>
      </div>

      {/* Lumio wordmark */}
      <div className="absolute bottom-7 right-8 z-50">
        <span
          className="text-sm font-bold tracking-widest opacity-30"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          LUMIO
        </span>
      </div>
    </div>
  );
}
