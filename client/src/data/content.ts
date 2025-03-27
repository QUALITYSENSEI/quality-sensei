export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export interface CourseInfo {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  price: number;
  features: string[];
  image?: string;
}

export interface FeatureInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'QA Lead',
    company: 'TechInnovate',
    content: 'Quality Sensei transformed our testing approach. The automation courses were practical and immediately applicable to our projects.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Developer',
    company: 'DataSphere',
    content: 'I was skeptical about learning testing as a developer, but these courses changed my perspective completely. Now I write better, more testable code.',
    rating: 5
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Test Automation Engineer',
    company: 'CloudSecure',
    content: 'The Selenium labs are exceptional. I went from manual testing to building robust automation frameworks in weeks.',
    rating: 4
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'DevOps Engineer',
    company: 'AgileFlow',
    content: 'I appreciated how the courses integrated testing into the CI/CD pipeline. It\'s rare to find training that addresses the entire testing lifecycle.',
    rating: 5
  }
];

// Course offerings
export const courses: CourseInfo[] = [
  {
    id: 'selenium-mastery',
    title: 'Selenium Test Automation Mastery',
    description: 'Comprehensive course covering all aspects of Selenium WebDriver for robust web application testing',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.8,
    students: 1245,
    price: 199,
    features: [
      'Cross-browser testing strategies',
      'Page Object Model implementation',
      'Data-driven testing frameworks',
      'CI/CD integration',
      'Advanced waits and synchronization'
    ]
  },
  {
    id: 'api-testing',
    title: 'API Testing with Postman & RestAssured',
    description: 'Learn to design and execute comprehensive API test suites using industry-leading tools',
    duration: '6 weeks',
    level: 'Intermediate',
    rating: 4.7,
    students: 986,
    price: 179,
    features: [
      'RESTful API testing concepts',
      'JSON schema validation',
      'Authentication testing',
      'Performance testing basics',
      'Test automation with CI/CD'
    ]
  },
  {
    id: 'performance-testing',
    title: 'Performance Testing with JMeter',
    description: 'Master load testing, stress testing, and performance monitoring for scalable applications',
    duration: '7 weeks',
    level: 'Advanced',
    rating: 4.9,
    students: 758,
    price: 249,
    features: [
      'Load test planning and design',
      'Advanced JMeter scripting',
      'Performance metrics analysis',
      'Server monitoring integration',
      'Cloud-based performance testing'
    ]
  },
  {
    id: 'test-fundamentals',
    title: 'Software Testing Fundamentals',
    description: 'Build a solid foundation in testing principles, methodologies, and best practices',
    duration: '4 weeks',
    level: 'Beginner',
    rating: 4.6,
    students: 2134,
    price: 99,
    features: [
      'Testing types and techniques',
      'Test case design principles',
      'Defect lifecycle management',
      'Agile testing methodologies',
      'Testing documentation'
    ]
  }
];

// Features section data
export const features: FeatureInfo[] = [
  {
    id: 'interactive-learning',
    title: 'Interactive Learning',
    description: 'Engage with hands-on labs, real-world projects, and practical exercises that reinforce concepts.',
    icon: 'Layout'
  },
  {
    id: 'expert-instructors',
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience in test automation and quality assurance.',
    icon: 'Users'
  },
  {
    id: 'certification',
    title: 'Industry Certification',
    description: 'Earn recognized certifications that validate your skills and enhance your career prospects.',
    icon: 'Award'
  },
  {
    id: 'community',
    title: 'Supportive Community',
    description: 'Join a global network of testing professionals to share knowledge and collaborate on challenges.',
    icon: 'MessageCircle'
  },
  {
    id: 'flexible-learning',
    title: 'Flexible Learning',
    description: 'Study at your own pace with lifetime access to course materials, updates, and resources.',
    icon: 'Clock'
  },
  {
    id: 'real-world-projects',
    title: 'Real-World Projects',
    description: 'Build a portfolio of practical projects that demonstrate your skills to potential employers.',
    icon: 'Code'
  }
];

// Company stats
export const stats = [
  { value: 15000, label: 'Students Trained', suffix: '+' },
  { value: 25, label: 'Expert Instructors', suffix: '+' },
  { value: 30, label: 'Professional Courses', suffix: '+' },
  { value: 96, label: 'Satisfaction Rate', suffix: '%' }
];