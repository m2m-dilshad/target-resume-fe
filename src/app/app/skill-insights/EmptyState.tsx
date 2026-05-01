import Typography from '@/components/ui/Typography';
import { BarChart3 } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="bg-primary/10 text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-xl">
        <BarChart3 className="h-6 w-6" />
      </div>

      <Typography variant="p" className="text-foreground mb-1 text-base font-semibold">
        No analysis yet
      </Typography>

      <Typography variant="span" size="sm" className="text-muted-foreground max-w-sm">
        Run an analysis to see your skill insights, gaps and recommendations.
      </Typography>
    </div>
  );
}
