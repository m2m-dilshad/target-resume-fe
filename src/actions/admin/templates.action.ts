'use server';
import { createTemplateSchema, CreateTemplateType } from '@/schemas/templates.schema';
import { ActionResponse } from '@/types/action.types';
import { z } from 'zod';
export async function fetchTemplates({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<ActionResponse> {
  console.log('Fetching templates with offset:', offset, 'and limit:', limit);
  const result = {
    success: true,
    data: [
      { id: 1, name: 'Template 1' },
      { id: 2, name: 'Template 2' },
    ],
    message: 'Templates fetched successfully',
  };

  return result;
}

export async function createTemplateAction(data: CreateTemplateType): Promise<ActionResponse> {
  const result = createTemplateSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }

  return { success: true };
}
