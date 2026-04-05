import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
type PaginationControlsProps = {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
};

export default function PaginationControls({
  page,
  onPrev,
  onNext,
  hasNext,
}: PaginationControlsProps) {
  return (
    <div className="mt-12 flex items-center justify-center gap-6">
      <Button
        theme="ghost"
        size="sm"
        className="w-auto px-3 py-1 text-gray-600 hover:text-black disabled:opacity-40"
        onClick={onPrev}
        disabled={page === 1}
      >
        <ArrowBigLeft />
      </Button>
      <Typography variant="span" className="text-sm text-gray-500">
        Page-
        <Typography variant="span" className="font-semibold text-gray-800">
          {page}
        </Typography>
      </Typography>

      <Button
        theme="ghost"
        size="sm"
        className="w-auto px-3 py-1 text-gray-600 hover:text-black disabled:opacity-40"
        onClick={onNext}
        disabled={!hasNext}
      >
        <ArrowBigRight />
      </Button>
    </div>
  );
}
