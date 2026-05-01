/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpen, ExternalLink } from 'lucide-react';
import { useResume } from './ResumeContext';

const PublicationsSection = () => {
  const { config, data } = useResume();
  const publications = data.publications || [];
  const {
    projects: { citationFormat = 'apa' },
  } = config;

  const formatCitation = (pub: any) => {
    const year = new Date(pub.releaseDate).getFullYear();

    switch (citationFormat) {
      case 'ieee':
        return `[1] ${pub.name}, ${pub.publisher}, ${year}.`;
      case 'mla':
        return `"${pub.name}." ${pub.publisher}, ${year}.`;
      case 'apa':
      default:
        return `(${year}). ${pub.name}. ${pub.publisher}.`;
    }
  };

  return (
    <section className="section mt-4">
      <h2 className="heading2">Publications</h2>

      {publications.map((pub: any, index: number) => (
        <div key={index} className="flex flex-col">
          <div className="mb-2 flex items-start justify-between">
            <div className="flex items-center text-(--text-accent)">
              <BookOpen size={18} className="mr-2" />
              <span className="font-bold tracking-wider">{pub.publisher}</span>
            </div>
            {pub.url && (
              <a href={pub.url} target="_blank" rel="noreferrer" className="text-(--text-accent)">
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          <p className="font-bold">{pub.name}</p>

          <p className="italic">{formatCitation(pub)}</p>

          {pub.summary && <p className="line-clamp-3">{pub.summary}</p>}
        </div>
      ))}
    </section>
  );
};

export default PublicationsSection;
