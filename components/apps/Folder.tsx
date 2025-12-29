'use client';

import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/project-data';
import ProjectCard from '../ProjectCard';

interface FolderProps {
    folderId: string;
}

export default function Folder({ folderId }: FolderProps) {
    const projects = PROJECTS.filter(p => p.category === folderId);

    const folderName =
        folderId === 'web-dev'
            ? 'Web Development'
            : folderId === 'mobile-apps'
                ? 'Mobile Apps'
                : 'AI/ML';

    return (
        <div className="h-full overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{folderName}</h1>
                        <p className="text-gray-500 mt-1">
                            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                        </p>
                    </div>
                </div>



                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="h-[400px]"
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <div className="text-6xl mb-4">📁</div>
                        <p className="text-lg">No projects found in this folder</p>
                    </div>
                )}
            </div>
        </div>
    );
}
