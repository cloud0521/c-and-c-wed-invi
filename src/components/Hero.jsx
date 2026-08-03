import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import logoImg from '../logo.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero({ hasOpened }) {
  // Target Date: December 19, 2026
  const weddingDate = new Date('2026-12-19T16:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-12 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={hasOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="space-y-4 flex flex-col items-center max-w-xl mx-auto"
      >
        {/* Natural Logo Display */}
        <div className="w-56 h-56 md:w-72 md:h-72 mb-2 flex items-center justify-center">
          <img 
            src={logoImg} 
            alt="Cloyd & Cyrin Monogram" 
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-sm uppercase tracking-[0.3em] text-[#C8A165]">We Are Getting Married</p>
        
        {/* Animated Title triggers only after curtains are done opening */}
        <motion.h1 
          className="text-5xl md:text-7xl font-light text-[#2F2721] font-serif flex items-center justify-center flex-wrap"
          variants={containerVariants}
          initial="hidden"
          animate={hasOpened ? "visible" : "hidden"}
        >
          <span className="inline-flex">
            {"Cloyd".split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>

          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={hasOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="font-sans text-3xl font-thin text-[#C48C78] mx-3 inline-block"
          >
            &amp;
          </motion.span>

          <span className="inline-flex">
            {"Cyrin".split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <p className="text-lg italic text-[#7A4E36] tracking-widest">12 . 19 . 26</p>

        {/* Live Countdown Clock */}
        <div className="grid grid-cols-4 gap-4 py-6 text-[#2F2721]">
          <div className="bg-white/60 p-3 rounded-lg shadow-sm backdrop-blur-sm">
            <span className="text-2xl font-bold block">{timeLeft.days}</span>
            <span className="text-[10px] uppercase tracking-wider text-[#7A4E36]">Days</span>
          </div>
          <div className="bg-white/60 p-3 rounded-lg shadow-sm backdrop-blur-sm">
            <span className="text-2xl font-bold block">{timeLeft.hours}</span>
            <span className="text-[10px] uppercase tracking-wider text-[#7A4E36]">Hours</span>
          </div>
          <div className="bg-white/60 p-3 rounded-lg shadow-sm backdrop-blur-sm">
            <span className="text-2xl font-bold block">{timeLeft.minutes}</span>
            <span className="text-[10px] uppercase tracking-wider text-[#7A4E36]">Mins</span>
          </div>
          <div className="bg-white/60 p-3 rounded-lg shadow-sm backdrop-blur-sm">
            <span className="text-2xl font-bold block">{timeLeft.seconds}</span>
            <span className="text-[10px] uppercase tracking-wider text-[#7A4E36]">Secs</span>
          </div>
        </div>
        
        <div className="pt-2">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Heart className="w-6 h-6 text-[#C48C78] fill-[#C48C78]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}