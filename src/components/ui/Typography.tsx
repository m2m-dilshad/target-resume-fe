import { cn } from '@/lib/utils';

// Define available variants (HTML tags) and sizes
type TypographyVariant = 'p' | 'div' | 'span' | 'label';

export type TypographySize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | 'xs1';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  size?: TypographySize;
  children: React.ReactNode;
}

// Responsive size mapping (Mobile-first)
const sizeStyles: Record<TypographySize, string> = {
  xs1: 'text-xs',
  xs: 'text-xs md:text-sm',
  sm: 'text-sm md:text-base',
  base: 'text-sm md:text-base lg:text-lg', //default final one
  lg: 'text-lg md:text-xl lg:text-2xl',
  xl: 'text-xl md:text-2xl lg:text-3xl font-bold',
  '2xl': 'text-2xl md:text-3xl lg:text-4xl font-extrabold',
  '3xl': 'text-3xl md:text-5xl lg:text-6xl font-black tracking-tight',
};

const Typography = ({
  variant = 'p',
  size = 'base',
  className,
  children,
  ...props
}: TypographyProps) => {
  const Component = variant;

  return (
    <Component className={cn(sizeStyles[size], className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
