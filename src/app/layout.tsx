import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import GlitterBg from "@/components/GlitterBg";
import LazyEffects from "@/components/LazyEffects";
import SponsorsStrip from "@/components/SponsorsStrip";

// Fontes hospedadas junto do site (sem pedido ao Google), só com o que é usado.
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

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
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${cinzel.variable} ${outfit.variable} ${dancing.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen flex flex-col" style={{ background: "#000" }}>
        {/* sem JavaScript os títulos aparecem normalmente */}
        <noscript><style>{".sr-l{opacity:1!important}"}</style></noscript>
        <GlitterBg />
        <LazyEffects />
        <NavBar />
        <main className="flex-1 relative z-10">{children}</main>
        <SponsorsStrip />
        <Footer />
      </body>
    </html>
  );
}
