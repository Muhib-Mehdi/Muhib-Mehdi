import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  data?: any;
}

export interface DesktopIcon {
  id: string;
  position: { x: number; y: number };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement';
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AppState {
  // Authentication
  user: any | null;
  setUser: (user: any | null) => void;

  // UI State
  currentScreen: 'startup' | 'lock' | 'desktop';
  setCurrentScreen: (screen: 'startup' | 'lock' | 'desktop') => void;

  // Windows
  windows: WindowState[];
  nextZIndex: number;
  openWindow: (appId: string, title: string, icon: string, data?: any) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, x: number, y: number) => void;
  updateWindowSize: (windowId: string, width: number, height: number) => void;

  // Desktop Icons
  iconPositions: Record<string, { x: number; y: number }>;
  updateIconPosition: (id: string, x: number, y: number) => void;

  // Easter Eggs
  unlockedEasterEggs: string[];
  unlockEasterEgg: (id: string) => void;

  // Start Menu
  isStartMenuOpen: boolean;
  setStartMenuOpen: (open: boolean) => void;

  // Matrix Effect
  isMatrixActive: boolean;
  setMatrixActive: (active: boolean) => void;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  isNotificationCenterOpen: boolean;
  setNotificationCenterOpen: (open: boolean) => void;

  // Audio
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;

  // AI Assistant
  isAssistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatHistory: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Authentication
      user: null,
      setUser: (user) => set({ user }),

      // UI State
      currentScreen: 'startup',
      setCurrentScreen: (screen) => set({ currentScreen: screen }),

      // Windows
      windows: [],
      nextZIndex: 10,

      openWindow: (appId, title, icon, data) => {
        const existing = get().windows.find(w => w.appId === appId);
        if (existing) {
          // Focus existing window
          get().focusWindow(existing.id);
          return;
        }

        // Calculate centered position
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
        const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
        const windowWidth = 800;
        const windowHeight = 600;

        const newWindow: WindowState = {
          id: `window-${Date.now()}`,
          appId,
          title,
          icon,
          isMinimized: false,
          isMaximized: false,
          position: {
            x: (screenWidth - windowWidth) / 2,
            y: (screenHeight - windowHeight) / 2 - 30, // Subtract 30 to account for taskbar
          },
          size: { width: windowWidth, height: windowHeight },
          zIndex: get().nextZIndex,
          data,
        };

        set({
          windows: [...get().windows, newWindow],
          nextZIndex: get().nextZIndex + 1,
        });
      },

      closeWindow: (windowId) => {
        set({ windows: get().windows.filter(w => w.id !== windowId) });
      },

      minimizeWindow: (windowId) => {
        set({
          windows: get().windows.map(w =>
            w.id === windowId ? { ...w, isMinimized: true } : w
          ),
        });
      },

      maximizeWindow: (windowId) => {
        set({
          windows: get().windows.map(w =>
            w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
          ),
        });
      },

      focusWindow: (windowId) => {
        const window = get().windows.find(w => w.id === windowId);
        if (!window) return;

        set({
          windows: get().windows.map(w =>
            w.id === windowId
              ? { ...w, isMinimized: false, zIndex: get().nextZIndex }
              : w
          ),
          nextZIndex: get().nextZIndex + 1,
        });
      },

      updateWindowPosition: (windowId, x, y) => {
        set({
          windows: get().windows.map(w =>
            w.id === windowId ? { ...w, position: { x, y } } : w
          ),
        });
      },

      updateWindowSize: (windowId, width, height) => {
        set({
          windows: get().windows.map(w =>
            w.id === windowId ? { ...w, size: { width, height } } : w
          ),
        });
      },

      // Desktop Icons
      iconPositions: {},
      updateIconPosition: (id, x, y) => {
        set({
          iconPositions: { ...get().iconPositions, [id]: { x, y } },
        });
      },

      // Easter Eggs
      unlockedEasterEggs: [],
      unlockEasterEgg: (id) => {
        if (!get().unlockedEasterEggs.includes(id)) {
          set({ unlockedEasterEggs: [...get().unlockedEasterEggs, id] });
        }
      },

      // Start Menu
      isStartMenuOpen: false,
      setStartMenuOpen: (open) => set({ isStartMenuOpen: open }),

      // Matrix Effect
      isMatrixActive: false,
      setMatrixActive: (active) => set({ isMatrixActive: active }),

      // Notifications
      notifications: [],
      isNotificationCenterOpen: false,
      setNotificationCenterOpen: (open) => set({ isNotificationCenterOpen: open }),

      addNotification: (notification) => {
        const newNotification: NotificationItem = {
          id: `notif-${Date.now()}`,
          timestamp: Date.now(),
          ...notification,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearNotifications: () => set({ notifications: [] }),

      // Audio
      isMuted: false,
      volume: 0.5,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      setVolume: (volume) => set({ volume }),

      // AI Assistant
      isAssistantOpen: false,
      setAssistantOpen: (open) => set({ isAssistantOpen: open }),
      chatHistory: [],
      addChatMessage: (message) => {
        const newMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          timestamp: Date.now(),
          ...message,
        };
        set((state) => ({
          chatHistory: [...state.chatHistory, newMessage],
        }));
      },
      clearChatHistory: () => set({ chatHistory: [] }),
    }),
    {
      name: 'portfolio-os-storage',
      partialize: (state) => ({
        iconPositions: state.iconPositions,
        unlockedEasterEggs: state.unlockedEasterEggs,
        isMuted: state.isMuted,
        volume: state.volume,
      }),
    }
  )
);
