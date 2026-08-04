'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, ClipboardList, Award, User, LogOut, Bell, RefreshCw } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { AvatarSelectorModal } from './AvatarSelectorModal';

import logotipo from '@/assets/ilustraciones/doodles/user/logotipo.png';
import imagotipoFirma from '@/assets/logos/imagotipo/09_imagotipo_color_primario_transparente.png';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/usuario', label: 'Mis solicitudes', icon: ClipboardList },
  { href: '/usuario/distintivos', label: 'Mis distintivos', icon: Award },
  { href: '/usuario/notificaciones', label: 'Notificaciones', icon: Bell, badge: 1 },
  { href: '/usuario/perfil', label: 'Perfil', icon: User },
];

export const MobileUserHeader = () => {
  const pathname = usePathname();
  const { currentAvatar } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-3 left-4 right-4 z-40">
        <header className="flex items-center justify-between px-3 py-2 bg-[#FFFBF7]/90 backdrop-blur-md border border-[#FDE1C4] rounded-full shadow-sm">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-[#F69222] bg-white rounded-full border border-[#FDE1C4] shadow-sm hover:bg-gray-50 transition-colors shrink-0"
          >
            <Menu size={20} />
          </button>

          <div className="h-6 flex items-center justify-center pointer-events-none mx-2">
            <img 
              src={logotipo.src} 
              alt="Patitas Caminando" 
              className="h-full w-auto object-contain"
            />
          </div>

          <button 
            onClick={() => setIsPreviewModalOpen(true)}
            className="w-10 h-10 rounded-full bg-[#FFE2C2] border border-[#FDE1C4] overflow-hidden shadow-sm flex items-center justify-center shrink-0 relative"
          >
            <img 
              src={currentAvatar.src} 
              alt="Avatar" 
              className="w-full h-full object-cover scale-110"
            />
          </button>
        </header>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-[#153970]/50 backdrop-blur-sm z-50 transition-opacity md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-[#F69222] text-white z-50 transform transition-transform duration-300 flex flex-col md:hidden overflow-hidden ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8 px-4 relative z-10">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-[#FFE2C2] border-4 border-white/20 overflow-hidden shadow-lg flex items-center justify-center">
              <img 
                src={currentAvatar.src} 
                alt="Avatar" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <button 
              onClick={() => setIsAvatarModalOpen(true)}
              className="absolute bottom-0 right-0 bg-white text-[#F69222] p-1.5 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          <h2 className="text-xl font-bold">María Gómez</h2>
          <p className="text-white/80 text-sm">maria.gomez@email.com</p>
        </div>

        <nav className="flex flex-col gap-2 px-4 flex-1 overflow-y-auto relative z-10 pb-20">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsDrawerOpen(false)}
                className={`flex items-center justify-between px-5 py-3.5 rounded-full transition-all duration-300 font-semibold text-[15px] ${
                  isActive 
                    ? 'bg-white/20 text-white shadow-sm' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="bg-white text-[#F69222] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="mt-8 mb-4 border-t border-white/20 pt-4">
            <button className="flex items-center gap-4 px-5 py-3.5 w-full text-left rounded-full transition-all duration-300 font-semibold text-[15px] text-white/80 hover:bg-white/10 hover:text-white">
              <LogOut size={20} strokeWidth={2} />
              Cerrar sesión
            </button>
          </div>
        </nav>

        {/* Isologo Footer (Bottom Left) */}
        <div className="absolute -bottom-12 -left-12 pointer-events-none z-0 w-56 h-56">
          <img 
            src={imagotipoFirma.src}
            alt="Patitas Caminando"
            className="w-full h-full object-contain brightness-0 invert drop-shadow-md opacity-90"
          />
        </div>
      </aside>

      <AvatarSelectorModal 
        isOpen={isAvatarModalOpen} 
        onClose={() => setIsAvatarModalOpen(false)} 
      />

      {/* Avatar Preview Modal */}
      {isPreviewModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsPreviewModalOpen(false)}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 bg-[#FFE2C2] rounded-full border-8 border-white overflow-hidden shadow-2xl">
            <img 
              src={currentAvatar.src} 
              alt="Avatar Preview" 
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <button 
            onClick={() => setIsPreviewModalOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-200 transition-colors bg-white/10 p-2 rounded-full"
          >
            <X size={28} />
          </button>
        </div>
      )}
    </>
  );
};
