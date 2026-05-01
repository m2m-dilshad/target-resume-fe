export const emptyFormValues = {
  basics: {
    name: '',
    label: '',
    profilePicture: '',
    email: '',
    phone: '',
    portfolio: '',
    summary: '',
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
    },
    profiles: [
      {
        network: '',
        username: '',
        url: '',
      },
    ],
  },
  works: [
    {
      company: '',
      position: '',
      location: '',
      url: '',
      startDate: '',
      endDate: '',
      summary: '',
      highlights: [{ highlights: '' }],
    },
  ],
  educations: [
    {
      institution: '',
      url: '',
      degreeType: '',
      degree: '',
      gpa: '',
      location: '',
      startDate: '',
      endDate: '',
      courses: [{ course: '' }],
    },
  ],
  skills: [
    {
      name: '',
      level: '',
      keywords: [{ keywords: '' }],
    },
  ],
  projects: [
    {
      name: '',
      url: '',
      description: '',
      highlights: [{ highlights: '' }],
      techStack: [{ techStack: '' }],
      startDate: '',
      endDate: '',
      roles: '',
    },
  ],
  certifications: [
    {
      name: '',
      issuer: '',
      date: '',
      url: '',
    },
  ],
  languages: [
    {
      language: '',
      fluency: '',
    },
  ],
  activities: [
    {
      title: '',
      description: '',
    },
  ],
  awards: [
    {
      title: '',
      awarder: '',
      date: '',
      summary: '',
    },
  ],
  volunteers: [
    {
      organization: '',
      position: '',
      url: '',
      startDate: '',
      endDate: '',
      summary: '',
      highlights: [{ highlights: '' }],
    },
  ],
  publications: [
    {
      name: '',
      publisher: '',
      releaseDate: '',
      url: '',
      summary: '',
    },
  ],
};
export const mockResumeData = {
  basics: {
    name: 'John Doe',
    label: 'Senior Software Engineer',
    profilePicture: 'profile.jpg',
    email: 'john.doe@example.com',
    phone: {
      countryCode: '+1',
      number: '555-123-4567',
    },
    portfolio: 'https://johndoe.dev',
    summary:
      'Experienced software engineer specializing in full-stack web development and cloud architectures.',
    location: {
      address: '123 Main St',
      postalCode: '12345',
      city: 'San Francisco',
      countryCode: 'US',
      region: 'CA',
    },
    profiles: [
      { network: 'LinkedIn', username: 'johndoe', url: 'https://linkedin.com/in/johndoe' },
      { network: 'GitHub', username: 'johndoe', url: 'https://github.com/johndoe' },
    ],
  },
  works: [
    {
      company: 'TechCorp Inc.',
      position: 'Lead Developer',
      location: 'San Francisco, US',
      url: 'https://techcorp.com',
      startDate: '01-01-2020',
      endDate: '01-03-2023',
      summary: 'Led a team of developers to build scalable web applications.',
      highlights: [
        { highlights: 'Reduced server costs by 30%' },
        { highlights: 'Implemented CI/CD pipelines' },
      ],
    },
  ],
  educations: [
    {
      institution: 'University of Tech',
      url: 'https://universityoftech.edu',
      degreeType: 'Masters',
      degree: 'Computer Science',
      gpa: '3.9',
      location: 'Boston, US',
      startDate: '01-09-2027',
      endDate: '01-06-2019',
      courses: [{ course: 'Machine Learning' }, { course: 'Cloud Computing' }],
    },
  ],
  skills: [
    { name: 'JavaScript', level: '5', keywords: [{ keywords: 'React' }, { keywords: 'Node.js' }] },
    { name: 'Python', level: '4', keywords: [{ keywords: 'Django' }, { keywords: 'Flask' }] },
  ],
  projects: [
    {
      name: 'Project Alpha',
      url: 'https://projectalpha.com',
      description: 'A web app for managing tasks and collaboration.',
      highlights: [{ highlights: 'Implemented real-time notifications' }],
      techStack: [{ techStack: 'React' }, { techStack: 'Node.js' }],
      startDate: '01-01-2021',
      endDate: '01-06-2021',
      roles: 'Full-Stack Developer',
    },
  ],
  certifications: [
    {
      name: 'AWS Solutions Architect',
      issuer: 'Amazon',
      date: '01-05-2020',
      url: 'https://aws.amazon.com/certification/',
    },
  ],
  languages: [
    { language: 'English', fluency: 'Native' },
    { language: 'Spanish', fluency: 'Professional' },
  ],
  activities: [
    {
      title: 'Open Source Contributor',
      description: 'Contributed to various open-source projects.',
    },
  ],
  awards: [
    {
      title: 'Best Developer Award',
      awarder: 'TechCorp',
      date: '01-12-2022',
      summary: 'Recognized for outstanding contribution to projects.',
    },
  ],
  volunteers: [
    {
      organization: 'Code for Good',
      position: 'Mentor',
      url: 'https://codeforgood.org',
      startDate: '01-01-2019',
      endDate: '31-12-2021',
      summary: 'Mentored students in web development.',
      highlights: [{ highlights: 'Helped 20+ students launch their first web projects' }],
    },
  ],
  publications: [
    {
      name: 'Modern Web Development',
      publisher: 'Tech Publishers',
      releaseDate: '01-03-2022',
      url: 'https://techpublishers.com/modern-web',
      summary: 'A book on modern web development practices.',
    },
  ],
};
