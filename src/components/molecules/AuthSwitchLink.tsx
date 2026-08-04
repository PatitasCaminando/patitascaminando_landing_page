import React from 'react';
import { AuthLink } from '../atoms/AuthLink';

export interface AuthSwitchLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export const AuthSwitchLink: React.FC<AuthSwitchLinkProps> = ({ text, linkText, href }) => {
  return (
    <div className="text-center mt-6">
      <p className="text-[#5F6B70] text-sm">
        {text}{' '}
        <AuthLink href={href}>{linkText}</AuthLink>
      </p>
    </div>
  );
};
