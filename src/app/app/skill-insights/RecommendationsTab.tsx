import PriorityBadge from '@/components/Priority';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import { Skill } from '@/types/skill.insights.types';

type Priority = 'high' | 'medium' | 'low';
type Domain = 'frontend' | 'backend' | 'fullstack';

type SuggestionItem = {
  icon: string;
  title: string;
  desc: string;
};

type LearningMeta = {
  time: string;
  resources: string[];
};

type RecommendationsTabProps = {
  domain: Domain;
  missing: Skill[];
  analyzed: boolean;
};

const SUGGESTIONS_DB: Record<Domain, SuggestionItem[]> = {
  frontend: [
    {
      icon: '⚛️',
      title: 'Deepen React patterns',
      desc: 'Custom hooks, compound components, and render-prop patterns are what senior roles test.',
    },
    {
      icon: '🔷',
      title: 'Adopt TypeScript strictly',
      desc: 'Move to strict mode, use utility types, and type your API responses end-to-end.',
    },
    {
      icon: '🧪',
      title: 'Write component tests with Jest + Testing Library',
      desc: '80 %+ coverage on business-critical components signals engineering maturity.',
    },
    {
      icon: '⚡',
      title: 'Migrate a project to Next.js',
      desc: 'SSR, ISR, and the App Router are now baseline expectations for frontend roles.',
    },
  ],
  backend: [
    {
      icon: '🧠',
      title: 'Build production-grade REST APIs with Node',
      desc: 'Focus on auth middleware, rate limiting, error handling, and OpenAPI docs.',
    },
    {
      icon: '🐳',
      title: 'Containerise your services with Docker',
      desc: 'Every backend role expects Docker; add a Compose file and CI build.',
    },
    {
      icon: '📊',
      title: 'Index and optimise PostgreSQL queries',
      desc: 'EXPLAIN ANALYSE, partial indexes, and connection pooling are interview staples.',
    },
    {
      icon: '☁️',
      title: 'Deploy on AWS with IAM least-privilege',
      desc: 'EC2 + RDS or Lambda + DynamoDB — pick one path and build end-to-end.',
    },
  ],
  fullstack: [
    {
      icon: '🚀',
      title: 'System design fundamentals',
      desc: 'Understand load balancing, caching layers, and database sharding at a conceptual level.',
    },
    {
      icon: '🔁',
      title: 'Set up CI/CD with GitHub Actions',
      desc: 'Automated test → build → deploy pipelines are expected at every mid-senior role.',
    },
    {
      icon: '📈',
      title: 'Add observability (logging + tracing)',
      desc: 'Structured logs, distributed tracing, and alerting show operational ownership.',
    },
    {
      icon: '🔐',
      title: 'Harden authentication flows',
      desc: 'OAuth2, refresh-token rotation, and CSRF protection come up in every security review.',
    },
  ],
};

const SKILL_REASONS: Record<string, string> = {
  react: 'Core library for modern frontend development',
  typescript: 'Typed JavaScript is now an industry baseline',
  node: 'Essential for backend JavaScript development',
  docker: 'Containerisation is expected in all DevOps-adjacent roles',
  aws: 'Most widely adopted cloud platform in production systems',
  graphql: 'Increasingly required alongside REST in API-heavy stacks',
  postgres: 'Dominant relational DB in modern backend engineering',
  redis: 'Standard for caching and session management at scale',
  nextjs: 'Industry standard React framework for production apps',
  tailwind: 'Utility-first CSS is the current dominant styling approach',
  jest: 'Ubiquitous testing framework across JS/TS stacks',
  python: 'Growing demand in data pipelines and ML-adjacent engineering',
  git: 'Version control proficiency is a universal expectation',
  cicd: 'Automated pipelines are required at virtually every engineering team',
  kubernetes: 'Container orchestration is a must-have for senior DevOps/backend roles',
};

const LEARNING_RESOURCES: Record<string, LearningMeta> = {
  react: {
    time: '2–4 weeks',
    resources: ['React official docs', 'Frontend Masters React course', 'Build a real project'],
  },
  typescript: {
    time: '2–3 weeks',
    resources: [
      'TypeScript Handbook',
      'Total TypeScript (Matt Pocock)',
      'Add TS to an existing project',
    ],
  },
  node: {
    time: '3–5 weeks',
    resources: ['Node.js official docs', 'Express crash course', 'Build a REST API from scratch'],
  },
  docker: {
    time: '1–2 weeks',
    resources: [
      'Docker Getting Started',
      'KodeKloud Docker course',
      'Dockerise a personal project',
    ],
  },
  aws: {
    time: '4–6 weeks',
    resources: ['AWS Cloud Practitioner (free)', 'A Cloud Guru', 'Deploy a static site on S3'],
  },
  graphql: {
    time: '2–3 weeks',
    resources: ['GraphQL.org docs', 'Apollo GraphQL tutorial', 'Replace one REST route'],
  },
  postgres: {
    time: '2–4 weeks',
    resources: ['PostgreSQL Tutorial', 'pgexercises.com', 'Optimise a slow query with EXPLAIN'],
  },
  redis: {
    time: '1–2 weeks',
    resources: ['Redis University (free)', 'Add Redis caching to an API', 'Redis official docs'],
  },
  nextjs: {
    time: '2–3 weeks',
    resources: ['nextjs.org/learn', 'Next.js 14 full course (YT)', 'Migrate a CRA project'],
  },
  tailwind: {
    time: '1 week',
    resources: ['Tailwind CSS docs', 'Tailwind UI component study', 'Restyle a personal project'],
  },
  jest: {
    time: '1–2 weeks',
    resources: ['Jest docs', 'Testing Library guides', 'Reach 80 % coverage on one module'],
  },
  python: {
    time: '4–6 weeks',
    resources: ['Python.org tutorial', 'Kaggle micro-courses', 'Build a data script + deploy'],
  },
  git: {
    time: '1 week',
    resources: ['Pro Git book (free)', 'Oh My Git! (interactive)', 'Practice rebase workflows'],
  },
  cicd: {
    time: '2–3 weeks',
    resources: ['GitHub Actions docs', 'CircleCI free tier', 'Set up lint → test → deploy'],
  },
  kubernetes: {
    time: '4–6 weeks',
    resources: ['Kubernetes.io tutorials', 'KodeKloud K8s course', 'Run a local Minikube cluster'],
  },
};

const DEFAULT_RESOURCE: LearningMeta = {
  time: '2–4 weeks',
  resources: ['Search on Coursera', 'LinkedIn Learning', 'Build a small project'],
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

export default function RecommendationsTab({ domain, missing, analyzed }: RecommendationsTabProps) {
  if (!analyzed) {
    return (
      <p className="text-sm text-slate-400">
        Run an analysis first to see personalised recommendations.
      </p>
    );
  }

  const suggestions = SUGGESTIONS_DB[domain] ?? SUGGESTIONS_DB.fullstack;

  const MOCK_MISSING: Record<Domain, Skill[]> = {
    frontend: [
      { name: 'react', level: 'intermediate', category: 'frontend' },
      { name: 'typescript', level: 'beginner', category: 'frontend' },
      { name: 'nextjs', level: 'beginner', category: 'frontend' },
      { name: 'jest', level: 'beginner', category: 'testing' },
      { name: 'tailwind', level: 'intermediate', category: 'frontend' },
      { name: 'graphql', level: 'beginner', category: 'api' },
    ],
    backend: [
      { name: 'node', level: 'intermediate', category: 'backend' },
      { name: 'postgres', level: 'beginner', category: 'database' },
      { name: 'redis', level: 'beginner', category: 'database' },
      { name: 'docker', level: 'beginner', category: 'devops' },
      { name: 'aws', level: 'beginner', category: 'cloud' },
      { name: 'cicd', level: 'beginner', category: 'devops' },
    ],
    fullstack: [
      { name: 'react', level: 'intermediate', category: 'frontend' },
      { name: 'node', level: 'intermediate', category: 'backend' },
      { name: 'docker', level: 'beginner', category: 'devops' },
      { name: 'aws', level: 'beginner', category: 'cloud' },
      { name: 'cicd', level: 'beginner', category: 'devops' },
      { name: 'kubernetes', level: 'beginner', category: 'devops' },
    ],
  };

  const fallback = MOCK_MISSING[domain] ?? MOCK_MISSING.fullstack;

  const topMissing = missing.length > 0 ? missing.slice(0, 10) : fallback.slice(0, 6);
  return (
    <section className="animate-[fadeIn_.25s_ease] space-y-8">
      <div>
        <Heading variant="h4" className="mb-1 text-slate-800">
          Recommended Improvements
        </Heading>

        <Typography variant="p" size="sm" className="text-slate-400">
          Prioritised learning path based on your profile and the target role.
        </Typography>
      </div>

      {/* ── Suggestions ───────────────────── */}
      <section>
        <Typography
          variant="p"
          size="xs"
          className="mb-3 font-bold tracking-wide text-slate-400 uppercase"
        >
          Learning priorities for {domain} roles
        </Typography>

        <div className="grid gap-3 sm:grid-cols-2">
          {suggestions.map((s) => (
            <Card
              key={s.title}
              className="cursor-default flex-row items-start gap-3 p-4 transition-all hover:border-indigo-300 hover:bg-indigo-50/30"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg">
                {s.icon}
              </div>

              <CardContent className="p-0">
                <CardTitle className="mb-0.5 text-sm text-slate-700">{s.title}</CardTitle>

                <Typography variant="p" size="xs" className="text-slate-400">
                  {s.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Missing Skills ───────────────────── */}
      <section>
        <div className="mb-6 h-px bg-slate-100" />

        <Typography
          variant="p"
          size="xs"
          className="mb-3 font-bold tracking-wide text-slate-400 uppercase"
        >
          Missing skills — learning cards
        </Typography>

        {missing.length === 0 && (
          <Typography variant="p" size="xs" className="mb-3 text-slate-400">
            Showing sample recommendations based on {domain} role
          </Typography>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topMissing.map((skill) => {
            const priority = getPriority(skill);
            const lr = LEARNING_RESOURCES[skill.name] ?? DEFAULT_RESOURCE;
            const reason = SKILL_REASONS[skill.name] ?? `High demand skill in ${domain} roles`;

            return (
              <Card
                key={skill.name}
                className="transition-all hover:border-indigo-200 hover:shadow-md"
              >
                <CardHeader className="mb-2 p-0">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm text-slate-800 capitalize">
                      {skill.name}
                    </CardTitle>
                    <PriorityBadge priority={priority} />
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <Typography variant="p" size="xs" className="mb-4 text-slate-400">
                    {reason}
                  </Typography>

                  <div className="mb-4 flex items-center gap-1.5">
                    <Typography variant="span" size="xs" className="text-slate-400">
                      Est. time:
                    </Typography>

                    <Typography variant="span" size="xs" className="font-semibold text-indigo-600">
                      {lr.time}
                    </Typography>
                  </div>

                  <Typography
                    variant="p"
                    size="xs1"
                    className="mb-2 font-bold tracking-widest text-slate-300 uppercase"
                  >
                    Resources
                  </Typography>

                  <ul className="space-y-1">
                    {lr.resources.map((r) => (
                      <li key={r} className="flex items-start gap-1.5">
                        <Typography
                          variant="span"
                          size="xs"
                          className="mt-0.5 shrink-0 text-slate-300"
                        >
                          •
                        </Typography>

                        <Typography variant="span" size="xs" className="text-slate-500">
                          {r}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </section>
  );
}
