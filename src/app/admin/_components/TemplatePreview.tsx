'use client';
import ResumeParser from '@/components/resume-parser/ResumeParser';
import { useWatch, useFormContext } from 'react-hook-form';

export default function TemplatePreview() {
  const { control } = useFormContext();
  // Watch the entire form state
  const formData = useWatch({ control });

  // Safety check for initialization
  if (!formData?.template) return null;

  return (
    <div className="preview-container p0 h-full overflow-auto bg-gray-100">
      <ResumeParser config={formData} />
    </div>
  );
}
