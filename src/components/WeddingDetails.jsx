import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Shirt, Gift, CheckCircle2, Send, Loader2 } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function WeddingDetails({ page = 'ceremony' }) {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', guests: '1', attendance: 'yes', message: '' });

  // REPLACE WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1URaiEBwsvvp5ZddvHNaot_6iFGHdMYNMNG37GPRyQ5UU1o2WFc8ZIkRckbhcqTVQKw/exec';

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    try {
      // Send data to Google Apps Script
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script Web App endpoints
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Since mode 'no-cors' returns an opaque response, we assume success once fetch completes
      setRsvpSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('There was an error saving your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (page === 'rsvp') {
    return (
      <div className="max-w-xl mx-auto w-full px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white/80 border border-[#C8A165]/30 p-8 md:p-10 rounded-3xl shadow-lg backdrop-blur-md w-full"
        >
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-[0.4em] text-[#C8A165] block mb-2">Be Our Guest</span>
            <h3 className="text-3xl font-serif font-light text-[#2F2721]">RSVP</h3>
            <p className="text-xs text-[#7A4E36] mt-1">Kindly respond on or before November 19, 2026</p>
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
                  <label className="block text-xs uppercase tracking-widest text-[#7A4E36] mb-1 font-medium">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#FAF7F2] border border-[#C8A165]/40 rounded-xl px-4 py-2.5 text-sm text-[#2F2721] focus:outline-none focus:border-[#C8A165]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#7A4E36] mb-1 font-medium">Attendance</label>
                    <select 
                      value={formData.attendance}
                      onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                      className="w-full bg-[#FAF7F2] border border-[#C8A165]/40 rounded-xl px-4 py-2.5 text-sm text-[#2F2721] focus:outline-none focus:border-[#C8A165]"
                    >
                      <option value="yes">Joyfully Accept</option>
                      <option value="no">Regretfully Decline</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#7A4E36] mb-1 font-medium">Number of Guests</label>
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="w-full bg-[#FAF7F2] border border-[#C8A165]/40 rounded-xl px-4 py-2.5 text-sm text-[#2F2721] focus:outline-none focus:border-[#C8A165]"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7A4E36] mb-1 font-medium">Wishes for the Couple</label>
                  <textarea 
                    rows="2"
                    placeholder="Leave a sweet message..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#FAF7F2] border border-[#C8A165]/40 rounded-xl px-4 py-2.5 text-sm text-[#2F2721] focus:outline-none focus:border-[#C8A165]"
                  />
                </div>

                <div className="text-center pt-1">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#7A4E36] hover:bg-[#5a3220] text-white py-3 rounded-full text-xs uppercase tracking-[0.3em] font-medium shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-[#C8A165] animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#C8A165]" />
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
                <CheckCircle2 className="w-14 h-14 text-[#C8A165] mx-auto animate-bounce" />
                <h4 className="text-2xl font-serif text-[#2F2721]">Thank You, {formData.name}!</h4>
                <p className="text-sm text-[#7A4E36] max-w-md mx-auto">
                  {formData.attendance === 'yes' 
                    ? "We have successfully recorded your response. We can't wait to celebrate our special day with you!"
                    : "We are sorry you won't be able to make it, but thank you for letting us know."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4">
      
      {/* Section Title */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="text-center mb-8"
      >
        <span className="text-xs uppercase tracking-[0.4em] text-[#C8A165] block mb-1">Join Our Celebration</span>
        <h2 className="text-3xl md:text-4xl font-light font-serif text-[#2F2721]">Ceremony &amp; Reception</h2>
        <div className="w-12 h-[1px] bg-[#C8A165] mx-auto mt-3" />
      </motion.div>

      {/* Ceremony & Reception Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Ceremony Card */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white/60 border border-[#C8A165]/25 p-6 rounded-2xl shadow-sm backdrop-blur-sm text-center flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-full bg-[#C8A165]/10 flex items-center justify-center mb-3 text-[#C8A165]">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-light text-[#2F2721] mb-1">The Ceremony</h3>
          <p className="text-xs font-semibold text-[#7A4E36] mb-0.5">Saturday, December 19, 2026</p>
          <p className="text-xs text-[#7A4E36] mb-3">9:00 AM in the Morning</p>
          <p className="text-[11px] font-semibold text-[#C48C78] tracking-widest uppercase mb-1">Our Lady of Salvation Parish</p>
          <p className="text-[10px] text-[#7A4E36] mb-4">Purok 6, Brgy. Cabacungan, La Castellana, Negros Occidental</p>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Our+Lady+of+Salvation+Parish+Purok+6+Brgy+Cabacungan+La+Castellana+Negros+Occidental" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#7A4E36] hover:text-[#2F2721] font-semibold border-b border-[#7A4E36] pb-0.5 transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#C8A165]" />
            <span>View Exact Map Location</span>
          </a>
        </motion.div>

        {/* Reception Card */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white/60 border border-[#C8A165]/25 p-6 rounded-2xl shadow-sm backdrop-blur-sm text-center flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-full bg-[#C8A165]/10 flex items-center justify-center mb-3 text-[#C8A165]">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-light text-[#2F2721] mb-1">The Reception</h3>
          <p className="text-xs font-semibold text-[#7A4E36] mb-0.5">Immediately Following Ceremony</p>
          <p className="text-xs text-[#7A4E36] mb-3">11:00 AM Onwards</p>
          <p className="text-[11px] font-semibold text-[#C48C78] tracking-widest uppercase mb-1">Our Lady of Salvation Parish</p>
          <p className="text-[10px] text-[#7A4E36] mb-4">Purok 6, Brgy. Cabacungan, La Castellana, Negros Occidental</p>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Our+Lady+of+Salvation+Parish+Purok+6+Brgy+Cabacungan+La+Castellana+Negros+Occidental" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#7A4E36] hover:text-[#2F2721] font-semibold border-b border-[#7A4E36] pb-0.5 transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#C8A165]" />
            <span>View Exact Map Location</span>
          </a>
        </motion.div>

      </div>

      {/* Dress Code & Gift Registry Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Dress Code */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white/40 border border-[#C8A165]/20 p-5 rounded-2xl text-center"
        >
          <Shirt className="w-6 h-6 text-[#C8A165] mx-auto mb-2" />
          <h3 className="text-lg font-serif font-light text-[#2F2721] mb-1">Dress Code</h3>
          <p className="text-xs text-[#7A4E36] mb-2">Rose Gold &amp; Burgundy</p>
          <div className="flex justify-center space-x-3 my-2">
            <span className="w-5 h-5 rounded-full bg-[#C48C78] shadow-xs" title="Rose Gold" />
            <span className="w-5 h-5 rounded-full bg-[#800020] shadow-xs" title="Burgundy" />
          </div>
          <p className="text-[11px] text-[#7A4E36] italic mt-1">Kindly wear your attire in Rose Gold or Burgundy tones.</p>
        </motion.div>

        {/* Gift Registry */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white/40 border border-[#C8A165]/20 p-5 rounded-2xl text-center flex flex-col justify-center"
        >
          <Gift className="w-6 h-6 text-[#C8A165] mx-auto mb-2" />
          <h3 className="text-lg font-serif font-light text-[#2F2721] mb-1">Gift Registry</h3>
          <p className="text-xs text-[#7A4E36] mb-2">Your presence is our greatest gift. Monetary contributions are warmly appreciated.</p>
          <p className="text-[11px] font-semibold text-[#2F2721] tracking-wider">GCash / Bank Transfer details available upon request.</p>
        </motion.div>

      </div>

    </div>
  );
}