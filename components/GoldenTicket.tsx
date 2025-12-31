'use client';

import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function GoldenTicket({ onComplete }: { onComplete: () => void }) {
  
  useEffect(() => {
    // Confetti burst on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 relative z-10">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative bg-gradient-to-b from-gray-900 to-black border-4 border-yellow-500/50 rounded-2xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(234,179,8,0.3)]"
      >
        {/* Decorative corner tickets */}
        <div className="absolute -left-3 top-1/2 w-6 h-6 bg-black rounded-full transform -translate-y-1/2 border-r-4 border-yellow-500/50" />
        <div className="absolute -right-3 top-1/2 w-6 h-6 bg-black rounded-full transform -translate-y-1/2 border-l-4 border-yellow-500/50" />

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Ticket className="text-yellow-400 w-8 h-8" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-yellow-400 tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-geist-mono)' }}>
          Golden Ticket
        </h2>
        
        <div className="border-t-2 border-dashed border-yellow-500/30 my-4 w-full" />

        <p className="text-gray-400 text-sm tracking-widest mb-6">VALID FOR EVERY DAY AHEAD</p>
        
        <p className="text-4xl font-handwriting text-white italic mb-8">
          "Unlimited Messages"
        </p>

        <p className="text-xs text-gray-500 mb-8">No expiration date • Non-transferable</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={onComplete}
        className="mt-12 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
      >
        CLAIM TICKET ›
      </motion.button>
    </div>
  );
}
