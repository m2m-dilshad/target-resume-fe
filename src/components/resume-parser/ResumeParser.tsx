/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutDesigns } from './LayoutDesigns';
import ThemeFontAndColor from './ThemeFontAndColor';
import ZoomProvider from './ZoomProvider';

export default function ResumeParser({ config }: { config: any }) {
  const { template } = config;
  const LayoutDesign =
    LayoutDesigns[template.layout as keyof typeof LayoutDesigns] || LayoutDesigns.MODERN_HEADER;
  return (
    <ZoomProvider>
      <ThemeFontAndColor config={config}>
        <LayoutDesign>
          {/* HEADER SECTION */}
          <header className="mb-6">
            <h1 className="heading1">John Doe</h1>
            {config.header?.role?.visible === 'true' && (
              <p style={{ textAlign: config.header?.role?.alignment as any }}>Software Engineer</p>
            )}
            <div
              style={{
                textAlign: config.header?.contact?.alignment as any,
                marginTop: '10px',
                borderBottom:
                  config.design?.lines?.enabled === 'true'
                    ? `${config.design?.lines?.thickness} ${config.design?.lines?.style} ${config.colors?.accent}`
                    : 'none',
              }}
            >
              john.doe@example.com | +1 234 567 890 | San Francisco, CA
            </div>
          </header>
          {/* EXPERIENCE SECTION MOCKUP */}
          <section className="mt-4">
            <h2 className="heading2">Experience</h2>
            <div className="flex justify-between font-bold">
              <span>Senior Developer @ Tech Corp</span>
              {config.experience?.date_placement === 'right_aligned' && <span>2020 - Present</span>}
            </div>
            <ul
              style={{
                listStyleType:
                  config.design?.bullets?.type === 'none' ? 'none' : config.design?.bullets?.type,
                paddingLeft: '20px',
              }}
            >
              <li>Developed a high-scale resume builder platform.</li>
              <li>Optimized PDF generation by 40%.</li>
            </ul>
          </section>

          {/* SKILLS SECTION MOCKUP */}
          <section className="mt-4">
            <h2 className="heading2">Skills</h2>
            <div
              className={
                config.skills?.layout === 'pills' ? 'flex flex-wrap gap-2' : 'grid grid-cols-2'
              }
            >
              {['React', 'TypeScript', 'Node.js', 'GraphQL'].map((skill) => (
                <span
                  key={skill}
                  className={
                    config.skills?.layout === 'pills' ? 'rounded bg-gray-200 px-2 py-1' : ''
                  }
                >
                  {config.design?.bullets?.type !== 'none' && '• '} {skill}
                </span>
              ))}
            </div>
          </section>
          <div className="p-8">
            <h1 className="heading1 mb-4">John Doe</h1>
            <p className="mb-6">
              Software Engineer with 5+ years of experience in web development.
            </p>
            <h2 className="heading2 mb-3">Experience</h2>
            <div className="mb-4">
              <h3 className="heading3">Senior Developer at Tech Company</h3>
              <p>June 2020 - Present</p>
              <ul className="list-inside list-disc">
                <li>Lead a team of 5 developers to build scalable web applications.</li>
                <li>Implemented new features that increased user engagement by 20%.</li>
              </ul>
            </div>
          </div>
        </LayoutDesign>
      </ThemeFontAndColor>
    </ZoomProvider>
  );
}
