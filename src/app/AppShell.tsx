import type { ReactNode } from 'react';
import { cloydCyrinWedding } from '../data/weddings/cloyd-cyrin';
import { AppProviders } from './providers';

export function AppShell({ children }: { children: ReactNode }) {
  return <AppProviders experience={cloydCyrinWedding}>{children}</AppProviders>;
}
