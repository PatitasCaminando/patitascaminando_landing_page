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
        
        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <details 
              key={faq.id} 
              className="group bg-[#FFF7EA] rounded-[24px] overflow-hidden border border-[#F1D9BD] transition-all"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-[#153970] hover:text-[#F69222] transition-colors marker:content-none">
                {faq.question}
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-[#5F6B70] leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
