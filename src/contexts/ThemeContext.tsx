import { createContext, useContext, type ReactNode } from 'react';
import { getWeddingTemplate } from '../templates/registry';
import type { WeddingTemplate } from '../templates/types';

const ThemeContext = createContext<WeddingTemplate | null>(null);

interface ThemeProviderProps {
  templateId: string;
  children: ReactNode;
}

export function ThemeProvider({ templateId, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={getWeddingTemplate(templateId)}>{children}</ThemeContext.Provider>;
}

export function useTheme(): WeddingTemplate {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return theme;
}
