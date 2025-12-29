import { useState, useEffect } from 'react';

export interface SnapPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function useWindowSnap(windowId: string) {
    const [snapPreview, setSnapPreview] = useState<SnapPosition | null>(null);
    const [isNearEdge, setIsNearEdge] = useState(false);

    const SNAP_THRESHOLD = 50; // pixels from edge to trigger snap

    const getSnapPosition = (x: number, y: number, screenWidth: number, screenHeight: number): SnapPosition | null => {
        const taskbarHeight = 48;
        const availableHeight = screenHeight - taskbarHeight;

        // Left half
        if (x < SNAP_THRESHOLD) {
            return {
                x: 0,
                y: 0,
                width: screenWidth / 2,
                height: availableHeight,
            };
        }

        // Right half
        if (x > screenWidth - SNAP_THRESHOLD) {
            return {
                x: screenWidth / 2,
                y: 0,
                width: screenWidth / 2,
                height: availableHeight,
            };
        }

        // Top (maximize)
        if (y < SNAP_THRESHOLD) {
            return {
                x: 0,
                y: 0,
                width: screenWidth,
                height: availableHeight,
            };
        }

        return null;
    };

    const checkSnapPosition = (x: number, y: number) => {
        if (typeof window === 'undefined') return;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const snapPos = getSnapPosition(x, y, screenWidth, screenHeight);

        if (snapPos) {
            setSnapPreview(snapPos);
            setIsNearEdge(true);
        } else {
            setSnapPreview(null);
            setIsNearEdge(false);
        }
    };

    const clearSnapPreview = () => {
        setSnapPreview(null);
        setIsNearEdge(false);
    };

    return {
        snapPreview,
        isNearEdge,
        checkSnapPosition,
        clearSnapPreview,
        getSnapPosition,
    };
}
