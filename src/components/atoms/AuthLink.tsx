import React from 'react';
import Link from 'next/link';

export interface AuthLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const AuthLink: React.FC<AuthLinkProps> = ({ href, children, className = '' }) => {
  return (
    <Link 
      href={href}
      className={`text-[#F69222] font-bold hover:text-[#D67C14] hover:underline transition-colors ${className}`}
    >
      {children}
    </Link>
  );
};
