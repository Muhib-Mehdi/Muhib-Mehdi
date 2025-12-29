'use client';

import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { AppDefinition } from '@/lib/constants';
import { useEffect, useState } from 'react';
import ContextMenu, { ContextMenuItem } from './ContextMenu';
import { useMobile } from '@/lib/hooks/useMobile';
import { useSound } from '@/lib/sounds';

interface DesktopIconProps {
    app: AppDefinition;
    index: number;
}

export default function DesktopIcon({ app, index }: DesktopIconProps) {
    const { openWindow, iconPositions, updateIconPosition } = useStore();
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const isMobile = useMobile();
    const { playClick } = useSound();

    // Responsive grid
    const GRID_COLS = isMobile ? 4 : 17;
    const GRID_ROWS = isMobile ? 8 : 10;

    // Calculate cell size based on viewport
    const [cellWidth, setCellWidth] = useState(0);
    const [cellHeight, setCellHeight] = useState(0);

    useEffect(() => {
        const updateGridSize = () => {
            if (typeof window !== 'undefined') {
                const width = window.innerWidth;
                const height = window.innerHeight - 60; // Account for taskbar

                setCellWidth(width / GRID_COLS);
                setCellHeight(height / GRID_ROWS);
            }
        };

        updateGridSize();
        window.addEventListener('resize', updateGridSize);
        return () => window.removeEventListener('resize', updateGridSize);
    }, []);

    // Calculate default position - vertical column on left side
    const getDefaultPosition = () => {
        if (cellWidth === 0 || cellHeight === 0) {
            return { x: 0, y: 0 };
        }

        // Arrange in columns (fill top-to-bottom, then left-to-right)
        const maxRows = GRID_ROWS - 1; // Leave 1 row buffer at bottom
        const col = Math.floor(index / maxRows);
        const row = index % maxRows;

        // Snap to grid
        return {
            x: col * cellWidth,
            y: row * cellHeight,
        };
    };

    // Get saved position or default
    const savedPosition = iconPositions[app.id];
    const defaultPos = getDefaultPosition();

    // Use saved position if available, otherwise default
    const initialPos = savedPosition || defaultPos;
    const x = useMotionValue(initialPos.x);
    const y = useMotionValue(initialPos.y);

    // Update position when saved position or cell size changes
    useEffect(() => {
        if (cellWidth > 0 && cellHeight > 0) {
            const pos = savedPosition || defaultPos;
            x.set(pos.x);
            y.set(pos.y);
        }
    }, [savedPosition, defaultPos.x, defaultPos.y, cellWidth, cellHeight, x, y]);

    // Snap to nearest grid cell on drag end
    const handleDragEnd = () => {
        const currentX = x.get();
        const currentY = y.get();

        // Find nearest grid cell
        const nearestCol = Math.round(currentX / cellWidth);
        const nearestRow = Math.round(currentY / cellHeight);

        // Clamp to grid bounds
        const clampedCol = Math.max(0, Math.min(nearestCol, GRID_COLS - 1));
        const clampedRow = Math.max(0, Math.min(nearestRow, GRID_ROWS - 1));

        // Calculate snapped position
        const snappedX = clampedCol * cellWidth;
        const snappedY = clampedRow * cellHeight;

        // Animate to snapped position
        x.set(snappedX);
        y.set(snappedY);

        // Save position
        updateIconPosition(app.id, snappedX, snappedY);
    };

    const handleDoubleClick = () => {
        playClick();
        if (app.type === 'link' && app.url) {
            window.open(app.url, '_blank');
        } else {
            openWindow(app.id, app.name, app.icon, { appType: app.type });
        }
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) {
            setContextMenu({ x: e.clientX, y: e.clientY });
        }
    };

    const iconMenuItems: ContextMenuItem[] = [
        {
            label: 'Open',
            icon: '📂',
            onClick: () => {
                playClick();
                openWindow(app.id, app.name, app.icon, { appType: app.type });
            },
        },
        { separator: true },
        {
            label: 'Delete',
            icon: '🗑️',
            onClick: () => { },
            disabled: true,
        },
        {
            label: 'Rename',
            icon: '✏️',
            onClick: () => { },
            disabled: true,
        },
        { separator: true },
        {
            label: 'Properties',
            icon: '⚙️',
            onClick: () => { },
            disabled: true,
        },
    ];

    // Don't render until grid is calculated
    if (cellWidth === 0 || cellHeight === 0) return null;

    return (
        <motion.div
            className="absolute cursor-pointer select-none"
            style={{
                x,
                y,
                width: 70,
                height: 70,
            }}
            drag
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
                handleDragEnd();
                setTimeout(() => setIsDragging(false), 100);
            }}
            onDoubleClick={handleDoubleClick}
            onContextMenu={handleContextMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay: index * 0.03,
                duration: 0.3,
                ease: 'easeOut',
            }}
        >
            <div className="flex flex-col items-center justify-center h-full p-1 rounded-lg hover:bg-white/10 transition-colors duration-150">
                <div className="text-4xl filter drop-shadow-lg mb-1">{app.icon}</div>
                <div className="text-white text-[10px] text-center font-medium leading-tight w-full px-1 break-words">
                    {app.name}
                </div>
            </div>

            {/* Context Menu */}
            <AnimatePresence>
                {contextMenu && (
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        items={iconMenuItems}
                        onClose={() => setContextMenu(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
