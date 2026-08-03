import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images correctly based on your project file structure
import p1 from './assets/p1.jpg';
import p2 from './assets/p2.jpg';
import p3 from './assets/p3.jpg';

const chapters = [
  { id: 0, title: 'The Invitation', subtitle: 'Chapter I' },
  { id: 1, title: 'The Journey', subtitle: 'Chapter II' },
  { id: 2, title: 'Captured Moments', subtitle: 'Chapter III' },
  { id: 3, title: 'Ceremony & Reception', subtitle: 'Chapter IV' },
  { id: 4, title: 'RSVP', subtitle: 'Chapter V' },
];

export default function App() {
  const [phase, setPhase] = useState('blackout'); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('logo'), 1000);
    const t2 = setTimeout(() => setPhase('quote'), 3800);
    const t3 = setTimeout(() => setPhase('curtains'), 7200);
    const t4 = setTimeout(() => {
      setPhase('ready');
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {});
      }
    }, 9800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

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

  return (
    <div className="bg-[#FAF5F4] text-[#2E1117] font-serif selection:bg-[#C88A96]/25 selection:text-[#2E1117] h-screen w-screen overflow-hidden relative antialiased flex flex-col">
      
      {/* Background Audio Engine */}
      <audio ref={audioRef} loop src="/bg-music.mp3" preload="auto" />

      {/* Global Paper Texture & Light Bloom Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] bg-[radial-gradient(#C88A96_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_50%_20%,rgba(200,138,150,0.08),transparent_60%)]" />

      {/* PHASE 1: THE UNFORGETTABLE OPENING EXPERIENCE */}
      <AnimatePresence>
        {phase !== 'ready' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#1F040A] flex items-center justify-center overflow-hidden"
          >
            {/* Ambient Rose Gold Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#C88A96]"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -120],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Sequence 1: Luxury Emblem */}
            {phase === 'logo' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-[#C88A96]/40 rotate-45 flex items-center justify-center relative">
                  <div className="absolute inset-1 border border-[#C88A96]/20" />
                  <span className="font-serif text-[#C88A96] text-xl -rotate-45 font-light">C &amp; C</span>
                </div>
                <p className="font-sans text-[10px] tracking-[0.4em] text-[#C88A96] uppercase">A Cinematic Union</p>
              </motion.div>
            )}

            {/* Sequence 2: Poetic Quote */}
            {phase === 'quote' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center px-8 max-w-lg"
              >
                <p className="font-serif italic text-xl md:text-2xl text-[#FAF5F4] font-light leading-relaxed tracking-wide">
                  &ldquo;Whatever our souls are made of, his and mine are the same.&rdquo;
                </p>
                <span className="block mt-4 font-sans text-[9px] tracking-[0.3em] text-[#C88A96] uppercase">Emily Brontë</span>
              </motion.div>
            )}

            {/* Sequence 3: Massive Luxury Curtains Opening */}
            {phase === 'curtains' && (
              <div className="absolute inset-0 flex z-50 pointer-events-none">
                <motion.div
                  initial={{ x: '0%' }}
                  animate={{ x: '-100%' }}
                  transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1] }}
                  className="w-1/2 h-full bg-[#2E0812] border-r border-[#C88A96]/20 relative shadow-2xl"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(200,138,150,0.05))]" />
                </motion.div>
                <motion.div
                  initial={{ x: '0%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1] }}
                  className="w-1/2 h-full bg-[#2E0812] border-l border-[#C88A96]/20 relative shadow-2xl"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(-90deg,transparent,rgba(200,138,150,0.05))]" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 0], scale: 1.5 }}
                  transition={{ duration: 2.2, ease: "easeOut" }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,138,150,0.3)_0%,transparent_70%)]"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER / CHAPTER TITLE */}
      <header className="absolute top-0 left-0 right-0 px-6 py-6 flex justify-between items-center z-30 max-w-7xl mx-auto pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#C88A96] uppercase">
            {chapters[activeSection].subtitle}
          </span>
          <span className="text-[#C88A96]/40">/</span>
          <span className="font-serif text-sm text-[#2E1117] tracking-wider">
            {chapters[activeSection].title}
          </span>
        </div>
        
        {/* Quick jump dots */}
        <div className="hidden md:flex items-center gap-2 pointer-events-auto">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => scrollToSection(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeSection === idx ? 'w-8 bg-[#C88A96]' : 'w-2 bg-[#C88A96]/20 hover:bg-[#C88A96]/40'
              }`}
              aria-label={`Go to ${ch.title}`}
            />
          ))}
        </div>
      </header>

      {/* VERTICAL SCROLL-SNAP CONTAINER */}
      <main 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative"
      >
        
        {/* SECTION 0: HERO INVITATION */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center text-center px-6 relative">
          <div className="max-w-4xl mx-auto pt-12">
            <div className="inline-block mb-6 px-6 py-2 border-y border-[#C88A96]/35">
              <p className="font-sans text-[11px] tracking-[0.45em] text-[#7A626A] uppercase">
                Together with their families
              </p>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#2E1117] font-light mb-2">
              Cloyd
            </h1>
            <div className="font-serif italic text-4xl md:text-5xl text-[#C88A96] my-3 font-light">
              &amp;
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#2E1117] font-light mb-8">
              Cyrin
            </h1>

            <div className="w-24 h-[1px] bg-[#C88A96]/40 mx-auto my-6" />

            <p className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-[#7A626A] font-medium">
              October Twenty-Fourth &bull; Two Thousand Twenty-Six
            </p>
            <p className="font-serif italic text-sm text-[#B57380] mt-3">
              Villa Botanica &bull; Tagaytay Ridge
            </p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-[#7A626A]">Scroll Down</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-[1px] h-6 bg-[#C88A96]" />
          </div>
        </section>

        {/* SECTION 1: THE JOURNEY */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full pt-12">
            <div className="space-y-4 md:space-y-6">
              <span className="font-sans text-xs tracking-[0.3em] text-[#B57380] block">2019 &mdash; The First Glance</span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#2E1117] font-light leading-snug">
                A rainy afternoon in Kyoto, where time paused.
              </h3>
              <p className="font-sans text-sm md:text-base text-[#7A626A] font-light leading-relaxed">
                Amidst ancient bamboo groves and soft mist, a chance encounter sparked an unspoken bond that weathered distance and years.
              </p>
            </div>
            <div className="relative aspect-[4/5] max-h-[50vh] md:max-h-[60vh] overflow-hidden rounded-sm shadow-2xl mx-auto w-full max-w-sm">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000" 
                alt="First Meeting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#2E1117]/15" />
            </div>
          </div>
        </section>

        {/* SECTION 2: CAPTURED MOMENTS (USING local p1.jpg, p2.jpg, p3.jpg) */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-20 max-w-6xl mx-auto">
          <div className="w-full pt-12">
            <div className="text-center mb-8">
              <span className="font-sans text-[10px] tracking-[0.4em] text-[#C88A96] uppercase block mb-2">Chapter III</span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#2E1117] font-light">Captured Moments</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-center">
              <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-lg">
                <img src={p1} alt="Captured Moment 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-lg mt-6">
                <img src={p2} alt="Captured Moment 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-lg hidden md:block">
                <img src={p3} alt="Captured Moment 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CEREMONY & RECEPTION */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-20 max-w-5xl mx-auto">
          <div className="w-full pt-12">
            <div className="text-center mb-8">
              <span className="font-sans text-[10px] tracking-[0.4em] text-[#C88A96] uppercase block mb-2">Chapter IV</span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#2E1117] font-light">Ceremony &amp; Reception</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-[#F5ECEB] p-6 md:p-8 border border-[#C88A96]/30 shadow-xl rounded-sm text-center flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C88A96] to-transparent" />
                <div>
                  <span className="font-sans text-[9px] tracking-[0.3em] text-[#C88A96] uppercase block mb-2">2:00 PM &bull; The Ceremony</span>
                  <h3 className="font-serif text-2xl text-[#2E1117] font-light mb-2">The Glass Chapel</h3>
                  <p className="font-serif text-sm text-[#7A626A] mb-1">Villa Botanica, Tagaytay Ridge</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#C88A96]/20">
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="font-sans text-[10px] tracking-[0.3em] text-[#B57380] hover:text-[#2E1117] uppercase">
                    View Map &rarr;
                  </a>
                </div>
              </div>

              <div className="bg-[#F5ECEB] p-6 md:p-8 border border-[#C88A96]/30 shadow-xl rounded-sm text-center flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C88A96] to-transparent" />
                <div>
                  <span className="font-sans text-[9px] tracking-[0.3em] text-[#C88A96] uppercase block mb-2">5:30 PM &bull; The Reception</span>
                  <h3 className="font-serif text-2xl text-[#2E1117] font-light mb-2">Grand Atrium Gardens</h3>
                  <p className="font-serif text-sm text-[#7A626A] mb-1">Villa Botanica, Tagaytay Ridge</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#C88A96]/20">
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="font-sans text-[10px] tracking-[0.3em] text-[#B57380] hover:text-[#2E1117] uppercase">
                    View Map &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: RSVP */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-20 max-w-3xl mx-auto">
          <div className="w-full pt-12">
            <div className="bg-[#F5ECEB] p-6 md:p-10 border border-[#C88A96]/30 shadow-2xl rounded-sm">
              <div className="text-center mb-6">
                <span className="font-sans text-[10px] tracking-[0.4em] text-[#C88A96] uppercase block mb-1">Chapter V</span>
                <h2 className="font-serif text-3xl text-[#2E1117] font-light">Celebrate With Us</h2>
                <p className="font-sans text-[9px] text-[#7A626A] tracking-widest uppercase mt-1">Kindly respond by October first</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for your gracious response."); }} className="space-y-4">
                <div className="space-y-1">
                  <label className="block font-sans text-[9px] tracking-[0.3em] uppercase text-[#7A626A]">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your esteemed name"
                    className="w-full bg-transparent border-b border-[#2E1117]/30 pb-2 font-serif text-base text-[#2E1117] placeholder-[#2E1117]/30 focus:outline-none focus:border-[#C88A96]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-sans text-[9px] tracking-[0.3em] uppercase text-[#7A626A]">Will you grace us with your presence?</label>
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="radio" name="attendance" required className="accent-[#C88A96]" />
                      <span className="font-serif text-sm text-[#2E1117] group-hover:text-[#C88A96]">Joyfully Accepts</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="radio" name="attendance" required className="accent-[#C88A96]" />
                      <span className="font-serif text-sm text-[#2E1117] group-hover:text-[#C88A96]">Regretfully Declines</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-[#2E1117] text-[#FAF5F4] font-sans text-xs tracking-[0.35em] uppercase rounded-sm hover:bg-[#C88A96] hover:text-[#2E1117] transition-all duration-500 shadow-lg"
                  >
                    Submit Response
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* FLOATING BACKGROUND MUSIC PLAYER */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            if (isPlaying) {
              audioRef.current.pause();
              setIsPlaying(false);
            } else {
              audioRef.current.play().catch(() => {});
              setIsPlaying(true);
            }
          }}
          className="flex items-center gap-3 bg-[#2E1117]/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#C88A96]/40 shadow-2xl text-[#FAF5F4] hover:border-[#C88A96] transition-all duration-300"
          aria-label="Toggle Background Music"
        >
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#C88A96] to-[#2E1117] border border-[#FAF5F4]/30 flex items-center justify-center shrink-0"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#FAF5F4]" />
          </motion.div>
          <div className="text-left">
            <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-[#C88A96]">Now Playing</p>
            <p className="font-serif text-[11px] text-[#FAF5F4]">♪ Forever and Always</p>
          </div>
        </button>
      </div>

    </div>
  );
}