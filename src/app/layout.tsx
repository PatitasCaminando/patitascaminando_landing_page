import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { CacheConsentBottomSheet } from "@/components/pwa/CacheConsentBottomSheet";
import { OfflineBanner } from "@/components/pwa/OfflineBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F69222",
};

export const metadata: Metadata = {
  title: "Patitas Caminando",
  description: "Web pública e institucional de la Organización Patitas Caminando. Rescate, cuidado y adopción responsable.",
  manifest: "/manifest.json",
  icons: {
    apple: "/pwa-images/ios/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-inter font-sans" suppressHydrationWarning>
        <div className="w-full overflow-x-hidden">
          {children}
        </div>
        <ServiceWorkerRegister />
        <CacheConsentBottomSheet />
        <OfflineBanner />
      </body>
    </html>
  );
}
