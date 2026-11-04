export interface WeddingExperience {
  identity: {
    coupleNames: string;
    monogramAlt: string;
  };
  branding: {
    companyName: string;
    signature: string;
  };
  opening: {
    verse?: string;
    citation?: string;
    musicSrc?: string;
  };
  closing?: {
    message: string;
    visible?: boolean;
  };
  schedule: {
    ceremony: {
      dateTime: string;
      timeLabel: string;
      venue: string;
      address: string;
      mapUrl: string;
    };
    reception: {
      timeLabel: string;
      venue: string;
      address: string;
      mapUrl: string;
    };
  };
  entourage: Array<{
    name: string;
    role: string;
  }>;
  notes?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  rsvp: {
    deadline: string;
  };
}
