import { z } from 'zod';

export const addJobFormSchema = z.object({
  company: z.string().min(1, 'Company is required').max(100, 'Company name is too long'),

  jobTitle: z.string().min(1, 'Job title is required').max(120, 'Job title is too long'),

  status: z.enum(['applied', 'interview', 'offer', 'rejected']).default('applied'),

  dateApplied: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return !isNaN(Date.parse(val));
    }, 'Invalid date'),

  salaryRange: z.string().max(50, 'Salary range too long').optional(),

  followUpReminder: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return !isNaN(Date.parse(val));
    }, 'Invalid date'),

  location: z.string().max(100, 'Location too long').optional(),

  recruiterName: z.string().max(100, 'Recruiter name too long').optional(),

  jobListingUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),

  notes: z.string().max(1000, 'Notes too long').optional(),
});

export type CreateJobType = z.infer<typeof addJobFormSchema>;
