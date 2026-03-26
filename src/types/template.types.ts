import { Field } from './form.types';

export type Section = {
  name: string;
  fields: Field[];
  gridCols?: number; // Optional: number of columns for layout
};
