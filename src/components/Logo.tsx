import Link from 'next/link';
import { FileText } from 'lucide-react';
import Typography, { TypographySize } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

type LogoProps = {
  href?: string;
  className?: string;
  textSize?: TypographySize;
  showText?: boolean;
  logoSize?: number;
};

export default function Logo({
  href = '/',
  className,
  textSize = 'xl',
  showText = true,
  logoSize = 36,
}: LogoProps) {
  return (
    <Link href={href} className={cn('flex items-center gap-2', className)}>
      <div
        className="bg-primary flex items-center justify-center rounded-lg"
        style={{ width: logoSize, height: logoSize }}
      >
        <FileText size={logoSize * 0.55} className="text-surface" />
      </div>

      {showText && (
        <Typography variant="span" size={textSize} className="font-heading1 text-primary">
          TargetResume.ai
        </Typography>
      )}
    </Link>
  );
}
