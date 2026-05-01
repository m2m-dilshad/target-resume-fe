export default function ScoreRing({ score }: { score: number }) {
  const SIZE = 120;
  const CENTER = SIZE / 2;
  const RADIUS = 50;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const safeScore = Math.max(0, Math.min(score, 100));
  const offset = CIRCUMFERENCE - (safeScore / 100) * CIRCUMFERENCE;

  let strokeColor = '#ef4444';
  if (safeScore >= 70) strokeColor = '#10b981';
  else if (safeScore >= 40) strokeColor = '#f59e0b';

  return (
    <div className="flex min-w-[160px] flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="relative h-[110px] w-[110px]">
        <svg
          width={110}
          height={110}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ transform: 'rotate(-90deg)' }}
          role="img"
          aria-label={`Match score: ${safeScore}%`}
        >
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#f1f5f9" strokeWidth={9} />

          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={strokeColor}
            strokeWidth={9}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)',
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tabular-nums" style={{ color: strokeColor }}>
            {safeScore}%
          </span>

          <span className="mt-0.5 text-[10px] font-medium text-slate-400">match</span>
        </div>
      </div>

      <p className="text-center text-[11px] font-medium text-slate-400">Overall Match Score</p>
    </div>
  );
}
