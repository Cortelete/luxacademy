






import React, { forwardRef, useState } from 'react';
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
  const [openPaymentMethod, setOpenPaymentMethod] = useState<string | null>(null);

  const paymentMethods = [
    { 
      name: 'PIX', 
      icon: PixIcon, 
      hook: 'Rápido e fácil', 
      explanation: 'O PIX é o sistema de pagamentos instantâneos do Brasil, funcionando 24/7.',
      curiosity: 'Em seu primeiro ano, mais de 100 milhões de chaves foram cadastradas, mostrando sua rápida adesão.'
    },
    { 
      name: 'Dinheiro', 
      icon: MoneyIcon, 
      hook: 'Controle total', 
      explanation: 'O pagamento em dinheiro físico oferece privacidade e controle imediato de gastos.',
      curiosity: 'A nota de maior valor em circulação no Brasil é a de R$200, com o lobo-guará.'
    },
    { 
      name: 'Cartões', 
      icon: CreditCardIcon, 
      hook: 'Conveniente e seguro', 
      explanation: 'Aceitamos os principais cartões de crédito e débito, proporcionando conveniência e segurança.',
      curiosity: 'O primeiro cartão de crédito, o Diners Club, foi criado em 1950 após um empresário esquecer a carteira.'
    },
    { 
      name: 'Criptomoedas', 
      icon: CryptoIcon, 
      hook: 'Inovador e global', 
      explanation: 'Abraçando a inovação, aceitamos pagamentos com as principais criptomoedas como Bitcoin e Ethereum.',
      curiosity: 'A primeira transação comercial com Bitcoin foi a compra de duas pizzas por 10.000 BTC em 2010.'
    },
  ];
  
  const handlePaymentClick = (name: string) => {
    setOpenPaymentMethod(openPaymentMethod === name ? null : name);
  };
  
  const logoWhatsappMessage = 'Olá! Tenho interesse em adicionar a criação de logotipo ao meu curso.';
  const WHATSAPP_NUMBER = '5542999722042';
  const logoWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(logoWhatsappMessage)}`;

  return (
    <section ref={ref} id="cursos" className="px-6 py-8 md:py-12 fade-in-section">
      <div className="container mx-auto bg-[var(--color-surface)] rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl border border-[var(--color-border)]">
        <div className="text-center mb-12 md:mb-16 relative">
           <div className="absolute -top-12 -left-4 w-24 h-24 z-10 hidden lg:block animate-float opacity-80" style={{animationDelay: '0.5s'}} aria-hidden="true">
             <img src="/mascot.png" alt="Mascote Luxy" className="w-full h-full object-contain" />
           </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[var(--color-primary)] uppercase" style={{textShadow: '0 2px 8px var(--color-primary)/40'}}>NOSSOS CURSOS</h2>
          <p className="text-lg text-[var(--color-text-subtle)] mt-4">Escolha o plano ideal para transformar a sua carreira.</p>
          <p className="text-md font-semibold text-[var(--color-primary)] mt-4 tracking-wider">
              Todos os cursos incluem 2 dias de imersão e kit de material inicial.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {courses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    featureCategories={featureCategories} 
                    onCtaClick={onCtaClick}
                    className={course.id === 3 ? 'md:col-span-2 lg:col-span-1' : ''}
                  />
              ))}
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-[var(--color-border)] flex flex-wrap justify-center gap-8">
            <div className="bg-[var(--color-background)] border-2 border-dashed border-[var(--color-primary)] rounded-xl p-8 w-full max-w-lg text-center transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 text-[var(--color-primary)] opacity-10" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm-1 4v3h-3v2h3v3h2v-3h3v-2h-3V8h-2z"></path></svg>
                </div>
                <div className="relative z-10">
                    <span className="bg-[var(--color-primary)] text-[var(--color-primary-contrast)] px-4 py-1.5 rounded-full text-sm font-bold shadow-md">ADICIONAL EXCLUSIVO</span>
                    <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[var(--color-text-strong)] mt-5">Criação de Logotipo</h3>
                    <p className="text-[var(--color-text)] mt-2 mb-4">Dê uma cara profissional à sua marca com um logotipo exclusivo, criado pela InteligenciArte.IA.</p>
                    <p className="text-4xl font-bold text-[var(--color-primary)] my-4">R$ 150</p>
                    <p className="text-sm text-[var(--color-text-subtle)] mb-6">Pode ser adicionado aos planos Profissional ou Empreendedora.</p>
                    <a 
                        href={logoWhatsappUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full max-w-xs mx-auto block bg-[var(--color-primary)] text-[var(--color-primary-contrast)] font-bold py-3 rounded-full hover:bg-[var(--color-primary)]/80 transition-colors text-lg"
                    >
                        Adicionar ao meu Plano
                    </a>
                </div>
            </div>
            <div className="bg-[var(--color-background)] border-2 border-dashed border-[var(--color-primary)] rounded-xl p-8 w-full max-w-lg text-center transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 text-[var(--color-primary)] opacity-10" aria-hidden="true">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M9.401 3.003c1.155.435 2.261 1.038 3.284 1.83l.252.191.252-.191a11.198 11.198 0 013.284-1.83 1.5 1.5 0 011.64.218c.552.442.828 1.13.722 1.834A12.033 12.033 0 0118 8.25c0 1.258-.203 2.488-.599 3.655a.75.75 0 01-1.353-.618c.356-1.054.552-2.17.552-3.287 0-.58-.06-1.152-.178-1.713a.75.75 0 01.623-.83A9.67 9.67 0 0012 5.25a9.67 9.67 0 00-4.846.965.75.75 0 01.623.83c-.118.56-.178 1.133-.178 1.713 0 1.118.196 2.233.552 3.287a.75.75 0 01-1.353.618A12.034 12.034 0 016 8.25c0-1.14.26-2.24.74-3.25a1.5 1.5 0 01.722-1.834 1.5 1.5 0 011.64-.218zM6.345 13.82a.75.75 0 01-.29-.033 11.16 11.16 0 00-2.61 1.698A1.5 1.5 0 003 16.5c0 .54.225 1.02.599 1.348l.144.115c1.24.992 2.64 1.635 4.142 1.948a.75.75 0 01.27.973A10.51 10.51 0 018.25 21c-1.258 0-2.488-.203-3.655-.599a.75.75 0 01-.618-1.353c1.054-.356 2.17-.552 3.287-.552.58 0 1.152.06 1.713.178a.75.75 0 01.83.623A9.67 9.67 0 0012 21.75a9.67 9.67 0 004.846-.965.75.75 0 01.83-.623c.56.118 1.133.178 1.713.178 1.118 0 2.233-.196 3.287-.552a.75.75 0 01-.618 1.353A12.034 12.034 0 0115.75 21c-.961 0-1.897-.18-2.77-.521a.75.75 0 01.27-.973c1.503-.313 2.903-.956 4.142-1.948l.144-.115A1.5 1.5 0 0018 16.5a1.5 1.5 0 00-.445-1.015 11.16 11.16 0 00-2.61-1.698.75.75 0 11.58-1.16c1.01.63 1.944 1.39 2.767 2.248A.75.75 0 0121 16.5a.75.75 0 01-.223.507l-.144.115c-1.375 1.1-2.94 1.833-4.633 2.184a12.023 12.023 0 01-7.999 0c-1.693-.35-3.258-1.083-4.633-2.184l-.144-.115A.75.75 0 013 16.5a.75.75 0 01.75-.75c.823-.859 1.757-1.618 2.767-2.248a.75.75 0 01.828.582z" clipRule="evenodd"></path></svg>
                </div>
                <div className="relative z-10">
                    <span className="bg-[var(--color-primary)] text-[var(--color-primary-contrast)] px-4 py-1.5 rounded-full text-sm font-bold shadow-md">FLEXIBILIDADE TOTAL</span>
                    <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[var(--color-text-strong)] mt-5">Curso Personalizado</h3>
                    <p className="text-[var(--color-text)] mt-2 mb-4">Já é profissional ou tem necessidades específicas? Monte um plano de estudos exclusivo para você.</p>
                    <p className="text-4xl font-bold text-[var(--color-primary)] my-4">Sob Consulta</p>
                    <p className="text-sm text-[var(--color-text-subtle)] mb-6">Sua jornada, suas regras. Foco total no seu desenvolvimento.</p>
                    <button
                        onClick={onCustomCourseClick}
                        className="w-full max-w-xs mx-auto block bg-[var(--color-primary)] text-[var(--color-primary-contrast)] font-bold py-3 rounded-full hover:bg-[var(--color-primary)]/80 transition-colors text-lg"
                    >
                        Ver Opções
                    </button>
                </div>
            </div>
        </div>

        <div className="text-center mt-16 md:mt-20 pt-12 md:pt-16 border-t border-[var(--color-border)]">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-[var(--color-primary)] uppercase" style={{textShadow: '0 2px 8px var(--color-primary)/40'}}>PAGAMENTO FACILITADO</h3>
            <p className="text-lg text-[var(--color-text-subtle)] mt-4 max-w-2xl mx-auto">Aceitamos diversas formas de pagamento para sua comodidade. Escolha a que melhor se adapta a você.</p>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                {paymentMethods.map((method) => (
                    <div 
                      key={method.name}
                      onClick={() => handlePaymentClick(method.name)}
                      className="relative bg-[var(--color-background)] p-6 rounded-xl border border-[var(--color-border)] cursor-pointer transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-[var(--color-primary)]/10"
                    >
                        <method.icon className="h-12 w-12 mx-auto text-[var(--color-primary)] mb-4" />
                        <h4 className="text-xl font-bold text-[var(--color-text-strong)]">{method.name}</h4>
                        <p className="text-sm text-[var(--color-text-subtle)]">{method.hook}</p>
                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openPaymentMethod === method.name ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                            <p className="text-[var(--color-text)] text-sm">{method.explanation}</p>
                            <p className="text-xs text-amber-300/50 mt-2 italic">Curiosidade: {method.curiosity}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <div className="relative p-0.5 rounded-xl animated-border-gold max-w-3xl mx-auto shadow-lg hover:shadow-[var(--color-primary)]/20 transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] rounded-lg p-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--color-primary)] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 10a2 2 0 00-2 2v.5a.5.5 0 00.5.5H15a.5.5 0 00.5-.5V16a2 2 0 00-2-2H4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-[var(--color-text)] text-base md:text-lg">
                            Oferecemos flexibilidade: pague com uma <span className="text-[var(--color-primary)] font-semibold">entrada e parcele o restante em até 2x no cartão</span> <span className="opacity-70 text-sm">(com acréscimo de juros da operadora).</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
});

export default Courses;
