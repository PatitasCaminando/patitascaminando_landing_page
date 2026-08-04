'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, Award, User, LogOut, RefreshCw, Bell } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { AvatarSelectorModal } from './AvatarSelectorModal';

import doodleFooter from '@/assets/ilustraciones/doodles/user/doodle_esquinero_inferior_derecho.png';
import isologoFirma from '@/assets/logos/isologo/02_isologo_color_primario_transparente.png';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/usuario', label: 'Mis solicitudes', icon: ClipboardList },
  { href: '/usuario/distintivos', label: 'Mis distintivos', icon: Award },
  { href: '/usuario/notificaciones', label: 'Notificaciones', icon: Bell, badge: 1 },
  { href: '/usuario/perfil', label: 'Perfil', icon: User },
];

export const UserSidebar = () => {
  const pathname = usePathname();
  const { currentAvatar } = useUser();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  return (
    <aside className="hidden md:flex w-72 bg-[#F69222] min-h-screen flex-col relative overflow-hidden shrink-0 text-white shadow-xl">
      {/* Centered Content Wrapper */}
      <div className="flex-1 flex flex-col justify-center relative z-10 pb-20">
        {/* User Info */}
        <div className="flex flex-col items-center mb-10 px-4">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full bg-[#FFE2C2] border-4 border-white/20 overflow-hidden shadow-lg relative flex items-center justify-center">
              <img 
                src={currentAvatar.src} 
                alt="Avatar" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <button 
              onClick={() => setIsAvatarModalOpen(true)}
              className="absolute bottom-0 right-0 bg-white text-[#F69222] p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-1">María Gómez</h2>
          <p className="text-white/80 text-sm font-medium">maria.gomez@ejemplo.com</p>
        </div>

        {/* Navigation */}
        <nav className="px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-300 font-semibold text-[15px] ${
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

          <button className="flex items-center gap-4 px-6 py-3.5 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 mt-6 font-semibold text-[15px] w-full text-left">
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </nav>
      </div>

      {/* Bottom Doodles (Z-index 0 to stay behind everything but nav text) */}
      <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none z-0">
        <img 
          src={doodleFooter.src}
          alt="Mascotas"
          className="w-full h-full object-contain object-bottom-right opacity-90 translate-x-4 translate-y-4"
        />
      </div>

      {/* Isologo Footer (Bottom Left) */}
      <div className="absolute -bottom-4 -left-6 z-20 pointer-events-none w-36 h-36">
        <img 
          src={isologoFirma.src} 
          alt="Firma" 
          className="w-full h-full object-contain drop-shadow-md brightness-0 invert"
        />
      </div>

      {/* Modal de Selección de Avatar */}
      <AvatarSelectorModal 
        isOpen={isAvatarModalOpen} 
        onClose={() => setIsAvatarModalOpen(false)} 
      />
    </aside>
  );
};
