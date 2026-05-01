/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExternalLink, Calendar } from 'lucide-react';
import { useResume } from './ResumeContext';
import GithubIcon from '../svgs/Github';
import { LIST_BULLET_TYPES } from '@/lib/constants';

const ProjectsSection = () => {
  const { config, data } = useResume();
  const projects = data.projects || [];
  const {
    projects: {
      toolsStyle = 'pills',
      descStyle = 'bullets',
      showProjectLink = true,
      showGithubLink = true,
      showDate = true,
    },
  } = config;

  return (
    <section className="section mt-4">
      <h2 className="heading2">Projects</h2>

      {projects.map((project: any, index: number) => (
        <div key={index} className="flex flex-col space-y-3">
          {/* Header: Name & Links */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
              <p className="text-sm font-medium text-gray-600">{project.roles?.join(', ')}</p>
            </div>
            <div className="flex space-x-2">
              {showProjectLink && project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink size={18} />
                </a>
              )}
              {showGithubLink && project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:text-black"
                >
                  <GithubIcon />
                </a>
              )}
            </div>
          </div>

          {/* Date Range */}
          {showDate && project.startDate && (
            <div className="flex items-center text-xs text-gray-500 italic">
              <Calendar size={12} className="mr-1" />
              {new Date(project.startDate).getFullYear()} —{' '}
              {project.endDate ? new Date(project.endDate).getFullYear() : 'Present'}
            </div>
          )}

          {/* Description / Highlights */}
          <div className="text-sm text-gray-700">
            {descStyle === 'para' ? (
              <>
                <p>{project.description}</p>
                {project.highlights?.map((item: any, i: number) => (
                  <p key={i}>{item}</p>
                ))}
              </>
            ) : (
              <ul
                className="space-y-1"
                style={{
                  listStyleType:
                    LIST_BULLET_TYPES[
                      config.component.bulletPoints as keyof typeof LIST_BULLET_TYPES
                    ],
                  paddingLeft: config.component.bulletPoints === 'none' ? '' : '20px',
                }}
              >
                <li>{project.description}</li>
                {project.highlights?.map((item: any, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Tech Stack / Keywords */}
          {toolsStyle !== 'hide' && project.keywords && (
            <div
              className={`flex flex-wrap gap-2 pt-2 ${toolsStyle === 'inline' ? 'text-xs font-semibold' : ''}`}
            >
              {toolsStyle === 'inline' && <span className="text-gray-500">Stack:</span>}
              {project.keywords.map((tech: any, i: number) => (
                <span
                  key={i}
                  className={
                    toolsStyle === 'pills'
                      ? 'rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs text-gray-700'
                      : 'text-gray-800'
                  }
                >
                  {tech}
                  {toolsStyle === 'inline' && i < project.keywords.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default ProjectsSection;
