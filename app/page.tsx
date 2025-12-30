'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from '@/components/Intro';
import Distractions from '@/components/Distractions';
import GoldenTicket from '@/components/GoldenTicket';
import Moments from '@/components/Moments';
import MainContent from '@/components/MainContent';

export default function Home() {
  const [stage, setStage] = useState(0);

  // 0: Intro (Heart Hold)
  // 1: Distractions (Cards)
  // 2: Golden Ticket (Reward)
  // 3: Moments (Photo Stack)
  // 4: Main Content (Website)

  const handleNext = () => setStage((prev) => prev + 1);

  return (
    <main className="h-screen w-full relative overflow-hidden text-white">
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
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100, rotate: -10 }}
            transition={{ duration: 0.6 }}
          >
            <Moments onComplete={handleNext} />
          </motion.div>
        )}

        {stage === 4 && (
          <motion.div
            key="main"
            className="absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
