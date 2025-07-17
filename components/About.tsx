
import React, { forwardRef } from 'react';
import { InfoModalData } from '../types';
import UsersIcon from './icons/UsersIcon';
import CertificateIcon from './icons/CertificateIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import MiniMascot from './MiniMascot';
import GoldenDustCanvas from './GoldenDustCanvas';

interface AboutProps {
    onStatClick: (data: InfoModalData) => void;
}

const About = forwardRef<HTMLElement, AboutProps>(({ onStatClick }, ref) => {
    
    const stats = [
        {
            icon: <UsersIcon />,
            value: "+1000",
            label: "ATENDIMENTOS",
            shortLabel: "+1000",
            hook: "Com mais de 1000 atendimentos realizados, Joyci Almeida construiu uma reputação de excelência e confiança. Cada cliente recebe uma experiência única e personalizada, resultando em olhares transformados e autoestima elevada. Este número reflete não apenas a habilidade técnica, mas a paixão e o cuidado dedicados a cada procedimento."
        },
        {
            icon: <CertificateIcon />,
            value: "+10",
            label: "CERTIFICAÇÕES",
            shortLabel: "+10",
            hook: "A busca incessante por conhecimento é um pilar da Luxury Studio. Com mais de 10 certificações nacionais e internacionais em estética facial, Joyci Almeida está sempre à frente das últimas tendências e das técnicas mais seguras e inovadoras do mercado, garantindo um serviço de vanguarda para suas clientes e alunas."
        },
        {
            icon: <BriefcaseIcon />,
            value: "Visão de Negócios",
            label: "GESTÃO E ESTRATÉGIA",
            shortLabel: "+VISÃO",
            hook: "A excelência técnica encontra a visão estratégica. Formada em Administração e com especialização em Gestão de Pessoas, Joyci não apenas domina a arte dos cílios, mas também entende profundamente o que é necessário para construir e escalar um negócio de beleza bem-sucedido. Ela oferece uma mentoria completa que vai além da pinça, preparando suas alunas para serem verdadeiras empresárias."
        }
    ];

    const mentorBio: InfoModalData = {
        title: 'Joyci Almeida: A Visionária por Trás da Luxury',
        hook: 'Com uma paixão por transformar não apenas olhares, mas vidas, Joyci Almeida fundou a Luxury Studio. Formada em Administração e especialista em estética facial com mais de 10 certificações, ela combina arte, técnica e visão de negócios para empoderar mulheres, guiando-as para a independência financeira e o sucesso no competitivo mercado da beleza.',
        type: 'mentorBio'
    };

    return (
        <section ref={ref} id="sobre" className="py-20 md:py-32 bg-[var(--color-surface)]/85 fade-in-section">
            <div className="container mx-auto px-6">
                
                {/* Main Content: Photo + Text */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
                    {/* Photo */}
                    <div className="md:w-1/3 flex-shrink-0">
                         <div className="relative group rounded-lg shadow-2xl mx-auto md:mx-0 w-60 h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 border-8 border-[var(--color-surface)] ring-4 ring-[var(--color-primary)] transition-all duration-500 ease-in-out hover:ring-offset-4 hover:ring-offset-[var(--color-background)] hover:shadow-[0_0_45px_var(--color-primary)]/50 overflow-hidden">
                            <GoldenDustCanvas />
                            <img 
                                src="./image.png"
                                alt="Joyci Almeida" 
                                className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <button
                                    onClick={() => onStatClick(mentorBio)}
                                    className="text-white font-bold text-lg px-6 py-3 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/40 backdrop-blur-sm transition-all transform group-hover:scale-100 scale-90"
                                >
                                    Conheça a Mentora
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="md:w-2/3 text-center md:text-left relative">
                        <div className="absolute -top-16 -right-10 w-24 h-24 z-0 hidden lg:block animate-float" aria-hidden="true">
                           <MiniMascot />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[var(--color-primary)] mb-4 uppercase" style={{textShadow: '0 2px 8px var(--color-primary)/40'}}>A sua Mentora nesta Jornada</h2>
                        <p className="text-lg text-[var(--color-text)] leading-relaxed max-w-3xl">
                            Joyci Almeida não é apenas uma especialista, é uma visionária. Com uma metodologia que une técnica impecável, visão de negócio e paixão por elevar a autoestima, ela está pronta para guiar você ao sucesso.
                        </p>
                    </div>
                </div>

                {/* Stats Section - Moved Below */}
                <div className="mt-20 md:mt-24 pt-16 border-t border-[var(--color-border)]">
                    <div className="flex flex-row justify-around items-start gap-2 sm:gap-4 text-center max-w-5xl mx-auto">
                      {stats.map((stat, index) => (
                          <button 
                            key={index} 
                            className="relative group text-center"
                            onClick={() => onStatClick({ title: stat.label, hook: stat.hook, type: 'default' })}
                          >
                              <div className="flex flex-col items-center p-2 sm:p-4 rounded-lg transition-transform duration-300 group-hover:scale-110">
                                  
                                  {/* Icon: Always visible, size and margin adjust responsively */}
                                  {React.cloneElement(stat.icon, { 
                                    className: "h-10 w-10 sm:h-12 md:h-14 text-[var(--color-primary)] sm:mb-2 md:mb-3" 
                                  })}
                                  
                                  {/* Short Label for medium screens (sm-md) */}
                                  <span className="hidden sm:block md:hidden font-bold text-[var(--color-primary)] text-base sm:text-lg tracking-wider">
                                      {stat.shortLabel}
                                  </span>
                                  
                                  {/* Full Text for large screens (md+) */}
                                  <div className="hidden md:block">
                                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-text-strong)] leading-tight">{stat.value}</span>
                                      <span className="block text-xs sm:text-sm md:text-base text-[var(--color-text-subtle)] font-semibold tracking-wider mt-1">{stat.label}</span>
                                  </div>
                              </div>
                          </button>
                      ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default About;
