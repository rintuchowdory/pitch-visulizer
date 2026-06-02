import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const DOTS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.sin(i * 0.9) * 42 + 50,
  y: Math.cos(i * 0.7) * 35 + 50,
  size: 2 + (i % 3) * 2,
  delay: i * 0.08,
  dur: 2.8 + (i % 4) * 0.6,
}));

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10 grain-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(16px)' }}
      transition={{ duration: 0.9 }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '55vw', height: '55vw',
            left: '5%', top: '-10%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '40vw', height: '40vw',
            right: '0%', bottom: '0%',
            background: 'radial-gradient(circle, rgba(255,107,107,0.18) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Floating connection dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {DOTS.map((d) => (
          <motion.circle
            key={d.id}
            cx={`${d.x}%`} cy={`${d.y}%`}
            r={d.size * 0.25}
            fill="rgba(167,139,250,0.55)"
            initial={{ opacity: 0, scale: 0 }}
            animate={phase >= 1 ? { opacity: [0.3, 0.8, 0.3], scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        <motion.path
          d="M 15,50 C 30,25 70,75 85,50"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="0.4"
          strokeDasharray="120"
          initial={{ strokeDashoffset: 120, opacity: 0 }}
          animate={phase >= 2 ? { strokeDashoffset: 0, opacity: 0.6 } : {}}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="1" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating human illustration */}
      <motion.div
        className="absolute right-[6vw] top-1/2 z-10 pointer-events-none"
        style={{ width: '22vw', transform: 'translateY(-50%)' }}
        initial={{ opacity: 0, x: 60, scale: 0.9 }}
        animate={phase >= 2 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.9 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src="/pitch-video/images/human_connected.png"
          alt=""
          className="w-full h-auto drop-shadow-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Text */}
      <div className="relative text-center w-full max-w-5xl px-10 z-10" style={{ marginRight: '18vw' }}>
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="text-[6.5vw] leading-tight font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            initial={{ y: '110%', rotate: 4 }}
            animate={phase >= 1 ? { y: '0%', rotate: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            We're more connected
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="text-[6.5vw] leading-tight font-bold italic text-gradient-cool"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ y: '110%', rotate: -4 }}
            animate={phase >= 2 ? { y: '0%', rotate: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            than ever before.
          </motion.h1>
        </div>

        <motion.p
          className="mt-8 text-[1.6vw] tracking-[0.3em] uppercase"
          style={{ color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          A story about remote work
        </motion.p>
      </div>
    </motion.div>
  );
}
