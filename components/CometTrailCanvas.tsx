

import React, { useRef, useEffect } from 'react';

const CometTrailCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<any[]>([]);
    const mouse = useRef({ x: -9999, y: -9999 });
    const lastMousePos = useRef({ x: -9999, y: -9999, time: Date.now() });
    const mouseSpeed = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const deltaX = e.clientX - lastMousePos.current.x;
            const deltaY = e.clientY - lastMousePos.current.y;
            const deltaTime = now - lastMousePos.current.time;
            
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const speed = deltaTime > 0 ? distance / deltaTime : 0;
            
            mouseSpeed.current = Math.min(speed, 15);
            
            lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        const createParticle = () => {
            const size = Math.random() * 2 + 1;
            const color = `hsla(45, 100%, 80%, ${Math.random() * 0.5 + 0.5})`;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2;
            
            particles.current.push({
                x: mouse.current.x,
                y: mouse.current.y,
                size: size,
                color: color,
                opacity: 1,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                maxLife: 50 + Math.random() * 50
            });
        };
        
        const animateParticles = () => {
            // Create particles based on speed
            const particlesToCreate = Math.floor(mouseSpeed.current / 2);
            for (let i = 0; i < particlesToCreate; i++) {
                createParticle();
            }

            // Decay speed
            mouseSpeed.current *= 0.95;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                
                if(p.life >= p.maxLife) {
                    particles.current.splice(i, 1);
                } else {
                    p.opacity = 1 - (p.life / p.maxLife);

                    ctx.globalAlpha = p.opacity;
                    ctx.beginPath();
                    ctx.fillStyle = p.color;
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(animateParticles);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        
        animateParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" 
        />
    );
};

export default CometTrailCanvas;