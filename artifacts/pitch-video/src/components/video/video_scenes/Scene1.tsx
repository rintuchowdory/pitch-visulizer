import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10"
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative text-center w-full max-w-5xl px-8">
        <motion.h1 
          className="text-[6vw] leading-tight text-text-primary"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="block overflow-hidden">
            <motion.span 
              className="block"
              initial={{ y: '100%', rotate: 5 }}
              animate={phase >= 1 ? { y: '0%', rotate: 0 } : { y: '100%', rotate: 5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              We're more connected
            </motion.span>
          </span>
          <span className="block overflow-hidden italic text-primary">
            <motion.span 
              className="block"
              initial={{ y: '100%', rotate: -5 }}
              animate={phase >= 2 ? { y: '0%', rotate: 0 } : { y: '100%', rotate: -5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              than ever before.
            </motion.span>
          </span>
        </motion.h1>

        {/* Floating connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <motion.path 
            d="M 100,200 C 300,100 700,300 900,200"
            fill="transparent"
            stroke="var(--color-secondary)"
            strokeWidth="3"
            strokeDasharray="1000"
            initial={{ strokeDashoffset: 1000, opacity: 0 }}
            animate={phase >= 1 ? { strokeDashoffset: 0, opacity: 0.4 } : { strokeDashoffset: 1000, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
