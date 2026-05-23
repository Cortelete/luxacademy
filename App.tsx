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
  'Técnica': [
    '2 Dias de Curso Intensivo',
    'Kit de Material Inicial Incluso',
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
    'Consultoria InteligenciArte.IA (50% OFF)',
    'Estratégias de Posicionamento',
    'Bônus: Finanças para Lash',
  ]
};

const coursesData: Course[] = [
    { 
      id: 1, 
      title: 'Lash Profissional', 
      uniqueDescription: 'Domine a técnica fundamental. A base perfeita para iniciar sua carreira com segurança.',
      motivationalPhrase: 'A precisão é sua assinatura.',
      price: 'R$ 1500', 
      includedCategories: ['Técnica'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria', 'Grupo Suporte'],
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
      price: 'R$ 2000', 
      highlight: 'Mais Popular', 
      includedCategories: ['Técnica', 'Gestão'], 
      includedFeatures: ['Certificado', 'Coffee Break', 'Apostila', 'Mentoria', 'Grupo Suporte', 'Networking'],
      cta: 'Ser Empreendedora', 
      whatsappMessage: 'Olá! Tenho interesse no curso Lash Empreendedora.',
      difficulty: 'Intermediário',
      focus: 'Técnica + Gestão de Negócio',
      modalPhrases: ['O sucesso ama a preparação.']
    },
    { 
      id: 3, 
      title: 'Lash Empresária VIP', 
      uniqueDescription: 'A elite da formação. Técnica, gestão avançada e inteligência artificial para escalar.',
      motivationalPhrase: 'Lidere, inove, domine.',
      price: 'R$ 3000', 
      highlight: 'Exclusivo',
      includedCategories: ['Técnica', 'Gestão', 'Exclusivo VIP'], 
      includedFeatures: ['Tudo dos anteriores', 'Mentoria VIP', 'Consultoria I.A.'],
      cta: 'Aplicar para VIP', 
      whatsappMessage: 'Olá! Tenho interesse no curso Lash Empresária VIP.',
      difficulty: 'Avançado',
      focus: 'Domínio Total e Escala',
      modalPhrases: ['Comprometa-se com o extraordinário.']
    },
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