'use client';

import React, { useState } from 'react';
import { AuthLabel } from '../atoms/AuthLabel';
import { AuthInput } from '../atoms/AuthInput';
import { FormErrorMessage } from '../atoms/FormErrorMessage';
import { Eye, EyeOff } from 'lucide-react';

export interface AuthInputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
  icon?: React.ReactNode;
}

export const AuthInputGroup = React.forwardRef<HTMLInputElement, AuthInputGroupProps>(
  ({ label, error, id, type = 'text', icon, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const currentType = isPassword && showPassword ? 'text' : type;

    return (
      <div className={`flex flex-col mb-4 ${className}`}>
        <AuthLabel htmlFor={id}>{label}</AuthLabel>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <AuthInput
            ref={ref}
            id={id}
            type={currentType}
            hasError={!!error}
            className={icon ? 'pl-11' : ''}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F69222] transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        <FormErrorMessage message={error} />
      </div>
    );
  }
);

AuthInputGroup.displayName = 'AuthInputGroup';
