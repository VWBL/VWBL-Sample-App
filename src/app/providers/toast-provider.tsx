'use client';
import { ToastContainer } from '../../container';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <ToastContainer.Provider>{children}</ToastContainer.Provider>;
}
