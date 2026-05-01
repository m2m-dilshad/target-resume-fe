export type TabType = 'analyze' | 'insights' | 'gaps' | 'recommendations';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Skill = {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  label?: string;
};

export const LEVEL_ORDER: Record<Level, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

export type AnalysisResult = {
  skills: Skill[];
  matched: Skill[];
  missing: Skill[];
  improve: Skill[];
  gaps: string[];
  recommendations: string[];
  score: number;
};
export const CAT_BAR_COLOR: Record<string, string> = {
  frontend: 'bg-indigo-500',
  backend: 'bg-emerald-500',
  devops: 'bg-amber-500',
  cloud: 'bg-sky-500',
  api: 'bg-violet-500',
  database: 'bg-rose-400',
  testing: 'bg-teal-500',
  language: 'bg-orange-400',
  tools: 'bg-slate-500',
  general: 'bg-slate-400',
};

export const CAT_CHIP: Record<string, string> = {
  frontend: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  backend: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  devops: 'bg-amber-50 text-amber-700 border-amber-200',
  cloud: 'bg-sky-50 text-sky-700 border-sky-200',
  api: 'bg-violet-50 text-violet-700 border-violet-200',
  database: 'bg-rose-50 text-rose-600 border-rose-200',
  testing: 'bg-teal-50 text-teal-700 border-teal-200',
  language: 'bg-orange-50 text-orange-700 border-orange-200',
  tools: 'bg-slate-100 text-slate-600 border-slate-200',
  general: 'bg-slate-100 text-slate-500 border-slate-200',
};
export const MOCK_SKILL_CATALOG: Record<string, Omit<Skill, 'name'>> = {
  react: { level: 'advanced', category: 'frontend' },
  typescript: { level: 'intermediate', category: 'frontend' },
  node: { level: 'intermediate', category: 'backend' },
  docker: { level: 'beginner', category: 'devops' },
  aws: { level: 'beginner', category: 'cloud' },
  graphql: { level: 'beginner', category: 'api' },
  postgres: { level: 'intermediate', category: 'database' },
  redis: { level: 'beginner', category: 'database' },
  nextjs: { level: 'intermediate', category: 'frontend' },
  tailwind: { level: 'intermediate', category: 'frontend' },
  jest: { level: 'intermediate', category: 'testing' },
  python: { level: 'beginner', category: 'language' },
  git: { level: 'advanced', category: 'tools' },
  cicd: { level: 'beginner', category: 'devops' },
  kubernetes: { level: 'beginner', category: 'devops' },
};

export const MOCK_RECOMMENDATIONS: Record<string, string> = {
  react: 'Build a React app with custom hooks and context to solidify advanced patterns.',
  typescript: 'Add strict TypeScript to an existing JS project — start with utility types.',
  node: 'Build a REST API with Express, authentication, and error-handling middleware.',
  docker: 'Containerise a Node app and push it to Docker Hub.',
  aws: 'Complete the AWS Cloud Practitioner free tier and deploy a static site on S3.',
  graphql: 'Replace a REST endpoint with GraphQL using Apollo Server.',
  postgres: 'Practice query optimisation on a local Postgres instance with pgAdmin.',
  redis: 'Add Redis-based caching to an existing API to reduce database load.',
  nextjs: 'Convert a CRA project to Next.js and enable SSR for a data-heavy page.',
  tailwind: 'Redesign a component library using Tailwind utility classes.',
  jest: 'Write unit + integration tests for a business-logic module with 80 %+ coverage.',
  python: 'Build a small data-processing script and deploy it as an AWS Lambda.',
  git: 'Practice rebase-based workflows and write meaningful commit messages.',
  cicd: 'Set up a GitHub Actions pipeline that runs tests and deploys on merge.',
  kubernetes: 'Deploy a multi-container app on a local Minikube cluster.',
};

export const MOCK_RESUME_SAMPLES: Record<string, string> = {
  frontend: `Jane Doe — Senior Frontend Developer
Skills: React, TypeScript, Next.js, Tailwind, Jest, Git
Experience: 5 years building scalable web applications.`,

  backend: `John Smith — Backend Engineer
Skills: Node, Python, PostgreSQL, Redis, Docker, Git
Experience: 4 years designing REST and GraphQL APIs.`,

  fullstack: `Alex Kim — Full Stack Engineer
Skills: React, Node, TypeScript, Docker, AWS, PostgreSQL, Git
Experience: 6 years across frontend and backend systems.`,

  default: `Sam Taylor — Software Engineer
Skills: React, Node, TypeScript, Docker, AWS, Git
Experience: 3 years building modern web applications.`,
};

export function extractSkillsFromText(text: string): Skill[] {
  const normalised = text.toLowerCase();
  return Object.entries(MOCK_SKILL_CATALOG)
    .filter(([keyword]) => normalised.includes(keyword))
    .map(([name, meta]) => ({ name, ...meta }));
}

export function computeImprove(resumeSkills: Skill[], jdSkills: Skill[]): Skill[] {
  const LEVEL_ORDER: Record<Level, number> = {
    beginner: 0,
    intermediate: 1,
    advanced: 2,
  };
  const jdMap = new Map(jdSkills.map((s) => [s.name, s]));
  return resumeSkills.filter((s) => {
    const jd = jdMap.get(s.name);
    return jd ? LEVEL_ORDER[s.level] < LEVEL_ORDER[jd.level] : false;
  });
}

export function getMockResumeText(filename: string): string {
  const lower = filename.toLowerCase();
  const match = Object.keys(MOCK_RESUME_SAMPLES).find(
    (key) => key !== 'default' && lower.includes(key)
  );
  return MOCK_RESUME_SAMPLES[match ?? 'default'];
}
