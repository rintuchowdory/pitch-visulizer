import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PINGS = [
  { x: '12vw', y: '18vh', label: '47 unread', icon: '💬', delay: 0 },
  { x: '68vw', y: '55vh', label: 'Stand-up in 2m', icon: '📅', delay: 0.12 },
  { x: '78vw', y: '14vh', label: 'PR review needed', icon: '🔔', delay: 0.06 },
  { x: '8vw',  y: '68vh', label: '@here — urgent', icon: '⚡', delay: 0.18 },
  { x: '45vw', y: '78vh', label: 'Are you there?', icon: '👋', delay: 0.09 },
  { x: '55vw', y: '8vh',  label: 'New comment', icon: '💭', delay: 0.22 },
];

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 950),
      setTimeout(() => setPhase(4), 1380),
      setTimeout(() => setPhase(5), 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden grain-overlay"
      style={{ background: 'var(--color-bg-dark)' }}
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ opacity: 0, y: -60, filter: 'blur(10px)' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Red ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,107,107,0.08) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ping bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PINGS.map((p, i) => (
          <PingBubble key={i} x={p.x} y={p.y} label={p.label} icon={p.icon} delay={p.delay} show={phase >= 2 + Math.floor(i / 2)} />
        ))}
      </div>

      {/* Central text */}
      <motion.div
        className="relative text-center z-20 px-12"
        initial={{ opacity: 0, y: 30 }}
        animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <h2
          className="text-[5.5vw] leading-tight font-bold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          But we've never felt
          <br />
          <span className="text-gradient-warm italic">more isolated.</span>
        </h2>
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(7,7,15,0.8) 100%)' }}
      />
    </motion.div>
  );
}

function PingBubble({ x, y, label, icon, delay, show }: {
  x: string; y: string; label: string; icon: string; delay: number; show: boolean;
}) {
  return (
    <motion.div
      className="absolute flex items-center gap-3 px-4 py-3 rounded-2xl border"
      style={{
        left: x, top: y,
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
        borderColor: 'rgba(255,255,255,0.1)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
      }}
      initial={{ scale: 0, opacity: 0, y: 16 }}
      animate={show ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 16 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18, delay }}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'rgba(240,238,255,0.85)' }}>
        {label}
      </span>
      <motion.span
        className="w-2 h-2 rounded-full bg-red-400 ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    </motion.div>
  );
}
