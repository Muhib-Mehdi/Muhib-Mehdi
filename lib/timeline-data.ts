export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    description: string;
    category: 'education' | 'work' | 'project' | 'achievement';
    icon?: string;
}

export const TIMELINE_DATA: TimelineEvent[] = [
    {
        id: 'edu-1',
        title: 'Started Computer Science Degree',
        date: '2020',
        description: 'Began journey into software engineering at University.',
        category: 'education',
        icon: '🎓'
    },
    {
        id: 'proj-1',
        title: 'First Major Project',
        date: '2021',
        description: 'Built a full-stack web application using React and Node.js.',
        category: 'project',
        icon: '💻'
    },
    {
        id: 'work-1',
        title: 'Software Engineering Intern',
        date: '2022',
        description: 'Interned at Tech Corp, working on frontend optimization.',
        category: 'work',
        icon: '💼'
    },
    {
        id: 'ach-1',
        title: 'Hackathon Winner',
        date: '2022',
        description: 'Won 1st place in University Hackathon for innovative AI solution.',
        category: 'achievement',
        icon: '🏆'
    },
    {
        id: 'proj-2',
        title: 'Portfolio OS v1',
        date: '2023',
        description: 'Launched first version of portfolio operating system.',
        category: 'project',
        icon: '🚀'
    },
    {
        id: 'work-2',
        title: 'Freelance Developer',
        date: '2023 - Present',
        description: 'Building custom web solutions for clients worldwide.',
        category: 'work',
        icon: '🌍'
    },
    {
        id: 'edu-2',
        title: 'Graduated with Honors',
        date: '2024',
        description: 'Completed Bachelor of Science in Computer Science.',
        category: 'education',
        icon: '🎓'
    }
];
