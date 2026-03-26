'use server';
import { loginSchema, LoginType, signupSchema, SignupType } from '@/schemas/auth.schema';
import { ActionResponse } from '@/types/action.types';
import { z } from 'zod';
export async function loginAction(data: LoginType): Promise<ActionResponse> {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }

  // Simulated database check (e.g., check if user exists)
  if (data.email === 'taken@example.com') {
    return {
      success: false,
      errors: { email: ['This email is already registered.'] },
    };
  }

  return { success: true };
}

export async function signupAction(data: SignupType): Promise<ActionResponse> {
  const result = signupSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }

  // Simulated database check (e.g., check if user exists)
  if (data.email === 'taken@example.com') {
    return {
      success: false,
      errors: { email: ['This email is already registered.'] },
    };
  }

  return { success: true };
}
