'use client';

import { motion } from 'framer-motion';
import { UNFINISHED_PROJECTS } from '@/lib/data/projects-config';

export default function RecycleBin() {
    return (
        <div className="h-full overflow-y-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Project Archive</h1>
                <p className="text-gray-600">Completed and archived projects with their timelines.</p>
            </div>

            <div className="space-y-4">
                {UNFINISHED_PROJECTS.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">🗂️</div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                                <p className="text-gray-600 mb-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-sm text-gray-500">
                                    <span className="mr-4">Start: {project.startDate || 'N/A'}</span>
                                    <span>End: {project.endDate || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {UNFINISHED_PROJECTS.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">🎉</div>
                        <p>No archived projects! Everything is up to date.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
