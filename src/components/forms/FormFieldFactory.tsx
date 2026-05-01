/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Controller, FieldValues, useFieldArray, useFormContext } from 'react-hook-form';
import TextInput, { TextInputSize } from '../ui/TextInput';
import { cn } from '@/lib/utils';
import { Field } from '@/types/form.types';
import Button from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import FormField from './FormField';
import Select from 'react-select';
import NativeColorPicker from '../ui/NativeColorPicker';

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
  const themeSize = field.themeSize || 'base';
  return (
    <TextInput
      {...register(fieldName)}
      id={field.id || undefined}
      type={field.type || 'text'}
      size={themeSize as TextInputSize}
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
  const { control } = useFormContext();

  // const colourStyles: StylesConfig<{ label: string; value: string }> = {
  //   // control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  //   option: (styles, { data }) => {
  //     return {
  //       ...styles,
  //       fontFamily: data.value,
  //     };
  //   },
  //   singleValue: (styles, { data }) => ({ ...styles, fontFamily: data.value }),
  // };

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: iField }) => (
        <div className={cn(field.className || '', hasError ? 'border-red-500' : '')}>
          <Select
            isMulti={false}
            value={field.options?.find((opt) => opt.value === iField.value) || null}
            onChange={(selectedOption) => iField.onChange(selectedOption?.value)}
            id={field.id || undefined}
            options={field.options || []}
            // styles={colourStyles}
          />
        </div>
      )}
    />
    // <select
    //   {...register(fieldName)}
    //   id={field.id || undefined}
    //   className={cn(field.className || '', hasError ? 'border-red-500' : '')}
    // >
    //   {field.options?.map((option: { label: string; value: string }) => (
    //     <option key={option.value} value={option.value}>
    //       {option.label}
    //     </option>
    //   ))}
    // </select>
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

export function SelectWithIcons({
  fieldName,
  field,
  hasError,
}: {
  fieldName: string;
  field: Field;
  hasError?: boolean;
}) {
  const { control } = useFormContext();
  // const gridCols =
  //   field.options && field.options.length > 0 ? Math.min(field.options.length, 4) : 1;
  const options = field.options || [];
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: iField }) => (
        <div
          className={cn(
            `flex flex-row flex-wrap items-center justify-start gap-3`,
            hasError ? 'border-red-500' : ''
          )}
        >
          {options.map((option) => {
            // Dynamically get the Icon component from Lucide
            const IconComponent = option.icon; // Assuming option.icon is the name of the icon component from Lucide
            const isActive = iField.value === option.value;
            return (
              <Button
                type="button"
                variant="button"
                theme="ghost"
                key={option.value}
                onClick={() => iField.onChange(option.value)}
                className={cn(
                  'group flex w-auto flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all duration-200',
                  isActive
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                )}
              >
                {IconComponent && (
                  <IconComponent
                    size={24}
                    className={cn(
                      'transition-transform group-active:scale-90',
                      isActive ? 'text-blue-600' : 'text-gray-400'
                    )}
                  />
                )}
                <span className="text-center text-xs leading-tight font-semibold">
                  {option.label}
                </span>
              </Button>
            );
          })}
        </div>
      )}
    />
  );
}

export function ArrayInputField<T extends FieldValues>({
  // fieldName,
  field,
  // hasError,
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
      ?.map((uiField: any) => {
        return { [uiField.name]: '' };
      })
      .reduce((prev, curr) => {
        prev = { ...prev, ...curr };
        return prev;
      }, {});
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
            {field.fields?.map((uiField: any) => {
              return (
                <div
                  key={item.id + uiField.name}
                  style={
                    {
                      gridColumn: uiField.gridColSpan
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

      <Button
        type="button"
        onClick={handleAddNew}
        theme="secondary"
        size="sm"
        className="flex w-fit items-center gap-2 border-2 border-dashed hover:border-transparent"
      >
        <Plus size={18} />
        {field.label || 'Item'}
      </Button>
    </div>
  );
}

export function ColorPickerField({
  fieldName,
  // field,
  hasError,
}: {
  fieldName: string;
  field: Field;
  hasError?: boolean;
}) {
  const { control } = useFormContext();
  // const gridCols =
  //   field.options && field.options.length > 0 ? Math.min(field.options.length, 4) : 1;
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: iField }) => (
        <div
          className={cn(
            `flex flex-row flex-wrap items-center justify-start gap-3`,
            hasError ? 'border-red-500' : ''
          )}
        >
          <NativeColorPicker defaultColor={iField.value} onChange={iField.onChange} />
        </div>
      )}
    />
  );
}

export const FieldRegistry = {
  textarea: TextAreaField,
  text: TextInputField,
  checkbox: CheckboxField,
  select: SelectField,
  radio: RadioField,
  selectWithIcons: SelectWithIcons, // For now, we can use the same component for select with icons, but this can be extended in the future
  arrayInput: ArrayInputField,
  colorPicker: ColorPickerField,
} as const;
