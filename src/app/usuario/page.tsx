'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Info, Heart, Clock, ArrowRight } from 'lucide-react';
import { CircularShadowImage } from '@/components/atoms/CircularShadowImage';
import { Button } from '@/components/ui/Button';

// Mock data
import losBonitos from '@/assets/perritos/foto_pura/losbonitos.png';

export default function MisSolicitudesPage() {
  redirect('/');
  return (
    <div className="w-full flex flex-col max-w-5xl">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold text-[#153970] mb-3">Mis solicitudes</h1>
          <p className="text-[#5F6B70] leading-relaxed">
            Aquí puedes revisar el estado de tus solicitudes de adopción. Te mantendremos informado de cada avance del proceso.
          </p>
        </div>
      </div>

      {/* Top Banner */}
      <div className="bg-[#FFF4E8] border border-[#FDE1C4] rounded-2xl p-5 mb-8 flex items-start gap-4">
        <div className="bg-white p-2 rounded-full shrink-0 border border-[#FDE1C4]">
          <Info size={20} className="text-[#F69222]" />
        </div>
        <div className="flex-1 pt-0.5">
          <h3 className="font-bold text-[#F69222] mb-1">Gracias por confiar en Patitas Caminando</h3>
          <p className="text-sm text-[#5F6B70]">Cada solicitud nos ayuda a encontrar el hogar ideal para nuestros peluditos.</p>
        </div>
        <Heart size={32} fill="#F69222" className="text-[#F69222] shrink-0 self-center hidden sm:block opacity-90" />
      </div>

      {/* Table Section (Desktop) */}
      <div className="hidden md:block bg-white border border-gray-100 rounded-3xl shadow-sm mb-10 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-5 px-6 font-semibold text-[#5F6B70] text-sm w-12 text-center">#</th>
                <th className="py-5 px-6 font-semibold text-[#5F6B70] text-sm w-64">Animalito</th>
                <th className="py-5 px-6 font-semibold text-[#5F6B70] text-sm">Fecha solicitud</th>
                <th className="py-5 px-6 font-semibold text-[#5F6B70] text-sm">Estado actual</th>
                <th className="py-5 px-6 font-semibold text-[#5F6B70] text-sm">Última actualización</th>
                <th className="py-5 px-6 font-semibold text-[#5F6B70] text-sm text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-5 px-6 text-center font-semibold text-[#153970]">1</td>
                <td className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
                       <Image src={losBonitos} alt="Los Bonitos" width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#153970] text-base mb-0.5">Los Bonitos</h4>
                      <p className="text-sm text-[#8A969B]">Hembra y Macho</p>
                      <p className="text-sm text-[#8A969B]">1 año</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6 text-[#5F6B70]">20 jul. 2025</td>
                <td className="py-5 px-6">
                  <div className="inline-flex items-center gap-1.5 bg-[#FFF4E8] text-[#F69222] px-3 py-1.5 rounded-full text-sm font-semibold border border-[#FDE1C4]">
                    <Clock size={14} /> En revisión
                  </div>
                </td>
                <td className="py-5 px-6 text-[#5F6B70]">20 jul. 2025</td>
                <td className="py-5 px-6 text-center">
                  <button className="w-10 h-10 rounded-full border-2 border-[#F1D9BD] text-[#F69222] flex items-center justify-center mx-auto hover:bg-[#F69222] hover:border-[#F69222] hover:text-white transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination & Footer */}
        <div className="py-4 px-6 flex items-center justify-between text-sm border-t border-gray-100 bg-gray-50/30">
          <span className="text-[#8A969B]">Mostrando 1 de 1 solicitud</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed bg-white font-medium">Anterior</button>
            <button className="w-10 h-10 rounded-lg bg-[#F69222] text-white font-bold flex items-center justify-center shadow-sm">1</button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed bg-white font-medium">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Cards Section (Mobile) */}
      <div className="md:hidden flex flex-col gap-4 mb-10">
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col gap-4 relative">
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
               <Image src={losBonitos} alt="Los Bonitos" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-[#153970] text-lg mb-0.5">Los Bonitos</h4>
              <p className="text-sm text-[#8A969B]">Hembra y Macho</p>
              <p className="text-sm text-[#8A969B]">1 año</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-gray-50 pt-4">
            <div>
              <p className="text-xs text-[#8A969B] mb-1">Fecha solicitud</p>
              <p className="text-sm font-semibold text-[#5F6B70]">20 jul. 2025</p>
            </div>
            <div>
              <p className="text-xs text-[#8A969B] mb-1">Estado actual</p>
              <div className="inline-flex items-center gap-1.5 bg-[#FFF4E8] text-[#F69222] px-2.5 py-1 rounded-full text-xs font-semibold border border-[#FDE1C4] w-fit">
                <Clock size={12} /> En revisión
              </div>
            </div>
            <div>
              <p className="text-xs text-[#8A969B] mb-1">Última actualización</p>
              <p className="text-sm font-semibold text-[#5F6B70]">20 jul. 2025</p>
            </div>
            <div className="flex items-end justify-end">
              <button className="text-[#F69222] font-bold text-sm flex items-center gap-1 hover:underline">
                Ver detalle <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Pagination Mobile */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-400 bg-white shadow-sm flex items-center justify-center font-bold">1</button>
        </div>
      </div>

      {/* Help Banner */}
      <div className="bg-[#F4F8FB] border border-[#DCEAF5] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="bg-white p-2 rounded-full shrink-0 border border-[#DCEAF5] text-[#153970]">
            <Info size={20} />
          </div>
          <div className="pt-0.5">
            <h3 className="font-bold text-[#153970] mb-1">¿Tienes dudas?</h3>
            <p className="text-sm text-[#5F6B70]">Nuestro equipo te contactará pronto para continuar con el proceso.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 text-sm font-semibold text-[#153970] shrink-0">
          <a href="#" className="flex items-center gap-2 hover:text-[#F69222] transition-colors">
            <div className="w-8 h-8 rounded-full border border-[#DCEAF5] bg-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            0987727566
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-[#F69222] transition-colors">
            <div className="w-8 h-8 rounded-full border border-[#DCEAF5] bg-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            patitascaminando33@gmail.com
          </a>
        </div>
      </div>

    </div>
  );
}
