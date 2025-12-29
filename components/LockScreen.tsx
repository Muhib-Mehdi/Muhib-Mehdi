'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { PERSONAL_INFO } from '@/lib/config';
import { useState, useEffect } from 'react';

export default function LockScreen() {
    const { setCurrentScreen } = useStore();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Add global keyboard listener for ANY key press
    useEffect(() => {
        const handleKeyPress = () => {
            setCurrentScreen('desktop');
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [setCurrentScreen]);

    const handleUnlock = () => {
        setCurrentScreen('desktop');
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleUnlock}
        >
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                    backgroundImage: `url('/assets/wallpapers/main.jpg')`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Profile Picture */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-gradient-to-br from-purple-500 to-blue-500"
                >
                    <img
                        src="./assets/profile/profile.png"
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </motion.div>

                {/* Time */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <h1 className="text-7xl font-light text-white mb-2">
                        {formatTime(currentTime)}
                    </h1>
                    <p className="text-xl text-white/80">
                        {formatDate(currentTime)}
                    </p>
                </motion.div>

                {/* User Name */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-semibold text-white mb-2">
                        {PERSONAL_INFO.name}
                    </h2>
                    <p className="text-white/60 text-sm">
                        Click anywhere or press any key to unlock
                    </p>
                </motion.div>
            </div>

            {/* Bottom Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 text-white/40 text-sm"
            >
                Press any key to continue
            </motion.div>
        </motion.div>
    );
}
