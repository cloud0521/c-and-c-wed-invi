export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'timeline'; items: TimelineItem[] };

export interface TimelineItem {
  label: string;
  title: string;
  description: string;
}

export interface StoryChapter {
  id: string;
  order: number;
  eyebrow: string;
  title: string;
  blocks: ContentBlock[];
}
