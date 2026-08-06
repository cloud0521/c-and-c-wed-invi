import { createContext, useContext, type ReactNode } from 'react';
import type { WeddingExperience } from '../types/wedding';

const WeddingExperienceContext = createContext<WeddingExperience | null>(null);

interface WeddingExperienceProviderProps {
  experience: WeddingExperience;
  children: ReactNode;
}

export function WeddingExperienceProvider({ experience, children }: WeddingExperienceProviderProps) {
  return <WeddingExperienceContext.Provider value={experience}>{children}</WeddingExperienceContext.Provider>;
}

// oxlint-disable-next-line react/only-export-components
export function useWeddingExperience(): WeddingExperience {
  const experience = useContext(WeddingExperienceContext);

  if (!experience) {
    throw new Error('useWeddingExperience must be used within WeddingExperienceProvider.');
  }

  return experience;
}
