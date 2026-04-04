import { z } from 'zod';
export const createProfileSchema = z.object({
  network: z.string().min(1, 'Network is required'),
  username: z.string().min(1, 'Username is required'),
  url: z.string().min(1, 'URL is required'),
});

export const createResumeSchema = z.object({
  basics: z.object({
    name: z.string().min(1, 'Full Name is required'),
    label: z.string().min(1, 'Current Job Title is required'),
    profilePicture: z.string().optional(),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone Number required'),
    portfolio: z.string().optional(),
    summary: z.string().optional(),
    location: z.object({
      address: z.string().min(1, 'Street Address required'),
      postalCode: z.string().optional(),
      city: z.string().min(1, 'City required'),
      countryCode: z.string().min(1, 'Country required'),
      region: z.string().min(1, 'State / Region required'),
    }),
    profiles: z
      .array(
        z.object({
          network: z.string().min(1, 'Platform required'),
          username: z.string().min(1, 'Username required'),
          url: z.string().optional(),
        })
      )
      .optional(),
  }),

  works: z
    .array(
      z.object({
        company: z.string().min(1, 'Company Name required'),
        position: z.string().min(1, 'Job Title required'),
        location: z.string().optional(),
        url: z.string().optional(),
        startDate: z.string().min(1, 'Start Date required'),
        endDate: z.string().optional(),
        summary: z.string().optional(),
        highlights: z
          .array(z.object({ highlights: z.string().min(1, 'Achievement required') }))
          .optional(),
      })
    )
    .optional(),

  educations: z
    .array(
      z.object({
        institution: z.string().min(1, 'School / University required'),
        url: z.string().optional(),
        degreeType: z.enum(['Undergraduate', 'Bachelors', 'Masters', 'Diploma', 'PhD']),
        degree: z.string().min(1, 'Degree & Major required'),
        gpa: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string().min(1, 'Start Date required'),
        endDate: z.string().optional(),
        courses: z
          .array(z.object({ course: z.string().min(1, 'Course Name required') }))
          .optional(),
      })
    )
    .optional(),

  skills: z
    .array(
      z.object({
        name: z.string().min(1, 'Skill required'),
        level: z.string().min(1, 'Proficiency required'),
        keywords: z.array(z.object({ keywords: z.string().min(1, 'Keyword required') })).optional(),
      })
    )
    .optional(),

  projects: z
    .array(
      z.object({
        name: z.string().min(1, 'Project Name required'),
        url: z.string().optional(),
        description: z.string().min(1, 'Project Description required'),
        highlights: z
          .array(z.object({ highlights: z.string().min(1, 'Feature required') }))
          .optional(),
        techStack: z
          .array(z.object({ techStack: z.string().min(1, 'Technology required') }))
          .optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        roles: z.string().optional(),
      })
    )
    .optional(),

  certifications: z
    .array(
      z.object({
        name: z.string().min(1, 'Certificate Name required'),
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

  activities: z
    .array(
      z.object({
        title: z.string().min(1, 'Activity Title required'),
        description: z.string().optional(),
      })
    )
    .optional(),

  awards: z
    .array(
      z.object({
        title: z.string().min(1, 'Award Title required'),
        awarder: z.string().optional(),
        date: z.string().optional(),
        summary: z.string().optional(),
      })
    )
    .optional(),

  volunteers: z
    .array(
      z.object({
        organization: z.string().min(1, 'Organization Name required'),
        position: z.string().min(1, 'Role / Title required'),
        url: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        summary: z.string().optional(),
        highlights: z
          .array(z.object({ highlights: z.string().min(1, 'Contribution required') }))
          .optional(),
      })
    )
    .optional(),

  publications: z
    .array(
      z.object({
        name: z.string().min(1, 'Publication Title required'),
        publisher: z.string().optional(),
        releaseDate: z.string().optional(),
        url: z.string().optional(),
        summary: z.string().min(1, 'Summary required'),
      })
    )
    .optional(),
});
export type CreateResumeType = z.infer<typeof createResumeSchema>;
export type CreateProfileType = z.infer<typeof createProfileSchema>;
