import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Shirt, Gift, CheckCircle2, Send, Loader2 } from 'lucide-react';

import logo from './logo.png';
import bible from './assets/bible.png';
import p1 from './assets/p1.jpg';
import p2 from './assets/p2.jpg';
import p3 from './assets/p3.jpg';

const chapters = [
  { id: 0, title: 'The Invitation', subtitle: 'Chapter I' },
  { id: 1, title: 'Our Love Story', subtitle: 'Chapter II' },
  { id: 2, title: 'Captured Moments', subtitle: 'Chapter III' },
  { id: 3, title: 'Ceremony & Reception', subtitle: 'Chapter IV' },
  { id: 4, title: 'RSVP', subtitle: 'Chapter V' },
];

const timelineEvents = [
  {
    year: "Chapter I",
    title: "High School Days",
    description: "We crossed paths as schoolmates and officially became a couple, marking the sweet beginning of our journey."
  },
  {
    year: "Chapter II",
    title: "The Separation",
    description: "Not even a full month had passed before life parted our ways, leading to seven long years of walking separate paths."
  },
  {
    year: "Chapter III",
    title: "Destiny's Return",
    description: "Seven years later, destiny brought us back together, proving that what is truly meant to be will always find its way home."
  }
];

const galleryPhotos = [
  { img: p1, caption: "A Playful Moment" },
  { img: p2, caption: "Exploring Together" },
  { img: p3, caption: "By the Sea" }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Special magical entrance for Chapter 1 Hero elements
const magicalHeroVariant = {
  hidden: { opacity: 0, scale: 0.85, y: 40, filter: 'blur(12px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function App() {
  const [phase, setPhase] = useState('welcome'); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  
  // RSVP Form States
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', guests: '1', attendance: 'yes', message: '' });

  const audioRef = useRef(null);
  const containerRef = useRef(null);

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1URaiEBwsvvp5ZddvHNaot_6iFGHdMYNMNG37GPRyQ5UU1o2WFc8ZIkRckbhcqTVQKw/exec';

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@200;300;400;500&family=Great+Vibes&display=swap');

      .font-great-vibes { font-family: 'Great Vibes', cursive; }
      .font-serif { font-family: 'Cormorant Garamond', serif; }
      .font-sans { font-family: 'Montserrat', sans-serif; }

      html {
        scroll-behavior: smooth;
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleOpenInvitation = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 2;
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }

    setPhase('bible');

    setTimeout(() => {
      setPhase('curtains');
    }, 8500);

    setTimeout(() => {
      setPhase('ready');
    }, 10700);
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeSection && index >= 0 && index < chapters.length) {
      setActiveSection(index);
    }
  };

  const scrollToSection = (index) => {
    if (containerRef.current) {
      const targetChild = containerRef.current.children[index];
      if (targetChild) {
        targetChild.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      setRsvpSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('There was an error saving your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#36121A] text-[#F3E5E8] font-serif selection:bg-[#C48C78]/30 selection:text-[#36121A] h-screen w-screen overflow-hidden relative antialiased flex flex-col">
      
      <audio ref={audioRef} loop src="/bg-music.mp3" preload="auto" />

      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] bg-[radial-gradient(#C48C78_1px,transparent_1px)] [background-size:24px_24px]" />
      <motion.div 
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_50%_30%,rgba(196,140,120,0.18),transparent_70%)]" 
      />

      {/* WELCOME / LANDING SPLASH SCREEN */}
      <AnimatePresence>
        {phase === 'welcome' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#36121A] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#C48C78]"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -120],
                    x: [0, (Math.random() - 0.5) * 30],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center max-w-lg z-10"
            >
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-36 h-36 md:w-44 md:h-44 mb-6 relative flex items-center justify-center"
              >
                <img src={logo} alt="C & C Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(196,140,120,0.6)]" />
              </motion.div>

              <p className="font-sans text-[10px] tracking-[0.4em] text-[#C48C78] uppercase mb-1">You Are Cordially Invited</p>
              <h1 className="font-serif text-3xl md:text-4xl text-[#F3E5E8] font-light mb-8">Cloyd &amp; Cyrin</h1>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenInvitation}
                className="group relative flex flex-col items-center justify-center w-24 h-9 md:w-28 md:h-10 rounded-lg bg-gradient-to-br from-[#6b101e] via-[#480a13] to-[#250307] border-[2px] border-[#b08d57] shadow-[0_3px_15px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.15)] hover:shadow-[0_3px_20px_rgba(176,141,87,0.4)] transition-all cursor-pointer p-0.5 text-center"
              >
                <div className="absolute inset-0.5 rounded-md border border-dashed border-[#b08d57]/50 pointer-events-none" />
                <span className="font-serif italic text-[8px] md:text-[9px] tracking-wider text-[#e6d5bc] font-semibold leading-tight px-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  Open Invitation
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BIBLE VERSE PHASE */}
      <AnimatePresence>
        {phase === 'bible' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-[#2A0D14] flex flex-col items-center justify-between py-12 px-6 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(196,140,120,0.25),transparent_60%)] pointer-events-none" />

            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#e6d5bc]"
                  style={{
                    width: Math.random() * 4 + 2,
                    height: Math.random() * 4 + 2,
                    left: `${40 + Math.random() * 20}%`,
                    bottom: '25%',
                  }}
                  animate={{
                    y: [0, -320 - Math.random() * 150],
                    x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2.5 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 1.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <div className="h-6" />

            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.7, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: -30, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -100, filter: 'blur(12px)' }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl text-center z-20 px-4 my-auto"
            >
              <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#C48C78] uppercase font-semibold block mb-6">
                Holy Matrimony
              </span>
              <blockquote className="font-serif italic text-xl md:text-3xl text-[#F3E5E8] leading-relaxed mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                “I have found the one my soul loves. I held him and would not let him go...”
              </blockquote>
              <div className="w-16 h-[1px] bg-[#C48C78]/60 mx-auto mb-3" />
              <p className="font-sans text-xs tracking-[0.3em] text-[#D4B8BC] uppercase font-medium">
                Song of Solomon 3:4
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-48 md:w-64 h-36 md:h-48 relative flex items-center justify-center z-10"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#C48C78]/30 rounded-full blur-2xl -z-10"
              />
              <img
                src={bible}
                alt="Holy Bible"
                className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(196,140,120,0.6)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CURTAINS OPENING PHASE */}
      <AnimatePresence>
        {phase === 'curtains' && (
          <div className="fixed inset-0 flex z-50 pointer-events-none">
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '-100%' }}
              transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1] }}
              className="w-1/2 h-full bg-[#2A0D14] border-r border-[#C48C78]/20 relative shadow-2xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(196,140,120,0.08))]" />
            </motion.div>
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1] }}
              className="w-1/2 h-full bg-[#2A0D14] border-l border-[#C48C78]/20 relative shadow-2xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(-90deg,transparent,rgba(196,140,120,0.08))]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOP HEADER WITH MAGICAL TEXT ANIMATIONS */}
      <header className="absolute top-0 left-0 right-0 px-6 py-6 flex justify-between items-center z-30 max-w-7xl mx-auto pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          {/* Magical Subtitle / Roman Numeral Animation */}
          <div className="overflow-hidden flex items-center py-1">
            <AnimatePresence mode="wait">
              <motion.span 
                key={`subtitle-${activeSection}`}
                initial={{ opacity: 0, y: -12, filter: 'blur(6px)', scale: 0.9 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: 12, filter: 'blur(6px)', scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-[10px] tracking-[0.3em] text-[#C48C78] uppercase font-semibold inline-block"
              >
                {chapters[activeSection].subtitle}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="text-[#C48C78]/40">/</span>

          {/* Magical Page Title Animation */}
          <div className="overflow-hidden flex items-center py-1">
            <AnimatePresence mode="wait">
              <motion.span 
                key={`title-${activeSection}`}
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)', scale: 0.9 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)', scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="font-serif text-sm text-[#F3E5E8] tracking-wider inline-block"
              >
                {chapters[activeSection].title}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </header>

      {/* PERFECTLY CENTERED BOTTOM PAGINATION DOTS */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pointer-events-auto flex items-center gap-2.5 bg-[#2A0D14]/80 px-4 py-2 rounded-full border border-[#C48C78]/30 backdrop-blur-md shadow-lg"
        >
          {chapters.map((ch, idx) => (
            <motion.button
              key={ch.id}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection(idx)}
              className={`h-2 transition-all duration-500 rounded-full cursor-pointer ${
                activeSection === idx 
                  ? 'w-7 bg-[#C48C78] shadow-[0_0_8px_rgba(196,140,120,0.8)]' 
                  : 'w-2 bg-[#C48C78]/30 hover:bg-[#C48C78]/60'
              }`}
              aria-label={`Go to ${ch.title}`}
            />
          ))}
        </motion.div>
      </div>

      {/* VERTICAL SCROLL-SNAP CONTAINER */}
      <main 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative"
      >
        
        {/* SECTION 0: HERO (CHAPTER 1) WITH MAGICAL CURTAIN-REVEAL ANIMATIONS */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
          
          {/* Glowing Magical Aura Burst on Reveal */}
          <motion.div 
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.6, 1.4, 1], opacity: [0, 0.5, 0.25] }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#C48C78]/20 via-[#b08d57]/15 to-transparent blur-3xl pointer-events-none"
          />

          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-64 h-64 rounded-full bg-[#C48C78]/10 blur-3xl pointer-events-none"
          />

          {/* Floating magical sparkles behind Chapter 1 content */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#C48C78]"
                style={{
                  width: Math.random() * 3 + 1.5,
                  height: Math.random() * 3 + 1.5,
                  left: `${20 + Math.random() * 60}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                animate={{
                  y: [0, -80 - Math.random() * 60],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={magicalHeroVariant}
            className="max-w-4xl mx-auto pt-8 relative z-10 flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-24 md:w-28 md:h-28 mb-5 relative flex items-center justify-center filter drop-shadow-[0_0_25px_rgba(196,140,120,0.6)]"
            >
              <img 
                src={logo} 
                alt="C & C Logo" 
                className="w-full h-full object-contain" 
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="inline-block mb-4 px-6 py-1.5 border-y border-[#C48C78]/40 bg-[#36121A]/40 backdrop-blur-sm rounded-lg"
            >
              <p className="font-sans text-[11px] tracking-[0.45em] text-[#C48C78] uppercase font-medium">
                Together with their families
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#F3E5E8] font-light drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                Cloyd
              </h1>
              <motion.div 
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="font-serif italic text-3xl md:text-5xl text-[#C48C78] font-light"
              >
                &amp;
              </motion.div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#F3E5E8] font-light drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                Cyrin
              </h1>
            </motion.div>

            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C48C78] to-transparent mx-auto my-5" 
            />

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-[#C48C78] font-semibold"
            >
              Saturday, December 19, 2026
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="font-serif italic text-sm text-[#D4B8BC] mt-2 font-medium"
            >
              La Castellana &bull; Negros Occidental
            </motion.p>
          </motion.div>
        </section>

        {/* SECTION 1: OUR LOVE STORY */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-20 max-w-4xl mx-auto overflow-y-auto no-scrollbar py-16">
          <div className="w-full text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="mb-10"
            >
              <span className="text-xs uppercase tracking-[0.4em] text-[#C48C78] font-semibold block mb-2">Memories &amp; Milestones</span>
              <h2 className="text-3xl md:text-4xl font-light font-serif text-[#F3E5E8]">Our Love Story</h2>
              <div className="w-12 h-[1px] bg-[#C48C78] mx-auto mt-3" />
            </motion.div>

            <div className="relative border-l border-[#C48C78]/40 ml-4 md:ml-24 text-left space-y-10">
              {timelineEvents.map((item, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.8, delay: index * 0.2, ease: "easeOut" }
                    }
                  }}
                  className="relative pl-8 md:pl-10 group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.5 }}
                    className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#C48C78] ring-4 ring-[#36121A] transition-transform duration-300 shadow-[0_0_10px_rgba(196,140,120,0.8)]" 
                  />
                  <span className="text-xs font-semibold tracking-widest text-[#C48C78] uppercase">{item.year}</span>
                  <h3 className="text-xl md:text-2xl font-serif font-light text-[#F3E5E8] mt-1 mb-1 group-hover:text-[#C48C78] transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-[#D4B8BC] leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: CAPTURED MOMENTS */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-20 max-w-5xl mx-auto overflow-y-auto no-scrollbar py-16">
          <div className="w-full text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="mb-10"
            >
              <span className="text-xs uppercase tracking-[0.4em] text-[#C48C78] font-semibold block mb-2">Captured Moments</span>
              <h2 className="text-3xl md:text-4xl font-light font-serif text-[#F3E5E8]">The Gallery</h2>
              <div className="w-12 h-[1px] bg-[#C48C78] mx-auto mt-3" />
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {galleryPhotos.map((photo, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, delay: index * 0.2, ease: "easeOut" } }
                  }}
                  whileHover={{ scale: 1.04, y: -5 }}
                  className="h-72 md:h-80 bg-[#451822]/60 border border-[#C48C78]/30 rounded-2xl p-2 shadow-xl backdrop-blur-sm flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full overflow-hidden rounded-xl relative">
                    <img 
                      src={photo.img} 
                      alt={photo.caption} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#2A0D14]/90 via-[#2A0D14]/40 to-transparent flex items-end justify-center p-4"
                    >
                      <p className="text-xs uppercase tracking-widest text-[#F3E5E8] font-light transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">{photo.caption}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: CEREMONY & RECEPTION */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-20 max-w-5xl mx-auto overflow-y-auto no-scrollbar py-16">
          <div className="w-full">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="text-center mb-8"
            >
              <span className="text-xs uppercase tracking-[0.4em] text-[#C48C78] font-semibold block mb-1">Join Our Celebration</span>
              <h2 className="text-3xl md:text-4xl font-light font-serif text-[#F3E5E8]">Ceremony &amp; Reception</h2>
              <div className="w-12 h-[1px] bg-[#C48C78] mx-auto mt-3" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#451822]/70 border border-[#C48C78]/30 p-6 rounded-2xl shadow-xl backdrop-blur-sm text-center flex flex-col items-center transition-all duration-300"
              >
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-[#C48C78]/15 flex items-center justify-center mb-3 text-[#C48C78]"
                >
                  <Calendar className="w-5 h-5" />
                </motion.div>
                <h3 className="text-xl font-serif font-light text-[#F3E5E8] mb-1">The Ceremony</h3>
                <p className="text-xs font-semibold text-[#C48C78] mb-0.5">Saturday, December 19, 2026</p>
                <p className="text-xs text-[#D4B8BC] mb-3">9:00 AM in the Morning</p>
                <p className="text-[11px] font-semibold text-[#F3E5E8] tracking-widest uppercase mb-1">Our Lady of Salvation Parish</p>
                <p className="text-[10px] text-[#D4B8BC] mb-4">Purok 6, Brgy. Cabacungan, La Castellana, Negros Occidental</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Our+Lady+of+Salvation+Parish+Purok+6+Brgy+Cabacungan+La+Castellana+Negros+Occidental" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C48C78] hover:text-[#F3E5E8] font-semibold border-b border-[#C48C78] pb-0.5 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#C48C78]" />
                  <span>View Exact Map Location</span>
                </a>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#451822]/70 border border-[#C48C78]/30 p-6 rounded-2xl shadow-xl backdrop-blur-sm text-center flex flex-col items-center transition-all duration-300"
              >
                <motion.div 
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-[#C48C78]/15 flex items-center justify-center mb-3 text-[#C48C78]"
                >
                  <Clock className="w-5 h-5" />
                </motion.div>
                <h3 className="text-xl font-serif font-light text-[#F3E5E8] mb-1">The Reception</h3>
                <p className="text-xs font-semibold text-[#C48C78] mb-0.5">Immediately Following Ceremony</p>
                <p className="text-xs text-[#D4B8BC] mb-3">11:00 AM Onwards</p>
                <p className="text-[11px] font-semibold text-[#F3E5E8] tracking-widest uppercase mb-1">Our Lady of Salvation Parish</p>
                <p className="text-[10px] text-[#D4B8BC] mb-4">Purok 6, Brgy. Cabacungan, La Castellana, Negros Occidental</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Our+Lady+of+Salvation+Parish+Purok+6+Brgy+Cabacungan+La+Castellana+Negros+Occidental" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C48C78] hover:text-[#F3E5E8] font-semibold border-b border-[#C48C78] pb-0.5 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#C48C78]" />
                  <span>View Exact Map Location</span>
                </a>
              </motion.div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-[#451822]/50 border border-[#C48C78]/30 p-5 rounded-2xl text-center shadow-lg transition-all"
              >
                <Shirt className="w-6 h-6 text-[#C48C78] mx-auto mb-2" />
                <h3 className="text-lg font-serif font-light text-[#F3E5E8] mb-1">Dress Code</h3>
                <p className="text-xs text-[#C48C78] font-medium mb-2">Rose Gold &amp; Burgundy</p>
                <div className="flex justify-center space-x-3 my-2">
                  <span className="w-5 h-5 rounded-full bg-[#C48C78] shadow-md border border-[#36121A]" />
                  <span className="w-5 h-5 rounded-full bg-[#800020] shadow-md border border-[#36121A]" />
                </div>
                <p className="text-[11px] text-[#D4B8BC] italic mt-1">Kindly wear your attire in Rose Gold or Burgundy tones.</p>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-[#451822]/50 border border-[#C48C78]/30 p-5 rounded-2xl text-center flex flex-col justify-center shadow-lg transition-all"
              >
                <Gift className="w-6 h-6 text-[#C48C78] mx-auto mb-2" />
                <h3 className="text-lg font-serif font-light text-[#F3E5E8] mb-1">Gift Registry</h3>
                <p className="text-xs text-[#D4B8BC] mb-2">Your presence is our greatest gift. Monetary contributions are warmly appreciated.</p>
                <p className="text-[11px] font-semibold text-[#C48C78] tracking-wider">GCash / Bank Transfer details available upon request.</p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 4: RSVP */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-20 max-w-xl mx-auto overflow-y-auto no-scrollbar py-16">
          <div className="w-full">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, scale: 0.92, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }
              }}
              className="bg-[#451822]/90 border border-[#C48C78]/40 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md w-full relative overflow-hidden"
            >
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-[0.4em] text-[#C48C78] font-semibold block mb-2">Be Our Guest</span>
                <h3 className="text-3xl font-serif font-light text-[#F3E5E8]">RSVP</h3>
                <p className="text-xs text-[#D4B8BC] mt-1">Kindly respond on or before November 19, 2026</p>
              </div>

              <AnimatePresence mode="wait">
                {!rsvpSubmitted ? (
                  <motion.form 
                    key="rsvp-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleRsvpSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#C48C78] mb-1 font-semibold">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#2A0D14] border border-[#C48C78]/50 rounded-xl px-4 py-2.5 text-sm text-[#F3E5E8] placeholder-[#D4B8BC]/40 focus:outline-none focus:border-[#C48C78] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#C48C78] mb-1 font-semibold">Attendance</label>
                        <select 
                          value={formData.attendance}
                          onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                          className="w-full bg-[#2A0D14] border border-[#C48C78]/50 rounded-xl px-4 py-2.5 text-sm text-[#F3E5E8] focus:outline-none focus:border-[#C48C78] transition-colors"
                        >
                          <option value="yes" className="bg-[#2A0D14]">Joyfully Accept</option>
                          <option value="no" className="bg-[#2A0D14]">Regretfully Decline</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#C48C78] mb-1 font-semibold">Number of Guests</label>
                        <select 
                          value={formData.guests}
                          onChange={(e) => setFormData({...formData, guests: e.target.value})}
                          className="w-full bg-[#2A0D14] border border-[#C48C78]/50 rounded-xl px-4 py-2.5 text-sm text-[#F3E5E8] focus:outline-none focus:border-[#C48C78] transition-colors"
                        >
                          <option value="1" className="bg-[#2A0D14]">1 Person</option>
                          <option value="2" className="bg-[#2A0D14]">2 Persons</option>
                          <option value="3" className="bg-[#2A0D14]">3 Persons</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#C48C78] mb-1 font-semibold">Wishes for the Couple</label>
                      <textarea 
                        rows="2"
                        placeholder="Leave a sweet message..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-[#2A0D14] border border-[#C48C78]/50 rounded-xl px-4 py-2.5 text-sm text-[#F3E5E8] placeholder-[#D4B8BC]/40 focus:outline-none focus:border-[#C48C78] transition-colors"
                      />
                    </div>

                    <div className="text-center pt-1">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#C48C78] hover:bg-[#b07864] text-[#36121A] py-3 rounded-full text-xs uppercase tracking-[0.3em] font-bold shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 text-[#36121A] animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#36121A]" />
                            <span>Submit RSVP</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8 space-y-4"
                  >
                    <CheckCircle2 className="w-14 h-14 text-[#C48C78] mx-auto animate-bounce" />
                    <h4 className="text-2xl font-serif text-[#F3E5E8]">Thank You, {formData.name}!</h4>
                    <p className="text-sm text-[#D4B8BC] max-w-md mx-auto">
                      {formData.attendance === 'yes' 
                        ? "We have successfully recorded your response. We can't wait to celebrate our special day with you!"
                        : "We are sorry you won't be able to make it, but thank you for letting us know."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

      </main>

      {/* COMPACT DISC MUSIC PLAYER */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (isPlaying) {
              audioRef.current.pause();
              setIsPlaying(false);
            } else {
              audioRef.current.play().catch(() => {});
              setIsPlaying(true);
            }
          }}
          className="w-12 h-12 rounded-full bg-[#2A0D14]/95 backdrop-blur-md p-1 border border-[#C48C78]/40 shadow-2xl flex items-center justify-center cursor-pointer hover:border-[#C48C78] transition-all duration-300"
          aria-label="Toggle Background Music"
        >
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full bg-gradient-to-tr from-[#C48C78] to-[#800020] border border-[#F3E5E8]/30 flex items-center justify-center shadow-[0_0_10px_rgba(196,140,120,0.6)]"
          >
            <div className="w-3 h-3 rounded-full bg-[#2A0D14] border border-[#C48C78] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#F3E5E8]" />
            </div>
          </motion.div>
        </motion.button>
      </div>

    </div>
  );
}