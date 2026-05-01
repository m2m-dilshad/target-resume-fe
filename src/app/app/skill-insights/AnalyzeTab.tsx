import { Loader2, Play, RotateCcw } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';
import { UploadBox } from '@/components/ui/UploadBox';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export type AnalyzeTabProps = {
  resumeText: string;
  setResumeText: (v: string) => void;
  jdText: string;
  setJdText: (v: string) => void;
  resumeFile: File | null;
  setResumeFile: (f: File | null) => void;
  resumeSource: 'text' | 'file';
  setResumeSource: (v: 'text' | 'file') => void;
  onAnalyze: () => void;
  onClear: () => void;
  loading?: boolean;
};

export default function AnalyzeTab({
  resumeText,
  setResumeText,
  jdText,
  setJdText,
  resumeFile,
  setResumeFile,
  resumeSource,
  setResumeSource,
  onAnalyze,
  onClear,
  loading = false,
}: AnalyzeTabProps) {
  const canAnalyze =
    !loading && (resumeText.trim().length > 0 || resumeFile !== null) && jdText.trim().length > 0;

  return (
    <div className="space-y-7">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Resume</CardTitle>
            <CardDescription>Paste text or upload a file</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="relative">
              <Textarea
                value={resumeText}
                disabled={resumeSource === 'file'}
                onChange={(e) => {
                  setResumeText(e.target.value);
                  setResumeSource('text');
                  setResumeFile(null);
                }}
                placeholder="Paste the full text of your resume…"
                rows={9}
              />

              {resumeSource === 'file' && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-slate-50/80 backdrop-blur-[1px]">
                  <p className="text-xs font-medium text-slate-400">Using uploaded file</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-[10px] font-semibold tracking-widest text-slate-500 uppercase select-none">
              <span className="h-px flex-1 bg-slate-200" />
              or upload
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <UploadBox
              title="Drop your resume here"
              description="Supports PDF and DOCX files up to 10MB"
              accept=".pdf,.docx,.doc"
              onFileSelect={(file) => {
                setResumeFile(file);
                setResumeSource('file');
                setResumeText('');
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Role / Job Description</CardTitle>
            <CardDescription>Paste the job description</CardDescription>
          </CardHeader>

          <CardContent>
            <Textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the job description or describe the target role…"
              rows={20}
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center gap-3 pt-1">
        <Button
          onClick={onAnalyze}
          roundSize="xl"
          disabled={!canAnalyze || loading}
          className="inline-flex w-45 items-center justify-center gap-2 shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Run Analysis
            </>
          )}
        </Button>

        <Button
          theme="ghost"
          roundSize="xl"
          onClick={onClear}
          disabled={loading}
          className="inline-flex w-45 items-center justify-center gap-2 border border-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
