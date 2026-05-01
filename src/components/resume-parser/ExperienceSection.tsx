/* eslint-disable @typescript-eslint/no-explicit-any */
import { LIST_BULLET_TYPES } from '@/lib/constants';
import { useResume } from './ResumeContext';

const ExperienceSection = () => {
  const { config, data } = useResume();
  const expConfig = config.experience;

  return (
    <section className="section mt-4">
      <h2 className="heading2">Experience</h2>
      {data.work.map((exp: any, index: number) => {
        return (
          <div key={index} className="mb-4">
            {/* LINE 1: Primary (Company Name) */}
            <div className="flex items-baseline justify-between font-bold">
              <div>
                <span>{exp.name}</span>
                {expConfig.locationPlacement === 'with_company' && ` - ${exp.location}`}
                {expConfig.positionPlacement === 'with_company' && ` - ${exp.position}`}
              </div>
              {expConfig.datePlacement === 'right_with_company' && (
                <span className="font-normal">
                  {exp.startDate} - {exp.endDate}
                </span>
              )}
            </div>

            {/* LINE 2: Secondary (Below Company) */}
            <div className="flex items-baseline justify-between italic">
              <div>
                {expConfig.locationPlacement === 'below_company' && <span>{exp.location}</span>}
                {expConfig.positionPlacement === 'below_company' && (
                  <span className={expConfig.locationPlacement === 'below_company' ? 'ml-1' : ''}>
                    {exp.position}
                  </span>
                )}
                {/* Location/Date combined with Position logic */}
                {expConfig.locationPlacement === 'with_position' && ` (${exp.location})`}
                {expConfig.datePlacement === 'with_position' &&
                  ` | ${exp.startDate} - ${exp.endDate}`}
              </div>
              {expConfig.datePlacement === 'right_with_position' && (
                <span className="font-normal not-italic">
                  {exp.startDate} - {exp.endDate}
                </span>
              )}
            </div>

            {/* LINE 3: Below Position (Special Case) */}
            {(expConfig.locationPlacement === 'below_position' ||
              expConfig.datePlacement === 'below_position') && (
              <div>
                {expConfig.locationPlacement === 'below_position' && <span>{exp.location}</span>}
                {expConfig.datePlacement === 'below_position' && (
                  <span className="ml-2">
                    {exp.startDate} - {exp.endDate}
                  </span>
                )}
              </div>
            )}
            {/* Summary */}
            {exp.summary && <p className="text-justify">{exp.summary}</p>}

            {/* Highlights */}
            <ul
              className="mt-1"
              style={{
                listStyleType:
                  LIST_BULLET_TYPES[
                    config.component.bulletPoints as keyof typeof LIST_BULLET_TYPES
                  ],
                paddingLeft: config.component.bulletPoints === 'none' ? '' : '20px',
              }}
            >
              {exp.highlights.map((h: string, i: number) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
};
export default ExperienceSection;
