'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '../atoms/Button';

interface ShareActionsProps {
  title: string;
  text: string;
}

export const ShareActions: React.FC<ShareActionsProps> = ({ title, text }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error al compartir', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error al copiar al portapapeles', err);
      }
    }
  };

  return (
    <div className="flex items-center gap-3 relative">
      <Button 
        variant="outline" 
        onClick={handleShare}
        aria-label="Compartir publicación"
        className="gap-2 font-medium !border shadow-sm bg-white"
        style={{ padding: '0.625rem 1.5rem' }} // To match py-2.5 px-6 closely
      >
        {copied ? <Check size={18} /> : <Share2 size={18} />}
        Compartir
      </Button>
      {copied && (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-[#F69222] animate-fade-in-up font-bold bg-[#FFE2C2] px-2 py-1 rounded-md">
          ¡Copiado!
        </span>
      )}
    </div>
  );
};
