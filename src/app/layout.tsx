import type { Metadata } from "next";
import { Dancing_Script, Fraunces, Nunito } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { negocio } from "@/lib/negocio";
import "./globals.css";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
const dancing = Dancing_Script({ variable: "--font-dancing", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${negocio.nombre} · Bizcochos para tu celebración`,
  description: `Encuentra o diseña el bizcocho perfecto para tu celebración con ${negocio.duena}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${nunito.variable} ${fraunces.variable} ${dancing.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
