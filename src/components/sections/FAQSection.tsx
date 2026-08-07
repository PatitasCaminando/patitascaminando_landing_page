import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { faqs } from '@/data/faqs';
import perritoFAQ from '@/assets/ilustraciones/doodles/no_doodle_seccion_preguntas.png';
import doodleIncognita from '@/assets/ilustraciones/doodles/doodle_superior_seccion_preguntas.png';

export const FAQSection = () => {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden flex justify-center">
      
      {/* Decorative Visuals */}
      <div className="absolute bottom-[-10px] right-[40px] lg:right-[120px] xl:right-[150px] z-0 hidden lg:block pointer-events-none select-none">
        <img
          src={doodleIncognita.src}
          alt=""
          aria-hidden="true"
          className="absolute top-[30px] left-[65%] -translate-x-1/2 w-[90px] md:w-[120px] lg:w-[140px] opacity-90"
        />
        <img
          src={perritoFAQ.src}
          alt=""
          aria-hidden="true"
          className="w-[280px] md:w-[320px] lg:w-[400px]"
        />
      </div>

      <div className="max-w-3xl w-full mx-auto relative z-10">
        <SectionHeader 
          title="Preguntas Frecuentes" 
          subtitle="Resolvemos tus principales dudas sobre cómo funcionamos y cómo puedes involucrarte." 
        />
        
        <div className="mt-12 flex flex-col gap-[14px] md:gap-4">
          {faqs.map((faq) => (
            <details 
              key={faq.id} 
              className="group bg-[#FDF3E7] md:bg-[#FFF7EA] rounded-[22px] md:rounded-[24px] overflow-hidden border border-[#F1D9BD] hover:border-[#F69222]/30 open:border-[#F69222]/50 open:shadow-sm transition-all duration-300 relative"
            >
              {/* Acento naranja que aparece al abrir (Solo un detalle visual sutil a la izquierda) */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F69222] opacity-0 group-open:opacity-100 transition-opacity duration-300"></div>
              
              <summary className="flex items-center justify-between p-[18px] px-[20px] md:p-6 cursor-pointer font-bold text-[15px] md:text-lg text-[#153970] hover:text-[#F69222] transition-colors marker:content-none">
                <span className="text-left pr-4 line-clamp-2 md:line-clamp-none leading-snug">{faq.question}</span>
                <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 text-[#153970]">
                  <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-[20px] pb-[18px] md:px-6 md:pb-6 text-sm md:text-base text-[#5F6B70] leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
