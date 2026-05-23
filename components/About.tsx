import React, { forwardRef } from 'react';
import { InfoModalData } from '../types';
import UsersIcon from './icons/UsersIcon';
import CertificateIcon from './icons/CertificateIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';

interface AboutProps {
    onStatClick: (data: InfoModalData) => void;
}

const About = forwardRef<HTMLElement, AboutProps>(({ onStatClick }, ref) => {
    
    const stats = [
        {
            icon: <UsersIcon />,
            value: "+1000",
            label: "Vidas Transformadas",
            hook: "Mais de 1000 atendimentos realizados com excelência, transformando olhares e elevando a autoestima de centenas de mulheres."
        },
        {
            icon: <CertificateIcon />,
            value: "+20",
            label: "Certificações",
            hook: "Formação contínua com as maiores referências do mercado para trazer o que há de mais inovador para você."
        },
        {
            icon: <BriefcaseIcon />,
            value: "Expert",
            label: "Gestão & Carreira",
            hook: "Uma mentoria completa que une técnica impecável e visão de negócios estratégica para o seu sucesso."
        }
    ];

    const mentorBio: InfoModalData = {
        title: 'Joyci Almeida',
        hook: 'Fundadora da Luxury Studio, Joyci Almeida combina sua formação em Administração com sua paixão pela estética. Especialista em Lash Design e Sobrancelhas, ela não ensina apenas a aplicar cílios, mas a construir um negócio sólido e lucrativo.',
        type: 'mentorBio'
    };

    return (
        <section ref={ref} id="sobre" className="px-6 py-20 fade-in-section">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Image Section - Cleaner */}
                    <div className="lg:w-1/2 relative group cursor-pointer" onClick={() => onStatClick(mentorBio)}>
                        <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-[4/5] max-w-md mx-auto">
                            <img 
                                src="/image.png"
                                alt="Joyci Almeida" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                            
                            <div className="absolute bottom-8 left-8 text-white">
                                <p className="font-playfair italic text-2xl">Joyci Almeida</p>
                                <p className="text-sm tracking-widest uppercase opacity-90">CEO & Mentora</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="text-[var(--color-primary)] font-bold tracking-widest text-sm uppercase mb-4 block">Sobre a Mentora</span>
                        <h2 className="text-4xl md:text-5xl font-playfair font-medium text-[var(--color-text-strong)] mb-8 leading-tight">
                            Excelência Técnica & <br/> Visão de Negócio.
                        </h2>
                        <p className="text-lg text-[var(--color-text)] leading-relaxed mb-12 font-light">
                            Acreditamos que o sucesso no mundo da beleza vai além da técnica perfeita. É preciso postura, gestão e estratégia. 
                            <br/><br/>
                            Joyci Almeida traz para seus cursos a união da arte dos cílios e sobrancelhas com a inteligência empresarial, preparando você não apenas para ser uma aplicadora, mas uma verdadeira empresária da beleza.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[var(--color-border)]">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center lg:text-left group cursor-pointer" onClick={() => onStatClick({ title: stat.label, hook: stat.hook, type: 'default' })}>
                                    <div className="text-[var(--color-primary)] mb-3 transition-transform duration-300 group-hover:-translate-y-1 inline-block">
                                        {React.cloneElement(stat.icon, { className: "w-8 h-8" })}
                                    </div>
                                    <h3 className="text-3xl font-playfair font-bold text-[var(--color-text-strong)]">{stat.value}</h3>
                                    <p className="text-sm text-[var(--color-text-subtle)] mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default About;