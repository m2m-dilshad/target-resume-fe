import { createResumeSchema, CreateResumeType } from '@/schemas/resume.schema';
import { ActionResponse } from '@/types/action.types';
import { z } from 'zod';

export async function createResumeAction(data: CreateResumeType): Promise<ActionResponse> {
  const result = createResumeSchema.safeParse(data);

  if (!result.success) {
    console.log('Validation errors:', result.error.format());
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }
  console.log('Create resume action data: ', data);
  return { success: true };
}
