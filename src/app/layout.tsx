import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eiva Magic",
  description: "Generador inteligente de landings ganadoras para e-commerce.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-night-900">
      <body className={`${inter.className} min-h-screen bg-night-900 text-slate-100`}>
        <Header />
        <main className="mx-auto max-w-6xl px-6 pb-16 pt-8">{children}</main>
      </body>
    </html>
  );
}
