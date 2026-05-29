"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Download, Users, RefreshCw, CheckCircle, Image, Shirt, BarChart2, TrendingUp } from "lucide-react";

interface Confirmation {
  id: string;
  nome: string;
  cpf: string;
  whatsapp: string;
  email: string;
  tamanho: string;
  selfie: string;
  timestamp: string;
}

const ADMIN_STATS = [
  { label: "Confirmações",  value: 47,    icon: Users,     color: "#ffd700",  sub: "+3 hoje" },
  { label: "Abadás pedidos", value: 44,   icon: Shirt,     color: "#ff3399",  sub: "93% do total" },
  { label: "Selfies",        value: 38,   icon: Image,     color: "#00d4ff",  sub: "81% com foto" },
  { label: "Conversão",      value: "89%", icon: TrendingUp, color: "#39ff14", sub: "↑ 5% semana" },
];

const FAKE_LIST: Confirmation[] = [
  { id: "1", nome: "Ana Lucia Ferreira",    cpf: "123.456.789-00", whatsapp: "(69) 99999-0001", email: "ana.ferreira@email.com",   tamanho: "M",  selfie: "sim", timestamp: "2026-05-20T14:23:00" },
  { id: "2", nome: "Bruno Souza Costa",     cpf: "234.567.890-11", whatsapp: "(69) 99999-0002", email: "bruno.costa@email.com",    tamanho: "GG", selfie: "sim", timestamp: "2026-05-20T15:45:00" },
  { id: "3", nome: "Carla Oliveira Santos", cpf: "345.678.901-22", whatsapp: "(69) 99999-0003", email: "carla.santos@email.com",   tamanho: "P",  selfie: "não", timestamp: "2026-05-21T09:12:00" },
  { id: "4", nome: "Daniel Lima Rocha",     cpf: "456.789.012-33", whatsapp: "(69) 99999-0004", email: "daniel.rocha@email.com",   tamanho: "G",  selfie: "sim", timestamp: "2026-05-21T11:30:00" },
  { id: "5", nome: "Edna Maria Pereira",    cpf: "567.890.123-44", whatsapp: "(69) 99999-0005", email: "edna.pereira@email.com",   tamanho: "M",  selfie: "sim", timestamp: "2026-05-22T08:55:00" },
  { id: "6", nome: "Felipe Almeida Reis",   cpf: "678.901.234-55", whatsapp: "(69) 99999-0006", email: "felipe.reis@email.com",    tamanho: "M",  selfie: "sim", timestamp: "2026-05-22T16:20:00" },
  { id: "7", nome: "Gabriela Souza Lima",   cpf: "789.012.345-66", whatsapp: "(69) 99999-0007", email: "gabi.lima@email.com",      tamanho: "P",  selfie: "não", timestamp: "2026-05-23T10:05:00" },
  { id: "8", nome: "Henrique Costa Barros", cpf: "890.123.456-77", whatsapp: "(69) 99999-0008", email: "henrique.barros@email.com", tamanho: "GG", selfie: "sim", timestamp: "2026-05-23T13:40:00" },
];

const TAMANHO_STATS = [
  { tamanho: "P",  qtde: 11, pct: 25, color: "#00d4ff" },
  { tamanho: "M",  qtde: 20, pct: 45, color: "#ff3399" },
  { tamanho: "G",  qtde:  9, pct: 20, color: "#ffd700" },
  { tamanho: "GG", qtde:  4, pct:  9, color: "#7b61ff" },
];

export default function AdminPage() {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [search,  setSearch]  = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/confirm");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setConfirmations(data.confirmations ?? []);
    } catch {
      setConfirmations(FAKE_LIST);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = confirmations.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  function exportCSV() {
    const header = "Nome,CPF,WhatsApp,E-mail,Tamanho,Selfie,Data\n";
    const rows = confirmations
      .map((c) =>
        `"${c.nome}","${c.cpf}","${c.whatsapp}","${c.email}","${c.tamanho}","${c.selfie}","${new Date(c.timestamp).toLocaleString("pt-BR")}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "confirmacoes-camarote-savaris.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="relative z-10 pt-28 sm:pt-36 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-label gold mb-3">
            <span className="font-outfit text-[9px] tracking-[0.45em] uppercase text-[rgba(255,215,0,0.4)]">
              Dashboard
            </span>
          </div>
          <h1
            className="font-cinzel font-black text-3xl sm:text-5xl tracking-wider text-[#FFE699] mb-1"
            style={{ textShadow: "0 0 24px rgba(255,215,0,0.22)" }}
          >
            PAINEL ADMIN
          </h1>
          <p className="font-outfit text-[10px] tracking-[0.35em] uppercase text-[rgba(255,230,153,0.35)]">
            Camarote Savaris · Gestão
          </p>
          <div className="gold-divider w-16 mx-auto mt-4" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {ADMIN_STATS.map(({ label, value, icon: Icon, color, sub }) => (
            <div
              key={label}
              className="glass-card rounded-2xl px-4 py-5 relative overflow-hidden transition-all duration-300"
              style={{
                border: `1px solid ${color}18`,
                boxShadow: `0 0 20px ${color}08`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${color}30`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${color}12`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${color}18`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${color}08`;
              }}
            >
              {/* Bg tint */}
              <div
                className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 100% 0%, ${color}10 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <Icon
                    className="w-4 h-4"
                    style={{ color, filter: `drop-shadow(0 0 5px ${color}90)` }}
                  />
                </div>
                <p className="font-outfit text-[9px] tracking-[0.25em] uppercase text-[rgba(255,230,153,0.38)] mb-1">
                  {label}
                </p>
                <p
                  className="font-cinzel font-black text-2xl sm:text-3xl leading-none mb-1"
                  style={{ color, textShadow: `0 0 16px ${color}50` }}
                >
                  {value}
                </p>
                <p className="font-outfit text-[9px] text-[rgba(255,230,153,0.28)]">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Size distribution */}
        <div
          className="glass-card rounded-2xl p-5 sm:p-6 mb-5"
          style={{ border: "1px solid rgba(255,51,153,0.12)" }}
        >
          <h3 className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-[#FFE699] mb-5 flex items-center gap-2">
            <BarChart2 className="w-3.5 h-3.5 text-[#ff3399]" />
            Distribuição por tamanho
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TAMANHO_STATS.map(({ tamanho, qtde, pct, color }) => (
              <div key={tamanho} className="text-center">
                <p
                  className="font-cinzel font-black text-2xl mb-0.5"
                  style={{ color, textShadow: `0 0 12px ${color}60` }}
                >
                  {tamanho}
                </p>
                <p className="font-outfit text-[10px] text-[rgba(255,230,153,0.38)] mb-2.5">
                  {qtde} unid.
                </p>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${color}80, ${color})`,
                      boxShadow: `0 0 8px ${color}60`,
                    }}
                  />
                </div>
                <p className="font-outfit text-[9px] text-[rgba(255,230,153,0.3)] mt-1.5">
                  {pct}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div
            className="glass-card rounded-xl px-4 py-3 flex items-center gap-3"
            style={{ border: "1px solid rgba(201,168,76,0.12)" }}
          >
            <Users className="w-4 h-4 text-[#ffd700]" style={{ filter: "drop-shadow(0 0 4px rgba(255,215,0,0.7))" }} />
            <div>
              <p className="font-outfit text-[9px] tracking-[0.2em] uppercase text-[rgba(255,230,153,0.35)]">
                Total
              </p>
              <p className="font-cinzel font-black text-xl text-[#FFE699] leading-none">
                {confirmations.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="btn-neon flex items-center gap-1.5 px-3.5 py-2"
              style={{ fontSize: "0.65rem" }}
            >
              <RefreshCw className="w-3 h-3" />
              Atualizar
            </button>
            <button
              onClick={exportCSV}
              disabled={confirmations.length === 0}
              className="btn-gold flex items-center gap-1.5 px-3.5 py-2 disabled:opacity-30"
              style={{ fontSize: "0.65rem" }}
            >
              <Download className="w-3 h-3" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,230,153,0.28)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.4)] border border-[rgba(201,168,76,0.1)] rounded-xl text-[#FFE699] font-outfit text-sm placeholder:text-[rgba(255,230,153,0.16)] focus:outline-none focus:border-[rgba(255,51,153,0.4)] transition-colors"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16">
            <span className="font-outfit text-sm text-[rgba(255,230,153,0.35)]">Carregando...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="font-outfit text-sm text-[rgba(255,230,153,0.3)]">
              {search ? "Nenhum resultado encontrado." : "Nenhuma confirmação ainda."}
            </span>
          </div>
        ) : (
          <div
            className="glass-card rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,51,153,0.15)" }}
          >
            {/* Top border */}
            <div className="h-px w-full" style={{
              background: "linear-gradient(90deg, transparent, rgba(255,51,153,0.3), rgba(255,215,0,0.25), rgba(255,51,153,0.3), transparent)",
            }} />

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {["Nome", "CPF", "WhatsApp", "E-mail", "Tamanho", "Selfie", "Data"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3.5 text-left font-outfit text-[9px] tracking-[0.25em] uppercase text-[rgba(255,230,153,0.35)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr
                      key={c.id}
                      className="transition-colors duration-200"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        background: i % 2 === 0 ? "rgba(255,255,255,0.008)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.background = "rgba(255,51,153,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.background =
                          i % 2 === 0 ? "rgba(255,255,255,0.008)" : "transparent";
                      }}
                    >
                      <td className="px-4 py-3 font-outfit font-medium text-[#FFE699] whitespace-nowrap">
                        {c.nome}
                      </td>
                      <td className="px-4 py-3 font-outfit text-[rgba(255,230,153,0.42)] text-xs whitespace-nowrap">
                        {c.cpf}
                      </td>
                      <td className="px-4 py-3 font-outfit text-[rgba(255,230,153,0.42)] text-xs whitespace-nowrap">
                        {c.whatsapp}
                      </td>
                      <td className="px-4 py-3 font-outfit text-[rgba(255,230,153,0.42)] text-xs">
                        {c.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-cinzel font-black tracking-wider"
                          style={{
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "rgba(255,51,153,0.28)",
                            color: "#ff3399",
                            background: "rgba(255,51,153,0.07)",
                          }}
                        >
                          {c.tamanho}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {c.selfie === "sim" ? (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-outfit" style={{ color: "#39ff14" }}>
                            <CheckCircle className="w-3 h-3" />
                            Enviada
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-outfit text-[rgba(255,230,153,0.28)]">
                            <Image className="w-3 h-3" />
                            Pendente
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-outfit text-[rgba(255,230,153,0.28)] text-xs whitespace-nowrap">
                        {new Date(c.timestamp).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Back */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="font-outfit text-[10px] tracking-widest uppercase text-[rgba(255,230,153,0.25)] hover:text-[rgba(255,230,153,0.65)] transition-colors duration-300"
          >
            ← Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
