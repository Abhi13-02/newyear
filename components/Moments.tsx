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
  const [isHovering, setIsHovering] = useState(false);

  console.log('Moments RENDER - index:', index, 'showLetter:', showLetter);

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
      {/* Animated Background Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-rose-500/20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Hearts Background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`heart-bg-${i}`}
          className="absolute text-pink-300/20"
          style={{
            left: `${(i * 7) % 100}%`,
            fontSize: `${20 + (i % 4) * 15}px`,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            x: [0, Math.sin(i) * 100],
            rotate: [0, 360],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 10 + (i % 5) * 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "linear"
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Sparkle Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="text-yellow-200" size={12 + (i % 3) * 6} />
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

        {/* Photo Stack Container with enhanced styling */}
        <motion.div 
          className="relative w-80 h-[36rem] md:w-96 md:h-[42rem] cursor-pointer group"
          onClick={handleTap}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Glow effect around the card stack */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-3xl blur-2xl"
            animate={{
              opacity: isHovering ? 0.6 : 0.3,
              scale: isHovering ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          <AnimatePresence mode="popLayout">
            {sortedMoments.slice(index).map((moment, i) => {
              const actualIndex = i + index;
              const isTop = i === 0;
              const offset = i * 5;
              
              return (
                <motion.div
                  key={moment.id}
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ 
                    scale: isTop ? 1 : 0.95 - i * 0.03, 
                    y: isTop ? 0 : offset * 4,
                    opacity: 1 - i * 0.15,
                    rotate: isTop ? 0 : (actualIndex % 2 === 0 ? 3 : -3),
                  }}
                  exit={{ 
                    x: 300, 
                    opacity: 0, 
                    rotate: 25,
                    scale: 0.8,
                    transition: { duration: 0.5, ease: "easeInOut" } 
                  }}
                  transition={{ 
                    type: 'spring', 
                    damping: 25, 
                    stiffness: 260,
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ 
                    zIndex: sortedMoments.length - actualIndex,
                    transformOrigin: 'bottom center',
                    background: 'linear-gradient(145deg, #ffffff 0%, #fff5f7 100%)',
                  }}
                >
                  {/* Polaroid-style frame */}
                  <div className="relative w-full h-full p-4 pb-16">
                    {/* Image Container with enhanced styling */}
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-xl shadow-inner">
                      {moment.type === 'video' ? (
                        <video 
                          src={moment.src} 
                          className="w-full h-full object-cover pointer-events-none" 
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img 
                          src={moment.src} 
                          alt={moment.caption} 
                          className="w-full h-full object-cover pointer-events-none" 
                        />
                      )}
                      
                      {/* Romantic overlay gradient on hover */}
                      {isTop && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovering ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      {/* ID Badge with better styling */}
                      <motion.div 
                        className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                        animate={{
                          boxShadow: isTop && isHovering 
                            ? '0 0 20px rgba(236, 72, 153, 0.6)' 
                            : '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        #{moment.id}
                      </motion.div>

                      {/* Video indicator */}
                      {moment.type === 'video' && (
                        <motion.div 
                          className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          VIDEO
                        </motion.div>
                      )}
                    </div>

                    {/* Caption at the bottom (Polaroid style) */}
                    <motion.div 
                      className="absolute bottom-4 left-4 right-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {moment.caption}
                      </p>
                      
                      {/* Decorative line */}
                      <motion.div 
                        className="mt-2 mx-auto w-16 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 rounded-full"
                        animate={{
                          width: isTop && isHovering ? 80 : 64,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    {/* Corner decorations (only on top card) */}
                    {isTop && (
                      <>
                        <motion.div
                          className="absolute top-2 right-2 text-pink-300"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                        >
                          <Heart size={20} fill="currentColor" />
                        </motion.div>
                        <motion.div
                          className="absolute bottom-20 right-2 text-purple-300"
                          animate={{
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: 1.5,
                          }}
                        >
                          <Heart size={16} fill="currentColor" />
                        </motion.div>
                      </>
                    )}
                  </div>

                  {/* Shimmer effect on top card */}
                  {isTop && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      }}
                      style={{ 
                        transform: 'skewX(-20deg)',
                      }}
                    />
                  )}
                </motion.div>
              );
            }).reverse()}
          </AnimatePresence>
        </motion.div>


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
