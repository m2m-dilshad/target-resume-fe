/* eslint-disable @typescript-eslint/no-explicit-any */
import { useResume } from './ResumeContext';

const LanguagesSection = () => {
  const { config, data } = useResume();
  const sCfg = config.skills;

  return (
    data.languages &&
    data.languages.length > 0 && (
      <section className="section mt-4">
        <h2 className="heading2">Languages</h2>
        <div className="space-y-4">
          <div
            className={
              sCfg.languagesLayout === 'columns'
                ? 'grid grid-cols-2 gap-4'
                : 'flex flex-wrap gap-x-4'
            }
          >
            {data.languages.map((lang: any, idx: number) => (
              <div key={idx} className="text-sm">
                <span className="font-semibold">{lang.language}</span>
                {sCfg.languagesShowProficiency && (
                  <span className="ml-1 text-gray-500">({lang.fluency})</span>
                )}
                {sCfg.languagesLayout === 'inline' && idx < data.languages.length - 1 && ','}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default LanguagesSection;
