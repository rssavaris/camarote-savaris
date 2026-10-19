"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, CheckCircle, AlertCircle, Upload, ChevronRight, Star, Shield, Shirt, MapPin } from "lucide-react";

const TAMANHOS = ["P", "M", "G", "GG"] as const;
type Tamanho = typeof TAMANHOS[number];

interface FormData {
  nome: string;
  cpf: string;
  whatsapp: string;
  email: string;
  tamanho: Tamanho | "";
  selfie: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  referencia: string;
}

const FORM_VAZIO: FormData = {
  nome: "", cpf: "", whatsapp: "", email: "", tamanho: "", selfie: "",
  cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "", referencia: "",
};

function InfoPanel() {
  return (
    <div className="lg:sticky lg:top-24 space-y-5">

      {/* Main card */}
      <div
        className="glass-card rounded-2xl p-6 relative overflow-hidden"
        style={{ border: "1px solid rgba(255,51,153,0.18)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,51,153,0.07) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#ff3399]" style={{ filter: "drop-shadow(0 0 5px rgba(255,51,153,0.8))" }} />
            <span className="font-outfit text-[10px] tracking-[0.3em] uppercase text-[rgba(255,51,153,0.65)]">
              Por que preencher?
            </span>
          </div>
          <h3 className="font-cinzel font-bold text-base tracking-wider text-[#FFE699] mb-4">
            PASSAPORTE DA ALEGRIA
          </h3>
          <div className="space-y-3">
            {[
              { icon: CheckCircle, color: "#39ff14", text: "Confirmação de presença oficial" },
              { icon: Shirt,       color: "#ffd700", text: "Confecção do seu abadá personalizado" },
              { icon: Star,        color: "#ff3399", text: "Emissão do Passaporte da Alegria" },
            ].map(({ icon: Icon, color, text }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  style={{ color, filter: `drop-shadow(0 0 4px ${color}90)` }}
                />
                <p className="font-outfit text-xs text-[rgba(255,230,153,0.82)] leading-snug">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event info card */}
      <div
        className="glass-card rounded-2xl p-5"
        style={{ border: "1px solid rgba(201,168,76,0.12)" }}
      >
        <div className="space-y-2 text-center">
          <p
            className="font-cinzel font-black text-xl"
            style={{
              color: "#ff3399",
              textShadow: "0 0 16px rgba(255,51,153,0.7)",
              animation: "neonFlicker 5s ease-in-out infinite",
            }}
          >
            08.02.2027
          </p>
          <p className="font-outfit text-[9px] tracking-[0.35em] uppercase text-[rgba(255,230,153,0.76)]">
            Segunda-feira · 15h
          </p>
          <div className="gold-divider w-10 mx-auto my-2" />
          <p className="font-cinzel font-semibold text-xs tracking-widest text-[rgba(255,230,153,0.80)]">
            Local em breve
          </p>
        </div>
      </div>

      {/* Privacy note */}
      <div
        className="rounded-xl p-4 flex items-start gap-3"
        style={{
          background: "rgba(0,212,255,0.04)",
          border: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <Shield className="w-3.5 h-3.5 text-[#00d4ff] flex-shrink-0 mt-0.5" />
        <p className="font-outfit text-[10px] text-[rgba(255,230,153,0.76)] leading-relaxed">
          Seus dados são usados exclusivamente para organização do evento e confecção do abadá.
        </p>
      </div>
    </div>
  );
}

export default function InscricaoPage() {
  const [form,       setForm]       = useState<FormData>(FORM_VAZIO);
  const [cepStatus,  setCepStatus]  = useState<"idle" | "loading" | "ok" | "notfound" | "error">("idle");
  const [semNumero,  setSemNumero]  = useState(false);
  const [status,     setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");
  const [tamanhoSel, setTamanhoSel] = useState<Tamanho | "">("");
  const [selfieFile, setSelfieFile] = useState<string>("");

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function formatCPF(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    return d.length > 9
      ? `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
      : d.length > 6 ? `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
      : d.length > 3 ? `${d.slice(0, 3)}.${d.slice(3)}`
      : d;
  }

  function formatZap(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    return d.length > 6
      ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
      : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}`
      : d;
  }

  function formatCEP(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 8);
    return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
  }

  // digitou os 8 números: busca rua, bairro, cidade e UF no ViaCEP
  async function onCepChange(v: string) {
    const cep = formatCEP(v);
    setForm((f) => ({ ...f, cep }));
    const digits = cep.replace(/\D/g, "");
    if (digits.length < 8) { setCepStatus("idle"); return; }
    setCepStatus("loading");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) { setCepStatus("notfound"); return; }
      setForm((f) => ({
        ...f,
        rua: data.logradouro || f.rua,
        bairro: data.bairro || f.bairro,
        cidade: data.localidade || f.cidade,
        uf: data.uf || f.uf,
      }));
      setCepStatus("ok");
      // vai direto para o número (ou para a rua, se for um CEP genérico da cidade)
      setTimeout(() => document.getElementById(data.logradouro ? "campo-numero" : "campo-rua")?.focus(), 50);
    } catch {
      setCepStatus("error");
    }
  }

  const enderecoOk =
    form.cep.length === 9 && !!form.rua.trim() && !!form.bairro.trim() &&
    !!form.cidade.trim() && form.uf.length === 2 && (semNumero || !!form.numero.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome.trim() || !form.cpf || !form.whatsapp || !form.email || !tamanhoSel || !enderecoOk) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  const inpClass = [
    "w-full px-4 py-3.5 bg-[rgba(0,0,0,0.45)] border border-[rgba(201,168,76,0.12)]",
    "rounded-xl text-[#FFE699] font-outfit text-sm placeholder:text-[rgba(255,230,153,0.66)]",
    "focus:outline-none transition-all duration-300",
    "focus:border-[rgba(255,51,153,0.5)] focus:shadow-[0_0_0_3px_rgba(255,51,153,0.07),0_0_16px_rgba(255,51,153,0.06)]",
  ].join(" ");

  const labelClass = "font-outfit text-[10px] tracking-[0.22em] uppercase text-[rgba(255,230,153,0.78)] block mb-2";

  return (
    <div className="relative z-10 pt-28 sm:pt-36 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-5">

        {/* Page header */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="section-label pink mb-4">
            <span className="font-outfit text-[9px] tracking-[0.45em] uppercase text-[rgba(255,51,153,0.55)]">
              Confirme sua presença
            </span>
          </div>
          <h1
            className="font-cinzel font-black text-3xl sm:text-5xl tracking-wider text-[#FFE699] mb-3"
            style={{ textShadow: "0 0 28px rgba(255,215,0,0.22)" }}
          >
            PASSAPORTE DA ALEGRIA
          </h1>
          <p className="font-cormorant italic text-lg sm:text-xl text-[rgba(255,230,153,0.79)] max-w-sm mx-auto leading-relaxed">
            Preencha seus dados para garantir presença, abadá e acesso ao evento.
          </p>
          <div className="gold-divider w-16 mx-auto mt-5" />
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="max-w-md mx-auto text-center py-12 space-y-7 fade-up">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
              style={{
                background: "linear-gradient(135deg, rgba(57,255,20,0.12), rgba(255,215,0,0.08))",
                border: "1px solid rgba(57,255,20,0.28)",
                boxShadow: "0 0 36px rgba(57,255,20,0.16)",
                animation: "scaleIn 0.45s ease forwards",
              }}
            >
              <CheckCircle
                className="w-9 h-9"
                style={{ color: "#39ff14", filter: "drop-shadow(0 0 8px #39ff14)" }}
              />
            </div>

            <div>
              <h2 className="font-cinzel font-black text-2xl sm:text-3xl text-[#FFE699] mb-2">
                Presença confirmada!
              </h2>
              <p className="font-outfit text-sm text-[rgba(255,230,153,0.82)] leading-relaxed">
                {form.nome}, seu Passaporte da Alegria está em produção.{" "}
                <span className="text-[#ffd700] font-medium">Nos vemos em 08/02/2027</span>! ✨
              </p>
            </div>

            {/* Summary card */}
            <div
              className="glass-card neon-pink-border rounded-2xl p-6 text-left"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-3.5 h-3.5 text-[#ff3399]" />
                <span className="font-outfit text-[9px] tracking-[0.3em] uppercase text-[rgba(255,51,153,0.55)]">
                  Resumo da inscrição
                </span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Nome",     value: form.nome },
                  { label: "Email",    value: form.email },
                  { label: "Tamanho",  value: tamanhoSel },
                  { label: "Endereço", value: `${form.rua}, ${semNumero ? "s/n" : form.numero}${form.complemento ? ` · ${form.complemento}` : ""} — ${form.bairro}, ${form.cidade}/${form.uf}` },
                  { label: "Status",   value: "Confirmado ✓", accent: true },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="font-outfit text-xs text-[rgba(255,230,153,0.77)]">{label}</span>
                    <span
                      className="font-outfit text-xs font-medium"
                      style={{ color: accent ? "#39ff14" : "#FFE699" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setStatus("idle");
                setForm(FORM_VAZIO);
                setCepStatus("idle");
                setSemNumero(false);
                setTamanhoSel("");
                setSelfieFile("");
              }}
              className="btn-neon px-7 py-3 text-[10px]"
            >
              Nova inscrição
            </button>
          </div>
        ) : (
          /* ── Two-column layout ── */
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">

            {/* Left: Info panel */}
            <InfoPanel />

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Nome */}
              <div>
                <label className={labelClass}>
                  Nome completo <span className="text-[#ff3399]">*</span>
                </label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={set("nome")}
                  placeholder="Como quer que apareça no abadá"
                  required
                  className={inpClass}
                />
              </div>

              {/* CPF + WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    CPF <span className="text-[#ff3399]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.cpf}
                    onChange={(e) => setForm((f) => ({ ...f, cpf: formatCPF(e.target.value) }))}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                    className={inpClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    WhatsApp <span className="text-[#ff3399]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => setForm((f) => ({ ...f, whatsapp: formatZap(e.target.value) }))}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    required
                    className={inpClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>
                  E-mail <span className="text-[#ff3399]">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="seu@email.com"
                  required
                  className={inpClass}
                />
              </div>

              {/* Endereço */}
              <div className="pt-2 space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#ffd700]" style={{ filter: "drop-shadow(0 0 5px rgba(255,215,0,0.6))" }} />
                  <span className="font-cinzel font-bold text-xs tracking-[0.2em] uppercase text-[#FFE699]">Endereço</span>
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.3), transparent)" }} />
                </div>

                {/* CEP */}
                <div>
                  <label className={labelClass} htmlFor="campo-cep">
                    CEP <span className="text-[#ff3399]">*</span>
                  </label>
                  <div className="relative sm:max-w-[220px]">
                    <input
                      id="campo-cep"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      value={form.cep}
                      onChange={(e) => onCepChange(e.target.value)}
                      placeholder="00000-000"
                      maxLength={9}
                      required
                      className={inpClass}
                    />
                    {cepStatus === "loading" && (
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[rgba(255,215,0,0.3)] border-t-[#ffd700] rounded-full animate-spin" />
                    )}
                    {cepStatus === "ok" && (
                      <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#39ff14]" />
                    )}
                  </div>
                  {cepStatus === "notfound" && (
                    <p className="font-outfit text-[11px] text-[#ff3399] mt-2">CEP não encontrado. Confira os números ou preencha o endereço abaixo.</p>
                  )}
                  {cepStatus === "error" && (
                    <p className="font-outfit text-[11px] text-[#ff3399] mt-2">Não consegui buscar o CEP agora. Preencha o endereço abaixo.</p>
                  )}
                  {cepStatus === "idle" && (
                    <p className="font-outfit text-[10px] text-[rgba(255,230,153,0.7)] mt-2">Digite o CEP e o endereço é preenchido sozinho.</p>
                  )}
                </div>

                {/* Rua */}
                <div>
                  <label className={labelClass} htmlFor="campo-rua">
                    Rua / Avenida <span className="text-[#ff3399]">*</span>
                  </label>
                  <input
                    id="campo-rua"
                    type="text"
                    autoComplete="address-line1"
                    value={form.rua}
                    onChange={set("rua")}
                    placeholder="Nome da rua"
                    required
                    className={inpClass}
                  />
                </div>

                {/* Número + Complemento */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div>
                    <label className={labelClass} htmlFor="campo-numero">
                      Número <span className="text-[#ff3399]">*</span>
                    </label>
                    <input
                      id="campo-numero"
                      type="text"
                      inputMode="numeric"
                      value={semNumero ? "S/N" : form.numero}
                      onChange={set("numero")}
                      disabled={semNumero}
                      placeholder="123"
                      required={!semNumero}
                      className={`${inpClass} disabled:opacity-60`}
                    />
                    <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={semNumero}
                        onChange={(e) => { setSemNumero(e.target.checked); if (e.target.checked) setForm((f) => ({ ...f, numero: "" })); }}
                        className="accent-[#ff3399] w-4 h-4"
                      />
                      <span className="font-outfit text-[11px] text-[rgba(255,230,153,0.8)]">Sem número</span>
                    </label>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="campo-complemento">
                      Complemento <span className="normal-case tracking-normal text-[rgba(255,230,153,0.7)]">(opcional)</span>
                    </label>
                    <input
                      id="campo-complemento"
                      type="text"
                      autoComplete="address-line2"
                      value={form.complemento}
                      onChange={set("complemento")}
                      placeholder="Apto, bloco, casa, sala..."
                      className={inpClass}
                    />
                  </div>
                </div>

                {/* Bairro + Cidade + UF */}
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-6 sm:col-span-3">
                    <label className={labelClass} htmlFor="campo-bairro">
                      Bairro <span className="text-[#ff3399]">*</span>
                    </label>
                    <input
                      id="campo-bairro"
                      type="text"
                      value={form.bairro}
                      onChange={set("bairro")}
                      placeholder="Bairro"
                      required
                      className={inpClass}
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label className={labelClass} htmlFor="campo-cidade">
                      Cidade <span className="text-[#ff3399]">*</span>
                    </label>
                    <input
                      id="campo-cidade"
                      type="text"
                      autoComplete="address-level2"
                      value={form.cidade}
                      onChange={set("cidade")}
                      placeholder="Cidade"
                      required
                      className={inpClass}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className={labelClass} htmlFor="campo-uf">
                      UF <span className="text-[#ff3399]">*</span>
                    </label>
                    <input
                      id="campo-uf"
                      type="text"
                      autoComplete="address-level1"
                      value={form.uf}
                      onChange={(e) => setForm((f) => ({ ...f, uf: e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2) }))}
                      placeholder="RO"
                      maxLength={2}
                      required
                      className={`${inpClass} uppercase`}
                    />
                  </div>
                </div>

                {/* Ponto de referência */}
                <div>
                  <label className={labelClass} htmlFor="campo-referencia">
                    Ponto de referência <span className="normal-case tracking-normal text-[rgba(255,230,153,0.7)]">(opcional)</span>
                  </label>
                  <input
                    id="campo-referencia"
                    type="text"
                    value={form.referencia}
                    onChange={set("referencia")}
                    placeholder="Ex.: próximo ao mercado, portão azul"
                    className={inpClass}
                  />
                </div>
              </div>

              {/* Tamanho do abadá */}
              <div>
                <label className={labelClass}>
                  Tamanho do abadá <span className="text-[#ff3399]">*</span>
                </label>

                {/* Abadá mystery preview */}
                <div
                  className="abadá-silhouette rounded-xl p-4 mb-4 flex items-center gap-4 relative overflow-hidden"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                    style={{
                      background: "linear-gradient(180deg, #ff3399, #ffd700, #00d4ff)",
                    }}
                  />
                  <div className="flex-shrink-0 ml-2 flex w-28 sm:w-32 gap-1.5" style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.6))" }}>
                    <Image src="/img/abada-frente.png" alt="Abadá Camarote Savaris, frente" width={631} height={823} sizes="64px" style={{ width: "50%", height: "auto" }} />
                    <Image src="/img/abada-costas.png" alt="Abadá Camarote Savaris, costas" width={627} height={824} sizes="64px" style={{ width: "50%", height: "auto" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-[rgba(255,230,153,0.80)] mb-0.5">
                      Abadá Camarote Savaris
                    </p>
                    <p className="font-outfit text-[10px] text-[rgba(255,230,153,0.70)] leading-snug">
                      Frente e costas, com a arte oficial e os patrocinadores.
                    </p>
                  </div>
                </div>

                {/* Size selector */}
                <div className="grid grid-cols-4 gap-2.5">
                  {TAMANHOS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTamanhoSel(t)}
                      className="py-3.5 rounded-xl border font-cinzel font-black text-sm tracking-wider transition-all duration-300"
                      style={
                        tamanhoSel === t
                          ? {
                              borderColor: "rgba(255,51,153,0.55)",
                              color: "#ff3399",
                              background: "rgba(255,51,153,0.09)",
                              boxShadow: "0 0 18px rgba(255,51,153,0.18), inset 0 0 10px rgba(255,51,153,0.04)",
                            }
                          : {
                              borderColor: "rgba(201,168,76,0.12)",
                              color: "rgba(255,230,153,0.38)",
                            }
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <p className="font-outfit text-[9px] tracking-[0.2em] text-[rgba(255,230,153,0.70)] mt-2 text-center">
                  A expectativa faz parte da experiência.
                </p>
              </div>

              {/* Selfie upload */}
              <div>
                <label className={labelClass}>
                  Selfie para abadá{" "}
                  <span className="normal-case text-[rgba(255,230,153,0.71)] tracking-normal">
                    (opcional)
                  </span>
                </label>
                <div
                  className="relative rounded-xl p-5 text-center cursor-pointer transition-all duration-300 group"
                  style={{
                    background: selfieFile ? "rgba(57,255,20,0.04)" : "rgba(0,0,0,0.35)",
                    border: selfieFile
                      ? "1px dashed rgba(57,255,20,0.3)"
                      : "1px dashed rgba(201,168,76,0.18)",
                  }}
                  onMouseEnter={(e) => {
                    if (!selfieFile) {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.35)";
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.02)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selfieFile) {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.18)";
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.35)";
                    }
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setSelfieFile(e.target.files?.[0]?.name ?? "")}
                  />
                  {selfieFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#39ff14]" />
                      <span className="font-outfit text-xs text-[#39ff14] truncate max-w-[180px]">
                        {selfieFile}
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mx-auto mb-2 text-[rgba(255,215,0,0.73)]" />
                      <p className="font-outfit text-xs text-[rgba(255,230,153,0.75)]">
                        Arraste ou clique para enviar
                      </p>
                      <p className="font-outfit text-[10px] text-[rgba(255,230,153,0.67)] mt-1">
                        PNG, JPG · máx. 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Convidado aviso */}
              <div
                className="glass-card rounded-xl p-4 text-center relative overflow-hidden"
                style={{ border: "1px solid rgba(255,51,153,0.14)" }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(255,51,153,0.04) 0%, transparent 70%)",
                  }}
                />
                <p className="font-outfit text-xs sm:text-sm text-[rgba(255,255,255,0.62)] leading-relaxed italic relative z-10">
                  Você já sabe né maninho, mas não custa lembrar:{" "}
                  <span className="text-[#ff3399] font-semibold not-italic">
                    convidado não convida.
                  </span>
                </p>
              </div>

              {/* Error */}
              {status === "error" && (
                <div className="flex items-center gap-2 text-[#ff3399] text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="font-outfit">Erro ao enviar. Tente novamente.</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  status === "loading" ||
                  !form.nome.trim() ||
                  form.cpf.length < 14 ||
                  form.whatsapp.length < 14 ||
                  !form.email ||
                  !tamanhoSel ||
                  !enderecoOk
                }
                className="cta-rainbow w-full py-4 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ fontSize: "0.78rem" }}
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Confirmando presença...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    <Sparkles className="w-4 h-4" />
                    Confirmar minha presença
                    <ChevronRight className="w-4 h-4" />
                  </span>
                )}
              </button>

              {/* Mandatory note */}
              <p className="font-outfit text-[9px] text-[rgba(255,230,153,0.70)] text-center tracking-wide leading-relaxed">
                Campos obrigatórios para confirmação de presença, confecção do abadá e emissão do Passaporte da Alegria.
              </p>
            </form>
          </div>
        )}

        {/* Back link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="font-outfit text-[10px] tracking-widest uppercase text-[rgba(255,230,153,0.71)] hover:text-[rgba(255,230,153,0.86)] transition-colors duration-300"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
