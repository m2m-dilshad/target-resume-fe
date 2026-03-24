const steps = [
  {
    step: '01',
    title: 'Upload Your Resume',
    description: 'Upload your existing resume in PDF or DOCX format.',
  },
  {
    step: '02',
    title: 'Paste Job Description',
    description: 'Add the job posting you want to apply for.',
  },
  {
    step: '03',
    title: 'Customize with Prompts',
    description: 'Select optimization prompts or add custom instructions.',
  },
  {
    step: '04',
    title: 'Download & Apply',
    description: 'Get your ATS-optimized resume and land interviews.',
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="bg-background py-24">
      <div className="container mx-auto max-w-(--page-width) px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            How It Works
          </h2>

          <p className="text-typography-muted text-lg">
            Four simple steps to your perfect, job-winning resume.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative px-2">
              {/* Step number */}
              <div
                className="text-primary-light/70 mb-5 text-6xl font-bold tracking-tight"
                aria-hidden="true"
              >
                {step.step}
              </div>

              {/* Title */}
              <h3 className="text-foreground mb-3 text-xl font-semibold">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-typography-primary leading-relaxed">{step.description}</p>

              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="bg-primary-light/40 absolute top-12 -right-6 hidden h-[2px] w-12 lg:block" />
              )}

              {/* subtle bottom separator for mobile */}
              {index < steps.length - 1 && (
                <div className="bg-border mt-8 block h-px w-16 lg:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
