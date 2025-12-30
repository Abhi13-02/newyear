'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react'; // removed unused imports
import { Gift, Brain, Briefcase, CloudRain, MapPin, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Predefined chaos for the cards to avoid hydration mismatch
const cards = [
  { id: 1, text: 'Stress', color: 'bg-yellow-200 text-yellow-800', icon: Brain, rotate: 12, x: -5, y: -10 },
  { id: 2, text: 'Work', color: 'bg-orange-200 text-orange-800', icon: Briefcase, rotate: -8, x: 5, y: 5 },
  { id: 3, text: 'Bad Days', color: 'bg-pink-200 text-pink-800', icon: CloudRain, rotate: 6, x: -8, y: 8 },
  { id: 4, text: 'Distance', color: 'bg-blue-200 text-blue-800', icon: MapPin, rotate: -15, x: 10, y: -5 },
  { id: 5, text: 'Overthinking', color: 'bg-purple-200 text-purple-800', icon: Zap, rotate: 3, x: 0, y: 0 },
];

export default function Distractions({ onComplete }: { onComplete: () => void }) {
  // const [clearedCards, setClearedCards] = useState<number[]>([]); // unused currently

  const handleDragEnd = (id: number) => {
    // Optional: track if all cards are moved
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-20 text-center z-10 pointer-events-none"
      >
        <h2 className="text-3xl font-bold mb-2">Something is waiting for you</h2>
        <p className="text-gray-400">Move the little distractions aside</p>
      </motion.div>

      {/* The Gift (Hidden behind cards) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="z-0 w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 cursor-pointer"
      >
        <Gift size={40} className="text-white" />
      </motion.button>

      {/* Draggable Cards */}
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          animate={{ 
            opacity: 1, 
            rotate: card.rotate,
            x: card.x,
            y: card.y,
            transition: { duration: 0.5 }
          }}
          style={{ 
            zIndex: 20 + i, // Ensure cards are always above the gift (z-0)
            marginTop: card.y,
            marginLeft: card.x,
          }}
          drag
          dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
          whileHover={{ scale: 1.05, cursor: 'grab', zIndex: 100 }}
          whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 100 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          className={cn(
            "absolute top-1/2 left-1/2 w-40 h-52 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-xl flex items-center justify-center flex-col p-4 select-none gap-4",
            card.color
          )}
        >
          <card.icon size={48} className="opacity-80" />
          <span className="font-bold text-lg">{card.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
