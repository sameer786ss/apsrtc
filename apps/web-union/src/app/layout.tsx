import type { Metadata } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
import Image from "next/image";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: 'swap' });
const notoSansTelugu = Noto_Sans_Telugu({ subsets: ["telugu"], variable: '--font-noto-telugu', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://apptdunion.me'),
  title: {
    default: "APPTD Union - APSRTC Latest Circulars & News",
    template: "%s | APPTD Union"
  },
  description: "Get instant updates on APSRTC transfers, DA rates, and meetings. The dedicated portal for APPTD Employees Union members to access essential worker information.",
  keywords: ["APSRTC", "APPTD", "Employees Union", "Circulars", "Transfers", "DA Rates", "Andhra Pradesh", "Transport"],
  authors: [{ name: "APPTD Union" }],
  openGraph: {
    title: "APPTD Union - APSRTC Latest Circulars & News",
    description: "Get instant updates on APSRTC transfers, DA rates, and meetings. The dedicated portal for APPTD Employees Union members.",
    url: 'https://apptdunion.me',
    siteName: 'APPTD Union',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "APPTD Union - APSRTC Latest Circulars & News",
    description: "Get instant updates on APSRTC transfers, DA rates, and meetings.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${notoSansTelugu.variable} flex flex-col min-h-screen bg-gray-50`}>
        <div className="w-full bg-white flex justify-center border-b border-gray-200">
          <Image src="/banner.png" alt="APPTD Banner" width={640} height={130} priority className="object-contain max-w-full md:max-w-[95%] h-auto" />
        </div>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster position="top-right" toastOptions={{ duration: 4000, style: { fontFamily: 'inherit' } }} />
      </body>
    </html>
  );
}
