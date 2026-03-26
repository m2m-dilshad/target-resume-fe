import { FieldValues, Path, useFormState } from 'react-hook-form';
import { Field } from '@/types/form.types';
import Typography from '../ui/Typography';
import { FieldRegistry } from './FormFieldFactory';

interface FormFieldProps {
  field: Field;
  wrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
}

const DefaultWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2">{children}</div>
);

export default function FormField<T extends FieldValues>({
  field,
  wrapperComponent,
}: FormFieldProps) {
  const fieldName = field.name as Path<T>;
  const { errors } = useFormState({ name: fieldName });

  const fieldRegistryName = field.type || 'text';
  const FieldComponent =
    FieldRegistry[fieldRegistryName as keyof typeof FieldRegistry] || FieldRegistry.text;

  const Wrapper = wrapperComponent || DefaultWrapper;
  return (
    <Wrapper>
      {field.label && (
        <Typography variant="label" className="mb-1 block" htmlFor={field.id || field.name}>
          {field.label}
        </Typography>
      )}
      <FieldComponent fieldName={fieldName} field={field} hasError={!!errors?.[fieldName]} />
      {errors?.[fieldName] && (
        <p className="mt-1 text-xs text-red-500">{errors?.[fieldName].message?.toString()}</p>
      )}
    </Wrapper>
  );
}
