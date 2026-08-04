'use client';

import React from 'react';
import { Info, Award } from 'lucide-react';

export default function MisDistintivosPage() {
  return (
    <div className="w-full flex flex-col max-w-5xl">
      {/* Header Area */}
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[#153970] mb-3">Mis distintivos</h1>
        <p className="text-[#5F6B70] leading-relaxed">
          Aquí podrás ver los reconocimientos que has ganado por formar parte activa de la comunidad Patitas Caminando.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#FFF4E8] border border-[#FDE1C4] rounded-2xl p-5 mb-10 flex items-start gap-4">
        <div className="bg-white p-2 rounded-full shrink-0 border border-[#FDE1C4]">
          <Info size={20} className="text-[#F69222]" />
        </div>
        <div className="flex-1 pt-0.5">
          <h3 className="font-bold text-[#F69222] mb-1">Tus acciones también dejan huella</h3>
          <p className="text-sm text-[#5F6B70]">
            Cada distintivo representa una forma de apoyo dentro de Patitas Caminando. Cuando completes procesos como adopciones responsables o participaciones especiales, estos reconocimientos aparecerán en tu perfil.
          </p>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-20 h-20 bg-[#F4F8FB] rounded-full flex items-center justify-center mb-6 text-[#8A969B]">
          <Award size={40} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-[#153970] mb-3">Aún no tienes distintivos</h3>
        <p className="text-[#5F6B70] max-w-md leading-relaxed">
          Cuando completes una adopción o participes en una acción destacada de la comunidad, recibirás tus primeros distintivos.
        </p>
      </div>
    </div>
  );
}
