
import React from 'react';
import { InfoModalData } from '../types';
import XIcon from './icons/XIcon';
import SparkleIcon from './icons/SparkleIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import CertificateIcon from './icons/CertificateIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: InfoModalData | null;
}

const InfoModal = ({ isOpen, onClose, data }: InfoModalProps) => {
    if (!isOpen || !data) return null;
    
    const WHATSAPP_NUMBER = '5542999722042';
    const customQuoteMessage = `Olá! Gostaria de montar um plano de estudos personalizado. Podemos conversar sobre as opções?`;
    const whatsappCustomQuoteUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customQuoteMessage)}`;


    let content;
    switch (data.type) {
        case 'mentorBio':
            content = (
                <>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <SparkleIcon className="w-8 h-8 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-[var(--color-text-strong)]">Paixão e Propósito</h3>
                                <p className="text-[var(--color-text)] leading-relaxed">
                                    Com uma paixão por transformar não apenas olhares, mas vidas, Joyci Almeida fundou a Luxury Studio para ser um farol de excelência e empoderamento.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <CertificateIcon className="w-8 h-8 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-[var(--color-text-strong)]">Expertise Comprovada</h3>
                                <p className="text-[var(--color-text)] leading-relaxed">
                                    Especialista em estética facial com mais de 10 certificações, garantindo um ensino baseado nas técnicas mais atuais e seguras do mercado.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <BriefcaseIcon className="w-8 h-8 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-[var(--color-text-strong)]">Visão de Negócios</h3>
                                <p className="text-[var(--color-text)] leading-relaxed">
                                    Formada em Administração, Joyci une a arte da estética com uma sólida visão de negócios, ensinando a construir uma marca forte e lucrativa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <p className="text-lg italic text-[var(--color-primary)]/90">
                            "Meu objetivo é guiar você para a independência financeira e o sucesso no competitivo mercado da beleza."
                        </p>
                    </div>
                </>
            );
            break;
        case 'customCourse':
            content = (
                <>
                    <div dangerouslySetInnerHTML={{ __html: data.hook }} />
                    <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                         <a
                            href={whatsappCustomQuoteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3 bg-[var(--color-background)] text-[var(--color-primary)] border-2 border-[var(--color-primary)]/50 font-bold text-base rounded-full shadow-lg transform hover:scale-105 hover:border-[var(--color-primary)] transition-all duration-300 ease-in-out"
                        >
                            <WhatsAppIcon className="w-6 h-6" />
                            Pedir Orçamento Personalizado
                        </a>
                    </div>
                </>
            );
            break;
        default:
            content = (
                <div className="text-left animate-fade-in-up">
                    <blockquote className="border-l-4 border-[var(--color-primary)] pl-6 italic">
                        <p className="text-[var(--color-text)] leading-relaxed text-lg">
                            {data.hook}
                        </p>
                    </blockquote>
                </div>
            );
            break;
    }

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-[var(--color-modal-overlay)] backdrop-blur-sm flex items-center justify-center z-[1000] p-4 transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl p-0.5 rounded-2xl bg-gradient-to-br from-[#EACD8C] via-[#d8b26b] to-[#F0D8A4] shadow-2xl animated-border-gold flex flex-col"
                style={{ maxHeight: '90vh' }}
            >
                <div className="relative bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] rounded-[15px] flex flex-col overflow-hidden">
                    <div className="p-6 sm:p-8 pb-4 flex-shrink-0 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[var(--color-text-subtle)] hover:text-[var(--color-text-strong)] transition-colors z-20"
                            aria-label="Fechar modal"
                        >
                            <XIcon className="w-7 h-7" />
                        </button>
                        
                        <div className="text-center pr-8 sm:pr-12">
                            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-[var(--color-primary)] mb-2 uppercase tracking-wider">{data.title}</h2>
                            <div className="w-24 h-0.5 bg-[var(--color-primary)]/50 mx-auto mt-2"></div>
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto custom-scrollbar px-6 sm:px-8 pt-0 pb-6 sm:pb-8">
                        {content}
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default InfoModal;
