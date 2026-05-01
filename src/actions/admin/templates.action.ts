'use server';
import { createTemplateSchema, CreateTemplateType } from '@/schemas/templates.schema';
import { ActionResponse } from '@/types/action.types';
import { cookies } from 'next/headers';
import { z } from 'zod';
export async function fetchTemplates({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<ActionResponse> {
  console.log('Fetching templates with offset:', offset, 'and limit:', limit);
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return { success: false, message: 'Unauthorized' };
  }
  const response = await fetch(`${process.env.API_URL}/admin/templates`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Replace with actual token management
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log('Login successful:', data);
      return data;
    })
    .catch((error) => {
      // console.error('Login error:', error);
      return { success: false, message: error.message };
    });

  console.log('Templates response:', response);

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
