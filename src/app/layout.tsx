import type { Metadata } from "next";
/* import { Geist, Geist_Mono } from "next/font/google"; */
import "./globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CaroVictoriaLocutora",
  description: "Blog profesional sobre locución, voz y comunicación.",
  keywords: ["locución", "voz", "comunicación", "blog", "Carovictoria"],
  authors: [{ name: "Carovictoria", url: "https://carovictoria.com" }],
  creator: "Carovictoria",
  openGraph: {
    title: "Carovictoria Locutora",
    description: "Explora artículos sobre locución y comunicación profesional.",
    url: "https://carovictoria.com",
    siteName: "Carovictoria Locutora",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/carovictorialocutora-ab405.firebasestorage.app/o/caro.jpg?alt=media&token=37b67aee-cb27-4b17-b486-b086262e67b2",
        width: 1200,
        height: 630,
        alt: "Imagen de portada del blog Carovictoria",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carovictoria Locutora",
    description: "Blog profesional sobre voz y comunicación.",
    creator: "@carovictoria",
    images: ["https://carovictoria.com/og-image.jpg"],
  },
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); */

/* const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-gradient-to-b from-gray-900 to-gray-950 dark:from-black dark:to-gray-900 py-20 text-center`}
      >
        <Header></Header>

        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
