import type { ReactNode } from 'react';
import { ExperienceStateProvider } from '../contexts/ExperienceStateContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { WeddingExperienceProvider } from '../contexts/WeddingExperienceContext';
import type { WeddingExperience } from '../types/wedding';

export function AppProviders({ experience, children }: { experience: WeddingExperience; children: ReactNode }) {
  return (
    <WeddingExperienceProvider experience={experience}>
      <ThemeProvider templateId={experience.templateId}>
        <ExperienceStateProvider>{children}</ExperienceStateProvider>
      </ThemeProvider>
    </WeddingExperienceProvider>
  );
}
