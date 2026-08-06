import p1 from '../../assets/p1-1200.webp';
import p2 from '../../assets/p2-1200.webp';
import p3 from '../../assets/p3-1200.webp';
import type { WeddingExperience } from '../../types/wedding';

export const cloydCyrinWedding: WeddingExperience = {
  identity: {
    slug: 'cloyd-and-cyrin',
    coupleNames: 'Cloyd & Cyrin',
    shortNames: 'C & C',
    monogramAlt: 'C and C wedding monogram',
    weddingDate: '2026-12-19T09:00:00+08:00',
  },
  branding: {
    companyName: 'Wedd Invi',
    signature: 'Crafted with love by Wedd Invi, creating timeless digital wedding experiences.',
  },
  opening: {
    verse: 'I have found the one my soul loves. I held him and would not let him go.',
    citation: 'Song of Solomon 3:4',
    musicSrc: '/bg-music.mp3',
  },
  templateId: 'elegant-floral',
  schedule: {
    ceremony: {
      title: 'The Ceremony',
      dateTime: '2026-12-19T09:00:00+08:00',
      timeLabel: '9:00 AM in the morning',
      venue: 'Our Lady of Salvation Parish',
      address: 'Purok 6, Brgy. Cabacungan, La Castellana, Negros Occidental',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Our+Lady+of+Salvation+Parish+Purok+6+Brgy+Cabacungan+La+Castellana+Negros+Occidental',
    },
    reception: {
      title: 'The Reception',
      dateTime: '2026-12-19T11:00:00+08:00',
      timeLabel: 'Immediately following the ceremony',
      venue: 'F & C Guest House',
      address: '6223 Rizal St, Canlaon City, Negros Oriental',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=F%20%26%20C%20Guest%20House%206223%20Rizal%20St%20Canlaon%20City%20Negros%20Oriental',
    },
    dressCode: {
      name: 'Rose Gold & Burgundy',
      description: 'Kindly wear your attire in rose gold or burgundy tones.',
      colors: ['#C48C78', '#800020'],
    },
  },
  chapters: [
    {
      id: 'our-beginning',
      order: 1,
      eyebrow: 'Chapter I',
      title: 'Our Beginning',
      blocks: [{
        type: 'timeline',
        items: [
          { label: 'Chapter I', title: 'High School Days', description: 'We crossed paths as schoolmates and officially became a couple.' },
          { label: 'Chapter II', title: 'The Separation', description: 'Life parted our ways, leading to seven long years of separate paths.' },
          { label: 'Chapter III', title: 'Destiny’s Return', description: 'Seven years later, destiny brought us back together.' },
        ],
      }],
    },
  ],
  gallery: [
    { id: 'playful-moment', src: p1, alt: 'The couple sharing a playful moment', caption: 'A Playful Moment' },
    { id: 'exploring-together', src: p2, alt: 'The couple exploring together', caption: 'Exploring Together' },
    { id: 'by-the-sea', src: p3, alt: 'The couple by the sea', caption: 'By the Sea' },
  ],
  entourage: [],
  gifts: [{
    id: 'monetary-gift',
    title: 'Your presence is our greatest gift',
    description: 'Monetary contributions are warmly appreciated.',
    details: 'GCash or bank transfer details are available upon request.',
  }],
  rsvp: {
    deadline: '2026-11-19T23:59:59+08:00',
    allowGuestMessage: true,
    questions: [
      { id: 'attendance', label: 'Attendance', type: 'select', required: true, options: [{ label: 'Joyfully accept', value: 'accepted' }, { label: 'Regretfully decline', value: 'declined' }] },
      { id: 'guest-count', label: 'Number of guests', type: 'select', required: true, options: [{ label: '1 person', value: '1' }, { label: '2 persons', value: '2' }, { label: '3 persons', value: '3' }] },
      { id: 'message', label: 'Wishes for the couple', type: 'textarea' },
    ],
    confirmation: {
      accepted: 'We have recorded your response and cannot wait to celebrate with you.',
      declined: 'Thank you for letting us know. You will be missed on our special day.',
    },
  },
  faqs: [
    { id: 'arrival', question: 'When should I arrive?', answer: 'Please arrive at least 30 minutes before the ceremony so everyone may be seated comfortably.' },
    { id: 'children', question: 'May we bring children?', answer: 'Please follow the guest count written on your invitation. Contact the couple if you need help.' },
    { id: 'photos', question: 'May we take photos?', answer: 'Yes—after the ceremony begins, please keep phones silent and avoid blocking the official photographers.' },
  ],
};
