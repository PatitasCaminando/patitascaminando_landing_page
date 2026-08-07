'use client';

import React, { useEffect, useState } from 'react';
import { useCacheConsent } from '@/hooks/use-cache-consent';
import { Button } from '@/components/ui/Button';
import { Info, X, Check } from 'lucide-react';
import Image from 'next/image';
import doodleCache from '@/assets/ilustraciones/doodles/doodles_cache.png';

export const CacheConsentBottomSheet = () => {
  const { hasAcceptedCache, acceptCacheConsent } = useCacheConsent();
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    // Si se muestra el bottom sheet, bloqueamos el scroll del body
    if (showSheet && hasAcceptedCache === false) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSheet, hasAcceptedCache]);

  useEffect(() => {
    if (hasAcceptedCache === false) {
      // Reducido a 10s para facilitar pruebas.
      const timer = setTimeout(() => setShowSheet(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [hasAcceptedCache]);

  // No renderizar en el servidor ni si ya fue aceptado, o si no han pasado los 60s
  if (hasAcceptedCache === null || hasAcceptedCache || !showSheet) {
    return null;
  }

  const handleAcceptPolicy = () => {
    setIsPolicyModalOpen(false);
    acceptCacheConsent(); // Esto guardará el true y ocultará todo
    window.dispatchEvent(new Event('show-pwa-install'));
  };

  const handleDirectAccept = () => {
    acceptCacheConsent();
    window.dispatchEvent(new Event('show-pwa-install'));
  };

  return (
    <>
      {/* Overlay con blur que bloquea interacción */}
      {!isPolicyModalOpen && (
        <div className="fixed inset-0 bg-[#153970]/40 backdrop-blur-sm z-[998] animate-[fadeIn_0.3s_ease-out]"></div>
      )}

      {/* Bottom Sheet Principal */}
      <div className={`fixed bottom-0 left-0 right-0 z-[999] bg-[#FFF7EA] rounded-t-3xl shadow-[0_-10px_40px_rgba(21,57,112,0.1)] border-t border-[#F1D9BD] p-6 pb-8 md:p-8 md:pb-10 transition-transform duration-400 ease-in-out ${isPolicyModalOpen ? 'translate-y-full' : 'translate-y-0 animate-[slideUp_0.4s_ease-out_forwards]'}`}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 relative z-20">

          {/* Doodle anclado a la izquierda del contenido centrado pero saliendo desde la base real */}
          <div className="hidden sm:block absolute bottom-[-3.5rem] md:bottom-[-4.5rem] left-[-1.5rem] md:left-[-2rem] w-44 md:w-56 lg:w-64 pointer-events-none z-10">
            <Image src={doodleCache} alt="Modo sin conexión" className="w-full h-auto object-contain drop-shadow-sm" />
          </div>

          <div className="flex-1 w-full sm:pl-[10.5rem] md:pl-[13.5rem] lg:pl-[15.5rem] relative z-20">
            <div className="flex items-start md:items-center justify-between md:justify-start gap-2 mb-3">
              <h3 className="text-lg md:text-xl font-extrabold text-[#153970] leading-tight font-brand">
                Mejor experiencia, incluso sin conexión
              </h3>
              <div className="relative flex items-center justify-center shrink-0">
                {!showInfo && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#F69222] opacity-40 animate-ping" style={{ animationDuration: '2.5s' }}></span>
                )}
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="relative bg-[#FFF4E8] text-[#F69222] p-1.5 rounded-full hover:bg-[#FFE2C2] active:scale-75 transition-all duration-200 focus:outline-none"
                  aria-label="Más información"
                >
                  <Info size={18} />
                </button>
              </div>
            </div>

            <p className="text-[#5F6B70] text-sm md:text-base leading-relaxed mb-3">
              Patitas Caminando puede guardar temporalmente imágenes, páginas y perfiles públicos de animalitos en tu dispositivo para cargar más rápido y ayudarte a consultar información básica incluso sin conexión.
            </p>

            {showInfo && (
              <div className="flex items-start md:items-center gap-2 bg-[#FFF4E8]/80 p-3 rounded-xl border border-[#FDE1C4] mt-1 inline-flex animate-[fadeIn_0.2s_ease-out]">
                <p className="text-xs md:text-sm text-[#5F6B70] font-medium leading-snug pl-1">
                  No guardamos solicitudes de adopción, donaciones ni datos personales en caché.
                </p>
                <button
                  onClick={() => setShowInfo(false)}
                  className="bg-transparent text-[#F69222]/60 hover:text-[#F69222] hover:bg-[#FFE2C2]/50 p-1 rounded-full transition-all shrink-0 ml-1"
                  aria-label="Cerrar aviso"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 md:min-w-[300px]">
            <Button variant="outline" onClick={() => setIsPolicyModalOpen(true)} className="w-full sm:w-auto justify-center bg-white border-[#F1D9BD] text-[#5F6B70] hover:text-[#F69222] hover:border-[#F69222]">
              Ver política
            </Button>
            <Button variant="primary" onClick={handleDirectAccept} className="w-full sm:w-auto justify-center shadow-md flex items-center gap-1.5">
              <Check size={18} strokeWidth={2.5} />
              Entendido
            </Button>
          </div>

        </div>
      </div>

      {/* Cache Policy Modal */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#153970]/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative animate-[scaleIn_0.3s_ease-out] flex flex-col max-h-[90vh]">

            <div className="flex items-start justify-between gap-4 mb-5 shrink-0">
              <div className="flex items-start gap-3">
                <div className="bg-[#EBF3FF] p-2.5 rounded-2xl text-[#153970] shrink-0">
                  <Info size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-[#153970] leading-tight pt-1 font-brand">Política de uso de caché</h3>
              </div>
              <button
                onClick={() => setIsPolicyModalOpen(false)}
                className="bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-[#5F6B70] text-sm leading-relaxed space-y-4 overflow-y-auto pr-2 pb-2 flex-1">
              <p>
                Patitas Caminando puede guardar temporalmente en tu dispositivo algunos recursos públicos de la aplicación, como imágenes, páginas, íconos, estilos y perfiles públicos de animalitos.
              </p>
              <p>
                Esto nos ayuda a que la landing cargue más rápido y que puedas consultar información básica incluso cuando tu conexión sea limitada o no esté disponible.
              </p>

              <div className="bg-[#FFF4E8]/50 p-4 rounded-2xl border border-[#FDE1C4]/50">
                <p className="font-bold text-[#153970] mb-2">No guardamos en caché:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>solicitudes de adopción.</li>
                  <li>formularios de donación.</li>
                  <li>nombres, teléfonos o correos ingresados.</li>
                  <li>información privada.</li>
                  <li>tokens o credenciales.</li>
                </ul>
              </div>

              <p className="pt-2 text-xs text-[#8A969B]">
                La información almacenada puede actualizarse automáticamente cuando vuelvas a tener conexión. También puedes borrar estos datos desde la configuración de tu navegador o dispositivo.
              </p>
            </div>

            <div className="mt-6 shrink-0">
              <Button variant="primary" onClick={handleAcceptPolicy} className="w-full text-lg py-3.5 justify-center flex items-center gap-2">
                <Check size={20} strokeWidth={2.5} />
                Entendido
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
