'use server';
import { Template } from '@/app/app/_constants/templates.types';
import { ActionResponse } from '@/types/action.types';

export async function fetchTemplates({
  offset,
  limit,
  filters,
}: {
  offset: number;
  limit: number;
  filters: {
    structure: string[];
    design: string[];
    layout: string[];
  };
}): Promise<ActionResponse> {
  console.log('--- FETCH TEMPLATES CALLED ---');

  console.log('Offset:', offset, 'Limit:', limit, 'Filters received:', filters);

  const allTemplates: Template[] = [
    {
      id: 1,
      name: 'Modern Pro',
      structure: 'Chronological',
      design: 'Modern',
      layout: 'Two Column',
    },
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

    {
      id: 6,
      name: 'Elegant Pro',
      structure: 'Chronological',
      design: 'Professional',
      layout: 'Two Column',
    },
    {
      id: 7,
      name: 'Startup Creative',
      structure: 'Combination',
      design: 'Creative',
      layout: 'Two Column',
    },
    {
      id: 8,
      name: 'Clean Minimal',
      structure: 'Functional',
      design: 'Simple',
      layout: 'One Column',
    },
    {
      id: 9,
      name: 'Corporate Classic',
      structure: 'Chronological',
      design: 'Professional',
      layout: 'One Column',
    },
    { id: 10, name: 'Modern Grid', structure: 'Combination', design: 'Modern', layout: 'Mixed' },

    {
      id: 11,
      name: 'Designer Portfolio',
      structure: 'Combination',
      design: 'Creative',
      layout: 'Two Column',
    },
    {
      id: 12,
      name: 'Simple Clean',
      structure: 'Functional',
      design: 'Simple',
      layout: 'One Column',
    },
    {
      id: 13,
      name: 'Executive Pro',
      structure: 'Chronological',
      design: 'Professional',
      layout: 'Two Column',
    },
    {
      id: 14,
      name: 'Creative Bold',
      structure: 'Combination',
      design: 'Creative',
      layout: 'Mixed',
    },
    {
      id: 15,
      name: 'Modern Lite',
      structure: 'Chronological',
      design: 'Modern',
      layout: 'One Column',
    },

    { id: 16, name: 'Minimal Grid', structure: 'Functional', design: 'Simple', layout: 'Mixed' },
    {
      id: 17,
      name: 'Professional Edge',
      structure: 'Chronological',
      design: 'Professional',
      layout: 'Two Column',
    },
    {
      id: 18,
      name: 'Creative Portfolio',
      structure: 'Combination',
      design: 'Creative',
      layout: 'Two Column',
    },
    {
      id: 19,
      name: 'Simple Classic',
      structure: 'Functional',
      design: 'Simple',
      layout: 'One Column',
    },
    {
      id: 20,
      name: 'Modern Executive',
      structure: 'Chronological',
      design: 'Modern',
      layout: 'Two Column',
    },
  ];

  const filtered = allTemplates.filter((t) => {
    const structureMatch = !filters.structure.length || filters.structure.includes(t.structure);

    const designMatch = !filters.design.length || filters.design.includes(t.design);

    const layoutMatch = !filters.layout.length || filters.layout.includes(t.layout);

    const isMatch = structureMatch && designMatch && layoutMatch;

    return isMatch;
  });

  const paginated = filtered.slice(offset, offset + limit);

  const response = {
    success: true,
    data: paginated,
    message: 'Templates fetched successfully',
  };

  console.log('Fetch Templates Final Response:', response);

  return response;
}
