'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CERTIFICATES, HONORS } from '@/lib/config';
import { useState } from 'react';
import { FiX, FiDownload, FiExternalLink, FiAward, FiCheckCircle } from 'react-icons/fi';
import { useStore } from '@/lib/store';

// Unified interface for display
interface GalleryItem {
    id: string;
    name: string;
    issuer: string;
    date: string;
    file: string;
    type: 'pdf' | 'image';
    verificationUrl?: string;
    description?: string;
    category: 'certificate' | 'honor';
}

// Lightning Split Card Component
function LightningSplitCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="group relative w-full aspect-[3/4] cursor-pointer perspective-1000"
        >
            {/* Card Container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                {/* Base Card - Improved Grayscale with texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 transition-opacity duration-500 group-hover:opacity-0">
                    {/* Subtle grid pattern for depth */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }} />
                </div>

                {/* Colored Background - Hidden by default */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Lightning Line - Appears on hover */}
                <div className="absolute left-0 right-0 top-1/3 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent blur-sm" />
                    {/* Lightning glow */}
                    <div className="absolute inset-0 bg-cyan-400 blur-md opacity-50" />
                </div>

                {/* Top Section - Title (Slides UP on hover) */}
                <div className="absolute top-0 left-0 right-0 h-1/3 flex items-center justify-center p-4 transition-transform duration-500 group-hover:-translate-y-6 z-10">
                    <div className="text-center">
                        <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 drop-shadow-lg">
                            {item.name}
                        </h3>
                    </div>
                </div>

                {/* Certificate Image - Hidden, slides up from center on hover */}
                <div className="absolute left-0 right-0 top-1/3 bottom-1/3 flex items-center justify-center overflow-hidden z-15">
                    <div className="w-full h-full translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105">
                        {item.type === 'pdf' ? (
                            <div className="w-full h-full relative pointer-events-none">
                                <object
                                    data={`${item.file}#toolbar=0&navpanes=0&scrollbar=0`}
                                    type="application/pdf"
                                    className="w-full h-full object-cover"
                                >
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                                        <div className="text-4xl">📄</div>
                                    </div>
                                </object>
                            </div>
                        ) : (
                            <img
                                src={item.file}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.innerHTML =
                                        '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800"><div class="text-4xl">🖼️</div></div>';
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Bottom Section - Description + Date (Slides DOWN on hover) */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 flex flex-col items-center justify-center p-4 transition-transform duration-500 group-hover:translate-y-6 z-10">
                    <div className="text-center">
                        <p className="text-xs md:text-sm text-gray-200 font-medium drop-shadow-lg">
                            {item.issuer}
                        </p>
                        <p className="text-xs text-gray-300 mt-1 drop-shadow-lg">
                            {item.date}
                        </p>
                    </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-30">
                    <div className={`px-2 py-1 rounded-md text-xs font-bold backdrop-blur-sm transition-all duration-500 shadow-lg ${item.category === 'certificate'
                            ? 'bg-gray-600/90 group-hover:bg-blue-500/90 text-gray-200 group-hover:text-white'
                            : 'bg-gray-600/90 group-hover:bg-yellow-500/90 text-gray-200 group-hover:text-black'
                        }`}>
                        {item.category === 'certificate' ? (
                            <span className="flex items-center gap-1">
                                <FiCheckCircle className="w-3 h-3" />
                                CERT
                            </span>
                        ) : (
                            <span className="flex items-center gap-1">
                                <FiAward className="w-3 h-3" />
                                HONOR
                            </span>
                        )}
                    </div>
                </div>

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-gray-500 group-hover:border-cyan-400 transition-all duration-500 pointer-events-none" />

                {/* Subtle inner shadow for depth */}
                <div className="absolute inset-0 rounded-xl shadow-inner opacity-30 pointer-events-none" />
            </div>
        </div>
    );
}

export default function Photos() {
    const { addNotification } = useStore();

    // Combine and normalize data
    const allItems: GalleryItem[] = [
        ...CERTIFICATES.map(c => ({
            ...c,
            category: 'certificate' as const
        })),
        ...HONORS.map(h => ({
            id: h.id,
            name: h.title,
            issuer: h.organization,
            date: h.date,
            file: h.file,
            type: h.type,
            description: h.description,
            verificationUrl: undefined,
            category: 'honor' as const
        }))
    ];

    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [filter, setFilter] = useState<'all' | 'certificate' | 'honor'>('all');

    const filteredItems = filter === 'all'
        ? allItems
        : allItems.filter(item => item.category === filter);

    const handleItemClick = (item: GalleryItem) => {
        // Show notification with details
        addNotification({
            title: `${item.category === 'certificate' ? '🎓' : '🏆'} ${item.name}`,
            message: `${item.description || 'Click to view full details'}\n\nIssued by: ${item.issuer}\nDate: ${item.date}`,
            type: 'info',
        });

        // Open lightbox
        setSelectedItem(item);
    };

    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header - NOT sticky */}
            <div className="backdrop-blur-xl bg-black/30 border-b border-purple-500/20">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Achievements Gallery
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">
                                {filteredItems.length} {filter === 'all' ? 'total' : filter === 'certificate' ? 'certificates' : 'honors'}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all'
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('certificate')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'certificate'
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                Certificates
                            </button>
                            <button
                                onClick={() => setFilter('honor')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'honor'
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                Honors
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <LightningSplitCard
                                    item={item}
                                    onClick={() => handleItemClick(item)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Enhanced Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 border-b border-purple-500/30">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {selectedItem.category === 'certificate' ? (
                                                <FiCheckCircle className="w-6 h-6 text-white" />
                                            ) : (
                                                <FiAward className="w-6 h-6 text-yellow-300" />
                                            )}
                                            <h3 className="font-bold text-white text-xl">{selectedItem.name}</h3>
                                        </div>
                                        <p className="text-purple-100 text-sm">{selectedItem.issuer} • {selectedItem.date}</p>
                                        {selectedItem.description && (
                                            <p className="text-purple-200 text-sm mt-2">{selectedItem.description}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <FiX className="text-white w-6 h-6" />
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-4">
                                    {selectedItem.verificationUrl && (
                                        <a
                                            href={selectedItem.verificationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium text-sm backdrop-blur-sm"
                                        >
                                            <FiExternalLink className="w-4 h-4" />
                                            Verify Certificate
                                        </a>
                                    )}
                                    <a
                                        href={selectedItem.file}
                                        download
                                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium text-sm backdrop-blur-sm"
                                    >
                                        <FiDownload className="w-4 h-4" />
                                        Download
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
                                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                                    {selectedItem.type === 'pdf' ? (
                                        <div className="w-full min-h-[600px] relative">
                                            <object
                                                data={`${selectedItem.file}#toolbar=1&navpanes=1`}
                                                type="application/pdf"
                                                className="w-full h-[600px]"
                                            >
                                                <div className="flex flex-col items-center justify-center h-[600px] bg-gray-100">
                                                    <div className="text-8xl mb-4">📄</div>
                                                    <p className="text-gray-600 mb-4 text-lg">PDF Preview Unavailable</p>
                                                    <a
                                                        href={selectedItem.file}
                                                        download
                                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2 font-medium"
                                                    >
                                                        <FiDownload />
                                                        Download PDF
                                                    </a>
                                                </div>
                                            </object>
                                        </div>
                                    ) : (
                                        <img
                                            src={selectedItem.file}
                                            alt={selectedItem.name}
                                            className="w-full h-auto"
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
