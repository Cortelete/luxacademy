
import React from 'react';
import { Course } from '../types';
import XIcon from './icons/XIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import CheckIcon from './icons/CheckIcon';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: Course | null;
    randomPhrase: string;
    featureCategories: Record<string, string[]>;
}

const Modal = ({ isOpen, onClose, course, randomPhrase, featureCategories }: ModalProps) => {
    if (!isOpen || !course) return null;

    const WHATSAPP_NUMBER = '5542999722042';
    const purchaseMessage = `Olá! Quero garantir minha vaga no curso ${course.title}. Podemos prosseguir com a inscrição?`;
    const whatsappPurchaseUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(purchaseMessage)}`;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-[var(--color-modal-overlay)] backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg p-0.5 rounded-2xl bg-gradient-to-br from-[#EACD8C] via-[#d8b26b] to-[#F0D8A4] shadow-2xl animated-border-gold flex flex-col"
                style={{
                    maxHeight: '90vh'
                }}
            >
                <div className="relative bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] rounded-[15px] flex flex-col h-full overflow-hidden">

                    {/* Header */}
                    <div className="p-6 sm:p-8 pb-4 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[var(--color-text-subtle)] hover:text-[var(--color-text-strong)] transition-colors z-10"
                            aria-label="Fechar modal"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>

                        <div className="text-center">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-[var(--color-primary)]">{course.title}</h2>
                            <div className="mt-4 flex justify-center gap-4 text-sm">
                                <span className="bg-[var(--color-tag-bg)] px-3 py-1 rounded-full">Dificuldade: <span className="font-semibold">{course.difficulty}</span></span>
                            </div>

                            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl italic text-[var(--color-text)] leading-relaxed border-l-4 border-[var(--color-primary)] pl-4 text-left">
                                "{randomPhrase}"
                            </p>

                            <div className="mt-4 sm:mt-6 text-left">
                                <h4 className="font-bold text-[var(--color-text-strong)] text-base md:text-lg">Neste curso, o seu foco será:</h4>
                                <p className="text-[var(--color-text-subtle)] mt-1 text-sm md:text-base">{course.focus}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Scrollable Feature List */}
                    <div className="mt-2 flex-1 overflow-y-auto custom-scrollbar px-6 sm:px-8">
                         <div className="space-y-4 text-left">
                            {Object.entries(featureCategories).map(([category, features]) => {
                                const isFullCategoryIncluded = course.includedCategories.includes(category);
                                
                                return (
                                    <div key={category}>
                                        <h5 className="font-bold text-base md:text-lg mb-2 text-[var(--color-primary)]">+ {category}</h5>
                                        <ul className="space-y-1.5 text-sm md:text-base">
                                            {features.map((feature) => {
                                                const isFeatureIncluded = isFullCategoryIncluded || (course.includedFeatures && course.includedFeatures.includes(feature));

                                                return (
                                                  <li key={feature} className={`flex items-start ${isFeatureIncluded ? 'text-[var(--color-text)]' : 'text-[var(--color-text-subtle)]/70 line-through'}`}>
                                                      {isFeatureIncluded 
                                                          ? <CheckIcon className="w-5 h-5 mr-3 mt-1 text-[var(--color-success)] flex-shrink-0" /> 
                                                          : <XIcon className="w-5 h-5 mr-3 mt-1 text-[var(--color-danger)] flex-shrink-0" />
                                                      }
                                                      <span>{feature}</span>
                                                  </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                    <div className="mt-6 sm:mt-8 text-center p-6 sm:p-8 pt-4 border-t border-[var(--color-border)] flex-shrink-0">
                        <a
                            href={whatsappPurchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 w-full px-10 py-3 sm:py-4 bg-[var(--color-background)] text-[var(--color-primary)] border-2 border-[var(--color-primary)]/50 font-bold text-base sm:text-lg rounded-full shadow-lg transform hover:scale-105 hover:border-[var(--color-primary)] transition-all duration-300 ease-in-out"
                        >
                            <WhatsAppIcon className="w-6 h-6" />
                            Garantir Minha Vaga
                        </a>
                         <button
                            onClick={onClose}
                            className="mt-3 text-sm sm:text-base text-[var(--color-text-subtle)] hover:text-[var(--color-text-strong)] transition-colors"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
