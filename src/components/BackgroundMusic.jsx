import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic({ autoPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    if (autoPlay && !hasAutoPlayed.current && audioRef.current) {
      hasAutoPlayed.current = true;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Auto-play failed (user interaction may be needed):", e));
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop src="/bg-music.mp3" />
      <button
        onClick={togglePlay}
        className="bg-white/90 backdrop-blur-md border border-[#C8A165]/40 text-[#7A4E36] p-3.5 rounded-full shadow-xl hover:bg-white transition-all cursor-pointer flex items-center justify-center group"
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#C8A165] animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#7A4E36]/60 group-hover:text-[#7A4E36]" />
        )}
      </button>
    </div>
  );
}
