import { FilterState } from '../_constants/templates.types';

type FormData = {
  experience: string;
  highlight: string;
  profile: string;
};

export const calculateRecommendation = (formData: FormData): FilterState => {
  const { experience, highlight, profile } = formData;

  const recommended: FilterState = {
    structure: [],
    design: [],
    layout: [],
  };

  const role = profile.toLowerCase();

  if (experience === 'Fresher / Student') {
    recommended.structure =
      highlight === 'My skills'
        ? ['Functional']
        : highlight === 'Both equally'
          ? ['Combination']
          : ['Chronological'];
  } else if (experience === '1–3 years') {
    recommended.structure =
      highlight === 'My work experience' ? ['Chronological'] : ['Combination'];
  } else {
    recommended.structure = highlight === 'My skills' ? ['Combination'] : ['Chronological'];
  }

  const creativeRoles = [
    'designer',
    'ui',
    'ux',
    'graphic',
    'motion',
    'video',
    'editor',
    'animator',
    'illustrator',
    'photographer',
    'media',
    'artist',
  ];

  const techRoles = [
    'developer',
    'engineer',
    'software',
    'frontend',
    'backend',
    'full stack',
    'data',
    'ml',
    'ai',
    'cloud',
    'devops',
    'qa',
    'tester',
    'cyber',
    'security',
  ];

  const businessRoles = [
    'manager',
    'consultant',
    'analyst',
    'marketing',
    'sales',
    'finance',
    'hr',
    'operations',
    'business',
    'product manager',
    'account',
    'executive',
  ];

  const studentRoles = ['student', 'intern', 'fresher'];

  const matches = (list: string[]) => list.some((keyword) => role.includes(keyword));

  if (matches(creativeRoles)) {
    recommended.design = ['Creative'];
  } else if (matches(techRoles)) {
    recommended.design = ['Modern'];
  } else if (matches(businessRoles)) {
    recommended.design = ['Professional'];
  } else if (matches(studentRoles)) {
    recommended.design = ['Simple'];
  } else {
    recommended.design = ['Simple', 'Professional'];
  }

  if (experience === '7+ years') {
    recommended.layout = ['Two Column'];
  } else if (experience === '3–7 years') {
    recommended.layout = highlight === 'Both equally' ? ['Two Column'] : ['One Column'];
  } else {
    recommended.layout = ['One Column'];
  }

  if (matches(creativeRoles) && experience !== 'Fresher / Student') {
    recommended.layout = ['Mixed'];
  }

  return recommended;
};
