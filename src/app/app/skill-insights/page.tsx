'use client';

import { useState } from 'react';

import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';

import AnalyzeTab from './AnalyzeTab';
import InsightsTab from './InsightsTab';
import GapAnalysisTab from './GapAnalysisTab';

import EmptyState from './EmptyState';

import { parseResumeFile, runSkillAnalysis } from '@/actions/app/skill.actions';
import { AnalysisResult, Skill } from '@/types/skill.insights.types';
import RecommendationsTab from './RecommendationsTab';
import { cn } from '@/lib/utils';

type TabType = 'analyze' | 'insights' | 'gaps' | 'recommendations';

const TABS: TabType[] = ['analyze', 'insights', 'gaps', 'recommendations'];

// const TAB_LABELS: Record<TabType, string> = {
//     analyze: 'Analyze',
//     insights: 'Insights',
//     gaps: 'Gap Analysis',
//     recommendations: 'Recommendations',
// };

export default function SkillInsight() {
  // ── Input state ──────────────────────────────────────────────────────────
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeSource, setResumeSource] = useState<'text' | 'file'>('text');
  const [jdText, setJdText] = useState('');

  // ── Analysis state ───────────────────────────────────────────────────────
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Tab state ─────────────────────────────────────────────────────────────
  const [tab, setTab] = useState<TabType>('analyze');

  // ── Handlers ─────────────────────────────────────────────────────────────

  const runAnalysis = async () => {
    if (!jdText.trim()) return;
    setLoading(true);
    setError(null);

    try {
      let finalResumeText = resumeText;

      // If a file was uploaded, parse it first
      if (resumeSource === 'file' && resumeFile) {
        const formData = new FormData();
        formData.append('file', resumeFile);

        const parsed = await parseResumeFile(formData);
        if (!parsed.success) {
          setError(parsed.message ?? 'Failed to parse resume file.');
          return;
        }
        finalResumeText = parsed.data as string;
      }

      if (!finalResumeText.trim()) {
        setError('Resume text is empty. Please paste text or upload a file.');
        return;
      }

      const result = await runSkillAnalysis({
        resumeText: finalResumeText,
        jdText,
      });

      if (!result.success) {
        setError(result.message ?? 'Analysis failed. Please try again.');
        return;
      }

      setAnalysis(result.data as AnalysisResult);
      setAnalyzed(true);
      setTab('insights');
    } catch (err) {
      console.error('[SkillInsight] runAnalysis error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setResumeText('');
    setResumeFile(null);
    setResumeSource('text');
    setJdText('');
    setAnalysis(null);
    setAnalyzed(false);
    setError(null);
    setTab('analyze');
  };

  // ── Derived values for child tabs ─────────────────────────────────────────

  const skills: Skill[] = analysis?.skills ?? [];
  const matched: Skill[] = analysis?.matched ?? [];
  const missing: Skill[] = analysis?.missing ?? [];
  const improve: Skill[] = analysis?.improve ?? [];
  const score: number = analysis?.score ?? 0;

  // RecommendationsTab needs a domain hint; derive from JD text for now
  const inferredDomain = jdText.toLowerCase().includes('backend')
    ? 'backend'
    : jdText.toLowerCase().includes('fullstack')
      ? 'fullstack'
      : 'frontend';

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* Header */}
      <div className="mb-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Heading variant="h3" className="text-primary mb-1">
            Skill Gap Analysis
          </Heading>
          <Typography variant="span" size="xs" className="text-muted-foreground">
            Compare your skills against job requirements
          </Typography>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}

      <main>
        {/* Tab bar */}
        <div className="mt-4 mb-6 flex w-fit flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-1">
          {TABS.map((t) => (
            <Button
              key={t}
              onClick={() => setTab(t)}
              theme="ghost"
              roundSize="lg"
              className={cn(
                'w-auto px-4 py-1.5 font-medium uppercase transition-all',
                tab === t
                  ? 'bg-primary hover:bg-primary-dark text-white shadow-sm'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
              )}
            >
              {t}
            </Button>
          ))}
        </div>
        {/* Tab content */}
        <div className="animate-fadeIn">
          {tab === 'analyze' && (
            <AnalyzeTab
              resumeText={resumeText}
              setResumeText={setResumeText}
              jdText={jdText}
              setJdText={setJdText}
              resumeFile={resumeFile}
              setResumeFile={setResumeFile}
              resumeSource={resumeSource}
              setResumeSource={setResumeSource}
              onAnalyze={runAnalysis}
              onClear={clearAll}
              loading={loading}
            />
          )}

          {tab === 'insights' && (analyzed ? <InsightsTab skills={skills} /> : <EmptyState />)}

          {tab === 'gaps' &&
            (analyzed ? (
              <GapAnalysisTab
                matched={matched}
                missing={missing}
                improve={improve}
                required={analysis?.missing ?? []}
                score={score}
                analyzed={analyzed}
              />
            ) : (
              <EmptyState />
            ))}

          {tab === 'recommendations' &&
            (analyzed ? (
              <RecommendationsTab
                domain={inferredDomain as 'frontend' | 'backend' | 'fullstack'}
                missing={missing}
                analyzed={analyzed}
              />
            ) : (
              <EmptyState />
            ))}
        </div>
      </main>
    </div>
  );
}
