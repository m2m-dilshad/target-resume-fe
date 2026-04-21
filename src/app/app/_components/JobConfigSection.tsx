'use client';

import { Field } from '@/types/form.types';
import { FieldValues } from 'react-hook-form';
import FormField from '@/components/forms/FormField';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

export default function JobConfigSection<T extends FieldValues>({ field }: { field?: Field }) {
  if (!field) return null;

  return (
    <div
      className="grid gap-x-4 gap-y-5"
      style={{
        gridTemplateColumns: `repeat(${field.gridCols || 1}, minmax(0,1fr))`,
      }}
    >
      {field.fields?.map((child) => {
        if (!child) return null;

        return (
          <div
            key={child.name}
            className={cn('flex flex-col gap-1')}
            style={{
              gridColumn: child.gridColSpan
                ? `span ${child.gridColSpan} / span ${child.gridColSpan}`
                : 'auto',
            }}
          >
            {child.label && (
              <Typography
                variant="label"
                size="sm"
                className="flex items-center gap-1 text-gray-700"
              >
                {child.label}
                {child.required && <span className="text-red-500">*</span>}
              </Typography>
            )}
            <FormField<T> field={{ ...child, label: undefined }} />
          </div>
        );
      })}
    </div>
  );
}
