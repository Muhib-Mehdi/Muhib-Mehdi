'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { APPS } from '@/lib/constants';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import WindowRenderer from './WindowRenderer';
import StartMenu from './StartMenu';
import MatrixRain from './effects/MatrixRain';
import ContextMenu, { ContextMenuItem } from './ContextMenu';
import ShortcutsOverlay from './ShortcutsOverlay';
import NotificationCenter from './NotificationCenter';
import { AnimatePresence } from 'framer-motion';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts';
import { useMobile } from '@/lib/hooks/useMobile';
import { useSwipeGesture } from '@/lib/hooks/useSwipeGesture';
import { useSound } from '@/lib/sounds';
import Startup from './Startup';
import LockScreen from './LockScreen';
import AIAssistant from './AIAssistant';

export default function Desktop() {
    const {
        windows,
        currentScreen,
        setCurrentScreen,
        isStartMenuOpen,
        setStartMenuOpen,
        isMatrixActive,
        setMatrixActive,
        isNotificationCenterOpen,
        setNotificationCenterOpen,
        unlockedEasterEggs
    } = useStore();

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const isMobile = useMobile();
    const { playClick } = useSound();

    // Enable keyboard shortcuts
    useKeyboardShortcuts();

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const desktopMenuItems: ContextMenuItem[] = [
        {
            label: 'Refresh',
            icon: '🔄',
            onClick: () => {
                // Clear persisted state to reset everything
                localStorage.removeItem('portfolio-os-storage');
                window.location.reload();
            },
        },
        { separator: true },
        {
            label: 'Personalize',
            icon: '🎨',
            onClick: () => { },
            disabled: true,
        },
        {
            label: 'Display Settings',
            icon: '🖥️',
            onClick: () => { },
            disabled: true,
        },
    ];

    // Handle swipe gestures
    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeGesture({
        onSwipeUp: () => setStartMenuOpen(true),
        onSwipeDown: () => {
            if (isStartMenuOpen) setStartMenuOpen(false);
        },
        threshold: 50
    });

    if (currentScreen === 'startup') return <Startup />;
    if (currentScreen === 'lock') return <LockScreen />;

    return (
        <div
            className="h-screen w-screen overflow-hidden relative select-none"
            onContextMenu={handleContextMenu}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 z-[-2]" />

            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center z-[-1] transition-all duration-500 pointer-events-none"
                style={{
                    backgroundImage: `url('/assets/wallpapers/main.jpg')`,
                    filter: isStartMenuOpen ? 'blur(10px) brightness(0.8)' : 'none',
                    opacity: 0.6
                }}
            />

            {/* Matrix Effect */}
            <AnimatePresence>
                {isMatrixActive && <MatrixRain />}
            </AnimatePresence>

            {/* Desktop Icons */}
            {!isMobile && (
                <div className="absolute inset-0 p-4 z-0">
                    {APPS.filter(app => {
                        // Hide apps marked as hideFromDesktop (e.g., Task Manager)
                        if (app.hideFromDesktop) return false;
                        // Show all non-easter-egg apps
                        if (!app.isEasterEgg) return true;
                        // Show easter egg apps only if unlocked
                        return unlockedEasterEggs.includes(app.easterEggId || '');
                    }).map((app, index) => (
                        <DesktopIcon key={app.id} app={app} index={index} />
                    ))}
                </div>
            )}

            {/* Windows */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <AnimatePresence>
                    {windows.map((window) => (
                        <div key={window.id} className="pointer-events-auto">
                            <WindowRenderer window={window} />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Start Menu */}
            <AnimatePresence>
                {isStartMenuOpen && <StartMenu />}
            </AnimatePresence>

            {/* Notification Center */}
            <AnimatePresence>
                {isNotificationCenterOpen && <NotificationCenter />}
            </AnimatePresence>

            {/* Taskbar */}
            <Taskbar />

            {/* Context Menu */}
            <AnimatePresence>
                {contextMenu && (
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        items={desktopMenuItems}
                        onClose={() => setContextMenu(null)}
                    />
                )}
            </AnimatePresence>

            {/* Keyboard Shortcuts Overlay */}
            <ShortcutsOverlay />

            {/* AI Assistant */}
            <AIAssistant />
        </div>
    );
}
