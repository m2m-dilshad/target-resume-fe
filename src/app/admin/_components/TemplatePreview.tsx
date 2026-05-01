'use client';
import ResumeParser from '@/components/resume-parser/ResumeParser';
import { useWatch, useFormContext } from 'react-hook-form';
import { RESUME_MOCK_DATA } from '../_constants/resume-mock-data';

export default function TemplatePreview() {
  const { control } = useFormContext();
  // Watch the entire form state
  const formData = useWatch({ control });

  // Safety check for initialization
  if (!formData?.template) return null;

  return <ResumeParser config={formData} data={RESUME_MOCK_DATA} />;
}
