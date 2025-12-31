'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Gift, BookOpen, FileCode, GraduationCap, Brain, Zap, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

// Vibrant, colorful cards with different colors
const cards = [
  { 
    id: 1, 
    text: 'Stress', 
    color: 'bg-gradient-to-br from-yellow-700 to-yellow-900 text-white', 
    icon: Brain, 
    rotate: 12, 
    x: -5, 
    y: -10,
    shadow: 'shadow-red-500/50'
  },
  { 
    id: 2, 
    text: 'College', 
    color: 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white', 
    icon: GraduationCap, 
    rotate: -8, 
    x: 5, 
    y: 5,
    shadow: 'shadow-blue-500/50'
  },
  { 
    id: 3, 
    text: 'Exams', 
    color: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white', 
    icon: BookOpen, 
    rotate: 6, 
    x: -8, 
    y: 8,
    shadow: 'shadow-orange-500/50'
  },
  { 
    id: 4, 
    text: 'Long Distance', 
    color: 'bg-gradient-to-br from-green-700 to-green-800 text-white', 
    icon: MapPin, 
    rotate: -15, 
    x: 10, 
    y: -5,
    shadow: 'shadow-green-500/50'
  },
  { 
    id: 5, 
    text: 'Overthinking', 
    color: 'bg-gradient-to-br from-purple-700 to-purple-800 text-white', 
    icon: Zap, 
    rotate: 3, 
    x: 0, 
    y: 0,
    shadow: 'shadow-purple-500/50'
  },
];

export default function Distractions({ onComplete }: { onComplete: () => void }) {
  const [clearedCards, setClearedCards] = useState<Set<number>>(new Set());
  const [allCleared, setAllCleared] = useState(false);
  const completedRef = useRef(false); // Track if we've already called onComplete

  useEffect(() => {
    if (clearedCards.size === cards.length && !allCleared) {
      setAllCleared(true);
      
      // Canvas confetti celebration
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      // Auto-advance after confetti - only call once
      let timeoutId: NodeJS.Timeout | null = null;
      if (!completedRef.current) {
        completedRef.current = true;
        timeoutId = setTimeout(() => {
          console.log('Distractions - setTimeout fired, calling onComplete');
          onComplete();
        }, 3500);
      }

      // IMPORTANT: Clean up both interval AND timeout
      return () => {
        console.log('Distractions - Cleanup: clearing interval and timeout');
        clearInterval(interval);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [clearedCards, allCleared]); // Remove onComplete from dependencies

  const handleDragEnd = (cardId: number, event: any, info: any) => {
    // Check if card is moved away from the gift box center (150px radius)
    const card = cards.find(c => c.id === cardId);
    if (!card) return;
    
    // Calculate distance from center considering the card's offset position
    const finalX = card.x + info.offset.x;
    const finalY = card.y + info.offset.y;
    const distanceFromCenter = Math.sqrt(finalX ** 2 + finalY ** 2);
    
    // If card is more than 150px from center, mark as cleared
    if (distanceFromCenter > 50) {
      setClearedCards(prev => new Set([...prev, cardId]));
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-20 text-center z-10 pointer-events-none"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Something is waiting for you
        </h2>
        <p className="text-gray-400">Move the distractions aside</p>
      </motion.div>

      {/* Enhanced Gift with Multiple Animation Layers */}
      <div className="relative z-0">
        {/* Pulsing Glow Effect */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 -m-8 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-full blur-xl"
        />

        {/* Particle burst effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
            animate={{
              x: [0, Math.cos(i * Math.PI / 4) * 60],
              y: [0, Math.sin(i * Math.PI / 4) * 60],
              opacity: [1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}

        {/* The Main Gift Button */}
        <motion.button
          whileHover={{ 
            scale: 1.15,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={allCleared ? onComplete : undefined}
          initial={{ scale: 0, rotate: -180 }}
          animate={allCleared ? {
            scale: [1, 1.3, 1.2, 1.3, 1.2],
            rotate: [0, 360],
            y: [0, -40, 0, -30, 0, -20, 0],
          } : { 
            scale: 1, 
            rotate: 0,
            y: [0, -10, 0],
          }}
          transition={allCleared ? {
            scale: { duration: 2, times: [0, 0.3, 0.5, 0.7, 1] },
            rotate: { duration: 0.8 },
            y: { duration: 2, times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1] },
          } : { 
            scale: { delay: 0.5, type: 'spring', stiffness: 200 },
            rotate: { delay: 0.5, type: 'spring' },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-32 h-32 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/50 cursor-pointer border-4 border-white/20"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Gift size={56} className="text-white drop-shadow-lg" />
          </motion.div>
        </motion.button>
      </div>

      {/* Draggable Cards - Colorful */}
      {cards.map((card, i) => {
        const IconComponent = card.icon; // Extract icon to a capitalized variable
        return (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: clearedCards.has(card.id) ? 0 : 1, 
            scale: clearedCards.has(card.id) ? 0 : 1,
            rotate: card.rotate,
            x: card.x,
            y: card.y,
          }}
          style={{ 
            zIndex: 20 + i,
            marginTop: card.y,
            marginLeft: card.x,
          }}
          drag
          dragElastic={0.2}
          onDragEnd={(event, info) => handleDragEnd(card.id, event, info)}
          whileHover={{ 
            scale: 1.08, 
            cursor: 'grab', 
            zIndex: 100,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
          whileDrag={{ 
            scale: 1.15, 
            cursor: 'grabbing', 
            zIndex: 100,
            rotate: 0,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}
          transition={{ delay: 0.8 + i * 0.15, type: 'spring', stiffness: 260, damping: 20 }}
          className={cn(
            "absolute top-1/2 left-1/2 w-44 h-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl flex items-center justify-center flex-col p-6 select-none gap-4 border-2 border-white/20",
            card.color,
            card.shadow
          )}
        >
          {/* Icon with animation */}
          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          >
            <IconComponent size={56} className="opacity-90 drop-shadow-lg relative z-10" strokeWidth={2.5} />
          </motion.div>
          
          {/* Text with bold styling */}
          <span className="font-black text-xl tracking-tight relative z-10 drop-shadow-md uppercase">
            {card.text}
          </span>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-3 left-4 right-4 h-1 bg-white/30 rounded-full" />
        </motion.div>
      )})}
    </div>
  );
}
