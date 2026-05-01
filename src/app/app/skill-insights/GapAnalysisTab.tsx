import PriorityBadge, { Priority } from '@/components/Priority';
import ScoreRing from '@/components/ScoreRing';
import { Card, CardContent } from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import { Skill, Level, LEVEL_ORDER } from '@/types/skill.insights.types';

type GapAnalysisTabProps = {
  matched: Skill[];
  missing: Skill[];
  improve: Skill[];
  required: Skill[];
  score: number;
  analyzed: boolean;
};

const HIGH_PRIORITY = new Set([
  'react',
  'typescript',
  'node',
  'docker',
  'aws',
  'kubernetes',
  'cicd',
]);
const MED_PRIORITY = new Set(['graphql', 'postgres', 'redis', 'nextjs', 'jest', 'python']);

function getPriority(skill: Skill): Priority {
  if (HIGH_PRIORITY.has(skill.name)) return 'high';
  if (MED_PRIORITY.has(skill.name)) return 'medium';
  return 'low';
}

function LevelPill({ level }: { level: Level }) {
  const cls: Record<Level, string> = {
    beginner: 'bg-slate-100 text-slate-500',
    intermediate: 'bg-blue-50 text-blue-600 border border-blue-100',
    advanced: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cls[level]}`}>
      {level}
    </span>
  );
}

export default function GapAnalysisTab({
  matched,
  missing,
  improve,
  required,
  score,
  analyzed,
}: GapAnalysisTabProps) {
  if (!analyzed) {
    return (
      <Typography variant="p" className="text-sm text-slate-400">
        Run an analysis first to see skill gap results.
      </Typography>
    );
  }

  const highCount = missing.filter((s) => getPriority(s) === 'high').length;

  return (
    <section className="animate-[fadeIn_.25s_ease] space-y-8">
      <div>
        <Heading variant="h6" className="mb-1 text-base font-semibold text-slate-800">
          Skill Gap Analysis
        </Heading>
        <Typography variant="p" className="text-sm text-slate-400">
          Comparing your resume against the target role requirements.
        </Typography>
      </div>

      <div className="flex flex-wrap items-stretch gap-4">
        <ScoreRing score={score} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent>
              <Typography className="text-xl font-semibold text-emerald-700">
                {matched.length}
              </Typography>

              <Typography
                variant="p"
                size="xs1"
                className="font-medium tracking-wide text-slate-400 uppercase"
              >
                Matched
              </Typography>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent>
              <div className="text-xl font-semibold text-red-600">{missing.length}</div>
              <Typography
                variant="p"
                size="xs1"
                className="font-medium tracking-wide text-slate-400 uppercase"
              >
                Missing
              </Typography>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent>
              <div className="text-xl font-semibold text-amber-600">{improve.length}</div>
              <Typography
                variant="p"
                size="xs1"
                className="font-medium tracking-wide text-slate-400 uppercase"
              >
                To Improve
              </Typography>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent>
              <div className="text-xl font-semibold text-red-600">{highCount}</div>
              <Typography
                variant="p"
                size="xs1"
                className="font-medium tracking-wide text-slate-400 uppercase"
              >
                High Priority
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Matched / Missing lists ───────────────────────────────────── */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Matched */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Typography
            variant="p"
            size="sm"
            className="mb-3 font-bold tracking-wide text-emerald-500 uppercase"
          >
            Matched Skills
          </Typography>
          {matched.length === 0 ? (
            <Typography variant="p" size="sm" className="text-slate-400">
              No matching skills found.
            </Typography>
          ) : (
            <ul className="divide-y divide-slate-100">
              {matched.map((s) => (
                <li key={s.name} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm leading-none text-emerald-400">✓</span>
                    <span className="text-sm font-medium text-slate-700 capitalize">{s.name}</span>
                  </div>
                  <LevelPill level={s.level} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Missing */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Typography
            variant="p"
            size="sm"
            className="mb-3 font-bold tracking-wide text-red-400 uppercase"
          >
            Missing Skills
          </Typography>
          {missing.length === 0 ? (
            <Typography variant="p" size="sm" className="text-slate-400">
              No critical gaps — great match!
            </Typography>
          ) : (
            <ul className="divide-y divide-slate-100">
              {missing.map((s) => (
                <li key={s.name} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm leading-none text-red-400">✗</span>
                    <Typography
                      variant="span"
                      className="text-sm font-medium text-slate-700 capitalize"
                    >
                      {s.name}
                    </Typography>
                  </div>
                  <PriorityBadge priority={getPriority(s)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── Skills to improve ────────────────────────────────────────── */}
      {improve.length > 0 && (
        <div>
          <Typography className="mb-3 font-bold tracking-wide text-amber-500 uppercase">
            Skills to improve
          </Typography>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {improve.map((s) => {
              const target = required.find((r) => r.name === s.name);
              const isUpgrade = target && LEVEL_ORDER[s.level] < LEVEL_ORDER[target.level];

              return (
                <div
                  key={s.name}
                  className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-amber-300 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <Typography
                      variant="span"
                      className="text-sm font-semibold text-slate-700 capitalize"
                    >
                      {s.name}
                    </Typography>

                    <Typography variant="span" className="text-[10px] font-bold uppercase ...">
                      Improve
                    </Typography>
                  </div>

                  {isUpgrade ? (
                    <div className="flex items-center gap-2 text-[11px]">
                      <LevelPill level={s.level} />

                      <Typography variant="span" className="text-slate-300">
                        →
                      </Typography>
                      <LevelPill level={target!.level} />
                    </div>
                  ) : (
                    <LevelPill level={s.level} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
