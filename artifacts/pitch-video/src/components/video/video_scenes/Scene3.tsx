import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10 grain-overlay overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 1.4, opacity: 0, filter: 'blur(14px)' }}
      transition={{ duration: 0.7 }}
    >
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.07), transparent)' }}
          initial={{ width: '0%' }}
          animate={phase >= 1 ? { width: '50%' } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(225deg, rgba(107,203,119,0.07), transparent)' }}
          initial={{ width: '0%' }}
          animate={phase >= 2 ? { width: '50%' } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <div className="relative z-10 text-center px-8 w-full max-w-4xl">
        {/* Stat 1 */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -40 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-[3.8vw] font-bold uppercase tracking-[0.2em] text-gradient-warm"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            More Slack pings.
          </span>
        </motion.div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <motion.div
            className="absolute h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(160,157,191,0.4), transparent)' }}
            initial={{ width: 0 }}
            animate={phase >= 2 ? { width: '100%' } : {}}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
          <motion.span
            className="relative px-6 text-xl"
            style={{
              color: 'var(--color-text-muted)',
              background: 'var(--color-bg-light)',
              fontFamily: 'var(--font-body)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            but
          </motion.span>
        </div>

        {/* Stat 2 */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, x: 40 }}
          animate={phase >= 3 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-[3.8vw] font-bold uppercase tracking-[0.2em] text-gradient-green"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Fewer real conversations.
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
