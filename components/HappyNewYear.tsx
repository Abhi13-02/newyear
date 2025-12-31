'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
}

export default function HappyNewYear() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // Auto-show special message after 3 taps
  useEffect(() => {
    if (tapCount >= 3 && !showMessage) {
      setShowMessage(true);
    }
  }, [tapCount, showMessage]);

  // Auto-create random fireworks
  useEffect(() => {
    const interval = setInterval(() => {
      createFirework(Math.random() * 100, Math.random() * 80);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const createFirework = (xPercent: number, yPercent: number) => {
    const id = Date.now() + Math.random();
    setFireworks(prev => [...prev, { id, x: xPercent, y: yPercent }]);
    
    // Remove after animation
    setTimeout(() => {
      setFireworks(prev => prev.filter(fw => fw.id !== id));
    }, 1000);
  };

  const createParticles = (clickX: number, clickY: number) => {
    const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#00d2d3'];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 5 + Math.random() * 5;
      
      newParticles.push({
        id: Date.now() + i,
        x: clickX,
        y: clickY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 8,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    createParticles(x, y);
    createFirework(x, y);
    setTapCount(prev => prev + 1);
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 cursor-pointer"
      onClick={handleTap}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              x: particle.vx * 50,
              y: particle.vy * 50,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Fireworks */}
      <AnimatePresence>
        {fireworks.map((firework) => (
          <motion.div
            key={firework.id}
            className="absolute pointer-events-none"
            style={{
              left: `${firework.x}%`,
              top: `${firework.y}%`,
            }}
          >
            {/* Firework burst effect */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-yellow-300"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI) / 6) * 100,
                  y: Math.sin((i * Math.PI) / 6) * 100,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            ))}
            
            {/* Sparkle effect */}
            <motion.div
              className="absolute text-4xl"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              ✨
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-200 opacity-60"
          style={{
            left: `${(i * 5) % 100}%`,
            fontSize: `${12 + (i % 3) * 8}px`,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            x: [0, Math.sin(i) * 50],
            rotate: [0, 360],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8 + (i % 5),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        >
          ⭐
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Year 2025 - Large animated */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2 
          }}
        >
          <motion.h1
            className="text-[120px] md:text-[200px] font-black leading-none"
            style={{
              background: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 80px rgba(255,255,255,0.5)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            2026
          </motion.h1>
        </motion.div>

        {/* Happy New Year Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            animate={{
              scale: [1, 1.05, 1],
              textShadow: [
                '0 0 20px rgba(255,255,255,0.5)',
                '0 0 40px rgba(255,255,255,0.8)',
                '0 0 20px rgba(255,255,255,0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            HAPPY NEW YEAR
          </motion.h2>

          {/* Decorative hearts */}
          <motion.div 
            className="flex justify-center gap-4 text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {['💕', '✨', '🎊', '✨', '💕'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-pink-200 mt-8 text-center max-w-2xl font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Here's to new adventures, endless laughter, and making beautiful memories together! 🌟
        </motion.p>

        {/* Tap instruction */}
        <motion.div
          className="mt-12"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <p className="text-white/80 text-sm md:text-base">
            ✨ Tap anywhere to celebrate! ✨
          </p>
        </motion.div>

        {/* Special message after 3 taps */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 p-8 md:p-12 rounded-2xl shadow-2xl max-w-md mx-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 3,
                  }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                    🎉 Surprise! 🎉
                  </h3>
                  <p className="text-white text-lg md:text-xl text-center leading-relaxed">
                    You found the secret celebration! 
                    <br /><br />
                    May this year bring you everything your heart desires and more! 💖
                    <br /><br />
                    <span className="text-2xl">Cheers to us! 🥂</span>
                  </p>
                </motion.div>
                
                <motion.button
                  className="mt-6 w-full bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-pink-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMessage(false);
                    setTapCount(0);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Keep Celebrating! 🎊
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti elements */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`confetti-${i}`}
            className="absolute w-2 h-4 rounded"
            style={{
              backgroundColor: ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'][i % 5],
              left: `${(i * 2) % 100}%`,
            }}
            animate={{
              y: ['0vh', '100vh'],
              rotate: [0, 360],
              x: [0, Math.sin(i) * 100],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.1) % 2,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
}
