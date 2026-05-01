import { TEMPLATE_LAYOUTS, TEMPLATE_STRUCTURE } from '@/lib/constants';
import { z } from 'zod';

const requiredString = (field: string) => z.string().trim().min(1, `${field} is required`);

const optionalString = z
  .string()
  .trim()
  .transform((val) => (val === '' ? undefined : val))
  .optional();

export const createTemplateSchema = z.object({
  template: z.object({
    name: requiredString('Template name is required'),
    slug: requiredString('Template ID is required'),
    description: optionalString,
    ats: z.boolean().default(true),
    isActive: z.boolean().default(true),
    // supportsProfilePhoto: z.boolean().default(false),
    structure: z.enum(TEMPLATE_STRUCTURE),
    layout: z.enum(TEMPLATE_LAYOUTS),
  }),
  typography: z.object({
    headingFontFamily: requiredString('Select Heading Font'),
    headingPrimarySize: requiredString('Select Heading Primary Font Size'),
    headingSecondarySize: requiredString('Select Heading Secondary Font Size'),
    headingTertiarySize: requiredString('Select Heading Tertiary Font Size'),
    headingPrimaryCase: requiredString('Select Heading Primary Case'),
    headingSecondaryCase: requiredString('Select Heading Secondary Case'),
    headingTertiaryCase: requiredString('Select Heading Tertiary Case'),
    bodyFontFamily: requiredString('Select Body Font'),
    bodyFontSize: requiredString('Select Body Font Size'),
    lineHeight: requiredString('Line Height'),
    listLineHeight: requiredString('List Line Height'),
    // headingPrimary: z.object({ size: z.string(), case: z.string() }),
    // headingSecondary: z.object({ size: z.string(), case: z.string() }),
    // body: z.object({ size: z.string(), lineHeight: z.string(), listLineHeight: z.string() }),
    colorPrimary: requiredString('Choose Primary Color'),
    colorAccent: requiredString('Choose Accent Color'),
    colorText: requiredString('Choose Text Color'),
    colorSidebarBg: requiredString('Choose Sidebar Background Color'),
    colorModernHeaderBg: requiredString('Choose Modern Header Background Color'),
    colorModernHeaderText: requiredString('Choose Modern Header Foreground Color'),
  }),
  // colors: z.object({ accent: z.string() }),
  page: z.object({
    paperSize: z.enum(['A4', 'Letter']),
    marginX: optionalString,
    marginY: optionalString,
    borderX: optionalString,
    borderY: optionalString,
    sectionGap: optionalString,
    itemGap: optionalString,
  }),
  component: z.object({
    // iconStyle: requiredString('Icon Styles'),
    photoShape: requiredString('Photo Shape'),
    dividerLine: requiredString('Divider Line'),
    dividerLineThickness: requiredString('Divider Line Thickness'),
    // skillsStyle: requiredString('Skills Style'),
    bulletPoints: requiredString('Bullet Points'),
  }),
  header: z.object({
    alignment: requiredString('Header Alignment'),
    roleVisible: z.boolean().default(true),
    dividerLine: requiredString('Header Divider'),
    dividerLineThickness: requiredString('Line Thickness'),
    showContactLabelsOrIcons: requiredString('Contact Labels/Icons'),
    // useContactIcons: z.boolean().default(true),
    contactLayout: requiredString('Contact Info Layout'),
    showPhoto: requiredString('Show Photo'),
  }),
  experience: z.object({
    positionPlacement: requiredString('Exp: Position/Role Placement'),
    locationPlacement: requiredString('Exp: Location Placement'),
    datePlacement: requiredString('Exp: Date Placement'),
    primaryDisplay: requiredString('Exp: Primary Display'),
    showGPA: z.boolean().default(true),
  }),
  skills: z.object({
    skillsLayout: requiredString('Skills Layout'),
    skillsGroupByCategory: z.boolean().default(true),
    languagesLayout: requiredString('Languages Layout'),
    languagesShowProficiency: z.boolean().default(true),
    // column_count: z.number().min(1),
  }),

  projects: z.object({
    toolsStyle: requiredString('Tools/Tech Style'),
    descStyle: requiredString('Description Style'),
    showProjectLink: z.boolean().default(false),
    showGithubLink: z.boolean().default(false),
    showDate: z.boolean().default(false),
    citationFormat: requiredString('Citation Format'),
  }),
  volunteering: z.object({
    volLayout: requiredString('Volunteering Layout'),
    awardsDatePosition: requiredString('Award Date Position'),
    awardsHighlightTitle: z.boolean().default(false),
  }),
});

export type CreateTemplateType = z.infer<typeof createTemplateSchema>;
