import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiXCircle, FiAward, FiX } from 'react-icons/fi';
import { NotificationItem, useStore } from '@/lib/store';
import { useEffect } from 'react';

interface NotificationProps {
    notification: NotificationItem;
    onDismiss: (id: string) => void;
}

export default function Notification({ notification, onDismiss }: NotificationProps) {
    const { type, title, message, id } = notification;

    // Auto-dismiss after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <FiCheckCircle className="text-green-500" />;
            case 'warning': return <FiAlertTriangle className="text-yellow-500" />;
            case 'error': return <FiXCircle className="text-red-500" />;
            case 'achievement': return <FiAward className="text-purple-500" />;
            default: return <FiInfo className="text-blue-500" />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success': return 'bg-green-50 border-green-200';
            case 'warning': return 'bg-yellow-50 border-yellow-200';
            case 'error': return 'bg-red-50 border-red-200';
            case 'achievement': return 'bg-purple-50 border-purple-200';
            default: return 'bg-blue-50 border-blue-200';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={`relative p-4 rounded-lg border shadow-lg backdrop-blur-sm mb-3 ${getBgColor()}`}
        >
            <div className="flex items-start gap-3">
                <div className="text-xl mt-0.5">{getIcon()}</div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">{message}</p>
                    <p className="text-gray-400 text-[10px] mt-2">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                </div>
                <button
                    onClick={() => onDismiss(id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FiX />
                </button>
            </div>
        </motion.div>
    );
}
