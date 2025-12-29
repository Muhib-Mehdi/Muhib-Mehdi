// ============================================
// PROJECTS CONFIGURATION
// ============================================
// Update your projects here!

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    thumbnail?: string;
    startDate?: string; // optional start date of the project
    endDate?: string;   // optional end date of the project
    featured?: boolean;
    stats?: {
        stars?: number;
        forks?: number;
    };
}

export const WEB_PROJECTS: Project[] = [
    {
        id: "web-1",
        name: "JEE Study Buddy",
        description: "Comprehensive study companion for JEE Main preparation featuring syllabus tracking, digital flashcards, organized notes, and progress visualization. Built with React and TailwindCSS for a responsive learning experience.",
        technologies: ["React", "TailwindCSS", "JavaScript", "LocalStorage"],
        githubUrl: "https://github.com/Muhib-Mehdi/JEE-main-Study-buddy-and-syllabus-tracker",
        thumbnail: "/assets/projects/jee-study.png",
        featured: true,
        stats: { stars: 15, forks: 5 },
    },
    {
        id: "web-2",
        name: "Quantum Whirl",
        description: "Interactive quantum computing simulator bringing quantum phenomena to your browser. Features quantum coinflip visualization, Bloch sphere representation, parameter control, and real-time quantum state calculations.",
        technologies: ["JavaScript", "HTML5", "CSS3", "Three.js", "Quantum Computing"],
        githubUrl: "https://github.com/Muhib-Mehdi/quantum-coin-flip",
        thumbnail: "/assets/projects/quantum-whirl.png",
        featured: true,
        stats: { stars: 8, forks: 2 },
    },
    {
        id: "web-3",
        name: "Task Management App",
        description: "Collaborative task management tool with real-time updates, team collaboration features, and project tracking.",
        technologies: ["Vue.js", "Firebase", "Vuex", "Material UI"],
        githubUrl: "https://github.com/yourusername/task-manager",
        thumbnail: "/assets/projects/task-manager.png",
    },
    {
        id: "web-4",
        name: "Portfolio Builder",
        description: "Drag-and-drop portfolio builder allowing users to create professional portfolios without coding.",
        technologies: ["React", "Express", "PostgreSQL", "AWS S3"],
        githubUrl: "https://github.com/yourusername/portfolio-builder",
        thumbnail: "/assets/projects/portfolio-builder.png",
    },
];

export const MOBILE_PROJECTS: Project[] = [
    {
        id: "mobile-1",
        name: "Fitness Tracker App",
        description: "Comprehensive fitness tracking application with workout plans, nutrition tracking, and progress analytics.",
        technologies: ["React Native", "Firebase", "Redux", "Expo"],
        githubUrl: "https://github.com/yourusername/fitness-tracker",
        thumbnail: "/assets/projects/fitness-app.png",
        featured: true,
    },
    {
        id: "mobile-2",
        name: "Recipe Finder",
        description: "Discover and save recipes with ingredient-based search, meal planning, and shopping list generation.",
        technologies: ["Flutter", "Dart", "Firebase", "REST API"],
        githubUrl: "https://github.com/yourusername/recipe-finder",
        thumbnail: "/assets/projects/recipe-app.png",
    },
    {
        id: "mobile-3",
        name: "Language Learning App",
        description: "Interactive language learning platform with gamification, progress tracking, and native speaker audio.",
        technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
        githubUrl: "https://github.com/yourusername/language-app",
        thumbnail: "/assets/projects/language-app.png",
    },
];

export const AI_ML_PROJECTS: Project[] = [
    {
        id: "ai-1",
        name: "ASL Recognition System",
        description: "Advanced deep learning application for real-time American Sign Language gesture detection using webcam. Features TensorFlow Lite model with high accuracy classification, lightweight inference, and cross-platform compatibility.",
        technologies: ["Python", "TensorFlow", "OpenCV", "MediaPipe", "Computer Vision"],
        githubUrl: "https://github.com/Muhib-Mehdi/ASL-Recognition-System",
        thumbnail: "/assets/projects/asl-recognition.png",
        featured: true,
        stats: { stars: 12, forks: 4 },
    },
    {
        id: "ai-2",
        name: "Sentiment Analysis Tool",
        description: "NLP-powered sentiment analysis for social media posts and customer reviews with real-time processing.",
        technologies: ["Python", "NLTK", "Scikit-learn", "FastAPI"],
        githubUrl: "https://github.com/yourusername/sentiment-analysis",
        thumbnail: "/assets/projects/sentiment.png",
    },
    {
        id: "ai-3",
        name: "Chatbot Assistant",
        description: "AI-powered chatbot using transformer models for natural conversation and task automation.",
        technologies: ["Python", "Transformers", "PyTorch", "Rasa"],
        githubUrl: "https://github.com/yourusername/ai-chatbot",
        thumbnail: "/assets/projects/chatbot.png",
    },
    {
        id: "ai-4",
        name: "Recommendation Engine",
        description: "Collaborative filtering recommendation system for e-commerce with personalized suggestions.",
        technologies: ["Python", "Pandas", "NumPy", "Surprise"],
        githubUrl: "https://github.com/yourusername/recommendation-engine",
        thumbnail: "/assets/projects/recommendation.png",
    },
];

export const UNFINISHED_PROJECTS: Project[] = [
    {
        id: "unfinished-1",
        name: "Real-time Collaboration Tool",
        description: "Started building a Figma-like collaboration tool but pivoted to focus on other projects. Learned a lot about WebRTC and operational transforms.",
        technologies: ["React", "WebRTC", "Socket.io", "Canvas API"],
        githubUrl: "https://github.com/yourusername/collab-tool",
        thumbnail: "/assets/projects/collab-tool.png",
    },
    {
        id: "unfinished-2",
        name: "Blockchain Voting System",
        description: "Experimental blockchain-based voting system. Paused due to scalability concerns and regulatory complexity.",
        technologies: ["Solidity", "Ethereum", "Web3.js", "React"],
        githubUrl: "https://github.com/yourusername/blockchain-voting",
        thumbnail: "/assets/projects/blockchain-vote.png",
    },
    {
        id: "unfinished-3",
        name: "AR Shopping Experience",
        description: "Augmented reality shopping app. Discontinued when similar solutions entered the market.",
        technologies: ["Unity", "ARKit", "C#", "Firebase"],
        githubUrl: "https://github.com/yourusername/ar-shopping",
        thumbnail: "/assets/projects/ar-shop.png",
    },
];

// Helper function to get all projects
export const getAllProjects = (): Project[] => {
    return [...WEB_PROJECTS, ...MOBILE_PROJECTS, ...AI_ML_PROJECTS];
};

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
    return getAllProjects().filter(p => p.featured);
};

// Helper function to get projects by technology
export const getProjectsByTech = (tech: string): Project[] => {
    return getAllProjects().filter(p =>
        p.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
    );
};
