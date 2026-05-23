import React, { useState, useEffect, useRef } from 'react';

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
    const [speech, setSpeech] = useState<string | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const mascotRef = useRef<HTMLDivElement>(null);
    const speechTimeout = useRef<number | null>(null);
    const clickAnimationTimeout = useRef<number | null>(null);

    useEffect(() => {
        // This effect handles closing the speech bubble when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (speech && mascotRef.current && !mascotRef.current.contains(event.target as Node)) {
                setSpeech(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (speechTimeout.current) clearTimeout(speechTimeout.current);
            if (clickAnimationTimeout.current) clearTimeout(clickAnimationTimeout.current);
        };
    }, [speech]);

    const handleMascotClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevents the global click listener from immediately closing the bubble

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
            <img
                src="/mascot.png"
                alt="Mascote Luxy, a gatinha unicórnio"
                className={`w-full h-full object-contain drop-shadow-lg mascot-img ${isClicked ? 'mascot-click-animation' : ''}`}
            />
            <style>{`
                .mascot-container:hover .mascot-img {
                    transform: rotate(5deg) scale(1.05);
                }
                .mascot-img {
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
            `}</style>
        </div>
    );
};

export default Mascot;
