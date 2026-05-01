'use client';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

// Define available variants (HTML tags) and sizes
export type TextInputVariant = 'input' | 'div' | 'span' | 'textarea';

export type TextInputSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

type TextInputTheme = 'dark' | 'light';

type TextInputRoundSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

interface TextInputProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextInputVariant;
  size?: TextInputSize;
  theme?: TextInputTheme;
  roundSize?: TextInputRoundSize;
  children?: React.ReactNode;
  name?: string;
  label?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  type?: string;
  pattern?: string;
  icon?: LucideIcon;
  required?: boolean;
  minLength?: number;
}

// Responsive size mapping (Mobile-first)
// text-base max-sm:scale-[0.875] max-sm:origin-left max-sm:w-[114.28%]
// const xsScale = 'max-xs:scale-[0.8] max-xs:w-[125%] max-xs:origin-left';
// const smScale = 'max-sm:scale-[0.875] max-sm:w-[114.28%] max-sm:origin-left';
// const mdScale = 'max-md:scale-[0.9] max-md:w-[111.1%] max-md:origin-left';
// const lgScale = 'max-lg:scale-[0.95] max-lg:w-[105.26%] max-lg:origin-left';
// const xlScale = 'max-xl:scale-[0.97] max-xl:w-[103.09%] max-xl:origin-left';

// xs: 'text-xs md:text-sm',
// sm: 'text-sm md:text-base',
// base: 'text-sm md:text-base lg:text-lg', /
const sizeStyles: Record<TextInputSize, string> = {
  xs: `text-base scale-[0.8] w-[125%] origin-left`,
  sm: `text-base scale-[0.875] w-[114.28%] origin-left`,
  base: `text-base max-sm:scale-[0.875] max-sm:w-[114.28%] max-sm:origin-left lg:text-lg`, //default final one
  lg: 'text-lg md:text-xl lg:text-2xl',
  xl: 'text-xl md:text-2xl lg:text-3xl font-bold',
  '2xl': 'text-2xl md:text-3xl lg:text-4xl font-extrabold',
  '3xl': 'text-3xl md:text-5xl lg:text-6xl font-black tracking-tight',
};

const themeStyles: Record<TextInputTheme, string> = {
  dark: 'border border-gray-500/20 bg-white/10 p-3 placeholder-white/40 transition focus:ring-2 focus:ring-blue-500 focus:outline-none',
  light:
    'border border-gray-500/40 bg-white p-3 placeholder-black/40 text-black/70 transition focus:ring-2 focus:ring-blue-500 focus:outline-none',
};

const roundStyles: Record<TextInputRoundSize, string> = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  base: 'rounded', //default final one
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-2xl',
};

const TextInput = ({
  variant = 'input',
  size = 'base',
  theme = 'light',
  roundSize = '2xl',
  className,
  icon: Icon,
  children,
  ...props
}: TextInputProps) => {
  const Component = variant;
  const classNames = cn(
    'w-full',
    themeStyles[theme],
    roundStyles[roundSize],
    sizeStyles[size],
    className
  );
  if (variant === 'input') {
    return (
      <div className="relative w-full">
        {Icon && (
          <Icon className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
        )}

        <input
          className={cn(
            'w-full',
            themeStyles[theme],
            roundStyles[roundSize],
            sizeStyles[size],
            Icon ? 'pl-10' : '',
            className
          )}
          {...props}
        />
      </div>
    );
  }
  return (
    <Component className={classNames} {...props}>
      {children && children}
    </Component>
  );
};

export default TextInput;
