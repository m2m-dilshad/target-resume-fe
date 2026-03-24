import { Card, CardContent } from '@/components/ui/Card';
import { Target, Sparkles, BarChart3, Zap, Shield, ClipboardList } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Job-Specific Resume Optimization',
    description:
      'Tailor your resume for every job application by pasting a job description. Our AI analyzes requirements, keywords and skills to create a job-specific resume that matches what recruiters and hiring managers are looking for.',
  },
  {
    icon: Shield,
    title: 'ATS-Friendly Resume Format',
    description:
      'Create resumes designed to pass Applicant Tracking Systems (ATS). Our AI ensures the right formatting, keyword placement and structure so your resume gets noticed by recruiters and hiring software.',
  },
  {
    icon: BarChart3,
    title: 'Resume Skill Gap Analysis',
    description:
      'Compare your resume with job requirements to identify missing skills and qualifications. Receive clear insights and recommendations to improve your resume and increase interview chances.',
  },
  {
    icon: Sparkles,
    title: 'AI Resume Writing Suggestions',
    description:
      'Improve your resume with AI-powered recommendations that enhance bullet points, highlight achievements, add measurable results and use strong action verbs to make your experience stand out.',
  },
  {
    icon: Zap,
    title: 'Instant AI Resume Generation',
    description:
      'Generate a professional resume in seconds using advanced AI technology. Save hours of manual editing and quickly create optimized resumes tailored to different job roles.',
  },
  {
    icon: ClipboardList,
    title: 'Job Application Tracker',
    description:
      'Track and manage all your job applications in one dashboard. Monitor application status, interview rounds, feedback and resume versions to understand what works and improve your job search strategy.',
  },
];

import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';

export default function Features() {
  return (
    <section className="bg-surface py-24">
      <div className="container mx-auto max-w-(--page-width) px-6">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Heading variant="h2" className="text-foreground mb-4 tracking-tight">
            Everything You Need to Stand Out
          </Heading>

          <Typography variant="p" size="base" className="text-typography-primary">
            Powerful features designed to help you create the perfect resume for any job
            application.
          </Typography>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border bg-surface border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-7">
                {/* Icon */}
                <div className="bg-primary/10 group-hover:bg-primary/20 mb-5 flex h-12 w-12 items-center justify-center rounded-lg transition">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>

                {/* Title */}
                <Heading variant="h5" className="text-foreground mb-2">
                  {feature.title}
                </Heading>

                {/* Description */}
                <Typography variant="p" size="xs" className="text-typography-muted leading-relaxed">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
