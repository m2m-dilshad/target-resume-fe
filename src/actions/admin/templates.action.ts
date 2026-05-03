'use server';
import { createTemplateSchema, CreateTemplateType } from '@/schemas/templates.schema';
import { ActionResponse } from '@/types/action.types';
import { z } from 'zod';
import { getAuthToken } from '../misc.action';
export async function fetchTemplates({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<ActionResponse> {
  console.log('Fetching templates with offset:', offset, 'and limit:', limit);
  const token = await getAuthToken();
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
      return data;
    })
    .catch((error) => {
      return { success: false, message: error.message, data: [] };
    });
  console.log('Fetch templates response:', response);
  return response;
}

export async function createTemplateAction(data: CreateTemplateType): Promise<ActionResponse> {
  const result = createTemplateSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }
  // console.log('Creating template with data:', data);
  const token = await getAuthToken();
  if (!token) {
    return { success: false, message: 'Unauthorized' };
  }
  console.log('Auth token for creating template:', token);
  const { template, ...rest } = data;

  try {
    const response = await fetch(`${process.env.API_URL}/admin/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Replace with actual token management
      },
      body: JSON.stringify({
        name: template.name,
        slug: template.slug,
        description: template.description,
        layoutJson: { ...rest },
        isActive: template.isActive,
        previewImageUrl:
          'https://res.cloudinary.com/dxfq3iotg/image/upload/v1697050867/target-resume/template-placeholder.png',
        structureType: template.structure,
        designStyle: 'MODERN',
        layoutType: template.layout,
        atsFriendly: template.ats,
        supportsProfilePhoto: rest.header.showPhoto !== 'none',
      }),
    });
    const rawText = await response.text();
    console.log(
      'Create template response:',
      `${process.env.API_URL}/admin/templates`,
      response.status,
      rawText
    );
    if (!response.ok) {
      return { success: false, message: `Server Error ${response.status}: ${rawText}` };
    }
    return rawText
      ? JSON.parse(rawText)
      : { success: false, message: 'Server returned empty response' };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
}
