import { z } from 'zod';

export const createResumeSchema = z.object({
  basics: z.object({
    name: z.string().min(2, 'Name is required'),
    label: z.string().min(2, 'Professional title is required'),
    summary: z.string().optional(),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Phone required'),
    portfolio: z.string().url().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    location: z.string().min(2, 'Location required'),
  }),

  education: z
    .array(
      z.object({
        institution: z.string().min(1, 'Institution required'),
        degree: z.string().min(2, 'Degree required'),
        gpa: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string().min(1, 'Start date required'),
        endDate: z.string().optional(),
      })
    )
    .min(1, 'At least one education entry required'),

  work: z.array(
    z.object({
      company: z.string().min(1, 'Company required'),
      position: z.string().min(2, 'Position required'),
      location: z.string().optional(),
      description: z.string().optional(),
      startDate: z.string().min(1, 'Start date required'),
      endDate: z.string().optional(),
    })
  ),

  skills: z
    .array(
      z.object({
        name: z.string().min(1, 'Skill required'),
        level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
      })
    )
    .min(1, 'At least one skill required'),

  projects: z
    .array(
      z.object({
        name: z.string().min(1, 'Project name required'),
        url: z.string().optional(),
        description: z.string().min(10, 'Project description required'),
        techStack: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .optional(),

  certificates: z
    .array(
      z.object({
        name: z.string().min(1, 'Certificate name required'),
        issuer: z.string().optional(),
        date: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .optional(),

  languages: z
    .array(
      z.object({
        language: z.string().min(1, 'Language required'),
        fluency: z.enum(['Beginner', 'Intermediate', 'Professional', 'Fluent', 'Native']),
      })
    )
    .optional(),

  accomplishments: z
    .array(
      z.object({
        title: z.string().min(1, 'Title required'),
        description: z.string().optional(),
      })
    )
    .optional(),

  awards: z
    .array(
      z.object({
        title: z.string().min(1, 'Award title required'),
        awarder: z.string().optional(),
        date: z.string().optional(),
        summary: z.string().optional(),
      })
    )
    .optional(),

  volunteer: z
    .array(
      z.object({
        organization: z.string().min(1, 'Organization required'),
        position: z.string().min(2, 'Role required'),
        url: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        summary: z.string().optional(),
      })
    )
    .optional(),

  publications: z
    .array(
      z.object({
        name: z.string().min(1, 'Title required'),
        publisher: z.string().optional(),
        releaseDate: z.string().optional(),
        url: z.string().optional(),
        summary: z.string().min(1, 'Summary required'),
      })
    )
    .optional(),
});
export type CreateResumeType = z.infer<typeof createResumeSchema>;
