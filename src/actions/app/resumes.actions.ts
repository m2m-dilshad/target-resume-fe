'use server';
import { createResumeSchema, CreateResumeType } from '@/schemas/resume.schema';
import { ActionResponse } from '@/types/action.types';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { CURRENT_RESUMES } from '@/app/app/utils/misc.data';

export async function createResumeAction(data: CreateResumeType): Promise<ActionResponse> {
  const result = createResumeSchema.safeParse(data);

  if (!result.success) {
    console.log('Validation errors:', result.error.format());
    return { success: false, errors: z.flattenError(result.error).fieldErrors };
  }
  console.log('Create resume action data: ', data);
  return { success: true };
}

// export async function fetchResumesAction({
//   offset,
//   limit,
//   searchParams,
// }: {
//   offset: number;
//   limit: number;
//   searchParams?: { query?: string };
// }): Promise<ActionResponse> {
//   let filtered = CURRENT_RESUMES;

//   if (searchParams?.query) {
//     filtered = filtered.filter((r) =>
//       r.title.toLowerCase().includes(searchParams.query!.toLowerCase())
//     );
//   }

//   return {
//     success: true,
//     data: filtered.slice(offset, offset + limit),
//     message: 'Resume fetched successfully',
//   };
// }

export async function fetchResumesAction({
  offset,
  limit,
  searchParams,
}: {
  offset: number;
  limit: number;
  searchParams?: {
    query?: string;
    startDate?: string;
    endDate?: string;
    atsScore?: string;
  };
}): Promise<ActionResponse> {
  let filtered = CURRENT_RESUMES;

  if (searchParams?.query) {
    filtered = filtered.filter((r) =>
      r.title.toLowerCase().includes(searchParams.query!.toLowerCase())
    );
  }

  if (searchParams?.startDate && searchParams?.endDate) {
    const selectedStartDate = new Date(searchParams.startDate);
    const selectedEndDate = new Date(searchParams.endDate);

    filtered = filtered.filter((r) => {
      const resumeDate = new Date(r.lastModified);

      return resumeDate >= selectedStartDate && resumeDate <= selectedEndDate;
    });
  }

  if (searchParams?.atsScore) {
    const score = Number(searchParams.atsScore);
    console.log('ATS score:', searchParams?.atsScore, 'score: ', score);

    filtered = filtered.filter((r) => r.score <= score);
  }

  return {
    success: true,
    data: filtered.slice(offset, offset + limit),
    message: 'Resume fetched successfully',
  };
}
export async function deleteSelectedResumesAction(ids: string[]): Promise<ActionResponse> {
  try {
    const UPDATED_RESUMES = CURRENT_RESUMES.filter((resume) => !ids.includes(resume.id));

    console.log('Deleted resume ids:', ids);

    return {
      success: true,
      data: UPDATED_RESUMES,
      message: 'Selected resumes deleted successfully',
    };
  } catch (err) {
    console.log('deleteSelectedResumesAction error: ', err);
    return {
      success: false,
      data: null,
      message: 'Failed to delete selected resumes',
    };
  }
}
export async function downloadResumeAction(ids: string[]): Promise<ActionResponse> {
  try {
    const selectedResume = CURRENT_RESUMES.filter((r) => ids.includes(r.id));
    console.log(
      'Downloading resume:',
      selectedResume.map((r) => r.title)
    );

    return {
      success: true,
      data: selectedResume,
      message: 'Resume downloaded successfully',
    };
  } catch (err) {
    console.log('downloadResumeAction error: ', err);
    return {
      success: false,
      data: [],
      message: 'Failed to download resumes',
    };
  }
}
type EditResumeParams = {
  id: string;
  title?: string;
  targetJob?: string;
  lastModified?: string;
  score?: number;
  isPrimary?: boolean;
};
export async function editResumeAction(params: EditResumeParams): Promise<ActionResponse> {
  try {
    let updated = false;
    const UPDATED_RESUMES = CURRENT_RESUMES.map((resume) => {
      if (resume.id === params.id) {
        updated = true;
        return { ...resume, ...params };
      }
      return resume;
    });

    return {
      success: updated,
      data: UPDATED_RESUMES,
      message: updated ? 'Resume updated successfully' : 'Resume not found',
    };
  } catch (err) {
    console.log('editResumeAction error: ', err);
    return {
      success: false,
      data: null,
      message: 'Failed to edit resume',
    };
  }
}

export async function JobDescResumeAction(
  file: File,
  jobDescription: string,
  prompt?: string
): Promise<ActionResponse> {
  try {
    if (!file) {
      return { success: false, message: 'No file uploaded' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, buffer);

    const parsedText = `File uploaded: ${file.name}`;

    const optimizedResume = `
Inputs received successfully:

- Job Description: ${jobDescription}
- Prompt: ${prompt || 'None'}
`;
    return {
      success: true,
      data: {
        filePath: `/uploads/${file.name}`,
        parsedText,
        optimizedResume,
      },
      message: 'Resume uploaded and processed locally.',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to process resume.',
    };
  }
}
