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

const SCENE_LABELS: Record<string, string> = {
  hook: 'The Setup',
  problem: 'The Problem',
  transition: 'The Reality',
  solution: 'The Solution',
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
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];
  const sceneLabel = SCENE_LABELS[baseSceneKey];

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg-light)' }}
    >
      {/* Static deep ambient orbs */}
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
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
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
            animate={{ opacity: [0.6, 1, 0.6] }}
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

      {/* Lumio wordmark */}
      <div
        className="absolute bottom-7 right-8 z-50"
      >
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
