'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TextInput from './ui/TextInput';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Search({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState('');

  const query = searchParams.get('query') || '';

  useEffect(() => {
    setValue(query);
  }, [query]);

  const debouncedSearch = useDebounce(value, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set('query', debouncedSearch);
    } else {
      params.delete('query');
    }

    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    if (newUrl !== currentUrl) {
      replace(newUrl);
    }
  }, [debouncedSearch, pathname, replace, searchParams]);

  return (
    <TextInput
      icon={SearchIcon}
      type="text"
      placeholder={placeholder}
      value={value}
      className={cn('h-9 text-sm', className)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      }}
    />
  );
}
