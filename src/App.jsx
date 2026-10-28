import { lazy, Suspense, useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Clock, Shirt, CheckCircle2, ChevronLeft, ChevronRight, ChevronDown, Send, Loader2 } from 'lucide-react';

import logoWebp from './logo.webp';
import bibleWebp from './assets/bible.webp';
import p1Small from './assets/p1-720.webp';
import p1Large from './assets/p1-1200.webp';
import p2Small from './assets/p2-720.webp';
import p2Large from './assets/p2-1200.webp';
import p3Small from './assets/p3-720.webp';
import p3Large from './assets/p3-1200.webp';
import dsc01656 from './assets/DSC01656.jpg';
import dsc01633 from './assets/DSC01633.jpg';
import dsc02216 from './assets/DSC02216.jpg';
import dsc02234 from './assets/DSC02234.jpg';
import churchVenue from './assets/st-joseph-parish-interior.png';
import principalAttireImage from './assets/attire-principal.png';
import guestAttireImage from './assets/attire-guests.png';
import entourageAttireImage from './assets/attire-entourage.png';
import andCalligraphy from './assets/and-calligraphy.png';
import welcomeCouple from './assets/welcome-couple.png';
import receptionVenue from './assets/fc-reception.jpg';
import receptionVenueWebp from './assets/fc-reception-720.webp';
import CoordinatorMode from './components/dashboard/CoordinatorMode';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import { useWeddingExperience } from './contexts/WeddingExperienceContext';
import WeddingEntourage from './components/entourage/WeddingEntourage';

const RSVPDashboard = lazy(() => import('./components/dashboard/RSVPDashboard'));

const chapterTitles = [
  ['The Invitation', 'Chapter I'],
  ['Our Love Story', 'Chapter II'],
  ['Captured Moments', 'Chapter III'],
  ['Wedding Entourage', 'Chapter IV'],
  ['Wedding Details', 'Chapter V'],
];

const timelineEvents = [
  {
    year: "Chapter 2.1",
    title: "High School Days",
    description: "We crossed paths as schoolmates and officially became a couple, marking the sweet beginning of our journey."
  },
  {
    year: "Chapter 2.2",
    title: "The Separation",
    description: "Not even a full month had passed before life parted our ways, leading to seven long years of walking separate paths."
  },
  {
    year: "Chapter 2.3",
    title: "Destiny's Return",
    description: "Seven years later, destiny brought us back together, proving that what is truly meant to be will always find its way home."
  }
];

const galleryPhotos = [
  { img: p1Small, webpSrcSet: `${p1Small} 720w, ${p1Large} 1200w`, preloadSrc: p1Large, caption: "A Playful Moment" },
  { img: p2Small, webpSrcSet: `${p2Small} 720w, ${p2Large} 1200w`, preloadSrc: p2Large, caption: "Exploring Together" },
  { img: p3Small, webpSrcSet: `${p3Small} 720w, ${p3Large} 1200w`, preloadSrc: p3Large, caption: "By the Sea" },
  { img: dsc01656, preloadSrc: dsc01656, caption: "Side by Side" },
  { img: dsc01633, preloadSrc: dsc01633, caption: "A Day on the Road", objectPosition: '20% center' },
  { img: dsc02216, preloadSrc: dsc02216, caption: "A Promise Together", objectPosition: '15% center' },
  { img: dsc02234, preloadSrc: dsc02234, caption: "Under the Old Tree" }
];

const criticalExperienceImages = [logoWebp, bibleWebp];

const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
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

const carouselSlideVariants = {
  enter: (direction) => ({ x: `${direction * 35}%`, opacity: 0.7, scale: 1.012 }),
  center: { x: '0%', opacity: 1, scale: 1 },
  exit: (direction) => ({ x: `${direction * -25}%`, opacity: 0.42, scale: 0.99 }),
};

export default function App() {
  const wedding = useWeddingExperience();
  const experience = wedding;
  const { identity, opening, schedule, gifts, rsvp, faqs, branding } = experience;
  const [firstName, secondName] = identity.coupleNames.split(/\s*&\s*/);
  const notes = wedding.notes ?? [];
  const chapters = [
    ...chapterTitles.map(([title, subtitle], id) => ({ id, title, subtitle })),
    ...(notes.length ? [{ id: 5, title: 'Wedding Notes', subtitle: 'Chapter VI' }] : []),
    { id: notes.length ? 6 : 5, title: 'RSVP', subtitle: notes.length ? 'Chapter VII' : 'Chapter VI' },
    ...(wedding.closing?.visible === false ? [] : [{ id: notes.length ? 7 : 6, title: 'Thank You', subtitle: notes.length ? 'Chapter VIII' : 'Chapter VII' }]),
  ];
  const weddingDetailsSectionIndex = 4;
  const weddingNotesSectionIndex = notes.length ? 5 : null;
  const rsvpSectionIndex = notes.length ? 6 : 5;
  const [phase, setPhase] = useState('welcome'); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [showCoordinatorMode, setShowCoordinatorMode] = useState(() => new URLSearchParams(window.location.search).get('mode') === 'coordinator');
  const [galleryMode, setGalleryMode] = useState('stack');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [galleryIdleTick, setGalleryIdleTick] = useState(0);
  const [galleryDirection, setGalleryDirection] = useState(1);
  const [galleryScrollLocked, setGalleryScrollLocked] = useState(false);
  const [isAdminPasswordOpen, setIsAdminPasswordOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [isValidatingAdmin, setIsValidatingAdmin] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [dashboardRows, setDashboardRows] = useState([]);
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [loadedImageSources, setLoadedImageSources] = useState(() => new Set());
  
  // RSVP Form States
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', guests: '1', attendance: 'yes', message: '' });
  const [timeRemaining, setTimeRemaining] = useState(() => Math.max(0, new Date(identity.weddingDate).getTime() - Date.now()));

  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const openingStartedRef = useRef(false);
  const galleryTriggerRef = useRef(null);
  const restoreGalleryFocusRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const isMessengerInAppBrowser = useMemo(() => (
    typeof navigator !== 'undefined' && /FBAN|FBAV|Messenger/i.test(navigator.userAgent)
  ), []);
  const canSwipeGallery = !shouldReduceMotion && !isMessengerInAppBrowser;
  const bibleParticles = useMemo(() => Array.from({ length: 12 }, () => ({
    size: Math.random() * 3 + 2,
    left: `${40 + Math.random() * 20}%`,
    rise: -320 - Math.random() * 150,
    driftStart: (Math.random() - 0.5) * 100,
    driftEnd: (Math.random() - 0.5) * 200,
    duration: Math.random() * 2.5 + 2,
    delay: Math.random() * 1.5,
  })), []);
  const ambientGlitters = useMemo(() => Array.from({ length: 14 }, () => ({
    size: Math.random() * 2 + 1,
    left: `${8 + Math.random() * 84}%`,
    top: `${8 + Math.random() * 80}%`,
    rise: -80 - Math.random() * 80,
    drift: (Math.random() - 0.5) * 36,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 2,
  })), []);

  useEffect(() => {
    const updateCountdown = () => setTimeRemaining(Math.max(0, new Date(identity.weddingDate).getTime() - Date.now()));
    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(intervalId);
  }, [identity.weddingDate]);

  const countdown = useMemo(() => {
    const totalSeconds = Math.floor(timeRemaining / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (galleryMode !== 'stack' || shouldReduceMotion) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveGalleryIndex((currentIndex) => (currentIndex + 1) % galleryPhotos.length);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, [galleryMode, shouldReduceMotion]);

  useEffect(() => {
    if (galleryMode !== 'carousel') return undefined;

    const timeoutId = window.setTimeout(() => closeGalleryCarousel(), 12000);
    return () => window.clearTimeout(timeoutId);
  }, [galleryMode, galleryIdleTick]);

  useEffect(() => {
    if (galleryMode !== 'carousel') return undefined;

    [activeGalleryIndex, (activeGalleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length, (activeGalleryIndex + 1) % galleryPhotos.length].forEach((index) => {
      const image = new Image();
      image.src = galleryPhotos[index].preloadSrc;
    });
  }, [activeGalleryIndex, galleryMode]);

  useEffect(() => {
    if (activeSection < 1) return;
    const image = new Image();
    image.src = galleryPhotos[0].preloadSrc;
  }, [activeSection]);

  useEffect(() => {
    if (!galleryScrollLocked) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const scrollContainer = containerRef.current;
    const previousContainerOverflow = scrollContainer?.style.overflowY;
    document.body.style.overflow = 'hidden';
    if (scrollContainer) scrollContainer.style.overflowY = 'hidden';

    const handleGalleryKeydown = (event) => {
      if (event.key === 'Escape') closeGalleryCarousel();
      if (event.key === 'ArrowLeft') moveGallery(-1);
      if (event.key === 'ArrowRight') moveGallery(1);
    };
    window.addEventListener('keydown', handleGalleryKeydown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      if (scrollContainer) scrollContainer.style.overflowY = previousContainerOverflow ?? '';
      window.removeEventListener('keydown', handleGalleryKeydown);
    };
  }, [galleryScrollLocked, activeGalleryIndex]);

  useEffect(() => {
    if (galleryMode === 'carousel' && activeSection !== 2) {
      closeGalleryCarousel({ restoreFocus: false });
    }
  }, [activeSection, galleryMode]);

  useEffect(() => {
    if (phase !== 'bible') return undefined;

    let isCancelled = false;
    let transitionTimeoutId;
    const imageTimeoutIds = new Set();
    const startedAt = Date.now();
    setLoadedImageCount(0);

    const preloadImage = (source) => new Promise((resolve) => {
      const image = new Image();
      let isSettled = false;
      const finish = (didLoad = false) => {
        if (isSettled) return;
        isSettled = true;
        window.clearTimeout(timeoutId);
        imageTimeoutIds.delete(timeoutId);
        if (!isCancelled) setLoadedImageCount((count) => count + 1);
        if (didLoad && !isCancelled) {
          setLoadedImageSources((sources) => {
            if (sources.has(source)) return sources;
            const nextSources = new Set(sources);
            nextSources.add(source);
            return nextSources;
          });
        }
        resolve();
      };

      // Mobile browsers can leave Image.decode() pending indefinitely. A loaded
      // image is sufficient here, and this timeout guarantees the opening never traps a guest.
      const timeoutId = window.setTimeout(finish, 8000);
      imageTimeoutIds.add(timeoutId);
      image.onload = () => finish(true);
      image.onerror = () => finish(false);
      image.decoding = 'async';
      image.src = source;
      if (image.complete) finish(image.naturalWidth > 0);
    });

    Promise.all(criticalExperienceImages.map(preloadImage)).then(() => {
      if (isCancelled) return;
      const remainingVerseTime = Math.max(0, 6500 - (Date.now() - startedAt));
      transitionTimeoutId = window.setTimeout(() => {
        if (!isCancelled) setPhase('curtains');
      }, remainingVerseTime);
    });

    return () => {
      isCancelled = true;
      window.clearTimeout(transitionTimeoutId);
      imageTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [phase]);

  const handleOpenInvitation = () => {
    if (openingStartedRef.current) return;
    openingStartedRef.current = true;

    if (audioRef.current) {
      audioRef.current.currentTime = 2;
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }

    setPhase(wedding.opening.verse && wedding.opening.citation ? 'bible' : 'curtains');

  };

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const viewportCenter = container.scrollTop + container.clientHeight / 2;
    const sections = Array.from(container.children);
    const index = sections.findIndex((section) => (
      viewportCenter >= section.offsetTop
      && viewportCenter < section.offsetTop + section.offsetHeight
    ));

    if (index !== -1 && index !== activeSection) {
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

  const moveGallery = (direction) => {
    setGalleryIdleTick((tick) => tick + 1);
    setGalleryDirection(direction);
    setActiveGalleryIndex((currentIndex) => (currentIndex + direction + galleryPhotos.length) % galleryPhotos.length);
  };

  const openGalleryCarousel = () => {
    setGalleryIdleTick((tick) => tick + 1);
    setGalleryScrollLocked(true);
    setGalleryMode('carousel');
  };

  const closeGalleryCarousel = ({ restoreFocus = true } = {}) => {
    restoreGalleryFocusRef.current = restoreFocus;
    setGalleryMode('stack');
  };

  const stackedGalleryPhotos = galleryPhotos
    .map((photo, index) => ({
      ...photo,
      stackPosition: (index - activeGalleryIndex + galleryPhotos.length) % galleryPhotos.length,
    }))
    .sort((first, second) => second.stackPosition - first.stackPosition);
  const activeGalleryPhoto = galleryPhotos[activeGalleryIndex];
  const isActiveGalleryPhotoLoaded = loadedImageSources.has(activeGalleryPhoto.preloadSrc);


  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (formData.name.trim().toLowerCase() === 'wed-invi-admin') {
      setAdminPasswordError('');
      setIsAdminPasswordOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      if (!supabase) throw new Error('Supabase is not configured.');
      const { error } = await supabase.from('rsvp_submissions').insert({
        full_name: formData.name.trim(),
        attendance: formData.attendance,
        guest_count: Number(formData.guests),
        message: formData.message.trim() || null,
      });
      if (error) throw error;
      setRsvpSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert(isSupabaseConfigured
        ? 'There was an error saving your RSVP. Please try again after the Supabase migration is installed.'
        : 'RSVP is not configured for this deployment yet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnotherRsvp = () => {
    setFormData({ name: '', guests: '1', attendance: 'yes', message: '' });
    setRsvpSubmitted(false);
  };

  const handleAdminPasswordSubmit = async (event) => {
    event.preventDefault();
    setIsValidatingAdmin(true);
    setAdminPasswordError('');

    try {
      if (!supabase) throw new Error('Supabase is not configured.');
      const { data, error } = await supabase.rpc('get_rsvp_dashboard', {
        p_username: 'wed-invi-admin',
        p_password: adminPassword,
      });

      if (error) {
        const isMissingDashboardFunction = error.code === 'PGRST202' || error.message?.includes('get_rsvp_dashboard');
        const isMissingCryptoExtension = error.message?.includes('function crypt');
        setAdminPasswordError(
          isMissingCryptoExtension
            ? 'Dashboard security needs its one-time Supabase function update.'
            : isMissingDashboardFunction
            ? 'Dashboard setup is incomplete. Run the supplied Supabase migration once, then try again.'
            : 'Incorrect password. Please try again.',
        );
        return;
      }

      setDashboardRows(data ?? []);
      setAdminPassword('');
      setIsAdminPasswordOpen(false);
      setIsAdminDashboardOpen(true);
    } catch (error) {
      console.error('Error opening RSVP dashboard:', error);
      setAdminPasswordError(isSupabaseConfigured
        ? 'Dashboard connection failed. Check your connection and try again.'
        : 'This deployment is missing its Supabase configuration.');
    } finally {
      setIsValidatingAdmin(false);
    }
  };

  return (
    <div className="bg-[#36121A] text-[#F3E5E8] font-serif selection:bg-[#C48C78]/30 selection:text-[#36121A] h-[100svh] w-screen overflow-hidden relative antialiased flex flex-col">
      {showCoordinatorMode && <CoordinatorMode onClose={() => setShowCoordinatorMode(false)} />}
      {isAdminDashboardOpen && <Suspense fallback={null}><RSVPDashboard rows={dashboardRows} onClose={() => setIsAdminDashboardOpen(false)} /></Suspense>}
      <AnimatePresence>
        {isAdminPasswordOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[75] flex items-center justify-center bg-[#16070B]/80 p-6 backdrop-blur-sm">
            <motion.form role="dialog" aria-modal="true" aria-labelledby="admin-access-title" initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} onSubmit={handleAdminPasswordSubmit} className="w-full max-w-sm rounded-3xl border border-[#C8A96A]/45 bg-[#451822] p-7 shadow-2xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C8A96A]">Recognizing invitation...</p>
              <h2 id="admin-access-title" className="mt-3 font-serif text-3xl font-light text-[#F3E5E8]">Admin access</h2>
              <label htmlFor="admin-password" className="mt-6 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#D4B8BC]">Password</label><input id="admin-password" autoFocus required autoComplete="current-password" type="password" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#C8A96A]/35 bg-[#2A0D14] px-4 py-3 font-serif text-lg text-[#F3E5E8] outline-none" />
              {adminPasswordError && <p className="mt-3 text-sm text-[#F3B5AD]">{adminPasswordError}</p>}
              <div className="mt-6 flex gap-3"><button type="button" onClick={() => setIsAdminPasswordOpen(false)} className="flex-1 rounded-full border border-[#C8A96A]/35 px-4 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#F3E5E8]">Cancel</button><button type="submit" disabled={isValidatingAdmin} className="flex-1 rounded-full bg-[#C8A96A] px-4 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#2A0D14] disabled:opacity-60">{isValidatingAdmin ? 'Checking...' : 'Continue'}</button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <audio ref={audioRef} loop src={wedding.opening.musicSrc ?? '/bg-music.mp3'} preload="auto" />

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
            <img
              src={welcomeCouple}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,13,20,0.66)_0%,rgba(42,13,20,0.72)_48%,rgba(42,13,20,0.8)_100%)]" />
            <div className="absolute inset-0 bg-[#36121A]/15" />
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
              <img src={logoWebp} width="2000" height="2000" alt={identity.monogramAlt} fetchPriority="high" className="h-full w-full object-contain filter drop-shadow-[0_0_20px_rgba(196,140,120,0.6)]" />
              </motion.div>

              <p className="font-sans text-[10px] tracking-[0.4em] text-[#C48C78] uppercase mb-1">You Are Cordially Invited</p>
              <h1 className="font-serif text-3xl md:text-4xl text-[#F3E5E8] font-light mb-8">{identity.coupleNames}</h1>

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
              {bibleParticles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#e6d5bc]"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: particle.left,
                    bottom: '25%',
                  }}
                  animate={{
                    y: [0, particle.rise],
                    x: [particle.driftStart, particle.driftEnd],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
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
                “{wedding.opening.verse}”
              </blockquote>
              <div className="w-16 h-[1px] bg-[#C48C78]/60 mx-auto mb-3" />
              <p className="font-sans text-xs tracking-[0.3em] text-[#D4B8BC] uppercase font-medium">
                {wedding.opening.citation}
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
              <img src={bibleWebp} width="598" height="372" alt="Holy Bible" fetchPriority="high" className="h-full w-full object-contain filter drop-shadow-[0_0_25px_rgba(196,140,120,0.6)]" />
            </motion.div>
            <div className="absolute bottom-6 left-1/2 w-48 -translate-x-1/2 text-center" role="status" aria-live="polite">
              <p className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#D4B8BC]">Preparing your experience</p>
              <div className="mt-2 h-px overflow-hidden bg-[#C48C78]/25">
                <motion.div
                  className="h-full bg-[#C48C78]"
                  animate={{ width: `${(loadedImageCount / criticalExperienceImages.length) * 100}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
            </div>
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
              onAnimationComplete={() => setPhase('ready')}
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

      {phase === 'ready' && <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {ambientGlitters.map((glitter, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-[#F7E8B4] shadow-[0_0_8px_rgba(247,232,180,0.75)]"
            style={{ width: glitter.size, height: glitter.size, left: glitter.left, top: glitter.top }}
            animate={shouldReduceMotion
              ? { opacity: 0.28 }
              : { y: [0, glitter.rise], x: [0, glitter.drift], opacity: [0, 0.6, 0] }}
            transition={shouldReduceMotion
              ? { duration: 0 }
              : { duration: glitter.duration, delay: glitter.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
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
        className="relative z-10 flex-1 h-[100svh] w-full touch-pan-y overscroll-x-none overflow-y-scroll scroll-smooth no-scrollbar md:snap-y md:snap-mandatory"
      >
        
        {/* SECTION 0: HERO (CHAPTER 1) WITH MAGICAL CURTAIN-REVEAL ANIMATIONS */}
        <section className="h-[100svh] w-full snap-start snap-always flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
          
          {/* Glowing Magical Aura Burst on Reveal */}
          <motion.div 
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.6, 1.4, 1], opacity: [0, 0.5, 0.25] }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="hidden md:block absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#C48C78]/20 via-[#b08d57]/15 to-transparent blur-3xl pointer-events-none"
          />

          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute w-64 h-64 rounded-full bg-[#C48C78]/10 blur-3xl pointer-events-none"
          />

          {/* Floating magical sparkles behind Chapter 1 content */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: activeSection === 0 ? 0.13 : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
          >
            <picture className="block h-[min(78vw,30rem)] w-[min(78vw,30rem)]">
              <source srcSet={logoWebp} type="image/webp" />
              <img src={logoWebp} width="2000" height="2000" alt="" className="h-full w-full object-contain" />
            </picture>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={activeSection === 0 ? 'visible' : 'hidden'}
            variants={magicalHeroVariant}
            className="max-w-4xl mx-auto px-2 pt-1 relative z-10 flex flex-col items-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="inline-block mb-5 px-6 py-1.5 border-y border-[#C48C78]/40 bg-[#36121A]/40 backdrop-blur-sm rounded-lg"
            >
              <p className="font-sans text-[11px] tracking-[0.45em] text-[#C48C78] uppercase font-medium">
                Together with their families
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8"
            >
              <h1 className="mr-20 font-serif text-7xl md:text-7xl lg:text-8xl tracking-tight text-[#D8B497] font-light drop-shadow-[0_3px_16px_rgba(0,0,0,0.45)]">
                Cloyd
              </h1>
              <div
                role="img"
                aria-label="and"
                className="my-0.5 h-12 w-28 md:my-0 md:h-11 md:w-36"
                style={{
                  backgroundColor: '#D8B497',
                  maskImage: `url(${andCalligraphy})`,
                  WebkitMaskImage: `url(${andCalligraphy})`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                }}
              >
              </div>
              <h1 className="ml-20 font-serif text-7xl md:text-7xl lg:text-8xl tracking-tight text-[#D8B497] font-light drop-shadow-[0_3px_16px_rgba(0,0,0,0.45)]">
                Cyrin
              </h1>
            </motion.div>

            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C48C78] to-transparent mx-auto my-4" 
            />

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="font-serif italic text-sm text-[#D4B8BC] mt-10 font-medium"
            >
              With gratefull hearts, we invite you to witness the day we begin our forever.
              
            </motion.p>

              <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="font-serif italic text-[18px] text-[#D4B8BC] mt-2 font-medium"
            > 9:00 AM <br/>
              December 19, 2026
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="font-serif text-sm text-[#D4B8BC] mt-10 font-medium"
            >
              SCROLL TO BEGIN
            </motion.p>
          </motion.div>
        </section>

        {/* SECTION 1: OUR LOVE STORY */}
        <section className="h-[100svh] w-full snap-start snap-always flex flex-col items-center justify-start px-6 py-10 md:px-20 md:py-16 max-w-4xl mx-auto overflow-y-auto no-scrollbar">
          <div className="w-full text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.65 }}
              variants={fadeInUp}
              className="mb-10"
            >
              <span className="text-xs uppercase tracking-[0.4em] text-[#C48C78] font-semibold block mb-2">Memories &amp; Milestones</span>
              <h2 className="text-3xl md:text-4xl font-light font-serif text-[#F3E5E8]">Our Love Story</h2>
              <div className="w-12 h-[1px] bg-[#C48C78] mx-auto mt-3" />
            </motion.div>

            <div className="relative ml-4 space-y-10 text-left md:ml-24">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-px"
                style={{ background: 'linear-gradient(180deg, rgba(196,140,120,0.08) 0%, rgba(196,140,120,0.58) 20%, rgba(216,180,151,0.72) 50%, rgba(196,140,120,0.58) 80%, rgba(196,140,120,0.08) 100%)' }}
              />
              {timelineEvents.map((item, index) => {
                const storyImage = [dsc01656, dsc02216, dsc02234][index];
                return (
                <motion.div
                  key={item.year}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.55 }}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                  className="group relative ml-2 overflow-visible rounded-xl md:ml-0"
                >
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="absolute -left-4 top-1.5 w-2.5 h-2.5 rounded-full bg-[#C48C78] ring-4 ring-[#36121A] transition-transform duration-300 shadow-[0_0_10px_rgba(196,140,120,0.8)]"
                  />
                  <div className="overflow-hidden rounded-xl border border-[#C48C78]/25 bg-[#2A0D14]/85 shadow-lg">
                    <img src={storyImage} alt="" aria-hidden="true" loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
                    <div className="flex flex-col justify-center px-4 py-4 text-left sm:px-7 sm:py-6">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C48C78] sm:text-[10px] sm:tracking-widest">{item.year}</span>
                  <h3 className="mt-1 mb-1 font-serif text-base font-light leading-snug text-[#F3E5E8] group-hover:text-[#C48C78] sm:text-xl md:text-2xl">{item.title}</h3>
                  <p className="text-[11px] leading-relaxed text-[#D4B8BC] sm:text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: CAPTURED MOMENTS */}
        <section className="h-[100svh] w-full snap-start snap-always flex flex-col items-center justify-center px-6 md:px-20 max-w-5xl mx-auto overflow-y-auto no-scrollbar py-16">
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

            <AnimatePresence initial={false}>
              {galleryMode === 'stack' && (
                <motion.button
                  key="gallery-stack"
                  ref={galleryTriggerRef}
                  type="button"
                  onClick={openGalleryCarousel}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative mx-auto block h-[20rem] w-full max-w-sm cursor-pointer rounded-[1.75rem] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C48C78] md:h-[24rem]"
                  aria-label="Open the wedding photo album"
                >
                  {stackedGalleryPhotos.map((photo) => {
                    const rotation = photo.stackPosition === 1 ? -5 : photo.stackPosition === 2 ? 6 : 0;
                    const isPhotoLoaded = loadedImageSources.has(photo.preloadSrc);
                    return (
                      <motion.div
                        key={photo.caption}
                        animate={{
                          x: photo.stackPosition * 10,
                          y: photo.stackPosition * 9,
                          rotate: rotation,
                          scale: 1 - photo.stackPosition * 0.045,
                          opacity: 1 - photo.stackPosition * 0.16,
                        }}
                        transition={{ duration: 1.55, ease: [0.16, 1, 0.3, 1] }}
                        style={{ zIndex: galleryPhotos.length - photo.stackPosition }}
                        className="absolute inset-0 transform-gpu overflow-hidden rounded-[1.75rem] border border-[#C48C78]/35 bg-[#451822] p-2 shadow-[0_18px_45px_rgba(0,0,0,0.38)] [backface-visibility:hidden] will-change-transform"
                      >
                        {!isPhotoLoaded && (
                          <div className="absolute inset-2 flex items-center justify-center rounded-[1.35rem] bg-[linear-gradient(135deg,#2A0D14,#5A2430,#2A0D14)] p-6 text-center">
                            <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#D4B8BC]">Preparing photograph</span>
                          </div>
                        )}
                        <picture className="block h-full w-full">{photo.webpSrcSet && <source srcSet={photo.webpSrcSet} sizes="(min-width: 768px) 384px, 92vw" type="image/webp" />}<img src={photo.img} width="1200" height="1200" alt={photo.caption} draggable="false" loading="lazy" decoding="async" onLoad={() => setLoadedImageSources((sources) => sources.has(photo.preloadSrc) ? sources : new Set(sources).add(photo.preloadSrc))} className={`relative h-full w-full rounded-[1.35rem] object-cover transition-opacity duration-700 [backface-visibility:hidden] ${isPhotoLoaded ? 'opacity-100' : 'opacity-0'}`} /></picture>
                        {photo.stackPosition === 0 && (
                          <div className="absolute inset-x-2 bottom-2 rounded-b-[1.35rem] bg-gradient-to-t from-[#2A0D14]/90 via-[#2A0D14]/30 to-transparent px-5 pb-5 pt-12">
                            <p className="font-serif text-lg text-[#F3E5E8]">{photo.caption}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                  <span className="absolute -bottom-9 left-0 right-0 text-center font-sans text-[10px] uppercase tracking-[0.32em] text-[#C48C78] transition-opacity duration-300 group-hover:opacity-100">Tap to open our album</span>
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence
              initial={false}
              onExitComplete={() => {
                setGalleryScrollLocked(false);
                if (restoreGalleryFocusRef.current) {
                  galleryTriggerRef.current?.focus();
                  restoreGalleryFocusRef.current = false;
                }
              }}
            >
              {galleryMode === 'carousel' && (
                <motion.div
                  key="gallery-carousel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-0 z-[65] flex items-center justify-center bg-[#16070B]/80 p-5 backdrop-blur-sm"
                  onClick={closeGalleryCarousel}
                >
                  <motion.section
                    role="dialog"
                    aria-modal="true"
                    aria-label="Wedding photo album"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    transition={{ duration: shouldReduceMotion ? 0.2 : 0.46, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(event) => event.stopPropagation()}
                    onPointerDown={() => setGalleryIdleTick((tick) => tick + 1)}
                    className="relative w-full max-w-3xl touch-pan-y overscroll-x-none"
                  >
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#C48C78]/35 bg-[#451822] p-2 shadow-[0_18px_45px_rgba(0,0,0,0.38)]">
                      <motion.div key={`previous-${activeGalleryIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 0.38 }} transition={{ duration: 0.5 }} className="pointer-events-none absolute inset-y-2 -left-[16%] w-[32%] overflow-hidden rounded-[1.35rem] blur-[1px] md:-left-[21%] md:w-[42%]">
                        <img src={galleryPhotos[(activeGalleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length].preloadSrc} alt="" decoding="async" className="h-full w-full object-cover" />
                      </motion.div>
                      <motion.div key={`next-${activeGalleryIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 0.38 }} transition={{ duration: 0.5 }} className="pointer-events-none absolute inset-y-2 -right-[16%] w-[32%] overflow-hidden rounded-[1.35rem] blur-[1px] md:-right-[21%] md:w-[42%]">
                        <img src={galleryPhotos[(activeGalleryIndex + 1) % galleryPhotos.length].preloadSrc} alt="" decoding="async" className="h-full w-full object-cover" />
                      </motion.div>
                      <div className="relative mx-auto w-[95%] aspect-[4/5] md:w-[76%] md:aspect-[16/10]">
                      <AnimatePresence initial={false} custom={shouldReduceMotion ? 0 : galleryDirection}>
                      <motion.figure
                        key={galleryPhotos[activeGalleryIndex].caption}
                        custom={shouldReduceMotion ? 0 : galleryDirection}
                        variants={carouselSlideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: shouldReduceMotion ? 0.2 : 0.56, ease: [0.22, 1, 0.36, 1] }}
                        drag={canSwipeGallery ? 'x' : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.08}
                        onDragEnd={(_, info) => {
                          if (Math.abs(info.offset.x) > 45) moveGallery(info.offset.x > 0 ? -1 : 1);
                        }}
                        className="absolute inset-0 m-0 touch-pan-y overflow-hidden rounded-[1.35rem]"
                      >
                        {!isActiveGalleryPhotoLoaded && <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#2A0D14,#5A2430,#2A0D14)]"><span className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#D4B8BC]">Preparing photograph</span></div>}
                        <picture className="block h-full w-full">{activeGalleryPhoto.webpSrcSet && <source srcSet={activeGalleryPhoto.webpSrcSet} sizes="(min-width: 768px) 720px, 76vw" type="image/webp" />}<img src={activeGalleryPhoto.img} width="1200" height="1200" alt={activeGalleryPhoto.caption} decoding="async" onLoad={() => setLoadedImageSources((sources) => sources.has(activeGalleryPhoto.preloadSrc) ? sources : new Set(sources).add(activeGalleryPhoto.preloadSrc))} style={{ objectPosition: activeGalleryPhoto.objectPosition ?? 'center' }} className={`h-full w-full object-cover transition-opacity duration-700 ${isActiveGalleryPhotoLoaded ? 'opacity-100' : 'opacity-0'}`} /></picture>
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2A0D14]/90 to-transparent px-6 pb-6 pt-16 font-serif text-xl text-[#F3E5E8]">{galleryPhotos[activeGalleryIndex].caption}</figcaption>
                      </motion.figure>
                      </AnimatePresence>
                      </div>
                      <button type="button" onClick={() => moveGallery(-1)} className="absolute left-[8%] top-1/2 -translate-y-1/2 rounded-full border border-[#F3E5E8]/30 bg-[#2A0D14]/75 p-2 text-[#F3E5E8] backdrop-blur-sm" aria-label="Previous photo"><ChevronLeft className="h-5 w-5" /></button>
                      <button type="button" onClick={() => moveGallery(1)} className="absolute right-[8%] top-1/2 -translate-y-1/2 rounded-full border border-[#F3E5E8]/30 bg-[#2A0D14]/75 p-2 text-[#F3E5E8] backdrop-blur-sm" aria-label="Next photo"><ChevronRight className="h-5 w-5" /></button>
                    </div>
                    {isMessengerInAppBrowser && <p className="mt-4 text-center font-sans text-[9px] uppercase tracking-[0.22em] text-[#D4B8BC]">Use the arrows to explore the album</p>}
                    <button type="button" onClick={closeGalleryCarousel} className="mx-auto mt-5 block font-sans text-[10px] uppercase tracking-[0.28em] text-[#C48C78] transition-colors hover:text-[#F3E5E8]">Close album</button>
                  </motion.section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <WeddingEntourage people={wedding.entourage} />

        {/* WEDDING DETAILS */}
        <section className="min-h-[100svh] w-full snap-start snap-always scroll-mt-6 flex flex-col items-center justify-start px-6 py-12 md:h-[100svh] md:max-w-5xl md:justify-start md:overflow-y-auto md:px-20 md:py-16 md:no-scrollbar mx-auto">
          <div className="w-full">
            <motion.div initial="hidden" animate={activeSection === weddingDetailsSectionIndex ? 'visible' : 'hidden'} variants={fadeInUp} className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.4em] text-[#C48C78] font-semibold block mb-1">Join Our Celebration</span>
              <h2 className="text-3xl md:text-4xl font-light font-serif text-[#F3E5E8]">Wedding Details</h2>
              <div className="w-12 h-[1px] bg-[#C48C78] mx-auto mt-3" />
            </motion.div>

            <motion.div initial="hidden" animate={activeSection === weddingDetailsSectionIndex ? 'visible' : 'hidden'} variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-2xl border border-[#C8A96A]/60 bg-[#2A0D14]/85 text-center shadow-xl">
                <img src={churchVenue} width="392" height="393" alt="Interior of St. Joseph Parish Church" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                <div className="flex flex-col items-center p-5 sm:p-6">
                <div className="w-10 h-10 rounded-full bg-[#C48C78]/15 flex items-center justify-center mb-3 text-[#C48C78]">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-light text-[#F3E5E8] mb-1">The Ceremony</h3>
                <p className="text-xs font-semibold text-[#C48C78] mb-0.5">{new Intl.DateTimeFormat('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Manila' }).format(new Date(schedule.ceremony.dateTime))}</p>
                <p className="text-xs text-[#D4B8BC] mb-3">{schedule.ceremony.timeLabel}</p>
                <p className="text-[11px] font-semibold text-[#F3E5E8] tracking-widest uppercase mb-1">{schedule.ceremony.venue}</p>
                <p className="text-[10px] text-[#D4B8BC] mb-4">{schedule.ceremony.address}</p>
                <a 
                  href={schedule.ceremony.mapUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C48C78] hover:text-[#F3E5E8] font-semibold border-b border-[#C48C78] pb-0.5"
                >
                  <MapPin className="w-4 h-4 text-[#C48C78]" />
                  <span>View Church Location</span>
                </a>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-2xl border border-[#C8A96A]/60 bg-[#2A0D14]/85 text-center shadow-xl">
                <picture className="block"><source srcSet={receptionVenueWebp} type="image/webp" /><img src={receptionVenue} width="1333" height="1000" alt="F and C reception venue" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" /></picture>
                <div className="flex flex-col items-center p-5 sm:p-6">
                <div className="w-10 h-10 rounded-full bg-[#C48C78]/15 flex items-center justify-center mb-3 text-[#C48C78]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-light text-[#F3E5E8] mb-1">The Reception</h3>
                <p className="text-xs font-semibold text-[#C48C78] mb-0.5">Following the Ceremony</p>
                <p className="text-xs text-[#D4B8BC] mb-3">{schedule.reception.timeLabel}</p>
                <p className="text-[11px] font-semibold text-[#F3E5E8] tracking-widest uppercase mb-1">{schedule.reception.venue}</p>
                <p className="text-[10px] text-[#D4B8BC] mb-4">{schedule.reception.address}</p>
                <a 
                  href={schedule.reception.mapUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C48C78] hover:text-[#F3E5E8] font-semibold border-b border-[#C48C78] pb-0.5"
                >
                  <MapPin className="w-4 h-4 text-[#C48C78]" />
                  <span>View Reception Location</span>
                </a>
                </div>
              </motion.div>

            </motion.div>

            <motion.div initial="hidden" animate={activeSection === weddingDetailsSectionIndex ? 'visible' : 'hidden'} variants={fadeInUp} transition={{ delay: 0.15 }} className="grid grid-cols-1 gap-6">
              <div className="rounded-2xl border border-[#C8A96A]/60 bg-[#F3E5E8] p-5 text-center shadow-lg sm:p-6">
                <Shirt className="mx-auto mb-2 h-6 w-6 text-[#9B5F59]" aria-hidden="true" />
                <h3 className="font-serif text-xl font-light text-[#641626]">Attire Guide</h3>
                <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.24em] text-[#8A5F5E]">A thoughtful palette for our celebration</p>
                <div className="mt-5 divide-y divide-[#9B6A67]/25">
                  {[
                    { title: 'Principal Sponsors', lines: ['Ninang · Floor-length dresses in nude or beige', 'Ninong · Black suit with a black necktie'], colors: ['#D9C2A2', '#BFA078', '#211D1B'], image: principalAttireImage },
                    { title: 'Guests', lines: ['Ladies · Blush-pink floor-length attire', 'Gentlemen · Black suit with a pink necktie'], colors: ['#D99A9A', '#BE777D', '#211D1B'], image: guestAttireImage },
                    { title: 'Entourage', lines: ['Bridesmaids · Burgundy floor-length dresses', 'Groomsmen · Black suit with a burgundy necktie'], colors: ['#800020', '#A7475A', '#211D1B'], image: entourageAttireImage },
                  ].map((guide, index) => {
                    const figure = <img src={guide.image} alt={`${guide.title} attire illustration`} width="297" height="323" loading="lazy" decoding="async" className="mx-auto max-h-32 w-auto object-contain sm:max-h-36 md:max-h-40" />;
                    const details = <div className="min-w-0 text-left">
                      <h4 className="font-serif text-lg text-[#641626] sm:text-xl">{guide.title}</h4>
                      <ul className="mt-2 space-y-1.5 font-sans text-[11px] leading-relaxed text-[#76504F] sm:text-xs">
                        {guide.lines.map((line) => <li key={line}>{line}</li>)}
                      </ul>
                      <div className="mt-3 flex gap-2" aria-label={`${guide.title} attire color palette`}>
                        {guide.colors.map((color) => <span key={color} className="h-3.5 w-3.5 rounded-full border border-[#76504F]/30" style={{ backgroundColor: color }} />)}
                      </div>
                    </div>;
                    return <section key={guide.title} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-3 px-2 py-4 first:pt-3 last:pb-2 sm:gap-6 sm:px-5 sm:py-5 md:gap-10 md:px-10">
                      {index % 2 === 0 ? <>{figure}{details}</> : <>{details}{figure}</>}
                    </section>
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {notes.length > 0 && <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: activeSection === weddingNotesSectionIndex ? 1 : 0, y: activeSection === weddingNotesSectionIndex ? 0 : 14 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full snap-start snap-always flex flex-col items-center justify-center px-6 py-10 md:min-h-[100svh] md:px-20 md:py-16"
        >
          <div className="w-full max-w-2xl text-center">
            <span className="font-sans text-[9px] uppercase tracking-[0.38em] text-[#C48C78]">A note before the day</span>
            <h2 className="mt-3 font-serif text-4xl font-light tracking-wide text-[#F3E5E8] md:text-5xl">Wedding Notes</h2>
            <div className="mx-auto mt-5 flex w-24 items-center justify-center gap-2" aria-hidden="true">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C48C78]/70" />
              <span className="h-1 w-1 rotate-45 bg-[#C48C78]" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C48C78]/70" />
            </div>
            <div className="mt-9 border-t border-[#C48C78]/30 text-left">
              {notes.map((note, index) => {
                const isExpanded = expandedNoteId === note.id;
                const panelId = `wedding-note-${note.id}`;
                return <article key={note.id} className="border-b border-[#C48C78]/25 px-2 sm:px-3">
                  <h3 className="m-0">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => setExpandedNoteId(isExpanded ? null : note.id)}
                      className={`flex min-h-[4.5rem] w-full items-center gap-3 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C48C78] ${isExpanded ? 'text-[#D8B497]' : 'text-[#F3E5E8] hover:text-[#D8B497]'}`}
                    >
                      <span className="w-7 shrink-0 font-sans text-[9px] tracking-[0.14em] text-[#C48C78]/75">{String(index + 1).padStart(2, '0')}</span>
                      <span className="flex-1 font-serif text-[19px] leading-snug sm:text-[21px]">{note.title}</span>
                      <ChevronDown aria-hidden="true" className={`h-[17px] w-[17px] shrink-0 text-[#C48C78] transition-transform duration-300 ease-out ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </h3>
                  {note.description && <motion.div
                    id={panelId}
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden={!isExpanded}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pl-10 pr-8 font-sans text-[13px] leading-[1.8] text-[#D4B8BC]/90 sm:text-sm">{note.description}</p>
                  </motion.div>}
                </article>;
              })}
            </div>
          </div>
        </motion.section>}

        {/* RSVP */}
        <section className="min-h-[100svh] w-full snap-start snap-always flex flex-col items-center justify-center px-6 py-16 md:px-20">
          <div className="mx-auto w-full max-w-xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: activeSection === rsvpSectionIndex ? 1 : 0, y: activeSection === rsvpSectionIndex ? 0 : 16 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="bg-[#451822]/90 border border-[#C48C78]/40 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md w-full relative overflow-hidden">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-[0.4em] text-[#C48C78] font-semibold block mb-2">Be Our Guest</span>
                <h3 className="text-3xl font-serif font-light text-[#F3E5E8]">RSVP</h3>
                <p className="text-xs text-[#D4B8BC] mt-1">Kindly respond on or before {new Intl.DateTimeFormat('en-PH', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Manila' }).format(new Date(rsvp.deadline))}</p>
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
                      <label htmlFor="rsvp-name" className="block text-xs uppercase tracking-widest text-[#C48C78] mb-1 font-semibold">Full Name</label>
                      <input 
                        id="rsvp-name"
                        autoComplete="name"
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
                        <label htmlFor="rsvp-attendance" className="block text-xs uppercase tracking-widest text-[#C48C78] mb-1 font-semibold">Attendance</label>
                        <select 
                          id="rsvp-attendance"
                          value={formData.attendance}
                          onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                          className="w-full bg-[#2A0D14] border border-[#C48C78]/50 rounded-xl px-4 py-2.5 text-sm text-[#F3E5E8] focus:outline-none focus:border-[#C48C78] transition-colors"
                        >
                          <option value="yes" className="bg-[#2A0D14]">Joyfully Accept</option>
                          <option value="no" className="bg-[#2A0D14]">Regretfully Decline</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="rsvp-guests" className="block text-xs uppercase tracking-widest text-[#C48C78] mb-1 font-semibold">Number of Guests</label>
                        <select 
                          id="rsvp-guests"
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
                      <label htmlFor="rsvp-message" className="block text-xs uppercase tracking-widest text-[#C48C78] mb-1 font-semibold">Wishes for the Couple</label>
                      <textarea 
                        id="rsvp-message"
                        rows="2"
                        placeholder="Leave a sweet message..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-[#2A0D14] border border-[#C48C78]/50 rounded-xl px-4 py-2.5 text-sm text-[#F3E5E8] placeholder-[#D4B8BC]/40 focus:outline-none focus:border-[#C48C78] transition-colors"
                      />
                    </div>

                    <div className="text-center pt-1">
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#C48C78] hover:bg-[#b07864] text-[#36121A] py-3 rounded-full text-xs uppercase tracking-[0.3em] font-bold shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <><Loader2 className="w-4 h-4 text-[#36121A] animate-spin" /><span>Submitting...</span></>
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
                  <motion.div key="success-message" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center py-8 space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-[#C48C78] mx-auto animate-bounce" />
                    <h4 className="text-2xl font-serif text-[#F3E5E8]">Thank You, {formData.name}!</h4>
                    <p className="text-sm text-[#D4B8BC] max-w-md mx-auto">
                      {formData.attendance === 'yes' 
                        ? "We have successfully recorded your response. We can't wait to celebrate our special day with you!"
                        : "We are sorry you won't be able to make it, but thank you for letting us know."}
                    </p>
                    <button
                      type="button"
                      onClick={handleSubmitAnotherRsvp}
                      className="mt-5 rounded-full border border-[#C48C78]/55 px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F3E5E8] transition-colors hover:border-[#C48C78] hover:bg-[#C48C78]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C48C78]"
                    >
                      Submit another RSVP
                    </button>
                  </motion.div>
                )}
                </AnimatePresence>
            </motion.div>
            <div className="mt-8 space-y-3 text-left">
              <h3 className="text-center font-serif text-2xl font-light text-[#F3E5E8]">A Few Helpful Notes</h3>
              {faqs.map((faq) => (
                <details key={faq.id} className="rounded-2xl border border-[#C48C78]/30 bg-[#451822]/55 px-5 py-4">
                  <summary className="cursor-pointer font-serif text-lg text-[#F3E5E8]">{faq.question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-[#D4B8BC]">{faq.answer}</p>
                </details>
              ))}
            </div>
            <footer className="pb-8 pt-10 text-center">
              <p className="font-serif italic text-lg text-[#F3E5E8]">Thank you for being part of our story.</p>
              <p className="mt-3 font-sans text-[9px] uppercase tracking-[0.2em] text-[#C48C78]">{branding.signature}</p>
            </footer>
          </div>
        </section>

        {/* CLOSING / THANK YOU */}
        {wedding.closing?.visible !== false && <section className="min-h-[75svh] w-full snap-start snap-always flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto mb-6 h-px w-16 bg-[#C48C78]/70" />
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C48C78]">With love and gratitude</p>
            <h2 className="mt-4 font-serif text-3xl font-light text-[#F3E5E8] md:text-5xl">Thank You</h2>
            <p className="mt-5 font-serif text-lg italic leading-relaxed text-[#D4B8BC]">{wedding.closing?.message ?? ''}</p>
            <p className="mt-8 font-serif text-2xl text-[#D8B497]">{wedding.identity.coupleNames}</p>
            <p className="mt-10 font-sans text-[9px] uppercase tracking-[0.2em] text-[#D4B8BC]/70">Crafted with love by {wedding.branding.companyName}</p>
          </div>
        </section>}

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

      </>}

    </div>
  );
}
