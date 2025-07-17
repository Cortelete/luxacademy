import React, { useState, useEffect, useRef } from 'react';

const MESSAGES = [
    "Que tal seguir a gente no Insta? ✨",
    "Vem ver nosso trabalho incrível no Instagram! 💖",
    "Pssst! Siga @luxury.joycialmeida para dicas e novidades.",
    "Clique aqui e venha brilhar com a gente no Instagram! ⭐",
    "Curiosa? Nosso Instagram tem tudo sobre cílios!",
    "Para inspiração diária, siga @luxury.joycialmeida! 😉",
    "Não perca nada! Siga nosso Instagram. 💖",
    "Junte-se à nossa comunidade no Instagram!",
    "Um clique para um mundo de beleza: Siga-nos! ✨",
    "Seu feed vai ficar mais luxuoso com nosso Insta!"
];

const MiniMascot = () => {
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);
    const [bubbleMessage, setBubbleMessage] = useState('');
    const [bubblePosition, setBubblePosition] = useState<'left' | 'right'>('right');
    const mascotRef = useRef<HTMLDivElement>(null);

    const handleMascotClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const randomIndex = Math.floor(Math.random() * MESSAGES.length);
        setBubbleMessage(MESSAGES[randomIndex]);
        setIsBubbleVisible(prev => !prev);
    };

    useEffect(() => {
        if (!isBubbleVisible) return;

        // Position Logic
        if (mascotRef.current) {
            const mascotRect = mascotRef.current.getBoundingClientRect();
            // If the mascot's left edge is past the halfway point of the screen
            if (mascotRect.left > window.innerWidth / 2) {
                setBubblePosition('left');
            } else {
                setBubblePosition('right');
            }
        }

        // Outside Click Logic
        const handleClickOutside = (event: MouseEvent) => {
            if (mascotRef.current && !mascotRef.current.contains(event.target as Node)) {
                setIsBubbleVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isBubbleVisible]);

    const instagramUrl = "https://www.instagram.com/luxury.joycialmeida/";
    
    const bubbleContainerClasses = {
        left: "absolute bottom-full mb-2 right-full mr-2 w-max max-w-[200px] p-0.5 rounded-xl shadow-2xl bg-gradient-to-br from-[#EACD8C] to-[#d8b26b] animate-bubble-pop-in-left",
        right: "absolute bottom-full mb-2 left-full ml-2 w-max max-w-[200px] p-0.5 rounded-xl shadow-2xl bg-gradient-to-br from-[#EACD8C] to-[#d8b26b] animate-bubble-pop-in-right"
    };
    
    const bubbleTransformOrigin = {
        left: "bottom right",
        right: "bottom left"
    };

    return (
        <div ref={mascotRef} onClick={handleMascotClick} className="relative cursor-pointer w-full h-full">
            {isBubbleVisible && (
                <div 
                    className={bubbleContainerClasses[bubblePosition]}
                    style={{ transformOrigin: bubbleTransformOrigin[bubblePosition] }}
                >
                    <div className="relative bg-gradient-to-br from-[#1e1e1e] to-[#121212] rounded-lg px-3 py-2 text-center">
                        <p className="text-sm text-white font-medium leading-tight">
                            {bubbleMessage}<br/>
                            <a 
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="font-bold text-[#EACD8C] hover:underline"
                            >
                                @luxury.joycialmeida
                            </a>
                        </p>
                        {/* Triangle Pointer */}
                        {bubblePosition === 'left' ? (
                            <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 
                                          border-l-[8px] border-l-[#1e1e1e]
                                          border-t-[8px] border-t-transparent
                                          border-b-[8px] border-b-transparent"></div>
                        ) : (
                            <div className="absolute top-1/2 -translate-y-1/2 right-full w-0 h-0 
                                          border-r-[8px] border-r-[#1e1e1e]
                                          border-t-[8px] border-t-transparent
                                          border-b-[8px] border-b-transparent"></div>
                        )}
                    </div>
                </div>
            )}
            
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <defs>
                    <linearGradient id="miniGoldenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FDF5E6" />
                        <stop offset="50%" stopColor="#F0E68C" />
                        <stop offset="100%" stopColor="#DAA520" />
                    </linearGradient>
                    <linearGradient id="miniYarnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDF5E6" />
                        <stop offset="100%" stopColor="#F0E68C" />
                    </linearGradient>
                    <filter id="miniWingGlow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.1" result="blur" />
                        <feFlood floodColor="#F0E68C" floodOpacity="0.3" result="glowColor" />
                        <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="SourceGraphic"/>
                            <feMergeNode in="glow"/>
                        </feMerge>
                    </filter>
                </defs>
                <g className="mini-mascot-wings" filter="url(#miniWingGlow)">
                    <path d="M 65 65 Q 73 55, 80 58 C 82 62, 76 67, 72 65 Z" fill="url(#miniGoldenGradient)" stroke="#333333" strokeWidth="0.4" />
                    <path d="M 65 68 Q 69 73, 76 70 C 78 73, 70 76, 65 68 Z" fill="url(#miniGoldenGradient)" stroke="#333333" strokeWidth="0.4" />
                    <path d="M 35 65 Q 27 55, 20 58 C 18 62, 24 67, 28 65 Z" fill="url(#miniGoldenGradient)" stroke="#333333" strokeWidth="0.4" />
                    <path d="M 35 68 Q 31 73, 24 70 C 22 73, 30 76, 35 68 Z" fill="url(#miniGoldenGradient)" stroke="#333333" strokeWidth="0.4" />
                </g>
                <path d="M 38 55 C 30 65, 30 75, 50 80 C 70 75, 70 65, 62 55 Z" fill="#F8F8F0" stroke="#333333" strokeWidth="0.8" />
                <circle cx="45" cy="70" r="3.5" fill="#F8F8F0" stroke="#333333" strokeWidth="0.8" />
                <circle cx="55" cy="70" r="3.5" fill="#F8F8F0" stroke="#333333" strokeWidth="0.8" />
                <circle cx="50" cy="65" r="5" fill="url(#miniYarnGradient)" stroke="#333333" strokeWidth="0.8" />
                <path d="M 46 63 Q 48 65, 49 66.5" stroke="#333333" strokeWidth="0.5" fill="none" />
                <path d="M 54 63 Q 52 65, 51 66.5" stroke="#333333" strokeWidth="0.5" fill="none" />
                <path d="M 47 67 Q 50 66, 53 67" stroke="#333333" strokeWidth="0.5" fill="none" />
                <path d="M 68 60 Q 72 68, 66 70 C 64 71, 60 70, 60 68 Q 64 60, 68 60 Z" fill="#F8F8F0" stroke="#333333" strokeWidth="0.8" />
                <circle cx="60" cy="68" r="2" fill="#333333" />
                <circle cx="50" cy="45" r="12" fill="#F8F8F0" stroke="#333333" strokeWidth="0.8" />
                <path d="M 35 38 L 43 30 Q 45 29, 46 30 L 35 38 Z" fill="#F8F8F0" stroke="#333333" strokeWidth="0.8" />
                <path d="M 65 38 L 57 30 Q 55 29, 54 30 L 65 38 Z" fill="#F8F8F0" stroke="#333333" strokeWidth="0.8" />
                <path d="M 39 38.5 L 42 33 L 43 37 Z" fill="#333333" />
                <path d="M 61 38.5 L 58 33 L 57 37 Z" fill="#333333" />
                <g>
                    <path d="M 45 27 H 55 V 28 H 45 Z" fill="url(#miniGoldenGradient)" stroke="#333333" strokeWidth="0.5" />
                    <path d="M 46 27 L 47 25 L 48 27 Z" fill="url(#miniGoldenGradient)" stroke="#333333" strokeWidth="0.5" />
                    <path d="M 49 27 L 50 24 L 51 27 Z" fill="url(#miniGoldenGradient)" stroke="#333333" strokeWidth="0.5" />
                    <path d="M 52 27 L 53 25 L 54 27 Z" fill="url(#miniGoldenGradient)" stroke="#333333" strokeWidth="0.5" />
                    <circle cx="47" cy="25.5" r="0.3" fill="white" />
                    <circle cx="50" cy="24.5" r="0.4" fill="white" />
                    <circle cx="53" cy="25.5" r="0.3" fill="white" />
                </g>
                <path d="M 49 26 L 51 26 L 50 21 Z" fill="url(#miniGoldenGradient)" stroke="#333333" strokeWidth="0.8" />
                <path d="M 49.5 25.5 L 49.8 24.5 M 49.8 24.5 L 50 23.5 M 50 23.5 L 50.2 22.5" stroke="#333333" strokeWidth="0.3" strokeLinecap="round" />
                <g>
                    <circle cx="40" cy="43" r="4" fill="#333333" />
                    <circle cx="60" cy="43" r="4" fill="#333333" />
                    <g>
                        <circle cx="39" cy="42" r="1" fill="white" />
                        <circle cx="41" cy="42" r="0.5" fill="white" />
                        <circle cx="59" cy="42" r="1" fill="white" />
                        <circle cx="61" cy="42" r="0.5" fill="white" />
                    </g>
                </g>
                <path d="M 36 41 Q 35 40, 36 39 M 37 41 Q 36 40, 37 39 M 38 41 Q 37 40, 38 39" stroke="#333333" strokeWidth="0.5" strokeLinecap="round" />
                <path d="M 64 41 Q 65 40, 64 39 M 63 41 Q 64 40, 63 39 M 62 41 Q 63 40, 62 39" stroke="#333333" strokeWidth="0.5" strokeLinecap="round" />
                <path d="M 50 47 L 49 48 Q 50 49, 51 48 Z" fill="#333333" />
                <path d="M 48.5 49 Q 50 50, 51.5 49" stroke="#333333" strokeWidth="0.5" fill="none" strokeLinecap="round" />
                <path d="M 30 46 L 38 46" stroke="#333333" strokeWidth="0.3" strokeLinecap="round" />
                <path d="M 30 47 L 38 47" stroke="#333333" strokeWidth="0.3" strokeLinecap="round" />
                <path d="M 70 46 L 62 46" stroke="#333333" strokeWidth="0.3" strokeLinecap="round" />
                <path d="M 70 47 L 62 47" stroke="#333333" strokeWidth="0.3" strokeLinecap="round" />
                <circle cx="25" cy="50" r="0.4" fill="#F0E68C" opacity="0.6" />
                <circle cx="75" cy="52" r="0.3" fill="#F0E68C" opacity="0.5" />
            </svg>
            
            <style>{`
                @keyframes bubble-pop-in-left {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-bubble-pop-in-left {
                    animation: bubble-pop-in-left 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
                }
                @keyframes bubble-pop-in-right {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-bubble-pop-in-right {
                    animation: bubble-pop-in-right 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
                }
            `}</style>
        </div>
    );
};

export default MiniMascot;