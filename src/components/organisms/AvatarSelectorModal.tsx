'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useUser } from '@/context/UserContext';

import avatarUno from '@/assets/ilustraciones/doodles/user/avatars/doodle_avatar_uno.png';
import avatarDos from '@/assets/ilustraciones/doodles/user/avatars/doodle_avatar_dos.png';
import avatarTres from '@/assets/ilustraciones/doodles/user/avatars/doodle_avatar_tres.png';
import avatarCuatro from '@/assets/ilustraciones/doodles/user/avatars/doodle_avatar_cuatro.png';
import avatarCinco from '@/assets/ilustraciones/doodles/user/avatars/doodle_avatar_cinco.png';
import avatarSeis from '@/assets/ilustraciones/doodles/user/avatars/doodle_avatar_seis.png';

const avatarsList = [avatarUno, avatarDos, avatarTres, avatarCuatro, avatarCinco, avatarSeis];

interface AvatarSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AvatarSelectorModal = ({ isOpen, onClose }: AvatarSelectorModalProps) => {
  const { currentAvatar, setCurrentAvatar } = useUser();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#153970]/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative text-gray-800">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#F69222] transition-colors"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold text-[#153970] mb-2 text-center">Elige tu avatar</h3>
        <p className="text-[#5F6B70] text-center mb-6 text-sm">
          Selecciona la ilustración que mejor te represente.
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          {avatarsList.map((avatar, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentAvatar(avatar);
                onClose();
              }}
              className={`relative w-full aspect-square rounded-full border-4 overflow-hidden transition-all duration-300 ${
                currentAvatar.src === avatar.src 
                  ? 'border-[#F69222] shadow-md scale-105' 
                  : 'border-transparent hover:border-[#F1D9BD] hover:scale-105'
              }`}
            >
              <img src={avatar.src} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover scale-110" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
