import { Card, CardContent } from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { Skill, Level, LEVEL_ORDER, CAT_BAR_COLOR, CAT_CHIP } from '@/types/skill.insights.types';

type InsightsTabProps = {
  skills: Skill[];
};

const LEVEL_WIDTH: Record<Level, string> = {
  beginner: 'w-[30%]',
  intermediate: 'w-[62%]',
  advanced: 'w-[95%]',
};

const LEVEL_PILL: Record<Level, string> = {
  beginner: 'bg-slate-100 text-slate-500',
  intermediate: 'bg-blue-50 text-blue-600 border border-blue-100',
  advanced: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
};

function ProficiencyBar({ skill }: { skill: Skill }) {
  const barColor = CAT_BAR_COLOR[skill.category] ?? 'bg-slate-400';
  const barWidth = LEVEL_WIDTH[skill.level];
  const pillCls = LEVEL_PILL[skill.level];

  const name = skill.name.length > 13 ? skill.name.slice(0, 13) + '…' : skill.name;

  return (
    <div className="flex items-center gap-3">
      <span
        className="w-24 shrink-0 truncate text-xs font-medium text-slate-600"
        title={skill.name}
      >
        {name}
      </span>

      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor} ${barWidth}`}
        />
      </div>

      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${pillCls} w-24 text-center`}
      >
        {skill.level}
      </span>
    </div>
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  const chipCls = CAT_CHIP[skill.category] ?? 'bg-slate-100 text-slate-500 border-slate-200';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${chipCls}`}
    >
      {skill.name}
    </span>
  );
}

export default function InsightsTab({ skills }: InsightsTabProps) {
  const total = skills.length;

  const counts = {
    advanced: 0,
    intermediate: 0,
    beginner: 0,
  };

  skills.forEach((s) => {
    counts[s.level]++;
  });

  const levelData = [
    {
      level: 'advanced' as Level,
      count: counts.advanced,
      cls: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    },
    {
      level: 'intermediate' as Level,
      count: counts.intermediate,
      cls: 'bg-blue-50 border-blue-200 text-blue-600',
    },
    {
      level: 'beginner' as Level,
      count: counts.beginner,
      cls: 'bg-slate-100 border-slate-200 text-slate-500',
    },
  ];

  const categories = skills.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] ?? 0) + 1;
    return acc;
  }, {});

  const categoryCount = Object.keys(categories).length;

  const topSkills = [...skills]
    .sort((a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level])
    .slice(0, 10);

  const metrics = [
    { value: total, label: 'Total Skills' },
    { value: counts.advanced, label: 'Advanced' },
    { value: counts.intermediate, label: 'Intermediate' },
    { value: categoryCount, label: 'Categories' },
  ];

  if (total === 0) {
    return (
      <p className="text-sm text-slate-400">
        No skills were extracted. Try adding more detail to your resume.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {/*  Overview */}
      <section>
        <Typography className="mb-3 font-bold tracking-wide text-slate-400 uppercase">
          Overview
        </Typography>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((m) => (
            <Card key={m.label} className="p-4">
              <CardContent className="p-0">
                <div className="text-xl font-semibold">{m.value}</div>
                <div className="text-xs text-slate-400 uppercase">{m.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/*  Top Skills + Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        <section className="space-y-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <Typography size="xs" className="font-bold text-slate-400 uppercase">
            Top skills by proficiency
          </Typography>

          {topSkills.map((s) => (
            <ProficiencyBar key={s.name} skill={s} />
          ))}
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <Typography size="xs" className="font-bold text-slate-400 uppercase">
            Skills by category
          </Typography>

          <div className="mt-3 space-y-2.5">
            {Object.entries(categories)
              .sort(([, a], [, b]) => b - a)
              .map(([cat, count]) => {
                const pct = Math.round((count / total) * 100);
                const barColor = CAT_BAR_COLOR[cat] ?? 'bg-slate-400';

                return (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="w-20 text-xs capitalize">{cat}</span>

                    <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                      <div
                        className={`${barColor} h-full rounded-full`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <span className="w-8 text-right text-xs tabular-nums">{count}</span>
                  </div>
                );
              })}
          </div>
        </section>
      </div>

      {/*  Level Distribution */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <Typography size="xs" className="mb-3 font-bold text-slate-400 uppercase">
          Level distribution
        </Typography>

        <div className="flex flex-wrap gap-4">
          {levelData.map(({ level, count, cls }) => (
            <div
              key={level}
              className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 ${cls}`}
            >
              <span className="text-xl font-bold tabular-nums">{count}</span>

              <span className="text-[11px] font-semibold capitalize">{level}</span>
            </div>
          ))}
        </div>
      </section>

      {/*  All Skills */}
      <section>
        <Typography size="xs" className="mb-3 font-bold text-slate-400 uppercase">
          All extracted skills
        </Typography>

        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <SkillChip key={s.name} skill={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
