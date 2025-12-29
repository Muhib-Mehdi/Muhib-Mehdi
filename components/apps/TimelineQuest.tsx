'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TIMELINE_EVENTS } from '@/lib/config';

interface Target {
    year: number;
    event: typeof TIMELINE_EVENTS[0];
    position: number;
}

export default function TimelineQuest() {
    // Game state
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [targets, setTargets] = useState<Target[]>([]);
    const [arrow, setArrow] = useState({ x: 50, y: 90, angle: 0, fired: false });
    const [power, setPower] = useState(0);
    const [isCharging, setIsCharging] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<typeof TIMELINE_EVENTS[0] | null>(null);
    const [gameState, setGameState] = useState<'playing' | 'hit' | 'miss'>('playing');

    // Generate targets based on level
    useEffect(() => {
        const newTargets = TIMELINE_EVENTS.slice(0, Math.min(5 + level, TIMELINE_EVENTS.length)).map(
            (event, index) => ({
                year: event.year,
                event,
                position: 20 + index * 15 + Math.random() * 10,
            })
        );
        setTargets(newTargets);
    }, [level]);

    // Charging logic
    const handleMouseDown = () => {
        if (gameState !== 'playing' || arrow.fired) return;
        setIsCharging(true);
    };

    const handleMouseUp = () => {
        if (!isCharging || arrow.fired) return;
        setIsCharging(false);
        setArrow((prev) => ({ ...prev, fired: true }));
        // Simulate arrow flight
        setTimeout(() => {
            checkHit();
        }, 1000);
    };

    useEffect(() => {
        if (isCharging) {
            const interval = setInterval(() => {
                setPower((prev) => Math.min(prev + 2, 100));
            }, 50);
            return () => clearInterval(interval);
        } else {
            setPower(0);
        }
    }, [isCharging]);

    const checkHit = () => {
        const targetIndex = Math.floor((power / 100) * targets.length);
        const target = targets[targetIndex];
        if (target) {
            setSelectedEvent(target.event);
            setGameState('hit');
            setScore((prev) => prev + 100);
            setTimeout(() => {
                setGameState('playing');
                setArrow({ x: 50, y: 90, angle: 0, fired: false });
                setSelectedEvent(null);
            }, 3000);
        } else {
            setGameState('miss');
            setTimeout(() => {
                setGameState('playing');
                setArrow({ x: 50, y: 90, angle: 0, fired: false });
            }, 2000);
        }
    };

    const nextLevel = () => {
        setLevel((prev) => prev + 1);
        setScore((prev) => prev + 50);
    };

    // Window animation variants (OS‑style)
    const windowVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 25 },
        },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            variants={windowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-white/30 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden"
            style={{ top: 80, left: 80, width: 'calc(100% - 160px)', height: 'calc(100% - 160px)' }}
        >
            {/* Professional Coding Background Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='5' y='15' fill='%2300ff00' font-family='monospace' font-size='12'%3E%3C/%3E%3C/text%3E%3Ctext x='25' y='35' fill='%2300ff00' font-family='monospace' font-size='12'%3E{}%3C/text%3E%3Ctext x='10' y='50' fill='%2300ff00' font-family='monospace' font-size='10'%3E01%3C/text%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/30 to-blue-900/30" />

            {/* Header */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg">
                    <span className="font-bold text-white">Score: {score}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg">
                    <span className="font-bold text-white">Level: {level}</span>
                </div>
            </div>

            {/* Instructions */}
            {gameState === 'playing' && !arrow.fired && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg text-center z-10">
                    <p className="text-sm font-medium text-white">Click and hold to charge, release to shoot! 🏹</p>
                </div>
            )}

            {/* Targets */}
            <div className="absolute inset-0 flex flex-col justify-center">
                {targets.map((target, index) => (
                    <motion.div
                        key={target.event.id}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="absolute right-10"
                        style={{ top: `${target.position}%` }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur-md border border-purple-500/50 px-4 py-2 rounded-lg shadow-lg">
                                <span className="font-bold text-purple-300">{target.year}</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl shadow-lg border-2 border-white/30">
                                🎯
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bow and Arrow */}
            <div
                className="absolute bottom-10 left-10 cursor-pointer select-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => {
                    if (isCharging) handleMouseUp();
                }}
            >
                <div className="relative">
                    <div className="text-6xl filter drop-shadow-lg">🏹</div>
                    {isCharging && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-32 h-2 bg-gray-700 rounded-full overflow-hidden border border-white/20">
                            <motion.div className="h-full bg-gradient-to-r from-green-500 to-red-500" style={{ width: `${power}%` }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Flying Arrow */}
            {arrow.fired && (
                <motion.div
                    className="absolute text-4xl filter drop-shadow-lg"
                    initial={{ x: 80, y: typeof window !== 'undefined' ? window.innerHeight - 100 : 900 }}
                    animate={{ x: typeof window !== 'undefined' ? window.innerWidth - 100 : 1800, y: 100 + (power / 100) * 400 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    ➤
                </motion.div>
            )}

            {/* Hit / Miss Feedback */}
            <AnimatePresence>
                {gameState === 'hit' && selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center z-20 bg-black/70 backdrop-blur-sm"
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-green-500 rounded-2xl p-8 max-w-md text-center">
                            <div className="text-6xl mb-4">🎯</div>
                            <h2 className="text-3xl font-bold text-green-400 mb-2">Perfect Hit!</h2>
                            <h3 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                            <p className="text-gray-300 mb-2">{selectedEvent.description}</p>
                            <p className="text-lg font-bold text-purple-400">Year: {selectedEvent.year}</p>
                            <p className="text-sm text-green-400 mt-4">+100 points!</p>
                        </div>
                    </motion.div>
                )}
                {gameState === 'miss' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center z-20 bg-black/70 backdrop-blur-sm"
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-red-500 rounded-2xl p-8 max-w-md text-center">
                            <div className="text-6xl mb-4">😅</div>
                            <h2 className="text-3xl font-bold text-red-400 mb-2">Missed!</h2>
                            <p className="text-gray-300">Try again!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Level Complete */}
            {score > 0 && score % 500 === 0 && (
                <div className="absolute bottom-20 right-10 z-10">
                    <button
                        onClick={nextLevel}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-shadow border border-white/20"
                    >
                        Next Level →
                    </button>
                </div>
            )}
        </motion.div>
    );
}
