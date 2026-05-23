import React from 'react';
import { Course } from '../types';
import CheckIcon from './icons/CheckIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface CourseCardProps {
    course: Course;
    featureCategories: Record<string, string[]>;
    onCtaClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, featureCategories, onCtaClick }) => {
    const isVip = course.id === 3;
    const isHighlighted = !!course.highlight;

    const WHATSAPP_NUMBER = '5542999722042';
    const message = `Olá! Gostaria de me inscrever no curso ${course.title}.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Determine features to show based on course type
    const featuresToShow = () => {
        const allFeatures: string[] = [];
        
        // Simple mapping for display
        if (course.includedCategories.includes('Técnica')) {
            allFeatures.push('Técnica Completa (Iniciante ao Avançado)');
            allFeatures.push('Kit de Material Incluso');
        }
        if (course.includedCategories.includes('Gestão')) {
            allFeatures.push('Gestão de Carreira & Marketing');
            allFeatures.push('Posicionamento Profissional');
        }
        if (course.includedCategories.includes('Exclusivo VIP')) {
            allFeatures.push('Mentoria Individual VIP');
            allFeatures.push('Acesso à Inteligência Artificial');
        }
        // Add common stuff
        allFeatures.push('Certificado Reconhecido');
        allFeatures.push('Suporte Pós-Curso Vitalício');

        return allFeatures;
    };

    return (
        <div 
            className={`relative flex flex-col bg-white rounded-lg p-8 h-full transition-all duration-300 ${isHighlighted ? 'shadow-2xl ring-1 ring-[var(--color-primary)]/20 transform md:-translate-y-4' : 'shadow-lg hover:shadow-xl border border-[var(--color-border)]'}`}
        >
            {course.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm">
                    {course.highlight}
                </div>
            )}

            <div className="text-center mb-8 pt-4">
                <h3 className="font-playfair font-bold text-2xl text-[var(--color-text-strong)] mb-2">{course.title}</h3>
                <p className="text-[var(--color-text-subtle)] text-sm h-10">{course.uniqueDescription}</p>
            </div>

            <div className="text-center mb-8">
                <span className="text-4xl font-playfair font-medium text-[var(--color-text-strong)]">{course.price}</span>
                <span className="block text-xs text-[var(--color-text-subtle)] mt-1">ou consulte parcelamento</span>
            </div>

            <div className="flex-1 mb-8">
                <ul className="space-y-3">
                    {featuresToShow().map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-[var(--color-text)]">
                            <CheckIcon className="w-5 h-5 mr-3 text-[var(--color-primary)] flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={() => onCtaClick(course)}
                    className="mt-4 text-xs font-semibold text-[var(--color-text-subtle)] hover:text-[var(--color-primary)] underline w-full text-center"
                >
                    Ver grade curricular completa
                </button>
            </div>

            <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-4 rounded-sm font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${isVip ? 'bg-[var(--color-text-strong)] text-white hover:bg-[var(--color-primary)]' : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-text-strong)]'}`}
            >
                <WhatsAppIcon className="w-4 h-4" />
                {course.cta}
            </a>
        </div>
    );
};

export default CourseCard;