'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiCode, FiCalendar } from 'react-icons/fi';
import { Project } from '@/lib/project-data';
import { useState } from 'react';
import { useStore } from '@/lib/store';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const { addNotification } = useStore();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smoother "zero-gravity" spring physics
    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isFlipped) return; // Disable 3D effect when flipped
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleCardClick = () => {
        // Show notification with project details
        addNotification({
            title: `💻 ${project.title}`,
            message: `${project.description}\n\nTechnologies: ${project.tags.join(', ')}\n\nClick the card to see more details!`,
            type: 'info',
        });

        // Flip the card
        setIsFlipped(!isFlipped);
    };

    return (
        <motion.div
            style={{
                rotateX: isFlipped ? 0 : rotateX,
                rotateY: isFlipped ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative group h-full perspective-1000"
            animate={{
                y: isFlipped ? 0 : [0, -10, 0],
            }}
            transition={{
                duration: 4,
                repeat: isFlipped ? 0 : Infinity,
                ease: "easeInOut",
            }}
        >
            {/* Card Container with Flip */}
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
                {/* Front Side */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div
                        onClick={handleCardClick}
                        className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col transition-shadow duration-300 group-hover:shadow-2xl cursor-pointer"
                        style={{ transform: "translateZ(20px)" }}
                    >
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-5xl">
                                💻
                            </div>
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                <div className="flex gap-2">
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                                            title="Live Demo"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FiExternalLink />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                                            title="View Code"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FiGithub />
                                        </a>
                                    )}
                                </div>
                            </div>
                            {/* Click to flip hint */}
                            <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                Click to flip
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                                    {project.title}
                                </h3>
                                {project.stats && (
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        {project.stats.stars && (
                                            <div className="flex items-center gap-1">
                                                <FiStar className="text-yellow-400" />
                                                <span>{project.stats.stars}</span>
                                            </div>
                                        )}
                                        {project.stats.forks && (
                                            <div className="flex items-center gap-1">
                                                <FiGitBranch className="text-blue-400" />
                                                <span>{project.stats.forks}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs rounded-md font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Side - Detailed Info */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div
                        onClick={handleCardClick}
                        className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-xl overflow-hidden shadow-lg h-full flex flex-col cursor-pointer text-white p-6"
                        style={{ transform: "translateZ(20px)" }}
                    >
                        {/* Header */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <FiCode className="w-5 h-5" />
                                <h3 className="text-xl font-bold">{project.title}</h3>
                            </div>
                            <div className="h-1 w-20 bg-white/30 rounded-full" />
                        </div>

                        {/* Detailed Description */}
                        <div className="flex-1 overflow-y-auto mb-4">
                            <p className="text-sm text-white/90 leading-relaxed mb-4">
                                {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="mb-4">
                                <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                                    <span className="text-lg">🛠️</span>
                                    Technologies Used
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-md font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            {project.stats && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                                        <span className="text-lg">📊</span>
                                        Project Stats
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {project.stats.stars && (
                                            <div className="bg-white/10 rounded-lg p-2">
                                                <div className="flex items-center gap-1 text-yellow-300">
                                                    <FiStar />
                                                    <span className="text-sm font-bold">{project.stats.stars}</span>
                                                </div>
                                                <p className="text-xs text-white/70">Stars</p>
                                            </div>
                                        )}
                                        {project.stats.forks && (
                                            <div className="bg-white/10 rounded-lg p-2">
                                                <div className="flex items-center gap-1 text-blue-300">
                                                    <FiGitBranch />
                                                    <span className="text-sm font-bold">{project.stats.forks}</span>
                                                </div>
                                                <p className="text-xs text-white/70">Forks</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all font-medium text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FiGithub />
                                    Code
                                </a>
                            )}
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all font-medium text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FiExternalLink />
                                    Demo
                                </a>
                            )}
                        </div>

                        {/* Flip back hint */}
                        <div className="text-center mt-3 text-xs text-white/60">
                            Click to flip back
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
