import { Resume } from '@/types/resume.types';
import { FileEdit, FilePlus2, LayoutTemplate, Zap } from 'lucide-react';

export const actions = [
  {
    title: 'Build from scratch',
    description:
      'Start fresh and create a standout resume step by step. Our guided assistant helps you write every section with confidence.',
    icon: FilePlus2,
    route: '/app/resumes/create',
    className: {
      card: 'hover:border-blue-500/50',
      iconWrapper: 'bg-blue-50 border border-blue-200',
      icon: 'text-blue-600',
    },
  },
  {
    title: 'Improve existing resume',
    description:
      'Already have a resume? Upload it and we’ll enhance formatting, clarity, and impact to make it recruiter-ready.',
    icon: FileEdit,
    route: '/app/my-resumes',
    className: {
      card: 'hover:border-emerald-500/50',
      iconWrapper: 'bg-emerald-50 border border-emerald-200',
      icon: 'text-emerald-600',
    },
  },
  {
    title: 'Optimize for job description',
    description:
      'Target a specific job by pasting the description. We’ll tailor your resume to match keywords and pass ATS filters.',
    icon: Zap,
    route: '/app/job-optimizer',
    className: {
      card: 'hover:border-amber-500/50',
      iconWrapper: 'bg-amber-50 border border-amber-200',
      icon: 'text-amber-600',
    },
  },
  {
    title: 'Use template',
    description:
      'Choose from professionally designed templates tailored for different industries and experience levels.',
    icon: LayoutTemplate,
    route: '/app/templates',
    className: {
      card: 'hover:border-purple-500/50',
      iconWrapper: 'bg-purple-50 border border-purple-200',
      icon: 'text-purple-600',
    },
  },
];
export const CURRENT_RESUMES: Resume[] = [
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
