

import React, { forwardRef } from 'react';
import CometTrailCanvas from './CometTrailCanvas';

interface HeroProps {
  scrollToSection: () => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ scrollToSection }, ref) => {
    
    // O texto principal para o título
    const titleText = "Domine a Arte dos Cílios.";

    return (
        <section 
            ref={ref}
            id="inicio" 
            className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden pt-24 -mt-24"
        >
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1599387737838-66a35673a57e?q=80&w=1974&auto=format&fit=crop')",
                    backgroundAttachment: 'fixed',
                    transform: 'scale(1.05)'
                }}
            ></div>
            <div className="absolute inset-0 bg-[var(--color-hero-overlay)]"></div>
            
            <CometTrailCanvas />

            <div 
                className="relative z-20 p-6 w-full hero-title-container"
            >
                <h1 
                    className="text-5xl sm:text-6xl md:text-8xl font-great-vibes pt-4 hero-title-golden cursor-pointer leading-snug md:leading-normal"
                >
                   {titleText}
                </h1>
                <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-playfair font-bold hero-subtitle uppercase">
                    Conquiste sua Independência.
                </h2>
                <button
                    onClick={scrollToSection}
                    className="mt-10 md:mt-12 px-10 py-4 bg-[var(--color-primary)] text-[var(--color-primary-contrast)] font-bold text-lg rounded-full shadow-lg hover:bg-[var(--color-primary)]/80 transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    Descubra os Cursos
                </button>
            </div>
        </section>
    );
});

export default Hero;