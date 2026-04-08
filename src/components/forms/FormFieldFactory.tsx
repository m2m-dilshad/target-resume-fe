'use client';
import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form';
import TextInput, { TextInputSize } from '../ui/TextInput';
import { cn } from '@/lib/utils';
import { Field } from '@/types/form.types';
import Button from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import FormField from './FormField';

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
export function ArrayInputField<T extends FieldValues>({
  field,
}: {
  fieldName: string;
  field: Field;
  hasError?: boolean;
}) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name,
  });
  function handleAddNew() {
    const newRecord = field.fields
      ?.map((uiField: Field) => {
        return { [uiField.name]: '' };
      })
      .reduce((prev, curr) => {
        prev = { ...prev, ...curr };
        return prev;
      }, {});
    console.log('new record: ', newRecord);
    append(newRecord);
  }
  return (
    <div>
      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            className="grid grid-cols-[repeat(var(--arr-input-f-cols),minmax(0,1fr))] gap-4 border-t border-gray-200 px-6 py-5"
            style={{ '--arr-input-f-cols': field.gridCols || '1' } as React.CSSProperties}
          >
            {field.fields?.map((uiField: Field) => {
              return (
                <div
                  key={item.id + uiField.name}
                  style={
                    {
                      'grid-column': uiField.gridColSpan
                        ? `span ${uiField.gridColSpan}/span ${uiField.gridColSpan}`
                        : 'auto',
                    } as React.CSSProperties
                  }
                >
                  <FormField<T>
                    field={{ ...uiField, name: `${field.name}.${index}.${uiField.name}` }}
                    wrapperComponent={({ children }) => <>{children}</>}
                  />{' '}
                </div>
              );
            })}
            <div className="flex items-center pt-7">
              <Button
                type="button"
                theme="warning"
                size="xs"
                roundSize="lg"
                className="flex h-9 w-9 shrink-0 items-center justify-center !p-0 shadow-sm"
                onClick={() => remove(index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        );
      })}
      {/* field.label is not getting the label */}
      <Button
        type="button"
        onClick={handleAddNew}
        theme="secondary"
        size="sm"
        className="flex w-fit items-center gap-2 border-2 border-dashed hover:border-transparent"
      >
        <Plus size={18} />
        {field.label || field.fields?.[0].label || 'Item'}
      </Button>
    </div>
  );
}

export const FieldRegistry = {
  textarea: TextAreaField,
  text: TextInputField,
  checkbox: CheckboxField,
  select: SelectField,
  radio: RadioField,
  arrayInput: ArrayInputField,
} as const;
