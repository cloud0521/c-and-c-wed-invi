import type { StoryChapter } from './content';
import type { RSVPConfig } from './rsvp';

export interface EventDetails {
  title: string;
  dateTime: string;
  timeLabel: string;
  venue: string;
  address: string;
  mapUrl: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  focalPoint?: string;
}

export interface GiftOption {
  id: string;
  title: string;
  description: string;
  details?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface EntourageMember {
  id: string;
  name: string;
  role: string;
}

export interface WeddingExperience {
  identity: {
    slug: string;
    coupleNames: string;
    shortNames: string;
    monogramAlt: string;
    weddingDate: string;
  };
  branding: {
    companyName: string;
    signature: string;
  };
  opening: {
    verse: string;
    citation: string;
    musicSrc?: string;
  };
  templateId: string;
  schedule: {
    ceremony: EventDetails;
    reception: EventDetails;
    dressCode: {
      name: string;
      description: string;
      colors: string[];
    };
  };
  chapters: StoryChapter[];
  gallery: GalleryItem[];
  entourage: EntourageMember[];
  gifts: GiftOption[];
  rsvp: RSVPConfig;
  faqs: FAQItem[];
}
