'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { TIMELINE_DATA, TimelineEvent } from '@/lib/timeline-data';
import { FiBriefcase, FiAward, FiCode, FiBook } from 'react-icons/fi';

export default function Calendar() {
    const [filter, setFilter] = useState<'all' | 'education' | 'work' | 'project' | 'achievement'>('all');

    const filteredData = filter === 'all'
        ? TIMELINE_DATA
        : TIMELINE_DATA.filter(item => item.category === filter);

    // Sort by date (newest first) - simple string comparison for now, could be improved
    const sortedData = [...filteredData].reverse();

    const getIcon = (category: string) => {
        switch (category) {
            case 'work': return <FiBriefcase />;
            case 'education': return <FiBook />;
            case 'project': return <FiCode />;
            case 'achievement': return <FiAward />;
            default: return <FiCode />;
        }
    };

    const getColor = (category: string) => {
        switch (category) {
            case 'work': return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'education': return 'bg-green-100 text-green-600 border-green-200';
            case 'project': return 'bg-purple-100 text-purple-600 border-purple-200';
            case 'achievement': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Header / Filter */}
            <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['all', 'education', 'work', 'project', 'achievement'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat as any)}
                            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${filter === cat
                                    ? 'bg-gray-900 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto p-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

                <div className="space-y-8">
                    {sortedData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Content */}
                            <div className="flex-1 ml-12 md:ml-0">
                                <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${index % 2 === 0 ? 'md:text-right' : ''
                                    }`}>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 ${getColor(item.category)} ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                        }`}>
                                        {getIcon(item.category)}
                                        <span className="capitalize">{item.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                                    <div className="text-sm font-medium text-purple-600 mb-3">{item.date}</div>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-8 md:left-1/2 top-8 -translate-x-1/2 w-4 h-4 bg-white border-4 border-purple-600 rounded-full shadow-sm z-10" />

                            {/* Spacer for alternating layout */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>

                {sortedData.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <p>No events found for this category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
