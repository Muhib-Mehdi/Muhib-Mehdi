'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiDownload, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import {
    PERSONAL_INFO,
    SKILLS,
    EXPERIENCE,
    EDUCATION,
    INTERESTS,
    HONORS,
    CERTIFICATES,
} from '@/lib/config';

// Helper Tile component
function Tile({
    title,
    isOpen,
    onToggle,
    children,
}: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white/30 backdrop-blur-xl rounded-lg shadow-md overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 text-left text-xl font-semibold text-gray-800 hover:bg-white/10 transition-colors"
            >
                <span>{title}</span>
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ThisPC() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    // Define row pairs - tiles in the same row that should expand together
    const rowPairs: Record<string, string> = {
        'aboutMe': 'interests',
        'interests': 'aboutMe',
        'languages': 'frameworks',
        'frameworks': 'languages',
        // Experience and Honors are now independent/full-width
        'experience': '',
        'honors': '',
        'certificates': '',
        'education': '',
    };

    const toggle = (key: string) => {
        setExpanded((prev) => {
            const newState = { ...prev, [key]: !prev[key] };

            // If this tile has a pair in the same row, sync its state
            const pairedKey = rowPairs[key];
            if (pairedKey) {
                newState[pairedKey] = newState[key];
            }

            return newState;
        });
    };

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = PERSONAL_INFO.resumeUrl;
        link.download = 'resume.pdf';
        link.click();
    };

    return (
        <div className="h-full overflow-y-auto p-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg mb-6">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <img
                            src="/assets/profile/profile.png"
                            alt={PERSONAL_INFO.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).parentElement!.innerHTML =
                                    '<div class="w-full h-full flex items-center justify-center text-4xl">👤</div>';
                            }}
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{PERSONAL_INFO.name}</h1>
                        <p className="text-lg text-white/90 mt-1">{PERSONAL_INFO.tagline}</p>
                        <p className="text-sm text-white/70 mt-2">{PERSONAL_INFO.location}</p>
                    </div>
                </div>
            </div>

            {/* Grid layout – first two rows (2 columns each) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* About Me */}
                <Tile
                    title="About Me"
                    isOpen={!!expanded.aboutMe}
                    onToggle={() => toggle('aboutMe')}
                >
                    <p className="text-gray-700 leading-relaxed">{PERSONAL_INFO.bio}</p>
                </Tile>

                {/* Interests */}
                <Tile
                    title="Interests"
                    isOpen={!!expanded.interests}
                    onToggle={() => toggle('interests')}
                >
                    <div className="flex flex-wrap gap-2">
                        {INTERESTS.map((interest, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-gray-700 rounded-full text-sm font-medium"
                            >
                                {interest}
                            </motion.span>
                        ))}
                    </div>
                </Tile>

                {/* Programming Languages */}
                <Tile
                    title="Programming Languages"
                    isOpen={!!expanded.languages}
                    onToggle={() => toggle('languages')}
                >
                    <div className="grid grid-cols-2 gap-3">
                        {SKILLS.languages.map((lang, i) => (
                            <motion.div
                                key={lang.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{lang.icon}</span>
                                    <span className="font-medium text-gray-800">{lang.name}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                    <motion.div
                                        className="h-2 rounded-full"
                                        style={{ backgroundColor: lang.color || '#8b5cf6' }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${lang.proficiency}%` }}
                                        transition={{ delay: i * 0.1 + 0.2, duration: 0.8 }}
                                    />
                                </div>
                                <span className="text-xs text-gray-500">{lang.proficiency}%</span>
                            </motion.div>
                        ))}
                    </div>
                </Tile>

                {/* Frameworks & Tools */}
                <Tile
                    title="Frameworks & Tools"
                    isOpen={!!expanded.frameworks}
                    onToggle={() => toggle('frameworks')}
                >
                    <div className="grid grid-cols-2 gap-3">
                        {SKILLS.frameworks.map((fw, i) => (
                            <motion.div
                                key={fw.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + SKILLS.languages.length * 0.1 }}
                                className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{fw.icon}</span>
                                    <span className="font-medium text-gray-800">{fw.name}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                    <motion.div
                                        className="h-2 bg-blue-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${fw.proficiency}%` }}
                                        transition={{
                                            delay: i * 0.1 + SKILLS.languages.length * 0.1 + 0.2,
                                            duration: 0.8,
                                        }}
                                    />
                                </div>
                                <span className="text-xs text-gray-500">{fw.proficiency}%</span>
                            </motion.div>
                        ))}
                    </div>
                </Tile>
            </div>

            {/* Full width sections */}
            <div className="space-y-4">
                {/* Experience */}
                <Tile
                    title="Experience"
                    isOpen={!!expanded.experience}
                    onToggle={() => toggle('experience')}
                >
                    <div className="space-y-4">
                        {EXPERIENCE.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="border-l-4 border-purple-500 pl-4 py-2"
                            >
                                <h3 className="font-bold text-gray-800">{exp.role}</h3>
                                <p className="text-purple-600 font-medium">{exp.company}</p>
                                <p className="text-sm text-gray-500">{exp.duration}</p>
                                <p className="text-gray-600 mt-2">{exp.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Tile>

                {/* Honors & Awards */}
                <Tile
                    title="Honors & Awards"
                    isOpen={!!expanded.honors}
                    onToggle={() => toggle('honors')}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {HONORS.map((h, i) => {
                            const honor = h as any;
                            return (
                                <motion.div
                                    key={honor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex gap-4">
                                        {/* Preview Thumbnail */}
                                        <div
                                            className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 cursor-pointer relative shadow-sm"
                                            onClick={() => window.open(honor.file, '_blank')}
                                        >
                                            {honor.type === 'pdf' ? (
                                                <div className="w-full h-full relative pointer-events-none">
                                                    <object
                                                        data={`${honor.file}#toolbar=0&navpanes=0&scrollbar=0`}
                                                        type="application/pdf"
                                                        className="w-full h-full object-cover"
                                                    >
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 text-red-500">
                                                            <span className="text-2xl">📄</span>
                                                            <span className="text-[10px] font-bold mt-1">PDF</span>
                                                        </div>
                                                    </object>
                                                </div>
                                            ) : (
                                                <img
                                                    src={honor.file}
                                                    alt={honor.title}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 truncate" title={honor.title}>
                                                {honor.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 truncate">{honor.organization}</p>
                                            <p className="text-xs text-gray-500">{honor.date}</p>
                                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{honor.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </Tile>

                {/* Certificates */}
                <Tile
                    title="Certifications"
                    isOpen={!!expanded.certificates}
                    onToggle={() => toggle('certificates')}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {CERTIFICATES.map((c, i) => {
                            const cert = c as any;
                            return (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex gap-4">
                                        {/* Preview Thumbnail */}
                                        <div
                                            className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer relative"
                                            onClick={() => {
                                                if (cert.file) {
                                                    window.open(cert.file, '_blank');
                                                }
                                            }}
                                        >
                                            {cert.type === 'pdf' ? (
                                                <div className="w-full h-full relative pointer-events-none">
                                                    <object
                                                        data={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0`}
                                                        type="application/pdf"
                                                        className="w-full h-full object-cover"
                                                    >
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 text-red-500">
                                                            <span className="text-3xl">📄</span>
                                                            <span className="text-xs font-bold mt-1">PDF</span>
                                                        </div>
                                                    </object>
                                                </div>
                                            ) : (
                                                <img
                                                    src={cert.file}
                                                    alt={cert.name}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        (e.target as HTMLImageElement).parentElement!.innerHTML =
                                                            '<div class="w-full h-full flex items-center justify-center text-2xl bg-gray-100">🖼️</div>';
                                                    }}
                                                />
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full">
                                                    View
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 truncate" title={cert.name}>
                                                {cert.name}
                                            </h3>
                                            <p className="text-sm text-purple-600 truncate">{cert.issuer}</p>
                                            <p className="text-xs text-gray-500 mt-1">{cert.date}</p>

                                            <div className="flex gap-2 mt-3">
                                                {cert.verificationUrl && (
                                                    <a
                                                        href={cert.verificationUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-md hover:bg-purple-200 transition-colors flex items-center gap-1"
                                                    >
                                                        <span>Verify</span>
                                                        <span className="text-[10px]">↗</span>
                                                    </a>
                                                )}
                                                {cert.file && (
                                                    <a
                                                        href={cert.file}
                                                        download
                                                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <FiDownload className="w-3 h-3" />
                                                        <span>Download</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </Tile>

                {/* Education */}
                <Tile
                    title="Education"
                    isOpen={!!expanded.education}
                    onToggle={() => toggle('education')}
                >
                    <div className="space-y-3">
                        {EDUCATION.map((edu, i) => (
                            <div key={i} className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                                <p className="text-blue-600">{edu.institution}</p>
                                <p className="text-sm text-gray-500">
                                    {edu.year} • {edu.gpa}
                                </p>
                            </div>
                        ))}
                    </div>
                </Tile>
            </div>

            {/* Download Resume button */}
            <div className="flex justify-center pt-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadResume}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium shadow-lg"
                >
                    <FiDownload />
                    Download Resume
                </motion.button>
            </div>
        </div>
    );
}
