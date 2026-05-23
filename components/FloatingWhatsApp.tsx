
import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';

const FloatingWhatsApp = () => {
    const WHATSAPP_NUMBER = '5542999722042';
    const message = encodeURIComponent('Olá, gostaria de saber mais sobre os cursos da Luxury!');
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-40 transform hover:scale-110 transition-transform duration-300"
            aria-label="Fale conosco pelo WhatsApp"
        >
            <WhatsAppIcon className="w-8 h-8" />
        </a>
    );
};

export default FloatingWhatsApp;