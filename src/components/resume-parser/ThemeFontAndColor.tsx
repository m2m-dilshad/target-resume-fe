import React from 'react';
import { useResume } from './ResumeContext';
import { JUSTIFY_ALIGNMENTS, PAGE_SIZES } from '@/lib/constants';

const ThemeFontAndColor = ({ children }: { children: React.ReactNode }) => {
  // Extract values from your schema structure
  const { config } = useResume();
  const { typography, page, header } = config;

  const dynamicStyles = {
    // Fonts
    '--heading-font': typography.headingFontFamily,
    '--body-font': typography.bodyFontFamily,
    '--body-font-size': typography.bodyFontSize || '12px',
    '--body-line-height': typography.lineHeight || '1.5',
    '--list-line-height': typography.listLineHeight || '1.5',
    '--body-padding-y': page.marginY || '1',
    '--body-padding-x': page.marginX || '1',
    '--body-border-x': page.borderX || 'none',
    '--body-border-y': page.borderY || 'none',
    '--heading-alignment': header.alignment || 'left',
    '--heading-primary-case': typography.headingPrimaryCase || 'none',
    '--heading-secondary-case': typography.headingSecondaryCase || 'none',
    '--heading-tertiary-case': typography.headingTertiaryCase || 'none',
    '--heading-primary-size': typography.headingPrimarySize || '24px',
    '--heading-secondary-size': typography.headingSecondarySize || '20px',
    '--heading-tertiary-size': typography.headingTertiarySize || '16px',
    // Colors
    '--primary-color': typography.colorPrimary || '#000',
    '--accent-color': typography.colorAccent || '#0070f3',
    '--text-color': typography.colorText || '#000',
    '--sidebar-bg': typography.colorSidebarBg || '#f0f0f0',
    '--modern-header-bg': typography.colorModernHeaderBg || '#f0f0f0',
    '--modern-header-text': typography.colorModernHeaderText || '#333333',
  };

  const dividerLineWidth: Record<string, string> = {
    none: '0px',
    full: '100%',
    partial: '50%',
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
            // padding: var(--body-padding-y) var(--body-padding-x);
            border-top: var(--body-border-y) solid var(--accent-color);
            border-bottom: var(--body-border-y) solid var(--accent-color);
            border-left:var(--body-border-x) solid var(--accent-color);
            border-right:var(--body-border-x) solid var(--accent-color);
            min-height: ${PAGE_SIZES[config.page.paperSize].height};  
            width: ${PAGE_SIZES[config.page.paperSize].width}; 
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin: 0 auto;
        }
        .resume-theme-wrapper .heading1, .resume-theme-wrapper .heading2, .resume-theme-wrapper .heading3 { 
            font-family: var(--heading-font), serif;
            font-weight: bold; 
            color: var(--primary-color);
            text-align: var(--heading-alignment, left);  
        }
        .resume-theme-wrapper .heading1{
            font-size: var(--heading-primary-size, 18px);
            text-transform: var(--heading-primary-case, none);
        }
        .resume-theme-wrapper .heading2{
            font-size: var(--heading-secondary-size, 16px);
            text-transform: var(--heading-secondary-case, none);
        }   
        .resume-theme-wrapper .heading3{
            font-size: var(--heading-tertiary-size, 14px);
            text-transform: var(--heading-tertiary-case, none);
        }   

        .resume-theme-wrapper .single {
          padding: var(--body-padding-y) var(--body-padding-x);
        }

        .resume-theme-wrapper .sidebar { 
            background-color: var(--sidebar-bg); 
            
        }
        
        .resume-theme-wrapper .left .sidebar { 
          padding-top: var(--body-padding-y);
          padding-right:calc(var(--spacing) * 8);
          padding-bottom:var(--body-padding-y);
          padding-left:var(--body-padding-x)
        }
        .resume-theme-wrapper .left .sidebar-content { 
          padding-top: var(--body-padding-y);
          padding-right:var(--body-padding-x);
          padding-bottom:var(--body-padding-y);
          padding-left:0;
        }

        .resume-theme-wrapper .right .sidebar { 
          padding-top: var(--body-padding-y);
          padding-right:var(--body-padding-x);
          padding-bottom:var(--body-padding-y);
          padding-left:calc(var(--spacing) * 8);
        }
        .resume-theme-wrapper .right .sidebar-content { 
          padding-top: var(--body-padding-y);
          padding-right:0
          padding-bottom:var(--body-padding-y);
          padding-left:var(--body-padding-x);
        }

        .resume-theme-wrapper .accent-element { 
            color: var(--accent-color);
            border-color: var(--accent-color);
        }

        .resume-theme-wrapper .modern-header{ 
          background-color: var(--modern-header-bg); 
          color: var(--modern-header-text); 
          padding-top: var(--body-padding-y);
          padding-right:var(--body-padding-x);
          padding-bottom:0;
          padding-left:var(--body-padding-x);
          margin-bottom:calc(var(--spacing) * 4);
        }

        .resume-theme-wrapper .modern-header-content{ 
          padding-top: 0;
          padding-right:var(--body-padding-x);
          padding-bottom:var(--body-padding-y);
          padding-left:var(--body-padding-x);
        }

        .resume-theme-wrapper .split .sidebar { 
          padding-top: var(--body-padding-y);
          padding-right:calc(var(--spacing) * 8);
          padding-bottom:var(--body-padding-y);
          padding-left:var(--body-padding-x);
        }
        .resume-theme-wrapper .split .sidebar-content { 
          padding-top: var(--body-padding-y);
          padding-right:var(--body-padding-x);
          padding-bottom:var(--body-padding-y);
          padding-left:0;
        }

        .resume-theme-wrapper .contacts-layout-grid {
            display:grid;
            gap:calc(var(--spacing) * 6);
            grid-template-columns:repeat(1, minmax(0, 1fr));    
            text-align:${header.alignment || 'left'};
            justify-items:stretch;
        }  
        .resume-theme-wrapper .contacts-layout-inline {
          display:flex;
          flex-wrap:wrap;
          flex-direction:row;
          gap:calc(var(--spacing) * 4);
          align-items: center;
          justify-content:${JUSTIFY_ALIGNMENTS[header.alignment || 'left']};
        }

        .resume-theme-wrapper .contacts-layout-rows {
          display:flex;
          flex-wrap:wrap;
          flex-direction:column;
          gap:calc(var(--spacing) * 2);
          align-items: ${JUSTIFY_ALIGNMENTS[header.alignment || 'left']};
          justify-content:center;
        }

        .resume-theme-wrapper .contacts-layout-item {
            display:flex;
            gap:calc(var(--spacing) * 2);
            align-items: center;
            justify-content:${JUSTIFY_ALIGNMENTS[header.alignment || 'left']};
            word-break:break-all;
        }

        .resume-theme-wrapper .contacts-layout-inline .contacts-layout-item:not(:last-child)::after {
            content: " ";
            display:block;
            width:1px;
            height:1em;
            background-color:var(--accent-color);
            margin-left: 0.5rem; 
        }

        .resume-theme-wrapper .header-icon{
          display: inline-block;
          vertical-align: middle;
          color:var(--accent-color);
        }

        .resume-theme-wrapper .header-photo{
          width: 144px;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          object-position: center top; 
        }

        .resume-theme-wrapper .header-photo-circle{
          border-radius:50%;
        }
        .resume-theme-wrapper .header-photo-rounded{
          border-radius:10%;
        }  

        .resume-theme-wrapper .header::after{
            content: " ";
            display:block;
            width:${dividerLineWidth[config.header.dividerLine]};
            height:${config.header.dividerLineThickness};
            background-color:var(--accent-color);
            margin: 0 auto; 
        }

        .resume-theme-wrapper .modern-header .header::after{
            content: " ";
            display:block;
            width:calc(${dividerLineWidth[config.header.dividerLine]} + ${config.page.marginX} + ${config.page.marginX});
            height:${config.header.dividerLineThickness};
            background-color:var(--accent-color);
            margin: 0 ${config.header.dividerLine === 'partial' ? 'auto' : '-' + config.page.marginX}; 
        }

        .resume-theme-wrapper .section::after{
            content: " ";
            display:block;
            width:${dividerLineWidth[config.component.dividerLine]};
            height:${config.component.dividerLineThickness};
            background-color:var(--accent-color);
            margin: 1em auto; 
            
        }

        
        /* md styles */    
        @media (width >= 48rem) {
          .resume-theme-wrapper .contacts-layout-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default ThemeFontAndColor;
