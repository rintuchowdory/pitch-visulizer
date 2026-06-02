import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <motion.p 
          className="text-[3vw] text-text-secondary uppercase tracking-widest font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          More Slack pings.
        </motion.p>
        
        <motion.div
          className="h-px bg-text-muted my-6 mx-auto"
          initial={{ width: 0 }}
          animate={phase >= 2 ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        <motion.p 
          className="text-[3vw] text-text-primary uppercase tracking-widest font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Fewer real conversations.
        </motion.p>
      </div>
    </motion.div>
  );
}
