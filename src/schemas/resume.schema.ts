import { z } from 'zod';

const requiredString = (field: string) => z.string().trim().min(1, `${field} is required`);

const optionalString = z
  .string()
  .trim()
  .transform((val) => (val === '' ? undefined : val))
  .optional();

const maxWords = (limit: number) => (val?: string) => {
  if (!val) return true;

  const count = val.trim().split(/\s+/).length;
  return count <= limit;
};

const isValidDate = (val: string) => {
  if (!/^\d{2}-\d{2}-\d{4}$/.test(val)) return false;
  const [dd, mm, yyyy] = val.split('-').map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  return date.getFullYear() === yyyy && date.getMonth() === mm - 1 && date.getDate() === dd;
};
const dateValidator = (field?: string, required = false) => {
  const message = field ? `${field} must be a valid date (YYYY-MM-DD)` : 'Invalid date';

  if (required) {
    return z.string().trim().min(1, `${field} is required`).refine(isValidDate, { message });
  }

  return z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : val))
    .refine((val) => !val || isValidDate(val), { message })
    .optional();
};

const optionalStringWithMaxWords = (limit: number, field: string) =>
  optionalString.refine(maxWords(limit), {
    message: `${field} must be under ${limit} words`,
  });

const isValidUrl = (val: string) => {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
};

const urlValidator = (field?: string, required = false) => {
  const base = z.string().trim();

  if (required) {
    return base.min(1, `${field} is required`).refine((val) => isValidUrl(val), {
      message: `${field} must be a valid URL`,
    });
  }

  return base
    .transform((val) => (val === '' ? undefined : val))
    .refine((val) => !val || isValidUrl(val), {
      message: field ? `${field} must be a valid URL` : 'Invalid URL',
    })
    .optional();
};

export const createResumeSchema = z.object({
  basics: z.object({
    name: requiredString('Full Name'),
    label: requiredString('Current Job Title'),
    profilePicture: optionalString,
    email: z.string().trim().toLowerCase().email('Please enter a valid email address.'),
    //Future aspect: Use a country config map to validate country code with phone number length
    phone: z.object({
      countryCode: z
        .string()
        .trim()
        .regex(/^\+\d{1,4}$/, 'Invalid country code (e.g. +91)'),

      number: z
        .string()
        .trim()
        .min(7, 'Phone number too short')
        .max(12, 'Phone number too long')
        .regex(/^\d+$/, 'Phone number must contain only digits'),
    }),

    portfolio: urlValidator('Portfolio URL', false),
    summary: optionalStringWithMaxWords(200, 'Summary'),
    location: z.object({
      address: requiredString('Street Address'),
      postalCode: requiredString('PostalCode'),
      city: requiredString('City'),
      countryCode: z
        .string()
        .trim()
        .length(2, 'Use ISO country code (e.g. IN, US)')
        .transform((val) => val.toUpperCase()),
      region: requiredString('State / Region'),
    }),
    profiles: z
      .array(
        z.object({
          network: requiredString('Platform'),

          username: optionalString,

          url: urlValidator('URL', true),
        })
      )
      .max(5, 'Maximum 5 profiles allowed')
      .optional(),
  }),

  works: z
    .array(
      z.object({
        company: requiredString('Company Name'),

        position: requiredString('Job Title'),

        location: optionalString,

        url: urlValidator('Company URL', false),

        startDate: dateValidator('Start Date', true),

        endDate: dateValidator('End Date', false),
        summary: optionalStringWithMaxWords(500, 'Summary'),

        highlights: z
          .array(
            z.object({
              highlights: requiredString('Achievement'),
            })
          )
          .optional(),
      })
    )
    .optional(),

  educations: z
    .array(
      z.object({
        institution: requiredString('School / University'),
        url: urlValidator('Institution URL', false),
        degreeType: z.enum(['Undergraduate', 'Bachelors', 'Masters', 'Diploma', 'PhD']),
        degree: requiredString('Degree & Major required'),
        gpa: optionalString.refine(
          (val) => {
            if (!val) return true;
            const num = Number(val);
            return !isNaN(num) && num >= 0 && num <= 10;
          },
          {
            message: 'GPA must be between 0 and 10',
          }
        ),
        location: optionalString,
        startDate: dateValidator('Start date', true),
        endDate: dateValidator('End date', false),
        courses: z.array(z.object({ course: requiredString('Course Name required') })).optional(),
      })
    )
    .optional(),

  skills: z
    .array(
      z.object({
        name: requiredString('Skill'),
        level: requiredString('Proficiency'),
        keywords: z.array(z.object({ keywords: requiredString('Keyword required') })).optional(),
      })
    )
    .optional(),

  projects: z
    .array(
      z.object({
        name: requiredString('Project Name'),
        url: urlValidator('URL', false),
        description: optionalStringWithMaxWords(250, 'Description'),
        highlights: z.array(z.object({ highlights: requiredString('Feature') })).optional(),
        techStack: z.array(z.object({ techStack: requiredString('Technology') })).optional(),
        startDate: dateValidator('Start date', false),
        endDate: dateValidator('End date', false),
        roles: optionalString,
      })
    )
    .optional(),

  certifications: z
    .array(
      z.object({
        name: requiredString('Certificate Name required'),
        issuer: optionalString,
        date: optionalString,
        url: urlValidator('URL', false),
      })
    )
    .optional(),

  languages: z
    .array(
      z.object({
        language: requiredString('Language'),
        fluency: z.enum(['Beginner', 'Intermediate', 'Professional', 'Fluent', 'Native']),
      })
    )
    .optional(),

  activities: z
    .array(
      z.object({
        title: requiredString('Activity Title'),
        description: optionalStringWithMaxWords(150, 'Description'),
      })
    )
    .optional(),

  awards: z
    .array(
      z.object({
        title: requiredString('Award Title'),
        awarder: optionalString,
        date: dateValidator('Date', true),
        summary: optionalStringWithMaxWords(100, 'Summary'),
      })
    )
    .optional(),

  volunteers: z
    .array(
      z.object({
        organization: requiredString('Organization Name'),
        position: requiredString('Role / Title'),
        url: urlValidator('URL', false),
        startDate: dateValidator('Start date', false),
        endDate: dateValidator('End date', false),
        summary: optionalStringWithMaxWords(150, 'Summary'),
        highlights: z.array(z.object({ highlights: requiredString('Contribution') })).optional(),
      })
    )
    .optional(),

  publications: z
    .array(
      z.object({
        name: requiredString('Publication Title'),
        publisher: optionalString,
        releaseDate: dateValidator('Release date', false),
        url: urlValidator('URL', false),
        summary: optionalStringWithMaxWords(150, 'Summary'),
      })
    )
    .optional(),
});
export type CreateResumeType = z.infer<typeof createResumeSchema>;
