import { Job } from '@/app/app/utils/misc.data';
import { addJobFormSchema, CreateJobType } from '@/schemas/job.schema';
import { ActionResponse } from '@/types/action.types';
import z from 'zod';

export async function createJobAction(data: CreateJobType): Promise<ActionResponse> {
  const result = addJobFormSchema.safeParse(data);

  if (!result.success) {
    console.log('Validation errors:', result.error.format());
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }
  console.log('Create job action data: ', data);
  return { success: true };
}
export async function updateJobAction(
  jobId: string,
  data: Partial<CreateJobType>
): Promise<ActionResponse> {
  console.log('UPDATE:', jobId, data);

  return { success: true };
}
export async function deleteJobAction(jobId: string): Promise<ActionResponse> {
  console.log('DELETE:', jobId);

  return { success: true };
}
export async function updateJobStatusAction(
  jobId: string,
  status: Job['status']
): Promise<ActionResponse> {
  try {
    console.log('Update status:', jobId, status);

    return { success: true };
  } catch {
    return { success: false };
  }
}
