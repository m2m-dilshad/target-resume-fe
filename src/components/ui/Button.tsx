'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
// import {} from 'lucide-react';
import Typography from './Typography';

// Define available variants (HTML tags) and sizes
type ButtonVariant = 'button' | 'div' | 'a' | 'link';

export type TextVariant = 'uppercase' | 'titlecase' | 'normal';

export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

export type ButtonTheme = 'primary' | 'secondary' | 'primaryLight' | 'success' | 'warning';

export type ButtonRoundSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
// const icons = {};
interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: ButtonVariant;
  text?: TextVariant;
  size?: ButtonSize;
  theme?: ButtonTheme | string;
  roundSize?: ButtonRoundSize;
  href?: string;
  target?: string;
  children?: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  // icon?: keyof typeof icons;
  image?: React.ReactNode;
}
// const textStyles: Record<TextVariant, string> = {
//   uppercase: 'uppercase tracking-wide',
//   titlecase: 'capitalize',
//   normal: 'normal-case',
// };
// Responsive size mapping (Mobile-first)
const sizeStyles: Record<ButtonSize, string> = {
  xs: `text-base scale-[0.8] w-[125%] origin-left`,
  sm: `text-base scale-[0.875] w-[114.28%] origin-left`,
  base: `text-base max-sm:scale-[0.875] max-sm:w-[114.28%] max-sm:origin-left lg:text-lg`, //default final one
  lg: 'text-lg md:text-xl lg:text-2xl',
  xl: 'text-xl md:text-2xl lg:text-3xl font-bold',
  '2xl': 'text-2xl md:text-3xl lg:text-4xl font-extrabold',
  '3xl': 'text-3xl md:text-5xl lg:text-6xl font-black tracking-tight',
};

const themeStyles: Record<ButtonTheme, string> = {
  primary:
    'border border-transparent px-2 py-1 bg-primary text-white t tracking-tighter font-medium hover:bg-primary-dark hover:border-primary',
  secondary:
    'border border-white px-3 py-1 bg-white text-primary tracking-tighter font-medium transition-all duration-200 hover:bg-primary hover:text-primary hover:border-white hover:text-white',
  primaryLight:
    'border border-transparent px-3 py-1 bg-primary-light text-white t tracking-tighter font-medium hover:bg-primary hover:border-primary-light   transition',
  success:
    'border border-transparent px-3 py-1 bg-emerald-400 text-neutral-900 t tracking-tighter font-medium hover:bg-emerald-500 hover:border-emerald-400',
  warning:
    'border border-transparent px-3 py-1 bg-orange-700 text-white t tracking-tighter font-medium hover:bg-orange-600 hover:border-primary',
};

const roundStyles: Record<ButtonRoundSize, string> = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  base: 'rounded', //default final one
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

const Button = ({
  variant = 'button',
  size = 'base',
  theme = 'primary',
  roundSize = '3xl',
  className,
  children,
  image,
  ...props
}: ButtonProps) => {
  const Component = variant;
  const classNames = cn(
    'w-full cursor-pointer font-button transition-colors',
    themeStyles[theme as keyof typeof themeStyles],
    roundStyles[roundSize],
    sizeStyles[size],
    className
  );

  if (variant === 'link') {
    const { href, ...rest } = props;
    return (
      <Link href={href || ''} className={classNames} {...rest}>
        {children && children}
      </Link>
    );
  }

  return (
    <Component className={classNames} {...props}>
      <Typography variant="span" className="flex items-center justify-center gap-1">
        {image && image}
        {children}
      </Typography>
    </Component>
  );
};

export default Button;
