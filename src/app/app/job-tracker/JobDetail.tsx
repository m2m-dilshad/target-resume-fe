'use client';

import { useState } from 'react';
import { X, ExternalLink, Edit2, Clock, MapPin, DollarSign, User, Trash2 } from 'lucide-react';

import AddJobModal from './AddJobModal';
import { Job, STATUS_CONFIG } from '../utils/misc.data';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import Heading from '@/components/ui/Heading';
import { deleteJobAction, updateJobStatusAction } from '@/actions/app/job.actions';
import { useEffect } from 'react';

interface JobDetailProps {
  job: Job;
  onClose: () => void;
  onStatusChange?: (jobId: string, status: Job['status']) => void;
  onDelete?: (jobId: string) => void;
  onEdit?: (job: Job) => void;
}

const STATUS_ORDER: Job['status'][] = ['applied', 'interview', 'offer', 'rejected'];

export default function JobDetail({
  job,
  onClose,
  onStatusChange,
  onDelete,
  onEdit,
}: JobDetailProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(job.status);

  useEffect(() => {
    setCurrentStatus(job.status);
  }, [job]);

  const cfg = STATUS_CONFIG[currentStatus];

  const isOverdue = (() => {
    if (!job.followUpReminder || job.status === 'rejected') return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reminder = new Date(job.followUpReminder);
    reminder.setHours(0, 0, 0, 0);

    return reminder < today;
  })();

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '—';

  async function handleStatusChange(status: Job['status']) {
    if (status === currentStatus) return;

    setCurrentStatus(status);

    const res = await updateJobStatusAction(job.jobId, status);

    if (res.success) {
      onStatusChange?.(job.jobId, status);
    } else {
      setCurrentStatus(job.status);
    }
  }

  const handleDelete = async () => {
    const confirmDelete = confirm('Delete this job?');
    if (!confirmDelete) return;

    const res = await deleteJobAction(job.jobId);

    if (res.success) {
      onDelete?.(job.jobId);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />

      <div className="fixed top-0 right-0 z-50 flex h-screen w-105 flex-col border-l border-gray-100 bg-white shadow-2xl">
        <div className={`h-1 w-full ${cfg.bar}`} />

        <div className="border-b border-gray-100 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Typography variant="span" size="sm" className="text-gray-500">
                {job.company}
              </Typography>

              <Heading variant="h3" className="font-semibold">
                {job.jobTitle}
              </Heading>
            </div>

            <div className="flex gap-1">
              <Button theme="ghost" roundSize="sm" onClick={() => setShowEdit(true)}>
                <Edit2 size={14} />
              </Button>

              <Button theme="ghost" roundSize="sm" onClick={handleDelete}>
                <Trash2 size={14} />
              </Button>

              <Button theme="ghost" roundSize="sm" onClick={onClose}>
                <X size={14} />
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <Typography variant="span" className={`rounded-md px-2 py-1 font-medium ${cfg.color}`}>
              {cfg.label}
            </Typography>
          </div>
        </div>

        <div className="px-5 pt-4">
          <Typography
            variant="span"
            size="xs"
            className="font-semibold tracking-wide text-gray-500 uppercase"
          >
            Move to stage
          </Typography>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <div className="grid grid-cols-4 gap-2">
            {STATUS_ORDER.map((s) => {
              const sCfg = STATUS_CONFIG[s];

              return (
                <Button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`rounded-full border-transparent! px-3 py-1.5 text-[11px] font-medium transition-all ${
                    currentStatus === s
                      ? `${sCfg.color} border-transparent ${sCfg.hover}`
                      : `border-gray-200 bg-white text-gray-600 ${sCfg.hover}`
                  }`}
                >
                  {sCfg.label}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <Clock size={12} />
                <Typography size="xs1">Applied</Typography>
              </div>

              <Typography size="sm">{formatDate(job.dateApplied)}</Typography>
            </div>

            {job.salaryRange && (
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <DollarSign size={12} />
                  <Typography size="xs1">Salary</Typography>
                </div>

                <Typography size="sm">{job.salaryRange}</Typography>
              </div>
            )}

            {job.location && (
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-1 text-gray-400">
                  <MapPin size={12} />
                  <Typography size="xs1">Location</Typography>
                </div>

                <Typography size="sm">{job.location}</Typography>
              </div>
            )}

            {job.recruiterName && (
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-1 text-gray-400">
                  <User size={12} />
                  <Typography size="xs1">Recruiter</Typography>
                </div>

                <Typography size="sm">{job.recruiterName}</Typography>
              </div>
            )}
          </div>

          {job.followUpReminder && (
            <div
              className={`rounded-lg border p-3 ${
                isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Typography size="sm" className="font-semibold">
                    {isOverdue ? 'Overdue follow-up' : 'Follow-up'}
                  </Typography>

                  <Typography size="xs">{formatDate(job.followUpReminder)}</Typography>
                </div>

                <Clock size={16} />
              </div>
            </div>
          )}

          {job.jobListingUrl && (
            <div>
              <Typography size="sm" className="mb-1 text-gray-400">
                Job Listing
              </Typography>

              <a
                href={job.jobListingUrl}
                target="_blank"
                className="flex items-center gap-2 text-sm text-blue-800 hover:underline"
              >
                <ExternalLink size={12} />
                <span className="truncate">{job.jobListingUrl}</span>
              </a>
            </div>
          )}

          {job.notes && (
            <div>
              <Typography size="sm" className="mb-1 text-gray-400">
                Notes
              </Typography>

              <Typography size="xs" className="rounded-lg bg-gray-50 p-3 text-gray-600">
                {job.notes}
              </Typography>
            </div>
          )}
        </div>
      </div>

      {showEdit && (
        <AddJobModal
          editJob={job}
          onClose={() => setShowEdit(false)}
          onUpdate={(updatedJob) => {
            onEdit?.(updatedJob);
            setShowEdit(false);
          }}
        />
      )}
    </>
  );
}
