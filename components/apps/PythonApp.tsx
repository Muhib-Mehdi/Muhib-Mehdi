'use client';

import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/project-data';
import ProjectCard from '../ProjectCard';

export default function PythonApp() {
    const pythonProjects = PROJECTS.filter(p => p.category === 'python' || p.category === 'ai-ml');

    return (
        <div className="h-full overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="text-8xl mb-4">🐍</div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Python & AI Development</h1>
                    <p className="text-gray-600">Building intelligent applications with Python</p>
                </div>

                {/* Skills */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Python Skills & Libraries</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {['NumPy', 'Pandas', 'Django', 'Flask', 'FastAPI', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Matplotlib', 'OpenCV'].map((lib, index) => (
                            <motion.div
                                key={lib}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center font-medium text-gray-700 hover:shadow-md transition-shadow"
                            >
                                {lib}
                            </motion.div>
                        ))}
                    </div>
                </section>



                {/* Projects */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pythonProjects.map((project, index) => (
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
                </section>

                {/* Code Example */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Code Example</h2>
                    <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto shadow-lg">
                        <pre>{`# Python Data Analysis Example
import pandas as pd
import numpy as np

def analyze_data(df):
    """Perform comprehensive data analysis"""
    summary = {
        'mean': df.mean(),
        'median': df.median(),
        'std': df.std()
    }
    return summary

# Load and process data
data = pd.read_csv('data.csv')
results = analyze_data(data)
print(results)`}</pre>
                    </div>
                </section>
            </div>
        </div>
    );
}
