export interface Course {
  id: number;
  title: string;
  category: string;
  segment: 'flagship' | 'micro' | 'wip';
  image: string;
  duration: string;
  students: string;
  rating: number;
  price: number;
  level: string;
  description: string;
  learningOutcomes: string[];
  instructor: {
    name: string;
    title: string;
    bio: string;
  };
  modules: Module[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  content: {
    type: 'video' | 'audio' | 'pdf';
    url: string;
    duration?: string;
  };
  quiz: Quiz;
}

export interface Quiz {
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const coursesData: Course[] = [
  {
    id: 1,
    title: "Data Science & Machine Learning",
    category: "Technology",
    segment: "flagship",
    image: "https://images.unsplash.com/photo-1653133224278-f55672909571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGNvZGluZ3xlbnwxfHx8fDE3NjI0ODg0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "12 weeks",
    students: "4,521",
    rating: 4.9,
    price: 599,
    level: "Intermediate",
    description: "Master the fundamentals of data science and machine learning with hands-on projects. Learn Python, statistical analysis, and build predictive models that solve real-world problems.",
    learningOutcomes: [
      "Master Python programming for data analysis",
      "Understand statistical concepts and apply them",
      "Build and deploy machine learning models",
      "Work with real-world datasets",
      "Create data visualizations",
      "Apply deep learning techniques"
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Lead Data Scientist at TechCorp",
      bio: "15+ years of experience in data science and machine learning with a PhD from MIT."
    },
    modules: [
      {
        id: 1,
        title: "Introduction to Data Science",
        description: "Learn the basics of data science and set up your environment",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '45 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is Data Science?",
              options: [
                "The study of computers",
                "The extraction of knowledge from data",
                "A programming language",
                "A database system"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "Which language is most commonly used in Data Science?",
              options: ["Java", "C++", "Python", "Ruby"],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 2,
        title: "Python Fundamentals",
        description: "Master Python programming essentials",
        content: {
          type: 'video',
          url: 'https://example.com/video2.mp4',
          duration: '60 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is a variable in Python?",
              options: [
                "A container for storing data",
                "A function",
                "A loop",
                "A class"
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 3,
        title: "Statistical Analysis",
        description: "Learn statistical methods for data analysis",
        content: {
          type: 'video',
          url: 'https://example.com/video3.mp4',
          duration: '50 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is the mean of data?",
              options: [
                "The most frequent value",
                "The middle value",
                "The average value",
                "The range of values"
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Digital Marketing Mastery",
    category: "Marketing",
    segment: "wip",
    image: "https://images.unsplash.com/photo-1542744094-f77e9f7a10b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MjQwNDM2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "8 weeks",
    students: "3,847",
    rating: 4.8,
    price: 449,
    level: "Beginner",
    description: "Transform your marketing skills with comprehensive digital marketing strategies. From SEO to social media, master the tools that drive business growth.",
    learningOutcomes: [
      "Develop effective SEO strategies",
      "Master social media marketing",
      "Create compelling content",
      "Understand Google Analytics",
      "Run successful ad campaigns",
      "Build email marketing funnels"
    ],
    instructor: {
      name: "Michael Rodriguez",
      title: "Digital Marketing Director",
      bio: "Award-winning marketer with 10+ years driving multi-million dollar campaigns."
    },
    modules: [
      {
        id: 1,
        title: "Digital Marketing Foundations",
        description: "Introduction to digital marketing landscape",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '40 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What does SEO stand for?",
              options: [
                "Social Engine Optimization",
                "Search Engine Optimization",
                "Simple Email Optimization",
                "System Engineering Operation"
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 2,
        title: "Social Media Strategy",
        description: "Build engaging social media presence",
        content: {
          type: 'video',
          url: 'https://example.com/video2.mp4',
          duration: '55 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "Which platform is best for B2B marketing?",
              options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Business Leadership & Strategy",
    category: "Business",
    segment: "flagship",
    image: "https://images.unsplash.com/photo-1758518727707-b023e285b709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlcnNoaXAlMjBtZWV0aW5nfGVufDF8fHx8MTc2MjQ4ODQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "10 weeks",
    students: "2,934",
    rating: 4.9,
    price: 699,
    level: "Advanced",
    description: "Elevate your leadership capabilities and strategic thinking. Learn from real-world case studies and develop the skills to lead organizations to success.",
    learningOutcomes: [
      "Develop strategic thinking skills",
      "Master team leadership",
      "Make data-driven decisions",
      "Navigate organizational change",
      "Build high-performing teams",
      "Drive business innovation"
    ],
    instructor: {
      name: "James Wilson",
      title: "Former Fortune 500 CEO",
      bio: "30+ years leading global organizations with proven track record of transformation."
    },
    modules: [
      {
        id: 1,
        title: "Leadership Fundamentals",
        description: "Core principles of effective leadership",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '50 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is the most important quality of a leader?",
              options: ["Intelligence", "Charisma", "Emotional Intelligence", "Experience"],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 2,
        title: "Strategic Planning",
        description: "Develop and execute strategic plans",
        content: {
          type: 'video',
          url: 'https://example.com/video2.mp4',
          duration: '65 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is a SWOT analysis used for?",
              options: [
                "Financial planning",
                "Strategic assessment",
                "Marketing campaigns",
                "Team building"
              ],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "UX/UI Design Fundamentals",
    category: "Design",
    segment: "micro",
    image: "https://images.unsplash.com/photo-1664520132859-727fc515fc8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzYyNDQ0MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "6 weeks",
    students: "5,192",
    rating: 4.7,
    price: 399,
    level: "Beginner",
    description: "Create beautiful, user-centered designs. Master the principles of UX/UI design and build a professional portfolio.",
    learningOutcomes: [
      "Understand UX design principles",
      "Master design tools (Figma, Adobe XD)",
      "Conduct user research",
      "Create wireframes and prototypes",
      "Design responsive interfaces",
      "Build a design portfolio"
    ],
    instructor: {
      name: "Emily Zhang",
      title: "Senior UX Designer at Google",
      bio: "Award-winning designer with expertise in creating delightful user experiences."
    },
    modules: [
      {
        id: 1,
        title: "UX Design Basics",
        description: "Introduction to user experience design",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '35 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What does UX stand for?",
              options: ["User Exchange", "User Experience", "Universal Export", "Unified Extension"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "Financial Analytics & Modeling",
    category: "Finance",
    segment: "wip",
    image: "https://images.unsplash.com/photo-1744473119469-905016183836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwYW5hbHl0aWNzJTIwY2hhcnRzfGVufDF8fHx8MTc2MjQ4ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "10 weeks",
    students: "2,651",
    rating: 4.8,
    price: 649,
    level: "Intermediate",
    description: "Master financial modeling and analytics to make informed business decisions.",
    learningOutcomes: [
      "Build financial models",
      "Analyze financial statements",
      "Forecast business performance",
      "Master Excel for finance",
      "Understand valuation methods",
      "Create investment analyses"
    ],
    instructor: {
      name: "Robert Chen",
      title: "Investment Banker",
      bio: "20+ years in corporate finance and investment banking."
    },
    modules: [
      {
        id: 1,
        title: "Financial Modeling Basics",
        description: "Introduction to financial modeling",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '45 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is NPV?",
              options: [
                "Net Present Value",
                "New Product Vision",
                "National Price Variance",
                "Nominal Profit Value"
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: "Artificial Intelligence Essentials",
    category: "Technology",
    segment: "flagship",
    image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjI0NjY5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "14 weeks",
    students: "3,421",
    rating: 4.9,
    price: 799,
    level: "Advanced",
    description: "Dive deep into artificial intelligence and build intelligent systems.",
    learningOutcomes: [
      "Understand AI fundamentals",
      "Build neural networks",
      "Work with large language models",
      "Implement computer vision",
      "Deploy AI applications",
      "Apply ethical AI principles"
    ],
    instructor: {
      name: "Dr. Priya Patel",
      title: "AI Research Scientist",
      bio: "PhD in AI with publications in top-tier conferences."
    },
    modules: [
      {
        id: 1,
        title: "Introduction to AI",
        description: "Fundamentals of artificial intelligence",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '60 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is machine learning?",
              options: [
                "Teaching computers to learn from data",
                "A programming language",
                "A database system",
                "A web framework"
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 7,
    title: "Web Development Bootcamp",
    category: "Technology",
    segment: "flagship",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "16 weeks",
    students: "6,234",
    rating: 4.9,
    price: 899,
    level: "Beginner",
    description: "Become a full-stack web developer. Learn HTML, CSS, JavaScript, React, Node.js and deploy production-ready applications.",
    learningOutcomes: [
      "Master HTML, CSS, and JavaScript",
      "Build with React and modern frameworks",
      "Create backend APIs with Node.js",
      "Deploy applications to the cloud",
      "Work with databases",
      "Build full-stack projects"
    ],
    instructor: {
      name: "David Martinez",
      title: "Senior Full Stack Developer",
      bio: "10+ years building scalable web applications for Fortune 500 companies."
    },
    modules: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        description: "Build beautiful websites from scratch",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '40 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What does HTML stand for?",
              options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 8,
    title: "Python for Beginners",
    category: "Programming",
    segment: "micro",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "4 weeks",
    students: "7,892",
    rating: 4.8,
    price: 199,
    level: "Beginner",
    description: "Start your programming journey with Python. Learn the basics in just 4 weeks with hands-on projects.",
    learningOutcomes: [
      "Understand Python syntax",
      "Work with data structures",
      "Write clean, efficient code",
      "Build simple applications",
      "Debug and test code",
      "Use Python libraries"
    ],
    instructor: {
      name: "Lisa Chen",
      title: "Python Developer",
      bio: "Teaching Python to beginners for 5+ years with proven results."
    },
    modules: [
      {
        id: 1,
        title: "Getting Started with Python",
        description: "Your first steps in Python programming",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '30 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is Python?",
              options: ["A snake", "A programming language", "A database", "An operating system"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 9,
    title: "Cloud Computing with AWS",
    category: "Technology",
    segment: "wip",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "12 weeks",
    students: "1,234",
    rating: 4.6,
    price: 699,
    level: "Intermediate",
    description: "Master cloud computing with AWS. Learn to build, deploy, and manage scalable cloud applications. Course in progress.",
    learningOutcomes: [
      "Understand cloud architecture",
      "Deploy applications on AWS",
      "Manage cloud infrastructure",
      "Implement security best practices",
      "Optimize cloud costs",
      "Use AWS services effectively"
    ],
    instructor: {
      name: "Mark Johnson",
      title: "Cloud Architect",
      bio: "AWS certified with 8+ years of cloud infrastructure experience."
    },
    modules: [
      {
        id: 1,
        title: "Introduction to Cloud Computing",
        description: "Cloud fundamentals and AWS basics",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '45 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What does AWS stand for?",
              options: ["Amazon Web Services", "Advanced Web System", "Automated Web Solutions", "American Web Standard"],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 10,
    title: "Excel Mastery",
    category: "Business",
    segment: "micro",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "3 weeks",
    students: "9,451",
    rating: 4.7,
    price: 149,
    level: "Beginner",
    description: "Master Excel formulas, pivot tables, and data analysis in just 3 weeks. Perfect for professionals.",
    learningOutcomes: [
      "Master Excel formulas",
      "Create pivot tables",
      "Visualize data with charts",
      "Automate with macros",
      "Analyze business data",
      "Build professional dashboards"
    ],
    instructor: {
      name: "Jennifer Smith",
      title: "Excel Expert & Trainer",
      bio: "Trained thousands of professionals in Excel and data analysis."
    },
    modules: [
      {
        id: 1,
        title: "Excel Basics",
        description: "Introduction to Excel interface and basic functions",
        content: {
          type: 'video',
          url: 'https://example.com/video1.mp4',
          duration: '25 min'
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is a cell in Excel?",
              options: ["A formula", "The intersection of a row and column", "A chart type", "A function"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  }
];
