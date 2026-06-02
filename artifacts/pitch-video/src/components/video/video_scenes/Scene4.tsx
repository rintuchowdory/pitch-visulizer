import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => setPhase(5), 4000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div 
        className="text-center"
        initial={{ y: 50 }}
        animate={phase >= 2 ? { y: -40 } : { y: 50 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1 
          className="text-[8vw] leading-none text-primary"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Lumio.
        </motion.h1>
      </motion.div>

      <div className="absolute top-[55%] flex gap-8">
        <FeatureCard 
          title="Shared Wins" 
          delay={0} 
          show={phase >= 3} 
          icon="🎉" 
        />
        <FeatureCard 
          title="Quiet Struggles" 
          delay={0.1} 
          show={phase >= 4} 
          icon="🌱" 
        />
        <FeatureCard 
          title="Real Connection" 
          delay={0.2} 
          show={phase >= 4} 
          icon="🤝" 
        />
      </div>
    </motion.div>
  );
}

function FeatureCard({ title, delay, show, icon }: { title: string, delay: number, show: boolean, icon: string }) {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-2xl shadow-xl flex flex-col items-center w-48"
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      animate={show ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 20 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-text-primary font-bold text-lg text-center" style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h3>
    </motion.div>
  );
}
