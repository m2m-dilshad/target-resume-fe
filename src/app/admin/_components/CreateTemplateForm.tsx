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

export const templateFormSchema: Section[] = [
  {
    name: 'template',
    label: 'Template Information',
    type: 'object',
    gridCols: 3,
    fields: [
      {
        name: 'name',
        label: 'Template Name',
        type: 'text',
        gridColSpan: 2,
        className: 'pt-[6px] pb-[6px] lg:pt-[4.5px] lg:pb-[4.5px]',
      },
      {
        name: 'slug',
        label: 'Template ID / Slug',
        type: 'text',
        gridColSpan: 1,
        className: 'pt-[6px] pb-[6px] lg:pt-[4.5px] lg:pb-[4.5px]',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        gridColSpan: 3,
        className: 'pt-[6px] pb-[6px] lg:pt-[4.5px] lg:pb-[4.5px]',
      },
      {
        name: 'structure',
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
        name: 'layout',
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
      { name: 'ats', label: 'ATS Friendly', type: 'checkbox', gridColSpan: 1 },
      { name: 'isActive', label: 'Active Template', type: 'checkbox', gridColSpan: 1 },
    ],
  },
  {
    name: 'typography',
    label: 'Typography & Colors',
    type: 'object',
    gridCols: 2,
    fields: [
      {
        name: 'headingFontFamily',
        label: 'Heading Font',
        type: 'select',
        options: [
          { label: 'Inter', value: 'Inter' },
          { label: 'Lora', value: 'Lora' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'headingPrimarySize',
        label: 'Heading Primary Size',
        type: 'select',
        options: [
          { label: '10pt', value: '10pt' },
          { label: '12pt', value: '12pt' },
          { label: '14pt', value: '14pt' },
          { label: '16pt', value: '16pt' },
          { label: '18pt', value: '18pt' },
          { label: '22pt', value: '22pt' },
          { label: '24pt', value: '24pt' },
          { label: '28pt', value: '28pt' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'headingSecondarySize',
        label: 'Heading Secondary Size',
        type: 'select',
        options: [
          { label: '10pt', value: '10pt' },
          { label: '12pt', value: '12pt' },
          { label: '14pt', value: '14pt' },
          { label: '16pt', value: '16pt' },
          { label: '18pt', value: '18pt' },
          { label: '22pt', value: '22pt' },
          { label: '24pt', value: '24pt' },
          { label: '28pt', value: '28pt' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'headingTertiarySize',
        label: 'Heading Tertiary Size',
        type: 'select',
        options: [
          { label: '10pt', value: '10pt' },
          { label: '12pt', value: '12pt' },
          { label: '14pt', value: '14pt' },
          { label: '16pt', value: '16pt' },
          { label: '18pt', value: '18pt' },
          { label: '22pt', value: '22pt' },
          { label: '24pt', value: '24pt' },
          { label: '28pt', value: '28pt' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'headingPrimaryCase',
        label: 'Heading Primary Case',
        type: 'select',
        options: [
          { label: 'uppercase', value: 'uppercase' },
          { label: 'lowercase', value: 'lowercase' },
          { label: 'capitalize', value: 'capitalize' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'headingSecondaryCase',
        label: 'Heading Secondary Case',
        type: 'select',
        options: [
          { label: 'uppercase', value: 'uppercase' },
          { label: 'lowercase', value: 'lowercase' },
          { label: 'capitalize', value: 'capitalize' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'headingTertiaryCase',
        label: 'Heading Tertiary Case',
        type: 'select',
        options: [
          { label: 'uppercase', value: 'uppercase' },
          { label: 'lowercase', value: 'lowercase' },
          { label: 'capitalize', value: 'capitalize' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'bodyFontFamily',
        label: 'Body Font',
        type: 'select',
        options: [
          { label: 'Inter', value: 'Inter' },
          { label: 'Open Sans', value: 'Open Sans' },
          { label: 'Verdana', value: 'Verdana' },
          { label: 'Arial', value: 'Arial' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'bodyFontSize',
        label: 'Body Font Size',
        type: 'select',
        options: [
          { label: '9pt', value: '9pt' },
          { label: '10pt', value: '10pt' },
          { label: '12pt', value: '12pt' },
          { label: '14pt', value: '14pt' },
        ],
        gridColSpan: 1,
      },
      { name: 'colorPrimary', label: 'Primary (Headings)', type: 'colorPicker', gridColSpan: 1 },
      { name: 'colorAccent', label: 'Accent (Icons/Lines)', type: 'colorPicker', gridColSpan: 1 },
      { name: 'colorText', label: 'Body Text Color', type: 'colorPicker', gridColSpan: 1 },
      {
        name: 'colorSidebarBg',
        label: 'Sidebar Background',
        type: 'colorPicker',
        gridColSpan: 1,
      },
      {
        name: 'colorModernHeaderBg',
        label: 'Modern Header Background',
        type: 'colorPicker',
        gridColSpan: 1,
      },
      {
        name: 'colorModernHeaderText',
        label: 'Modern Header Foreground',
        type: 'colorPicker',
        gridColSpan: 1,
      },
    ],
  },
  {
    name: 'page',
    label: 'Global Spacing & Page',
    type: 'object',
    gridCols: 2,
    fields: [
      {
        name: 'paperSize',
        label: 'Paper Size',
        type: 'select',
        options: [
          { label: 'A4', value: 'A4' },
          { label: 'Letter', value: 'Letter' },
        ],
        gridColSpan: 2,
      },
      {
        name: 'marginY',
        label: 'Page Margins(Top & Bottom)',
        type: 'text',
        className: 'pt-[6px] pb-[6px] lg:pt-[4.5px] lg:pb-[4.5px]',
        // options: [
        //   { label: 'Narrow', value: '0.5in' },
        //   { label: 'Standard', value: '1in' },
        //   { label: 'Relaxed', value: '2in' },
        // ],
        gridColSpan: 1,
      },
      {
        name: 'marginX',
        label: 'Page Margins(Left & Right)',
        type: 'text',
        className: 'pt-[6px] pb-[6px] lg:pt-[4.5px] lg:pb-[4.5px]',
        // options: [
        //   { label: 'Narrow', value: '0.5in' },
        //   { label: 'Standard', value: '1in' },
        //   { label: 'Relaxed', value: '2in' },
        // ],
        gridColSpan: 1,
      },
      {
        name: 'borderY',
        label: 'Page Border(Top & Bottom)',
        type: 'text',
        className: 'pt-[6px] pb-[6px] lg:pt-[4.5px] lg:pb-[4.5px]',
        gridColSpan: 1,
      },
      {
        name: 'borderX',
        label: 'Page Border(Left & Right)',
        type: 'text',
        className: 'pt-[6px] pb-[6px] lg:pt-[4.5px] lg:pb-[4.5px]',
        gridColSpan: 1,
      },
      {
        name: 'sectionGap',
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
        name: 'itemGap',
        label: 'Space Between Items',
        type: 'select',
        options: [
          { label: 'Compact', value: '4px' },
          { label: 'Normal', value: '8px' },
          { label: 'Relaxed', value: '14px' },
        ],
        gridColSpan: 1,
      },
    ],
  },
  {
    name: 'header',
    label: 'Contact & Header',
    type: 'object',
    gridCols: 2,
    fields: [
      {
        name: 'alignment',
        label: 'Header Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
        gridColSpan: 1,
      },
      { name: 'roleVisible', label: 'Show Designation/Role', type: 'checkbox', gridColSpan: 1 },
      {
        name: 'dividerLine',
        label: 'Header Divider Line',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Full Width', value: 'full' },
          { label: 'Partial', value: 'partial' },
          // { label: 'Thick Bottom', value: 'thick' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'dividerLineThickness',
        label: 'Line Thickness',
        type: 'select',
        options: [
          { label: '1px - Thin', value: '1px' },
          { label: '2px - Medium', value: '2px' },
          { label: '3px - Thick', value: '3px' },
        ],
      },
      {
        name: 'showContactLabelsOrIcons',
        label: 'Contact Labels/Icons',
        type: 'select',
        options: [
          { label: 'Show Labels', value: 'labels' },
          { label: 'Show Icons', value: 'icons' },
          { label: 'Hide', value: 'hide' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'contactLayout',
        label: 'Contact Info Layout',
        type: 'select',
        options: [
          { label: 'Single Line', value: 'inline' },
          { label: 'Multi Line', value: 'rows' },
          { label: 'Grid/Columns', value: 'grid' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'showPhoto',
        label: 'Show Photo',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'Top', value: 'top' },
          { label: 'Bottom', value: 'bottom' },
        ],
        gridColSpan: 1,
      },
    ],
  },
  {
    name: 'component',
    label: 'Component Styles',
    type: 'object',
    gridCols: 2,
    fields: [
      {
        name: 'photoShape',
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
        name: 'dividerLine',
        label: 'Section Divider Line',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Full Width', value: 'full' },
          { label: 'Partial', value: 'partial' },
          // { label: 'Thick Bottom', value: 'thick' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'dividerLineThickness',
        label: 'Line Thickness',
        type: 'select',
        options: [
          { label: '1px - Thin', value: '1px' },
          { label: '2px - Medium', value: '2px' },
          { label: '3px - Thick', value: '3px' },
        ],
      },
      {
        name: 'bulletPoints',
        label: 'Bullet Points',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Circle', value: 'circle' },
          { label: 'Square', value: 'square' },
          { label: 'Dash', value: 'dash' },
        ],
      },
    ],
  },

  {
    name: 'experience',
    label: 'Experience & Education',
    type: 'object',
    gridCols: 2,
    fields: [
      {
        name: 'positionPlacement',
        label: 'Exp: Position/Role Placement',
        type: 'select',
        options: [
          { label: 'With Company', value: 'with_company' },
          { label: 'Below Company', value: 'below_company' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'locationPlacement',
        label: 'Exp: Location Placement',
        type: 'select',
        options: [
          { label: 'With Company', value: 'with_company' },
          { label: 'Below Company', value: 'below_company' },
          { label: 'With Position/Role', value: 'with_position' },
          { label: 'Below Position/Role', value: 'below_position' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'datePlacement',
        label: 'Exp: Date Placement',
        type: 'select',
        options: [
          { label: 'Right Aligned(Company)', value: 'right_with_company' },
          { label: 'Right Aligned(Position/Role)', value: 'right_with_position' },
          { label: 'Below Position/Role', value: 'below_position' },
          { label: 'With Position/Role', value: 'with_position' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'primaryDisplay',
        label: 'Edu: Primary Display',
        type: 'select',
        options: [
          { label: 'Institution First', value: 'inst' },
          { label: 'Degree First', value: 'deg' },
        ],
        gridColSpan: 1,
      },
      { name: 'showGPA', label: 'Show GPA', type: 'checkbox', gridColSpan: 1 },
    ],
  },
  {
    name: 'skills',
    label: 'Skills & Languages',
    type: 'object',
    gridCols: 2,
    fields: [
      {
        name: 'skillsLayout',
        label: 'Skills Layout',
        type: 'select',
        options: [
          { label: 'Comma Separated', value: 'text' },
          { label: 'Bullet List', value: 'bullets' },
          { label: 'Tags/Pills', value: 'pills' },
          { label: 'Progress Bars', value: 'bars' },
          { label: 'Star Rating', value: 'stars' },
          { label: 'Grid/Columns', value: 'grid' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'skillsGroupByCategory',
        label: 'Group by Category',
        type: 'checkbox',
        gridColSpan: 1,
      },
      {
        name: 'languagesLayout',
        label: 'Languages Layout',
        type: 'select',
        options: [
          { label: 'Inline', value: 'inline' },
          { label: 'Columns', value: 'columns' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'languagesShowProficiency',
        label: 'Show Proficiency Level',
        type: 'checkbox',
        gridColSpan: 1,
      },
    ],
  },
  {
    name: 'projects',
    label: 'Projects & Publications',
    type: 'object',
    gridCols: 2,
    fields: [
      {
        name: 'toolsStyle',
        label: 'Project: Tools/Tech Style',
        type: 'select',
        options: [
          { label: 'Inline Text', value: 'inline' },
          { label: 'Small Pills', value: 'pills' },
          { label: 'Hide', value: 'hide' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'descStyle',
        label: 'Project: Description Style',
        type: 'select',
        options: [
          { label: 'Paragraph', value: 'para' },
          { label: 'Bullets', value: 'bullets' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'showProjectLink',
        label: 'Show Project Link',
        type: 'checkbox',
        gridColSpan: 1,
      },
      {
        name: 'showGithubLink',
        label: 'Show GitHub Icon(If Applicable)',
        type: 'checkbox',
        gridColSpan: 1,
      },
      {
        name: 'showDate',
        label: 'Show Date',
        type: 'checkbox',
        gridColSpan: 1,
      },
      {
        name: 'citationFormat',
        label: 'Citation Format',
        type: 'select',
        options: [
          { label: 'APA', value: 'apa' },
          { label: 'IEEE', value: 'ieee' },
          { label: 'MLA', value: 'mla' },
        ],
        gridColSpan: 1,
      },
    ],
  },
  {
    name: 'volunteering',
    label: 'Volunteering & Awards',
    type: 'object',
    gridCols: 2,
    fields: [
      {
        name: 'volLayout',
        label: 'Volunteering Layout',
        type: 'select',
        options: [
          { label: 'Role First', value: 'role' },
          { label: 'Org First', value: 'org' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'awardsDatePosition',
        label: 'Award Date Position',
        type: 'select',
        options: [
          { label: 'Right Aligned', value: 'right' },
          { label: 'Below Title', value: 'below' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'awardsHighlightTitle',
        label: 'Bold Award Titles',
        type: 'checkbox',
        gridColSpan: 1,
      },
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
    // supportsProfilePhoto: false,
    structure: 'CHRONOLOGICAL',
    // design: 'professional',
    layout: 'SINGLE_COLUMN',
  },
  typography: {
    headingFontFamily: 'Inter',
    bodyFontFamily: 'Inter',
    bodyFontSize: '10pt',
    colorPrimary: '#000000',
    colorAccent: '#0099FF',
    colorSidebarBg: '#e1e1e1',
    colorModernHeaderBg: '#999999',
    colorModernHeaderText: '#ffffff',
    colorText: '#333333',
    headingPrimarySize: '22pt',
    headingSecondarySize: '18pt',
    headingTertiarySize: '16pt',
    headingPrimaryCase: 'uppercase',
    headingSecondaryCase: 'capitalize',
    headingTertiaryCase: 'capitalize',
    lineHeight: '1.5',
    listLineHeight: '1.5',
    // headingPrimary: { size: '24px', case: 'uppercase' },
    // headingSecondary: { size: '20px', case: 'capitalize' },
    // headingTertiary: { size: '16px', case: 'none' },
    // body: { size: '12px', lineHeight: '1.5', listLineHeight: '1.5' },
  },
  // colors: { accent: '#000000' },
  page: {
    paperSize: 'A4',
    marginX: '.5in',
    marginY: '.5in',
    borderX: '0',
    borderY: '0',
    sectionGap: '12px',
    itemGap: '4px',
  },
  component: {
    // iconStyle: 'none',
    photoShape: 'circle',
    dividerLine: 'none',
    dividerLineThickness: '1px',
    // skillsStyle: 'text',
    bulletPoints: 'circle',
  },
  header: {
    alignment: 'left',
    roleVisible: true,
    dividerLine: 'full',
    dividerLineThickness: '1px',
    showContactLabelsOrIcons: 'icons',
    showPhoto: 'none',
    contactLayout: 'inline',
  },
  experience: {
    positionPlacement: 'with_company',
    locationPlacement: 'below_company',
    datePlacement: 'right_with_company',
    primaryDisplay: 'deg',
    showGPA: true,
  },
  skills: {
    // column_count: 2,
    skillsLayout: 'bullets',
    skillsGroupByCategory: true,
    languagesLayout: 'inline',
    languagesShowProficiency: true,
  },

  projects: {
    toolsStyle: 'inline',
    descStyle: 'bullets',
    showProjectLink: false,
    showGithubLink: false,
    showDate: false,
    citationFormat: 'apa',
  },
  volunteering: {
    volLayout: 'role',
    awardsDatePosition: 'right',
    awardsHighlightTitle: true,
  },
} as CreateTemplateType;

export default function CreateTemplateForm() {
  const handleSubmitCallback = (response: ActionResponse) => {
    if (response.success) {
      console.log('Template created successfully:', response);
    } else {
      console.log('Failed to create template:', response);
    }
  };
  return (
    <FormWrapper<CreateTemplateType, ActionResponse>
      fields={[]}
      schema={createTemplateSchema}
      defaultValues={initialTemplateFormValues}
      onSubmitAction={createTemplateAction}
      submitButton={
        <div className="w-1/2 px-10">
          <SubmitButton submitLabel="Create Template" className="mt-2" />
        </div>
      }
      submitCallback={handleSubmitCallback}
    >
      <div className="flex">
        <div className="w-1/2 p-4">
          {templateFormSchema.map((section) => (
            <TemplateConfigSection<CreateTemplateType>
              key={`tmpl-sec-${section.name}`}
              section={section}
            />
          ))}
        </div>
        <div className="w-1/2 p-4">
          <h2 className="mb-4 text-xl font-bold">Preview</h2>
          <div>
            <TemplatePreview />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
