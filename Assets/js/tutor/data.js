

export const personalInformationShowcaseData = [
  {
    heading: "Email address",
    content: "elizabethsutton@tptutor.com"
  },
  {
    heading: "Phone number",
    content: "(123) 456 7890"
  },
  {
    heading: "Date of Birth",
    content: "10/8/1998"
  }
]

export const personalInformationFormData = [
  {
    heading: "Email address",
    name: "email",
    content: "elizabethsutton@tptutor.com",
    type: "text"
  },
  {
    heading: "Phone number",
    name: "phoneNumber",
    content: "(123) 456 7890",
    type: "text"
  },
  {
    heading: "Date of Birth",
    name: "dateOfBirth",
    content: "1998-10-08",
    type: "date"
  },
  {
    heading: "Identification",
    name: "identification",
    type: "file"
  }
]

export const qualificationShowcaseData =  [
  {
    heading: "Education",
    content: "Bachelor of Arts Major in Philosophy - Stanford University",
    name: "education"
  },
  {
    heading: "Qualification",
    content: "Experienced, certified reading, writing, vocabulary, and grammar",
    name: "qualification"
  },
  {
    heading: "Certifications",
    content: [
      "Bilingual Extension Certificate",
      "Teaching Online Certificate",
      "Education Specialist: Teacher Leader"
    ],
    name: "certifications"
  },
  {
    heading: "Subjects",
    content: [
      "Math",
      "English",
      "Reading",
      "Writing",
      "Social Studies"
    ],
    name: "subjects"
  },
  {
    heading: "Language Spoken",
    content: [
      "English",
      "Spanish",
      "French"
    ],
    name: "language"
  }
]

export const qualificationFormData = [
  {
    heading: "Education",
    content: "Bachelor of Arts Major in Philosophy - Stanford University",
    name: "education",
    type: "text"
  },
  {
    heading: "Qualification",
    content: "Experienced, certified reading, writing, vocabulary, and grammar",
    name: "qualification",
    type: "text"
  },
  {
    heading: "Certifications",
    content: [
      {
        value: "Bilingual Extension Certificate",
        name: "certifications0",
        id: crypto.randomUUID()
      },
      {
        value: "Teaching Online Certificate",
        name: "certifications1",
        id: crypto.randomUUID()
      },
      {
        value: "Education Specialist: Teacher Leader",
        name: "certifications2",
        id: crypto.randomUUID()
      }
    ],
    name: "certifications",
    type: "text"
  },
  {
    heading: "Subjects",
    content: [
      {
        value: "Math",
        name: "subjects0",
        id: crypto.randomUUID()
      },
      {
        value: "English",
        name: "subjects1",
        id: crypto.randomUUID()
      },
      {
        value: "Reading",
        name: "subjects2",
        id: crypto.randomUUID()
      },
      {
        value: "Writing",
        name: "subjects3",
        id: crypto.randomUUID()
      },
      {
        value: "Social Studies",
        name: "subjects4",
        id: crypto.randomUUID()
      }
    ],
    name: "subjects",
    type: "text"
  },
  {
    heading: "Language Spoken",
    content: [
      {
        value: "English",
        name: "language0",
        id: crypto.randomUUID()
      },
      {
        value: "Spanish",
        name: "language1",
        id: crypto.randomUUID()
      },
      {
        value: "French",
        name: "language2",
        id: crypto.randomUUID()
      }
    ],
    name: "language",
    type: "text"
  },
  {
    heading: "Tutoring Years",
    name: "tutoringYears",
    type: "select",
    options: [
      "------",
      "1-2",
      "3-5",
      "5-10",
      "10+"
    ],
    content: "------"
  },
  {
    heading: "Teaching Years",
    name: "teachingYears",
    type: "select",
    options: [
      "------",
      "1-2",
      "3-5",
      "5-10",
      "10+"
    ],
    content: "------"
  },
  {
    heading: "Mentoring Years",
    name: "mentoringYears",
    type: "select",
    options: [
      "------",
      "1-2",
      "3-5",
      "5-10",
      "10+"
    ],
    content: "------"
  },
  {
    heading: "Field of Study",
    name: "fieldOfStudy",
    type: "text"
  },
  {
    heading: "High School English",
    name: "highSchoolEnglish",
    type: "checkbox",
    fields: [
      {
        id: "composition",
        value: "Composition"
      },
      {
        id: "literature",
        value: "Literature"
      }
    ]
  },
  {
    heading: "High School Math",
    name: "highSchoolMath",
    type: "checkbox",
    fields: [
      {
        id: "algebra",
        value: "Algebra"
      },
      {
        id: "preCalculus",
        value: "Pre-calculus"
      },
      {
        id: "highSchoolMathStatistics",
        value: "Statistics"
      },
      {
        id: "geometry",
        value: "Geometry"
      },
      {
        id: "trigonometry",
        value: "Trigonometry"
      },
      {
        id: "highSchoolMathCalculus",
        value: "Calculus"
      }
    ]
  },
  {
    heading: "High School Science",
    name: "highSchoolScience",
    type: "checkbox",
    fields: [
      {
        id: "physics",
        value: "Physics"
      },
      {
        id: "biology",
        value: "Biology"
      },
      {
        id: "chemistry",
        value: "Chemistry"
      },
      {
        id: "geology",
        value: "Geology"
      }
    ]
  },
  {
    heading: "High School Science",
    name: "highSchoolSocialStudies",
    type: "checkbox",
    fields: [
      {
        id: "worldHistory",
        value: "World History"
      },
      {
        id: "usHistory",
        value: "US History"
      },
      {
        id: "geography",
        value: "Geography"
      },
      {
        id: "highSchoolSpanish",
        value: "High School Spanish"
      },
      {
        id: "highSchoolFrench",
        value: "High School French"
      },
      {
        id: "highSchoolGerman",
        value: "High School German"
      },
      {
        id: "highSchoolMandarin",
        value: "High School Mandarin"
      }
    ]
  },
  {
    heading: "High School Other",
    name: "highSchoolOther",
    type: "text"
  },
  {
    heading: "University Humanities and Social Sciences:",
    name: "universityHUMSS",
    type: "checkbox",
    fields: [
      {
        id: "anthropology",
        value: "Anthropolgy"
      },
      {
        id: "history",
        value: "History"
      },
      {
        id: "politicalScience",
        value: "Political Science"
      },
      {
        id: "sociology",
        value: "Sociology"
      },
      {
        id: "psychology",
        value: "Psychology"
      },
      {
        id: "philosophy",
        value: "Philosophy"
      },
      {
        id: "universityHUMSSOther",
        value: "Other"
      }
    ]
  },
  {
    heading: "University Business and Law",
    name: "universityBusinessAndLaw",
    type: "checkbox",
    fields: [
      {
        id: "economics",
        value: "Economics"
      },
      {
        id: "accounting",
        value: "Accounting"
      },
      {
        id: "marketing",
        value: "Marketing"
      },
      {
        id: "law",
        value: "Law"
      },
      {
        id: "universityBusinessAndLawStatistics",
        value: "Statistics"
      },
      {
        id: "finance",
        value: "Finance"
      },
      {
        id: "universityBusinessAndLawOther",
        value: "Other"
      }
    ]
  },
  {
    heading: "University STEM",
    name: "universityStem",
    type: "checkbox",
    fields: [
      {
        id: "health",
        value: "Health"
      },
      {
        id: "premed",
        value: "Pre-med"
      },
      {
        id: "engineering",
        value: "Engineering"
      },
      {
        id: "universityStemCalculus",
        value: "Calculus"
      },
      {
        id: "universityStemPhysics",
        value: "Physics"
      }
    ]
  },
  {
    heading: "Test Prep/AP Classes",
    name: "testPrepApClasses",
    type: "checkbox",
    fields: [
      {
        id: "apUsHistory",
        value: "AP US History"
      },
      {
        id: "apEuropeanHistory",
        value: "AP European History"
      },
      {
        id: "apSpanish",
        value: "AP Spanish"
      },
      {
        id: "apPsychology",
        value: "AP Psychology"
      },
      {
        id: "apBiology",
        value: "AP Biology"
      },
      {
        id: "apEnglishAndComposition",
        value: "AP English and Composition"
      },
      {
        id: "apChemistry",
        value: "AP Chemistry"
      },
      {
        id: "apEnvironmentalScience",
        value: "AP Environmental Science"
      },
      {
        id: "apCalculus",
        value: "AP Calculus"
      },
      {
        id: "apStatistics",
        value: "AP Statistics"
      },
      {
        id: "testPrepApClassesOther",
        value: "Other"
      },
      {
        id: "testPrepAct",
        value: "Test Prep ACT"
      },
      {
        id: "testPrepSat",
        value: "Test Prep SAT"
      },
      {
        id: "testPrepPsat",
        value: "Test Prep PSAT"
      },
      {
        id: "testPrepGre",
        value: "Test Prep GRE"
      },
      {
        id: "testPrepGed",
        value: "Test Prep GED"
      },
      {
        id: "testPrepLsat",
        value: "Test Prep LSAT"
      },
      {
        id: "testPrepOther",
        value: "Test Prep Other"
      }
    ]
  },
  {
    heading: "ESL (English as a Second Language)",
    name: "esl",
    type: "checkbox",
    fields: [
      {
        id: "beginner",
        value: "Beginner"
      },
      {
        id: "intermediate",
        value: "Intermediate"
      },
      {
        id: "advanced",
        value: "Advanced"
      },
      {
        id: "ielts",
        value: "IELTS"
      },
      {
        id: "toefl",
        value: "TOEFL"
      },
      {
        id: "eslOther",
        value: "Other"
      }
    ]
  },
  {
    heading: "Which group sizes do you feel comfortable leading?",
    showCaseHeading: "Comfortable group number",
    name: "groupSize",
    type: "checkbox",
    fields: [
      {
        id: "oneToOne",
        value: "1:1"
      },
      {
        id: "pods",
        value: "Pods (2-5 students)"
      },
      {
        id: "whole",
        value: "Whole classes (5-15 students)"
      }
    ]
  },
  {
    heading: "Please Upload Your Resume",
    showCaseHeading: "Resume",
    name: "resume",
    type: "file",
  },
]

export const scheduleShowcaseData =  [
  {
    heading: "Monday",
    content: "5:00 AM - 2:00 PM"
  },
  {
    heading: "Tuesday",
    content: "5:00 AM - 2:00 PM"
  },
  {
    heading: "Wednesday",
    content: "5:00 AM - 2:00 PM"
  },
  {
    heading: "Thursday",
    content: "5:00 AM - 2:00 PM"
  },
  {
    heading: "Friday",
    content: "5:00 AM - 2:00 PM"
  },
  {
    heading: "Saturday",
    content: "5:00 AM - 2:00 PM"
  },
  {
    heading: "Sunday",
    content: "5:00 AM - 2:00 PM"
  }
]

export const scheduleFormData =  [
  {
    type: "multiple",
    fields:[
      [
        {
          heading: "Select day",
          content: "Monday",
          name: "schedDate",
          id: crypto.randomUUID(),
          type: "select"
        },
        {
          heading: "Time",
          content: "5:00 AM - 2:00 PM",
          name: "schedTime",
          id: crypto.randomUUID(),
          type: "select"      
        }
      ],
      [
        {
          heading: "Select day",
          content: "Tuesday",
          name: "schedDate",
          id: crypto.randomUUID(),
          type: "select"
        },
        {
          heading: "Time",
          content: "5:00 AM - 2:00 PM",
          name: "schedTime",
          id: crypto.randomUUID(),
          type: "select"      
        }
      ],
      [
        {
          heading: "Select day",
          content: "Wednesday",
          name: "schedDate",
          id: crypto.randomUUID(),
          type: "select"
        },
        {
          heading: "Time",
          content: "5:00 AM - 2:00 PM",
          name: "schedTime",
          id: crypto.randomUUID(),
          type: "select"      
        }
      ],
      [
        {
          heading: "Select day",
          content: "Thursday",
          name: "schedDate",
          id: crypto.randomUUID(),
          type: "select"
        },
        {
          heading: "Time",
          content: "5:00 AM - 2:00 PM",
          name: "schedTime",
          id: crypto.randomUUID(),
          type: "select"      
        }
      ],
      [
        {
          heading: "Select day",
          content: "Friday",
          name: "schedDate",
          id: crypto.randomUUID(),
          type: "select"
        },
        {
          heading: "Time",
          content: "5:00 AM - 2:00 PM",
          name: "schedTime",
          id: crypto.randomUUID(),
          type: "select"      
        }
      ],
      [
        {
          heading: "Select day",
          content: "Saturday",
          name: "schedDate",
          id: crypto.randomUUID(),
          type: "select"
        },
        {
          heading: "Time",
          content: "5:00 AM - 2:00 PM",
          name: "schedTime",
          id: crypto.randomUUID(),
          type: "select"      
        }
      ],
      [
        {
          heading: "Select day",
          content: "Sunday",
          name: "schedDate",
          id: crypto.randomUUID(),
          type: "select"
        },
        {
          heading: "Time",
          content: "5:00 AM - 2:00 PM",
          name: "schedTime",
          id: crypto.randomUUID(),
          type: "select"      
        }
      ],
    ],
    id: "schedDateTime"
  },
  {
    heading: "How many hours per week are you available?",
    showCaseHeading: "Hours per week",
    content: "5-10hrs",
    name: "hoursPerWeek",
  }
]

export const getPaidShowcaseData = [
  {
    bank: "Bank of America",
    number: "12345678",
    type: "Bank"
  },
  {
    bank: "Wells Fargo",
    number: "12345678",
    type: "Card"
  }
]

export const getPaidFormData = [
  [
    {
      heading: "Bank name",
      fieldKey: "bank",
      content: "Bank of america",
      name: "bankName",
      type: "text"
    },
    {
      heading: "Number",
      fieldKey: "number",
      content: "12345678",
      name: "bankNumber",
      type: "password"
    },
    {
      heading: "Type",
      fieldKey: "type",
      content: "Bank",
      name: "bankType",
      type: "select"
    }
  ],
  [
    {
      heading: "Bank name",
      fieldKey: "bank",
      content: "Wells fargo",
      name: "bankName",
      type: "text"
    },
    {
      heading: "Number",
      fieldKey: "number",
      content: "12345678",
      name: "bankNumber",
      type: "password"
    },
    {
      heading: "Type",
      fieldKey: "type",
      content: "Bank",
      name: "bankType",
      type: "select"
    }
  ]
]