import React, { useRef, useEffect } from 'react';

// A more detailed particle for richer effects
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
    color: string;
    life: number;
    maxLife: number;
    // Adding specific types for physics
    type: 'trail' | 'mini_burst' | 'finale_shockwave' | 'finale_stardust';
}

export default function ClickEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number | null>(null);
    const pressStartTime = useRef(0);
    const isHolding = useRef(false);
    const lastMiniBurstPos = useRef({ x: 0, y: 0 });
    const mousePos = useRef({ x: 0, y: 0 });

    // Creates the big, multi-stage explosion
    const createGrandFinale = (x: number, y: number) => {
        // 1. Shockwave particles (fast, bright, short-lived)
        for (let i = 0; i < 50; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 10 + 5;
            particles.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                size: Math.random() * 3 + 1,
                color: `hsl(45, 100%, 90%)`,
                life: 0,
                maxLife: 40 + Math.random() * 20,
                type: 'finale_shockwave',
            });
        }
        // 2. Stardust particles (slower, lingering, affected by gravity)
        for (let i = 0; i < 150; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5;
            particles.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                size: Math.random() * 1.5 + 0.5,
                color: `hsla(45, 100%, 80%, ${Math.random() * 0.7 + 0.3})`,
                life: 0,
                maxLife: 100 + Math.random() * 50,
                type: 'finale_stardust',
            });
        }
    };

    // Creates small bursts of particles along the trail
    const createMiniBurst = (x: number, y: number) => {
         for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;
            particles.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 0.8,
                size: Math.random() * 2 + 1,
                color: `hsla(45, 100%, 80%, ${Math.random() * 0.5 + 0.3})`,
                life: 0,
                maxLife: 50 + Math.random() * 20,
                type: 'mini_burst',
            });
        }
    };

    // Creates the trail of particles that follow the cursor
    const createTrailParticle = (x: number, y: number, holdDuration: number) => {
        const intensity = Math.min(holdDuration / 3000, 1);
        const coreGlowRadius = 5 + intensity * 25;
        
        const spawnAngle = Math.random() * Math.PI * 2;
        const spawnRadius = coreGlowRadius * (Math.random() * 0.5 + 0.5);
        const spawnX = x + Math.cos(spawnAngle) * spawnRadius;
        const spawnY = y + Math.sin(spawnAngle) * spawnRadius;

        particles.current.push({
            x: spawnX, y: spawnY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            alpha: 0.7 + Math.random() * 0.3,
            size: (Math.random() * 1.5) + (intensity * 1.5),
            color: `hsla(45, 100%, 80%, ${Math.random() * 0.4 + 0.4})`,
            life: 0,
            maxLife: 30 + Math.random() * 20,
            type: 'trail',
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        const animate = () => {
            if (!canvasRef.current || !ctx) return;
            animationFrameId.current = requestAnimationFrame(animate);

            // Clear canvas completely to ensure underlying content is visible
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw the growing glow directly on canvas
            if (isHolding.current) {
                const holdDuration = Date.now() - pressStartTime.current;
                const holdProgress = Math.min(holdDuration / 3000, 1);
                
                const auraSize = 20 + holdProgress * 150;
                const coreSize = 5 + holdProgress * 25;

                const auraGradient = ctx.createRadialGradient(mousePos.current.x, mousePos.current.y, coreSize, mousePos.current.x, mousePos.current.y, auraSize);
                auraGradient.addColorStop(0, `hsla(45, 100%, 80%, ${0.2 * holdProgress})`);
                auraGradient.addColorStop(1, 'hsla(45, 100%, 80%, 0)');
                
                ctx.fillStyle = auraGradient;
                ctx.beginPath();
                ctx.arc(mousePos.current.x, mousePos.current.y, auraSize, 0, Math.PI * 2);
                ctx.fill();

                const coreGradient = ctx.createRadialGradient(mousePos.current.x, mousePos.current.y, 0, mousePos.current.x, mousePos.current.y, coreSize);
                coreGradient.addColorStop(0, 'hsla(45, 100%, 95%, 0.8)');
                coreGradient.addColorStop(1, `hsla(45, 100%, 80%, 0)`);

                ctx.fillStyle = coreGradient;
                ctx.beginPath();
                ctx.arc(mousePos.current.x, mousePos.current.y, coreSize, 0, Math.PI * 2);
                ctx.fill();
            }

            // Animate particles
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.life++;
                if (p.life >= p.maxLife) {
                    particles.current.splice(i, 1);
                    continue;
                }

                // Physics per type
                switch (p.type) {
                    case 'finale_shockwave':
                        p.vx *= 0.95;
                        p.vy *= 0.95;
                        break;
                    case 'finale_stardust':
                        p.vy += 0.05; // gravity
                        p.vx *= 0.99;
                        break;
                    case 'trail':
                    case 'mini_burst':
                        p.vx *= 0.96;
                        p.vy *= 0.96;
                        break;
                }
                
                p.x += p.vx;
                p.y += p.vy;
                p.alpha = 1 - (p.life / p.maxLife);

                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.globalAlpha = 1;
        };
        
        animate();

        const handleMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, a, input, [role="button"]')) return;
            
            isHolding.current = true;
            pressStartTime.current = Date.now();
            mousePos.current = { x: e.clientX, y: e.clientY };
            lastMiniBurstPos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            if (!isHolding.current) return;
            
            const holdDuration = Date.now() - pressStartTime.current;
            createTrailParticle(e.clientX, e.clientY, holdDuration);

            const dx = e.clientX - lastMiniBurstPos.current.x;
            const dy = e.clientY - lastMiniBurstPos.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 40) {
                 createMiniBurst(e.clientX, e.clientY);
                 lastMiniBurstPos.current = { x: e.clientX, y: e.clientY };
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (!isHolding.current) return;
            isHolding.current = false;
            
            const pressDuration = Date.now() - pressStartTime.current;
            if (pressDuration >= 3000) {
                createGrandFinale(e.clientX, e.clientY);
            } else {
                // small pop on quick click
                createMiniBurst(e.clientX, e.clientY);
            }
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-30"
        />
    );
}