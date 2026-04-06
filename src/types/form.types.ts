import { LucideIcon } from 'lucide-react';

export type FieldOptions = {
  label: string;
  value: string;
  icon?: LucideIcon;
};
export type Field = {
  name: string;
  id?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  icon?: LucideIcon;
  minLength?: number;
  className?: string;
  themeSize?: string;
  options?: FieldOptions[]; // For select and radio types
  gridColSpan?: number; // Optional: for layout purposes
};

export type FieldRegistryType = 'text' | 'checkbox' | 'select' | 'radio';
