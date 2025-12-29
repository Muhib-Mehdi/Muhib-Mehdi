'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { FiWifi, FiVolume2, FiVolumeX, FiBell } from 'react-icons/fi';
import ContextMenu, { ContextMenuItem } from './ContextMenu';
import { useMobile } from '@/lib/hooks/useMobile';
import { useSound } from '@/lib/sounds';

export default function Taskbar() {
    const { windows, isStartMenuOpen, setStartMenuOpen, focusWindow, isMuted, toggleMute } = useStore();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const isMobile = useMobile();
    const { playClick } = useSound();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent desktop context menu from showing
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const taskbarMenuItems: ContextMenuItem[] = [
        {
            label: 'Task Manager',
            icon: '📊',
            onClick: () => useStore.getState().openWindow('task-manager', 'Task Manager', '📊'),
        },
        { separator: true },
        {
            label: 'Taskbar Settings',
            icon: '⚙️',
            onClick: () => { },
            disabled: true,
        },
    ];

    return (
        <>
            <div
                className="fixed bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-2 z-50"
                onContextMenu={handleContextMenu}
            >
                {/* Start Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        playClick();
                        setStartMenuOpen(!isStartMenuOpen);
                    }}
                    className={`h-10 px-4 rounded-lg flex items-center gap-2 transition-colors ${isStartMenuOpen
                        ? 'bg-white/20'
                        : 'hover:bg-white/10'
                        }`}
                >
                    <span className="text-2xl">💻</span>
                </motion.button>

                {/* Open Windows */}
                <div className="flex-1 flex items-center gap-1 px-2 overflow-x-auto scrollbar-hide">
                    {windows.map((window) => (
                        <motion.button
                            key={window.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                playClick();
                                focusWindow(window.id);
                            }}
                            className={`h-10 px-3 rounded-lg flex items-center gap-2 transition-colors min-w-[40px] md:min-w-[120px] max-w-[200px] justify-center md:justify-start ${!window.isMinimized
                                ? 'bg-white/20 border-b-2 border-blue-500'
                                : 'bg-white/10 hover:bg-white/15'
                                }`}
                        >
                            <span className="text-lg">{window.icon}</span>
                            <span className="text-white text-sm truncate hidden md:block">{window.title}</span>
                        </motion.button>
                    ))}
                </div>

                {/* System Tray */}
                <div className="flex items-center gap-2 md:gap-4 px-2 md:px-4">
                    {/* Hide extra icons on mobile */}
                    {!isMobile && (
                        <>
                            <FiWifi className="text-white text-lg" />
                            <button onClick={toggleMute} className="hover:text-blue-400 transition-colors">
                                {isMuted ? <FiVolumeX className="text-red-400 text-lg" /> : <FiVolume2 className="text-white text-lg" />}
                            </button>
                        </>
                    )}

                    {/* Notifications */}
                    <button
                        onClick={() => {
                            playClick();
                            useStore.getState().setNotificationCenterOpen(!useStore.getState().isNotificationCenterOpen);
                        }}
                        className="relative p-1 hover:bg-white/10 rounded transition-colors"
                    >
                        <FiBell className="text-white text-lg" />
                        {useStore.getState().notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black flex items-center justify-center text-[8px] text-white font-bold">
                                {useStore.getState().notifications.length}
                            </span>
                        )}
                    </button>

                    {/* Time & Date */}
                    <div className="text-white text-xs text-right min-w-[60px]">
                        <div className="font-medium">{formatTime(currentTime)}</div>
                        {!isMobile && <div className="text-white/60">{formatDate(currentTime)}</div>}
                    </div>
                </div>
            </div>

            {/* Context Menu */}
            <AnimatePresence>
                {contextMenu && (
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        items={taskbarMenuItems}
                        onClose={() => setContextMenu(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
