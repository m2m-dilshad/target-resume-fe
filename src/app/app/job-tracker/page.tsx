'use client';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { BriefcaseIcon, MessageSquare, Trophy, Bell, Plus } from 'lucide-react';
import { Job, jobData } from '../utils/misc.data';
import JobTable from './JobTable';
import Button from '@/components/ui/Button';
import AddJobModal from './AddJobModal';
import { useState } from 'react';

export default function JobTracker() {
  const [toggleAddJobModal, setToggleAddJobModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(jobData);

  const total = jobs.length;

  const interviews = jobs.filter((j) => j.status === 'interview').length;

  const offers = jobs.filter((j) => j.status === 'offer').length;

  const withFollowUp = jobs.filter((j) => j.followUpReminder);

  const today = new Date();

  const overdue = jobs.filter(
    (job) => job.followUpReminder && new Date(job.followUpReminder) < today
  );

  const offerRate = total ? Math.round((offers / total) * 100) : 0;

  const stats = [
    {
      label: 'Total applied',
      value: total,
      sub: 'All applications',
      color: '#2563EB',
      bg: 'bg-blue-50',
      icon: BriefcaseIcon,
      iconColor: 'text-blue-600',
      pct: 100,
    },
    {
      label: 'Interviews',
      value: interviews,
      sub: 'In progress',
      color: '#F97316',
      bg: 'bg-orange-50',
      icon: MessageSquare,
      iconColor: 'text-orange-500',
      pct: total ? (interviews / total) * 100 : 0,
    },
    {
      label: 'Offers',
      value: offers,
      sub: `${offerRate}% offer rate`,
      color: '#22C55E',
      bg: 'bg-green-50',
      icon: Trophy,
      iconColor: 'text-green-600',
      pct: offerRate,
    },
    {
      label: 'Follow-ups due',
      value: overdue.length,
      sub: `${withFollowUp.length} total reminders`,
      color: '#EF4444',
      bg: 'bg-red-50',
      icon: Bell,
      iconColor: 'text-red-500',
      pct: withFollowUp.length ? (overdue.length / withFollowUp.length) * 100 : 0,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Heading variant="h3" className="text-primary mb-2">
            Job Tracker
          </Heading>
          <Typography variant="span" size="xs" className="text-muted-foreground">
            Track your job search at a glance
          </Typography>
        </div>
        <Button
          className="flex w-fit items-center px-4"
          onClick={() => {
            setToggleAddJobModal(!toggleAddJobModal);
          }}
        >
          <Plus size={16} className="mr-2" />
          Create New Job Application
        </Button>
      </div>
      {toggleAddJobModal && <AddJobModal onClose={() => setToggleAddJobModal(false)} />}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, sub, color, bg, icon: Icon, iconColor, pct }) => (
          <Card key={label} className="p-2 transition hover:shadow-sm">
            <CardContent className="p-2">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-muted-foreground text-[11px] font-medium">{label}</span>

                <div className={`h-6 w-6 rounded-md ${bg} flex items-center justify-center`}>
                  <Icon size={12} className={iconColor} />
                </div>
              </div>
              <div className="mb-0.5 text-xl leading-none font-semibold" style={{ color }}>
                {value}
              </div>
              <div className="text-muted-foreground text-[11px]">{sub}</div>
              <div className="bg-muted mt-2 h-1 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full opacity-70 transition-all"
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    background: color,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <JobTable data={jobs} setJobs={setJobs} />
    </div>
  );
}
