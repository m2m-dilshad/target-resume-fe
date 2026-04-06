/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const ThemeFontAndColor = ({ config, children }: { config: any; children: React.ReactNode }) => {
  // Extract values from your schema structure
  const { typography, colors, page } = config;

  const dynamicStyles = {
    // Fonts
    '--heading-font': typography.headingFont,
    '--body-font': typography.bodyFont,
    '--body-font-size': typography.body?.size || '12px',
    '--body-line-height': typography.body?.lineHeight || '1.5',
    '--body-padding-top': (page?.margins?.topBottom || '1') + 'in',
    '--body-padding-bottom': (page?.margins?.topBottom || '1') + 'in',
    '--body-border': page?.borders?.allSides || 'none',
    '--heading-alignment': config.header?.name?.alignment || 'left',
    '--heading-case': config.typography?.headingPrimary?.case || 'none',
    '--heading-primary-size': typography.headingPrimary?.size || '24px',
    '--heading-secondary-size': typography.headingSecondary?.size || '20px',
    '--heading-tertiary-size': typography.headingTertiary?.size || '16px',
    // Colors
    '--primary-color': colors.primary || '#000',
    '--accent-color': colors.accent || '#0070f3',
    '--text-color': colors.text || '#000',
    '--sidebar-bg': colors.sidebarBg || '#f0f0f0',
  };

  return (
    <div
      style={dynamicStyles as React.CSSProperties}
      className="resume-theme-wrapper transition-all duration-300"
    >
      <style>{`
        .resume-theme-wrapper {
            font-family: var(--body-font), sans-serif;
            color: var(--text-color);
            font-size: var(--body-font-size);
            line-height: var(--body-line-height);
            padding: var(--body-padding-top) var(--body-padding-bottom);
            border: var(--body-border);
            min-height: 297mm; 
            width: 210mm; 
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin: 0 auto;
        }
        .resume-theme-wrapper .heading1, .resume-theme-wrapper .heading2, .resume-theme-wrapper .heading3 { 
            font-family: var(--heading-font), serif;
            font-weight: bold; 
            color: var(--primary-color);
            text-align: var(--heading-alignment, left);
            text-transform: var(--heading-case, none);
        }
        .resume-theme-wrapper .heading1{
            font-size: var(--heading-primary-size, 18px);
        }
        .resume-theme-wrapper .heading2{
            font-size: var(--heading-secondary-size, 16px);
        }   
        .resume-theme-wrapper .heading3{
            font-size: var(--heading-tertiary-size, 14px);
        }   

        .resume-theme-wrapper .sidebar { 
            background-color: var(--sidebar-bg); 
        }
        .resume-theme-wrapper .accent-element { 
            color: var(--accent-color);
            border-color: var(--accent-color);
        }
      `}</style>
      {children}
    </div>
  );
};

export default ThemeFontAndColor;
