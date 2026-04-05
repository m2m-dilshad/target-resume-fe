'use client';
import { createTemplateAction } from '@/actions/admin/templates.action';
import FormWrapper, { SubmitButton } from '@/components/forms/FormWrapper';
import { createTemplateSchema, CreateTemplateType } from '@/schemas/templates.schema';
import { ActionResponse } from '@/types/action.types';
import { Section } from '@/types/template.types';
import TemplateConfigSection from './TemplateConfigSection';

// Convert dot-based or underscore-based fields to nested object keys
function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown) {
  const normalizedPath = path.replace(/_/g, '.');
  const parts = normalizedPath.split('.');
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < parts.length; i += 1) {
    const key = parts[i];
    if (i === parts.length - 1) {
      current[key] = value;
      return;
    }

    const next = current[key];
    if (typeof next !== 'object' || next === null) {
      current[key] = {};
    }

    current = current[key] as Record<string, unknown>;
  }
}

function buildDefaultValuesFromSchema(sections: Section[]) {
  const defaultValues: Record<string, unknown> = {};

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      const defaultValue = field.type === 'checkbox' ? false : '';
      setNestedValue(defaultValues, field.name, defaultValue);
    });
  });

  return defaultValues;
}

export const templateFormSchema: Section[] = [
  {
    name: 'template',
    label: 'Template Information',
    gridCols: 2,
    type: 'object',
    fields: [
      {
        name: 'name',
        label: 'Template Name',
        type: 'text',
        themeSize: 'xs',
        gridColSpan: 1,
      },
      {
        name: 'slug',
        label: 'Template ID / Slug',
        type: 'text',
        themeSize: 'xs',
        gridColSpan: 1,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        themeSize: 'xs',
        gridColSpan: 2,
      },
      { name: 'ats', label: 'ATS Friendly', type: 'checkbox', gridColSpan: 1 },
      //   { name: 'preview', label: 'Upload preview image', type: 'file' },
      { name: 'isActive', label: 'Active Template', type: 'checkbox', gridColSpan: 1 },
      {
        name: 'supportsProfilePhoto',
        label: 'Supports profile photo',
        type: 'checkbox',
        gridColSpan: 1,
      },
      {
        name: 'structure',
        label: 'Structure Type',
        type: 'select',
        options: [
          { label: 'Chronological', value: 'CHRONOLOGICAL' },
          { label: 'Functional', value: 'FUNCTIONAL' },
          { label: 'Combination', value: 'COMBINATION' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'design',
        label: 'Design Style',
        type: 'select',
        options: [
          { label: 'Modern', value: 'modern' },
          { label: 'Professional', value: 'professional' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Creative', value: 'creative' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'layout',
        label: 'Layout Type',
        type: 'select',
        options: [
          { label: 'Single Column', value: 'single' },
          { label: 'Two Column Left Sidebar', value: 'leftSidebar' },
          { label: 'Two Column Right Sidebar', value: 'rightSidebar' },
          {
            label: 'Mixed (Intro Full Width + Left Sidebar)',
            value: 'mixedLeft',
          },
          {
            label: 'Mixed (Intro Full Width + Right Sidebar)',
            value: 'mixedRight',
          },
        ],
        gridColSpan: 1,
      },
    ],
  },

  {
    name: 'typography',
    label: 'Typography Settings',
    type: 'object',
    fields: [
      {
        name: 'headingFont',
        label: 'Heading Font',
        type: 'select',
        options: [
          { label: 'Inter', value: 'Inter' },
          { label: 'Roboto', value: 'Roboto' },
          { label: 'Poppins', value: 'Poppins' },
          { label: 'Lato', value: 'Lato' },
          { label: 'Montserrat', value: 'Montserrat' },
        ],
      },
      {
        name: 'bodyFont',
        label: 'Body Font',
        type: 'select',
        options: [
          { label: 'Inter', value: 'Inter' },
          { label: 'Roboto', value: 'Roboto' },
          { label: 'Poppins', value: 'Poppins' },
          { label: 'Lato', value: 'Lato' },
          { label: 'Montserrat', value: 'Montserrat' },
        ],
      },
      {
        name: 'headingPrimary.size',
        label: 'Primary Heading Size',
        type: 'select',
        options: [
          { label: 'H1 - 32px', value: 'h1' },
          { label: 'H2 - 24px', value: 'h2' },
          { label: 'H3 - 20px', value: 'h3' },
          { label: 'H4 - 16px', value: 'h4' },
          { label: 'H5 - 14px', value: 'h5' },
          { label: 'H6 - 12px', value: 'h6' },
        ],
      },

      {
        name: 'headingPrimary.case',
        label: 'Primary Heading Case',
        type: 'select',
        options: [
          { label: 'Uppercase', value: 'uppercase' },
          { label: 'Capitalize', value: 'capitalize' },
          { label: 'Normal', value: 'normal' },
        ],
      },
      {
        name: 'headingSecondary.size',
        label: 'Secondary Heading Size',
        type: 'select',
        options: [
          { label: 'H1 - 32px', value: 'h1' },
          { label: 'H2 - 24px', value: 'h2' },
          { label: 'H3 - 20px', value: 'h3' },
          { label: 'H4 - 16px', value: 'h4' },
          { label: 'H5 - 14px', value: 'h5' },
          { label: 'H6 - 12px', value: 'h6' },
        ],
      },
      {
        name: 'headingSecondary.case',
        label: 'Secondary Heading Case',
        type: 'select',
        options: [
          { label: 'Uppercase', value: 'uppercase' },
          { label: 'Capitalize', value: 'capitalize' },
          { label: 'Normal', value: 'normal' },
        ],
      },
      {
        name: 'body.size',
        label: 'Body Text Size',
        type: 'select',
        options: [
          { label: 'Small-10px', value: '10px' },
          { label: 'Normal-12px', value: '12px' },
          { label: 'Medium-14px', value: '14px' },
          { label: 'Large-16px', value: '16px' },
        ],
      },

      {
        name: 'body.lineHeight',
        label: 'Body Line Height',
        type: 'select',
        options: [
          { label: 'Compact — 1.35', value: '1.35' },
          { label: 'Normal — 1.5', value: '1.5' },
          { label: 'Relaxed — 1.7', value: '1.7' },
        ],
      },

      {
        name: 'body.listLineHeight',
        label: 'List Line Height',
        type: 'select',
        options: [
          { label: 'Compact — 1.35', value: '1.35' },
          { label: 'Normal — 1.5', value: '1.5' },
          { label: 'Relaxed — 1.7', value: '1.7' },
        ],
      },
    ],
  },

  {
    name: 'colors',
    label: 'Color System',
    type: 'object',
    fields: [{ name: 'accent', label: 'Accent Color', type: 'color' }],
  },

  {
    name: 'page',
    label: 'Page Setup',
    type: 'object',
    fields: [
      {
        name: 'paperSize',
        label: 'Paper Size',
        type: 'select',
        options: [
          { label: 'A4', value: 'A4' },
          { label: 'Letter', value: 'Letter' },
        ],
      },
      {
        name: 'margins.topBottom',
        label: 'Margin Top & Bottom',
        type: 'select',
        options: [
          { label: '0.5 in (12.7 mm)', value: '0.5' },
          { label: '0.75 in (19 mm)', value: '0.75' },
          { label: '1 in (25.4 mm) - Standard', value: '1' },
          { label: '1.25 in (31.75 mm)', value: '1.25' },
          { label: '1.5 in (38.1 mm)', value: '1.5' },
        ],
      },

      {
        name: 'margins.leftRight',
        label: 'Margin Left & Right',
        type: 'select',
        options: [
          { label: '0.5 in (12.7 mm)', value: '0.5' },
          { label: '0.75 in (19 mm)', value: '0.75' },
          { label: '1 in (25.4 mm) - Standard', value: '1' },
          { label: '1.25 in (31.75 mm)', value: '1.25' },
          { label: '1.5 in (38.1 mm)', value: '1.5' },
        ],
      },
      {
        name: 'borders.topBottom',
        label: 'Border Top & Bottom',
        type: 'select',
        options: [
          { label: 'None', value: '' },
          { label: 'Thin - 1px solid', value: '1px solid' },
          { label: 'Medium - 2px solid', value: '2px solid' },
          { label: 'Thick - 3px solid', value: '3px solid' },
          { label: 'Dashed - 1px dashed', value: '1px dashed' },
        ],
      },
      {
        name: 'borders.allSides',
        label: 'Border',
        type: 'select',
        options: [
          { label: 'None', value: '' },
          { label: 'Thin - 1px solid', value: '1px solid' },
          { label: 'Medium - 2px solid', value: '2px solid' },
          { label: 'Thick - 3px solid', value: '3px solid' },
          { label: 'Dashed - 1px dashed', value: '1px dashed' },
        ],
      },
    ],
  },
  {
    name: 'design',
    label: 'Design Elements',
    type: 'object',
    fields: [
      {
        name: 'lines.enabled',
        label: 'Enable Lines',
        type: 'select',
        options: [
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ],
      },
      {
        name: 'lines.thickness',
        label: 'Line Thickness',
        type: 'select',
        options: [
          { label: '1px - Thin (Standard)', value: '1px' },
          { label: '2px - Medium', value: '2px' },
          { label: '3px - Thick', value: '3px' },
        ],
      },
      {
        name: 'lines.style',
        label: 'Line Style',
        type: 'select',
        options: [
          { label: 'Solid', value: 'solid' },
          { label: 'Dashed', value: 'dashed' },
          { label: 'Dotted', value: 'dotted' },
        ],
      },
      {
        name: 'bullets.type',
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
        name: 'bullets.size',
        label: 'Bullet Size',
        type: 'select',
        options: [
          { label: '6px - Small (for body text 10px)', value: '6px' },
          {
            label: '8px - Medium (for body text 12px - Standard)',
            value: '8px',
          },
          { label: '10px - Large (for body text 14px)', value: '10px' },
          { label: '12px - Extra Large (for body text 16px)', value: '12px' },
        ],
      },
      // {
      //   name: 'separator',
      //   label: 'Section Separator',
      //   type: 'select',
      //   options: [
      //     { label: 'None', value: 'none' },
      //     { label: 'Line', value: 'line' },
      //     { label: 'Divider Icon', value: 'divider-icon' },
      //     { label: 'Extra Spacing', value: 'spacing' },
      //   ],
      // },
    ],
  },
  {
    name: 'date',
    label: 'Date Format',
    type: 'object',
    fields: [
      {
        name: 'format',
        label: 'Date Format',
        type: 'select',
        options: [
          { label: 'yyyy', value: 'yyyy' },
          { label: 'yyyy-yyyy', value: 'yyyy-yyyy' },
          { label: 'Jan yyyy', value: 'Jan yyyy' },
          { label: 'January yyyy', value: 'January yyyy' },
          { label: 'dd-mm-yyyy', value: 'dd-mm-yyyy' },
          { label: 'mm-yyyy', value: 'mm-yyyy' },
        ],
      },
    ],
  },
  {
    name: 'header',
    label: 'Header Configuration',
    type: 'object',
    fields: [
      {
        name: 'name.alignment',
        label: 'Name Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },

      {
        name: 'role.visible', // changed from targetTitle to role
        label: 'Show Role / Designation',
        type: 'select',
        options: [
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ],
      },

      {
        name: 'role.alignment',
        label: 'Role / Designation Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },

      {
        name: 'contact.alignment',
        label: 'Contact Info Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
    ],
  },
  {
    name: 'skills',
    label: 'Skills',
    type: 'object',
    fields: [
      {
        name: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Comma Inline', value: 'comma_inline' },
          { label: 'Comma List', value: 'comma_list' },
          { label: 'Bullet List', value: 'bullet_list' },
          { label: 'Columns', value: 'columns' },
        ],
      },
      { name: 'show_proficiency', label: 'Show Proficiency', type: 'checkbox' },
      {
        name: 'group_by_category',
        label: 'Group By Category',
        type: 'checkbox',
      },
      {
        name: 'column_count',
        label: 'Columns Count',
        type: 'number',
      },
    ],
  },
  {
    name: 'certifications',
    label: 'Certifications',
    type: 'object',
    fields: [
      {
        name: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Simple List', value: 'simple_list' },
          { label: 'Two Column', value: 'two_column' },
        ],
      },
      {
        name: 'date_option',
        label: 'Date Position',
        type: 'select',
        options: [
          { label: 'Right Aligned', value: 'right_aligned' },
          { label: 'Below Title', value: 'below_title' },
        ],
      },
      {
        name: 'show_issuer',
        label: 'Show Issuer',
        type: 'checkbox',
      },
      {
        name: 'show_credential_id',
        label: 'Show Credential ID',
        type: 'checkbox',
      },
      {
        name: 'show_verification_link',
        label: 'Show Verification Link',
        type: 'checkbox',
      },
    ],
  },
  {
    name: 'education',
    label: 'Education',
    type: 'object',
    fields: [
      {
        name: 'primary_display',
        label: 'Primary Display',
        type: 'select',
        options: [
          { label: 'Institution First', value: 'institution_first' },
          { label: 'Degree First', value: 'degree_first' },
        ],
      },
      {
        name: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Stacked', value: 'stacked' },
          { label: 'Inline', value: 'inline' },
        ],
      },
      {
        name: 'show_gpa',
        label: 'Show GPA',
        type: 'checkbox',
      },
      {
        name: 'show_coursework',
        label: 'Show Coursework',
        type: 'checkbox',
      },
      {
        name: 'show_location',
        label: 'Show Location',
        type: 'checkbox',
      },
      {
        name: 'date_position',
        label: 'Date Position',
        type: 'select',
        options: [
          { label: 'Right Aligned', value: 'right' },
          { label: 'Below Title', value: 'below' },
        ],
      },
    ],
  },
  {
    name: 'experience',
    label: 'Experience',
    type: 'object',
    fields: [
      {
        name: 'location_placement',
        label: 'Location Placement',
        type: 'select',
        options: [
          { label: 'With Company', value: 'with_company' },
          { label: 'Right Aligned', value: 'right_aligned' },
          { label: 'Below Company', value: 'below_company' },
        ],
      },
      {
        name: 'date_placement',
        label: 'Date Placement',
        type: 'select',
        options: [
          { label: 'Right Aligned', value: 'right_aligned' },
          { label: 'Below Role', value: 'below_role' },
          { label: 'Inline with Company', value: 'inline_with_company' },
        ],
      },
      {
        name: 'description_style',
        label: 'Description Style',
        type: 'select',
        options: [
          { label: 'Bullet Points', value: 'bullet_points' },
          { label: 'Plain Text', value: 'plain_text' },
        ],
      },
    ],
  },
  {
    name: 'languages',
    label: 'Languages',
    type: 'object',
    fields: [
      {
        name: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { label: 'Inline', value: 'inline' },
          { label: 'Columns', value: 'columns' },
          { label: 'Bullet List', value: 'bullet_list' },
        ],
      },
      {
        name: 'column_count',
        label: 'Number of Columns',
        type: 'number',
      },
      {
        name: 'show_proficiency',
        label: 'Show Proficiency',
        type: 'checkbox',
      },
      {
        name: 'proficiency_style',
        label: 'Proficiency Style',
        type: 'select',
        options: [
          { label: 'Text', value: 'text' },
          // You can extend to icons or bars later
        ],
      },
    ],
  },
  {
    name: 'projects',
    label: 'Projects',
    type: 'object',
    fields: [
      {
        name: 'tech_stack',
        label: 'Tech Stack Display',
        type: 'select',
        options: [
          { label: 'Show as Bullet List', value: 'show' },
          { label: 'Show Inline Text', value: 'inline_text' },
          { label: 'Hide', value: 'hide' },
        ],
      },
      {
        name: 'description',
        label: 'Description Style',
        type: 'select',
        options: [
          { label: 'Paragraph', value: 'paragraph' },
          { label: 'Bullet Points', value: 'bullet_points' },
        ],
      },
      {
        name: 'show_project_link',
        label: 'Show Project Link',
        type: 'checkbox',
      },
      {
        name: 'show_github_link',
        label: 'Show GitHub Link',
        type: 'checkbox',
      },
      {
        name: 'show_learning',
        label: 'Show Learning / Outcome',
        type: 'checkbox',
      },
      {
        name: 'show_date',
        label: 'Show Project Dates',
        type: 'checkbox',
      },
    ],
  },
  {
    name: 'publications',
    label: 'Publications',
    type: 'object',
    fields: [
      {
        name: 'layout',
        label: 'Layout Style',
        type: 'select',
        options: [
          { label: 'Paragraph', value: 'paragraph' },
          { label: 'Bullet List', value: 'bullet_list' },
        ],
      },
      {
        name: 'citation_format',
        label: 'Citation Format',
        type: 'select',
        options: [
          { label: 'Simple', value: 'simple' },
          { label: 'APA', value: 'APA' },
          { label: 'MLA', value: 'MLA' },
          { label: 'IEEE', value: 'IEEE' },
        ],
      },
      {
        name: 'show_link',
        label: 'Show Publication Link',
        type: 'checkbox',
      },
    ],
  },
  {
    name: 'volunteer',
    label: 'Volunteering & Leadership',
    type: 'object',
    fields: [
      {
        name: 'layout',
        label: 'Layout Style',
        type: 'select',
        options: [
          { label: 'Role First', value: 'role_first' },
          { label: 'Name First', value: 'name' },
        ],
      },
      {
        name: 'Description',
        label: 'Show description as',
        type: 'select',
        options: [
          { label: 'bullet_points', value: 'bullet_points' },
          { label: 'paragraph', value: 'paragraph' },
        ],
      },
      {
        name: 'show_organization',
        label: 'Show Organization',
        type: 'checkbox',
      },
      {
        name: 'show_duration',
        label: 'Show Duration',
        type: 'checkbox',
      },
      {
        name: 'show_location',
        label: 'Show Location',
        type: 'checkbox',
      },
    ],
  },
  {
    name: 'awards',
    label: 'Awards & Scholarships',
    type: 'object',
    fields: [
      {
        name: 'layout',
        label: 'Layout Style',
        type: 'select',
        options: [
          { label: 'List', value: 'list' },
          { label: 'Inline', value: 'inline' },
        ],
      },
      {
        name: 'date_position',
        label: 'Date Position',
        type: 'select',
        options: [
          { label: 'Right Aligned', value: 'right_aligned' },
          { label: 'Below Title', value: 'below_title' },
        ],
      },
      {
        name: 'show_awarding_body',
        label: 'Show Awarding Body',
        type: 'checkbox',
      },
      {
        name: 'highlight_title',
        label: 'Highlight Title',
        type: 'checkbox',
      },
    ],
  },
  {
    name: 'interests',
    label: 'Interests / Hobbies',
    type: 'object',
    fields: [
      {
        name: 'layout',
        label: 'Layout Style',
        type: 'select',
        options: [
          { label: 'Comma Inline', value: 'comma_inline' },
          { label: 'Bullet List', value: 'bullet_list' },
          { label: 'Columns', value: 'columns' },
        ],
      },
      {
        name: 'column_count',
        label: 'Number of Columns',
        type: 'number',
      },
    ],
  },
];

const initialTemplateFormValues = buildDefaultValuesFromSchema(
  templateFormSchema
) as Partial<CreateTemplateType>;

export default function CreateTemplateForm() {
  const handleSubmitCallback = (response: ActionResponse) => {
    if (response.success) {
      console.log('Template created successfully:', response);
    } else {
      console.error('Failed to create template:', response);
    }
  };
  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <FormWrapper<CreateTemplateType, ActionResponse>
          fields={[]}
          schema={createTemplateSchema}
          defaultValues={initialTemplateFormValues}
          onSubmitAction={createTemplateAction}
          submitButton={<SubmitButton submitLabel="Create Template" className="mt-2" />}
          submitCallback={handleSubmitCallback}
        >
          {templateFormSchema.map((section) => (
            <TemplateConfigSection<CreateTemplateType> key={section.name} section={section} />
          ))}
        </FormWrapper>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="mb-4 text-xl font-bold">Preview</h2>
        <div className="rounded-md border border-gray-300 p-4">
          <p className="text-gray-500">Template preview will be shown here.</p>
        </div>
      </div>
    </div>
  );
}
