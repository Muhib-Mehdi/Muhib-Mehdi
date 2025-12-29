'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import StartupAnimation from '@/components/StartupAnimation';
import LockScreen from '@/components/LockScreen';
import Desktop from '@/components/Desktop';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const { currentScreen, setCurrentScreen } = useStore();

  useEffect(() => {
    // Start with startup animation
    setCurrentScreen('startup');
  }, [setCurrentScreen]);

  return (
    <main className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'startup' && (
          <StartupAnimation
            key="startup"
            onComplete={() => setCurrentScreen('lock')}
          />
        )}

        {currentScreen === 'lock' && (
          <LockScreen
            key="lock"
          />
        )}

        {currentScreen === 'desktop' && (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </main>
  );
}
