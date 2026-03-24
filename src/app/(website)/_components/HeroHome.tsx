import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function HeroHome() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden py-20 md:py-32">
      {/* Background Gradient */}
      <div className="from-primary/5 absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] via-transparent to-transparent" />

      <div className="relative container mx-auto max-w-(--page-width) px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="border-border bg-surface mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <Sparkles className="text-primary h-4 w-4" />

            <Typography variant="span" size="xs" className="text-foreground">
              AI-Powered Resume Builder
            </Typography>
          </div>

          {/* Heading */}
          <Heading variant="h1" id="hero-heading" className="text-foreground mb-6 tracking-tight">
            Land Your Dream Job with <span className="text-primary">AI-Optimized</span> Resumes
          </Heading>

          {/* Description */}
          <Typography variant="p" size="lg" className="text-typography-primary mb-8">
            Generate job-specific, ATS-optimized resumes in seconds. Our AI analyzes job
            descriptions and tailors your resume to match what employers are looking for.
          </Typography>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="link" href="/signup" size="lg">
              Start Building Free
            </Button>

            <Button variant="link" href="#features" size="lg" theme="secondary">
              See How It Works
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-4 w-4" />

              <Typography variant="span" size="xs" className="text-typography-muted">
                ATS-optimized templates
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-4 w-4" />

              <Typography variant="span" size="xs" className="text-typography-muted">
                Maintain job application history
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-4 w-4" />

              <Typography variant="span" size="xs" className="text-typography-muted">
                Instant download
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
