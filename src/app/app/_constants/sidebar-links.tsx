import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Target,
  Briefcase,
  BarChart3,
  Layers,
  Settings,
  LucideIcon,
} from 'lucide-react';

export interface SidebarLinkType {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
}
export const SidebarLinksList: SidebarLinkType[] = [
  { id: 'home', name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  {
    id: 'myResumes',
    name: 'My Resumes',
    href: '/app/my-resumes',
    icon: FileText,
  },
  {
    id: 'resumeBuilder',
    name: 'Resume Builder',
    href: '/app/resume-builder',
    icon: Sparkles,
  },
  {
    id: 'resumeCreate',
    name: 'Resume Create',
    href: '/app/resumes/create',
    icon: Sparkles,
  },
  {
    id: 'jobOptimizer',
    name: 'Optimize for Job',
    href: '/app/job-optimizer',
    icon: Target,
  },
  {
    id: 'jobTracker',
    name: 'Job Tracker',
    href: '/app/job-tracker',
    icon: Briefcase,
  },
  {
    id: 'skillInsights',
    name: 'Skill Insights',
    href: '/app/skill-insights',
    icon: BarChart3,
  },
  {
    id: 'templates',
    name: 'Templates',
    href: '/app/resume-templates',
    icon: Layers,
  },
  { id: 'settings', name: 'Settings', href: '/app/settings', icon: Settings },
];
