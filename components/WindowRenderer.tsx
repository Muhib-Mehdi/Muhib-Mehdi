'use client';

import { WindowState } from '@/lib/store';
import Window from './Window';
import dynamic from 'next/dynamic';

// Dynamically import all app components
const ThisPC = dynamic(() => import('./apps/ThisPC'));
const Folder = dynamic(() => import('./apps/Folder'));
const Terminal = dynamic(() => import('./apps/Terminal'));
const Notepad = dynamic(() => import('./apps/Notepad'));
const Photos = dynamic(() => import('./apps/Photos'));
const MusicPlayer = dynamic(() => import('./apps/MusicPlayer'));
const RecycleBin = dynamic(() => import('./apps/RecycleBin'));
const PhoneApp = dynamic(() => import('./apps/PhoneApp'));
const TimelineQuest = dynamic(() => import('./apps/TimelineQuest'));
const PythonApp = dynamic(() => import('./apps/PythonApp'));
const JavaApp = dynamic(() => import('./apps/JavaApp'));
const TaskManager = dynamic(() => import('./apps/TaskManager'));
const Calendar = dynamic(() => import('./apps/Calendar'));

interface WindowRendererProps {
    window: WindowState;
}

export default function WindowRenderer({ window }: WindowRendererProps) {
    const renderContent = () => {
        switch (window.appId) {
            case 'this-pc':
                return <ThisPC />;
            case 'web-dev':
                return <Folder folderId="web-dev" />;
            case 'mobile-apps':
                return <Folder folderId="mobile-apps" />;
            case 'ai-ml':
                return <Folder folderId="ai-ml" />;
            case 'python':
                return <PythonApp />;
            case 'java':
                return <JavaApp />;
            case 'photos':
                return <Photos />;
            case 'music':
                return <MusicPlayer />;
            case 'recycle-bin':
                return <RecycleBin />;
            case 'terminal':
                return <Terminal />;
            case 'notepad':
                return <Notepad />;
            case 'phone':
                return <PhoneApp />;
            case 'timeline-quest':
                return <TimelineQuest />;
            case 'task-manager':
                return <TaskManager />;
            case 'calendar':
                return <Calendar />;
            default:
                return (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">App not found</p>
                    </div>
                );
        }
    };

    return <Window window={window}>{renderContent()}</Window>;
}
