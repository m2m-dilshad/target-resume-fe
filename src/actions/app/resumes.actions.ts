import { createResumeSchema, CreateResumeType } from '@/schemas/resume.schema';
import { ActionResponse } from '@/types/action.types';
import { Resume } from '@/types/resume.types';
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
let CURRENT_RESUMES: Resume[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    targetJob: 'Google / Meta',
    lastModified: '2024-03-20',
    score: 92,
    isPrimary: true,
  },
  {
    id: '2',
    title: 'Frontend Developer',
    targetJob: 'Startup / Series A',
    lastModified: '2024-03-15',
    score: 78,
  },
  {
    id: '3',
    title: 'Frontend Developer',
    targetJob: 'Amazon',
    lastModified: '2024-03-10',
    score: 64,
  },
  {
    id: '4',
    title: 'Fullstack Dev (Node/React)',
    targetJob: 'Fintech',
    lastModified: '2024-03-05',
    score: 88,
  },
];
export async function fetchResumesAction({
  offset,
  limit,
  searchParams,
}: {
  offset: number;
  limit: number;
  searchParams?: { query?: string };
}): Promise<ActionResponse> {
  let filtered = CURRENT_RESUMES;

  if (searchParams?.query) {
    filtered = filtered.filter((r) =>
      r.title.toLowerCase().includes(searchParams.query!.toLowerCase())
    );
  }

  return {
    success: true,
    data: filtered.slice(offset, offset + limit),
    message: 'Resume fetched successfully',
  };
}
export async function deleteSelectedResumesAction(ids: string[]): Promise<ActionResponse> {
  try {
    CURRENT_RESUMES = CURRENT_RESUMES.filter((resume) => !ids.includes(resume.id));

    console.log('Deleted resume ids:', ids);

    return {
      success: true,
      data: CURRENT_RESUMES,
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
    CURRENT_RESUMES = CURRENT_RESUMES.map((resume) => {
      if (resume.id === params.id) {
        updated = true;
        return { ...resume, ...params };
      }
      return resume;
    });

    return {
      success: updated,
      data: CURRENT_RESUMES,
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
