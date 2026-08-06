import React from 'react';
import { redirect } from 'next/navigation';
import { AuthSplitTemplate } from '@/components/templates/AuthSplitTemplate';
import { AuthIllustrationPanel } from '@/components/organisms/AuthIllustrationPanel';
import { RegisterForm } from '@/components/organisms/RegisterForm';
import doodleRegister from '@/assets/ilustraciones/doodles/login/doodle_personaje_uno_login.png';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registro | Patitas Caminando',
  description: 'Únete a Patitas Caminando y forma parte de una comunidad que protege la vida animal.',
};

export default function RegisterPage() {
  redirect('/');
  return (
    <AuthSplitTemplate 
      illustrationPanel={
        <AuthIllustrationPanel 
          title="Únete a Patitas Caminando"
          subtitle="Crea tu cuenta para seguir procesos de adopción, reportar casos y formar parte de una comunidad que protege la vida animal."
          image={doodleRegister}
        />
      }
      formPanel={<RegisterForm />}
    />
  );
}
