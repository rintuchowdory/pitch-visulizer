import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BEFORE_PINGS = [
  { icon: '💬', label: '47 unread', x: '8%',  y: '18%', delay: 0 },
  { icon: '🔔', label: '@here urgent', x: '5%', y: '42%', delay: 0.1 },
  { icon: '📅', label: 'Missed standup', x: '12%', y: '65%', delay: 0.18 },
  { icon: '⚡', label: 'PR needed NOW', x: '4%', y: '80%', delay: 0.08 },
];

export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 150),   // divider
      setTimeout(() => setPhase(2), 600),   // before side
      setTimeout(() => setPhase(3), 1600),  // after side
      setTimeout(() => setPhase(4), 2600),  // team image
      setTimeout(() => setPhase(5), 3600),  // bottom cta
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-10 overflow-hidden"
      style={{ background: 'var(--color-bg-dark)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
      transition={{ duration: 0.8 }}
    >
      {/* ── BEFORE half ──────────────────────────────── */}
      <motion.div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.06) 0%, transparent 60%)' }}
        initial={{ width: '0%' }}
        animate={phase >= 2 ? { width: '50%' } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Red ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(255,107,107,0.09) 0%, transparent 70%)' }}
        />

        {/* BEFORE label */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full flex items-center gap-2"
          style={{ background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.3)' }}
          initial={{ opacity: 0, y: -10 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,150,150,0.9)' }}>
            Before Lumio
          </span>
        </motion.div>

        {/* Overwhelmed person */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: '28vw', left: '50%', top: '48%', transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={phase >= 2 ? { opacity: 0.85, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <motion.img
            src="/pitch-video/images/human_isolated.png"
            alt=""
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 0 24px rgba(255,107,107,0.3)) saturate(0.7)' }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Ping notifications */}
        {BEFORE_PINGS.map((p, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              left: p.x, top: p.y,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,107,107,0.2)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + p.delay }}
          >
            <span className="text-sm">{p.icon}</span>
            <span className="text-xs whitespace-nowrap" style={{ color: 'rgba(255,200,200,0.7)' }}>{p.label}</span>
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-red-400"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: p.delay }}
            />
          </motion.div>
        ))}

        {/* Stress meter */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,150,150,0.6)' }}>Burnout risk</span>
          <div className="w-32 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #FF6B6B, #ff3030)' }}
              initial={{ width: '0%' }}
              animate={phase >= 2 ? { width: '82%' } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            />
          </div>
          <span className="text-sm font-bold" style={{ color: '#FF6B6B' }}>82%</span>
        </motion.div>
      </motion.div>

      {/* ── Animated divider ──────────────────────────── */}
      <motion.div
        className="absolute inset-y-0 z-30 flex flex-col items-center justify-center"
        style={{ left: 'calc(50% - 1px)', width: '2px' }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={phase >= 1 ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-full flex-1"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(167,139,250,0.6) 30%, rgba(255,107,107,0.6) 70%, transparent)' }}
        />
      </motion.div>

      {/* VS badge on divider */}
      <motion.div
        className="absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #FF6B6B, #A78BFA)',
          boxShadow: '0 0 30px rgba(167,139,250,0.5)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={phase >= 2 ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.4 }}
      >
        <span className="text-white text-xs font-black">VS</span>
      </motion.div>

      {/* ── AFTER half ───────────────────────────────── */}
      <motion.div
        className="absolute inset-y-0 right-0 overflow-hidden"
        style={{ background: 'linear-gradient(225deg, rgba(107,203,119,0.06) 0%, rgba(167,139,250,0.04) 50%, transparent 70%)' }}
        initial={{ width: '0%' }}
        animate={phase >= 3 ? { width: '50%' } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Purple ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 70% 50%, rgba(167,139,250,0.1) 0%, transparent 70%)' }}
        />

        {/* AFTER label */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full flex items-center gap-2"
          style={{ background: 'rgba(107,203,119,0.12)', border: '1px solid rgba(107,203,119,0.3)' }}
          initial={{ opacity: 0, y: -10 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(107,203,119,0.9)' }}>
            With Lumio
          </span>
        </motion.div>

        {/* Team illustration */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: '28vw', left: '50%', top: '48%', transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={phase >= 4 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src="/pitch-video/images/human_team.png"
            alt=""
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 0 30px rgba(107,203,119,0.35))' }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Lumio UI card */}
        <motion.div
          className="absolute rounded-2xl px-4 py-3 flex items-start gap-3"
          style={{
            top: '16%', right: '6%',
            width: '20vw',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(107,203,119,0.25)',
            boxShadow: '0 8px 40px rgba(107,203,119,0.12)',
          }}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={phase >= 3 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.25 }}
        >
          <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #A78BFA, #60A5FA)' }}>S</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold" style={{ color: 'rgba(240,238,255,0.9)' }}>Sarah Chen</span>
              <span className="text-[10px]" style={{ color: 'rgba(160,157,191,0.6)' }}>just now</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,198,225,0.75)' }}>
              Just shipped the new feature! 🎉 Thanks team for the support
            </p>
            <div className="mt-2 flex gap-1">
              {['🎉','❤️','🚀'].map((e,i) => (
                <motion.span
                  key={e}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  initial={{ scale: 0 }}
                  animate={phase >= 3 ? { scale: 1 } : {}}
                  transition={{ type: 'spring', delay: 0.5 + i * 0.1 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Wellbeing bar */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(107,203,119,0.6)' }}>Team energy</span>
          <div className="w-32 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #6BCB77, #60A5FA)' }}
              initial={{ width: '0%' }}
              animate={phase >= 4 ? { width: '91%' } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
          <span className="text-sm font-bold" style={{ color: '#6BCB77' }}>91%</span>
        </motion.div>
      </motion.div>

      {/* ── Bottom comparison strip ───────────────────── */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-6 px-8"
        initial={{ opacity: 0, y: 12 }}
        animate={phase >= 5 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {[
          { label: 'Burnout', before: '82%↑', after: '18%↓', color: '#FF6B6B' },
          { label: 'Retention', before: '61%', after: '94%', color: '#6BCB77' },
          { label: 'Engagement', before: '2.1×', after: '4.8×', color: '#A78BFA' },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 px-4 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-xs tracking-wider uppercase" style={{ color: 'rgba(160,157,191,0.6)' }}>{stat.label}</span>
            <span className="text-xs font-bold" style={{ color: 'rgba(255,150,150,0.8)' }}>{stat.before}</span>
            <span style={{ color: 'rgba(160,157,191,0.4)', fontSize: '10px' }}>→</span>
            <span className="text-xs font-bold" style={{ color: stat.color }}>{stat.after}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
