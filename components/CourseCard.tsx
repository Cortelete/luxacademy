


import React, { useState } from 'react';
import { Course } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';
import FireworksCanvas from './FireworksCanvas';

interface CourseCardProps {
    course: Course;
    featureCategories: Record<string, string[]>;
    onCtaClick: (course: Course) => void;
    className?: string;
}

const CourseCard = ({ course, featureCategories, onCtaClick, className }: CourseCardProps) => {
    const isProfessional = course.id === 1;
    const isEmpreendedora = course.id === 2;
    const isVip = course.id === 3;

    const [isVipButtonHovered, setIsVipButtonHovered] = useState(false);

    const WHATSAPP_NUMBER = '5542999722042';
    const expertWhatsappMessage = `Olá! Gostaria de falar com a Joy sobre os cursos.`;
    const whatsappContactUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(expertWhatsappMessage)}`;
    
    const highlightTagColor = isProfessional ? 'bg-[var(--color-rose)]' : isVip ? 'bg-[var(--color-diamond)]' : 'bg-[var(--color-primary)]';
    const highlightTagTextColor = 'text-[var(--color-primary-contrast)]';
    const priceColor = isProfessional ? 'text-[var(--color-rose)]' : isVip ? 'text-[var(--color-diamond)]' : 'text-[var(--color-primary)]';
    const motivationalPhraseColor = isProfessional ? 'text-[var(--color-rose)]' : isVip ? 'text-[var(--color-diamond)]' : 'text-[var(--color-primary)]';
    
    const handleCtaClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCtaClick(course);
    };

    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const cardContent = (
      <>
        {course.highlight && (
            <div className={`absolute -top-4 inset-x-0 flex justify-center z-20`}>
                <div className={`${highlightTagColor} ${highlightTagTextColor} px-3 md:px-4 py-1 rounded-full text-sm md:text-base font-bold shadow-md flex items-center justify-center`}>
                    {course.highlight}
                </div>
            </div>
        )}

        <div className="flex-grow flex flex-col overflow-hidden">
             {/* Non-scrolling part */}
             <div className="text-center px-1">
                <h3 className="font-montserrat font-bold text-lg sm:text-xl md:text-3xl tracking-wide text-[var(--color-text-strong)] mb-1 md:mb-2">{course.title}</h3>
                <p className={`font-playfair italic text-sm md:text-base mb-2 md:mb-4 ${motivationalPhraseColor}`}>"{course.motivationalPhrase}"</p>
                <p className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 ${priceColor}`}>{course.price}</p>
             </div>
             
             {/* Scrolling part */}
             <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                 <p className="text-[var(--color-text-subtle)] text-sm md:text-base mb-4 md:mb-6 hidden lg:block">{course.uniqueDescription}</p>
                 
                 {/* Full feature list for medium screens and up */}
                <div className="space-y-4 mb-4 hidden md:block">
                    {Object.entries(featureCategories).map(([category, features]) => {
                        const isFullCategoryIncluded = course.includedCategories.includes(category);
                        
                        return (
                            <div key={category}>
                                <h5 className="font-bold text-lg mb-2 text-[var(--color-primary)] text-left">+ {category}</h5>
                                <ul className="space-y-1.5 text-base text-left">
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

                {/* Summarized list for small screens */}
                <div className="space-y-2 text-left md:hidden mb-4">
                    {Object.keys(featureCategories).map((category) => {
                        const isIncluded = course.includedCategories.includes(category);
                        const shortName = {
                            'Plano Profissional': 'Técnica e Prática',
                            'Plano Empreendedora': 'Gestão e Marketing',
                            'Plano Empresária VIP': 'VIP com I.A.',
                            'Bônus & Suporte': 'Bônus e Suporte'
                        }[category] || category;

                        return (
                            <div key={category} className={`flex items-center gap-2 text-sm ${isIncluded ? 'text-[var(--color-text)]' : 'text-[var(--color-text-subtle)]'}`}>
                                {isIncluded 
                                    ? <CheckIcon className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" /> 
                                    : <XIcon className="w-4 h-4 text-[var(--color-danger)] flex-shrink-0" />
                                }
                                <span className={`${!isIncluded && 'line-through'}`}>{shortName}</span>
                            </div>
                        )
                    })}
                </div>
                 
                 {/* Click hint for mobile */}
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-primary)] opacity-70 mt-4 md:hidden group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span>Clique para mais detalhes</span>
                </div>
             </div>
        </div>

        <div className="pt-4 md:pt-6">
            <div className="space-y-3 flex flex-col">
                 <div className="relative">
                    <button 
                        onClick={handleCtaClick}
                        onMouseEnter={() => isVip && setIsVipButtonHovered(true)}
                        onMouseLeave={() => isVip && setIsVipButtonHovered(false)}
                        className="w-full bg-[var(--color-primary)] text-[var(--color-primary-contrast)] font-bold py-2.5 md:py-3 rounded-full hover:bg-[var(--color-primary)]/80 transition-colors text-sm md:text-base z-10 relative"
                    >
                        {course.cta}
                    </button>
                    {isVip && <FireworksCanvas isHovering={isVipButtonHovered} />}
                 </div>
                <a 
                    href={whatsappContactUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="w-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold py-2 md:py-2.5 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-contrast)] transition-colors text-center text-sm md:text-base"
                >
                    Falar com a Joy
                </a>
            </div>
        </div>
      </>
    );

    if (isVip) {
      return (
        <div 
            onClick={() => onCtaClick(course)}
            className={`group relative rounded-xl p-0.5 animated-border-diamond h-full shadow-2xl transition-transform duration-300 ease-in-out hover:scale-[1.03] hover-brilliant cursor-pointer ${className || ''}`}>
            <div className="relative flex flex-col bg-[var(--color-background)] rounded-lg p-4 md:p-8 h-full">
              {cardContent}
            </div>
        </div>
      )
    }

    const hoverGlowClass = isProfessional ? 'hover-rose-glow' : 'hover-gold-glow';
    const borderColorClass = isProfessional ? 'border-[var(--color-rose)]' : 'border-[var(--color-primary)]';
    
    return (
        <div 
            onClick={() => onCtaClick(course)}
            className={`group relative flex flex-col bg-[var(--color-background)] rounded-xl shadow-lg p-4 md:p-8 border-2 h-full transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer ${borderColorClass} ${hoverGlowClass} ${className || ''}`}>
            {cardContent}
        </div>
    );
};

export default CourseCard;