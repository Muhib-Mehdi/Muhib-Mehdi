'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import StartupAnimation from './StartupAnimation';

export default function Startup() {
    const { setCurrentScreen } = useStore();

    const handleComplete = () => {
        setCurrentScreen('lock');
    };

    return <StartupAnimation onComplete={handleComplete} />;
}
