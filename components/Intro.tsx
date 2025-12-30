'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHolding = useRef(false);
  const completed = useRef(false);

  const startHolding = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent default to stop mixed mouse/touch events firing double
    // e.preventDefault(); // Sometimes prevents clicking, be careful. 
    // Instead check if we are already holding or completed.
    if (isHolding.current || completed.current) return;

    isHolding.current = true;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (!completed.current) {
             completed.current = true;
             onComplete();
          }
          return 100;
        }
        return prev + 2; 
      });
    }, 20);
  };

  const stopHolding = () => {
    if (completed.current) return;
    isHolding.current = false;
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
    setProgress(0); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400">
          A little surprise for you
        </h1>
        <p className="text-gray-400 mt-2">Before this year begins</p>
      </motion.div>

      <div className="relative">
        {/* Progress Ring */}
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-gray-800"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-pink-500"
            strokeDasharray="377"
            strokeDashoffset={377 - (377 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>

        {/* Heart Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onMouseDown={startHolding}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
          onTouchStart={startHolding}
          onTouchEnd={stopHolding}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
               scale: isHolding.current ? [1, 1.2, 1] : 1,
            }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            <Heart size={48} className="text-pink-400 fill-pink-400" />
          </motion.div>
        </motion.div>
      </div>

      <p className="text-sm text-gray-500 animate-pulse">Tap and hold</p>
    </div>
  );
}
