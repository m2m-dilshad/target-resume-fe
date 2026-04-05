export type Structure = 'Chronological' | 'Functional' | 'Combination';

export type Design = 'Simple' | 'Modern' | 'Creative' | 'Professional';

export type Layout =
  | 'One Column'
  | 'Two Column'
  | 'Mixed'
  | 'Mixed (Left Sidebar)'
  | 'Mixed (Right Sidebar)';

export type Template = {
  id: number;
  name: string;
  structure: Structure;
  design: Design;
  layout: Layout;
};

export type FilterState = {
  structure: Structure[];
  design: Design[];
  layout: Layout[];
};
export const templateList: Template[] = [
  { id: 1, name: 'Modern Pro', structure: 'Chronological', design: 'Modern', layout: 'Two Column' },
  {
    id: 2,
    name: 'Classic Professional',
    structure: 'Chronological',
    design: 'Professional',
    layout: 'One Column',
  },
  { id: 3, name: 'Creative Edge', structure: 'Combination', design: 'Creative', layout: 'Mixed' },
  {
    id: 4,
    name: 'Minimal Simple',
    structure: 'Functional',
    design: 'Simple',
    layout: 'One Column',
  },
  {
    id: 5,
    name: 'Modern Compact',
    structure: 'Chronological',
    design: 'Modern',
    layout: 'Two Column',
  },
];

export const FILTER_CONFIG: {
  structure: Structure[];
  design: Design[];
  layout: Layout[];
} = {
  structure: ['Chronological', 'Functional', 'Combination'],
  design: ['Simple', 'Modern', 'Creative', 'Professional'],
  layout: ['One Column', 'Two Column', 'Mixed'],
};
export type FilterCategory = keyof FilterState;
