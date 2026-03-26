'use client';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Section } from '@/types/template.types';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { Field } from '@/types/form.types';
import FormField from '@/components/forms/FormField';
import { FieldValues } from 'react-hook-form';

export default function TemplateConfigSection<T extends FieldValues>({
  section,
}: {
  section: Section;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      key={`template-wrapper-section-${section.name}`}
      className="border-border bg-surface mb-2 rounded-xl border shadow-sm"
    >
      {/* Section Header */}

      <Button
        theme="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="text-typography-muted flex items-center justify-between px-6 py-4 text-left"
      >
        <span>{section.name}</span>
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Section Body */}
      <div
        className={cn(
          'border-border grid gap-4 border-t px-6 py-5',
          { hidden: !isOpen },
          section.gridCols ? `grid-cols-${section.gridCols}` : ''
        )}
      >
        {section.fields.map((field: Field) => {
          return (
            <div
              key={`template-wrapper-field-${field.name}`}
              className={cn('space-y-1', field.gridColSpan ? `col-span-${field.gridColSpan}` : '')}
            >
              <FormField<T> key={field.name} field={field} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
