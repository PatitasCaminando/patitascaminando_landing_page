'use client';

import React from 'react';
import { Info, Bell, AlertTriangle, FileText } from 'lucide-react';

export default function NotificacionesPage() {
  const hasNotifications = true; // Cambiar a false para ver el estado vacío

  return (
    <div className="w-full flex flex-col max-w-5xl">
      {/* Header Area */}
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[#153970] mb-3">Notificaciones</h1>
        <p className="text-[#5F6B70] leading-relaxed">
          Revisa aquí las novedades importantes sobre tus solicitudes, alertas comunitarias y reportes activos compartidos por Patitas Caminando.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#FFF4E8] border border-[#FDE1C4] rounded-2xl p-5 mb-10 flex items-start gap-4">
        <div className="bg-white p-2 rounded-full shrink-0 border border-[#FDE1C4]">
          <Info size={20} className="text-[#F69222]" />
        </div>
        <div className="flex-1 pt-0.5">
          <h3 className="font-bold text-[#F69222] mb-1">Mantente atento a las novedades de la comunidad</h3>
          <p className="text-sm text-[#5F6B70]">
            En esta sección recibirás avisos relacionados con tus procesos de adopción y alertas comunitarias activas, como animalitos extraviados o casos de abandono que puedan requerir difusión durante las próximas horas.
          </p>
        </div>
      </div>

      {!hasNotifications ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-20 h-20 bg-[#F4F8FB] rounded-full flex items-center justify-center mb-6 text-[#8A969B]">
            <Bell size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-[#153970] mb-3">No tienes notificaciones por ahora</h3>
          <p className="text-[#5F6B70] max-w-md leading-relaxed">
            Cuando exista una actualización sobre tus solicitudes o una alerta comunitaria activa, la verás reflejada en esta sección.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          
          {/* Alerta Comunitaria */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-5 hover:border-[#DCEAF5] transition-colors">
            <div className="w-12 h-12 bg-[#FFF4E8] text-[#F69222] rounded-full flex items-center justify-center shrink-0 border border-[#FDE1C4]">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-[#153970]">Alerta comunitaria activa</h3>
                <span className="text-xs font-semibold text-[#8A969B] bg-gray-100 px-3 py-1 rounded-full w-fit">Hace 2 horas</span>
              </div>
              <p className="text-[#5F6B70] mb-3 leading-relaxed">
                Se ha reportado un caso de animalito extraviado o abandonado. Puedes revisar la información y ayudar compartiendo la alerta con tu comunidad.
              </p>
              <p className="text-sm font-medium text-[#8A969B] italic">
                Esta alerta estará disponible por un tiempo limitado para apoyar su difusión y seguimiento.
              </p>
            </div>
          </div>

          {/* Actualización de Adopción */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-5 hover:border-[#DCEAF5] transition-colors">
            <div className="w-12 h-12 bg-[#F4F8FB] text-[#153970] rounded-full flex items-center justify-center shrink-0 border border-[#DCEAF5]">
              <FileText size={24} />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-[#153970]">Actualización de solicitud</h3>
                <span className="text-xs font-semibold text-[#8A969B] bg-gray-100 px-3 py-1 rounded-full w-fit">Hace 1 día</span>
              </div>
              <p className="text-[#5F6B70] mb-3 leading-relaxed">
                Tu proceso de adopción ha recibido una nueva actualización por parte de Patitas Caminando.
              </p>
              <p className="text-sm font-medium text-[#8A969B] italic">
                Revisa el detalle de tu solicitud para conocer el estado actual y los próximos pasos.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
