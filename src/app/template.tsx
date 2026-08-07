'use client'

import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-full animate-[fadeIn_0.4s_ease-out]">
      {children}
    </div>
  )
}
