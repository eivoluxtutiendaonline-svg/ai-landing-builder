import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Landing Builder",
  description: "Plataforma interna para crear landings de ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-slate-50">
      <body className={`${inter.className} min-h-screen text-slate-900`}>
        <Header />
        <main className="mx-auto max-w-6xl px-6 pb-12 pt-6">{children}</main>
      </body>
    </html>
  );
}
