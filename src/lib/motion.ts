// Helpers compartilhados dos efeitos: media queries e store do giroscópio.

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Sub = (x: number, y: number) => void;

const subs = new Set<Sub>();
let sx = 0;
let sy = 0;
let listening = false;
let waitingGesture = false;

function onOrientation(e: DeviceOrientationEvent) {
  if (e.gamma == null || e.beta == null) return;
  // gamma: esquerda/direita, beta: frente/trás (celular na mão ~40°)
  const tx = clamp(e.gamma / 30, -1, 1);
  const ty = clamp((e.beta - 40) / 30, -1, 1);
  sx += (tx - sx) * 0.18;
  sy += (ty - sy) * 0.18;
  subs.forEach((f) => f(sx, sy));
}

function attach() {
  if (listening) return;
  listening = true;
  window.addEventListener("deviceorientation", onOrientation);
}

function startGyro() {
  if (typeof window === "undefined" || listening || waitingGesture) return;
  if (!("DeviceOrientationEvent" in window)) return;
  const D = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<string>;
  };
  if (typeof D.requestPermission === "function") {
    // iOS: precisa de permissão, só dentro de um gesto do usuário
    waitingGesture = true;
    window.addEventListener(
      "click",
      () => {
        waitingGesture = false;
        D.requestPermission!()
          .then((r) => r === "granted" && subs.size && attach())
          .catch(() => {});
      },
      { once: true },
    );
  } else {
    attach();
  }
}

/** Recebe inclinação normalizada (-1..1) do aparelho. Retorna função de cancelar. */
export function subscribeGyro(fn: Sub) {
  subs.add(fn);
  startGyro();
  return () => {
    subs.delete(fn);
    if (!subs.size && listening) {
      window.removeEventListener("deviceorientation", onOrientation);
      listening = false;
    }
  };
}
