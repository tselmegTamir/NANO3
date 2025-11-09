import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from '@/context/LanguageContext';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Нано Капитал ББСБ",
  description:
    "Nano Capital ББСБ нь таны санхүүгийн түнш бөгөөд хурдан, найдвартай зээлийн шийдлийг санал болгодог.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="min-h-screen">
          <LanguageProvider>
          {children}
        </LanguageProvider>
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
