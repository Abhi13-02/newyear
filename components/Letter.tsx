'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Letter() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
      setTimeout(() => setShowLetter(true), 800);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative z-20 px-4 py-12">
      <AnimatePresence mode="wait">
        {!showLetter ? (
          /* Envelope */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-md cursor-pointer"
            onClick={handleEnvelopeClick}
          >
            {/* Title */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200 bg-clip-text text-transparent">
                A Letter For You ♡
              </h2>
              {!isEnvelopeOpen && (
                <motion.p 
                  className="text-gray-300 text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Click to open the envelope...
                </motion.p>
              )}
            </motion.div>

            {/* Envelope Container */}
            <div className="relative w-full aspect-[1.6/1] max-w-md mx-auto" style={{ perspective: '1000px' }}>
              {/* Envelope Body */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100 rounded-lg shadow-2xl overflow-hidden"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: 0 }}
              >
                {/* Decorative Border */}
                <div className="absolute inset-0 border-4 border-amber-200/50 rounded-lg m-4" />
                
                {/* Heart Seal */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: isEnvelopeOpen ? 0 : 1,
                    rotate: isEnvelopeOpen ? 180 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <div className="text-6xl md:text-7xl drop-shadow-lg">❤️</div>
                    <motion.div
                      className="absolute inset-0 text-6xl md:text-7xl"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      ✨
                    </motion.div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 text-rose-300 opacity-40 text-xl">★</div>
                <div className="absolute bottom-4 right-4 text-rose-300 opacity-40 text-xl">★</div>
                <div className="absolute top-6 right-8 text-amber-400 opacity-30 text-2xl">✦</div>
                <div className="absolute bottom-8 left-8 text-amber-400 opacity-30 text-2xl">✦</div>
              </motion.div>

              {/* Envelope Flap (Top) */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-br from-amber-200 via-orange-100 to-amber-200 rounded-t-lg shadow-xl origin-top border-2 border-amber-300/50"
                style={{ 
                  transformStyle: 'preserve-3d',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  zIndex: 20
                }}
                initial={{ rotateX: 0 }}
                animate={{ 
                  rotateX: isEnvelopeOpen ? -180 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Inner flap decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-rose-100/20 to-transparent" />
              </motion.div>

              {/* Letter Peeking Out */}
              <motion.div
                className="absolute top-8 left-1/2 -translate-x-1/2 w-[85%] h-[120%] bg-gradient-to-br from-[#fef9e7] via-[#fff8e1] to-[#fef3c7] rounded-md shadow-lg z-10"
                initial={{ y: 0, opacity: 0 }}
                animate={{ 
                  y: isEnvelopeOpen ? -20 : 0,
                  opacity: isEnvelopeOpen ? 1 : 0
                }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                  <motion.p 
                    className="text-amber-800 font-serif text-sm opacity-60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isEnvelopeOpen ? 0.6 : 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    Tap to read the letter...
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* Letter Content */
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            {/* Letter Paper */}
            <motion.div
              className="bg-gradient-to-br from-[#fef9e7] via-[#fff8e1] to-[#fef3c7] rounded-lg shadow-2xl p-8 md:p-12 relative overflow-hidden"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Decorative Border */}
              <div className="absolute inset-0 border-8 border-amber-200/30 rounded-lg m-2" />
              <div className="absolute inset-0 border-4 border-double border-amber-300/20 rounded-lg m-4" />
              
              {/* Corner Decorations */}
              <div className="absolute top-4 left-4 text-rose-300 text-3xl opacity-40">❦</div>
              <div className="absolute top-4 right-4 text-rose-300 text-3xl opacity-40">❦</div>
              <div className="absolute bottom-4 left-4 text-rose-300 text-3xl opacity-40">❦</div>
              <div className="absolute bottom-4 right-4 text-rose-300 text-3xl opacity-40">❦</div>

              {/* Floating Hearts Animation */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-rose-200 opacity-20"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '100%'
                  }}
                  animate={{
                    y: [0, -400],
                    opacity: [0, 0.3, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeOut"
                  }}
                >
                  ♡
                </motion.div>
              ))}

              {/* Letter Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 bg-clip-text text-transparent mb-2 font-serif">
                    My Dearest Love
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-rose-400">
                    <span>♡</span>
                    <span>♡</span>
                    <span>♡</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="space-y-6 text-amber-900/90 font-serif leading-relaxed text-base md:text-lg"
                >
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-rose-500 first-letter:mr-1 first-letter:float-left">
                    As another year comes to an end, I find myself thinking about all the beautiful moments we've shared. 
                    Every laugh, every smile, every quiet moment together—they all mean the world to me.
                  </p>

                  <p>
                    You bring so much light into my life. Your presence makes ordinary days feel extraordinary, 
                    and your love gives me a sense of peace I never knew I needed. With you, everything feels right.
                  </p>

                  <p>
                    As we step into this new year together, I want you to know how deeply I cherish you. 
                    My wish for us is simple: more laughter, more adventures, more of those little moments that make 
                    my heart skip a beat. More of everything that makes us... us.
                  </p>

                  <p className="text-center italic text-rose-700 font-bold text-xl mt-8">
                    Here's to another year of loving you with all my heart.
                  </p>

                  <p className="text-center text-rose-600 text-2xl mt-6">
                    ♡ Happy New Year, My Love ♡
                  </p>

                  <div className="text-right mt-12 font-cursive text-xl text-amber-800">
                    <p className="mb-2">Forever yours,</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                      Your Cutiepie 💕
                    </p>
                  </div>
                </motion.div>

                {/* Closing Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-12 text-center"
                >
                  <p className="text-rose-400 text-sm opacity-60 font-serif">
                    ✨ With all my love ✨
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
