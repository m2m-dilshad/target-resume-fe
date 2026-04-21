'use client';

import { Job, STATUS_CONFIG } from '../utils/misc.data';
import Search from '@/components/Search';
import Button from '@/components/ui/Button';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import JobDetail from './JobDetail';
import PaginationControls from '../_components/PaginationControls';

type Props = {
  data: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};

type SortKey = 'company' | 'status' | 'dateApplied';

export default function JobTable({ data, setJobs }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const query = searchParams.get('query') || '';
  const status = searchParams.get('status') || 'all';

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('dateApplied');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const toggleSort = (key: SortKey) => {
    setPage(1);
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filtered = data
    .filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.jobTitle.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = status === 'all' || job.status === status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  const hasNext = start + PAGE_SIZE < filtered.length;

  const setStatus = (value: string) => {
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all') params.delete('status');
    else params.set('status', value);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const today = new Date();

  const followUpLabel = (date?: string) => {
    if (!date) return null;

    const isOverdue = new Date(date) < today;

    return <span className={isOverdue ? 'text-red-500' : 'text-gray-500'}>{formatDate(date)}</span>;
  };

  function StatusBadge({ status, size = 'sm' }: { status: Job['status']; size?: 'sm' | 'md' }) {
    const styles = {
      applied: 'bg-gray-100 text-gray-700',
      interview: 'bg-orange-100 text-orange-600',
      offer: 'bg-green-100 text-green-600',
      rejected: 'bg-red-100 text-red-600',
    };

    return (
      <span
        className={`rounded-md font-medium capitalize ${styles[status]} ${
          size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
        }`}
      >
        {status}
      </span>
    );
  }

  function Sort({ k }: { k: SortKey }) {
    if (k !== sortKey) return <span className="text-[10px] opacity-30">↑↓</span>;

    return <span className="text-[10px] text-gray-700">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  }

  const columns: { key: SortKey | null; label: string }[] = [
    { key: 'company', label: 'Company / Role' },
    { key: 'status', label: 'Status' },
    { key: 'dateApplied', label: 'Applied' },
    { key: null, label: 'Follow-up' },
    { key: null, label: 'Salary' },
  ];

  return (
    <div>
      <div className="mt-4 mb-4 flex flex-wrap items-center gap-3">
        <div className="max-w-sm min-w-55 flex-1">
          <Search placeholder="Search company, role..." className="h-8 text-xs" />
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 'applied', 'interview', 'offer', 'rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-lg border px-3 py-1.5 text-xs whitespace-nowrap transition ${
                status === s
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      </div>
      <div className="card overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto bg-white">
          <table className="w-full text-[13px]">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-gray-200">
                {columns.map(({ key, label }) => (
                  <th
                    key={label}
                    onClick={() => key && toggleSort(key)}
                    className={`px-5 py-3 text-left text-[11px] font-semibold tracking-wide text-gray-700 uppercase ${
                      key ? 'cursor-pointer select-none hover:text-gray-900' : ''
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {key && <Sort k={key} />}
                    </span>
                  </th>
                ))}
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[13px] text-gray-500">
                    No applications found
                  </td>
                </tr>
              )}

              {paginated.map((job) => (
                <tr
                  key={job.jobId}
                  onClick={() => setSelectedJob(job)}
                  className={`} cursor-pointer border-b border-gray-50 transition last:border-0 hover:bg-gray-100`}
                >
                  <td className="px-5 py-3.5">
                    <div>
                      <div className="font-medium text-gray-900">{job.company}</div>
                      <div className="text-[12px] text-gray-500">{job.jobTitle}</div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <StatusBadge status={job.status} />
                  </td>

                  <td className="px-5 py-3.5 text-gray-500">{formatDate(job.dateApplied)}</td>

                  <td className="px-5 py-3.5">
                    {job.followUpReminder ? (
                      followUpLabel(job.followUpReminder)
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 text-gray-700">
                    {job.salaryRange || <span className="text-gray-300">—</span>}
                  </td>

                  <td className="px-5 py-3.5">
                    <Button
                      theme="ghost"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedJob && (
          <JobDetail
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onStatusChange={(jobId, status) => {
              setJobs((prev) => prev.map((j) => (j.jobId === jobId ? { ...j, status } : j)));
            }}
            onDelete={(jobId) => {
              setJobs((prev) => prev.filter((j) => j.jobId !== jobId));
            }}
            onEdit={(updatedJob) => {
              setJobs((prev) => prev.map((j) => (j.jobId === updatedJob.jobId ? updatedJob : j)));
            }}
          />
        )}
      </div>
      {filtered.length > 0 && (
        <PaginationControls
          key={`${query}-${status}-${sortKey}-${sortOrder}`}
          page={page}
          hasNext={hasNext}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      )}
    </div>
  );
}
