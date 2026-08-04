'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import avatarUno from '@/assets/ilustraciones/doodles/user/avatars/doodle_avatar_uno.png';

interface UserContextProps {
  currentAvatar: StaticImageData;
  setCurrentAvatar: (avatar: StaticImageData) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentAvatar, setCurrentAvatar] = useState<StaticImageData>(avatarUno);

  return (
    <UserContext.Provider value={{ currentAvatar, setCurrentAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};
