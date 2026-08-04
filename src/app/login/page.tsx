import React from 'react';
import { AuthSplitTemplate } from '@/components/templates/AuthSplitTemplate';
import { AuthIllustrationPanel } from '@/components/organisms/AuthIllustrationPanel';
import { LoginForm } from '@/components/organisms/LoginForm';
import doodleLogin from '@/assets/ilustraciones/doodles/login/doodle_personaje_dos_login.png';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar sesión | Patitas Caminando',
  description: 'Ingresa a tu cuenta de Patitas Caminando para continuar.',
};

export default function LoginPage() {
  return (
    <AuthSplitTemplate 
      illustrationPanel={
        <AuthIllustrationPanel 
          title="¡Qué bueno verte otra vez!"
          subtitle="Tu ayuda sigue transformando vidas. Gracias por ser parte de esta familia."
          image={doodleLogin}
        />
      }
      formPanel={<LoginForm />}
    />
  );
}
