import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10 grain-overlay overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Radiating rings */}
      {[1, 2, 3, 4].map((r) => (
        <motion.div
          key={r}
          className="absolute rounded-full border pointer-events-none"
          style={{
            borderColor: `rgba(167,139,250,${0.15 - r * 0.025})`,
            width: `${r * 20}vw`,
            height: `${r * 20}vw`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: r * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Glow core */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        initial={{ scale: 0 }}
        animate={phase >= 1 ? { scale: 1 } : {}}
        transition={{ duration: 1.5 }}
      />

      {/* Lumio mark */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: '7vw', height: '7vw',
          background: 'linear-gradient(135deg, #FF6B6B, #A78BFA)',
          boxShadow: '0 0 60px rgba(167,139,250,0.5), 0 0 120px rgba(255,107,107,0.25)',
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={phase >= 1 ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.1 }}
      >
        <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '2.5vw', fontWeight: 700 }}>L</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="absolute text-center px-8 z-10"
        style={{ top: '56%' }}
        initial={{ opacity: 0, y: 24 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <h2
          className="font-bold leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '4vw',
            color: 'var(--color-text-primary)',
          }}
        >
          Because teams are made of{' '}
          <span className="italic text-gradient-cool">people.</span>
        </h2>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="absolute text-center z-10"
        style={{ top: '78%' }}
        initial={{ opacity: 0, y: 10 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-[1.8vw] font-semibold tracking-[0.25em] uppercase text-gradient-cool"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          lumio.com
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
