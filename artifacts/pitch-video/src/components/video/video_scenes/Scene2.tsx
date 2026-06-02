import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600), // First ping
      setTimeout(() => setPhase(3), 1000), // Second ping
      setTimeout(() => setPhase(4), 1400), // Third ping
      setTimeout(() => setPhase(5), 2200), // Text reveal
      setTimeout(() => setPhase(6), 3500), // Exit drift
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10 bg-bg-dark text-text-inverse"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Abstract Ping bubbles */}
        <PingBubble x="20vw" y="30vh" delay={0} show={phase >= 2} />
        <PingBubble x="70vw" y="60vh" delay={0.1} show={phase >= 3} />
        <PingBubble x="80vw" y="20vh" delay={0.2} show={phase >= 4} />
        <PingBubble x="15vw" y="70vh" delay={0.15} show={phase >= 3} />
        <PingBubble x="50vw" y="80vh" delay={0.05} show={phase >= 4} />
      </div>

      <div className="relative text-center z-20">
        <motion.h2 
          className="text-[5vw] leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          But we've never felt
          <br/>
          <span className="text-secondary italic">more isolated.</span>
        </motion.h2>
      </div>
    </motion.div>
  );
}

function PingBubble({ x, y, delay, show }: { x: string, y: string, delay: number, show: boolean }) {
  return (
    <motion.div
      className="absolute bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 border border-white/5"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={show ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
    >
      <div className="w-8 h-8 rounded-full bg-primary/80" />
      <div className="w-24 h-3 bg-white/20 rounded-full" />
    </motion.div>
  );
}
