// ============================================
// APPLICATION CONSTANTS
// ============================================

export interface AppDefinition {
    id: string;
    name: string;
    icon: string;
    type: 'app' | 'folder' | 'link';
    url?: string;
    isEasterEgg?: boolean;
    easterEggId?: string;
    hideFromDesktop?: boolean; // Hide from desktop icons (e.g., Task Manager)
}

export const APPS: AppDefinition[] = [
    { id: 'this-pc', name: 'This PC', icon: '💻', type: 'app' },
    { id: 'web-dev', name: 'Web Development', icon: '🌐', type: 'folder' },
    { id: 'mobile-apps', name: 'Mobile Apps', icon: '📱', type: 'folder' },
    { id: 'ai-ml', name: 'AI/ML', icon: '🤖', type: 'folder' },
    { id: 'python', name: 'Python', icon: '🐍', type: 'app' },
    { id: 'java', name: 'Java', icon: '☕', type: 'app' },
    { id: 'photos', name: 'Photos', icon: '📸', type: 'app' },
    { id: 'music', name: 'Music Player', icon: '🎵', type: 'app' },
    { id: 'recycle-bin', name: 'Recycle Bin', icon: '🗑️', type: 'app' },
    { id: 'terminal', name: 'Terminal', icon: '⌨️', type: 'app' },
    { id: 'notepad', name: 'Future Projects', icon: '📋', type: 'app' },
    { id: 'phone', name: 'Phone', icon: '📞', type: 'app' },
    { id: 'timeline-quest', name: 'Timeline Quest', icon: '🎯', type: 'app' },
    { id: 'task-manager', name: 'Task Manager', icon: '📊', type: 'app', hideFromDesktop: true },
    { id: 'calendar', name: 'Calendar', icon: '📅', type: 'app' },

    // Easter Egg Apps (hidden until unlocked)
    { id: 'neural-interface', name: 'Neural Interface', icon: '🧠', type: 'app', isEasterEgg: true, easterEggId: 'neural-interface' },
    { id: 'terminal-master', name: 'Terminal Master', icon: '🏆', type: 'app', isEasterEgg: true, easterEggId: 'terminal-master' },
    { id: 'tech-stack', name: 'Tech Stack', icon: '⚡', type: 'app', isEasterEgg: true, easterEggId: 'tech-stack' },
];

// Grid configuration
export const DESKTOP_GRID = {
    columns: 8,
    rows: 6,
    iconSize: 80,
    gap: 20,
};

// Window z-index management
export const Z_INDEX = {
    desktop: 1,
    window: 10,
    taskbar: 100,
    startMenu: 110,
    modal: 120,
    matrixEffect: 130,
};

// Animation durations (ms)
export const ANIMATION = {
    startup: 2500,
    lockScreenFade: 800,
    windowOpen: 300,
    windowClose: 200,
    iconHover: 150,
    chainReaction: 100, // Delay between each item in chain animation
};

// Color scheme
export const COLORS = {
    primary: '#0078d4',
    primaryHover: '#106ebe',
    accent: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    glass: 'rgba(255, 255, 255, 0.1)',
    glassDark: 'rgba(0, 0, 0, 0.3)',
};
