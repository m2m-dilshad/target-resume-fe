export function SingleColumnLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">{children}</div>;
}

export function LeftSidebarLayout({ children }: { children: React.ReactNode }) {
  const [header, ...rest] = children as React.ReactNode[];
  return (
    <div className="grid min-h-264 grid-cols-[30%_1fr] gap-8 p-8">
      <div className="border-r pr-8">{header}</div>
      <div>{rest}</div>
    </div>
  );
}

export function RightSidebarLayout({ children }: { children: React.ReactNode }) {
  const [header, ...rest] = children as React.ReactNode[];
  return (
    <div className="grid min-h-264 grid-cols-[1fr_30%] gap-8 p-8">
      <div>{header}</div>
      <div className="border-l pl-8">{rest}</div>
    </div>
  );
}

export function Split50_50Layout({ children }: { children: React.ReactNode }) {
  const [header, ...rest] = children as React.ReactNode[];
  return (
    <div className="grid min-h-264 grid-cols-2 gap-0">
      <div className="bg-slate-50 p-8">{header}</div>
      <div className="p-8">{rest}</div>
    </div>
  );
}

export function ModernHeaderLayout({ children }: { children: React.ReactNode }) {
  const [header, ...rest] = children as React.ReactNode[];
  return (
    <div className="p-0">
      <div className="mb-8 bg-slate-900 p-12 text-white">{header}</div>
      <div className="px-12 pb-12">{rest}</div>
    </div>
  );
}

export const LayoutDesigns = {
  SINGLE_COLUMN: SingleColumnLayout,
  LEFT_SIDEBAR: LeftSidebarLayout,
  RIGHT_SIDEBAR: RightSidebarLayout,
  SPLIT_50_50: Split50_50Layout,
  MODERN_HEADER: ModernHeaderLayout,
};

export const LOGICAL_STRUCTURES = {
  CHRONOLOGICAL: ['basics', 'work', 'education', 'skills', 'projects'],
  FUNCTIONAL: ['basics', 'skills', 'projects', 'work', 'education'],
  COMBINATION: ['basics', 'summary', 'skills', 'work', 'projects', 'education'],
  ACADEMIC: ['basics', 'education', 'publications', 'awards', 'volunteer', 'skills'],
  PROJECT_BASED: ['basics', 'projects', 'work', 'skills', 'education'],
};
