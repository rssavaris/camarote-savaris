import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import GlitterBg from "@/components/GlitterBg";

export const metadata: Metadata = {
  title: "Camarote Savaris — 40 Tons de Glitter",
  description:
    "40 Tons de Glitter apresenta: Camarote Savaris. 08 de Fevereiro de 2027 — Club Fundo de Quintal, Porto Velho.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col" style={{ background: "#000" }}>
        <GlitterBg />
        <NavBar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
