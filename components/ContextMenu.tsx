import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

export interface ContextMenuItem {
    label?: string;
    icon?: string;
    onClick?: () => void;
    separator?: boolean;
    disabled?: boolean;
}

interface ContextMenuProps {
    x: number;
    y: number;
    items: ContextMenuItem[];
    onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        document.addEventListener('contextmenu', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('contextmenu', handleClickOutside);
        };
    }, [onClose]);

    // Adjust position if menu would go off-screen
    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const adjustedX = x + rect.width > window.innerWidth ? window.innerWidth - rect.width - 10 : x;
            const adjustedY = y + rect.height > window.innerHeight ? window.innerHeight - rect.height - 10 : y;

            menuRef.current.style.left = `${adjustedX}px`;
            menuRef.current.style.top = `${adjustedY}px`;
        }
    }, [x, y]);

    return (
        <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[200] bg-white/95 backdrop-blur-xl border border-gray-200 rounded-lg shadow-2xl py-1 min-w-[200px]"
            style={{ left: x, top: y }}
        >
            {items.map((item, index) => (
                item.separator ? (
                    <div key={index} className="h-px bg-gray-200 my-1" />
                ) : (
                    <button
                        key={index}
                        onClick={() => {
                            if (!item.disabled && item.onClick) {
                                item.onClick();
                                onClose();
                            }
                        }}
                        disabled={item.disabled}
                        className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors ${item.disabled
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                            }`}
                    >
                        {item.icon && <span className="text-lg">{item.icon}</span>}
                        <span className="text-sm font-medium">{item.label}</span>
                    </button>
                )
            ))}
        </motion.div>
    );
}
