

import React from 'react';
import { SectionRefs } from '../types';
import InstagramIcon from './icons/InstagramIcon';

interface FooterProps {
    scrollToSection: (key: keyof SectionRefs) => void;
}

const Footer = ({ scrollToSection }: FooterProps) => {
    const instagramUrl = "https://www.instagram.com/luxury.joycialmeida/";
    const iaInstagramUrl = "https://www.instagram.com/inteligenciarte.ia/";

    return (
        <footer className="bg-[var(--color-background)]/85 text-[var(--color-text-strong)] py-12 border-t border-[var(--color-border)]">
            <div className="container mx-auto px-6 z-10 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col items-center md:items-start">
                         <h3 className="font-bold text-xl font-playfair text-[var(--color-primary)] mb-4">
                            Luxury Studio
                         </h3>
                         <p className="text-base text-[var(--color-text-subtle)] max-w-xs text-center md:text-left">
                            Transformando olhares e construindo impérios no mundo da beleza.
                         </p>
                    </div>

                    {/* Column 2: Navigation */}
                     <div className="flex flex-col items-center">
                        <h3 className="font-bold text-xl font-playfair text-[var(--color-primary)] mb-4">Navegação</h3>
                        <ul className="space-y-2 text-base">
                            <li><button onClick={() => scrollToSection('home')} className="hover:text-[var(--color-primary)] transition-colors text-[var(--color-text-subtle)]">Início</button></li>
                            <li><button onClick={() => scrollToSection('about')} className="hover:text-[var(--color-primary)] transition-colors text-[var(--color-text-subtle)]">Sobre</button></li>
                            <li><button onClick={() => scrollToSection('courses')} className="hover:text-[var(--color-primary)] transition-colors text-[var(--color-text-subtle)]">Cursos</button></li>
                             <li><button onClick={() => scrollToSection('contact')} className="hover:text-[var(--color-primary)] transition-colors text-[var(--color-text-subtle)]">Contato</button></li>
                        </ul>
                    </div>

                    {/* Column 3: Social */}
                     <div className="flex flex-col items-center md:items-end">
                        <h3 className="font-bold text-xl font-playfair text-[var(--color-primary)] mb-4">Siga-nos</h3>
                        <div className="space-y-2">
                             <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-end gap-2 hover:text-[var(--color-primary)] transition-colors text-[var(--color-text-subtle)]" aria-label="Instagram Luxury Studio">
                                <InstagramIcon className="w-5 h-5" />
                                <span>@luxury.joycialmeida</span>
                            </a>
                            <a href={iaInstagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-end gap-2 hover:text-[var(--color-primary)] transition-colors text-[var(--color-text-subtle)]" aria-label="Instagram InteligenciArte.IA">
                               <InstagramIcon className="w-5 h-5" />
                               <span>@InteligenciArte.IA</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 text-center border-t border-[var(--color-border)]/50">
                    <p className="text-sm text-[var(--color-text-subtle)]/80 mb-3">
                        Site desenvolvido por Davi Cortelete, CEO da&nbsp;
                        <a 
                            href={iaInstagramUrl}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-semibold text-[var(--color-text-subtle)] hover:text-[var(--color-primary)] transition-colors duration-300"
                        >
                            @InteligenciArte.IA
                        </a>
                    </p>
                     <p className="text-base text-[var(--color-text-subtle)]">
                        © {new Date().getFullYear()} Luxury Studio de Beleza - Joyci Almeida. Todos os Direitos Reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
