import { LucideIcon } from 'lucide-react';

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
  options?: { label: string; value: string }[]; // For select and radio types
  gridColSpan?: number; // Optional: for layout purposes
  gridCols?: number;
  fields?: Field[];
  required?: boolean;
};

export type FieldRegistryType = 'text' | 'checkbox' | 'select' | 'radio';
