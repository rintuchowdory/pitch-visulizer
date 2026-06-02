import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CARDS = [
  { title: 'Shared Wins', sub: 'Celebrate together', icon: '🎉', color: 'rgba(255,217,61,0.12)', border: 'rgba(255,217,61,0.25)', glow: 'rgba(255,217,61,0.15)' },
  { title: 'Quiet Struggles', sub: 'Feel heard', icon: '🌱', color: 'rgba(107,203,119,0.12)', border: 'rgba(107,203,119,0.25)', glow: 'rgba(107,203,119,0.15)' },
  { title: 'Real Connection', sub: 'Human moments', icon: '✨', color: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.25)', glow: 'rgba(167,139,250,0.15)' },
];

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1700),
      setTimeout(() => setPhase(4), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 grain-overlay overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, x: -80, filter: 'blur(8px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Burst background */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '80vw', height: '80vw',
          background: 'radial-gradient(circle, rgba(255,107,107,0.12) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Rings */}
      {[1, 2, 3].map((r) => (
        <motion.div
          key={r}
          className="absolute rounded-full border pointer-events-none"
          style={{ borderColor: `rgba(255,107,107,${0.08 - r * 0.02})`, width: `${r * 26}vw`, height: `${r * 26}vw` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: r * 0.15, ease: 'easeOut' }}
        />
      ))}

      {/* Logo */}
      <motion.div
        className="relative z-10 text-center"
        animate={phase >= 2 ? { y: '-8vh' } : { y: '0vh' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1
          className="font-bold leading-none text-gradient-warm"
          style={{ fontFamily: 'var(--font-display)', fontSize: '10vw', filter: 'drop-shadow(0 0 40px rgba(255,107,107,0.5))' }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          Lumio.
        </motion.h1>
        <motion.p
          className="text-[1.4vw] tracking-[0.35em] uppercase mt-2"
          style={{ color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          Where teams feel human again
        </motion.p>
      </motion.div>

      {/* Celebrating team illustration */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        style={{ bottom: '4%', right: '5vw', width: '24vw' }}
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={phase >= 4 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.85 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src="/pitch-video/images/human_team.png"
          alt=""
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 0 40px rgba(255,217,61,0.3))' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Feature cards */}
      <motion.div
        className="absolute flex gap-6 z-10"
        style={{ top: '62%' }}
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {CARDS.map((c, i) => (
          <FeatureCard key={c.title} {...c} delay={i * 0.12} show={phase >= 3 + (i > 0 ? 1 : 0)} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({ title, sub, icon, color, border, glow, delay, show }: {
  title: string; sub: string; icon: string;
  color: string; border: string; glow: string;
  delay: number; show: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center rounded-2xl p-6 border"
      style={{
        width: '14vw',
        background: color,
        borderColor: border,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 8px 40px ${glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, delay }}
    >
      <span className="text-[3vw] mb-3">{icon}</span>
      <h3
        className="font-bold text-center mb-1"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4vw',
          color: 'var(--color-text-primary)',
        }}
      >
        {title}
      </h3>
      <p className="text-center text-[1vw]" style={{ color: 'var(--color-text-secondary)' }}>
        {sub}
      </p>
    </motion.div>
  );
}
