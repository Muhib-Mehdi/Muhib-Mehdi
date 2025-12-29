'use client';

import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { APPS } from '@/lib/constants';
import { PERSONAL_INFO, SKILLS, CERTIFICATES, HONORS } from '@/lib/config';
import { getAllProjects } from '@/lib/data/projects-config';

export default function Terminal() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [output, setOutput] = useState<Array<{ command: string; result: string; timestamp: string }>>([
        { command: '', result: 'PortfolioOS Terminal v1.0\nType "help" for available commands.', timestamp: new Date().toLocaleTimeString() },
    ]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);
    const { openWindow, unlockEasterEgg, setMatrixActive } = useStore();

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        setHistory(prev => [...prev, trimmedCmd]);
        const timestamp = new Date().toLocaleTimeString();
        const args = trimmedCmd.split(' ');
        const command = args[0].toLowerCase();
        const param = args.slice(1).join(' ');

        let result = '';

        switch (command) {
            case 'help':
                result = `Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Basic Commands:
  help          - Show this help message
  clear         - Clear terminal screen
  whoami        - Display user information
  ls            - List all desktop icons
  pwd           - Print working directory
  date          - Display current date and time
  echo <text>   - Echo text back
  projects      - List all projects
  open <app>    - Open an application
  matrix        - Activate Matrix rain effect

Interactive Commands:
  skills        - Display tech stack
  experience    - Show work history
  contact       - Display contact info
  github        - Open GitHub profile
  linkedin      - Open LinkedIn profile
  resume        - Download resume
  certificates  - List certifications
  honors        - List honors & awards
  search <query> - Search projects and skills
  random-project - Open random project
  stats         - Portfolio statistics
  quote         - Random coding quote
  theme <mode>  - Switch theme (dark/light)
  history       - Show command history
  cowsay <text> - ASCII art fun
  fortune       - Random tech tip

Try "easter-egg-1", "easter-egg-2", or "easter-egg-3" 👀
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
                break;

            case 'clear':
                setOutput([]);
                return;

            case 'whoami':
                result = `User: ${PERSONAL_INFO.email}
System: PortfolioOS v1.0
Architecture: Web-based Desktop Environment
Location: ${PERSONAL_INFO.location}`;
                break;

            case 'ls':
                result = APPS.map(app => `${app.type === 'folder' ? '📁' : '📄'} ${app.name}`).join('\n');
                break;

            case 'pwd':
                result = '/home/portfolio';
                break;

            case 'date':
                result = new Date().toLocaleString();
                break;

            case 'echo':
                result = param || '';
                break;

            case 'projects':
                const allProjects = getAllProjects();
                result = `Total Projects: ${allProjects.length}\n\n` +
                    allProjects.map(p => `• ${p.name}\n  ${p.githubUrl}`).join('\n\n');
                break;

            case 'open':
                const app = APPS.find(a => a.id === param || a.name.toLowerCase() === param.toLowerCase());
                if (app) {
                    if (app.type === 'link' && app.url) {
                        window.open(app.url, '_blank');
                        result = `Opening ${app.name} in new tab...`;
                    } else {
                        openWindow(app.id, app.name, app.icon);
                        result = `Opening ${app.name}...`;
                    }
                } else {
                    result = `App not found: ${param}`;
                }
                break;

            case 'matrix':
                setMatrixActive(true);
                result = 'Entering the Matrix... Press ESC to exit.';
                break;

            case 'skills':
                result = `Tech Stack:\n\n` +
                    SKILLS.languages.map(s => `${s.icon} ${s.name} - ${s.proficiency}%`).join('\n') +
                    '\n\nFrameworks:\n' +
                    SKILLS.frameworks.map(f => `${f.icon} ${f.name} - ${f.proficiency}%`).join('\n');
                break;

            case 'experience':
                result = `Work Experience:\n\n` +
                    `Current: Senior Full Stack Developer\nCompany: Tech Company Inc.\nDuration: 2022 - Present`;
                break;

            case 'contact':
                result = `Contact Information:\n\nEmail: ${PERSONAL_INFO.email}\nPhone: ${PERSONAL_INFO.phone}\nLocation: ${PERSONAL_INFO.location}`;
                break;

            case 'github':
                window.open(PERSONAL_INFO.github, '_blank');
                result = 'Opening GitHub profile...';
                break;

            case 'linkedin':
                window.open(PERSONAL_INFO.linkedin, '_blank');
                result = 'Opening LinkedIn profile...';
                break;

            case 'resume':
                const link = document.createElement('a');
                link.href = PERSONAL_INFO.resumeUrl;
                link.download = 'resume.pdf';
                link.click();
                result = 'Downloading resume...';
                break;

            case 'certificates':
                result = `Certifications:\n\n` +
                    CERTIFICATES.map((c, i) => `${i + 1}. ${c.name} - ${c.issuer} (${c.date})`).join('\n');
                break;

            case 'honors':
                result = `Honors & Awards:\n\n` +
                    HONORS.map((h, i) => `${i + 1}. ${h.title} - ${h.organization} (${h.date})`).join('\n');
                break;

            case 'search':
                if (param) {
                    const projects = getAllProjects().filter(p =>
                        p.name.toLowerCase().includes(param.toLowerCase()) ||
                        p.technologies.some(t => t.toLowerCase().includes(param.toLowerCase()))
                    );
                    result = projects.length > 0
                        ? `Found ${projects.length} results:\n\n` + projects.map(p => `• ${p.name}`).join('\n')
                        : `No results found for "${param}"`;
                } else {
                    result = 'Usage: search <query>';
                }
                break;

            case 'random-project':
                const randomProj = getAllProjects()[Math.floor(Math.random() * getAllProjects().length)];
                window.open(randomProj.githubUrl, '_blank');
                result = `Opening random project: ${randomProj.name}`;
                break;

            case 'stats':
                result = `Portfolio Statistics:\n\n• Total Projects: ${getAllProjects().length}\n• Programming Languages: ${SKILLS.languages.length}\n• Frameworks: ${SKILLS.frameworks.length}\n• Years of Experience: 5+`;
                break;

            case 'quote':
                const quotes = [
                    '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
                    '"First, solve the problem. Then, write the code." - John Johnson',
                    '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
                    '"The best error message is the one that never shows up." - Thomas Fuchs',
                ];
                result = quotes[Math.floor(Math.random() * quotes.length)];
                break;

            case 'theme':
                result = param === 'dark' || param === 'light'
                    ? `Theme switched to ${param} mode`
                    : 'Usage: theme <dark|light>';
                break;

            case 'history':
                result = history.map((h, i) => `${i + 1}. ${h}`).join('\n');
                break;

            case 'cowsay':
                result = param
                    ? ` ${'_'.repeat(param.length + 2)}\n< ${param} >\n ${'‾'.repeat(param.length + 2)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`
                    : 'Usage: cowsay <text>';
                break;

            case 'fortune':
                const fortunes = [
                    'Remember to commit your code before leaving!',
                    'A good programmer looks both ways before crossing a one-way street.',
                    'Debugging is twice as hard as writing code in the first place.',
                    'The best code is no code at all.',
                ];
                result = fortunes[Math.floor(Math.random() * fortunes.length)];
                break;

            // Easter Eggs
            case 'easter-egg-1':
                unlockEasterEgg('neural-interface');
                useStore.getState().addNotification({
                    title: '🎉 Secret Unlocked!',
                    message: 'You discovered the "Neural Interface" project! Check your desktop.',
                    type: 'achievement',
                });
                result = '🎉 Secret project unlocked!\n\nYou\'ve discovered the "Neural Interface" project!\nCheck your desktop for the new icon.';
                break;

            case 'easter-egg-2':
                unlockEasterEgg('terminal-master');
                useStore.getState().addNotification({
                    title: '🚀 Achievement Unlocked!',
                    message: 'Terminal Master Certified! You are now a terminal wizard.',
                    type: 'achievement',
                });
                result = '🚀 Hidden achievement unlocked!\n\n╔═══════════════════════════════╗\n║   TERMINAL MASTER CERTIFIED   ║\n║                               ║\n║  You are now a terminal wizard║\n╚═══════════════════════════════╝';
                break;

            case 'easter-egg-3':
                unlockEasterEgg('tech-stack');
                useStore.getState().addNotification({
                    title: '🌟 Ultimate Secret Revealed!',
                    message: 'You found all the secrets! Tech Stack unlocked.',
                    type: 'achievement',
                });
                result = '🌟 Ultimate secret revealed!\n\nThis portfolio was built with:\n• Next.js 14\n• TypeScript\n• Framer Motion\n• Zustand\n• Tailwind CSS\n\nCongratulations on finding all the secrets! 🎊';
                break;

            case 'konami':
                result = '🎮 Konami Code activated! You\'re a legend!';
                break;

            case 'hack':
                result = 'Initializing hack sequence...\n[████████████████████] 100%\nAccess granted. Welcome, hacker. 😎';
                break;

            case 'sudo':
                if (param === 'make-me-a-sandwich') {
                    result = 'Okay. 🥪';
                } else {
                    result = 'Permission denied. Try "sudo make-me-a-sandwich"';
                }
                break;

            default:
                result = `Command not found: ${command}\nType "help" for available commands.`;
        }

        setOutput(prev => [...prev, { command: trimmedCmd, result, timestamp }]);
        setInput('');
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            executeCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <div
            className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-hidden flex flex-col"
            onClick={() => inputRef.current?.focus()}
        >
            <div ref={outputRef} className="flex-1 overflow-y-auto mb-2">
                {output.map((item, index) => (
                    <div key={index} className="mb-2">
                        {item.command && (
                            <div className="flex gap-2">
                                <span className="text-green-500">$</span>
                                <span className="text-white">{item.command}</span>
                            </div>
                        )}
                        <div className="whitespace-pre-wrap text-green-400 ml-4">{item.result}</div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <span className="text-green-500">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-white"
                    autoFocus
                />
            </div>
        </div>
    );
}
