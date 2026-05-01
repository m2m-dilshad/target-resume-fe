/* eslint-disable @typescript-eslint/no-explicit-any */
import { LIST_BULLET_TYPES } from '@/lib/constants';
import { useResume } from './ResumeContext';

const SkillsSection = () => {
  const { config, data } = useResume();
  const sCfg = config.skills;

  // Helper to map string levels to numerical values
  const getLevelValue = (level: string) => {
    const map: Record<string, number> = {
      Master: 5,
      Expert: 5,
      Advanced: 4,
      Intermediate: 3,
      Beginner: 2,
      Novice: 1,
    };
    return map[level] || 3;
  };

  const renderSkillContent = (skill: any) => {
    const starCount = getLevelValue(skill.level);
    const barWidth = (starCount / 5) * 100;

    switch (sCfg.skillsLayout) {
      case 'pills':
        return (
          <div className="mt-1 flex flex-wrap gap-2">
            {skill.keywords.map((kw: string) => (
              <span key={kw} className="rounded border bg-gray-100 px-2 py-0.5 text-xs">
                {kw}
              </span>
            ))}
          </div>
        );
      case 'bars':
        return (
          <div className="mt-1 w-full">
            <div className="h-1.5 w-full rounded-full bg-gray-200">
              <div className="h-1.5 rounded-full bg-black" style={{ width: `${barWidth}%` }} />
            </div>
            <p className="mt-1 text-[10px] text-gray-500">{skill.keywords.join(', ')}</p>
          </div>
        );
      case 'stars':
        return (
          <div className="mt-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={s <= starCount ? 'text-black' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <p className="mt-1 text-[10px] text-gray-500">{skill.keywords.join(', ')}</p>
          </div>
        );
      case 'bullets':
        return (
          <ul
            className="mt-1"
            style={{
              listStyleType:
                LIST_BULLET_TYPES[config.component.bulletPoints as keyof typeof LIST_BULLET_TYPES],
              paddingLeft: config.component.bulletPoints === 'none' ? '' : '20px',
            }}
          >
            {skill.keywords.map((kw: string) => (
              <li key={kw}>{kw}</li>
            ))}
          </ul>
        );
      case 'grid':
        return (
          <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
            {skill.keywords.map((kw: string) => (
              <div key={kw}>• {kw}</div>
            ))}
          </div>
        );
      case 'text':
      default:
        return <p className="mt-1 text-sm">{skill.keywords.join(', ')}</p>;
    }
  };

  return (
    <section className="section mt-4">
      <h2 className="heading2">Skills</h2>
      <div className="space-y-4">
        {data.skills.map((skill: any, idx: number) => (
          <div key={idx}>
            {/* Category Header (Only if Grouping is ON) */}
            {sCfg.skillsGroupByCategory && (
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold tracking-wide uppercase">{skill.name}</h3>
                <span className="italic">{skill.level}</span>
              </div>
            )}
            {renderSkillContent(skill)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
