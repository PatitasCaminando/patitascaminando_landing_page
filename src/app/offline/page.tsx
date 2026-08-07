import React from 'react';
import { WifiOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#FFF7EA] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-patitas flex flex-col items-center">
        <div className="w-24 h-24 bg-[#EBF3FF] text-[#153970] rounded-full flex items-center justify-center mb-6">
          <WifiOff size={48} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-[#153970] mb-4">Sin Conexión</h1>
        
        <p className="text-[#5F6B70] mb-8 leading-relaxed">
          Parece que perdiste tu conexión a internet. Patitas Caminando no puede cargar esta página en este momento.
        </p>
        
        <Link 
          href="/"
          className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-full bg-[#F69222] text-white font-bold text-lg hover:bg-[#E07F19] transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <ArrowLeft size={20} />
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
