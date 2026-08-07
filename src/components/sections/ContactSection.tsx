import React from 'react';
import { Phone, Mail, MapPin, Smartphone } from 'lucide-react';
import doodlePerritoCampanas from '@/assets/ilustraciones/doodles/doodle_perrito_campanas.png';

export const ContactSection = () => {
  return (
    <section id="contacto" className="pt-16 pb-24 px-4 bg-[#F69222] relative overflow-hidden">
      <img
        src={doodlePerritoCampanas.src}
        alt=""
        aria-hidden="true"
        className="absolute top-[0px] lg:top-[20px] right-[-10px] lg:right-[-20px] w-[220px] md:w-[280px] lg:w-[360px] xl:w-[400px] opacity-90 pointer-events-none select-none z-0 hidden md:block"
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Estamos para escucharte
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            ¿Tienes dudas, quieres ayudar o encontraste un caso de emergencia? Contáctanos por nuestros canales oficiales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="bg-[#FFF7EA] p-8 md:p-12 rounded-[40px] border border-[#F1D9BD] shadow-patitas">
            <h3 className="text-2xl font-bold text-[#153970] mb-8">Información de Contacto</h3>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white text-[#F69222] rounded-full flex items-center justify-center shrink-0 shadow-sm border border-[#F1D9BD]">
                  <Phone size={24} />
                </div>
                <div className="pt-1">
                  <p className="font-bold text-[#153970]">Teléfono / WhatsApp</p>
                  <p className="text-[#5F6B70] text-lg">098 772 7566</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white text-[#F69222] rounded-full flex items-center justify-center shrink-0 shadow-sm border border-[#F1D9BD]">
                  <Mail size={24} />
                </div>
                <div className="pt-1">
                  <p className="font-bold text-[#153970]">Correo Electrónico</p>
                  <p className="text-[#5F6B70] text-[17px] md:text-lg break-words pr-2">
                    patitascaminando33<wbr/>@gmail.com
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white text-[#F69222] rounded-full flex items-center justify-center shrink-0 shadow-sm border border-[#F1D9BD]">
                  <MapPin size={24} />
                </div>
                <div className="pt-1">
                  <p className="font-bold text-[#153970]">Ubicación</p>
                  <p className="text-[#5F6B70] text-lg">
                    Sur de Quito
                  </p>
                </div>
              </li>
            </ul>

            <a 
              href="https://api.whatsapp.com/send/?phone=593987727566&text&type=phone_number&app_absent=0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-10 w-full bg-[#6FCF7D] hover:bg-[#5bb768] text-white font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-3 text-lg shadow-patitas-sm"
            >
              <Smartphone size={24} />
              Escribir por WhatsApp
            </a>
          </div>

          <div className="bg-[#F7E5CF] rounded-[40px] w-full h-[400px] lg:h-auto relative overflow-hidden shadow-patitas border border-[#F1D9BD]">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=-0.20562,-78.5088+(Patitas%20Caminando)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
