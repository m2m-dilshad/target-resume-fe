'use client';
import FormWrapper, { SubmitButton } from '@/components/forms/FormWrapper';
import { ActionResponse } from '@/types/action.types';
import { Section } from '@/types/template.types';
import { createResumeSchema, CreateResumeType } from '@/schemas/resume.schema';
import { createResumeAction } from '@/actions/app/resumes.actions';
import { mockResumeData } from '../_constants/mock-data';
import ResumeConfigSection from './ResumeConfigSection';

export const resumeFormSchema: Section[] = [
  {
    name: 'basics',
    label: 'Basic Information',
    type: 'object',
    gridCols: 2,
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', gridColSpan: 1 },
      { name: 'label', label: 'Current Job Title', type: 'text', gridColSpan: 1 },
      { name: 'profilePicture', label: 'Profile Photo', type: 'file', gridColSpan: 1 },
      { name: 'email', label: 'Email Address', type: 'email', gridColSpan: 1 },
      { name: 'phone.countryCode', label: 'Phone Country Code', type: 'text', gridColSpan: 1 },
      { name: 'phone.number', label: 'Phone Number', type: 'text', gridColSpan: 1 },
      { name: 'portfolio', label: 'Portfolio Link', type: 'text', gridColSpan: 1 },
      { name: 'summary', label: 'Professional Summary', type: 'textarea', gridColSpan: 2 },
      { name: 'location.address', label: 'Address', type: 'text' },
      { name: 'location.postalCode', label: 'ZIP / Postal Code', type: 'text' },
      { name: 'location.city', label: 'City', type: 'text' },
      { name: 'location.countryCode', label: 'Country', type: 'text' },
      { name: 'location.region', label: 'State / Region', type: 'text' },
      {
        name: 'profiles',
        label: 'Online Profiles',
        type: 'arrayInput',
        fields: [
          { name: 'network', label: 'Platform (LinkedIn, GitHub, etc.)', type: 'text' },
          { name: 'username', label: 'Username', type: 'text' },
          { name: 'url', label: 'Profile Link', type: 'text' },
        ],
        gridColSpan: 2,
      },
    ],
  },
  {
    label: 'Work Experience',
    name: 'works',
    type: 'list',
    gridCols: 2,
    fields: [
      { name: 'company', label: 'Company Name', type: 'text', gridColSpan: 2 },
      { name: 'position', label: 'Job Title', type: 'text', gridColSpan: 1 },
      { name: 'location', label: 'Location (City, Country)', type: 'text', gridColSpan: 1 },
      { name: 'url', label: 'Company Website', type: 'text', gridColSpan: 2 },
      { name: 'startDate', label: 'Start Date', type: 'date', gridColSpan: 1 },
      { name: 'endDate', label: 'End Date', type: 'date', gridColSpan: 1 },
      { name: 'summary', label: 'Role Overview', type: 'textarea', gridColSpan: 2 },
      {
        name: 'highlights',
        label: 'Key Achievements',
        type: 'arrayInput',
        fields: [{ name: 'highlights', label: 'Achievement', type: 'text' }],
        gridColSpan: 2,
      },
    ],
  },
  {
    name: 'educations',
    label: 'Education',
    type: 'list',
    gridCols: 2,
    fields: [
      { name: 'institution', label: 'School / University', type: 'text', gridColSpan: 1 },
      { name: 'url', label: 'Institution Website', type: 'text', gridColSpan: 1 },
      {
        name: 'degreeType',
        label: 'Degree Type',
        type: 'select',
        options: [
          { label: 'Undergraduate', value: 'Undergraduate' },
          { label: 'Bachelors', value: 'Bachelors' },
          { label: 'Masters', value: 'Masters' },
          { label: 'Diploma', value: 'Diploma' },
          { label: 'PhD', value: 'PhD' },
        ],
        gridColSpan: 1,
      },
      { name: 'degree', label: 'Degree & Major', type: 'text', gridColSpan: 1 },
      { name: 'gpa', label: 'GPA / Score', type: 'text', gridColSpan: 1 },
      { name: 'location', label: 'City / Country', type: 'text', gridColSpan: 1 },
      { name: 'startDate', label: 'Start Date', type: 'date', gridColSpan: 1 },
      { name: 'endDate', label: 'End Date', type: 'date', gridColSpan: 1 },
      {
        name: 'courses',
        label: 'Relevant Courses',
        type: 'arrayInput',
        fields: [{ name: 'course', label: 'Course Name', type: 'text' }],
        gridColSpan: 1,
      },
    ],
  },

  {
    name: 'skills',
    label: 'Skills',
    type: 'list',
    gridCols: 2,
    fields: [
      { name: 'name', label: 'Skill', type: 'text', gridColSpan: 1 },
      {
        name: 'level',
        label: 'Proficiency',
        type: 'select',
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
        ],
        gridColSpan: 1,
      },
      {
        name: 'keywords',
        label: 'Related Tools / Technologies',
        type: 'arrayInput',
        fields: [{ name: 'keywords', label: 'Keyword', type: 'text' }],
        gridColSpan: 1,
      },
    ],
  },
  {
    name: 'projects',
    label: 'Projects',
    type: 'list',
    gridCols: 2,
    fields: [
      { name: 'name', label: 'Project Name', type: 'text', gridColSpan: 1 },
      { name: 'url', label: 'Project Link', type: 'text', gridColSpan: 1 },
      { name: 'description', label: 'Project Description', type: 'textarea', gridColSpan: 2 },
      {
        name: 'highlights',
        label: 'Key Features',
        type: 'arrayInput',
        fields: [{ name: 'highlights', label: 'Feature', type: 'text' }],
        gridColSpan: 2,
      },
      {
        name: 'techStack',
        label: 'Technologies Used',
        type: 'arrayInput',
        fields: [{ name: 'techStack', label: 'Technology', type: 'text' }],
        gridColSpan: 1,
      },
      { name: 'startDate', label: 'Start Date', type: 'date', gridColSpan: 1 },
      { name: 'endDate', label: 'End Date', type: 'date', gridColSpan: 1 },
      { name: 'roles', label: 'Your Role', type: 'text', gridColSpan: 1 },
    ],
  },
  {
    name: 'certifications',
    label: 'Certifications',
    type: 'list',
    gridCols: 2,
    fields: [
      { name: 'name', label: 'Certificate Name', type: 'text', gridColSpan: 1 },
      { name: 'issuer', label: 'Issued By', type: 'text', gridColSpan: 1 },
      { name: 'date', label: 'Issue Date', type: 'date', gridColSpan: 1 },
      { name: 'url', label: 'Certificate Link', type: 'text', gridColSpan: 1 },
    ],
  },
  {
    name: 'languages',
    label: 'Languages',
    type: 'list',
    gridCols: 2,
    fields: [
      { name: 'language', label: 'Language', type: 'text', gridColSpan: 1 },
      {
        name: 'fluency',
        label: 'Proficiency Level',
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
    name: 'activities',
    label: 'Extra-curricular Activities',
    type: 'list',
    fields: [
      { name: 'title', label: 'Activity Title', type: 'text' },
      { name: 'description', label: 'Activity Description', type: 'textarea' },
    ],
  },
  {
    name: 'awards',
    label: 'Awards & Scholarships',
    type: 'list',
    gridCols: 2,
    fields: [
      {
        name: 'title',
        label: 'Award Title',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'awarder',
        label: 'Awarded By',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'date',
        label: 'Award Date',
        type: 'date',
        gridColSpan: 1,
      },
      {
        name: 'summary',
        label: 'Award Description',
        type: 'textarea',
        gridColSpan: 2,
      },
    ],
  },
  {
    name: 'volunteers',
    label: 'Volunteering & Leadership',
    type: 'list',
    gridCols: 2,
    fields: [
      {
        name: 'organization',
        label: 'Organization Name',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'position',
        label: 'Role / Title',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'url',
        label: 'Organization Website',
        type: 'text',
        gridColSpan: 2,
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
        gridColSpan: 1,
      },
      {
        name: 'endDate',
        label: 'End Date',
        type: 'date',
        gridColSpan: 1,
      },
      {
        name: 'summary',
        label: 'Role Description',
        type: 'textarea',
        gridColSpan: 2,
      },
      {
        name: 'highlights',
        label: 'Key Contributions',
        type: 'arrayInput',
        fields: [
          {
            name: 'highlights',
            label: 'Contribution',
            type: 'text',
          },
        ],
        gridColSpan: 2,
      },
    ],
  },
  {
    name: 'publications',
    label: 'Publication',
    type: 'list',
    gridCols: 2,
    fields: [
      {
        name: 'name',
        label: 'Publication Title',
        type: 'text',
        gridColSpan: 2,
      },
      {
        name: 'publisher',
        label: 'Publisher',
        type: 'text',
        gridColSpan: 1,
      },
      {
        name: 'releaseDate',
        label: 'Publication Date',
        type: 'date',
        gridColSpan: 1,
      },
      {
        name: 'url',
        label: 'Publication Link',
        type: 'text',
        gridColSpan: 2,
      },
      {
        name: 'summary',
        label: 'Summary',
        type: 'textarea',
        gridColSpan: 2,
      },
    ],
  },
];

const initialTemplateFormValues = mockResumeData as Partial<CreateResumeType>;

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
          submitButton={<SubmitButton submitLabel="Create Resume" className="mt-2" />}
          submitCallback={handleSubmitCallback}
        >
          {resumeFormSchema.map((section) => (
            <ResumeConfigSection<CreateResumeType> key={section.name} section={section} />
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
