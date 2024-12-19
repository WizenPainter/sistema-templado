import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sistema de Templado Javalfer",
  description: "El sistema de templado es un sistema de gestión de la producción de productos de la industria de la construcción.",
  keywords: "Sistema de Templado, Javalfer, Industria de la Construcción, Productos, Gestión de la Producción",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}