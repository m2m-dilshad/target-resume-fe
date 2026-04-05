'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, RotateCcw, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import {
  FilterState,
  FilterCategory,
  FILTER_CONFIG,
  Template,
} from '../_constants/templates.types';
import SuggestTemplateWizard from '../_components/SuggestTemplateWizard';
import { fetchTemplates } from '@/actions/app/templates.actions';
import PaginationControls from '../_components/PaginationControls';

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    structure: [],
    design: [],
    layout: [],
  });
  const [page, setPage] = useState(1);
  const limit = 8;
  const resetFilters = () => {
    setFilters({ structure: [], design: [], layout: [] });
    setPage(1);
  };

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);

      const offset = (page - 1) * limit;

      const res = await fetchTemplates({
        offset,
        limit,
        filters,
      });

      if (res.success) {
        setTemplates(res.data || []);
      }

      setLoading(false);
    };

    loadTemplates();
  }, [filters, page]);

  const toggleFilter = (category: FilterCategory, value: string) => {
    setFilters((prev) => {
      const list = prev[category] as string[];
      const newList = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

      return { ...prev, [category]: newList };
    });
    setPage(1);
  };

  const activeFilterCount =
    filters.structure.length + filters.design.length + filters.layout.length;

  if (loading) {
    return (
      <Typography variant="p" className="py-10 text-center">
        Loading templates...
      </Typography>
    );
  }
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Heading variant="h5" className="text-primary mb-2">
            Templates Library
          </Heading>
          <Typography variant="span" size="xs" className="text-muted-foreground">
            Pick a layout that best showcases your career path
          </Typography>
        </div>
        <Button size="base" className="max-w-xs" onClick={() => setIsWizardOpen(true)}>
          Suggest Template
        </Button>
      </div>

      <div className="border-border bg-background/95 sticky top-0 z-20 mb-10 border-y py-2">
        <div className="flex flex-wrap items-center gap-6">
          <div className="border-border flex items-center gap-2 border-r pr-6 text-sm font-semibold">
            <span className="bg-primary flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white">
              {activeFilterCount}
            </span>
            Filters
          </div>

          {(Object.keys(FILTER_CONFIG) as FilterCategory[]).map((category) => (
            <div key={category} className="group relative">
              <button className="hover:text-primary flex items-center gap-2 text-sm font-medium capitalize transition-colors">
                {category}
                <ChevronDown size={14} />
              </button>
              <div className="border-border absolute top-full left-0 mt-2 hidden w-56 flex-col rounded-xl border bg-white p-2 shadow-xl group-hover:flex">
                {FILTER_CONFIG[category].map((option) => {
                  const isSelected = (filters[category] as string[]).includes(option);
                  return (
                    <label
                      key={option}
                      className={`hover:bg-muted flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        isSelected ? 'bg-primary/10 text-primary font-semibold' : ''
                      }`}
                    >
                      {option}
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => toggleFilter(category, option)}
                      />
                      {isSelected && <X size={14} />}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {activeFilterCount > 0 && (
            <Button
              onClick={resetFilters}
              theme="warning"
              size="xs"
              className="flex w-fit items-center capitalize"
            >
              <RotateCcw size={12} className="mr-1" /> Reset All
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group border-border hover:border-primary relative flex flex-col rounded-2xl border p-4 transition-all hover:shadow-xl"
          >
            <div className="relative mb-5 aspect-3/4 w-full overflow-hidden rounded-lg bg-gray-100">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Button size="sm">Use Template</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Heading variant="h6">{template.name}</Heading>
              <span className="text-muted-foreground text-[10px] font-bold uppercase">
                {template.design}
              </span>
            </div>
            <Typography variant="p" className="text-muted-foreground mt-1 text-xs">
              {template.structure} • {template.layout}
            </Typography>
          </div>
        ))}
      </div>
      {templates.length === 0 && (
        <div className="flex flex-col items-center py-20 text-center">
          <Heading variant="h4">No matches found</Heading>
          <p className="text-muted-foreground">Try clearing your filters.</p>
        </div>
      )}
      <PaginationControls
        page={page}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => p + 1)}
        hasNext={templates.length === limit}
      />
      <SuggestTemplateWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onApplyFilters={(recommended) => setFilters(recommended)}
      />
    </div>
  );
}
