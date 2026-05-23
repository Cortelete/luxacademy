import React, { forwardRef } from 'react';

interface HeroProps {
  scrollToSection: () => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ scrollToSection }, ref) => {
    return (
        <section 
            ref={ref}
            id="inicio" 
            className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20"
        >
             {/* Background Image - Updated to local file */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ 
                    backgroundImage: "url('/fundoinicio.png')",
                    backgroundPosition: 'center center'
                }}
            ></div>
            
            {/* Gradient Overlay for Text Readability on Light Theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/80 via-[var(--color-background)]/60 to-[var(--color-background)]"></div>

            <div className="relative z-20 container mx-auto px-6 text-center">
                <p className="text-[var(--color-primary)] font-semibold tracking-[0.2em] uppercase mb-4 animate-float">
                    Luxury Studio Academy
                </p>
                
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-playfair font-medium text-[var(--color-text-strong)] leading-tight mb-6">
                    Domine a Arte <br />
                    <span className="italic text-[var(--color-primary)]">do Olhar.</span>
                </h1>

                <p className="text-lg sm:text-xl text-[var(--color-text)] max-w-2xl mx-auto leading-relaxed mb-10 font-light">
                    Mais que uma técnica, uma transformação. Conquiste sua independência financeira e torne-se referência em Lash Design.
                </p>

                <button
                    onClick={scrollToSection}
                    className="px-10 py-4 bg-[var(--color-text-strong)] text-white font-medium text-sm tracking-widest uppercase hover:bg-[var(--color-primary)] transition-all duration-500 ease-out shadow-lg hover:shadow-xl rounded-sm"
                >
                    Conheça os Cursos
                </button>
            </div>
        </section>
    );
});

export default Hero;