import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import Notification from './Notification';
import { FiBell, FiTrash2, FiX } from 'react-icons/fi';

export default function NotificationCenter() {
    const {
        notifications,
        removeNotification,
        clearNotifications,
        setNotificationCenterOpen
    } = useStore();

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setNotificationCenterOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            />

            {/* Panel */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-12 w-80 bg-white/90 backdrop-blur-xl border-l border-white/20 shadow-2xl z-[101] flex flex-col"
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white/50">
                    <div className="flex items-center gap-2">
                        <FiBell className="text-gray-600" />
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                        {notifications.length > 0 && (
                            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                {notifications.length}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {notifications.length > 0 && (
                            <button
                                onClick={clearNotifications}
                                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Clear all"
                            >
                                <FiTrash2 />
                            </button>
                        )}
                        <button
                            onClick={() => setNotificationCenterOpen(false)}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <FiX />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    <AnimatePresence mode="popLayout">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <Notification
                                    key={notification.id}
                                    notification={notification}
                                    onDismiss={removeNotification}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-gray-400"
                            >
                                <FiBell className="text-4xl mb-3 opacity-20" />
                                <p>No new notifications</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}
