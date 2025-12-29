import { useEffect } from 'react';
import { useStore } from '../store';

export function useKeyboardShortcuts() {
    const { windows, focusWindow, closeWindow, setStartMenuOpen, isStartMenuOpen } = useStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Alt+Q - Switch between windows (Alt+Tab is reserved by OS)
            if (e.altKey && (e.key === 'q' || e.key === 'Q')) {
                e.preventDefault();
                const visibleWindows = windows.filter(w => !w.isMinimized);
                if (visibleWindows.length > 0) {
                    const currentIndex = visibleWindows.findIndex(w =>
                        w.zIndex === Math.max(...visibleWindows.map(win => win.zIndex))
                    );
                    const nextIndex = (currentIndex + 1) % visibleWindows.length;
                    focusWindow(visibleWindows[nextIndex].id);
                }
            }

            // Ctrl+W - Close current window
            if (e.ctrlKey && e.key === 'w') {
                e.preventDefault();
                const topWindow = windows.reduce((top, w) =>
                    !w.isMinimized && w.zIndex > (top?.zIndex || 0) ? w : top
                    , windows[0]);
                if (topWindow) {
                    closeWindow(topWindow.id);
                }
            }

            // Win+D (or Cmd+D on Mac) - Show desktop (minimize all)
            if ((e.metaKey || e.key === 'Meta') && e.key === 'd') {
                e.preventDefault();
                // Close start menu if open
                if (isStartMenuOpen) {
                    setStartMenuOpen(false);
                }
            }

            // Escape - Close start menu
            if (e.key === 'Escape' && isStartMenuOpen) {
                setStartMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [windows, focusWindow, closeWindow, setStartMenuOpen, isStartMenuOpen]);
}
