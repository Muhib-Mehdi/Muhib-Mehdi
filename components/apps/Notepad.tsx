'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';

interface ProjectIdea {
    id: string;
    title: string;
    description: string;
    status: 'idea' | 'in-progress' | 'completed';
    createdAt: string;
}

export default function Notepad() {
    // Load persisted ideas
    const [ideas, setIdeas] = useState<ProjectIdea[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('project-ideas');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const persist = (updated: ProjectIdea[]) => {
        localStorage.setItem('project-ideas', JSON.stringify(updated));
        setIdeas(updated);
    };

    const addIdea = () => {
        if (!newTitle.trim()) return;
        const newIdea: ProjectIdea = {
            id: Date.now().toString(),
            title: newTitle,
            description: newDescription,
            status: 'idea',
            createdAt: new Date().toISOString(),
        };
        persist([...ideas, newIdea]);
        setNewTitle('');
        setNewDescription('');
    };

    const deleteIdea = (id: string) => {
        persist(ideas.filter((i) => i.id !== id));
        setExpandedIds((prev) => {
            const copy = new Set(prev);
            copy.delete(id);
            return copy;
        });
    };

    const toggleStatus = (id: string) => {
        const order: ProjectIdea['status'][] = ['idea', 'in-progress', 'completed'];
        persist(
            ideas.map((i) =>
                i.id === id
                    ? { ...i, status: order[(order.indexOf(i.status) + 1) % order.length] }
                    : i
            )
        );
    };

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) => {
            const copy = new Set(prev);
            if (copy.has(id)) copy.delete(id);
            else copy.add(id);
            return copy;
        });
    };

    const statusColor = (status: ProjectIdea['status']) => {
        switch (status) {
            case 'idea':
                return 'bg-blue-100 text-blue-700';
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-700';
            case 'completed':
                return 'bg-green-100 text-green-700';
        }
    };

    const statusLabel = (status: ProjectIdea['status']) => {
        switch (status) {
            case 'idea':
                return '💡 Idea';
            case 'in-progress':
                return '🚧 In Progress';
            case 'completed':
                return '✅ Completed';
        }
    };

    return (
        <div className="h-full bg-yellow-50/30 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Future Projects</h1>
                    <p className="text-gray-600">Track upcoming ideas and their progress.</p>
                </div>

                {/* Add New Idea */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Idea</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Project Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            onKeyPress={(e) => e.key === 'Enter' && addIdea()}
                        />
                        <textarea
                            placeholder="Description (optional)"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        />
                        <button
                            onClick={addIdea}
                            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            <FiPlus /> Add Idea
                        </button>
                    </div>
                </div>

                {/* Ideas List */}
                <div className="space-y-4">
                    {ideas.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <div className="text-6xl mb-4">💡</div>
                            <p>No project ideas yet. Add your first one above!</p>
                        </div>
                    ) : (
                        ideas.map((idea, idx) => (
                            <motion.div
                                key={idea.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                {/* Header – always visible */}
                                <div
                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                                    onClick={() => toggleExpand(idea.id)}
                                >
                                    <h3 className="text-xl font-bold text-gray-800">{idea.title}</h3>
                                    <span className="text-sm text-gray-500">{new Date(idea.createdAt).toLocaleDateString()}</span>
                                </div>

                                {/* Expandable content */}
                                <AnimatePresence initial={false}>
                                    {expandedIds.has(idea.id) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="px-4 pb-4"
                                        >
                                            {/* Subsection 1 – Description */}
                                            {idea.description && (
                                                <p className="text-gray-600 mb-3">{idea.description}</p>
                                            )}
                                            {/* Subsection 2 – Status */}
                                            <button
                                                onClick={() => toggleStatus(idea.id)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor(
                                                    idea.status
                                                )} hover:opacity-80 transition-opacity mr-2`}
                                            >
                                                {statusLabel(idea.status)}
                                            </button>
                                            {/* Subsection 3 – Delete */}
                                            <button
                                                onClick={() => deleteIdea(idea.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Stats */}
                {ideas.length > 0 && (
                    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                        <h3 className="font-semibold text-gray-800 mb-3">Statistics</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {ideas.filter((i) => i.status === 'idea').length}
                                </div>
                                <div className="text-sm text-gray-600">Ideas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {ideas.filter((i) => i.status === 'in-progress').length}
                                </div>
                                <div className="text-sm text-gray-600">In Progress</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {ideas.filter((i) => i.status === 'completed').length}
                                </div>
                                <div className="text-sm text-gray-600">Completed</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
