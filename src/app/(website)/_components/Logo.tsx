import Typography from '@/components/ui/Typography';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md">
      <div
        className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg"
        aria-hidden="true"
      >
        <FileText className="text-surface h-5 w-5" />
      </div>
      <Typography variant="span" className="text-foreground font-heading1 font-medium">
        TargetResume.ai
      </Typography>
    </Link>
  );
}
