'use client';

import React from 'react';
import { Info, User } from 'lucide-react';

export default function MiPerfilPage() {
  return (
    <div className="w-full flex flex-col max-w-5xl">
      {/* Header Area */}
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[#153970] mb-3">Mi perfil</h1>
        <p className="text-[#5F6B70] leading-relaxed">
          Mantén actualizada tu información para que Patitas Caminando pueda contactarte y dar seguimiento a tus procesos de adopción o reportes.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#FFF4E8] border border-[#FDE1C4] rounded-2xl p-5 mb-10 flex items-start gap-4">
        <div className="bg-white p-2 rounded-full shrink-0 border border-[#FDE1C4]">
          <Info size={20} className="text-[#F69222]" />
        </div>
        <div className="flex-1 pt-0.5">
          <h3 className="font-bold text-[#F69222] mb-1">Tu información nos ayuda a acompañarte mejor</h3>
          <p className="text-sm text-[#5F6B70]">
            Los datos de tu perfil permiten validar tus solicitudes, contactarte de forma oportuna y mantener un seguimiento responsable en cada proceso iniciado dentro de la plataforma.
          </p>
        </div>
      </div>

      {/* Profile Info Placeholder */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-[#F4F8FB] rounded-full flex items-center justify-center mb-6 text-[#8A969B]">
          <User size={40} strokeWidth={1.5} />
        </div>
        <p className="text-[#5F6B70] max-w-lg leading-relaxed">
          Actualiza tus datos personales cuando sea necesario. Esta información podrá utilizarse para procesos de adopción, contacto y seguimiento con la fundación.
        </p>
        
        {/* Aquí iría el formulario de edición más adelante */}
        <button className="mt-8 bg-white text-[#F69222] border-2 border-[#F1D9BD] hover:bg-[#FFF7EA] hover:border-[#F69222] px-8 py-3 rounded-full font-bold transition-colors">
          Editar mi información
        </button>
      </div>
    </div>
  );
}
