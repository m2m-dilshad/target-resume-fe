export type Priority = 'high' | 'medium' | 'low';

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const cls: Record<Priority, string> = {
    high: 'bg-red-50 text-red-700 border border-red-200',
    medium: 'bg-amber-50 text-amber-700 border border-amber-200',
    low: 'bg-slate-100 text-slate-500 border border-slate-200',
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${cls[priority]}`}
    >
      {priority}
    </span>
  );
}
