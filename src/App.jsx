import React, { useState, useEffect } from 'react';
import CurtainOpening from './components/CurtainOpening';
import Hero from './components/Hero';
import StoryGallery from './components/StoryGallery';
import WeddingDetails from './components/WeddingDetails';
import BackgroundMusic from './components/BackgroundMusic';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [startMusic, setStartMusic] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  // Inject luxury custom styles, Apple-like easing, paper texture, and particle keyframes
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@200;300;400;500&family=Great+Vibes&display=swap');

      .font-great-vibes { font-family: 'Great Vibes', cursive; }
      .font-serif { font-family: 'Cormorant Garamond', serif; }
      .font-sans { font-family: 'Montserrat', sans-serif; }

      /* Apple-like smooth cubic-bezier easing */
      .ease-apple {
        transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* Ultra-subtle paper texture overlay (2-4% opacity) */
      .paper-texture {
        background-image: radial-gradient(rgba(201, 164, 90, 0.04) 1px, transparent 0);
        background-size: 32px 32px;
      }

      /* Floating gold particles animation */
      @keyframes floatParticle {
        0% { transform: translateY(105vh) translateX(0) scale(0.8); opacity: 0; }
        20% { opacity: 0.35; }
        80% { opacity: 0.35; }
        100% { transform: translateY(-10vh) translateX(30px) scale(1.2); opacity: 0; }
      }

      .gold-particle {
        position: absolute;
        background: radial-gradient(circle, #C9A45A 0%, rgba(201,164,90,0) 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: floatParticle 20s infinite linear;
      }

      /* Custom scroll behavior for smooth luxury snap */
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Generate 16 subtle background gold particles for cinematic atmosphere
  const particles = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: `${(i * 6.25) + (Math.random() * 4)}%`,
    size: `${Math.random() * 4 + 2}px`,
    animationDelay: `${(i * 1.2)}s`,
    opacity: Math.random() * 0.3 + 0.15,
  }));

  return (
    <div className="font-serif overflow-x-hidden bg-[#FCFBFA] text-[#2C2A29] relative h-screen selection:bg-[#C9A45A]/20 selection:text-[#1F1B18]">
      
      {/* Ultra-Subtle Paper Texture & Soft Radial Gradient Background */}
      <div className="absolute inset-0 paper-texture pointer-events-none z-0 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F8F6F3] via-[#FCFBFA] to-[#F3EFEA] pointer-events-none z-0" />

      {/* Cinematic Floating Gold Particles (15-20 particles, ~20s loop, non-distracting) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {particles.map((p) => (
          <div
            key={p.id}
            className="gold-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.animationDelay,
              animationDuration: `${18 + (p.id % 5)}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Cinematic Opening Overlay */}
      {showOverlay && (
        <div className="relative z-50">
          <CurtainOpening 
            isOpen={isOpen} 
            setIsOpen={(val) => {
              setIsOpen(val);
              if (val) setStartMusic(true);
            }} 
            setShowOverlay={(val) => {
              setShowOverlay(val);
              if (!val) setHasOpened(true);
            }} 
          />
        </div>
      )}

      {/* Main Invitation Content with 5-Page Scroll-Snapping Pagination */}
      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-20">
        
        {/* Page 1: Home / Hero */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative px-6">
          <Hero hasOpened={hasOpened} />
        </section>

        {/* Page 2: Memories & Milestones / Our Love Story */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-y-auto py-16 px-6 md:px-12">
          <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center">
            <StoryGallery page="timeline" />
          </div>
        </section>

        {/* Page 3: Captured Moments / The Gallery */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-y-auto py-16 px-6 md:px-12">
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
            <StoryGallery page="gallery" />
          </div>
        </section>

        {/* Page 4: Join Our Celebration / Ceremony & Reception */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-y-auto py-16 px-6 md:px-12">
          <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center">
            <WeddingDetails page="ceremony" />
          </div>
        </section>

        {/* Page 5: Be Our Guest / RSVP */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-y-auto py-16 px-6 md:px-12">
          <div className="w-full max-w-4xl mx-auto h-full flex flex-col justify-center">
            <WeddingDetails page="rsvp" />
          </div>
        </section>

      </main>

      {/* Floating Background Music Control with Luxury Player Redesign */}
      <div className="relative z-50">
        <BackgroundMusic autoPlay={startMusic} />
      </div>

    </div>
  );
}