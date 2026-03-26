import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().trim().min(8, 'Password must be 8+ characters'),
  remember: z.boolean().optional(),
});

export type LoginType = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be 2+ characters'),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().trim().min(8, 'Password must be 8+ characters'),
    confirmPassword: z.string().trim().min(8, 'Confirm Password required'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

export type SignupType = z.infer<typeof signupSchema>;
