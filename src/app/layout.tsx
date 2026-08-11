import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import dynamic from 'next/dynamic';

const CacheConsentBottomSheet = dynamic(() => import('@/components/pwa/CacheConsentBottomSheet').then(mod => mod.CacheConsentBottomSheet));
const PWAInstallModal = dynamic(() => import('@/components/pwa/PWAInstallModal').then(mod => mod.PWAInstallModal));
const PWAInstallWrapper = dynamic(() => import('@/components/pwa/PWAInstallWrapper'));

const nunito = localFont({
  src: "../assets/fonts/dyna_puff_nunito/Nunito/Nunito-VariableFont_wght.ttf",
  variable: "--font-inter", // Reusing the same variable name to avoid changing globals.css and tailwind config
  display: "swap",
});

const dynaPuff = localFont({
  src: "../assets/fonts/dyna_puff_nunito/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  variable: "--font-brand",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F69222",
};

export const metadata: Metadata = {
  title: "Patitas Caminando",
  description: "Web pública e institucional de la Organización Patitas Caminando. Rescate, cuidado y adopción responsable.",
  icons: {
    icon: "/favicon-rounded.png?v=2",
    apple: "/pwa-images/ios/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "Patitas Caminando",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} ${dynaPuff.variable}`} suppressHydrationWarning>
      <body className="font-inter font-sans" suppressHydrationWarning>
        <div className="w-full overflow-x-hidden">
          {children}
        </div>
        <ServiceWorkerRegister />
        <CacheConsentBottomSheet />
        <PWAInstallWrapper />
        <PWAInstallModal />
      </body>
    </html>
  );
}
