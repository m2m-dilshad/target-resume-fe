import { PAGE_SIZES } from '@/lib/constants';
import { useResume } from './ResumeContext';
import React from 'react';
import PersonalInfo from './PersonalInfo';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import SummarySection from './SummarySection';
import PublicationsSection from './PublicationsSection';
import AwardsSection from './AwardsSection';
import VolunteerSection from './VolunteerSection';
import LanguagesSection from './LanguagesSection';

export function SingleColumnLayout({ children }: { children: React.ReactNode }) {
  return <div className="single mx-auto flex max-w-4xl flex-col gap-6">{children}</div>;
}

export function LeftSidebarLayout({ children }: { children: React.ReactNode }) {
  const [header, ...rest] = children as React.ReactNode[];
  const { config } = useResume();
  const pageStyles = {} as React.CSSProperties;
  pageStyles.minHeight = PAGE_SIZES[config.page.paperSize].height;
  pageStyles.gridTemplateColumns = `calc(30% + ${config.page.marginX}) 1fr`;

  return (
    <div className="left grid gap-8" style={pageStyles}>
      <div className="sidebar">{header}</div>
      <div className="sidebar-content">{rest}</div>
    </div>
  );
}

export function RightSidebarLayout({ children }: { children: React.ReactNode }) {
  const [header, ...rest] = children as React.ReactNode[];
  const { config } = useResume();
  const pageStyles = {} as React.CSSProperties;
  pageStyles.minHeight = PAGE_SIZES[config.page.paperSize].height;
  pageStyles.gridTemplateColumns = `1fr calc(30% + ${config.page.marginX})`;
  return (
    <div className="right grid gap-8" style={pageStyles}>
      <div className="sidebar-content">{rest}</div>
      <div className="sidebar">{header}</div>
    </div>
  );
}

export function Split50_50Layout({ children }: { children: React.ReactNode }) {
  const [header, ...rest] = children as React.ReactNode[];
  const { config } = useResume();
  const pageStyles = {} as React.CSSProperties;
  pageStyles.minHeight = PAGE_SIZES[config.page.paperSize].height;

  return (
    <div className="split grid grid-cols-2 gap-8" style={pageStyles}>
      <div className="sidebar">{header}</div>
      <div className="sidebar-content">{rest}</div>
    </div>
  );
}

export function ModernHeaderLayout({ children }: { children: React.ReactNode }) {
  const [header, ...rest] = children as React.ReactNode[];
  return (
    <div className="p-0">
      <div className="modern-header">{header}</div>
      <div className="modern-header-content">{rest}</div>
    </div>
  );
}

export const LayoutDesigns = {
  SINGLE_COLUMN: SingleColumnLayout,
  LEFT_SIDEBAR: LeftSidebarLayout,
  RIGHT_SIDEBAR: RightSidebarLayout,
  SPLIT_50_50: Split50_50Layout,
  MODERN_HEADER: ModernHeaderLayout,
};

export const LOGICAL_STRUCTURES = {
  CHRONOLOGICAL: ['basics', 'work', 'education', 'skills', 'languages', 'projects'],
  FUNCTIONAL: ['basics', 'skills', 'languages', 'projects', 'work', 'education'],
  COMBINATION: ['basics', 'summary', 'skills', 'languages', 'work', 'projects', 'education'],
  ACADEMIC: ['basics', 'education', 'publications', 'awards', 'volunteer', 'skills', 'languages'],
  PROJECT_BASED: ['basics', 'projects', 'work', 'skills', 'languages', 'education'],
};

export const SIDEBAR_PREFERRED = [
  'basics',
  'skills',
  'languages',
  'education',
  'awards',
  'volunteer',
];

export const RESUME_SECTIONS = {
  // basics: PersonalInfo,
  work: ExperienceSection,
  languages: LanguagesSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  summary: SummarySection,
  publications: PublicationsSection,
  awards: AwardsSection,
  volunteer: VolunteerSection,
};

// function getSections(children: React.ReactNode[]) {
//   const childrenArray = React.Children.toArray(children);
//   // Extract all <section> elements into one array
//   const sections = childrenArray.filter(
//     (child): child is ReactElement => React.isValidElement(child) && child.type === 'section'
//   );

//   // Everything else
//   const otherContent = childrenArray.filter(
//     (child) => !(React.isValidElement(child) && child.type === 'section')
//   );

//   return { sections, otherContent };
// }

export const LayoutDesign = ({ children }: { children?: React.ReactNode }) => {
  const { config } = useResume();
  const LayoutComponent =
    LayoutDesigns[config.template.layout as keyof typeof LayoutDesigns] ||
    LayoutDesigns.SINGLE_COLUMN;

  const sectionOrder =
    LOGICAL_STRUCTURES[config.template.structure as keyof typeof LOGICAL_STRUCTURES];

  function renderSection(key: string) {
    const Component = RESUME_SECTIONS[key as keyof typeof RESUME_SECTIONS];
    return Component ? <Component key={key} /> : null;
  }

  // 3. Split sections based on the active Layout
  const sidebarContent: React.ReactNode[] = [];
  let mainContent: React.ReactNode[] = [];
  if (config.template.layout === 'SINGLE_COLUMN' || config.template.layout === 'MODERN_HEADER') {
    mainContent = sectionOrder.map(renderSection);
  } else {
    // For LEFT_SIDEBAR, RIGHT_SIDEBAR, or SPLIT_50_50
    sectionOrder.forEach((key) => {
      if (SIDEBAR_PREFERRED.includes(key)) {
        sidebarContent.push(renderSection(key));
      } else {
        mainContent.push(renderSection(key));
      }
    });
  }

  return (
    <LayoutComponent>
      <header className="header">
        <PersonalInfo />
        {sidebarContent}
      </header>
      <main>
        {mainContent}
        {children && children}
      </main>
    </LayoutComponent>
  );
};
