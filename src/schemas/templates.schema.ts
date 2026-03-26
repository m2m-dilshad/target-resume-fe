import { z } from 'zod';

export const createTemplateSchema = z.object({
  template: z.object({
    name: z.string().trim().min(2, 'Template name must be 2+ characters'),
    slug: z.string().trim().min(2, 'Template slug must be 2+ characters'),
    description: z.string().trim().max(200, 'Description must be 200 characters or less'),
    ats: z.boolean().optional(),
    isActive: z.boolean().optional(),
    supportsProfilePhoto: z.boolean().optional(),
    structure: z.enum(['CHRONOLOGICAL', 'FUNCTIONAL', 'COMBINATION']),
    design: z.enum(['modern', 'professional', 'minimal', 'creative']),
    layout: z.enum(['single', 'leftSidebar', 'rightSidebar', 'mixedLeft', 'mixedRight']),
  }),
  typography: z.object({
    fontFamily: z.string().trim().min(2, 'Font family must be 2+ characters'),
    fontSize: z
      .number()
      .min(8, 'Font size must be at least 8')
      .max(72, 'Font size must be 72 or less'),
    lineHeight: z
      .number()
      .min(1, 'Line height must be at least 1')
      .max(3, 'Line height must be 3 or less'),
    letterSpacing: z
      .number()
      .min(-5, 'Letter spacing must be -5 or more')
      .max(5, 'Letter spacing must be 5 or less'),
    color: z
      .string()
      .trim()
      .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Color must be a valid hex code'),
  }),
  page: z.object({
    marginTop: z
      .number()
      .min(0, 'Margin top must be 0 or more')
      .max(100, 'Margin top must be 100 or less'),
    marginBottom: z
      .number()
      .min(0, 'Margin bottom must be 0 or more')
      .max(100, 'Margin bottom must be 100 or less'),
    marginLeft: z
      .number()
      .min(0, 'Margin left must be 0 or more')
      .max(100, 'Margin left must be 100 or less'),
    marginRight: z
      .number()
      .min(0, 'Margin right must be 0 or more')
      .max(100, 'Margin right must be 100 or less'),
    pageSize: z.enum(['A4', 'Letter', 'Legal']),
    orientation: z.enum(['portrait', 'landscape']),
  }),
  design: z.object({
    primaryColor: z
      .string()
      .trim()
      .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Primary color must be a valid hex code'),
    secondaryColor: z
      .string()
      .trim()
      .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Secondary color must be a valid hex code'),
    accentColor: z
      .string()
      .trim()
      .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Accent color must be a valid hex code'),
    backgroundColor: z
      .string()
      .trim()
      .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Background color must be a valid hex code'),
  }),
  date: z.object({
    format: z.enum(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD']),
  }),
  header: z.object({
    includeName: z.boolean().optional(),
    includeContactInfo: z.boolean().optional(),
    includeSummary: z.boolean().optional(),
  }),
  skills: z.object({
    includeSkillsSection: z.boolean().optional(),
    skillCategories: z.array(z.string().trim()).optional(),
  }),
  certifications: z.object({
    includeCertificationsSection: z.boolean().optional(),
    certificationFields: z.array(z.string().trim()).optional(),
  }),
  education: z.object({
    includeEducationSection: z.boolean().optional(),
    educationLayout: z.enum(['standard', 'detailed', 'minimal']).optional(),
  }),
  experience: z.object({
    includeExperienceSection: z.boolean().optional(),
    experienceLayout: z.enum(['standard', 'detailed', 'minimal']).optional(),
  }),
  languages: z.object({
    includeLanguagesSection: z.boolean().optional(),
    languageFields: z.array(z.string().trim()).optional(),
  }),
  projects: z.object({
    includeProjectsSection: z.boolean().optional(),
    projectFields: z.array(z.string().trim()).optional(),
  }),
  publications: z.object({
    includePublicationsSection: z.boolean().optional(),
    publicationFields: z.array(z.string().trim()).optional(),
  }),
  awards: z.object({
    includeAwardsSection: z.boolean().optional(),
    awardFields: z.array(z.string().trim()).optional(),
  }),
});

export type CreateTemplateType = z.infer<typeof createTemplateSchema>;
