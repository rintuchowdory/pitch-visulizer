import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  hook: 3500,
  problem: 4500,
  transition: 3000,
  solution: 5000,
  outro: 4000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  hook: Scene1,
  problem: Scene2,
  transition: Scene3,
  solution: Scene4,
  outro: Scene5,
};

const bgPositions = [
  { x: '10vw', y: '10vh', scale: 1, opacity: 0.6, bg: 'var(--color-secondary)' },
  { x: '50vw', y: '50vh', scale: 1.5, opacity: 0.2, bg: 'var(--color-bg-dark)' },
  { x: '30vw', y: '60vh', scale: 0.8, opacity: 0.4, bg: 'var(--color-text-muted)' },
  { x: '70vw', y: '20vh', scale: 2, opacity: 0.8, bg: 'var(--color-primary)' },
  { x: '40vw', y: '40vh', scale: 1.2, opacity: 0.7, bg: 'var(--color-secondary)' },
];

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg-light)' }}
    >
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
        <motion.div
          className="absolute w-[80vw] h-[80vw] rounded-full blur-[100px]"
          animate={{
            x: ['-20%', '10%', '-10%'],
            y: ['-10%', '20%', '0%'],
            scale: [1, 1.1, 0.9],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, var(--color-bg-muted), transparent 70%)' }}
        />
      </div>

      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full blur-[80px] z-0"
        animate={{
          x: bgPositions[sceneIndex]?.x || '50vw',
          y: bgPositions[sceneIndex]?.y || '50vh',
          scale: bgPositions[sceneIndex]?.scale || 1,
          opacity: bgPositions[sceneIndex]?.opacity || 0.5,
          backgroundColor: bgPositions[sceneIndex]?.bg || 'var(--color-primary)',
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
