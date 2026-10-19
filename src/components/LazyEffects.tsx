"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { hasFinePointer } from "@/lib/motion";

// Efeitos pesados só entram depois que a página já está visível e o navegador ocioso.
// Assim o conteúdo aparece primeiro e o JavaScript dos efeitos não atrasa o carregamento.
const SparkleFX = dynamic(() => import("@/components/SparkleFX"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function LazyEffects() {
  const [ready, setReady] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    setDesktop(hasFinePointer()); // scroll suave só no desktop; no celular o nativo já é suave
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => (window as Window & { cancelIdleCallback?: (n: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;
  return (
    <>
      {desktop && <SmoothScroll />}
      <SparkleFX />
    </>
  );
}
