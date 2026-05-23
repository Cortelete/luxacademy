





import React, { forwardRef } from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import InstagramIcon from './icons/InstagramIcon';
import MapPinIcon from './icons/MapPinIcon';
import PhoneIcon from './icons/PhoneIcon';

const Contact = forwardRef<HTMLElement>((props, ref) => {
    const WHATSAPP_NUMBER = '5542999722042';
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá, gostaria de saber mais sobre os cursos da Luxury!')}`;
    const instagramUrl = "https://www.instagram.com/luxury.joycialmeida/";
    const address = "Av. General Carlos Cavalcanti, 3380 - Uvaranas, Ponta Grossa - PR, 84025-000";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const phone = '(42) 999.722.042';
    const telLink = `tel:+5542999722042`;

    return (
        <section ref={ref} id="contact" className="px-6 py-8 md:py-12 fade-in-section">
            <div className="container mx-auto bg-[var(--color-surface)] rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl border border-[var(--color-border)] z-10 relative overflow-hidden">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-[var(--color-primary)] uppercase" style={{textShadow: '0 2px 8px var(--color-primary)/40'}}>Entre em Contato</h2>
                    <p className="mt-4 text-lg md:text-xl text-[var(--color-text)] max-w-3xl mx-auto">
                        Sua jornada para o sucesso começa com uma conversa. Estamos aqui para responder a todas as suas perguntas.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* WhatsApp Card */}
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group block bg-gradient-to-br from-white/5 to-transparent p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] shadow-lg hover:shadow-2xl hover:shadow-[#25D366]/20 hover:border-[#25D366]/50 transform hover:-translate-y-2 transition-all duration-300">
                        <div className="flex items-center gap-6">
                            <div className="bg-[#25D366] p-4 rounded-full">
                                <WhatsAppIcon className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-strong)] group-hover:text-[#25D366] transition-colors">WhatsApp Direto</h3>
                                <p className="text-[var(--color-text-subtle)]">Clique para iniciar uma conversa.</p>
                            </div>
                        </div>
                    </a>
                    
                    {/* Instagram Card */}
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="group block bg-gradient-to-br from-white/5 to-transparent p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] shadow-lg hover:shadow-2xl hover:shadow-[#E1306C]/20 hover:border-[#E1306C]/50 transform hover:-translate-y-2 transition-all duration-300">
                        <div className="flex items-center gap-6">
                            <div className="bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-4 rounded-full">
                                <InstagramIcon className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-strong)] group-hover:text-[#fcb045] transition-colors">Nosso Instagram</h3>
                                <p className="text-[var(--color-text-subtle)]">Veja nossos trabalhos e novidades.</p>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-[var(--color-border)] max-w-2xl mx-auto text-center">
                    <h4 className="font-semibold text-xl md:text-2xl text-[var(--color-text)] mb-6">Ou venha nos conhecer pessoalmente</h4>
                    <a 
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-[var(--color-background)] p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[var(--color-primary)]/10 mb-8 max-w-lg mx-auto"
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                            <MapPinIcon className="w-12 h-12 text-[var(--color-primary)] flex-shrink-0" />
                            <div>
                                <p className="text-lg text-[var(--color-text-strong)] font-semibold">Av. General Carlos Cavalcanti, 3380 - Uvaranas</p>
                                <p className="text-[var(--color-text-subtle)]">Ponta Grossa - PR, 84025-000</p>
                            </div>
                        </div>
                    </a>

                    <div className="w-full h-80 rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-lg relative z-0 mb-8 mx-auto" style={{ maxWidth: '800px' }}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.272113885402!2d-50.12125982462153!3d-25.09264847777839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81baff801d6bd%3A0x9c076e4f944bd27!2sLuxury%20Studio%20de%20Beleza!5e0!3m2!1spt-BR!2sbr!4v1779563882443!5m2!1spt-BR!2sbr" 
                            className="w-full h-full" 
                            style={{ border: 0 }} 
                            allowFullScreen={false} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização do Luxury Studio de Beleza">
                        </iframe>
                    </div>

                     <a href={telLink} className="group mt-2 inline-flex items-center justify-center gap-3 max-w-full mx-auto px-6 py-3 bg-[var(--color-background)] text-[var(--color-primary)] border border-[var(--color-border)] rounded-full shadow-lg transform hover:-translate-y-1 hover:border-[var(--color-primary)]/50 transition-all duration-300 ease-in-out">
                        <PhoneIcon className="w-5 h-5" />
                        <span className="font-semibold text-base md:text-lg">Ligar Agora: {phone}</span>
                    </a>
                </div>
            </div>
        </section>
    );
});

export default Contact;