'use client';

import { VwblContainer } from '../container';

export function VwblProvider({ children }: { children: React.ReactNode }) {
  return <VwblContainer.Provider>{children}</VwblContainer.Provider>;
}
