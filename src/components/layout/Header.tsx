'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';
import { PawPrint, HandCoins } from 'lucide-react';
import Image from 'next/image';
import logoImg from '@/assets/logos/isologo/01_isologo_color_primario_transparente.png';
import logotipoImg from '@/assets/ilustraciones/doodles/user/logotipo.png';
import doodleHuesitos from '@/assets/ilustraciones/doodles/doodle_huesitos.png';
import { DonationModal } from '../organisms/DonationModal';
import { DonationSuccessModal } from '../organisms/DonationSuccessModal';
import { DonationErrorModal } from '../organisms/DonationErrorModal';
import { DonationsService } from '@/core/services/donations.service';
import { HttpError } from '@/core/api/http-client';

export const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [activeSection, setActiveSection] = useState('inicio');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal de Donación State
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isDonationSuccessModalOpen, setIsDonationSuccessModalOpen] = useState(false);
  const [isDonationErrorModalOpen, setIsDonationErrorModalOpen] = useState(false);
  const [donationLoading, setDonationLoading] = useState(false);
  const [donationError, setDonationError] = useState<string | null>(null);
  const [donationFormKey, setDonationFormKey] = useState(0);

  const handleDonationSubmit = async (data: any) => {
    setDonationLoading(true);
    setDonationError(null);
    try {
      console.log('Donation request real payload:', data);
      await DonationsService.submitOffer(data);
      
      // Success path
      setIsDonationModalOpen(false);
      setIsDonationSuccessModalOpen(true);
      setDonationFormKey(prev => prev + 1); // Resets form
    } catch (err: any) {
      console.error('Error submitting donation:', err);
      
      if (err instanceof HttpError && err.statusCode === 400) {
        // Error de validación del backend: mantenemos el modal abierto
        const backendMessage = typeof err.data?.message === 'string' 
          ? err.data.message 
          : Array.isArray(err.data?.message) 
            ? err.data.message.join(', ') 
            : 'Error de validación del servidor.';
        setDonationError(backendMessage);
      } else {
        // Error 500 o de red: cerramos modal y mostramos error modal
        setIsDonationModalOpen(false);
        setIsDonationErrorModalOpen(true);
      }
    } finally {
      setDonationLoading(false);
    }
  };

  const handleCloseDonationModal = () => {
    setIsDonationModalOpen(false);
    setTimeout(() => {
      setDonationError(null);
    }, 300);
  };

  const navItems = [
    {
      id: 'inicio',
      label: 'Inicio',
      href: '#inicio',
      sectionIds: ['inicio', 'sobre', 'labor'],
    },
    {
      id: 'adopciones',
      label: 'Adopciones',
      href: '#adopciones',
      sectionIds: ['adopciones'],
    },
    {
      id: 'donaciones',
      label: 'Donaciones',
      href: '#donaciones',
      sectionIds: ['donaciones', 'participa', 'comunidad'],
    },
    {
      id: 'contacto',
      label: 'Contacto',
      href: '#contacto',
      sectionIds: ['contacto', 'faq'],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 300; // offset para activar un poco antes de llegar al top
      let currentActiveId = 'inicio';

      if (isHomePage) {
        for (const item of navItems) {
          for (const sectionId of item.sectionIds) {
            const element = document.getElementById(sectionId);
            if (element && scrollPosition >= element.offsetTop) {
              currentActiveId = item.id;
            }
          }
        }
      }
      setActiveSection(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    // Ejecutar una vez al montar para setear el estado inicial
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-white/95 backdrop-blur-md shadow-patitas rounded-full px-6 py-3 flex items-center justify-between w-full max-w-6xl border border-[#F1D9BD]/50 relative">
        {/* Left Container */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-[#F1D9BD] shrink-0 shadow-sm relative z-10">
            <Image
              src={logoImg}
              alt="Logo Patitas Caminando"
              className="w-full h-full object-cover"
              width={40}
              height={40}
            />
          </div>
          
          {/* Desktop Text */}
          <span className="font-extrabold text-[#153970] text-xl hidden sm:flex items-center relative z-10">
            Patitas
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out ${
                isScrolled ? 'max-w-[200px] opacity-100 ml-1.5' : 'max-w-0 opacity-0 ml-0'
              }`}
            >
              Caminando
            </span>
          </span>
        </div>

        {/* Mobile Text (Absolutely Centered) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none sm:hidden z-0">
          <img 
            src={logotipoImg.src} 
            alt="Patitas Caminando" 
            className={`w-auto pointer-events-auto transition-all duration-300 ease-in-out ${
              isScrolled ? 'h-6' : 'h-8'
            }`} 
          />
        </div>

        <nav className="hidden md:flex items-center gap-8 font-medium relative z-10">
          {navItems.map((link) => (
            <Link
              key={link.id}
              href={isHomePage ? link.href : `/${link.href}`}
              className={`transition-colors ${(isHomePage && activeSection === link.id) ? 'text-[#F69222] font-bold' : 'text-[#5F6B70] hover:text-[#F69222]'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-4 relative z-10">
          <div className="hidden md:block">
            <Button 
              variant="primary" 
              size="sm" 
              className="px-6 flex items-center gap-2"
              onClick={() => setIsDonationModalOpen(true)}
            >
              <HandCoins size={18} />
              <span>Donar</span>
            </Button>
          </div>
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2.5 bg-[#FFF7EA] border border-[#F1D9BD] hover:bg-[#FFE2C2] rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center ${isMobileMenuOpen ? 'text-[#F69222]' : 'text-[#153970]'}`}
            aria-label="Abrir menú"
          >
            <PawPrint 
              size={22} 
              className={`transition-all duration-300 ease-out ${isMobileMenuOpen ? '-translate-x-1 scale-110 -rotate-12' : 'translate-x-0 scale-100 rotate-0'}`} 
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`absolute top-[80px] left-4 right-4 bg-white/95 backdrop-blur-md shadow-patitas rounded-3xl p-5 pb-5 border border-[#F1D9BD]/50 md:hidden flex flex-col z-40 overflow-hidden transition-all duration-300 ease-out origin-top ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {/* Menu background doodle */}
        <img 
          src={doodleHuesitos.src}
          alt=""
          aria-hidden="true"
          className="absolute -bottom-4 -right-4 w-32 opacity-30 pointer-events-none select-none z-0 -rotate-12"
        />
        
        <div className="relative z-10 flex flex-col">
          {navItems.map((link, index) => {
            if (link.id === 'donaciones') {
              return (
                <div key={link.id} className={`py-3 px-2 flex justify-center ${index !== navItems.length - 1 ? 'border-b border-[#F1D9BD]/50' : ''}`}>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full flex items-center justify-center gap-2 py-3 text-[17px]"
                    onClick={() => {
                      setIsDonationModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <HandCoins size={20} />
                    <span>Donar</span>
                  </Button>
                </div>
              );
            }
            return (
              <Link
                key={link.id}
                href={isHomePage ? link.href : `/${link.href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[17px] text-center py-2.5 transition-colors ${
                  index !== navItems.length - 1 ? 'border-b border-[#F1D9BD]/50' : ''
                } ${(isHomePage && activeSection === link.id) ? 'text-[#F69222] font-bold' : 'text-[#5F6B70] hover:text-[#F69222]'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>

      <DonationModal 
        key={donationFormKey}
        isOpen={isDonationModalOpen}
        onClose={handleCloseDonationModal}
        onSubmit={handleDonationSubmit}
        loading={donationLoading}
        error={donationError}
      />
      <DonationSuccessModal
        isOpen={isDonationSuccessModalOpen}
        onClose={() => setIsDonationSuccessModalOpen(false)}
      />
      <DonationErrorModal
        isOpen={isDonationErrorModalOpen}
        onRetry={() => {
          setIsDonationErrorModalOpen(false);
          setIsDonationModalOpen(true);
        }}
        onClose={() => setIsDonationErrorModalOpen(false)}
      />
    </>
  );
};
