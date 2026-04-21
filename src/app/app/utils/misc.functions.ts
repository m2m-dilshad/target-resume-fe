export function getScoreColor(score: number) {
  if (score >= 90) return 'text-success';
  if (score >= 75) return 'text-warning';
  if (score >= 60) return 'text-text-orange-500';
  return 'text-error';
}
