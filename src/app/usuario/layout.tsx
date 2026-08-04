import React from 'react';
import { UserProvider } from '@/context/UserContext';
import { UserSidebar } from '@/components/organisms/UserSidebar';
import { MobileUserHeader } from '@/components/organisms/MobileUserHeader';
import doodleDerecho from '@/assets/ilustraciones/doodles/user/doodle_borde_derecho_inferior.png';
import doodleIzquierdo from '@/assets/ilustraciones/doodles/user/doodle_borde_izquierdo_superior.png';

export const metadata = {
  title: 'Mi Perfil | Patitas Caminando',
  description: 'Panel central de usuario de Patitas Caminando',
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#F9F9F9] font-sans overflow-hidden relative">
        <MobileUserHeader />
        <UserSidebar />
        <main className="flex-1 overflow-y-auto w-full relative flex flex-col z-10">
          {/* Global Top-Left Doodle */}
          <div className="absolute top-0 left-0 z-0 pointer-events-none w-48 md:w-64 opacity-20 md:opacity-90 mix-blend-multiply">
            <img 
              src={doodleIzquierdo.src} 
              alt="Decoración Superior" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Global Bottom-Right Doodle */}
          <div className="absolute bottom-0 right-0 z-0 pointer-events-none w-64 md:w-80 opacity-20 md:opacity-90 mix-blend-multiply">
            <img 
              src={doodleDerecho.src} 
              alt="Decoración Inferior" 
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="max-w-6xl mx-auto w-full p-4 pt-20 md:p-12 pb-24 flex-1 flex flex-col justify-center relative z-10">
            {children}
          </div>
        </main>
      </div>
    </UserProvider>
  );
}
