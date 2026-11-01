import { createContext, useContext } from 'react';

export const ConsultationContext = createContext(null);

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    throw new Error('useConsultation must be used within MainLayout');
  }
  return ctx;
}
