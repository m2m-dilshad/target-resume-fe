'use client';

import {
  Upload,
  FileText,
  Settings2,
  Download,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Sparkles,
  Eye,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import { useState } from 'react';
import { UploadBox } from '@/components/ui/UploadBox';
import Button from '@/components/ui/Button';
import { PromptSelector } from '@/components/ui/PromptSelector';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { Textarea } from '@/components/ui/Textarea';
import { JobDescResumeAction } from '@/actions/app/resumes.actions';

{
  /* TODO:
1. Upload & parse resume
   - upload file to storage (S3 / local)
   - extract text from PDF/DOCX

2. Generate optimized resume (AI)
   - input: parsed resume + job description + optional prompt
   - call AI and generate updated content

3. Save result in DB
   - original file URL
   - parsed text
   - job description
   - prompt
   - optimized resume content

4. Preview & download
   - show generated resume
   - allow export (PDF / DOCX)
*/
}

export default function JobOptimizer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  const steps = [
    { id: 1, label: 'Upload Resume', description: 'Your current resume', icon: Upload },
    { id: 2, label: 'Job Description ', description: 'Target Job', icon: FileText },
    { id: 3, label: 'Customize', description: 'Optimization instruction', icon: Settings2 },
    { id: 4, label: 'Generate', description: 'Review & download', icon: Download },
  ];

  const handleGenerate = async () => {
    if (!resumeFile) {
      setError('Resume file missing');
      return;
    }

    try {
      const res = await JobDescResumeAction(resumeFile, jobDescription, prompt);

      console.log('✅ RESPONSE:', res);

      if (!res.success) {
        setError(res.message as string);
        return;
      }

      // optional: store result or redirect
      // router.push("/preview");
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !resumeFile) {
      setError('Please upload your resume before proceeding.');
      return;
    }

    if (currentStep === 2 && jobDescription.trim().length < 50) {
      setError('Please paste a valid job description (min 50 characters).');
      return;
    }
    setError('');

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      <Heading variant="h3" className="text-primary text-3xl font-bold">
        Job Optimizer
      </Heading>

      <Typography className="text-muted-foreground mb-6">
        Optimize your resume to match your target job and stand out to recruiters.
      </Typography>

      <StepIndicator steps={steps} currentStep={currentStep} className="mb-8" />

      <div className="mx-auto max-w-3xl">
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Upload className="text-primary h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Upload Your Resume</CardTitle>
                  <CardDescription>Upload your existing resume to get started</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <UploadBox
                title="Drop your resume here"
                description="Supports PDF and DOCX files up to 10MB"
                accept=".pdf,.docx,.doc"
                onFileSelect={(file) => {
                  setResumeFile(file);
                  setError('');
                }}
              />
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Briefcase className="text-primary h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Paste Job Description</CardTitle>
                  <CardDescription>Paste the job description for your target role</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                className="max-h-100 min-h-50 w-full overflow-y-auto rounded-lg border p-3 pr-2"
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setError('');
                }}
              />
            </CardContent>
          </Card>
        )}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Sparkles className="text-primary h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Customize Optimization</CardTitle>
                  <CardDescription>
                    Select prompts or add custom instructions for your resume
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <PromptSelector onPromptChange={setPrompt} />
            </CardContent>
          </Card>
        )}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Eye className="text-primary h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Generate Resume</CardTitle>
                  <CardDescription>
                    Review your inputs and generate your optimized resume
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-border rounded-lg border p-4">
                  <Heading variant="h5" className="text-foreground mb-2">
                    Resume File
                  </Heading>
                  <Typography variant="p" size="xs" className="text-muted-foreground">
                    {resumeFile?.name || 'No file selected'}
                  </Typography>
                </div>

                <div className="border-border rounded-lg border p-4">
                  <Heading variant="h5" className="text-foreground mb-2">
                    Job Description
                  </Heading>
                  <Typography
                    variant="p"
                    size="xs"
                    className="text-muted-foreground max-h-40 overflow-y-auto pr-2"
                  >
                    {jobDescription || 'No job description provided'}
                  </Typography>
                </div>

                <div className="border-border rounded-lg border p-4">
                  <Heading variant="h5" className="text-foreground mb-2">
                    Optimization Prompts
                  </Heading>
                  <Typography variant="p" size="xs" className="text-muted-foreground">
                    {prompt || 'Default optimization settings'}
                  </Typography>
                </div>
              </div>

              <div className="mt-8 flex w-fit justify-center">
                {/* TODO: Create Preview */}
                {/* <Button variant="link" href="/preview" className="flex items-center justify-center gap-2 w-fit">
                                    <Sparkles size={16} />
                                    Generate Optimized Resume
                                </Button> */}
                <Button
                  onClick={handleGenerate}
                  className="flex w-fit items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  Generate Optimized Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {error && (
        <div className="mx-auto mt-4 max-w-3xl">
          <Typography
            variant="p"
            size="xs"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-500"
          >
            {error}
          </Typography>
        </div>
      )}

      <div className="mx-auto mt-8 flex max-w-3xl items-center justify-between">
        {currentStep > 1 ? (
          <Button
            theme="secondary"
            onClick={handleBack}
            className="flex w-fit items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <Typography variant="span" size="xs">
              Back
            </Typography>
          </Button>
        ) : (
          <div />
        )}

        {currentStep < steps.length && (
          <Button
            theme="secondary"
            onClick={handleNext}
            className="flex w-fit items-center justify-center gap-2"
          >
            <Typography variant="span" size="xs">
              Next
            </Typography>
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
