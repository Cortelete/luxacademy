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
import InfoModal from './components/InfoModal';
import Mascot from './components/Mascot';
import Contact from './components/Contact';

// --- Inlined Helper Icons for Navigation ---
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


// --- Navigation Modal Component ---
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
            className="fixed inset-0 bg-[var(--color-modal-overlay)] backdrop-blur-md z-[60] flex items-center justify-center transition-opacity duration-300"
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
                        className="flex flex-col items-center gap-2 text-[var(--color-text-strong)] transition-all duration-300 transform hover:scale-105 hover:text-[var(--color-primary)] group"
                        style={{ animation: `fadeInUp 0.4s ${index * 0.05}s ease-out forwards`, opacity: 0 }}
                    >
                        <span className="font-playfair font-semibold text-2xl tracking-wide">{link.name}</span>
                    </button>
                ))}
            </div>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};


const featureCategories = {
  'Técnica Lash': [
    '2 Dias de Curso Intensivo',
    'Kit de Material Inicial',
    'Aplicação, Manutenção e Remoção',
    'Saúde Ocular & Higienização',
    'Mapeamento e Visagismo',
  ],
  'Gestão': [
    'Postura e Comunicação',
    'Precificação e Fornecedores',
    'Marketing para Redes Sociais',
    'Atendimento ao Cliente',
  ],
  'Exclusivo VIP': [
    'Estratégias de Posicionamento',
    'Bônus: Finanças para Lash',
    'Mentoria Individual VIP'
  ],
  'Lash Lifting': [
    'Técnica Lash Lifting',
    'Coloração de Cílios',
    'Nutrição dos Fios'
  ],
  'Sobrancelhas - Iniciante': [
    'Design de Sobrancelhas',
    'Henna com Tintura',
    'Biossegurança e Mapeamento'
  ],
  'Sobrancelhas - Avançado': [
    'Módulo 4: Protocolo de Crescimento',
    'Módulo 5: Brow Repair',
    'Módulo 6: Brow Lamination'
  ]
};

const coursesData: Course[] = [
    { 
      id: 1, 
      title: 'Lash Profissional', 
      uniqueDescription: 'Domine a técnica fundamental. A base perfeita para iniciar sua carreira com segurança.',
      motivationalPhrase: 'A precisão é sua assinatura.',
      price: 'R$ 1200',
      highlight: 'Pacote Iniciante',
      includedCategories: ['Técnica Lash'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria', 'Grupo Suporte'],
      summaryFeatures: ['Técnica Completa (Iniciante ao Avançado)', 'Kit de Material Incluso', 'Certificado Reconhecido', 'Suporte Pós-Curso Vitalício'],
      cta: 'Começar Agora', 
      whatsappMessage: 'Olá! Tenho interesse no curso Lash Profissional.',
      difficulty: 'Iniciante',
      focus: 'Técnica e Fundamentos',
      modalPhrases: ['Comece com a base certa.']
    },
    { 
      id: 2, 
      title: 'Lash Empreendedora', 
      uniqueDescription: 'Vá além da técnica. Aprenda a gerir e construir sua marca de sucesso.',
      motivationalPhrase: 'Transforme talento em negócio.',
      price: 'R$ 1500', 
      highlight: 'Mais Popular', 
      includedCategories: ['Técnica Lash', 'Gestão'], 
      includedFeatures: ['Certificado', 'Coffee Break', 'Apostila', 'Mentoria', 'Grupo Suporte', 'Networking'],
      summaryFeatures: ['Técnica Completa (Iniciante ao Avançado)', 'Kit de Material Incluso', 'Gestão de Carreira & Marketing', 'Posicionamento Profissional'],
      cta: 'Ser Empreendedora', 
      whatsappMessage: 'Olá! Tenho interesse no curso Lash Empreendedora.',
      difficulty: 'Intermediário',
      focus: 'Técnica + Gestão de Negócio',
      modalPhrases: ['O sucesso ama a preparação.']
    },
    { 
      id: 3, 
      title: 'Lash Empresária VIP', 
      uniqueDescription: 'A elite da formação. Técnica e gestão avançada para escalar.',
      motivationalPhrase: 'Lidere, inove, domine.',
      price: 'R$ 2500', 
      highlight: 'Exclusivo',
      includedCategories: ['Técnica Lash', 'Gestão', 'Exclusivo VIP'], 
      includedFeatures: ['Tudo dos anteriores', 'Mentoria VIP'],
      summaryFeatures: ['Técnica Completa (Iniciante ao Avançado)', 'Kit de Material Incluso', 'Mentoria Individual VIP', 'Gestão de Carreira & Marketing'],
      cta: 'Aplicar para VIP', 
      whatsappMessage: 'Olá! Tenho interesse no curso Lash Empresária VIP.',
      difficulty: 'Avançado',
      focus: 'Domínio Total e Escala',
      modalPhrases: ['Comprometa-se com o extraordinário.']
    },
    { 
      id: 4, 
      title: 'Lash Lifting', 
      uniqueDescription: 'Aprenda a técnica de elevação e curvatura dos cílios naturais.',
      motivationalPhrase: 'Realce a beleza natural.',
      price: 'R$ 800',
      includedCategories: ['Lash Lifting'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      summaryFeatures: ['Técnica de Lash Lifting', 'Coloração de Cílios', 'Nutrição dos Fios', 'Certificado Reconhecido'],
      cta: 'Inscrever-se', 
      whatsappMessage: 'Olá! Tenho interesse no curso de Lash Lifting.',
      difficulty: 'Iniciante/Intermediário',
      focus: 'Estética de Cílios Naturais',
      modalPhrases: ['Cílios perfeitos, naturalmente.']
    },
    { 
      id: 5, 
      title: 'Sobrancelhas (Módulo 1, 2 e 3)', 
      uniqueDescription: 'Design de sobrancelhas e henna com tintura.',
      motivationalPhrase: 'O design perfeito começa aqui.',
      price: 'R$ 1000',
      includedCategories: ['Sobrancelhas - Iniciante'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      summaryFeatures: ['Design de Sobrancelhas', 'Henna com Tintura', 'Biossegurança e Mapeamento', 'Certificado Reconhecido'],
      cta: 'Inscrever-se', 
      whatsappMessage: 'Olá! Tenho interesse no curso de Sobrancelhas (Módulo 1, 2 e 3).',
      difficulty: 'Iniciante',
      focus: 'Fundamentos e Design',
      modalPhrases: ['Transforme olhares com o design perfeito.']
    },
    { 
      id: 6, 
      title: 'Sobrancelhas (Módulo 4)', 
      uniqueDescription: 'Protocolo de crescimento de sobrancelhas.',
      motivationalPhrase: 'Especialista em recuperação e crescimento.',
      price: 'R$ 700',
      includedCategories: ['Sobrancelhas - Avançado'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      summaryFeatures: ['Protocolo de Crescimento', 'Tratamentos Específicos', 'Acompanhamento de Resultados', 'Certificado Reconhecido'],
      cta: 'Inscrever-se', 
      whatsappMessage: 'Olá! Tenho interesse no Módulo 4 (Crescimento de Sobrancelhas).',
      difficulty: 'Avançado',
      focus: 'Protocolos de Crescimento',
      modalPhrases: ['Saúde e beleza em cada fio.']
    },
    { 
      id: 7, 
      title: 'Brow Repair (Módulo 5)', 
      uniqueDescription: 'Técnicas de reparação e reconstrução de sobrancelhas.',
      motivationalPhrase: 'Restaure a confiança e a beleza.',
      price: 'R$ 800',
      includedCategories: ['Sobrancelhas - Avançado'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      summaryFeatures: ['Técnicas de Brow Repair', 'Recuperação de Falhas', 'Análise Capilar', 'Certificado Reconhecido'],
      cta: 'Inscrever-se', 
      whatsappMessage: 'Olá! Tenho interesse no curso Brow Repair (Módulo 5).',
      difficulty: 'Avançado',
      focus: 'Reconstrução e Reparo',
      modalPhrases: ['A arte da reconstrução.']
    },
    { 
      id: 8, 
      title: 'Brow Lamination (Módulo 6)', 
      uniqueDescription: 'Alinhamento e volume para sobrancelhas perfeitas.',
      motivationalPhrase: 'Sobrancelhas encorpadas e modernas.',
      price: 'R$ 800',
      includedCategories: ['Sobrancelhas - Avançado'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      summaryFeatures: ['Técnica de Brow Lamination', 'Alinhamento dos Fios', 'Nutrição Pós-Química', 'Certificado Reconhecido'],
      cta: 'Inscrever-se', 
      whatsappMessage: 'Olá! Tenho interesse no curso Brow Lamination (Módulo 6).',
      difficulty: 'Avançado',
      focus: 'Tendência e Alinhamento',
      modalPhrases: ['Domine a técnica mais desejada.']
    },
    { 
      id: 9, 
      title: 'Combo: Profissional + Lifting', 
      uniqueDescription: 'Lash Profissional + Lash Lifting. Formação completa em cílios.',
      motivationalPhrase: 'Multiplique suas possibilidades.',
      price: 'R$ 1700',
      highlight: 'Combo',
      includedCategories: ['Técnica Lash', 'Lash Lifting'], 
      includedFeatures: ['Certificado Duplo', 'Apostila', 'Mentoria', 'Grupo Suporte'],
      summaryFeatures: ['Técnica Completa Fio a Fio', 'Técnica Lash Lifting', 'Kit de Material Incluso', 'Certificados Reconhecidos'],
      cta: 'Garantir Combo', 
      whatsappMessage: 'Olá! Tenho interesse no Combo Lash Profissional + Lash Lifting.',
      difficulty: 'Iniciante ao Intermediário',
      focus: 'Extensão e Elevação de Cílios',
      modalPhrases: ['Uma formação completa para um olhar marcante.']
    },
    { 
      id: 10, 
      title: 'Combo: VIP + Lifting', 
      uniqueDescription: 'Lash VIP + Lash Lifting. A elite da formação em cílios.',
      motivationalPhrase: 'Excelência sem limites.',
      price: 'R$ 2900',
      highlight: 'Premium',
      includedCategories: ['Técnica Lash', 'Gestão', 'Exclusivo VIP', 'Lash Lifting'], 
      includedFeatures: ['Certificados', 'Apostila', 'Mentoria VIP'],
      summaryFeatures: ['Formação VIP em Extensão', 'Mentoria Individual', 'Lash Lifting Completo', 'Gestão de Carreira & Marketing'],
      cta: 'Garantir Combo VIP', 
      whatsappMessage: 'Olá! Tenho interesse no Combo VIP + Lash Lifting.',
      difficulty: 'Avançado',
      focus: 'Domínio, Gestão e Múltiplas Técnicas',
      modalPhrases: ['A maestria em todos os detalhes.']
    },
    { 
      id: 11, 
      title: 'Combo: Lash + Sobrancelhas', 
      uniqueDescription: 'Lash Profissional + Módulo Iniciante de Sobrancelhas.',
      motivationalPhrase: 'Seja uma especialista completa.',
      price: 'R$ 1900',
      highlight: 'Combo',
      includedCategories: ['Técnica Lash', 'Sobrancelhas - Iniciante'], 
      includedFeatures: ['Certificado Duplo', 'Apostila', 'Mentoria'],
      summaryFeatures: ['Técnica Completa em Cílios', 'Design e Henna', 'Kit de Material Incluso', 'Certificados Reconhecidos'],
      cta: 'Garantir Combo', 
      whatsappMessage: 'Olá! Tenho interesse no Combo Lash Profissional + Sobrancelhas Iniciante.',
      difficulty: 'Iniciante',
      focus: 'Cílios e Sobrancelhas',
      modalPhrases: ['Domine o olhar por completo.']
    },
    { 
      id: 12, 
      title: 'Combo: Lamination + Lifting', 
      uniqueDescription: 'Brow Lamination + Lash Lifting. O combo das técnicas mais procuradas.',
      motivationalPhrase: 'Tendência e naturalidade.',
      price: 'R$ 1400',
      highlight: 'Em Alta',
      includedCategories: ['Lash Lifting', 'Sobrancelhas - Avançado'], 
      includedFeatures: ['Certificados', 'Apostila', 'Mentoria'],
      summaryFeatures: ['Brow Lamination', 'Lash Lifting', 'Elevação e Alinhamento', 'Certificados Reconhecidos'],
      cta: 'Garantir Combo', 
      whatsappMessage: 'Olá! Tenho interesse no Combo Brow Lamination + Lash Lifting.',
      difficulty: 'Intermediário',
      focus: 'Técnicas de Alinhamento Natural',
      modalPhrases: ['O poder da naturalidade em suas mãos.']
    },
    { 
      id: 13, 
      title: 'Combo: Brow Completo', 
      uniqueDescription: 'Todos os módulos de sobrancelhas (1 ao 6). A formação definitiva.',
      motivationalPhrase: 'Domine a arte das sobrancelhas.',
      price: 'R$ 3000',
      highlight: 'Masterclass',
      includedCategories: ['Sobrancelhas - Iniciante', 'Sobrancelhas - Avançado'], 
      includedFeatures: ['Certificação Master', 'Apostila Completa', 'Mentoria', 'Suporte VIP'],
      summaryFeatures: ['Design, Henna e Tintura', 'Protocolo de Crescimento', 'Brow Repair & Lamination', 'Certificação Completa'],
      cta: 'Formação Brow Master', 
      whatsappMessage: 'Olá! Tenho interesse no Combo Brow Completo.',
      difficulty: 'Iniciante ao Avançado',
      focus: 'Especialização Total em Sobrancelhas',
      modalPhrases: ['Torne-se a referência na sua região.']
    },
    { 
      id: 14, 
      title: 'O Império: VIP + Brow Completo', 
      uniqueDescription: 'Lash VIP + Brow Completo. A capacitação máxima para dominar o mercado.',
      motivationalPhrase: 'O topo é o seu lugar.',
      price: 'R$ 5000',
      highlight: 'A Jornada Máxima',
      includedCategories: ['Técnica Lash', 'Gestão', 'Exclusivo VIP', 'Sobrancelhas - Iniciante', 'Sobrancelhas - Avançado', 'Lash Lifting'], 
      includedFeatures: ['Todos os Certificados', 'Mentoria VIP', 'Suporte Premium'],
      summaryFeatures: ['Domínio Absoluto em Cílios e Sobrancelhas', 'Mentoria Individual VIP', 'Gestão Estratégica', 'Lash Lifting Completo', 'Certificação Master Completa'],
      cta: 'Aplicar para o Império', 
      whatsappMessage: 'Olá! Tenho interesse no pacote O Império (VIP + Brow Completo).',
      difficulty: 'Avançado',
      focus: 'Domínio de Mercado e Alto Padrão',
      modalPhrases: ['Construa seu império na área da beleza.']
    }
];

const customCourseInfo: InfoModalData = {
    title: 'Personalize Sua Jornada',
    hook: `
        <div class="space-y-4 text-left">
            <p class="text-[var(--color-text)] leading-relaxed">
                Cada artista tem seu ritmo. Se você já tem experiência ou busca algo específico, criamos um plano exclusivo para você.
            </p>
            <ul class="list-disc list-inside text-[var(--color-text-strong)] space-y-2 mt-4">
                <li>Aperfeiçoamento Técnico</li>
                <li>Mentoria de Carreira e Marketing</li>
                <li>Foco em Saúde Ocular e Biossegurança</li>
                <li>Consultoria de Imagem e Marca</li>
            </ul>
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
            setIsScrolled(window.scrollY > 10);
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
        { name: 'A Mentora', key: 'about' as keyof SectionRefs, icon: UserIcon },
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

        const refsToObserve = Object.values(sectionRefs) as React.RefObject<HTMLElement>[];
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
        <div className="font-montserrat text-[var(--color-text)] bg-[var(--color-background)] min-h-screen flex flex-col">
            <div className='relative z-50'>
              <Header 
                scrollToSection={scrollToSection} 
                onMenuClick={() => setIsNavModalOpen(!isNavModalOpen)} 
                isNavOpen={isNavModalOpen}
                isScrolled={isScrolled}
              />
            </div>

            <WinkingLashes />
            
            <NavModal 
              isOpen={isNavModalOpen} 
              onClose={() => setIsNavModalOpen(false)} 
              scrollToSection={scrollToSection} 
              navLinks={navLinks} 
            />
            
            <FloatingWhatsApp />
            <Mascot />
            
            <main className="relative z-10 flex-grow">
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