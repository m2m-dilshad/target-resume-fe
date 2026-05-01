import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RangeFilter() {
  const [scale, setScale] = useState(1);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (scale) {
      params.set('atsScore', (scale * 100).toFixed(0).toString());
    } else {
      params.delete('atsScore');
    }

    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    if (newUrl !== currentUrl) {
      replace(newUrl);
    }
  }, [pathname, replace, scale, searchParams]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">ATS Score</span>
        <span className="text-primary text-sm font-semibold">{(scale * 100).toFixed(0)}</span>
      </div>

      <input
        type="range"
        min="0.1"
        max="1"
        step="0.1"
        value={scale}
        onChange={handleSliderChange}
        className="accent-primary w-full cursor-pointer opacity-90 transition hover:opacity-100"
      />

      <div className="flex justify-between text-xs text-gray-400">
        <span>10</span>
        <span>100</span>
      </div>
    </div>
  );
}
