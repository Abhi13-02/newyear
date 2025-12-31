'use client';

import { useState, useEffect, useRef } from 'react';
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
  
  // Secret rapid-tap feature
  const [rapidTaps, setRapidTaps] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [lastTapTime, setLastTapTime] = useState(0);
  const rapidTapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-create random fireworks
  useEffect(() => {
    const interval = setInterval(() => {
      createFirework(Math.random() * 100, Math.random() * 80);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Reset rapid taps if user stops tapping
  useEffect(() => {
    if (rapidTaps > 0 && rapidTaps < 30) {
      // Clear existing timeout
      if (rapidTapTimeoutRef.current) {
        clearTimeout(rapidTapTimeoutRef.current);
      }
      
      // Set new timeout to reset if no tap within 1.5 seconds
      rapidTapTimeoutRef.current = setTimeout(() => {
        console.log('Rapid tap timeout - resetting');
        setRapidTaps(0);
      }, 1500);
    }

    return () => {
      if (rapidTapTimeoutRef.current) {
        clearTimeout(rapidTapTimeoutRef.current);
      }
    };
  }, [rapidTaps]);

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
    
    // Check for rapid taps
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime;
    
    // If tapped within 500ms, count as rapid tap
    if (timeSinceLastTap < 500 || rapidTaps === 0) {
      const newRapidTaps = rapidTaps + 1;
      setRapidTaps(newRapidTaps);
      console.log('Rapid tap:', newRapidTaps, '/ 30');
      
      // Check if we reached 30 rapid taps
      if (newRapidTaps >= 30 && !showSurprise) {
        console.log('SECRET UNLOCKED!');
        setShowSurprise(true);
      }
    } else {
      // Too slow, reset
      console.log('Tap too slow, resetting');
      setRapidTaps(1);
    }
    
    setLastTapTime(now);
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
✨ Tap anywhere to celebrate! ✨
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
             myyyyy kittttuuuu dont ever be in a bad moood this year!
          </p>
        </motion.div>

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

        {/* Rapid Tap Progress Meter */}
        <AnimatePresence>
          {rapidTaps > 0 && rapidTaps < 30 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            >
              <div className="bg-black/80 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl border-2 border-white/20">
                <p className="text-white text-sm mb-2 text-center font-bold">Keep tapping fast! 🔥</p>
                <div className="w-64 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(rapidTaps / 30) * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Surprise Card */}
        <AnimatePresence>
          {showSurprise && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-[100] pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 p-10 md:p-16 rounded-3xl shadow-2xl max-w-lg mx-4 relative overflow-hidden"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Sparkle effects */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      fontSize: `${12 + Math.random() * 20}px`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}

                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 3,
                  }}
                >
                  <h3 className="text-4xl md:text-5xl font-black text-white text-center mb-6 relative z-10">
                     SURPRISE!
                  </h3>
                  <div className="text-6xl text-center mb-6 relative z-10">🎁</div>
                  <p className="text-white text-xl md:text-2xl text-center leading-relaxed mb-6 relative z-10 font-bold">
                    Ohh! So you have found the secret gift!
                  </p>
                  <p className="text-white/90 text-lg text-center leading-relaxed mb-8 relative z-10">
                    Congratulations! 🎊
                    <br />
                    Something special is coming soon... 💝
                  </p>
                  
                  <motion.button
                    className="w-full bg-white text-purple-600 font-bold py-4 px-8 rounded-full hover:bg-pink-100 transition-colors relative z-10 shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSurprise(false);
                      setRapidTaps(0);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    keep waiting! ✨
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
