'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { FiX, FiSend, FiTrash2 } from 'react-icons/fi';
import { sendMessage } from '@/lib/ai/gemini';

export default function AIAssistant() {
    const { isAssistantOpen, setAssistantOpen, chatHistory, addChatMessage, clearChatHistory } = useStore();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message
        addChatMessage({ role: 'user', content: userMessage });

        // Get AI response
        setIsLoading(true);
        try {
            const history = chatHistory.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: msg.content,
            }));

            const response = await sendMessage(userMessage, history as any);
            addChatMessage({ role: 'assistant', content: response });
        } catch (error: any) {
            addChatMessage({
                role: 'assistant',
                content: `Oops! Something went wrong: ${error.message}. Try again in a sec! 😅`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Assistant Button */}
            {!isAssistantOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAssistantOpen(true)}
                    className="fixed bottom-20 right-6 z-[200] w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center text-3xl cursor-pointer"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        🤖
                    </motion.div>
                </motion.button>
            )}

            {/* Chat Interface */}
            {isAssistantOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="fixed bottom-20 right-6 z-[200] w-96 h-[500px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-200 flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">🤖</div>
                            <div>
                                <h3 className="text-white font-bold">AI Assistant</h3>
                                <p className="text-white/80 text-xs">Ask me anything!</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={clearChatHistory}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                title="Clear chat"
                            >
                                <FiTrash2 className="text-white" />
                            </button>
                            <button
                                onClick={() => setAssistantOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <FiX className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {chatHistory.length === 0 && (
                            <div className="text-center text-gray-400 mt-20">
                                <div className="text-5xl mb-3">👋</div>
                                <p>Hey! I'm here to help you learn about Muhib's portfolio.</p>
                                <p className="text-sm mt-2">Ask me about skills, projects, or experience!</p>
                            </div>
                        )}

                        {chatHistory.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 p-3 rounded-2xl">
                                    <div className="flex gap-1">
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500 text-sm"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiSend />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
}
