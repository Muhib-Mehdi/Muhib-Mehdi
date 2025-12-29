'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/config';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiCopy, FiCheck } from 'react-icons/fi';

export default function PhoneApp() {
    const [activeTab, setActiveTab] = useState<'contact' | 'social' | 'message'>('contact');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        // Simulate sending email (replace with actual EmailJS or API call)
        setTimeout(() => {
            setIsSending(false);
            setSendStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSendStatus('idle'), 3000);
        }, 2000);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 py-3 px-4 font-medium transition-colors ${activeTab === 'contact'
                            ? 'text-purple-600 border-b-2 border-purple-600'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                >
                    Contact Info
                </button>
                <button
                    onClick={() => setActiveTab('social')}
                    className={`flex-1 py-3 px-4 font-medium transition-colors ${activeTab === 'social'
                            ? 'text-purple-600 border-b-2 border-purple-600'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                >
                    Social Links
                </button>
                <button
                    onClick={() => setActiveTab('message')}
                    className={`flex-1 py-3 px-4 font-medium transition-colors ${activeTab === 'message'
                            ? 'text-purple-600 border-b-2 border-purple-600'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                >
                    Send Message
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {/* Contact Info Tab */}
                {activeTab === 'contact' && (
                    <div className="max-w-md mx-auto space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <FiMail className="text-purple-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium text-gray-800">{PERSONAL_INFO.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                >
                                    {copiedField === 'email' ? <FiCheck className="text-green-600" /> : <FiCopy />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <FiPhone className="text-blue-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <p className="font-medium text-gray-800">{PERSONAL_INFO.phone}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                >
                                    {copiedField === 'phone' ? <FiCheck className="text-green-600" /> : <FiCopy />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <FiMapPin className="text-green-600 text-xl" />
                                <div>
                                    <p className="text-sm text-gray-600">Location</p>
                                    <p className="font-medium text-gray-800">{PERSONAL_INFO.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Social Links Tab */}
                {activeTab === 'social' && (
                    <div className="max-w-md mx-auto space-y-4">
                        <motion.a
                            href={PERSONAL_INFO.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 p-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <FiGithub size={32} />
                            <div>
                                <p className="font-bold text-lg">GitHub</p>
                                <p className="text-sm text-gray-300">View my repositories</p>
                            </div>
                        </motion.a>

                        <motion.a
                            href={PERSONAL_INFO.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-4 p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FiLinkedin size={32} />
                            <div>
                                <p className="font-bold text-lg">LinkedIn</p>
                                <p className="text-sm text-blue-100">Connect with me professionally</p>
                            </div>
                        </motion.a>

                        {PERSONAL_INFO.twitter && (
                            <motion.a
                                href={PERSONAL_INFO.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-4 p-6 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                            >
                                <FiTwitter size={32} />
                                <div>
                                    <p className="font-bold text-lg">Twitter</p>
                                    <p className="text-sm text-sky-100">Follow for updates</p>
                                </div>
                            </motion.a>
                        )}
                    </div>
                )}

                {/* Send Message Tab */}
                {activeTab === 'message' && (
                    <div className="max-w-md mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isSending ? 'Sending...' : 'Send Message'}
                            </button>

                            {sendStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-100 text-green-700 rounded-lg text-center"
                                >
                                    ✓ Message sent successfully!
                                </motion.div>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
