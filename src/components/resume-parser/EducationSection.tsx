/* eslint-disable @typescript-eslint/no-explicit-any */
import { useResume } from './ResumeContext';

const EducationSection = () => {
  const { config, data } = useResume();
  const eduConfig = config.experience; // References the config object you shared

  return (
    <section className="section mt-4">
      <h2 className="heading2">Education</h2>
      {data.education.map((edu: any, index: number) => {
        const isInstFirst = eduConfig.primaryDisplay === 'inst';
        const degreeString = `${edu.studyType} of ${edu.area}`;

        return (
          <div key={`edu-item-${index}`} className="mb-3 text-sm">
            {/* LINE 1: Primary Selection */}
            <div className="flex items-baseline justify-between font-bold">
              <span>{isInstFirst ? edu.institution : degreeString}</span>
              <span className="font-normal">
                {/* Formatting dates to show just years is common for edu */}
                {new Date(edu.startDate).getFullYear()} — {new Date(edu.endDate).getFullYear()}
              </span>
            </div>

            {/* LINE 2: Secondary Selection + GPA */}
            <div className="flex items-baseline justify-between italic">
              <span>{isInstFirst ? degreeString : edu.institution}</span>

              {eduConfig.showGPA && edu.score && (
                <span className="font-medium not-italic">GPA: {edu.score}</span>
              )}
            </div>

            {/* Optional: Courses (using your bullet point style) */}
            {edu.courses && edu.courses.length > 0 && (
              <div className="mt-1">
                <span className="font-semibold italic">Relevant Coursework: </span>
                {edu.courses.join(', ')}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default EducationSection;
