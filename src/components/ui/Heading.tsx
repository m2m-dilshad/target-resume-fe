import { cn } from '@/lib/utils';

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends React.ComponentPropsWithoutRef<'h1'> {
  variant: HeadingVariant;
}

// Define the responsive sizes for each variant
// const variantStyles: Record<HeadingVariant, string> = {
//   h1: 'text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading',
//   h2: 'text-3xl md:text-4xl lg:text-5xl font-bold font-heading',
//   h3: 'text-2xl md:text-3xl lg:text-4xl font-bold font-heading',
//   h4: 'text-xl md:text-2xl lg:text-3xl font-bold font-heading',
//   h5: 'text-lg md:text-xl lg:text-2xl font-bold font-heading',
//   h6: 'text-base md:text-xl lg:text-lg font-semibold font-heading',
// };
const variantStyles: Record<HeadingVariant, string> = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold font-heading',
  h3: 'text-2xl md:text-3xl lg:text-4xl font-bold font-heading',
  h4: 'text-lg md:text-xl lg:text-2xl font-semibold font-heading',
  h5: 'text-base md:text-lg lg:text-xl font-semibold font-heading',
  h6: 'text-sm md:text-base lg:text-lg font-medium font-heading',
};
const Heading = ({ children, variant, className, ...rest }: HeadingProps) => {
  const Component = variant;
  return (
    <Component className={cn(variantStyles[variant], className)} {...rest}>
      {children}
    </Component>
  );
};

export default Heading;
