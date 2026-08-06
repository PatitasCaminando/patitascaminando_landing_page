'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { ChevronLeft, RefreshCw } from 'lucide-react';

interface ErrorStateTemplateProps {
  title: string;
  message: string;
  doodleSrc: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  onSecondaryAction?: () => void;
  isGlobal?: boolean;
  doodleClassName?: string;
}

export const ErrorStateTemplate: React.FC<ErrorStateTemplateProps> = ({
  title,
  message,
  doodleSrc,
  primaryActionLabel,
  primaryActionHref,
  onPrimaryAction,
  secondaryActionLabel,
  secondaryActionHref,
  onSecondaryAction,
  isGlobal = false,
  doodleClassName
}) => {
  const content = (
    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full px-4 relative z-10 py-16">
      <div className="mb-4 relative flex justify-center w-full z-10">
        <img 
          src={doodleSrc} 
          alt="Error illustration" 
          className={doodleClassName || "w-64 sm:w-80 md:w-96 max-w-full drop-shadow-sm pointer-events-none"}
        />
      </div>

      <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#153970] mb-4">
        {title}
      </h2>

      <p className="text-lg md:text-xl text-[#5F6B70] mb-10 leading-relaxed font-medium max-w-xl mx-auto">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        {primaryActionLabel && (
          primaryActionHref ? (
            <Link href={primaryActionHref} className="w-full sm:w-auto">
              <Button variant="primary" className="w-full justify-center py-3.5 px-8 text-lg rounded-full shadow-md flex items-center gap-2">
                {primaryActionLabel.toLowerCase().includes('volver') && <ChevronLeft size={20} />}
                {primaryActionLabel.toLowerCase().includes('intentar') && <RefreshCw size={20} />}
                {primaryActionLabel}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" onClick={onPrimaryAction} className="w-full sm:w-auto justify-center py-3.5 px-8 text-lg rounded-full shadow-md flex items-center gap-2">
              {primaryActionLabel.toLowerCase().includes('volver') && <ChevronLeft size={20} />}
              {primaryActionLabel.toLowerCase().includes('intentar') && <RefreshCw size={20} />}
              {primaryActionLabel}
            </Button>
          )
        )}
        
        {secondaryActionLabel && (
          secondaryActionHref ? (
            <Link href={secondaryActionHref} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full justify-center py-3.5 px-8 text-lg rounded-full bg-white border-2 border-[#F1D9BD] text-[#5F6B70] hover:border-[#F69222] hover:text-[#F69222] flex items-center gap-2">
                {secondaryActionLabel.toLowerCase().includes('volver') && <ChevronLeft size={20} />}
                {secondaryActionLabel}
              </Button>
            </Link>
          ) : (
            <Button variant="outline" onClick={onSecondaryAction} className="w-full sm:w-auto justify-center py-3.5 px-8 text-lg rounded-full bg-white border-2 border-[#F1D9BD] text-[#5F6B70] hover:border-[#F69222] hover:text-[#F69222] flex items-center gap-2">
              {secondaryActionLabel.toLowerCase().includes('volver') && <ChevronLeft size={20} />}
              {secondaryActionLabel}
            </Button>
          )
        )}
      </div>
    </div>
  );
  if (isGlobal) {
    return (
      <div className="min-h-[70vh] flex flex-col bg-transparent relative overflow-hidden">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-[32px] border border-[#E0E8F0]">
      {content}
    </div>
  );
};
