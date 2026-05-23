import React from 'react';

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white text-gray-800 h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#B08D55]">Contato</h2>
      
      <div className="text-center mb-8 px-4">
        <p className="text-lg mb-2 text-gray-700">Luxury Studio de Beleza</p>
        <p className="text-md text-gray-600 mb-1">Av. General Carlos Cavalcanti, 3380</p>
        <p className="text-md text-gray-600">Uvaranas, Ponta Grossa - PR, 84025-000</p>
      </div>

      <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg border border-gray-100">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.272113885402!2d-50.12125982462153!3d-25.09264847777839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81baff801d6bd%3A0x9c076e4f944bd27!2sLuxury%20Studio%20de%20Beleza!5e0!3m2!1spt-BR!2sbr!4v1779563882443!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="450" 
          style={{ border: 0 }}
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location"
        ></iframe>
      </div>
    </div>
  );
}
