import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APSRTC - Andhra Pradesh State Road Transport Corporation",
  description: "Modern APSRTC portal for reservations, live tracking, logistics, bus passes, tenders, notifications, coaches, and passenger services.",
  icons: {
    icon: "/apsrtc/220px-APSRTC_Logo.png",
    apple: "/apsrtc/220px-APSRTC_Logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeRegistry>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
