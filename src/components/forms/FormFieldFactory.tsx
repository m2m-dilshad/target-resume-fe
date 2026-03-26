'use client';
import { useFormContext } from 'react-hook-form';
import TextInput, { TextInputSize } from '../ui/TextInput';
import { cn } from '@/lib/utils';
import { Field } from '@/types/form.types';

export function TextInputField({
  fieldName,
  field,
  hasError,
}: {
  fieldName: string;
  field: Field;
  hasError?: boolean;
}) {
  const { register } = useFormContext();
  return (
    <TextInput
      {...register(fieldName)}
      id={field.id || undefined}
      type={field.type || 'text'}
      size={field.themeSize as TextInputSize}
      icon={field.icon}
      placeholder={field.placeholder}
      className={cn(field.className || '', hasError ? 'border-red-500' : '')}
    />
  );
}

export function TextAreaField({
  fieldName,
  field,
  hasError,
}: {
  fieldName: string;
  field: Field;
  hasError?: boolean;
}) {
  const { register } = useFormContext();
  return (
    <TextInput
      {...register(fieldName)}
      id={field.id || undefined}
      variant="textarea"
      size={field.themeSize as TextInputSize}
      icon={field.icon}
      placeholder={field.placeholder}
      className={cn(field.className || '', hasError ? 'border-red-500' : '')}
    />
  );
}
export function CheckboxField({
  fieldName,
  field,
  hasError,
}: {
  fieldName: string;
  field: Field;
  hasError?: boolean;
}) {
  const { register } = useFormContext();
  return (
    <input
      type="checkbox"
      {...register(fieldName)}
      className={cn(field.className || '', hasError ? 'border-red-500' : '')}
      id={field.id || undefined}
    />
  );
}

export function SelectField({
  fieldName,
  field,
  hasError,
}: {
  fieldName: string;
  field: Field;
  hasError?: boolean;
}) {
  const { register } = useFormContext();
  return (
    <select
      {...register(fieldName)}
      className={cn(field.className || '', hasError ? 'border-red-500' : '')}
      id={field.id || undefined}
    >
      {field.options?.map((option: { label: string; value: string }) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function RadioField({
  fieldName,
  field,
  hasError,
}: {
  fieldName: string;
  field: Field;
  hasError?: boolean;
}) {
  const { register } = useFormContext();
  return (
    <div className={cn(field.className || '', hasError ? 'border-red-500' : '')}>
      {field.options?.map((opt: { label: string; value: string }) => (
        <label key={opt.value} htmlFor={field.id || undefined}>
          <input
            type="radio"
            value={opt.value}
            {...register(fieldName)}
            id={field.id || undefined}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

export const FieldRegistry = {
  textarea: TextAreaField,
  text: TextInputField,
  checkbox: CheckboxField,
  select: SelectField,
  radio: RadioField,
} as const;
