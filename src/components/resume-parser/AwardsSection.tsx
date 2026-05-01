/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
// import { Heart, Trophy, ExternalLink } from 'lucide-react';
import { useResume } from './ResumeContext';

const AwardsSection = () => {
  const { config, data } = useResume();
  const awards = data.awards || [];
  const {
    volunteering: { awardsDatePosition = 'right', awardsHighlightTitle = true },
  } = config;

  return (
    <section className="section mt-4">
      <h2 className="heading2 flex items-center space-x-2">
        {/* <Trophy size={20} /> */}
        <span className="">Honors & Awards</span>
      </h2>
      {/* Awards Sub-section (if data exists) */}
      {awards.length > 0 && (
        <div className="space-y-4">
          <div className="grid gap-4">
            {awards.map((award: any, i: number) => (
              <div
                key={i}
                className={`flex ${awardsDatePosition === 'right' ? 'items-center justify-between' : 'flex-col'} `}
              >
                <div>
                  <h4 className={`${awardsHighlightTitle ? 'font-bold' : 'text font-medium'}`}>
                    {award.title}
                  </h4>
                  <p className="">{award.awarder}</p>
                  {awardsDatePosition === 'below' && <span className="">{award.date}</span>}
                </div>
                {awardsDatePosition === 'right' && <span className="">{award.date}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AwardsSection;
