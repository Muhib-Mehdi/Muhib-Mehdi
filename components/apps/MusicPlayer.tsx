'use client';

import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/config';
import { useState } from 'react';
import { FiPlay, FiPause, FiSkipForward, FiSkipBack, FiShuffle } from 'react-icons/fi';

export default function MusicPlayer() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const currentTestimonial = TESTIMONIALS[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setIsPlaying(false);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
        setIsPlaying(false);
    };

    const handleShuffle = () => {
        const randomIndex = Math.floor(Math.random() * TESTIMONIALS.length);
        setCurrentIndex(randomIndex);
        setIsPlaying(false);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentTestimonial.text);
            utterance.onend = () => setIsPlaying(false);
            window.speechSynthesis.speak(utterance);
        } else {
            window.speechSynthesis.cancel();
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                ⭐
            </span>
        ));
    };

    return (
        <div className="h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
            <div className="max-w-2xl mx-auto h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Testimonials & Recommendations</h1>
                    <p className="text-purple-200">What people say about working with me</p>
                </div>

                {/* Now Playing */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-3xl">
                            👤
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{currentTestimonial.author}</h2>
                            <p className="text-purple-200">{currentTestimonial.role}</p>
                        </div>
                    </div>

                    <div className="mb-4">{renderStars(currentTestimonial.rating)}</div>

                    <p className="text-lg leading-relaxed mb-4 italic">
                        "{currentTestimonial.text}"
                    </p>

                    <p className="text-sm text-purple-200">
                        {new Date(currentTestimonial.date).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                </motion.div>

                {/* Controls */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <button
                            onClick={handleShuffle}
                            className="p-3 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <FiShuffle size={20} />
                        </button>
                        <button
                            onClick={handlePrevious}
                            className="p-3 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <FiSkipBack size={24} />
                        </button>
                        <button
                            onClick={handlePlayPause}
                            className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
                        >
                            {isPlaying ? <FiPause size={28} /> : <FiPlay size={28} className="ml-1" />}
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-3 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <FiSkipForward size={24} />
                        </button>
                        <div className="text-sm text-purple-200">
                            {currentIndex + 1} / {TESTIMONIALS.length}
                        </div>
                    </div>

                    {/* Playlist */}
                    <div className="text-center text-sm text-purple-200">
                        Click play to hear this testimonial read aloud
                    </div>
                </div>
            </div>
        </div>
    );
}
