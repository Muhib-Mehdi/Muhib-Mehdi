import { useStore } from './store';

// Sound file paths
export const SOUNDS = {
    CLICK: '/assets/sounds/click.mp3',
    OPEN: '/assets/sounds/open.mp3',
    CLOSE: '/assets/sounds/close.mp3',
    STARTUP: '/assets/sounds/startup.mp3',
    NOTIFICATION: '/assets/sounds/notification.mp3',
    HOVER: '/assets/sounds/hover.mp3',
};

class SoundManager {
    private audioCache: { [key: string]: HTMLAudioElement } = {};

    play(soundPath: string) {
        // Temporarily disabled due to corrupted audio files
        return;

        /* 
        const { isMuted, volume } = useStore.getState();

        if (isMuted) return;

        try {
            let audio = this.audioCache[soundPath];

            if (!audio) {
                audio = new Audio(soundPath);
                this.audioCache[soundPath] = audio;
            }

            // Reset time to allow rapid replay
            audio.currentTime = 0;
            audio.volume = volume;

            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    // Auto-play policy or file not found
                    // console.warn('Audio playback failed:', error);
                });
            }
        } catch (e) {
            // Ignore errors (e.g. server side rendering)
        } 
        */
    }
}

export const soundManager = new SoundManager();

export function useSound() {
    const playClick = () => soundManager.play(SOUNDS.CLICK);
    const playOpen = () => soundManager.play(SOUNDS.OPEN);
    const playClose = () => soundManager.play(SOUNDS.CLOSE);
    const playStartup = () => soundManager.play(SOUNDS.STARTUP);
    const playNotification = () => soundManager.play(SOUNDS.NOTIFICATION);
    const playHover = () => soundManager.play(SOUNDS.HOVER);

    return {
        playClick,
        playOpen,
        playClose,
        playStartup,
        playNotification,
        playHover,
    };
}
