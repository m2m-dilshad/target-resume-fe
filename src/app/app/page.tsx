import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import { AlertCircle, BarChart3, Clock, FileText, Plus, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

import { getScoreColor } from './utils/misc.functions';
import { CURRENT_RESUMES } from './utils/misc.data';
{
  /* TODO: Map CTA actions to routes
   Create Resume  -> [route pending]
   Optimize Resume -> [route pending]
*/
}
const stats = [
  {
    label: 'Total Resumes',
    value: CURRENT_RESUMES.length,
    icon: <FileText className="h-5 w-5" />,
    color: 'bg-primary/10 text-primary',
  },
  {
    label: 'Average ATS Score',
    value:
      Math.round(CURRENT_RESUMES.reduce((sum, r) => sum + r.score, 0) / CURRENT_RESUMES.length) +
      '%',
    icon: <BarChart3 className="h-5 w-5" />,
    color: 'bg-primary-light/20 text-primary-dark',
  },
  {
    label: 'Optimized Resumes',
    value: CURRENT_RESUMES.filter((r) => r.score >= 85).length,
    icon: <Target className="h-5 w-5" />,
    color: 'bg-success/10 text-success',
  },
  {
    label: 'Needs Review',
    value: CURRENT_RESUMES.filter((r) => r.score < 85).length,
    icon: <AlertCircle className="h-5 w-5" />,
    color: 'bg-warning/10 text-warning',
  },
];

export default function App() {
  return (
    <div className="space-y-8">
      <div className="from-primary to-primary-dark bg-linear-to-r p-8 text-white">
        <Heading variant="h2" className="mb-2">
          Welcome to TargetResume
        </Heading>

        <Typography variant="p" className="mb-6 text-lg opacity-90">
          Optimize your resume, track applications and land interviews faster with AI insights.
        </Typography>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="link"
            href="/app/resume-builder"
            theme="secondary"
            className="flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Create Resume
          </Button>

          <Button
            variant="link"
            href="/app/job-optimizer"
            theme="secondary"
            className="flex items-center justify-center gap-2"
          >
            <Target size={18} />
            Optimize Resume
          </Button>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <Typography variant="p" className="text-muted-foreground mb-1 text-sm">
                    {stat.label}
                  </Typography>
                  <Typography variant="p" className="text-foreground text-2xl font-bold">
                    {stat.value}
                  </Typography>
                </div>
                <div className={`rounded-lg p-2.5 ${stat.color}`}>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Recent Resumes</CardTitle>
            <CardDescription className="font-semibold">
              Your recently created and modified resumes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {CURRENT_RESUMES.slice(0, 3).map((resume) => (
                <div
                  key={resume.id}
                  className="border-border flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                      <FileText className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <Heading variant="h6" className="text-foreground">
                        {resume.title}
                      </Heading>

                      <Typography variant="p" className="text-muted-foreground text-sm">
                        {resume.targetJob}
                      </Typography>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="text-muted-foreground flex items-center gap-1 text-sm">
                          <Clock className="h-3.5 w-3.5" />
                          {resume.lastModified}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Typography variant="p" className="text-muted-foreground text-sm">
                        ATS Score
                      </Typography>
                      <Typography
                        variant="p"
                        className={`text-2xl font-bold ${getScoreColor(resume.score)}`}
                      >
                        {resume.score}%
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex w-fit justify-center text-center">
              <Button href="/app/my-resumes" variant="link">
                View All Resumes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
