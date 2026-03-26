/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FieldValues,
  useForm,
  DefaultValues,
  Path,
  useFormState,
  FormProvider as Provider,
} from 'react-hook-form';
import { Field } from '@/types/form.types';
import FormField from './FormField';
import Button from '../ui/Button';
import { ActionResponse } from '@/types/action.types';

interface FormWrapperProps<T extends FieldValues, TResponse = ActionResponse> {
  fields: Field[];
  schema: z.ZodType<T, any, any>;
  onSubmitAction: (data: T) => Promise<TResponse> | TResponse;
  children?: React.ReactNode;
  submitButton?: React.ReactNode; // Optional custom submit button
  submitCallback?: (response: TResponse) => void; // Optional callback for handling response
  defaultValues?: DefaultValues<T>;
}

export default function FormWrapper<T extends FieldValues, TResponse extends FieldValues>({
  fields,
  schema,
  onSubmitAction,
  children,
  submitButton,
  submitCallback,
  defaultValues,
}: FormWrapperProps<T, TResponse>) {
  const formMethods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: T) => {
    const response = await onSubmitAction(data);
    if (!response.success && response.errors) {
      // Loop through server errors and map them to RHF fields
      Object.entries(response.errors).forEach(([field, messages]) => {
        formMethods.setError(field as Path<T>, {
          type: 'server',
          message: (messages as string[])?.[0], // Get the first error message
        });
      });
    }
    if (submitCallback) {
      submitCallback(response);
    }
  };

  return (
    <Provider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        {fields.map((field: Field) => (
          <FormField<T> key={field.name} field={field} />
        ))}
        {children}
        {submitButton || <SubmitButton submitLabel="Submit" />}
      </form>
    </Provider>
  );
}

export function SubmitButton({
  submitLabel,
  className,
}: {
  submitLabel: string;
  className?: string;
}) {
  const { isSubmitting } = useFormState();
  return (
    <Button disabled={isSubmitting} type="submit" className={className || ''}>
      {submitLabel}
    </Button>
  );
}
