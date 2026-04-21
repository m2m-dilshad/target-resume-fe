import { cn } from '@/lib/utils';
import { Check, LucideIcon } from 'lucide-react';
import Typography from './Typography';

interface Step {
  id: number;
  label: string;
  description?: string;
  icon?: LucideIcon;
}
interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress steps" className={className}>
      <ol className="flex items-center justify-between" role="list">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          const stepStatus = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';

          return (
            <li
              key={step.label}
              className="relative flex-1"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors',
                    isCompleted
                      ? 'border-primary bg-primary text-white'
                      : isCurrent
                        ? 'border-primary bg-background text-primary'
                        : 'border-border bg-background text-muted-foreground'
                  )}
                  aria-hidden="true"
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Typography variant="span">{index + 1}</Typography>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <Typography
                    variant="p"
                    size="sm"
                    className={cn(
                      'text-sm font-medium',
                      isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    <Typography variant="span" className="sr-only">
                      Step {index + 1} of {steps.length}: {stepStatus}.{' '}
                    </Typography>
                    {step.label}
                  </Typography>
                  {step.description && (
                    <Typography
                      variant="p"
                      size="xs1"
                      className="text-muted-foreground hidden text-xs sm:block"
                    >
                      {step.description}
                    </Typography>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute top-5 left-[calc(50%+24px)] h-0.5 w-[calc(100%-48px)]',
                    isCompleted ? 'bg-primary' : 'bg-border'
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
