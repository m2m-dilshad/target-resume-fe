import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Button from './ui/Button';

export default function DateRange() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (startDate) {
      params.set('startDate', startDate);
    } else {
      params.delete('startDate');
    }

    if (endDate) {
      params.set('endDate', endDate);
    } else {
      params.delete('endDate');
    }

    replace(`${pathname}?${params.toString()}`);
  };
  const handleClear = () => {
    setStartDate('');
    setEndDate('');

    const params = new URLSearchParams(searchParams.toString());
    params.delete('startDate');
    params.delete('endDate');

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs font-medium text-gray-500">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="focus:ring-primary focus:ring-primary mt-1 w-full rounded-lg bg-gray-50 px-3 py-2 text-sm ring-1 ring-gray-100 focus:bg-white focus:ring-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="focus:ring-primary focus:ring-primary mt-1 w-full rounded-lg bg-gray-50 px-3 py-2 text-sm ring-1 ring-gray-100 focus:bg-white focus:ring-2 focus:outline-none"
        />
      </div>

      <div className="flex justify-between border-t border-gray-100 pt-2">
        <Button
          theme="ghost"
          size="xs"
          onClick={handleClear}
          className="text-gray-500 hover:text-black"
        >
          Clear
        </Button>

        <Button
          theme="ghost"
          size="xs"
          onClick={handleApply}
          className="text-gray-500 hover:text-black"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
