import React, { useRef, useEffect } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
}

interface FireworksCanvasProps {
    isHovering: boolean;
}

const FireworksCanvas = ({ isHovering }: FireworksCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number | null>(null);
    const isExploding = useRef(false);
    
    const prevHovering = useRef(isHovering);

    const createExplosion = (x: number, y: number) => {
        if (isExploding.current) return;
        isExploding.current = true;

        const particleCount = 50 + Math.floor(Math.random() * 30);
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            const friction = 0.98;
            const gravity = 0.08;

            particles.current.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed * friction,
                vy: Math.sin(angle) * speed * friction - 1, // Add initial upward motion
                alpha: 1,
                color: `hsl(${40 + Math.random() * 15}, 100%, ${60 + Math.random() * 20}%)` // Golden colors
            });
        }

        window.setTimeout(() => { isExploding.current = false }, 500);
    };

    useEffect(() => {
        if (isHovering && !prevHovering.current) {
             const canvas = canvasRef.current;
             if(canvas) {
                createExplosion(canvas.width / 2, canvas.height / 2);
             }
        }
        prevHovering.current = isHovering;
    }, [isHovering]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const animate = () => {
            if (!canvasRef.current) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.vx *= 0.98; // friction
                p.vy += 0.08; // gravity
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.02;

                if (p.alpha <= 0) {
                    particles.current.splice(i, 1);
                } else {
                    ctx.globalAlpha = p.alpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2, false);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                }
            }

            animationFrameId.current = window.requestAnimationFrame(animate);
        };
        
        animate();

        return () => {
            if(animationFrameId.current){
                window.cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            width="300"
            height="50"
        />
    );
};

export default FireworksCanvas;