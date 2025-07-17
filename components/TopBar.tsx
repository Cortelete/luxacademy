import React, { useState, useEffect } from 'react';

const TopBar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="bg-[var(--color-background)]/50 text-[var(--color-primary)] text-sm py-2 px-6 shadow-lg backdrop-blur-sm w-full animate-fade-in-down">
            <div className="container mx-auto flex justify-between items-center font-mono">
                <span className="lux-text-glow">{formatDate(currentTime)}</span>
                <span className="lux-text-glow">{formatTime(currentTime)}</span>
            </div>
            <style>{`
                @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.7s ease-out;
                }
                .lux-text-glow {
                    text-shadow: 0 0 8px var(--color-primary)/40;
                }
            `}</style>
        </div>
    );
};

export default TopBar;