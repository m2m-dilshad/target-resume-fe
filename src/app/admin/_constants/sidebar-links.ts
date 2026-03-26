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
  MessageSquareText,
  ChartNoAxesCombined,
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
export const AdminSidebarLinksList: SidebarLinkType[] = [
  {
    id: 'Dashboard',
    name: 'Dashboard',
    href: '/admin',
    icon: ChartNoAxesCombined,
  },
  {
    id: 'resumeTemplates',
    name: 'Resume Templates',
    href: '/admin/templates',
    icon: LayoutDashboard,
  },
  {
    id: 'feedback',
    name: 'Feedback',
    href: '/admin/feedback',
    icon: MessageSquareText,
  },
];
