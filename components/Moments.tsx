'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const moments = [
  { id: 1, src: '/WhatsApp Image 2025-12-30 at 10.39.01 PM.jpeg', caption: 'Memories' },
  { id: 2, src: '/WhatsApp Image 2025-12-30 at 10.39.38 PM.jpeg', caption: 'Together' },
  { id: 3, src: '/WhatsApp Image 2025-12-30 at 10.40.25 PM.jpeg', caption: 'Smiles' },
  { id: 4, src: '/WhatsApp Image 2025-12-30 at 10.42.21 PM.jpeg', caption: 'Adventures' },
  { id: 5, src: '/WhatsApp Image 2025-12-30 at 10.42.37 PM.jpeg', caption: 'Fun Times' },
  { id: 6, src: '/WhatsApp Image 2025-12-30 at 10.43.17 PM.jpeg', caption: 'Moments' },
  { id: 7, src: '/WhatsApp Image 2025-12-30 at 10.43.39 PM.jpeg', caption: 'Forever' },
];

import Letter from './Letter';

export default function Moments({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [showLetter, setShowLetter] = useState(false);

  const handleTap = () => {
    if (index < moments.length - 1) {
      setIndex(index + 1);
    } else {
      setShowLetter(true);
    }
  };

  if (showLetter) {
    return <Letter />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative z-10 px-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold mb-12 text-center text-white"
        style={{ fontFamily: 'var(--font-comic-neue)' }} // Fallback or use standard Sans
      >
        Some moments from this year
      </motion.h2>

      <div className="relative w-72 h-96 md:w-80 md:h-[28rem] cursor-pointer" onClick={handleTap}>
        <AnimatePresence mode="popLayout">
          {moments.map((moment, i) => {
            if (i < index) return null; // Already shown
            
            const isTop = i === index;
            const offset = (i - index) * 4; // slight offset for stacking effect
            
            return (
              <motion.div
                key={moment.id}
                initial={{ scale: 1 - (i - index) * 0.05, y: offset * 5, opacity: 1 - (i - index) * 0.2 }}
                animate={{ 
                  scale: isTop ? 1 : 1 - (i - index) * 0.05, 
                  y: isTop ? 0 : offset * 5,
                  opacity: 1 - (i - index) * 0.2,
                  rotate: isTop ? 0 : (i % 2 === 0 ? 2 : -2) // Slight random rotation for stack feel
                }}
                exit={{ x: 200, opacity: 0, rotate: 20, transition: { duration: 0.4 } }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="absolute inset-0 bg-white p-3 pb-8 rounded-lg shadow-2xl"
                style={{ 
                  zIndex: moments.length - i,
                  transformOrigin: 'bottom center' 
                }}
              >
                <div className="relative w-full h-full bg-gray-200 overflow-hidden rounded-sm">
                  {/* Using standard img for simplicity with external URLs, or Next Image if configured */}
                  <img src={moment.src} alt={moment.caption} className="w-full h-full object-cover" />
                </div>
                {/* Optional lines at bottom like in screenshot */}
                <div className="mt-4 flex flex-col gap-1 items-center opacity-50">
                    <div className="w-full h-0.5 bg-gray-300 rounded-full" />
                </div>
              </motion.div>
            );
          }).reverse()} {/* Reverse to render bottom first */}
        </AnimatePresence>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
        className="mt-12 text-sm text-gray-400 font-medium"
      >
        Tap the photo to continue
      </motion.p>
    </div>
  );
}
