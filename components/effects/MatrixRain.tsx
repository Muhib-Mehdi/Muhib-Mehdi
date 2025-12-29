'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { setMatrixActive } = useStore();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMatrixActive(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setMatrixActive]);

    return (
        <div className="fixed inset-0 z-[130] bg-black">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute top-4 right-4 text-green-500 text-sm font-mono">
                Press ESC to exit
            </div>
        </div>
    );
}
