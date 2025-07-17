import React, { useEffect, useRef } from 'react';

const GlobalMouseGlow = () => {
    const fadeOutTimeout = useRef<number | null>(null);
    const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const deltaX = e.clientX - lastMousePos.current.x;
            const deltaY = e.clientY - lastMousePos.current.y;
            const deltaTime = now - lastMousePos.current.time;
            
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const speed = deltaTime > 0 ? distance / deltaTime : 0;
            
            const opacity = Math.min(speed / 2.5, 0.6);

            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
            document.documentElement.style.setProperty('--glow-opacity', `${opacity}`);

            lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };

            if (fadeOutTimeout.current) {
                window.clearTimeout(fadeOutTimeout.current);
            }

            fadeOutTimeout.current = window.setTimeout(() => {
               document.documentElement.style.setProperty('--glow-opacity', '0');
            }, 200);
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if(fadeOutTimeout.current) {
                window.clearTimeout(fadeOutTimeout.current);
            }
        };
    }, []);

    return null;
};

export default GlobalMouseGlow;