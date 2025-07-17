import React, { useEffect, useRef, useState } from 'react';

const AnimatedCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;
            if (cursorRef.current) {
                // Ajusta o deslocamento para alinhar a ponta da seta com a posição real do cursor.
                // A seta (36x36px) é rotacionada 230 graus. Sua ponta está originalmente a 12px
                // à direita do centro. Este cálculo compensa a rotação.
                //
                // O cálculo completo é:
                // novoX = x - (largura/2) - (dist_ponta_centro * cos(230deg))
                // novoY = y - (altura/2) - (dist_ponta_centro * sin(230deg))
                // novoX = x - 18 - (12 * -0.6428) = x - 18 + 7.71 = x - 10.29
                // novoY = y - 18 - (12 * -0.7660) = y - 18 + 9.19 = y - 8.81
                // Arredondando para valores inteiros para simplicidade.
                cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 9}px, 0)`;
            }

            const el = document.elementFromPoint(x, y);
            setIsPointer(!!el?.closest('a, button, input, [role="button"], select, textarea'));
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <div 
            ref={cursorRef} 
            id="animated-cursor"
            className={isPointer ? 'pointer' : ''}
        >
            <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="cursor-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDF5E6" />
                        <stop offset="50%" stopColor="#EACD8C" />
                        <stop offset="100%" stopColor="#B58A38" />
                    </linearGradient>
                </defs>
                <path
                    d="M4 4 L20 12 L4 20 Z" // simple arrowhead pointing right
                    fill="url(#cursor-gold-gradient)"
                    stroke="#333"
                    strokeWidth="0.5"
                />
            </svg>
        </div>
    );
};

export default AnimatedCursor;
