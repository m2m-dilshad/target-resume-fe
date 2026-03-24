import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import { ArrowRight, FileText } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-primary relative overflow-hidden py-24">
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

      <div className="relative container mx-auto max-w-(--page-width) px-4 text-center">
        {/* Icon */}
        <FileText className="text-typography-white mx-auto mb-6 h-12 w-12" />

        {/* Heading */}
        <Heading variant="h2" className="text-typography-white mb-4">
          Ready to Land More Interviews?
        </Heading>

        {/* Description */}
        <Typography
          variant="p"
          size="base"
          className="text-typography-white/80 mx-auto mb-10 max-w-2xl"
        >
          Join thousands of job seekers who optimize their resumes with AI-powered insights and land
          interviews faster.
        </Typography>

        {/* CTA Button */}
        <Button
          variant="link"
          href="/signup"
          size="lg"
          className="bg-background text-primary hover:bg-background/90 mx-auto flex w-fit items-center justify-center"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
