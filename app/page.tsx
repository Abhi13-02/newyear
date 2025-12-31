'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from '@/components/Intro';
import Distractions from '@/components/Distractions';
import GoldenTicket from '@/components/GoldenTicket';
import Moments from '@/components/Moments';

export default function Home() {
  const [stage, setStage] = useState(0);

  // 0: Intro (Heart Hold)
  // 1: Golden Ticket (Reward)
  // 2: Distractions (Cards)
  // 3: Moments (Photo Stack) -> HappyNewYear (handled internally)

  useEffect(() => {
    console.log('>>> STAGE CHANGED TO:', stage);
  }, [stage]);

  const handleNext = useCallback(() => {
    console.log('handleNext called, current stage:', stage);
    setStage((prev) => {
      console.log('Moving from stage', prev, 'to stage', prev + 1);
      return prev + 1;
    });
  }, []); // No dependencies needed since we use function form of setState

  return (
    <main className="h-screen w-full relative overflow-auto text-white">
      {/* Background Stars (Static for performance, could use canvas) */}
      <div className="stars" />
      <div className="stars" style={{ animationDelay: '-1.5s' }} />

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="intro"
            className="absolute inset-0"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <Intro onComplete={handleNext} />
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="ticket"
            className="absolute inset-0"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
          >
            <GoldenTicket onComplete={handleNext} />
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="distractions"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Distractions onComplete={handleNext} />
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="moments"
            className="absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100, rotate: -10 }}
            transition={{ duration: 0.6 }}
          >
            <Moments />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
