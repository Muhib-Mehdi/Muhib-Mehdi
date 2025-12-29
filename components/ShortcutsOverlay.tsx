import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ShortcutsOverlay() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleShow = () => setIsVisible(true);
        window.addEventListener('show-shortcuts', handleShow);
        return () => window.removeEventListener('show-shortcuts', handleShow);
    }, []);

    const shortcuts = [
        {
            category: 'Windows',
            items: [
                { keys: ['Alt', 'Q'], description: 'Switch between windows' },
                { keys: ['Ctrl', 'W'], description: 'Close current window' },
                { keys: ['Win', 'D'], description: 'Show desktop' },
            ],
        },
        {
            category: 'Navigation',
            items: [
                { keys: ['Esc'], description: 'Close start menu' },
                { keys: ['?'], description: 'Show this help' },
            ],
        },
        {
            category: 'Window Management',
            items: [
                { keys: ['Drag to edge'], description: 'Snap window to half screen' },
                { keys: ['Drag to top'], description: 'Maximize window' },
                { keys: ['Right-click'], description: 'Context menu' },
            ],
        },
    ];

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] flex items-center justify-center"
                onClick={() => setIsVisible(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Keyboard Shortcuts</h2>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-6">
                        {shortcuts.map((section) => (
                            <div key={section.category}>
                                <h3 className="text-lg font-semibold text-purple-600 mb-3">
                                    {section.category}
                                </h3>
                                <div className="space-y-2">
                                    {section.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex items-center gap-2">
                                                {item.keys.map((key, i) => (
                                                    <span key={i}>
                                                        <kbd className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm text-sm font-mono">
                                                            {key}
                                                        </kbd>
                                                        {i < item.keys.length - 1 && (
                                                            <span className="mx-1 text-gray-400">+</span>
                                                        )}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-gray-600">{item.description}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Esc</kbd> or click outside to close
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
