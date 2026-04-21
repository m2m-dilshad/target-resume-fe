'use client';

import { Job } from '../utils/misc.data';
import FormWrapper, { SubmitButton } from '@/components/forms/FormWrapper';
import { addJobFormSchema, CreateJobType } from '@/schemas/job.schema';
import { createJobAction } from '@/actions/app/job.actions';
import { ActionResponse } from '@/types/action.types';
import { mockJobFormData } from '../_constants/mock-data';
import JobConfigSection from '../_components/JobConfigSection';
import { Field } from '@/types/form.types';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';

interface AddJobModalProps {
  onClose: () => void;
  editJob?: Job;
  onUpdate?: (job: Job) => void;
}

export const jobSection: Field = {
  name: 'job',
  label: 'Add Job Application',
  type: 'object',
  gridCols: 2,
  fields: [
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'e.g. Stripe',
      gridColSpan: 1,
      required: true,
    },
    {
      name: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      placeholder: 'e.g. Product Designer',
      gridColSpan: 1,
      required: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Applied', value: 'applied' },
        { label: 'Interview', value: 'interview' },
        { label: 'Offer', value: 'offer' },
        { label: 'Rejected', value: 'rejected' },
      ],
      gridColSpan: 1,
    },
    { name: 'dateApplied', label: 'Date Applied', type: 'date', gridColSpan: 1 },
    {
      name: 'salaryRange',
      label: 'Salary Range',
      type: 'text',
      placeholder: 'e.g. $120–150k',
      gridColSpan: 1,
    },
    { name: 'followUpReminder', label: 'Follow-up Reminder', type: 'date', gridColSpan: 1 },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Remote / City',
      gridColSpan: 1,
    },
    {
      name: 'recruiterName',
      label: 'Recruiter Name',
      type: 'text',
      placeholder: 'e.g. Sarah ',
      gridColSpan: 1,
    },
    { name: 'jobListingUrl', label: 'Job Listing URL', type: 'text', gridColSpan: 2 },
    { name: 'notes', label: 'Notes', type: 'textarea', gridColSpan: 2 },
  ],
};

const initialTemplateFormValues = mockJobFormData as Partial<CreateJobType>;

export default function AddJobModal({ onClose, editJob, onUpdate }: AddJobModalProps) {
  const handleSubmitCallback = (response: ActionResponse) => {
    if (response.success) {
      const updatedJob = {
        ...editJob,
        ...response.data,
      };
      onUpdate?.(updatedJob as Job);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <Heading variant="h4">Add Job Application</Heading>

          <Button theme="ghost" onClick={onClose} className="w-fit">
            ✕
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <FormWrapper<CreateJobType, ActionResponse>
            fields={[]}
            schema={addJobFormSchema}
            defaultValues={initialTemplateFormValues}
            onSubmitAction={createJobAction}
            submitButton={<SubmitButton submitLabel="Add Job Application" className="mt-4" />}
            submitCallback={handleSubmitCallback}
          >
            <div className="space-y-5">
              <JobConfigSection field={jobSection} />
            </div>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
