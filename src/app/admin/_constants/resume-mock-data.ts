export const RESUME_MOCK_DATA = {
  basics: {
    name: 'John Doe',
    label: 'Senior Software Engineer',
    image: 'https://example.com',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    url: 'https://johndoe.dev',
    summary: 'Full-stack developer with 10+ years of experience in distributed systems.',
    location: {
      address: '123 Tech Lane',
      postalCode: '94105',
      city: 'San Francisco',
      countryCode: 'US',
      region: 'California',
    },
    profiles: [
      {
        network: 'LinkedIn',
        username: 'johndoe',
        url: 'https://linkedin.com',
      },
      {
        network: 'Github',
        username: 'jdoe-codes',
        url: 'https://github.com',
      },
    ],
  },
  work: [
    {
      name: 'CloudScale Inc.',
      position: 'Lead Developer',
      url: 'https://cloudscale.com',
      location: 'NY, 14009',
      startDate: '2020-01-01',
      endDate: 'Present',
      summary: 'Leading the core infrastructure team.',
      highlights: [
        'Reduced system latency by 40% through microservices optimization.',
        'Managed a team of 15 engineers across 3 time zones.',
      ],
    },
  ],
  volunteer: [
    {
      organization: 'Code for Good',
      position: 'Mentor',
      url: 'https://codeforgood.org',
      startDate: '2018-06-01',
      endDate: '2019-12-31',
      summary: 'Taught web development to underprivileged youth.',
      highlights: ['Curated a 12-week curriculum for Javascript and React.'],
    },
  ],
  education: [
    {
      institution: 'University of Technology',
      url: 'https://unitech.edu',
      area: 'Computer Science',
      studyType: 'Bachelor',
      startDate: '2010-09-01',
      endDate: '2014-05-15',
      score: '3.9/4.0',
      courses: ['CS101 - Algorithms', 'CS202 - Distributed Systems'],
    },
  ],
  awards: [
    {
      title: 'Engineer of the Year',
      date: '2022-11-01',
      awarder: 'CloudScale Inc.',
      summary: 'Recognized for exceptional technical leadership.',
    },
  ],
  certificates: [
    {
      name: 'AWS Certified Solutions Architect',
      date: '2021-05-20',
      issuer: 'Amazon Web Services',
      url: 'https://aws.amazon.com',
    },
  ],
  publications: [
    {
      name: 'Scaling Microservices in 2024',
      publisher: 'Tech Journal',
      releaseDate: '2023-08-15',
      url: 'https://techjournal.com',
      summary: 'A deep dive into container orchestration strategies.',
    },
  ],
  skills: [
    {
      name: 'Backend Development',
      level: 'Master',
      keywords: ['Node.js', 'Python', 'Go', 'PostgreSQL'],
    },
    {
      name: 'DevOps',
      level: 'Advanced',
      keywords: ['Docker', 'Kubernetes', 'Terraform'],
    },
  ],
  languages: [
    {
      language: 'English',
      fluency: 'Native',
    },
    {
      language: 'Spanish',
      fluency: 'Professional Working Proficiency',
    },
  ],
  interests: [
    {
      name: 'Open Source',
      keywords: ['Contributor to Node.js core', 'JSON Schema advocate'],
    },
  ],
  references: [
    {
      name: 'Jane Smith',
      reference: 'John is one of the most brilliant engineers I have ever worked with.',
    },
  ],
  projects: [
    {
      name: 'EcoTracker',
      description: 'Mobile app to track personal carbon footprint.',
      highlights: ['Integrated with 5 different IoT energy meters.'],
      keywords: ['React Native', 'Firebase'],
      startDate: '2022-01-01',
      endDate: '2022-06-01',
      url: 'https://ecotracker.app',
      roles: ['Founder', 'Lead Developer'],
    },
  ],
};
