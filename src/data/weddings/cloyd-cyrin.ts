import p1 from '../../assets/p1-1200.webp';
import p2 from '../../assets/p2-1200.webp';
import p3 from '../../assets/p3-1200.webp';
import dsc01656 from '../../assets/DSC01656.jpg';
import dsc01633 from '../../assets/DSC01633.jpg';
import dsc02216 from '../../assets/DSC02216.jpg';
import dsc02234 from '../../assets/DSC02234.jpg';
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
    companyName: 'Dreamz',
    signature: 'Crafted with love by Dreamz, creating timeless digital wedding experiences.',
  },
  opening: {
    verse: 'I have found the one my soul loves. I held him and would not let him go.',
    citation: 'Song of Solomon 3:4',
    musicSrc: '/bg-music.mp3',
  },
  closing: {
    message: 'Thank you for being part of our story and for sharing in the joy of our day.',
    visible: true,
  },
  templateId: 'elegant-floral',
  schedule: {
    ceremony: {
      title: 'The Ceremony',
      dateTime: '2026-12-19T09:00:00+08:00',
      timeLabel: '9:00 AM',
      venue: 'St. Joseph Parish Church',
      address: 'Canlaon City, Negros Oriental',
      mapUrl: 'https://www.google.com/maps/place/St.+Joseph+Parish+Church/@10.3869464,123.2175959,18.96z/data=!4m17!1m10!3m9!1s0x33a948da064ec777:0xcbffd508abf6e001!2sF+%26+C+Guest+House!5m2!4m1!1i2!8m2!3d10.3864347!4d123.2201105!16s%2Fg%2F1tfjyd5z!3m5!1s0x33a948d9d14f34c5:0xd70ad6bd0d3780e1!8m2!3d10.3869229!4d123.2171255!16s%2Fg%2F1tfggbr9?entry=ttu&g_ep=EgoyMDI2MTAwNC4wIKXMDSoASAFQAw%3D%3D',
    },
    reception: {
      title: 'The Reception',
      dateTime: '2026-12-19T11:00:00+08:00',
      timeLabel: '11:00 AM Onwards',
      venue: 'F & C Guest House',
      address: '6223 Rizal St, Canlaon City, Negros Oriental',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=F%20%26%20C%20Guest%20House%2C%206223%20Rizal%20St%2C%20Canlaon%20City%2C%20Negros%20Oriental',
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
    { id: 'side-by-side', src: dsc01656, alt: 'The couple walking together on a country road', caption: 'Side by Side' },
    { id: 'day-on-the-road', src: dsc01633, alt: 'The couple holding hands on a quiet road', caption: 'A Day on the Road' },
    { id: 'promise-together', src: dsc02216, alt: 'The couple dressed for their wedding portrait', caption: 'A Promise Together' },
    { id: 'old-tree', src: dsc02234, alt: 'The couple beneath a great old tree', caption: 'Under the Old Tree' },
  ],
  entourage: [
    { role: 'Maid of Honor', name: 'Mary Grace Mendania' },
    { role: 'Best Man', name: 'Noel Rashed Peñacuba' },
    { role: 'Bridesmaid', name: 'Jolina Mana-ay' },
    { role: 'Bridesmaid', name: 'Emerly Keith Belonta' },
    { role: 'Bridesmaid', name: 'Zea Abegail De Jose' },
    { role: 'Bridesmaid', name: 'Nenen More' },
    { role: 'Bridesmaid', name: 'Nofe Glydell Peñacuba' },
    { role: 'Groomsman', name: 'Cyberhelle Ricaplaza' },
    { role: 'Groomsman', name: 'Ralfh Laurence Deles' },
    { role: 'Groomsman', name: 'Kurt Adrian Mendania' },
    { role: 'Groomsman', name: 'Ezekiel Mendania' },
    { role: 'Groomsman', name: 'Jason Client Pagador' },
    { role: 'CANDLE', name: 'Mr. & Mrs. Charlie Perez' },
    { role: 'CORD', name: 'Mr. & Mrs. Carl John Argando' },
    { role: 'VEIL', name: 'Mr. & Mrs. Jerick Mendania' },
    { role: 'Flower Girl', name: 'Maria Zhavia Mendania' },
    { role: 'Flower Girl', name: 'Jewel Jade Mendania' },
    { role: 'Flower Girl', name: 'Gianna Cuizon' },
    { role: 'Flower Girl', name: 'Yuna Argando' },
    { role: 'Flower Girl', name: 'Clieanna Felize Perez' },
    { role: 'Flower Girl', name: 'Zhydyn Diotay' },
    { role: 'Flower Girl', name: 'Elly Brynn Marco' },
    { role: 'Flower Girl', name: 'Eliana Zale Villarin' },
    { role: 'Ring Bearer', name: 'Ziandre Danlly Ortega' },
    { role: 'Bible Bearer', name: 'Alejo Ezekiel Dollosa' },
    { role: 'Coin Bearer', name: 'Chaiff Antoine Perez' },
    { role: 'Banner Bearer', name: 'Redan Ortega Jr.' },
    { role: 'Master of Ceremony', name: 'Milfe Mytha Deles' },
    { role: 'Father', name: 'Joeven L. Santisteban' },
  ],
  gifts: [{
    id: 'monetary-gift',
    title: 'Your presence is our greatest gift',
    description: 'Monetary contributions are warmly appreciated.',
    details: 'GCash or bank transfer details are available upon request.',
  }],
  notes: [
    {
      id: 'ceremony-arrival-time',
      title: 'Ceremony Arrival Time',
      description: 'Kindly arrive 15–30 minutes before the ceremony begins so you can settle in and enjoy every special moment with us.',
    },
    {
      id: 'photography-reminder',
      title: 'A Little Photography Reminder',
      description: "We'd love for you to capture and share the beautiful moments of our special day! We kindly ask that you remain mindful of our official photographer and videographer, allowing them the space they need to capture every precious moment without obstruction.",
    },
    {
      id: 'dress-code-reminder',
      title: 'Dress Code Reminder',
      description: 'We kindly invite you to follow the attire guide provided in our invitation. Thank you for helping us create a beautiful and harmonious celebration.',
    },
    {
      id: 'kindly-rsvp',
      title: 'Kindly RSVP',
      description: 'Please confirm your attendance on or before the RSVP deadline specified in our invitation to help us prepare for your arrival. We look forward to celebrating this special day with you!',
    },
    {
      id: 'guest-reminder',
      title: 'A Gentle Reminder for Guests',
      description: 'We kindly ask that you respect the invitation and seating arrangements so everyone can enjoy a comfortable and meaningful celebration.',
    },
    {
      id: 'no-plus-one-policy',
      title: 'No Plus-One Policy',
      description: 'To keep our celebration intimate, we kindly ask that attendance be limited to the guests specifically named on the invitation. Thank you for your understanding as we celebrate this special day together.',
    },
  ],
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
