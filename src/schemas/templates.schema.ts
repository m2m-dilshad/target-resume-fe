import { z } from 'zod';

export const createTemplateSchema = z.object({
  template: z.object({
    name: z.string().min(1, 'Template name is required'),
    slug: z.string().min(1, 'Template ID is required'),
    description: z.string().optional(),
    ats: z.boolean().default(true),
    isActive: z.boolean().default(true),
    supportsProfilePhoto: z.boolean().default(false),
    structure: z.enum(['CHRONOLOGICAL', 'FUNCTIONAL', 'COMBINATION', 'ACADEMIC', 'PROJECT_BASED']),
    design: z.string(),
    layout: z.string(),
  }),
  typography: z.object({
    headingFont: z.string(),
    bodyFont: z.string(),
    headingPrimary: z.object({ size: z.string(), case: z.string() }),
    headingSecondary: z.object({ size: z.string(), case: z.string() }),
    body: z.object({ size: z.string(), lineHeight: z.string(), listLineHeight: z.string() }),
  }),
  colors: z.object({ accent: z.string() }),
  page: z.object({
    paperSize: z.enum(['A4', 'Letter']),
    margins: z.object({ topBottom: z.string(), leftRight: z.string() }),
    borders: z.object({ topBottom: z.string(), allSides: z.string() }),
  }),
  design: z.object({
    lines: z.object({ enabled: z.string(), thickness: z.string(), style: z.string() }),
    bullets: z.object({ type: z.string(), size: z.string() }),
  }),
  header: z.object({
    name: z.object({ alignment: z.string() }),
    role: z.object({ visible: z.string(), alignment: z.string() }),
    contact: z.object({ alignment: z.string() }),
  }),
  skills: z.object({
    layout: z.string(),
    show_proficiency: z.boolean(),
    group_by_category: z.boolean(),
    column_count: z.number().min(1),
  }),
  experience: z.object({
    location_placement: z.string(),
    date_placement: z.string(),
    description_style: z.string(),
  }),
  projects: z.object({
    tech_stack: z.string(),
    description: z.string(),
    show_project_link: z.boolean(),
    show_github_link: z.boolean(),
    show_date: z.boolean(),
  }),
});

export type CreateTemplateType = z.infer<typeof createTemplateSchema>;
