'use client';
import FormWrapper, { SubmitButton } from '@/components/forms/FormWrapper';
import { ActionResponse } from '@/types/action.types';
import { Section } from '@/types/template.types';
import TemplateConfigSection from './TemplateConfigSection';
import { createResumeSchema, CreateResumeType } from '@/schemas/resume.schema';
import { createResumeAction } from '@/actions/app/resumes.actions';

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
    name: 'Basic Information',
    gridCols: 2,
    fields: [
      { name: 'basics.name', label: 'Full Name', type: 'text', gridColSpan: 1 },
      { name: 'basics.label', label: 'Professional Title', type: 'text', gridColSpan: 1 },
      { name: 'basics.summary', label: 'Summary', type: 'textarea', gridColSpan: 2 },
      { name: 'basics.email', label: 'Email', type: 'email', gridColSpan: 1 },
      { name: 'basics.phone', label: 'Phone', type: 'text', gridColSpan: 1 },
      { name: 'basics.portfolio', label: 'Portfolio Website', type: 'text', gridColSpan: 1 },
      { name: 'basics.linkedin', label: 'Linkedin', type: 'text', gridColSpan: 1 },
      { name: 'basics.github', label: 'Github', type: 'text', gridColSpan: 1 },
      { name: 'basics.location', label: 'Location', type: 'text' },
    ],
  },
  {
    name: 'Education',
    gridCols: 2,
    fields: [
      { name: 'education[0].institution', label: 'Institution', type: 'text', gridColSpan: 1 },
      { name: 'education[0].degree', label: 'Degree & Major', type: 'text', gridColSpan: 1 },
      { name: 'education[0].gpa', label: 'GPA', type: 'text', gridColSpan: 1 },
      { name: 'education[0].location', label: 'Location', type: 'text', gridColSpan: 1 },
      { name: 'education[0].startDate', label: 'Start Date', type: 'date', gridColSpan: 1 },
      { name: 'education[0].endDate', label: 'End Date', type: 'date', gridColSpan: 1 },
    ],
  },
  {
    name: 'Work Experience',
    gridCols: 2,
    fields: [
      { name: 'work[0].company', label: 'Company', type: 'text', gridColSpan: 2 },
      { name: 'work[0].position', label: 'Position', type: 'text', gridColSpan: 1 },
      { name: 'work[0].location', label: 'Location', type: 'text', gridColSpan: 1 },
      { name: 'work[0].description', label: 'Summary', type: 'textarea', gridColSpan: 2 },
      { name: 'work[0].startDate', label: 'Start Date', type: 'date', gridColSpan: 1 },
      { name: 'work[0].endDate', label: 'End Date', type: 'date', gridColSpan: 1 },
    ],
  },
  {
    name: 'Skills',
    gridCols: 2,
    fields: [
      { name: 'skills[0].name', label: 'Skill Name', type: 'text', gridColSpan: 1 },
      {
        name: 'skills[0].level',
        label: 'Level',
        type: 'select',
        gridColSpan: 1,
        options: [
          { label: 'Beginner', value: 'Beginner' },
          { label: 'Intermediate', value: 'Intermediate' },
          { label: 'Advanced', value: 'Advanced' },
          { label: 'Expert', value: 'Expert' },
        ],
      },
    ],
  },
  {
    name: 'Projects',
    gridCols: 2,
    fields: [
      { name: 'projects[0].name', label: 'Project Name', type: 'text', gridColSpan: 1 },
      { name: 'projects[0].url', label: 'Project URL', type: 'text', gridColSpan: 1 },
      { name: 'projects[0].description', label: 'Description', type: 'textarea', gridColSpan: 2 },
      { name: 'projects[0].techStack', label: 'Tech Stack', type: 'textarea', gridColSpan: 2 },
      { name: 'projects[0].startDate', label: 'Start Date', type: 'date', gridColSpan: 1 },
      { name: 'projects[0].endDate', label: 'End Date', type: 'date', gridColSpan: 1 },
    ],
  },
  {
    name: 'Certifications',
    gridCols: 2,
    fields: [
      { name: 'certificates[0].name', label: 'Certificate Name', type: 'text', gridColSpan: 1 },
      { name: 'certificates[0].issuer', label: 'Issuer', type: 'text', gridColSpan: 1 },
      { name: 'certificates[0].date', label: 'Date', type: 'date', gridColSpan: 1 },
      { name: 'certificates[0].url', label: 'Credential URL', type: 'text', gridColSpan: 1 },
    ],
  },
  {
    name: 'Languages',
    gridCols: 2,
    fields: [
      { name: 'languages[0].language', label: 'Language', type: 'text', gridColSpan: 1 },
      {
        name: 'languages[0].fluency',
        label: 'Fluency',
        type: 'select',
        gridColSpan: 1,
        options: [
          { label: 'Beginner', value: 'Beginner' },
          { label: 'Intermediate', value: 'Intermediate' },
          { label: 'Professional', value: 'Professional' },
          { label: 'Fluent', value: 'Fluent' },
          { label: 'Native', value: 'Native' },
        ],
      },
    ],
  },
  {
    name: 'Extra-curricular Activities',
    fields: [
      { name: 'accomplishments[0].title', label: 'Title', type: 'text' },
      { name: 'accomplishments[0].description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    name: 'Awards & Scholarships',
    gridCols: 2,
    fields: [
      {
        name: 'awards[0].title',
        label: 'Award Title',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'awards[0].awarder',
        label: 'Awarded By',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'awards[0].date',
        label: 'Date',
        type: 'date',
        gridColSpan: 1,
      },
      {
        name: 'awards[0].summary',
        label: 'Description',
        type: 'textarea',
        gridColSpan: 2,
      },
    ],
  },
  {
    name: 'Volunteering & Leadership',
    gridCols: 2,
    fields: [
      {
        name: 'volunteer[0].organization',
        label: 'Organization',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'volunteer[0].position',
        label: 'Role',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'volunteer[0].url',
        label: 'Organization URL',
        type: 'text',
        gridColSpan: 2,
      },
      {
        name: 'volunteer[0].startDate',
        label: 'Start Date',
        type: 'date',
        gridColSpan: 1,
      },
      {
        name: 'volunteer[0].endDate',
        label: 'End Date',
        type: 'date',
        gridColSpan: 1,
      },
      {
        name: 'volunteer[0].summary',
        label: 'Summary',
        type: 'textarea',
        gridColSpan: 2,
      },
    ],
  },
  {
    name: 'Publications',
    gridCols: 2,
    fields: [
      {
        name: 'publications[0].name',
        label: 'Title',
        type: 'text',
        gridColSpan: 2,
      },
      {
        name: 'publications[0].publisher',
        label: 'Publisher',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'publications[0].releaseDate',
        label: 'Release Date',
        type: 'date',
        gridColSpan: 1,
      },
      {
        name: 'publications[0].url',
        label: 'Publication URL',
        type: 'text',
        gridColSpan: 2,
      },
      {
        name: 'publications[0].summary',
        label: 'Summary',
        type: 'textarea',
        gridColSpan: 2,
      },
    ],
  },
];

const initialTemplateFormValues = buildDefaultValuesFromSchema(
  templateFormSchema
) as Partial<CreateResumeType>;

export default function CreateResumeForm() {
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
        <FormWrapper<CreateResumeType, ActionResponse>
          fields={[]}
          schema={createResumeSchema}
          defaultValues={initialTemplateFormValues}
          onSubmitAction={createResumeAction}
          submitButton={<SubmitButton submitLabel="Create Template" className="mt-2" />}
          submitCallback={handleSubmitCallback}
        >
          {templateFormSchema.map((section) => (
            <TemplateConfigSection<CreateResumeType> key={section.name} section={section} />
          ))}
        </FormWrapper>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="mb-4 text-xl font-bold">Preview</h2>
        <div className="rounded-md border border-gray-300 p-4">
          <p className="text-gray-500">Resume preview will be shown here.</p>
        </div>
      </div>
    </div>
  );
}
