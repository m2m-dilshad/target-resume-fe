/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateTemplateType } from '@/schemas/templates.schema';
import { createContext, useContext, useMemo } from 'react';

const ResumeContext = createContext<{ config: CreateTemplateType; data: any } | null>(null);

export const ResumeProvider = ({ children, config, data }: any) => {
  // Only triggers updates if config or data references change
  const value = useMemo(() => ({ config, data }), [config, data]);
  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
};
