import React, { forwardRef } from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';
import PixIcon from './icons/PixIcon';
import MoneyIcon from './icons/MoneyIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import CryptoIcon from './icons/CryptoIcon';


interface CoursesProps {
  courses: Course[];
  featureCategories: Record<string, string[]>;
  onCtaClick: (course: Course) => void;
  onCustomCourseClick: () => void;
}

const Courses = forwardRef<HTMLElement, CoursesProps>(({ courses, featureCategories, onCtaClick, onCustomCourseClick }, ref) => {
  
  const paymentMethods = [
    { name: 'PIX', icon: PixIcon },
    { name: 'Cartão de Crédito', icon: CreditCardIcon },
    { name: 'Dinheiro', icon: MoneyIcon },
    { name: 'Criptomoedas', icon: CryptoIcon },
  ];
  
  return (
    <section ref={ref} id="cursos" className="px-6 py-20 bg-[var(--color-surface)] fade-in-section">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--color-primary)] font-bold tracking-widest text-sm uppercase mb-3 block">Nossos Treinamentos</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-medium text-[var(--color-text-strong)]">
            Escolha Sua Jornada
          </h2>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {courses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  featureCategories={featureCategories} 
                  onCtaClick={onCtaClick}
                />
            ))}
        </div>

        {/* Additional Info / Custom & Payment */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-[var(--color-border)] pt-16">
            
            {/* Custom Course CTA */}
            <div className="text-center lg:text-left">
                <h3 className="text-2xl font-playfair font-bold text-[var(--color-text-strong)] mb-4">
                    Precisa de algo exclusivo?
                </h3>
                <p className="text-[var(--color-text)] mb-6 font-light leading-relaxed">
                    Se você já é profissional e busca aperfeiçoamento específico, ou quer focar apenas em gestão, montamos um plano sob medida para você.
                </p>
                <button
                    onClick={onCustomCourseClick}
                    className="inline-block border-b-2 border-[var(--color-primary)] text-[var(--color-text-strong)] pb-1 hover:text-[var(--color-primary)] transition-colors"
                >
                    Solicitar Orçamento Personalizado &rarr;
                </button>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center lg:items-end">
                 <p className="text-sm text-[var(--color-text-subtle)] mb-6 uppercase tracking-widest">Formas de Pagamento Aceitas</p>
                 <div className="flex gap-6 justify-center">
                    {paymentMethods.map((method) => (
                        <div key={method.name} className="flex flex-col items-center gap-2 group" title={method.name}>
                            <div className="p-3 bg-[var(--color-background)] rounded-full text-[var(--color-text-subtle)] group-hover:text-[var(--color-primary)] transition-colors">
                                <method.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                 </div>
                 <p className="text-xs text-[var(--color-text-subtle)] mt-4 text-center lg:text-right">
                     Parcelamento disponível. Consulte condições.
                 </p>
            </div>
        </div>

      </div>
    </section>
  );
});

export default Courses;