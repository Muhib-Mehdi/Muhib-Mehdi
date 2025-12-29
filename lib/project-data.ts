export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoUrl?: string;
    githubUrl?: string;
    category: 'web-dev' | 'mobile-apps' | 'ai-ml' | 'python' | 'java';
    featured?: boolean;
    stats?: {
        stars?: number;
        forks?: number;
    };
}

export const PROJECTS: Project[] = [
    // Web Development
    {
        id: 'quantum-whirl',
        title: 'Quantum Whirl',
        description: 'Interactive quantum computing simulator bringing quantum phenomena to your browser. Features quantum coinflip visualization and Bloch sphere.',
        image: '/assets/projects/quantum-whirl.png',
        tags: ['JavaScript', 'Three.js', 'Quantum Computing'],
        demoUrl: 'https://muhib-mehdi.github.io/quantum-coin-flip/',
        githubUrl: 'https://github.com/Muhib-Mehdi/quantum-coin-flip',
        category: 'web-dev',
        featured: true,
        stats: { stars: 8, forks: 2 }
    },
    {
        id: 'jee-study-buddy',
        title: 'JEE Study Buddy',
        description: 'Comprehensive study companion for JEE Main preparation featuring syllabus tracking, digital flashcards, and progress visualization.',
        image: '/assets/projects/jee-study.png',
        tags: ['React', 'TailwindCSS', 'LocalStorage'],
        demoUrl: 'https://muhib-mehdi.github.io/JEE-main-Study-buddy-and-syllabus-tracker/',
        githubUrl: 'https://github.com/Muhib-Mehdi/JEE-main-Study-buddy-and-syllabus-tracker',
        category: 'web-dev',
        featured: true,
        stats: { stars: 15, forks: 5 }
    },

    // Mobile Apps
    {
        id: 'fitness-tracker',
        title: 'FitTrack Pro',
        description: 'Cross-platform fitness tracking app with workout plans, progress visualization, and social features.',
        image: '/assets/projects/fitness.jpg',
        tags: ['React Native', 'Firebase', 'Redux'],
        demoUrl: 'https://expo.dev/@muhib/fittrack',
        githubUrl: 'https://github.com/Muhib-Mehdi/fittrack',
        category: 'mobile-apps',
        stats: { stars: 45, forks: 8 }
    },
    {
        id: 'travel-companion',
        title: 'Travel Companion',
        description: 'AI-powered travel itinerary generator and expense tracker for backpackers.',
        image: '/assets/projects/travel.jpg',
        tags: ['Flutter', 'Dart', 'Google Maps API'],
        githubUrl: 'https://github.com/Muhib-Mehdi/travel-app',
        category: 'mobile-apps'
    },

    // AI / ML
    {
        id: 'asl-recognition',
        title: 'ASL Recognition System',
        description: 'Real-time American Sign Language gesture detection using computer vision and deep learning. Features simulated webcam interface.',
        image: '/assets/projects/asl-recognition.png',
        tags: ['Python', 'TensorFlow', 'OpenCV', 'MediaPipe'],
        githubUrl: 'https://github.com/Muhib-Mehdi/ASL-Recognition-System',
        category: 'ai-ml',
        featured: true,
        stats: { stars: 12, forks: 4 }
    },
    {
        id: 'sentiment-analysis',
        title: 'Twitter Sentiment Bot',
        description: 'NLP pipeline to analyze brand sentiment on Twitter in real-time.',
        image: '/assets/projects/nlp.jpg',
        tags: ['Python', 'NLTK', 'FastAPI'],
        githubUrl: 'https://github.com/Muhib-Mehdi/sentiment-bot',
        category: 'ai-ml'
    },

    // Python
    {
        id: 'python-1',
        title: 'Data Analytics Dashboard',
        description: 'Interactive data visualization dashboard with real-time analytics, predictive modeling, and automated reporting features.',
        image: '/assets/projects/dashboard.jpg',
        tags: ['Python', 'Pandas', 'Plotly', 'Django'],
        category: 'python'
    },
    {
        id: 'python-2',
        title: 'Web Scraping Tool',
        description: 'Automated web scraping framework with data extraction, cleaning, and storage capabilities.',
        image: '/assets/projects/scraper.jpg',
        tags: ['Python', 'BeautifulSoup', 'Selenium', 'Redis'],
        category: 'python'
    },

    // Java
    {
        id: 'java-1',
        title: 'E-Commerce Backend API',
        description: 'RESTful API for e-commerce platform with Spring Boot, featuring user authentication and product management.',
        image: '/assets/projects/java-api.jpg',
        tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
        category: 'java'
    },
    {
        id: 'java-2',
        title: 'Banking Application',
        description: 'Secure banking system with transaction management, account services, and comprehensive audit logging.',
        image: '/assets/projects/banking.jpg',
        tags: ['Java', 'Spring Security', 'MySQL', 'Hibernate'],
        category: 'java'
    }
];
