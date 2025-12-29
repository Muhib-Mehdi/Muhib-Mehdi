'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StartupAnimationProps {
    onComplete: () => void;
}

export default function StartupAnimation({ onComplete }: StartupAnimationProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-[200]">
            <div className="flex flex-col items-center gap-8">
                {/* PC Emoji with glow effect */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative"
                >
                    <motion.div
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(139, 92, 246, 0.3)',
                                '0 0 60px rgba(139, 92, 246, 0.6)',
                                '0 0 20px rgba(139, 92, 246, 0.3)',
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-9xl filter drop-shadow-2xl"
                    >
                        💻
                    </motion.div>
                </motion.div>

                {/* Loading Spinner */}
                <div className="relative w-16 h-16">
                    <motion.div
                        className="absolute inset-0 border-4 border-purple-500/30 rounded-full"
                    />
                    <motion.div
                        className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* PortfolioOS Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold text-white mb-2">PortfolioOS</h1>
                    <p className="text-purple-300 text-sm">Initializing system...</p>
                </motion.div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
        </div>
    );
}
