import * as React from 'react';
import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `resize-vertical /* Base */ bg-primary/5 border-primary/20 text-foreground placeholder:text-muted-foreground /* Hover */ hover:border-primary/40 /* Focus */ focus:border-primary focus:ring-primary/30 /* Disabled */ /* Error */ aria-invalid:border-destructive aria-invalid:ring-destructive/30 min-h-[120px] w-full rounded-md border px-3 py-2 text-sm transition-all duration-150 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2`,
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
