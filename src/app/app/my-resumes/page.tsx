'use client';

import {
  deleteSelectedResumesAction,
  downloadResumeAction,
  fetchResumesAction,
} from '@/actions/app/resumes.actions';

import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';

import { Resume } from '@/types/resume.types';
import {
  CheckSquare,
  Clock,
  Download,
  Edit,
  FileText,
  FileWarning,
  Filter,
  Plus,
  Square,
  Trash2,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import Search from '@/components/Search';
import { useSearchParams } from 'next/navigation';
import { getScoreColor } from '../utils/misc.functions';
import RangeFilter from '@/components/RangeFilter';
import DateRange from '@/components/DateRange';
import ConfirmModal from '@/components/ConfirmModal';
/* TODO:
   3. Add route for editing resumes
*/

export default function MyResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [toggleATS, setToggleATS] = useState(false);
  const [toggleDate, setToggleDate] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const atsScore = searchParams.get('atsScore') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  useEffect(() => {
    let isActive = true;

    const fetchResumes = async () => {
      setLoading(true);

      try {
        const response = await fetchResumesAction({
          offset: 0,
          limit: 20,
          searchParams: { query, atsScore, startDate, endDate },
        });

        if (isActive && response.success && response.data) {
          setResumes(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch resumes:', error);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchResumes();

    return () => {
      isActive = false;
    };
  }, [query, atsScore, startDate, endDate]);

  const handleDeleteSelected = () => {
    if (!selectedIds.size) return;
    setShowDeleteModal(true);
  };

  const handleDownload = async (ids: string[]) => {
    const res = await downloadResumeAction(ids);

    if (res.success) {
      alert(`Downloaded ${res.data.length} resume(s)`);
    }
  };

  const confirmDelete = async () => {
    const res = await deleteSelectedResumesAction(Array.from(selectedIds));

    if (res.success && res.data) {
      setResumes(res.data);
      setSelectedIds(new Set());
    }

    setShowDeleteModal(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Heading variant="h3" className="text-primary mb-2">
            My Resumes
          </Heading>
          <Typography variant="span" size="xs" className="text-muted-foreground">
            Manage, edit and track all your resume versions.
          </Typography>
        </div>
        <Button variant="link" href="/app/resume-builder" className="flex w-fit items-center px-4">
          <Plus size={16} className="mr-2" />
          Create New Resume
        </Button>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:flex-row">
        <div className="w-full sm:w-96">
          <Search placeholder="Search by title..." />
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          {selectedIds.size > 0 && (
            <Button
              onClick={handleDeleteSelected}
              roundSize="sm"
              theme="warning"
              className="flex w-fit items-center gap-2 whitespace-nowrap"
            >
              <Trash2 size={18} />
              Delete ({selectedIds.size})
            </Button>
          )}
          <ConfirmModal
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
            confirmText="Delete"
          >
            <div className="flex items-start gap-3">
              <FileWarning className="text-warning" />
              <div>
                <Typography variant="p" size="sm" className="text-sm text-gray-700">
                  You’re about to delete <span className="font-semibold">{selectedIds.size}</span>{' '}
                  {selectedIds.size === 1 ? 'resume' : 'resumes'}.
                </Typography>
                <Typography variant="p" size="xs" className="mt-1 text-xs text-gray-500">
                  This action is permanent and cannot be undone.
                </Typography>
              </div>
            </div>
          </ConfirmModal>

          <div className="relative flex flex-wrap gap-2">
            {/* Date Filter */}
            <div className="relative">
              <Button
                theme="ghost"
                onClick={() => {
                  setToggleDate(!toggleDate);
                  setToggleATS(false);
                }}
                className={`flex items-center gap-2 border border-gray-400 px-4 py-2 text-sm transition-all duration-150 ${
                  toggleDate
                    ? 'text-primary border-primary rounded-t-xl rounded-b-none bg-white shadow-sm ring-1 ring-gray-100'
                    : 'rounded-xl bg-gray-50 text-gray-600 ring-1 ring-transparent hover:bg-white hover:shadow-sm hover:ring-gray-100'
                }`}
              >
                <Filter size={18} />
                Date
              </Button>

              {toggleDate && (
                <div className="absolute top-full right-0 z-50 w-72 rounded-t-none rounded-b-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100">
                  <DateRange />
                </div>
              )}
            </div>

            {/* ATS Filter */}
            <div className="relative">
              <Button
                theme="ghost"
                onClick={() => {
                  setToggleATS(!toggleATS);
                  setToggleDate(false);
                }}
                className={`flex items-center gap-2 border border-gray-400 px-4 py-2 text-sm transition-all duration-150 ${
                  toggleATS
                    ? 'text-primary border-primary rounded-t-xl rounded-b-none bg-white shadow-sm ring-1 ring-gray-100'
                    : 'rounded-xl bg-gray-50 text-gray-600 ring-1 ring-transparent hover:bg-white hover:shadow-sm hover:ring-gray-100'
                }`}
              >
                <Filter size={18} />
                ATS
              </Button>

              {toggleATS && (
                <div className="absolute top-full right-0 z-50 w-72 rounded-t-none rounded-b-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100">
                  <RangeFilter />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {loading && (
          <Typography variant="span" size="sm" className="text-muted-foreground">
            Loading resumes...
          </Typography>
        )}

        {!loading && resumes.length === 0 && (
          <Typography variant="span" size="sm" className="text-muted-foreground">
            No resumes found.
          </Typography>
        )}

        {!loading &&
          resumes.map((resume) => (
            <div
              key={resume.id}
              className="group hover:border-primary flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Button
                  theme="ghost"
                  onClick={() => toggleSelect(resume.id)}
                  className="hover:text-primary w-fit text-gray-400"
                >
                  {selectedIds.has(resume.id) ? (
                    <CheckSquare size={22} className="text-primary" />
                  ) : (
                    <Square size={22} />
                  )}
                </Button>
                <div className="group-hover:bg-primary hidden h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-all duration-200 group-hover:text-white sm:flex">
                  <FileText size={24} />
                </div>
                <div>
                  <Typography variant="span" size="sm" className="font-medium">
                    {resume.title}
                  </Typography>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <Typography variant="span" size="xs">
                      {resume.targetJob}
                    </Typography>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock size={14} /> {resume.lastModified}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden border-x border-gray-100 px-6 text-center md:block">
                  <div className="text-[10px] font-bold tracking-tighter text-gray-400 uppercase">
                    ATS Match
                  </div>
                  <div className={`text-xl font-black ${getScoreColor(resume.score)}`}>
                    {resume.score}%
                  </div>
                </div>
                <Button
                  variant="link"
                  href="/app/resumes/edit/${resume.id}"
                  theme="ghost"
                  className="hover:text-primary w-fit rounded-lg p-2 text-gray-400 transition-all hover:bg-purple-50"
                  title="Edit"
                >
                  <Edit size={18} />
                </Button>
                <Button
                  theme="ghost"
                  className="hover:text-primary w-fit rounded-lg p-2 text-gray-400 transition-all hover:bg-purple-50"
                  title="Download"
                  onClick={() => handleDownload([resume.id])}
                >
                  <Download size={18} />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
