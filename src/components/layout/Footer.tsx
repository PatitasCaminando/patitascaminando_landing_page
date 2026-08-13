import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import logoImagotipo from '@/assets/logos/imagotipo/09_imagotipo_color_primario_transparente.png';

export const Footer = () => {
  return (
    <div className="bg-white">
      <footer className="bg-[#F69222] text-white py-14 rounded-t-[40px] md:rounded-t-[56px] relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 flex flex-col items-start text-left">
            <div className="flex justify-start w-full mb-5">
              <img 
                src={logoImagotipo.src} 
                alt="Patitas Caminando imagotipo" 
                className="h-32 md:h-40 lg:h-48 object-contain -ml-2" 
              />
            </div>
            <p className="text-[#FFE2C2] max-w-sm mb-6 text-lg leading-relaxed">
              Cambiamos destinos con amor, comunidad y compromiso por el bienestar animal.
            </p>
            <div className="flex gap-4 justify-start w-full">
              <a href="https://www.facebook.com/p/Patitas-Caminando-100090071507005/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-[#D67C14] rounded-full flex items-center justify-center hover:bg-white hover:text-[#F69222] transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="https://www.instagram.com/patitascaminando5" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-[#D67C14] rounded-full flex items-center justify-center hover:bg-white hover:text-[#F69222] transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@patitascaminando5" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 bg-[#D67C14] rounded-full flex items-center justify-center hover:bg-white hover:text-[#F69222] transition-colors">
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6">Enlaces rápidos</h4>
            <ul className="space-y-4 text-[#FFE2C2]">
              <li><Link href="/#inicio" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/#sobre" className="hover:text-white transition-colors">Sobre Patitas</Link></li>
              <li><Link href="/#adopciones" className="hover:text-white transition-colors">Adopciones</Link></li>
              <li><Link href="/#donaciones" className="hover:text-white transition-colors">Donaciones</Link></li>
              <li><Link href="/#contacto" className="hover:text-white transition-colors">Reportar un caso</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
              <li><Link href="/#contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6">Contáctanos</h4>
            <ul className="space-y-5 text-[#FFE2C2]">
              <li className="flex items-start gap-3">
                <Phone size={20} className="shrink-0 mt-0.5" />
                <span><a href="https://api.whatsapp.com/send/?phone=593987727566&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">098 772 7566</a></span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="shrink-0 mt-0.5" />
                <span className="min-w-0 break-words w-full"><a href="mailto:patitascaminando33@gmail.com" className="hover:text-white transition-colors break-all md:break-words">patitascaminando33@gmail.com</a></span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={24} className="shrink-0 mt-0.5" />
                <span>Sur de Quito</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#D67C14] pt-8 flex flex-col md:flex-row justify-between items-center text-[#FFE2C2] text-sm">
          <p>© 2026 Patitas Caminando.</p>
          <p className="mt-2 md:mt-0">Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
    </div>
  );
};
