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
