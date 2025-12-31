'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Heart, Sparkles, ChevronLeft } from 'lucide-react';

const moments = [
  { id: 1, src: '/kk/WhatsApp Image 2025-12-31 at 4.42.45 PM (1).jpeg', caption: 'kisss!', type: 'image' },
  { id: 2, src: '/kk/WhatsApp Image 2025-12-31 at 4.42.45 PM.jpeg', caption: 'That stare', type: 'image' },
  { id: 3, src: '/kk/WhatsApp Image 2025-12-31 at 4.42.46 PM (1).jpeg', caption: 'Smiles', type: 'image' },
  { id: 4, src: '/kk/WhatsApp Image 2025-12-31 at 4.43.11 PM.jpeg', caption: 'your bangssss', type: 'image' },
  { id: 5, src: '/kk/WhatsApp Image 2025-12-31 at 4.43.12 PM (1).jpeg', caption: 'That huggggg ', type: 'image' },
  { id: 6, src: '/kk/WhatsApp Image 2025-12-31 at 4.43.12 PM.jpeg', caption: 'Cold coffee', type: 'image' },
  { id: 7, src: '/kk/WhatsApp Image 2025-12-31 at 4.43.13 PM (1).jpeg', caption: 'Your smilee', type: 'image' },
  { id: 10, src: '/kk/WhatsApp Video 2025-12-31 at 5.07.16 PM.mp4', caption: 'We', type: 'video' },
  { id: 13, src: '/kk/WhatsApp Video 2025-12-31 at 4.42.46 PM.mp4', caption: 'Us', type: 'video' },
  { id: 9, src: '/kk/WhatsApp Video 2025-12-31 at 4.51.37 PM.mp4', caption: 'More Memories', type: 'video' },
  { id: 11, src: '/kk/WhatsApp Video 2025-12-31 at 5.06.50 PM.mp4', caption: 'Sweet Moments', type: 'video' },
  { id: 12, src: '/kk/WhatsApp Video 2025-12-31 at 5.07.01 PM.mp4', caption: 'Happy Times', type: 'video' },
  { id: 8, src: '/kk/WhatsApp Image 2025-12-31 at 4.43.13 PM.jpeg', caption: 'Haa Haa HAAAA', type: 'image' },
];

import Letter from './Letter';

export default function Moments() {
  const [index, setIndex] = useState(0);
  const [showLetter, setShowLetter] = useState(false);


  const handleNext = () => {
    console.log('Moments - handleNext called, current index:', index, 'total moments:', moments.length);
    if (index < moments.length - 1) {
      setIndex(index + 1);
    } else {
      console.log('Moments - Last photo reached, showing letter');
      setShowLetter(true);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleTap = () => {
    handleNext();
  };

  if (showLetter) {
    console.log('Moments - Rendering Letter');
    return <Letter />;
  }

  console.log('Moments - Rendering photo gallery');

  // Ensure moments are sorted by ID
  const sortedMoments = [...moments].sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900">
      {/* Static Background Gradient - No animation for performance */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-rose-500/20" />

      {/* Reduced Floating Hearts - Only 5 instead of 15 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`heart-bg-${i}`}
          className="absolute text-pink-300/15"
          style={{
            left: `${(i * 20) % 100}%`,
            fontSize: `${30 + (i % 2) * 20}px`,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Reduced Sparkles - Only 6 instead of 20, no rotation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-yellow-200/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: '16px',
          }}
          animate={{
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full relative z-10 px-4 py-12">
        {/* Back Button - Top Center */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          disabled={index === 0}
          whileHover={index > 0 ? { scale: 1.1 } : {}}
          whileTap={index > 0 ? { scale: 0.9 } : {}}
          className={`
            absolute top-6 left-1/2 -translate-x-1/2
            flex items-center justify-center w-10 h-10 rounded-full
            ${index === 0 
              ? 'bg-gray-600/20 cursor-not-allowed opacity-30' 
              : 'bg-gradient-to-r from-pink-500/80 to-rose-500/80 cursor-pointer shadow-lg hover:shadow-pink-500/40'
            }
            transition-all duration-300 backdrop-blur-sm
          `}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: index === 0 ? 0.3 : 0.8, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ChevronLeft 
            size={20} 
            className={`${index === 0 ? 'text-gray-500' : 'text-white'}`}
          />
          
          {/* Glow effect on hover */}
          {index > 0 && (
            <motion.div
              className="absolute inset-0 bg-pink-400 rounded-full blur-md -z-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>

        {/* Title with romantic styling */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-pink-200 via-rose-200 to-purple-200 bg-clip-text text-transparent"
            animate={{
              textShadow: [
                '0 0 20px rgba(255,182,193,0.5)',
                '0 0 40px rgba(255,182,193,0.8)',
                '0 0 20px rgba(255,182,193,0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Our Beautiful Moments
          </motion.h2>
          
          {/* Decorative hearts under title */}
          <motion.div 
            className="flex justify-center gap-3 text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {['💕', '✨', '💕'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Photo Stack Container - Optimized & Taller */}
        <div 
          className="relative w-80 h-[40rem] md:w-96 md:h-[46rem] max-h-[80vh] cursor-pointer touch-none"
          onClick={handleTap}
        >
          <AnimatePresence mode="popLayout">
            {sortedMoments.slice(index, index + 3).map((moment, i) => {
              const isTop = i === 0;
              // Reduced stacking offset for cleaner look on mobile
              const offset = i * 10;
              const scale = 1 - i * 0.05;
              
              // Simplified transform calculation
              const rotation = isTop ? 0 : (i % 2 === 0 ? 3 : -3);

              return (
                <motion.div
                  key={moment.id}
                  initial={false}
                  animate={{ 
                    scale, 
                    y: offset,
                    opacity: 1 - i * 0.2,
                    rotate: rotation,
                    zIndex: 3 - i,
                  }}
                  exit={{ 
                    x: 100, // Reduced swipe distance
                    opacity: 0, 
                    rotate: 10,
                    transition: { duration: 0.2, ease: "easeIn" } 
                  }}
                  transition={{ 
                    duration: 0.3, // Fixed duration is lighter than spring
                    ease: "easeOut" 
                  }}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100"
                  style={{ 
                    transformOrigin: 'bottom center',
                    background: '#fff',
                  }}
                >
                  {/* Simplified Polaroid Frame */}
                  <div className="relative w-full h-full p-3 pb-12 flex flex-col items-center">
                    {/* Image Area - Hardware accelerated */}
                    <div className="relative w-full flex-1 bg-gray-100 rounded-lg overflow-hidden translate-z-0">
                      {moment.type === 'video' ? (
                        /* Only autoplay if it's the top card to save resources */
                        isTop ? (
                          <video 
                            src={moment.src} 
                            className="w-full h-full object-cover pointer-events-none" 
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          /* Static thumbnail/placeholder for non-active videos */
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                             <span className="text-gray-400 text-xs">Video loading...</span>
                          </div>
                        )
                      ) : (
                        <Image 
                          src={moment.src} 
                          alt={moment.caption} 
                          fill
                          className="object-cover object-top pointer-events-none"
                          priority={i === 0}
                          sizes="(max-width: 768px) 90vw, 400px"
                          quality={65} // Lower quality slightly for speed, visually simpler
                        />
                      )}
                      
                      {/* ID Badge - Static */}
                      <div className="absolute top-2 left-2 bg-pink-600/90 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                        #{moment.id}
                      </div>

                      {/* Video indicator - Simplified */}
                      {moment.type === 'video' && (
                        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          VIDEO
                        </div>
                      )}
                    </div>

                    {/* Caption - No expensive background clips */}
                    <div className="mt-4 text-center shrink-0">
                      <p className="text-xl font-bold text-gray-800 font-serif">
                        {moment.caption}
                      </p>
                      <div className="mt-2 w-12 h-1 bg-pink-300 rounded-full mx-auto" />
                    </div>

                    {/* Static Heart Decoration (only top card) */}
                    {isTop && (
                      <div className="absolute top-1 right-1 text-pink-400 opacity-80">
                        <Heart size={18} fill="currentColor" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            }).reverse()}
          </AnimatePresence>
        </div>


        {/* Progress indicator */}
        <motion.div 
          className="mt-8 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {sortedMoments.map((_, i) => (
            <motion.div
              key={i}
              className="h-2 rounded-full"
              animate={{
                width: i === index ? 32 : 8,
                backgroundColor: i === index 
                  ? 'rgb(236, 72, 153)' 
                  : i < index 
                    ? 'rgb(244, 114, 182)'
                    : 'rgba(255, 255, 255, 0.3)',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>

        {/* Tap instruction with romantic styling */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.p 
            className="text-pink-100 text-lg font-medium flex items-center gap-2 justify-center"
            animate={{
              opacity: [0.5, 1, 0.5],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="text-pink-300" size={20} fill="currentColor" />
            Tap to see the next moment
            <Heart className="text-pink-300" size={20} fill="currentColor" />
          </motion.p>
          
          <motion.p 
            className="text-pink-200/60 text-sm mt-2"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            {index + 1} of {sortedMoments.length}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
