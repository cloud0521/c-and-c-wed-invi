import React from 'react';
import { motion } from 'framer-motion';

import photo1 from '../assets/p1.jpg';
import photo2 from '../assets/p2.jpg';
import photo3 from '../assets/p3.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

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
  { img: photo1, caption: "A Playful Moment" },
  { img: photo2, caption: "Exploring Together" },
  { img: photo3, caption: "By the Sea" }
];

export default function StoryGallery({ page = 'timeline' }) {
  if (page === 'gallery') {
    return (
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-[#C8A165] block mb-2">Captured Moments</span>
          <h2 className="text-3xl md:text-4xl font-light font-serif text-[#2F2721]">The Gallery</h2>
          <div className="w-12 h-[1px] bg-[#C8A165] mx-auto mt-3" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryPhotos.map((photo, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="h-72 md:h-80 bg-white/40 border border-[#C8A165]/20 rounded-2xl p-2 shadow-sm backdrop-blur-sm flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="w-full h-full overflow-hidden rounded-xl relative">
                <img 
                  src={photo.img} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-white font-light">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full text-center">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="mb-12"
      >
        <span className="text-xs uppercase tracking-[0.4em] text-[#C8A165] block mb-2">Memories &amp; Milestones</span>
        <h2 className="text-3xl md:text-4xl font-light font-serif text-[#2F2721]">Our Love Story</h2>
        <div className="w-12 h-[1px] bg-[#C8A165] mx-auto mt-3" />
      </motion.div>

      <div className="relative border-l border-[#C8A165]/30 ml-4 md:ml-24 text-left space-y-10">
        {timelineEvents.map((item, index) => (
          <motion.div 
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="relative pl-8 md:pl-10"
          >
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#C8A165] ring-4 ring-[#FAF7F2]" />
            <span className="text-xs font-semibold tracking-widest text-[#C48C78] uppercase">{item.year}</span>
            <h3 className="text-xl md:text-2xl font-serif font-light text-[#2F2721] mt-1 mb-1">{item.title}</h3>
            <p className="text-sm text-[#7A4E36] leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}