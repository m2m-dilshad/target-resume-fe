'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { actions } from '../utils/misc.data';
{
  /*TODO:
    Cross check routes */
}
export default function ResumeBuilder() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-primary font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          How would you like to start?
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Choose a path to begin crafting your professional story.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <button
              key={index}
              onClick={() => router.push(action.route)}
              className="group text-left transition-all duration-200 outline-none active:scale-[0.98]"
            >
              <Card className={cn('h-full cursor-pointer transition-all', action.className.card)}>
                <CardHeader>
                  <CardAction>
                    <div
                      className={cn(
                        'rounded-xl p-2.5 shadow-sm transition-colors',
                        action.className.iconWrapper
                      )}
                    >
                      <Icon className={cn('h-6 w-6', action.className.icon)} />
                    </div>
                  </CardAction>

                  <CardTitle className="group-hover:text-primary transition-colors">
                    {action.title}
                  </CardTitle>

                  <CardDescription className="leading-relaxed">
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
