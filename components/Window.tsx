'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { WindowState } from '@/lib/store';
import { useState, useRef, useEffect } from 'react';
import { FiMinus, FiSquare, FiX } from 'react-icons/fi';
import { useMobile } from '@/lib/hooks/useMobile';
import { useSound } from '@/lib/sounds';

interface WindowProps {
    window: WindowState;
    children: React.ReactNode;
}

type SnapZone = 'top' | 'left' | 'right' | null;

export default function Window({ window: windowProp, children }: WindowProps) {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } = useStore();
    const [isDragging, setIsDragging] = useState(false);
    const [snapZone, setSnapZone] = useState<SnapZone>(null);
    const [showSnapPreview, setShowSnapPreview] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);
    const wasMaximized = useRef(false);
    const isMobile = useMobile();
    const { playOpen, playClose, playClick } = useSound();

    // Play open sound on mount
    useEffect(() => {
        playOpen();
    }, []);

    const handleClose = () => {
        playClose();
        closeWindow(windowProp.id);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.window-controls')) return;

        // If window is maximized, unmaximize it and adjust position
        if (windowProp.isMaximized) {
            wasMaximized.current = true;
            maximizeWindow(windowProp.id); // Toggle off maximize

            // Calculate new position to keep window under cursor
            const screenWidth = window.innerWidth;
            const newX = Math.max(0, Math.min(e.clientX - windowProp.size.width / 2, screenWidth - windowProp.size.width));
            updateWindowPosition(windowProp.id, newX, e.clientY - 20);

            dragOffset.current = {
                x: windowProp.size.width / 2,
                y: 20,
            };
        } else {
            dragOffset.current = {
                x: e.clientX - windowProp.position.x,
                y: e.clientY - windowProp.position.y,
            };
        }

        setIsDragging(true);
        focusWindow(windowProp.id);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleDrag = (e: MouseEvent) => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const snapThreshold = 10; // pixels from edge to trigger snap

            // Calculate new position
            let newX = e.clientX - dragOffset.current.x;
            let newY = e.clientY - dragOffset.current.y;

            // Constrain within screen bounds
            newX = Math.max(0, Math.min(newX, screenWidth - windowProp.size.width));
            newY = Math.max(0, Math.min(newY, screenHeight - windowProp.size.height));

            updateWindowPosition(windowProp.id, newX, newY);

            // Detect snap zones
            let currentSnapZone: SnapZone = null;

            if (e.clientY <= snapThreshold) {
                // Top edge - maximize
                currentSnapZone = 'top';
            } else if (e.clientX <= snapThreshold) {
                // Left edge - snap left half
                currentSnapZone = 'left';
            } else if (e.clientX >= screenWidth - snapThreshold) {
                // Right edge - snap right half
                currentSnapZone = 'right';
            }

            setSnapZone(currentSnapZone);
            setShowSnapPreview(currentSnapZone !== null);
        };

        const handleDragEnd = () => {
            setIsDragging(false);

            // Apply snap if in a snap zone
            if (snapZone) {
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const taskbarHeight = 48;

                switch (snapZone) {
                    case 'top':
                        // Maximize
                        maximizeWindow(windowProp.id);
                        playClick();
                        break;
                    case 'left':
                        // Snap to left half
                        updateWindowPosition(windowProp.id, 0, 0);
                        updateWindowSize(windowProp.id, screenWidth / 2, screenHeight - taskbarHeight);
                        playClick();
                        break;
                    case 'right':
                        // Snap to right half
                        updateWindowPosition(windowProp.id, screenWidth / 2, 0);
                        updateWindowSize(windowProp.id, screenWidth / 2, screenHeight - taskbarHeight);
                        playClick();
                        break;
                }
            }

            setSnapZone(null);
            setShowSnapPreview(false);
            wasMaximized.current = false;
        };

        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', handleDragEnd);

        return () => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging, windowProp.id, windowProp.size.width, windowProp.size.height, snapZone, updateWindowPosition, updateWindowSize, maximizeWindow, playClick]);

    if (windowProp.isMinimized) return null;

    const windowStyle = (windowProp.isMaximized || isMobile)
        ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)' }
        : {
            top: windowProp.position.y,
            left: windowProp.position.x,
            width: windowProp.size.width,
            height: windowProp.size.height,
        };

    const variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 25 },
        },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
    };

    // Snap preview overlay
    const getSnapPreviewStyle = () => {
        const taskbarHeight = 48;
        switch (snapZone) {
            case 'top':
                return {
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `calc(100% - ${taskbarHeight}px)`,
                };
            case 'left':
                return {
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: `calc(100% - ${taskbarHeight}px)`,
                };
            case 'right':
                return {
                    top: 0,
                    left: '50%',
                    width: '50%',
                    height: `calc(100% - ${taskbarHeight}px)`,
                };
            default:
                return {};
        }
    };

    return (
        <>
            {/* Snap Preview Overlay */}
            <AnimatePresence>
                {showSnapPreview && snapZone && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed pointer-events-none z-[9999]"
                        style={getSnapPreviewStyle()}
                    >
                        <div className="w-full h-full border-4 border-blue-500 bg-blue-500/20 backdrop-blur-sm rounded-lg">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                                    {snapZone === 'top' && '⬆️ Maximize'}
                                    {snapZone === 'left' && '⬅️ Snap Left'}
                                    {snapZone === 'right' && '➡️ Snap Right'}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Window */}
            <motion.div
                ref={windowRef}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute bg-white/30 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 overflow-hidden flex flex-col"
                style={{ ...windowStyle, zIndex: windowProp.zIndex }}
                onClick={() => focusWindow(windowProp.id)}
            >
                {/* Title Bar */}
                <div
                    className="h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-b border-white/10 flex items-center justify-between px-4 cursor-move select-none"
                    onMouseDown={handleMouseDown}
                    onDoubleClick={() => {
                        playClick();
                        maximizeWindow(windowProp.id);
                    }}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{windowProp.icon}</span>
                        <span className="text-sm font-medium text-gray-800">{windowProp.title}</span>
                    </div>
                    <div className="window-controls flex items-center gap-2">
                        <button
                            onClick={() => {
                                playClick();
                                minimizeWindow(windowProp.id);
                            }}
                            className="w-8 h-8 rounded-lg hover:bg-black/10 flex items-center justify-center transition-colors"
                        >
                            <FiMinus className="text-gray-700" />
                        </button>
                        <button
                            onClick={() => {
                                playClick();
                                maximizeWindow(windowProp.id);
                            }}
                            className="w-8 h-8 rounded-lg hover:bg-black/10 flex items-center justify-center transition-colors"
                        >
                            <FiSquare className="text-gray-700 text-sm" />
                        </button>
                        <button
                            onClick={handleClose}
                            className="w-8 h-8 rounded-lg hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                        >
                            <FiX className="text-gray-700 hover:text-white" />
                        </button>
                    </div>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-auto bg-white/30 backdrop-blur-sm p-2">{children}</div>
            </motion.div>
        </>
    );
}
