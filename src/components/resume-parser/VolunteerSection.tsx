/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExternalLink } from 'lucide-react';
import { useResume } from './ResumeContext';
import { LIST_BULLET_TYPES } from '@/lib/constants';

const VolunteerSection = () => {
  const { config, data } = useResume();
  const volunteer = data.volunteer || [];
  const {
    volunteering: { volLayout = 'role' },
  } = config;

  return (
    <section className="section mt-4">
      <h2 className="heading2">Volunteering</h2>
      {volunteer.map((work: any, index: number) => (
        <div key={index}>
          {/* className="group relative border-l-2 border-red-100 pl-4" */}
          {/* <Heart size={16} className="absolute top-1 -left-[9px] bg-white text-red-400" /> */}

          <div className="flex items-start justify-between">
            <div>
              {volLayout === 'role' ? (
                <>
                  <h3 className="font-bold">{work.position}</h3>
                  <p className="font-medium">{work.organization}</p>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{work.organization}</h3>
                  <p className="font-medium">{work.position}</p>
                </>
              )}
            </div>
            {work.url && (
              <a href={work.url} target="_blank" rel="noreferrer" className="">
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          <p className="my-1 italic">
            {new Date(work.startDate).getFullYear()} —{' '}
            {work.endDate ? new Date(work.endDate).getFullYear() : 'Present'}
          </p>

          <p className="mt-2">{work.summary}</p>
          {work.highlights && (
            <ul
              className="mt-1 space-y-1"
              style={{
                listStyleType:
                  LIST_BULLET_TYPES[
                    config.component.bulletPoints as keyof typeof LIST_BULLET_TYPES
                  ],
                paddingLeft: config.component.bulletPoints === 'none' ? '' : '20px',
              }}
            >
              {work.highlights.map((h: any, i: number) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default VolunteerSection;
