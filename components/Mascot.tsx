


import React, { useState, useEffect, useRef } from 'react';

type Expression = 'neutral' | 'happy'; // Mantido, mas o gatinho terá expressão feliz fixa

const phrases = [
    // 🌟 Frases Motivacionais e Estímulo ao Autocuidado
    "Já fez seus cílios hoje?",
    "Um olhar poderoso abre portas!",
    "Que tal um glow up no seu olhar?",
    "Você nasceu para brilhar!",
    "Sua beleza é única. Realce-a!",
    "Pronta para conquistar o mundo?",
    "Cílios em dia, autoestima nas alturas!",
    "Sorria! Seus cílios estão incríveis.",
    "Dê um piscar de olhos para as oportunidades!",
    "Olhar marcante, presença inesquecível.",

    // 💼 Empreendedorismo & Vida de Lash Designer
    "Você pode viver do que ama — e os cílios podem te levar longe!",
    "Trabalhe com beleza, ganhe com liberdade.",
    "Empreender com cílios é transformar arte em renda.",
    "Ser lash é mais que um trabalho. É um estilo de vida!",
    "Transforme seu dom em profissão. O mercado te espera.",
    "O mundo precisa do seu talento — comece hoje!",
    "Liberdade financeira começa com uma escolha.",
    "Cílios podem ser o seu primeiro passo rumo à independência.",
    "Um olhar marcante pode abrir um futuro brilhante.",
    "O sucesso começa com um único agendamento.",

    // 📚 Dicas e Incentivos para Comprar o Curso
    "Comece do zero e vá além com quem entende de verdade!",
    "Aprender com a Joy é investir em excelência e amor pela profissão.",
    "Não é só um curso — é um divisor de águas na sua carreira.",
    "Quer clientes fiéis? Aprenda técnicas de verdade!",
    "O conhecimento certo te faz economizar anos de tentativas.",
    "O curso da Joy transforma iniciantes em profissionais de destaque.",
    "Você merece aprender com quem realmente se importa com o seu sucesso.",
    "Dê o primeiro passo com quem já trilhou o caminho.",

    // ✨ Vantagens de ser Lash Designer
    "Tenha sua própria agenda, no seu ritmo.",
    "Trabalhe de onde quiser — até de casa!",
    "Alcance sua liberdade financeira com as próprias mãos.",
    "Eleve a autoestima das pessoas enquanto constrói sua independência.",
    "Transforme a vida de mulheres todos os dias — e a sua também.",
    "Beleza, arte, lucro e amor em um só trabalho.",
    "Faça parte de um mercado que não para de crescer!",

    // 💖 Sobre a Joy e a Experiência com Ela
    "A Joy ensina com o coração e transforma com a prática.",
    "Cada aula da Joy é um passo mais perto da sua melhor versão.",
    "Quem aprende com paixão, ensina com alma. E a Joy é prova disso!",
    "Mentoria com propósito, técnica com excelência.",
    "Joy acredita em você mesmo antes de você acreditar.",
    "Mais do que uma professora, uma inspiração para sua jornada.",

    // 🛍️ Gatilho final
    "Esperar pelo momento ideal ou transformar hoje no seu novo começo?"
];

const Mascot: React.FC = () => {
    const [isBlinking, setIsBlinking] = useState(false);
    const [speech, setSpeech] = useState<string | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const pupilsRef = useRef<SVGGElement>(null);
    const mascotRef = useRef<HTMLDivElement>(null);
    const blinkTimeout = useRef<number | null>(null);
    const speechTimeout = useRef<number | null>(null);
    const clickAnimationTimeout = useRef<number | null>(null);

    const startBlinking = () => {
        const blinkDuration = 150; // Duração do piscar em ms
        const blinkInterval = Math.random() * 3000 + 2000; // Intervalo aleatório entre 2 e 5 segundos

        setIsBlinking(true);
        blinkTimeout.current = window.setTimeout(() => {
            setIsBlinking(false);
            blinkTimeout.current = window.setTimeout(startBlinking, blinkInterval);
        }, blinkDuration);
    };

    useEffect(() => {
        startBlinking();

        const handleMouseMove = (e: MouseEvent) => {
            if (!mascotRef.current || !pupilsRef.current) return;

            const mascotRect = mascotRef.current.getBoundingClientRect();
            const mascotCenterX = mascotRect.left + mascotRect.width / 2;
            const mascotCenterY = mascotRect.top + mascotRect.height / 2;

            const deltaX = e.clientX - mascotCenterX;
            const deltaY = e.clientY - mascotCenterY;

            const angle = Math.atan2(deltaY, deltaX);
            const maxPupilMove = 2; // Ajustado para o tamanho dos olhos do gatinho
            const pupilX = Math.cos(angle) * maxPupilMove;
            const pupilY = Math.sin(angle) * maxPupilMove;
            pupilsRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (blinkTimeout.current) clearTimeout(blinkTimeout.current);
            if (speechTimeout.current) clearTimeout(speechTimeout.current);
            if (clickAnimationTimeout.current) clearTimeout(clickAnimationTimeout.current);
        };
    }, []);

    useEffect(() => {
        // This effect handles closing the speech bubble when clicking outside
        if (!speech) return;

        const handleClickOutside = (event: MouseEvent) => {
            // Check if the click is outside the mascot container
            if (mascotRef.current && !mascotRef.current.contains(event.target as Node)) {
                setSpeech(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup function
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [speech]); // This effect depends only on the 'speech' state


    const handleMascotClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevents the global click listener from immediately closing the bubble
        if (blinkTimeout.current) clearTimeout(blinkTimeout.current);
        setIsBlinking(false);
        startBlinking();

        if (clickAnimationTimeout.current) clearTimeout(clickAnimationTimeout.current);
        setIsClicked(true);
        clickAnimationTimeout.current = window.setTimeout(() => {
            setIsClicked(false);
        }, 1000); // Duração da animação de clique

        if (speechTimeout.current) clearTimeout(speechTimeout.current);
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setSpeech(randomPhrase);
        speechTimeout.current = window.setTimeout(() => {
            setSpeech(null);
        }, 5000); // Increased time to 5s
    };

    return (
        <div
            ref={mascotRef}
            onClick={handleMascotClick}
            className="fixed bottom-2 left-6 w-28 h-28 md:w-32 md:h-32 z-[45] cursor-pointer transition-transform duration-300 hover:scale-110 mascot-container"
            aria-label="Mascote Interativa Luxy, a assistente virtual"
        >
            {speech && (
                 <div className="absolute bottom-full mb-2 left-full ml-2 w-max max-w-[160px] sm:max-w-[220px] p-0.5 rounded-xl shadow-2xl animate-bubble-pop-in-right bg-gradient-to-br from-[var(--color-primary)] to-[#d8b26b]" style={{ transformOrigin: 'bottom left' }}>
                    <div className="relative bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                        <strong className="block text-xs sm:text-sm font-bold text-[var(--color-text-strong)] mb-1">Dica da Luxy ✨</strong>
                        <p className="text-[13px] sm:text-[15px] text-[var(--color-primary)] font-medium leading-tight">{speech}</p>
                        {/* Triangle Pointer */}
                        <div
                            className="absolute top-1/2 right-full w-0 h-0 
                                       border-r-[8px] border-r-[var(--color-surface)]
                                       border-t-[8px] border-t-transparent
                                       border-b-[8px] border-b-transparent"
                            style={{ transform: 'translateY(-50%) rotate(-45deg)' }}
                        ></div>
                    </div>
                </div>
            )}
            <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-lg mascot-svg ${isClicked ? 'mascot-click-animation' : ''}`}>
                <defs>
                    {/* Dourado delicado */}
                    <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FDF5E6" /> {/* Old Lace - muito claro, dourado sutil */}
                        <stop offset="50%" stopColor="#F0E68C" /> {/* Khaki - dourado suave */}
                        <stop offset="100%" stopColor="#DAA520" /> {/* Goldenrod - ainda adiciona profundidade */}
                    </linearGradient>
                    <linearGradient id="yarnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDF5E6" />
                        <stop offset="100%" stopColor="#F0E68C" />
                    </linearGradient>
                    {/* Filtro para brilho sutil nas asas */}
                    <filter id="wingGlow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="blur" /> {/* Menos desfoque */}
                        <feFlood floodColor="#F0E68C" floodOpacity="0.3" result="glowColor" /> {/* Cor mais suave, menos opaca */}
                        <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="SourceGraphic"/>
                            <feMergeNode in="glow"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Asas Angelicaiis e Mais Baixo com Gomos de Borboleta */}
                <g className="mascot-wings-animation" filter="url(#wingGlow)">
                    {/* Asa Direita (Superior e Inferior) */}
                    <path d="M 65 60 Q 75 45, 85 50 C 88 55, 80 65, 75 60 Z" fill="url(#goldenGradient)" stroke="#333333" strokeWidth="0.8" className="wing-right-upper" />
                    <path d="M 65 65 Q 70 75, 80 70 C 83 75, 70 80, 65 65 Z" fill="url(#goldenGradient)" stroke="#333333" strokeWidth="0.8" className="wing-right-lower" />
                    
                    {/* Asa Esquerda (Superior e Inferior) */}
                    <path d="M 35 60 Q 25 45, 15 50 C 12 55, 20 65, 25 60 Z" fill="url(#goldenGradient)" stroke="#333333" strokeWidth="0.8" className="wing-left-upper" />
                    <path d="M 35 65 Q 30 75, 20 70 C 17 75, 30 80, 35 65 Z" fill="url(#goldenGradient)" stroke="#333333" strokeWidth="0.8" className="wing-left-lower" />
                </g>

                {/* Glitter/Faíscas sutis ao redor do mascote (círculos para evitar formas inesperadas) */}
                <g className="glitter-animation">
                    <circle cx="15" cy="65" r="1.5" fill="#F0E68C" opacity="0.7" className="sparkle" style={{ animationDelay: '0s' }} />
                    <circle cx="85" cy="60" r="1.2" fill="#F0E68C" opacity="0.6" className="sparkle" style={{ animationDelay: '0.2s' }} />
                    <circle cx="20" cy="25" r="1" fill="#F0E68C" opacity="0.5" className="sparkle" style={{ animationDelay: '0.4s' }} />
                    <circle cx="78" cy="20" r="1.3" fill="#F0E68C" opacity="0.8" className="sparkle" style={{ animationDelay: '0.6s' }} />
                </g>

                {/* Corpo do Gato */}
                <path d="M 35 50 C 25 65, 25 80, 50 85 C 75 80, 75 65, 65 50 Z" fill="#F8F8F0" stroke="#333333" strokeWidth="1.5" />
                
                {/* Patas Dianteiras */}
                <circle cx="43" cy="72" r="7" fill="#F8F8F0" stroke="#333333" strokeWidth="1.5" />
                <circle cx="57" cy="72" r="7" fill="#F8F8F0" stroke="#333333" strokeWidth="1.5" />

                {/* Bola de Lã */}
                <circle cx="50" cy="68" r="10" fill="url(#yarnGradient)" stroke="#333333" strokeWidth="1.5" />
                <path d="M 43 65 Q 46 68, 48 71" stroke="#333333" strokeWidth="1" fill="none" />
                <path d="M 57 65 Q 54 68, 52 71" stroke="#333333" strokeWidth="1" fill="none" />
                <path d="M 45 72 Q 50 70, 55 72" stroke="#333333" strokeWidth="1" fill="none" />

                {/* Cauda */}
                <path d="M 70 65 Q 75 75, 68 80 C 65 82, 60 80, 60 75 Q 65 65, 70 65 Z" fill="#F8F8F0" stroke="#333333" strokeWidth="1.5" />
                <circle cx="60" cy="75" r="4" fill="#333333" /> {/* Ponta da cauda */}

                {/* Cabeça do Gato */}
                <circle cx="50" cy="48" r="25" fill="#F8F8F0" stroke="#333333" strokeWidth="1.5" />

                {/* Orelhas (Redesenhadas para serem mais pontudas e felinas) */}
                <path d="M 30 35 L 45 20 Q 48 18, 50 20 L 30 35 Z" fill="#F8F8F0" stroke="#333333" strokeWidth="1.5" />
                <path d="M 70 35 L 55 20 Q 52 18, 50 20 L 70 35 Z" fill="#F8F8F0" stroke="#333333" strokeWidth="1.5" />
                {/* Dentro das Orelhas */}
                <path d="M 37 36 L 44 28 L 47 34 Z" fill="#333333" />
                <path d="M 63 36 L 56 28 L 53 34 Z" fill="#333333" />

                {/* Coroa Dourada */}
                <g>
                    {/* Base da coroa */}
                    <path d="M 40 22 H 60 V 24 H 40 Z" fill="url(#goldenGradient)" stroke="#333333" strokeWidth="1.0" />
                    {/* Pontas da coroa */}
                    <path d="M 43 22 L 45 18 L 47 22 Z" fill="url(#goldenGradient)" stroke="#333333" strokeWidth="1.0" />
                    <path d="M 48 22 L 50 15 L 52 22 Z" fill="url(#goldenGradient)" stroke="#333333" strokeWidth="1.0" />
                    <path d="M 53 22 L 55 18 L 57 22 Z" fill="url(#goldenGradient)" stroke="#333333" strokeWidth="1.0" />
                    {/* Pequenos brilhos/gemas na coroa */}
                    <circle cx="45" cy="19.5" r="0.7" fill="white" />
                    <circle cx="50" cy="16.5" r="0.9" fill="white" />
                    <circle cx="55" cy="19.5" r="0.7" fill="white" />
                </g>

                {/* Chifre de Unicórnio (ajustado para se encaixar com a coroa) */}
                <path d="M 48 20 L 52 20 L 50 10 Z" fill="url(#goldenGradient)" stroke="#333333" strokeWidth="1.5" />
                <path d="M 49 19 L 49.5 17 M 49.5 17 L 50 15 M 50 15 L 50.5 13 M 50.5 13 L 51 11" stroke="#333333" strokeWidth="1" fill="none" strokeLinecap="round" />

                {/* Olhos e Pálpebras */}
                <g className="mascot-eyes">
                    {/* Olhos Abertos */}
                     <g ref={pupilsRef} style={{ transition: 'transform 0.1s ease-out' }}>
                        {/* Olho Esquerdo */}
                        <circle cx="42" cy="50" r="8" fill="#333333" />
                        <circle cx="40" cy="48" r="2" fill="white" />
                        <circle cx="41.5" cy="48" r="1" fill="white" />
                        {/* Olho Direito */}
                        <circle cx="58" cy="50" r="8" fill="#333333" />
                        <circle cx="56" cy="48" r="2" fill="white" />
                        <circle cx="57.5" cy="48" r="1" fill="white" />
                    </g>
                    {/* Pálpebras (visíveis ao piscar) */}
                    {isBlinking && (
                        <g className="mascot-blink-animation">
                             <path d="M 34 50 C 36 47, 48 47, 50 50" stroke="#333333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                             <path d="M 50 50 C 52 47, 64 47, 66 50" stroke="#333333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        </g>
                    )}
                </g>

                {/* Cílios */}
                <path d="M 37 46 Q 35 44, 37 42 M 39 46 Q 37 44, 39 42 M 41 46 Q 39 44, 41 42" stroke="#333333" strokeWidth="1" strokeLinecap="round" />
                <path d="M 63 46 Q 65 44, 63 42 M 61 46 Q 63 44, 61 42 M 59 46 Q 61 44, 59 42" stroke="#333333" strokeWidth="1" strokeLinecap="round" />

                {/* Nariz */}
                <path d="M 50 53 L 48 55 Q 50 56, 52 55 Z" fill="#333333" />

                {/* Boca (:3) */}
                 <path d="M 47 59 C 48 60.5, 49 60.5, 50 59 C 51 60.5, 52 60.5, 53 59" stroke="#333333" strokeWidth="1.2" fill="none" strokeLinecap="round" />


                {/* Bigodes */}
                <path d="M 30 50 L 38 50" stroke="#333333" strokeWidth="0.5" strokeLinecap="round" />
                <path d="M 30 52 L 38 52" stroke="#333333" strokeWidth="0.5" strokeLinecap="round" />
                <path d="M 70 50 L 62 50" stroke="#333333" strokeWidth="0.5" strokeLinecap="round" />
                <path d="M 70 52 L 62 52" stroke="#333333" strokeWidth="0.5" strokeLinecap="round" />
            </svg>
            <style>{`
                .mascot-container:hover .mascot-svg {
                    transform: rotate(5deg) scale(1.05);
                }
                .mascot-svg {
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .mascot-wings-animation {
                    transform-origin: 50% 65%;
                    animation: gentle-flap 3s ease-in-out infinite;
                }
                @keyframes gentle-flap {
                    0%, 100% { transform: scaleY(1) translateY(0); }
                    50% { transform: scaleY(1.05) translateY(-2px); }
                }

                .sparkle {
                    animation: sparkle-fade 2.5s infinite;
                    opacity: 0;
                }
                @keyframes sparkle-fade {
                    0%, 100% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 0.8; transform: scale(1.2); }
                    75% { opacity: 0; transform: scale(0.5); }
                }

                .glitter-animation {
                    animation: glitter-rotate 15s linear infinite;
                    transform-origin: 50% 50%;
                }
                @keyframes glitter-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .mascot-click-animation {
                    animation: mascot-bounce 1s cubic-bezier(0.18, 0.89, 0.32, 1.28);
                }
                @keyframes mascot-bounce {
                    0%   { transform: scale(1) translateY(0); }
                    10%  { transform: scale(1.1, 0.9) translateY(0); }
                    30%  { transform: scale(0.9, 1.1) translateY(-10px); }
                    50%  { transform: scale(1.05, 0.95) translateY(0); }
                    70%  { transform: scale(1) translateY(-2px); }
                    100% { transform: scale(1) translateY(0); }
                }

                @keyframes bubble-pop-in-right {
                    from {
                        opacity: 0;
                        transform: scale(0.5);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-bubble-pop-in-right {
                    animation: bubble-pop-in-right 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
                }

                /* Blink animation for eyelids */
                .mascot-blink-animation {
                    animation: blink-anim 0.15s ease-out;
                    transform-origin: 50% 50%;
                }
                @keyframes blink-anim {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(0.1); }
                }
            `}</style>
        </div>
    );
};

export default Mascot;