import type { WeddingTemplate } from '../types';

export const elegantFloralTemplate: WeddingTemplate = {
  id: 'elegant-floral',
  name: 'Elegant Floral',
  description: 'A romantic editorial experience with warm florals and softly embossed gold.',
  tokens: {
    colors: {
      canvas: '#36121A',
      surface: '#451822',
      ink: '#F3E5E8',
      mutedInk: '#D4B8BC',
      accent: '#C48C78',
      accentSoft: '#E6D5BC',
    },
    typography: {
      display: "'Cormorant Garamond', serif",
      body: "'Montserrat', sans-serif",
      script: "'Great Vibes', cursive",
    },
    decoration: {
      texture: 'paper',
      ornament: 'floral',
    },
  },
};
