"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { prefersReduced } from "@/lib/motion";

// Aurora em shader (WebGL via OGL): cortinas de luz rosa/ciano/roxo/dourado.
// Celular: render em baixa resolução + 30fps. Sem WebGL ou reduced-motion → onFail (fundo antigo).

const VERT = /* glsl */ `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
precision mediump float;
uniform float uTime;
uniform vec2 uRes;

vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// pink -> cyan -> purple -> gold
vec3 pal(float x){
  x = fract(x) * 4.0;
  vec3 c0 = vec3(1.00, 0.20, 0.60);
  vec3 c1 = vec3(0.00, 0.83, 1.00);
  vec3 c2 = vec3(0.48, 0.38, 1.00);
  vec3 c3 = vec3(1.00, 0.84, 0.00);
  if (x < 1.0) return mix(c0, c1, smoothstep(0.0, 1.0, x));
  if (x < 2.0) return mix(c1, c2, smoothstep(0.0, 1.0, x - 1.0));
  if (x < 3.0) return mix(c2, c3, smoothstep(0.0, 1.0, x - 2.0));
  return mix(c3, c0, smoothstep(0.0, 1.0, x - 3.0));
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;
  float t = uTime * 0.1;
  vec3 col = vec3(0.0);

  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float n = snoise(vec2(p.x * (0.9 + fi * 0.45) + t * (1.0 + fi * 0.35), t * 0.6 + fi * 3.1));
    float y = 0.30 + fi * 0.17 + n * 0.17;
    float d = uv.y - y;
    // cortina: borda de baixo nitida, esvanece para cima
    float curtain = smoothstep(-0.02, 0.0, d) * exp(-max(d, 0.0) * (5.0 - fi)) + exp(-abs(d) * 40.0) * 0.6;
    float streak = 0.65 + 0.35 * snoise(vec2(p.x * 7.0 + fi * 5.0, t * 1.5));
    col += pal(fi * 0.28 + n * 0.35 + t * 0.6) * curtain * streak;
  }

  // vinheta: escurece topo para o conteudo respirar
  col *= mix(1.0, 0.35, smoothstep(0.55, 1.0, uv.y));
  gl_FragColor = vec4(col * 0.5, 1.0);
}
`;

export default function AuroraBg({ onFail, onReady }: { onFail: () => void; onReady: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReduced()) { onFail(); return; }
    const canvas = ref.current!;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const weak = coarse && (navigator.hardwareConcurrency || 4) <= 4;
    // resolução interna baixa: a aurora é suave, ninguém percebe e poupa a GPU
    const dpr = weak ? 0.3 : coarse ? 0.45 : 0.7;
    const frameGap = coarse ? 1000 / 30 : 1000 / 60;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ canvas, dpr, alpha: false, antialias: false, powerPreference: "low-power" });
      if (!renderer.gl) throw new Error("no webgl");
    } catch {
      onFail();
      return;
    }
    const gl = renderer.gl;
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: { uTime: { value: 0 }, uRes: { value: [1, 1] } },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(innerWidth, innerHeight);
      program.uniforms.uRes.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };
    resize();
    addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    let running = true;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < frameGap) return;
      last = t;
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(tick);
    onReady();

    const onVis = () => {
      if (document.hidden && running) { cancelAnimationFrame(raf); running = false; }
      else if (!document.hidden && !running) { running = true; raf = requestAnimationFrame(tick); }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.32 }} />;
}
