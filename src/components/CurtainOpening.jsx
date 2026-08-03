import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import logoImg from '../logo.png';

export default function CurtainOpening({ isOpen, setIsOpen, setShowOverlay }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Smooth Ping-Pong (Forward & Reverse) Loop Effect from 0:00 to 0:01.40 before opening
  useEffect(() => {
    if (isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    let animationFrameId;
    const startTime = 0;
    const endTime = 1.4; 
    let direction = 1; 
    let speed = 0.03; 

    const updateLoop = () => {
      if (!isOpen && video) {
        if (!video.paused) {
          video.pause();
        }

        let current = video.currentTime + direction * speed;

        if (current >= endTime) {
          current = endTime;
          direction = -1;
        } else if (current <= startTime) {
          current = startTime;
          direction = 1;
        }

        video.currentTime = current;
        animationFrameId = requestAnimationFrame(updateLoop);
      }
    };

    const timer = setTimeout(() => {
      if (!isOpen) {
        animationFrameId = requestAnimationFrame(updateLoop);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  // Canvas Chroma Key Loop (Green -> #FAF7F2 White)
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let reqId;

    const processFrame = () => {
      if (video.videoWidth && video.videoHeight) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = frame.data;
          const len = data.length;

          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Detect green screen pixels and replace with #FAF7F2
            if (g > 80 && g > r * 1.3 && g > b * 1.3) {
              data[i] = 250;     // Red
              data[i + 1] = 247; // Green
              data[i + 2] = 242; // Blue
            }
          }

          ctx.putImageData(frame, 0, 0);
        } catch (e) {
          // Fallback for security limitations
        }
      }

      reqId = requestAnimationFrame(processFrame);
    };

    reqId = requestAnimationFrame(processFrame);

    return () => cancelAnimationFrame(reqId);
  }, []);

  const handleOpen = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsOpen(true);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 2.0;
      video.playbackRate = 1.5;
      video.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (isOpen && videoRef.current) {
      if (videoRef.current.currentTime >= 8.5) {
        setShowOverlay(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
      
      {/* Hidden Video Source */}
      <video 
        ref={videoRef}
        src="/curtain.mp4" 
        muted 
        playsInline 
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        className="hidden"
      />

      {/* Canvas Rendering Video with Green Screen Converted to #FAF7F2 */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />
      
      {/* Center Monogram, Text & Open Button */}
      <motion.div 
        className="absolute inset-0 flex flex-col justify-center items-center text-center z-30 px-4 pointer-events-none"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-36 h-36 md:w-48 md:h-48 mb-3 flex items-center justify-center">
          <img 
            src={logoImg} 
            alt="Cloyd & Cyrin Monogram" 
            className="w-full h-full object-contain brightness-0 invert drop-shadow-md"
          />
        </div>

        <p className="text-xs tracking-[0.4em] text-[#FAF7F2] uppercase mb-2">You Are Invited To The Wedding Of</p>
        <h2 className="text-3xl md:text-5xl text-white font-light tracking-widest uppercase drop-shadow mb-8 font-serif">
          Cloyd &amp; Cyrin
        </h2>

        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 hover:bg-white text-[#7A4E36] px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.3em] font-medium shadow-2xl transition-all flex items-center space-x-2 border border-white/40 cursor-pointer pointer-events-auto"
        >
          <Sparkles className="w-4 h-4 text-[#C8A165]" />
          <span>Open Invitation</span>
        </motion.button>
      </motion.div>
    </div>
  );
}