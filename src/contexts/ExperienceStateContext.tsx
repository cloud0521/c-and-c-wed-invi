import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type OpeningStatus = 'unstarted' | 'playing' | 'complete';

interface ExperienceState {
  openingStatus: OpeningStatus;
  setOpeningStatus: (status: OpeningStatus) => void;
  activeChapterId: string | null;
  setActiveChapterId: (chapterId: string | null) => void;
}

const ExperienceStateContext = createContext<ExperienceState | null>(null);

export function ExperienceStateProvider({ children }: { children: ReactNode }) {
  const [openingStatus, setOpeningStatus] = useState<OpeningStatus>('unstarted');
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const value = useMemo(() => ({ openingStatus, setOpeningStatus, activeChapterId, setActiveChapterId }), [openingStatus, activeChapterId]);

  return <ExperienceStateContext.Provider value={value}>{children}</ExperienceStateContext.Provider>;
}

// oxlint-disable-next-line react/only-export-components
export function useExperienceState(): ExperienceState {
  const state = useContext(ExperienceStateContext);

  if (!state) {
    throw new Error('useExperienceState must be used within ExperienceStateProvider.');
  }

  return state;
}
