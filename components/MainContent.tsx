'use client';

import { motion } from 'framer-motion';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import Image from 'next/image';

const memories = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=500&auto=format&fit=crop&q=60', caption: 'The Beginning' },
  { id: 2, type: 'text', content: 'Remember when we first met? It feels like yesterday.' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=60', caption: 'Adventures' },
  // Placeholders - in a real app, these would be user uploads
];

export default function MainContent() {
  return (
    <div className="flex flex-col w-full min-h-screen text-white p-4 pb-20 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-10 px-4 mb-12 text-center"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-amber-500 bg-clip-text text-transparent">
          Happy New Year!
        </h1>
        <p className="text-xl text-gray-300">Here's to another year of us.</p>
      </motion.div>

      {/* Letter Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-2xl mb-12 border border-white/10"
      >
        <h2 className="text-2xl font-serif mb-6 text-pink-300">My Dearest...</h2>
        <p className="leading-relaxed text-gray-200 mb-4">
          As we step into this new year, I just wanted to take a moment to tell you how much you mean to me.
          Every moment with you is a gift I cherish.
        </p>
        <p className="leading-relaxed text-gray-200 mb-4">
          Looking back at the memories we've made, I can't help but smile. You are my favorite distraction,
          my golden ticket, and my greatest adventure.
        </p>
        <p className="leading-relaxed text-gray-200">
          I love you more than words can say.
        </p>
        <div className="mt-8 text-right font-serif text-lg text-pink-300">
          - Yours
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
        {memories.map((mem, i) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors p-2"
          >
            {mem.type === 'image' ? (
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <img src={mem.src!} alt={mem.caption} className="object-cover w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="text-white font-medium">{mem.caption}</span>
                </div>
              </div>
            ) : (
              <div className="aspect-square flex items-center justify-center p-6 text-center bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg">
                <p className="text-lg italic font-serif">"{mem.content}"</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Footer / QR placeholder */}
      <div className="mt-20 text-center text-gray-600 text-sm pb-10">
        <p className="mb-4">Scan to keep this forever</p>
        <div className="bg-white p-4 rounded-xl inline-block">
             <QRCode value={typeof window !== 'undefined' ? window.location.href : 'https://example.com'} size={128} />
        </div>
      </div>
    </div>
  );
}
