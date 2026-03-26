import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFieldError(
  errors: Record<string, unknown> | undefined,
  fieldName: string
): string | undefined {
  if (!errors) return undefined;

  const parts = fieldName.split('.');
  let nestedError: unknown = errors;

  for (const part of parts) {
    if (typeof nestedError !== 'object' || nestedError === null) {
      nestedError = undefined;
      break;
    }

    nestedError = (nestedError as Record<string, unknown>)[part];
    if (!nestedError) break;
  }

  if (nestedError && typeof nestedError === 'object' && 'message' in nestedError) {
    const messageValue = (nestedError as Record<string, unknown>)['message'];
    return typeof messageValue === 'string' ? messageValue : String(messageValue);
  }

  const underscoreFieldName = fieldName.replace(/\./g, '_');
  const underscoreError = (errors as Record<string, unknown>)[underscoreFieldName];

  if (underscoreError && typeof underscoreError === 'object' && 'message' in underscoreError) {
    const messageValue = (underscoreError as Record<string, unknown>)['message'];
    return typeof messageValue === 'string' ? messageValue : String(messageValue);
  }

  return undefined;
}

export function hasFieldError(
  errors: Record<string, unknown> | undefined,
  fieldName: string
): boolean {
  return !!getFieldError(errors, fieldName);
}
