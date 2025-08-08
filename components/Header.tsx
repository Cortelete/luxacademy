import React from 'react';
import { SectionRefs } from '../types';
import InstagramIcon from './icons/InstagramIcon';
import ThemeSwitcher from './ThemeSwitcher';
import { MenuIcon } from './icons/MenuIcon';

// Inlined XMarkIcon for use within the header component
const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


interface HeaderProps {
    scrollToSection: (key: keyof SectionRefs) => void;
    onMenuClick: () => void;
    isNavOpen: boolean;
    isScrolled: boolean;
}

const Header = ({ scrollToSection, onMenuClick, isNavOpen, isScrolled }: HeaderProps) => {

    const navLinks: { name: string, key: keyof SectionRefs }[] = [
        { name: 'Início', key: 'home' },
        { name: 'Sobre', key: 'about' },
        { name: 'Cursos', key: 'courses' },
        { name: 'Contacto', key: 'contact' },
    ];
    
    const luxuryInstagramUrl = "https://www.instagram.com/luxury.joycialmeida/";

    const handleNavClick = (key: keyof SectionRefs) => {
        scrollToSection(key);
    };

    return (
        <header className={`sticky top-0 w-full transition-all duration-300 ease-in-out z-50 ${(isScrolled || isNavOpen) ? 'bg-[var(--color-surface)]/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                 <a 
                    href={luxuryInstagramUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-2xl font-playfair font-bold text-[var(--color-text-strong)] transition-all duration-300 hover:text-[var(--color-primary)] hover:drop-shadow-[0_0_8px_var(--color-primary)]"
                >
                    Luxury Studio
                </a>
                
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavClick(link.key)}
                            className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300 font-medium text-lg"
                        >
                            {link.name}
                        </button>
                    ))}
                     <a href={luxuryInstagramUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-strong)] hover:text-[var(--color-primary)] transition-colors duration-300 ml-4">
                        <InstagramIcon className="h-6 w-6" />
                    </a>
                    <ThemeSwitcher />
                </nav>

                {/* Mobile Nav Trigger */}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeSwitcher />
                    <button 
                      onClick={onMenuClick} 
                      className="relative z-50 text-[var(--color-text-strong)] hover:text-[var(--color-primary)] transition-colors p-2"
                      aria-label="Abrir menu de navegação"
                    >
                      <div className="relative w-6 h-6">
                        <MenuIcon className={`absolute transition-all duration-300 ${isNavOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                        <XMarkIcon className={`absolute transition-all duration-300 ${isNavOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
                      </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;