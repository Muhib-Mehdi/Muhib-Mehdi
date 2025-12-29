'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { FiCpu, FiActivity, FiHardDrive, FiXOctagon } from 'react-icons/fi';
import { SKILLS } from '@/lib/config';

export default function TaskManager() {
    const { windows, closeWindow } = useStore();
    const [activeTab, setActiveTab] = useState<'processes' | 'performance' | 'stats'>('processes');
    const [cpuUsage, setCpuUsage] = useState<number[]>(new Array(20).fill(0));
    const [memoryUsage, setMemoryUsage] = useState<number>(0);

    // Simulate CPU usage updates
    useEffect(() => {
        const interval = setInterval(() => {
            setCpuUsage(prev => {
                const newUsage = [...prev.slice(1), Math.random() * 100];
                return newUsage;
            });
            setMemoryUsage(Math.floor(Math.random() * 20) + 40); // 40-60% base usage
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-white">
                <button
                    onClick={() => setActiveTab('processes')}
                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'processes'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-800'
                        }`}
                >
                    Processes
                </button>
                <button
                    onClick={() => setActiveTab('performance')}
                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'performance'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-800'
                        }`}
                >
                    Performance
                </button>
                <button
                    onClick={() => setActiveTab('stats')}
                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'stats'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-800'
                        }`}
                >
                    Portfolio Stats
                </button>
            </div>

            <div className="flex-1 overflow-hidden p-4">
                {/* Processes Tab */}
                {activeTab === 'processes' && (
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2 px-4">
                            <span className="w-1/2">Name</span>
                            <span className="w-1/4 text-right">Status</span>
                            <span className="w-1/4 text-right">Action</span>
                        </div>
                        <div className="flex-1 overflow-y-auto bg-white rounded-lg border border-gray-200">
                            {windows.map((window) => (
                                <div
                                    key={window.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                                >
                                    <div className="flex items-center gap-3 w-1/2">
                                        <span className="text-xl">{window.icon}</span>
                                        <span className="font-medium text-gray-800">{window.title}</span>
                                    </div>
                                    <div className="w-1/4 text-right">
                                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                            Running
                                        </span>
                                    </div>
                                    <div className="w-1/4 text-right">
                                        <button
                                            onClick={() => closeWindow(window.id)}
                                            className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                        >
                                            End Task
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {windows.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <FiActivity className="text-4xl mb-2 opacity-20" />
                                    <p>No active processes</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                    <div className="h-full overflow-y-auto space-y-4">
                        {/* CPU / Skills Graph */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-4">
                                <FiCpu className="text-purple-600 text-xl" />
                                <h3 className="font-semibold text-gray-800">CPU (Skill Proficiency)</h3>
                            </div>
                            <div className="flex items-end gap-1 h-32 mb-4">
                                {cpuUsage.map((usage, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-purple-100 rounded-t-sm relative overflow-hidden"
                                    >
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 bg-purple-500"
                                            animate={{ height: `${usage}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {SKILLS.languages.slice(0, 4).map((skill) => (
                                    <div key={skill.name} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span>{skill.name}</span>
                                            <span>{skill.proficiency}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-purple-500"
                                                style={{ width: `${skill.proficiency}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Memory / Projects */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-4">
                                <FiHardDrive className="text-blue-600 text-xl" />
                                <h3 className="font-semibold text-gray-800">Memory (Project Capacity)</h3>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            fill="none"
                                            stroke="#e5e7eb"
                                            strokeWidth="12"
                                        />
                                        <motion.circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="12"
                                            strokeDasharray={351}
                                            animate={{ strokeDashoffset: 351 - (351 * memoryUsage) / 100 }}
                                            transition={{ duration: 1 }}
                                        />
                                    </svg>
                                    <div className="absolute text-center">
                                        <div className="text-2xl font-bold text-gray-800">{memoryUsage}%</div>
                                        <div className="text-[10px] text-gray-500">USED</div>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Total Projects</span>
                                        <span className="font-medium">12 GB</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Cached Skills</span>
                                        <span className="font-medium">8.4 GB</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Available</span>
                                        <span className="font-medium">3.6 GB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Tab */}
                {activeTab === 'stats' && (
                    <div className="h-full overflow-y-auto grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl mb-2">🚀</div>
                            <div className="text-2xl font-bold text-gray-800">3+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Years Experience</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl mb-2">💻</div>
                            <div className="text-2xl font-bold text-gray-800">50+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Projects Built</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl mb-2">☕</div>
                            <div className="text-2xl font-bold text-gray-800">∞</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Coffee Consumed</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl mb-2">🐛</div>
                            <div className="text-2xl font-bold text-gray-800">0</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Unfixed Bugs</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
