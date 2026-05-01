import { Field } from './form.types';

export type SectionType = 'object' | 'list';
export type Section = {
  name: string;
  type: SectionType;
  label: string;
  fields: Field[];
  gridCols?: number; // Optional: number of columns for layout
};
export type PageSize = {
  width: string;
  height: string;
};
