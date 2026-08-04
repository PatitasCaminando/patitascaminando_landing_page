import React from 'react';
import backgroundImg from '@/assets/ilustraciones/doodles/login/background.png';

export interface AuthSplitTemplateProps {
  illustrationPanel: React.ReactNode;
  formPanel: React.ReactNode;
}

export const AuthSplitTemplate: React.FC<AuthSplitTemplateProps> = ({ illustrationPanel, formPanel }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
    >
      <div className="w-full max-w-[1200px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        {/* Left Panel (Illustration) */}
        <div className="w-full md:w-5/12 lg:w-1/2 bg-[#F69222] p-8 md:p-12 flex flex-col relative overflow-hidden order-1 min-h-[400px]">
          {illustrationPanel}
        </div>
        
        {/* Right Panel (Form) */}
        <div className="w-full md:w-7/12 lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2">
          {formPanel}
        </div>
      </div>
    </div>
  );
};
