'use client';
import { createTemplateAction } from '@/actions/admin/templates.action';
import FormWrapper, { SubmitButton } from '@/components/forms/FormWrapper';
import { createTemplateSchema, CreateTemplateType } from '@/schemas/templates.schema';
import { ActionResponse } from '@/types/action.types';
import { Section } from '@/types/template.types';
import TemplateConfigSection from './TemplateConfigSection';
import TemplatePreview from './TemplatePreview';
import {
  Briefcase,
  Columns,
  Combine,
  GraduationCap,
  History,
  Layout,
  PanelLeft,
  PanelRight,
  Rows,
  Wrench,
} from 'lucide-react';

// // Convert dot-based or underscore-based fields to nested object keys
// function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown) {
//   const normalizedPath = path.replace(/_/g, '.');
//   const parts = normalizedPath.split('.');
//   let current: Record<string, unknown> = obj;

//   for (let i = 0; i < parts.length; i += 1) {
//     const key = parts[i];
//     if (i === parts.length - 1) {
//       current[key] = value;
//       return;
//     }

//     const next = current[key];
//     if (typeof next !== 'object' || next === null) {
//       current[key] = {};
//     }

//     current = current[key] as Record<string, unknown>;
//   }
// }

// function buildDefaultValuesFromSchema(sections: Section[]) {
//   const defaultValues: Record<string, unknown> = {};

//   sections.forEach((section) => {
//     section.fields.forEach((field) => {
//       const defaultValue = field.type === 'checkbox' ? false : '';
//       setNestedValue(defaultValues, field.name, defaultValue);
//     });
//   });

//   return defaultValues;
// }

export const templateFormSchema: Section[] = [
  {
    name: 'Template Information',
    gridCols: 3,
    fields: [
      { name: 'template.name', label: 'Template Name', type: 'text', gridColSpan: 2 },
      { name: 'template.slug', label: 'Template ID / Slug', type: 'text', gridColSpan: 1 },
      { name: 'template.description', label: 'Description', type: 'textarea', gridColSpan: 3 },
      {
        name: 'template.structure',
        label: 'Logical Structure',
        type: 'selectWithIcons',
        options: [
          { label: 'Chronological', value: 'CHRONOLOGICAL', icon: History },
          { label: 'Functional', value: 'FUNCTIONAL', icon: Wrench },
          { label: 'Combination', value: 'COMBINATION', icon: Combine },
          { label: 'Academic (CV)', value: 'ACADEMIC', icon: GraduationCap },
          { label: 'Project-Based', value: 'PROJECT_BASED', icon: Briefcase },
        ],
        gridColSpan: 3,
      },
      {
        name: 'template.layout',
        label: 'Visual Layout',
        type: 'selectWithIcons',
        options: [
          { label: 'Single Column', value: 'SINGLE_COLUMN', icon: Rows },
          { label: 'Left Sidebar', value: 'LEFT_SIDEBAR', icon: PanelLeft },
          { label: 'Right Sidebar', value: 'RIGHT_SIDEBAR', icon: PanelRight },
          { label: 'Split 50/50', value: 'SPLIT_50_50', icon: Columns },
          { label: 'Modern Header', value: 'MODERN_HEADER', icon: Layout },
        ],
        gridColSpan: 3,
      },
      { name: 'template.ats', label: 'ATS Friendly', type: 'checkbox', gridColSpan: 1 },
      { name: 'template.isActive', label: 'Active Template', type: 'checkbox', gridColSpan: 1 },
      {
        name: 'template.supportsProfilePhoto',
        label: 'Supports Photo',
        type: 'checkbox',
        gridColSpan: 1,
      },
    ],
  },
  {
    name: 'Typography & Colors',
    gridCols: 2,
    fields: [
      {
        name: 'typography.headingFont',
        label: 'Heading Font',
        type: 'select',
        options: [
          { label: 'Inter', value: 'Inter' },
          { label: 'Lora', value: 'Lora' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'typography.bodyFont',
        label: 'Body Font',
        type: 'select',
        options: [
          { label: 'Inter', value: 'Inter' },
          { label: 'Open Sans', value: 'Open Sans' },
        ],
        gridColSpan: 1,
      },
      { name: 'colors.primary', label: 'Primary (Headings)', type: 'color', gridColSpan: 1 },
      { name: 'colors.accent', label: 'Accent (Icons/Lines)', type: 'color', gridColSpan: 1 },
      { name: 'colors.text', label: 'Body Text Color', type: 'color', gridColSpan: 1 },
      { name: 'colors.sidebarBg', label: 'Sidebar Background', type: 'color', gridColSpan: 1 },
    ],
  },
  {
    name: 'Global Spacing & Page',
    gridCols: 2,
    fields: [
      {
        name: 'page.paperSize',
        label: 'Paper Size',
        type: 'select',
        options: [
          { label: 'A4', value: 'A4' },
          { label: 'Letter', value: 'Letter' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'spacing.sectionGap',
        label: 'Space Between Sections',
        type: 'select',
        options: [
          { label: 'Small', value: '12px' },
          { label: 'Normal', value: '20px' },
          { label: 'Large', value: '32px' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'spacing.itemGap',
        label: 'Space Between Items',
        type: 'select',
        options: [
          { label: 'Compact', value: '4px' },
          { label: 'Normal', value: '8px' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'page.margins',
        label: 'Page Margins',
        type: 'select',
        options: [
          { label: 'Narrow', value: '0.5in' },
          { label: 'Standard', value: '1in' },
        ],
        gridColSpan: 1,
      },
    ],
  },
  {
    name: 'Component Styles',
    gridCols: 2,
    fields: [
      {
        name: 'design.icons.style',
        label: 'Icon Style',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Outline', value: 'outline' },
          { label: 'Solid', value: 'solid' },
          { label: 'Circular Background', value: 'circle' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'design.photo.shape',
        label: 'Photo Shape',
        type: 'select',
        options: [
          { label: 'Square', value: 'square' },
          { label: 'Rounded', value: 'rounded' },
          { label: 'Circle', value: 'circle' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'design.horizontalRule',
        label: 'Section Divider Line',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Full Width', value: 'full' },
          { label: 'Partial', value: 'partial' },
          { label: 'Thick Bottom', value: 'thick' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'design.skillDisplay',
        label: 'Skills Style',
        type: 'select',
        options: [
          { label: 'Comma Separated', value: 'text' },
          { label: 'Tags/Pills', value: 'pills' },
          { label: 'Progress Bars', value: 'bars' },
          { label: 'Star Rating', value: 'stars' },
        ],
        gridColSpan: 1,
      },
    ],
  },
  {
    name: 'Contact & Header',
    gridCols: 2,
    fields: [
      {
        name: 'header.alignment',
        label: 'Header Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'header.showLabels',
        label: 'Show Contact Labels (e.g. "Phone:")',
        type: 'checkbox',
        gridColSpan: 1,
      },
      { name: 'header.useIcons', label: 'Use Contact Icons', type: 'checkbox', gridColSpan: 1 },
    ],
  },
  {
    name: 'Design Elements',
    fields: [
      { name: 'design.lines.enabled', label: 'Enable Section Dividers', type: 'checkbox' },
      {
        name: 'design.lines.thickness',
        label: 'Line Thickness',
        type: 'select',
        options: [
          { label: '1px - Thin', value: '1px' },
          { label: '2px - Medium', value: '2px' },
          { label: '3px - Thick', value: '3px' },
        ],
      },
      {
        name: 'design.bullets.type',
        label: 'Bullet Points',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Circle', value: 'circle' },
          { label: 'Square', value: 'square' },
          { label: 'Dash', value: 'dash' },
        ],
      },
      {
        name: 'design.sections.spacing',
        label: 'Space Between Sections',
        type: 'select',
        options: [
          { label: 'Compact', value: '12px' },
          { label: 'Normal', value: '20px' },
          { label: 'Loose', value: '32px' },
        ],
      },
    ],
  },
  {
    name: 'Header & Personal Info',
    fields: [
      {
        name: 'header.name.alignment',
        label: 'Name Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
      { name: 'header.role.visible', label: 'Show Designation', type: 'checkbox' },
      {
        name: 'header.photo.shape',
        label: 'Photo Shape',
        type: 'select',
        options: [
          { label: 'Circle', value: 'circle' },
          { label: 'Rounded', value: 'rounded' },
          { label: 'Square', value: 'square' },
        ],
      },
      { name: 'header.contact.useIcons', label: 'Use Contact Icons', type: 'checkbox' },
      {
        name: 'header.contact.layout',
        label: 'Contact Info Layout',
        type: 'select',
        options: [
          { label: 'Single Line', value: 'inline' },
          { label: 'Grid/Columns', value: 'grid' },
        ],
      },
    ],
  },
  {
    name: 'Experience & Education',
    fields: [
      {
        name: 'experience.location_placement',
        label: 'Exp: Location Placement',
        type: 'select',
        options: [
          { label: 'With Company', value: 'with_company' },
          { label: 'Right Aligned', value: 'right' },
        ],
      },
      {
        name: 'experience.date_placement',
        label: 'Exp: Date Placement',
        type: 'select',
        options: [
          { label: 'Right Aligned', value: 'right' },
          { label: 'Below Role', value: 'below' },
        ],
      },
      {
        name: 'education.primary_display',
        label: 'Edu: Primary Display',
        type: 'select',
        options: [
          { label: 'Institution First', value: 'inst' },
          { label: 'Degree First', value: 'deg' },
        ],
      },
      { name: 'education.show_gpa', label: 'Show GPA', type: 'checkbox' },
    ],
  },
  {
    name: 'Skills & Languages',
    fields: [
      {
        name: 'skills.layout',
        label: 'Skills Layout',
        type: 'select',
        options: [
          { label: 'Pills/Tags', value: 'pills' },
          { label: 'Bullet List', value: 'bullets' },
          { label: 'Grid', value: 'grid' },
        ],
      },
      { name: 'skills.group_by_category', label: 'Group by Category', type: 'checkbox' },
      {
        name: 'languages.layout',
        label: 'Languages Layout',
        type: 'select',
        options: [
          { label: 'Inline', value: 'inline' },
          { label: 'Columns', value: 'columns' },
        ],
      },
      { name: 'languages.show_proficiency', label: 'Show Proficiency Level', type: 'checkbox' },
    ],
  },
  {
    name: 'Projects & Publications',
    fields: [
      {
        name: 'projects.tech_stack',
        label: 'Project: Tech Stack Style',
        type: 'select',
        options: [
          { label: 'Inline Text', value: 'inline' },
          { label: 'Small Pills', value: 'pills' },
          { label: 'Hide', value: 'hide' },
        ],
      },
      {
        name: 'projects.description_style',
        label: 'Project: Description Style',
        type: 'select',
        options: [
          { label: 'Paragraph', value: 'para' },
          { label: 'Bullets', value: 'bullets' },
        ],
      },
      { name: 'projects.show_github_link', label: 'Show GitHub Icon', type: 'checkbox' },
      {
        name: 'publications.citation_format',
        label: 'Citation Format',
        type: 'select',
        options: [
          { label: 'APA', value: 'apa' },
          { label: 'IEEE', value: 'ieee' },
          { label: 'MLA', value: 'mla' },
        ],
      },
    ],
  },
  {
    name: 'Volunteering & Awards',
    fields: [
      {
        name: 'volunteering.layout',
        label: 'Volunteering Layout',
        type: 'select',
        options: [
          { label: 'Role First', value: 'role' },
          { label: 'Org First', value: 'org' },
        ],
      },
      {
        name: 'awards.date_position',
        label: 'Award Date Position',
        type: 'select',
        options: [
          { label: 'Right Aligned', value: 'right' },
          { label: 'Below Title', value: 'below' },
        ],
      },
      { name: 'awards.highlight_title', label: 'Bold Award Titles', type: 'checkbox' },
    ],
  },
  {
    name: 'Interests & Miscellaneous',
    fields: [
      {
        name: 'interests.layout',
        label: 'Interests Style',
        type: 'select',
        options: [
          { label: 'Comma Inline', value: 'inline' },
          { label: 'Grid Columns', value: 'columns' },
        ],
      },
      { name: 'interests.column_count', label: 'Columns', type: 'number' },
      { name: 'custom_sections.enabled', label: 'Allow Custom Sections', type: 'checkbox' },
      { name: 'config.section_order', label: 'Enable Drag & Drop Sorting', type: 'checkbox' },
    ],
  },
];

const initialTemplateFormValues = {
  template: {
    name: 'Modern Professional',
    slug: 'modern-pro-01',
    description: 'Standard clean layout for corporate roles.',
    ats: true,
    isActive: true,
    supportsProfilePhoto: false,
    structure: 'CHRONOLOGICAL',
    design: 'professional',
    layout: 'single',
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingPrimary: { size: '24px', case: 'uppercase' },
    headingSecondary: { size: '20px', case: 'capitalize' },
    headingTertiary: { size: '16px', case: 'none' },
    body: { size: '12px', lineHeight: '1.5', listLineHeight: '1.5' },
  },
  colors: { accent: '#000000' },
  page: {
    paperSize: 'A4',
    margins: { topBottom: '1', leftRight: '1' },
    borders: { topBottom: '', allSides: '' },
  },
  design: {
    lines: { enabled: 'true', thickness: '1px', style: 'solid' },
    bullets: { type: 'circle', size: '8px' },
  },
  header: {
    name: { alignment: 'left' },
    role: { visible: 'true', alignment: 'left' },
    contact: { alignment: 'left' },
  },
  skills: {
    layout: 'bullet_list',
    show_proficiency: true,
    group_by_category: false,
    column_count: 2,
  },
  experience: {
    location_placement: 'right_aligned',
    date_placement: 'right_aligned',
    description_style: 'bullet_points',
  },
  projects: {
    tech_stack: 'inline_text',
    description: 'bullet_points',
    show_project_link: true,
    show_github_link: true,
    show_date: true,
  },
} as CreateTemplateType;

export default function CreateTemplateForm() {
  const handleSubmitCallback = (response: ActionResponse) => {
    if (response.success) {
      console.log('Template created successfully:', response);
    } else {
      console.error('Failed to create template:', response);
    }
  };
  return (
    <FormWrapper<CreateTemplateType, ActionResponse>
      fields={[]}
      schema={createTemplateSchema}
      defaultValues={initialTemplateFormValues}
      onSubmitAction={createTemplateAction}
      submitButton={<SubmitButton submitLabel="Create Template" className="mt-2" />}
      submitCallback={handleSubmitCallback}
    >
      <div className="flex">
        <div className="w-1/2 p-4">
          {templateFormSchema.map((section) => (
            <TemplateConfigSection<CreateTemplateType> key={section.name} section={section} />
          ))}
        </div>
        <div className="w-1/2 p-4">
          <h2 className="mb-4 text-xl font-bold">Preview</h2>
          <div className="rounded-md border border-gray-300 p-4">
            <TemplatePreview />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
