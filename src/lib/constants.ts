import { PageSize } from '@/types/template.types';

export const TEMPLATE_STRUCTURE: string[] = [
  'CHRONOLOGICAL',
  'FUNCTIONAL',
  'COMBINATION',
  'ACADEMIC',
  'PROJECT_BASED',
];

export const TEMPLATE_LAYOUTS: string[] = [
  'SINGLE_COLUMN',
  'LEFT_SIDEBAR',
  'RIGHT_SIDEBAR',
  'SPLIT_50_50',
  'MODERN_HEADER',
];

export const JUSTIFY_ALIGNMENTS: Record<string, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const PAGE_SIZES: Record<string, PageSize> = {
  A4: { width: '210mm', height: '297mm' },
  Letter: { width: '215.9mm', height: '279.4mm' },
};
export const LIST_BULLET_TYPES: Record<string, string> = {
  none: 'none',
  circle: 'circle',
  square: 'square',
  dash: "'- '",
};
