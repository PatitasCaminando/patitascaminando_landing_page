import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { CacheConsentBottomSheet } from "@/components/pwa/CacheConsentBottomSheet";
import { PWAInstallModal } from "@/components/pwa/PWAInstallModal";
import PWAInstallWrapper from "@/components/pwa/PWAInstallWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="es" className={`${inter.variable} ${dynaPuff.variable}`} suppressHydrationWarning>
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
