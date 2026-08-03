import React, { useState } from 'react';
import CurtainOpening from './components/CurtainOpening';
import Hero from './components/Hero';
import StoryGallery from './components/StoryGallery';
import WeddingDetails from './components/WeddingDetails';
import BackgroundMusic from './components/BackgroundMusic';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [startMusic, setStartMusic] = useState(false); // Starts music instantly on click
  const [hasOpened, setHasOpened] = useState(false);   // Triggers content animations when curtain clears

  return (
    <div className="font-serif overflow-x-hidden bg-[#FAF7F2] h-screen text-[#2F2721] relative">
      
      {/* Cinematic Opening Overlay */}
      {showOverlay && (
        <CurtainOpening 
          isOpen={isOpen} 
          setIsOpen={(val) => {
            setIsOpen(val);
            if (val) setStartMusic(true); // Music starts immediately
          }} 
          setShowOverlay={(val) => {
            setShowOverlay(val);
            if (!val) setHasOpened(true); // Content animations trigger when curtain finishes opening
          }} 
        />
      )}

      {/* Main Invitation Content with 5-Page Scroll-Snapping Pagination */}
      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Page 1: Home */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative">
          <Hero hasOpened={hasOpened} />
        </section>

        {/* Page 2: Memories & Milestones / Our Love Story */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-start items-center relative overflow-y-auto pt-16 md:pt-20 pb-12 px-4">
          <StoryGallery page="timeline" />
        </section>

        {/* Page 3: Captured Moments / The Gallery */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-start items-center relative overflow-y-auto pt-16 md:pt-20 pb-12 px-4">
          <StoryGallery page="gallery" />
        </section>

        {/* Page 4: Join Our Celebration / Ceremony & Reception */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-start items-center relative overflow-y-auto pt-16 md:pt-20 pb-12 px-4">
          <WeddingDetails page="ceremony" />
        </section>

        {/* Page 5: Be Our Guest / RSVP */}
        <section className="h-screen w-full snap-start snap-always flex flex-col justify-start items-center relative overflow-y-auto pt-16 md:pt-20 pb-12 px-4">
          <WeddingDetails page="rsvp" />
        </section>

      </main>

      {/* Floating Background Music Control */}
      <BackgroundMusic autoPlay={startMusic} />

    </div>
  );
}