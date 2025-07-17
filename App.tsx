

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { SectionRefs, Course, InfoModalData } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Footer from './components/Footer';
import WinkingLashes from './components/WinkingLashes';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Modal from './components/Modal';
import TopBar from './components/TopBar';
import GlobalMouseGlow from './components/GlobalMouseGlow';
import InfoModal from './components/InfoModal';
import Mascot from './components/Mascot';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import ClickEffect from './components/ClickEffect';
import AnimatedCursor from './components/AnimatedCursor';
import { MenuIcon } from './components/icons/MenuIcon';

// --- Inlined Helper Icons for Navigation (to avoid new files) ---

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0L1.72 11.47a.75.75 0 101.06 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
);
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);
const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 01.75.75v11.516l4.47-4.47a.75.75 0 011.06 1.06l-6 6a.75.75 0 01-1.06 0l-6-6a.75.75 0 111.06-1.06l4.47 4.47V3a.75.75 0 01.75-.75z" />
        <path d="M4.125 18a.75.75 0 000 1.5h15.75a.75.75 0 000-1.5H4.125z" />
    </svg>
);
const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.279-.087.431l4.258 7.373c.077.152.256.18.431.087l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C6.54 22.5 1.5 17.46 1.5 10.75V4.5z" clipRule="evenodd" />
    </svg>
);


// --- New Navigation Modal Component ---
interface NavModalProps {
    isOpen: boolean;
    onClose: () => void;
    scrollToSection: (key: keyof SectionRefs) => void;
    navLinks: { name: string, key: keyof SectionRefs, icon: React.FC<React.SVGProps<SVGSVGElement>> }[];
}

const NavModal = ({ isOpen, onClose, scrollToSection, navLinks }: NavModalProps) => {
    if (!isOpen) return null;

    const handleNavClick = (key: keyof SectionRefs) => {
        onClose();
        setTimeout(() => scrollToSection(key), 300);
    };

    return (
        <div 
            className="fixed inset-0 bg-[var(--color-modal-overlay)] backdrop-blur-lg z-[60] flex items-center justify-center"
            onClick={onClose}
        >
            <div 
              className="flex flex-col items-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
                {navLinks.map((link, index) => (
                    <button
                        key={link.key}
                        onClick={() => handleNavClick(link.key)}
                        className="flex flex-col items-center gap-2 text-[var(--color-text)] transition-all duration-300 transform hover:scale-110 hover:text-[var(--color-primary)] group"
                        style={{ animation: `fadeInUp 0.5s ${index * 0.1}s ease-out forwards`, opacity: 0 }}
                    >
                        <div className="p-4 bg-[var(--color-surface)]/80 rounded-full transition-all duration-300 group-hover:shadow-[0_0_20px_var(--color-primary)]">
                            <link.icon className="w-8 h-8"/>
                        </div>
                        <span className="font-semibold text-lg">{link.name}</span>
                    </button>
                ))}
            </div>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

// --- New Floating Menu Button ---
const FloatingMenuButton = ({ onClick }: { onClick: () => void }) => (
    <div className="fixed top-6 right-6 z-[55]">
        <button
            onClick={onClick}
            className="relative w-14 h-14 bg-[var(--color-surface)]/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[var(--color-text-strong)] hover:text-[var(--color-primary)] transition-all duration-300 hover:scale-110 animate-fade-in-down"
            aria-label="Abrir menu de navegação"
        >
            <MenuIcon className="w-7 h-7" />
        </button>
    </div>
);


const featureCategories = {
  'Plano Profissional': [
    '2 Dias de Curso Intensivo',
    'Kit de Material Inicial Incluso',
    'Aplicação dos cílios', 'Manutenção dos cílios', 'Remoção dos cílios', 'Saúde Ocular', 'Higienização Geral', 'Materiais necessários', 'Cola',
  ],
  'Plano Empreendedora': [
    'App Minha Agenda', 'Empreendedora Iniciante', 'Redes Sociais', 'Importância do Marketing', 'Fornecedores', 'Postura e Comunicação',
  ],
  'Plano Empresária VIP': [
    'Consultoria VIP InteligenciArte.IA (Bônus com 50% OFF)', 'Automação de mensagens e Chatbot', 'Inteligência Artificial em posts e Mídia Digital', 'Criação de site e Logotipo', 'Sobre o registro da marca', 'Bônus: Curiosidades Financeiras e Investimentos',
  ],
   'Bônus & Suporte': [
      'Certificado',
      'Coffee Break',
      'Apostila detalhada',
      'Mentoria exclusiva',
      'Grupo de WhatsApp geral',
      'Grupo exclusivo de empreendedoras + fornecedores',
      'Grupo de networking de alto padrão (Inteligenciart.IA)'
    ]
};

const coursesData: Course[] = [
    { 
      id: 1, 
      title: 'Lash Profissional', 
      uniqueDescription: 'Domine a técnica fundamental que é a base de toda grande artista de cílios. Perfeição em cada fio.',
      motivationalPhrase: 'A precisão é a sua assinatura.',
      price: 'R$ 899', 
      highlight: 'DIRETO AO PONTO',
      includedCategories: ['Plano Profissional'], 
      includedFeatures: ['Certificado', 'Coffee Break', 'Apostila detalhada', 'Mentoria exclusiva', 'Grupo de WhatsApp geral'],
      cta: 'QUERO COMEÇAR AGORA', 
      whatsappMessage: 'Olá! Tenho interesse no curso Lash Profissional. Pode dar-me mais informações?',
      difficulty: 'Iniciante',
      focus: 'Foco na técnica perfeita e nos fundamentos essenciais.',
      modalPhrases: [
        'Seu compromisso hoje é o alicerce do seu império amanhã. Comece com a base certa.',
        'A garantia do seu sucesso começa com a primeira pinça. Dê o primeiro passo com maestria.',
        'Transforme sua paixão em profissão. Exigimos dedicação, prometemos excelência.'
      ]
    },
    { 
      id: 2, 
      title: 'Lash Empreendedora', 
      uniqueDescription: 'Vá além da técnica. Aprenda a gerir, divulgar e construir uma marca de sucesso no universo da beleza.',
      motivationalPhrase: 'Transforme talento em negócio.',
      price: 'R$ 1099', 
      highlight: 'MELHOR ESCOLHA', 
      includedCategories: ['Plano Profissional', 'Plano Empreendedora'], 
      includedFeatures: ['Certificado', 'Coffee Break', 'Apostila detalhada', 'Mentoria exclusiva', 'Grupo de WhatsApp geral', 'Grupo exclusivo de empreendedoras + fornecedores'],
      cta: 'QUERO SER UMA EMPRESÁRIA', 
      whatsappMessage: 'Olá! Tenho interesse no curso Lash Empreendedora. Pode dar-me mais informações?',
      difficulty: 'Intermediário',
      focus: 'Da técnica à gestão do seu próprio estúdio de sucesso.',
      modalPhrases: [
        'Você não está apenas aprendendo uma técnica, está construindo um negócio. Comprometa-se com a sua visão.',
        'O sucesso ama a preparação. Este curso é a sua garantia de que estará pronta para gerir e crescer.',
        'Exigimos mentalidade de dona do negócio. Sua independência financeira começa com esta decisão.'
      ]
    },
    { 
      id: 3, 
      title: 'Lash Empresária VIP', 
      uniqueDescription: 'A elite da formação. Integre tecnologia de ponta, networking de alto nível e a consultoria InteligenciArte.IA com 50% de desconto exclusivo para escalar seu império.',
      motivationalPhrase: 'Lidere, inove, domine.',
      price: 'R$ 1499', 
      highlight: 'EXCLUSIVIDADE VIP',
      includedCategories: ['Plano Profissional', 'Plano Empreendedora', 'Plano Empresária VIP', 'Bônus & Suporte'], 
      includedFeatures: ['Certificado', 'Coffee Break', 'Apostila detalhada', 'Mentoria exclusiva', 'Grupo de WhatsApp geral', 'Grupo exclusivo de empreendedoras + fornecedores', 'Grupo de networking de alto padrão (Inteligenciart.IA)'],
      cta: 'QUERO SER VIP', 
      whatsappMessage: 'Olá! Tenho interesse no curso Lash Empresária VIP. Pode dar-me mais informações?',
      difficulty: 'Avançado / VIP',
      focus: 'Domínio total: técnica, gestão e escala com inteligência artificial.',
      modalPhrases: [
        'Este não é um curso, é uma transformação. Exigimos visão de futuro para um sucesso inevitável.',
        'Comprometa-se com o extraordinário. Sua jornada para se tornar uma referência no mercado começa aqui.',
        'Garantimos as ferramentas e a rede de contatos. Seu império de beleza está a um clique de distância.'
      ]
    },
];

const customCourseInfo: InfoModalData = {
    title: 'Sua Jornada, Suas Regras',
    hook: `
        <div class="space-y-6 text-left">
            <div class="animate-fade-in-up" style="animation-delay: 100ms;">
                <h3 class="font-bold text-lg text-[var(--color-primary)] mb-2">Planos Flexíveis Para Você</h3>
                <p class="text-[var(--color-text)] leading-relaxed">
                    Entendemos que cada jornada é única. Se você já possui experiência ou tem necessidades específicas, montamos um plano de estudos exclusivo para você.
                </p>
            </div>
            <div class="animate-fade-in-up" style="animation-delay: 200ms;">
                <h3 class="font-bold text-lg text-[var(--color-primary)] mb-2">Exemplos de Pacotes Personalizados:</h3>
                <ul class="list-disc list-inside text-[var(--color-text)] space-y-2">
                    <li><span class="font-semibold">Aperfeiçoamento Profissional:</span> Foco em técnicas avançadas, e as últimas tendências do mercado para quem já atua na área.</li>
                    <li><span class="font-semibold">Gestão & Marketing Acelerado:</span> Para a lash que já domina a técnica, mas quer escalar seu negócio, atrair mais clientes e gerenciar sua marca como uma empresária de sucesso.</li>
                    <li><span class="font-semibold">Módulo de Saúde Ocular:</span> Uma imersão completa em biossegurança, saúde dos fios e cuidados essenciais para se tornar uma referência em segurança e qualidade.</li>
                    <li><span class="font-semibold">Combo Técnica + Saúde:</span> Perfeito para quem quer dominar a aplicação com excelência e garantir segurança total às clientes, com foco em curvaturas, mapping e biossegurança.</li>
                    <li><span class="font-semibold">Combo Marketing + Marca Pessoal:</span> Ideal para a lash que deseja aprender a se posicionar nas redes, criar conteúdo estratégico e construir uma marca forte e inesquecível.</li>
                    <li><span class="font-semibold">Combo Futuro Digital:</span> Para visionárias que querem automatizar o atendimento, usar IA no marketing e criar uma presença profissional na internet com site, Google e autoridade.</li>
                </ul>
            </div>
            <div class="font-bold text-lg text-[var(--color-primary)] mb-2" style="animation-delay: 300ms;">
                <p class="text-lg text-[var(--color-primary)]/90">
                    Aqui os pacotes são montados por você, esses foram alguns exemplos, mas podemos deixar do seu jeitinho!
                </p>
            </div>            
            <div class="mt-8 pt-6 border-t border-[var(--color-border)] text-center animate-fade-in-up" style="animation-delay: 300ms;">
                <p class="text-lg italic text-[var(--color-primary)]/90">
                    Os valores são adaptados às suas necessidades. Vamos conversar e montar o plano perfeito para o seu sucesso?
                </p>
            </div>
        </div>
    `,
    type: 'customCourse'
};


const App = () => {
    const homeRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const coursesRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [randomModalPhrase, setRandomModalPhrase] = useState('');

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [infoModalData, setInfoModalData] = useState<InfoModalData | null>(null);

    const [isNavModalOpen, setIsNavModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const handleOpenCourseModal = (course: Course) => {
        const phrases = course.modalPhrases;
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setRandomModalPhrase(randomPhrase);
        setSelectedCourse(course);
        setIsCourseModalOpen(true);
    };

    const handleCloseCourseModal = () => {
        setIsCourseModalOpen(false);
        setSelectedCourse(null);
    };
    
    const handleOpenInfoModal = (data: InfoModalData) => {
        setInfoModalData(data);
        setIsInfoModalOpen(true);
    };

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
        setInfoModalData(null);
    };

    const sectionRefs = useMemo<SectionRefs>(() => ({
        home: homeRef,
        about: aboutRef,
        courses: coursesRef,
        contact: contactRef,
    }), []);
    
    const scrollToSection = (key: keyof SectionRefs) => {
        sectionRefs[key]?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const navLinks = useMemo(() => [
        { name: 'Início', key: 'home' as keyof SectionRefs, icon: HomeIcon },
        { name: 'Sobre', key: 'about' as keyof SectionRefs, icon: UserIcon },
        { name: 'Cursos', key: 'courses' as keyof SectionRefs, icon: BookOpenIcon },
        { name: 'Contato', key: 'contact' as keyof SectionRefs, icon: PhoneIcon },
    ], []);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const refsToObserve = Object.values(sectionRefs);
        refsToObserve.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            refsToObserve.forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [sectionRefs]);
    
    return (
        <div className="font-montserrat text-[var(--color-text)]">
            <AnimatedCursor />
            <ClickEffect />
            <GlobalMouseGlow />
            <div className='relative z-50'>
              <TopBar />
              <Header 
                scrollToSection={scrollToSection} 
                onMenuClick={() => setIsNavModalOpen(!isNavModalOpen)} 
                isNavOpen={isNavModalOpen}
                isScrolled={isScrolled}
              />
            </div>

            {isScrolled && !isNavModalOpen && <FloatingMenuButton onClick={() => setIsNavModalOpen(true)} />}

            <WinkingLashes />
            
            <NavModal 
              isOpen={isNavModalOpen} 
              onClose={() => setIsNavModalOpen(false)} 
              scrollToSection={scrollToSection} 
              navLinks={navLinks} 
            />
            
            <FloatingWhatsApp />
            <AIChat courses={coursesData} />
            <Mascot />
            
            <main className="relative z-10">
                <Hero ref={homeRef} scrollToSection={() => scrollToSection('courses')} />
                <About ref={aboutRef} onStatClick={handleOpenInfoModal} />
                <Courses 
                  ref={coursesRef} 
                  courses={coursesData} 
                  featureCategories={featureCategories} 
                  onCtaClick={handleOpenCourseModal} 
                  onCustomCourseClick={() => handleOpenInfoModal(customCourseInfo)}
                />
                <Contact ref={contactRef} />
            </main>

            <Footer scrollToSection={scrollToSection} />

            <Modal 
              isOpen={isCourseModalOpen} 
              onClose={handleCloseCourseModal} 
              course={selectedCourse} 
              randomPhrase={randomModalPhrase}
              featureCategories={featureCategories} 
            />
            <InfoModal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} data={infoModalData} />
        </div>
    );
};

export default App;