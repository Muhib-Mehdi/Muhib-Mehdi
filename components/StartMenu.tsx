'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { APPS } from '@/lib/constants';
import { PERSONAL_INFO } from '@/lib/config';
import { FiSearch, FiPower } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useMobile } from '@/lib/hooks/useMobile';
import { useSound } from '@/lib/sounds';

export default function StartMenu() {
    const { setStartMenuOpen, openWindow, unlockedEasterEggs } = useStore();
    const [searchQuery, setSearchQuery] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);
    const { playClick } = useSound();

    const filteredApps = APPS.filter(app =>
        app.type !== 'link' &&
        !app.isEasterEgg && // Hide easter egg apps from Start Menu
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ... (keep useEffect)

    const handleAppClick = (app: typeof APPS[0]) => {
        playClick();
        if (app.type === 'link' && app.url) {
            window.open(app.url, '_blank');
        } else {
            openWindow(app.id, app.name, app.icon, { appType: app.type });
        }
        setStartMenuOpen(false);
    };

    const isMobile = useMobile();

    // ... (keep useEffect)

    return (
        <AnimatePresence>
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`fixed z-[60] bg-white/90 backdrop-blur-2xl overflow-hidden border border-white/20 shadow-2xl
                    ${isMobile
                        ? 'inset-0 rounded-none'
                        : 'bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-xl'
                    }`}
            >
                {/* Search Bar */}
                <div className="p-6 border-b border-gray-200">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search apps..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Pinned Apps */}
                <div className="p-6 overflow-y-auto h-[calc(100%-140px)]">
                    <h3 className="text-sm font-semibold text-gray-600 mb-4">Pinned</h3>
                    <div className={`grid gap-4 ${isMobile ? 'grid-cols-3' : 'grid-cols-6'}`}>
                        {filteredApps.map((app) => (
                            <motion.button
                                key={app.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAppClick(app)}
                                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-3xl">{app.icon}</span>
                                <span className="text-xs text-gray-700 text-center truncate w-full">
                                    {app.name}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* User Profile */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/95 to-transparent border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500">
                            <img
                                src="/assets/profile/profile-photo.png"
                                alt={PERSONAL_INFO.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-800">{PERSONAL_INFO.name}</div>
                            <div className="text-xs text-gray-500">{PERSONAL_INFO.email}</div>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            // Logout functionality (placeholder)
                            alert('Logout functionality - connect to your auth system');
                        }}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Logout"
                    >
                        <FiPower className="text-gray-600" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
