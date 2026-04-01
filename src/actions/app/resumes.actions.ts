import { createResumeSchema, CreateResumeType } from '@/schemas/resume.schema';
import { ActionResponse } from '@/types/action.types';
import { z } from 'zod';

export async function createResumeAction(data: CreateResumeType): Promise<ActionResponse> {
  const result = createResumeSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }

  return { success: true };
}
