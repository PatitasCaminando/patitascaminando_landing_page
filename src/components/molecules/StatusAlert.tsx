import React from 'react';
import { Info, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';

export type StatusAlertVariant = 'info' | 'warning' | 'error' | 'success';

export interface StatusAlertProps {
  variant: StatusAlertVariant;
  message: React.ReactNode;
  className?: string;
}

export const StatusAlert: React.FC<StatusAlertProps> = ({ variant, message, className = '' }) => {
  const styles = {
    info: {
      container: 'bg-[#F4F9FF] border-[#D6E6FF] text-[#5F6B70]',
      icon: <Info size={20} className="text-[#6B9DF2] shrink-0 mt-0.5" />,
      text: 'text-[#5F6B70]'
    },
    warning: {
      container: 'bg-[#FFF7EA] border-[#F1D9BD] text-[#5F6B70]',
      icon: <AlertTriangle size={20} className="text-[#F69222] shrink-0 mt-0.5" />,
      text: 'text-[#5F6B70]'
    },
    error: {
      container: 'bg-[#FFF0F0] border-[#FFD6D6] text-[#5F6B70]',
      icon: <XCircle size={20} className="text-[#FF6B6B] shrink-0 mt-0.5" />,
      text: 'text-[#5F6B70]'
    },
    success: {
      container: 'bg-[#F0FFF4] border-[#C6F6D5] text-[#5F6B70]',
      icon: <CheckCircle2 size={20} className="text-[#48BB78] shrink-0 mt-0.5" />,
      text: 'text-[#5F6B70]'
    }
  };

  const currentStyle = styles[variant];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${currentStyle.container} ${className}`}>
      {currentStyle.icon}
      <div className={`text-sm leading-relaxed ${currentStyle.text}`}>
        {message}
      </div>
    </div>
  );
};
