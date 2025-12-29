import { useState } from 'react';

interface SwipeGestureOptions {
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    threshold?: number;
}

export function useSwipeGesture({
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    threshold = 50
}: SwipeGestureOptions) {
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStart({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        });
    };

    const onTouchMove = (e: React.TouchEvent) => {
        // Optional: Add visual feedback during swipe
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        const deltaX = touchStart.x - touchEnd.x;
        const deltaY = touchStart.y - touchEnd.y;

        // Determine if swipe is more vertical or horizontal
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            // Vertical swipe
            if (Math.abs(deltaY) > threshold) {
                if (deltaY > 0) {
                    // Swipe Up
                    onSwipeUp?.();
                } else {
                    // Swipe Down
                    onSwipeDown?.();
                }
            }
        } else {
            // Horizontal swipe
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    // Swipe Left
                    onSwipeLeft?.();
                } else {
                    // Swipe Right
                    onSwipeRight?.();
                }
            }
        }

        setTouchStart(null);
    };

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    };
}
