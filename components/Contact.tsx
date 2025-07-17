



import React, { forwardRef } from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import InstagramIcon from './icons/InstagramIcon';
import MapPinIcon from './icons/MapPinIcon';
import PhoneIcon from './icons/PhoneIcon';

const Contact = forwardRef<HTMLElement>((props, ref) => {
    const WHATSAPP_NUMBER = '5542999722042';
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá, gostaria de saber mais sobre os cursos da Luxury!')}`;
    const instagramUrl = "https://www.instagram.com/luxury.joycialmeida/";
    const address = "R. Teixeira Mendes, 700 - Uvaranas, Ponta Grossa - PR, 84031-000, Brasil";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const phone = '(42) 999.722.042';
    const telLink = `tel:+5542999722042`;

    return (
        <section ref={ref} id="contact" className="py-20 md:py-32 bg-[var(--color-background)]/85 relative overflow-hidden fade-in-section">
            <div className="container mx-auto px-6 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-playfair font-bold text-[var(--color-primary)] uppercase" style={{textShadow: '0 2px 8px var(--color-primary)/40'}}>Entre em Contato</h2>
                    <p className="mt-4 text-xl text-[var(--color-text)] max-w-3xl mx-auto">
                        Sua jornada para o sucesso começa com uma conversa. Estamos aqui para responder a todas as suas perguntas.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* WhatsApp Card */}
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group block bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] p-8 rounded-2xl border border-[var(--color-border)] shadow-lg hover:shadow-2xl hover:shadow-[#25D366]/20 hover:border-[#25D366]/50 transform hover:-translate-y-2 transition-all duration-300">
                        <div className="flex items-center gap-6">
                            <div className="bg-[#25D366] p-4 rounded-full">
                                <WhatsAppIcon className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[var(--color-text-strong)] group-hover:text-[#25D366] transition-colors">WhatsApp Direto</h3>
                                <p className="text-[var(--color-text-subtle)]">Clique para iniciar uma conversa.</p>
                            </div>
                        </div>
                    </a>
                    
                    {/* Instagram Card */}
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="group block bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] p-8 rounded-2xl border border-[var(--color-border)] shadow-lg hover:shadow-2xl hover:shadow-[#E1306C]/20 hover:border-[#E1306C]/50 transform hover:-translate-y-2 transition-all duration-300">
                        <div className="flex items-center gap-6">
                            <div className="bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-4 rounded-full">
                                <InstagramIcon className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[var(--color-text-strong)] group-hover:text-[#fcb045] transition-colors">Nosso Instagram</h3>
                                <p className="text-[var(--color-text-subtle)]">Veja nossos trabalhos e novidades.</p>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="mt-20 pt-16 border-t border-[var(--color-border)] max-w-2xl mx-auto text-center">
                    <h4 className="font-semibold text-2xl text-[var(--color-text)] mb-6">Ou venha nos conhecer pessoalmente</h4>
                    <a 
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[var(--color-primary)]/10"
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                            <MapPinIcon className="w-12 h-12 text-[var(--color-primary)] flex-shrink-0" />
                            <div>
                                <p className="text-lg text-[var(--color-text-strong)] font-semibold">R. Teixeira Mendes, 700 - Uvaranas</p>
                                <p className="text-[var(--color-text-subtle)]">Ponta Grossa - PR, 84031-000, Brasil</p>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <span className="inline-block text-[var(--color-primary)] font-semibold group-hover:underline">
                                Ver no Google Maps &rarr;
                            </span>
                        </div>
                    </a>
                     <a href={telLink} className="group mt-6 inline-flex items-center justify-center gap-3 max-w-full mx-auto px-6 py-3 bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-border)] rounded-full shadow-lg transform hover:-translate-y-1 hover:border-[var(--color-primary)]/50 transition-all duration-300 ease-in-out">
                        <PhoneIcon className="w-5 h-5" />
                        <span className="font-semibold text-base md:text-lg">Ligar Agora: {phone}</span>
                    </a>
                </div>
            </div>
        </section>
    );
});

export default Contact;