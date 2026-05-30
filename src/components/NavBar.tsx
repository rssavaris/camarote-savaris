"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/",          label: "Home" },
  { href: "/presentes", label: "Presentes" },
  { href: "/inscricao", label: "Inscrição" },
  { href: "/admin",     label: "Admin", admin: true },
];

export default function NavBar() {
  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(0,0,0,0.88)] backdrop-blur-2xl border-b border-[rgba(201,168,76,0.1)] shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center group select-none">
            <Image
              src="/img/IMG_8379.png"
              alt="Camarote Savaris"
              width={320}
              height={120}
              style={{
                height: "36px",
                width: "auto",
                filter: "drop-shadow(0 0 6px rgba(255,215,0,0.3))",
                transition: "filter 0.3s",
              }}
              className="group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-outfit transition-all duration-300 rounded-full",
                  pathname === l.href
                    ? "text-[#FFE699] font-semibold"
                    : "text-[rgba(255,230,153,0.5)] hover:text-[rgba(255,230,153,0.9)]",
                  l.admin
                    ? "border border-[rgba(201,168,76,0.18)] hover:border-[rgba(201,168,76,0.45)] ml-2"
                    : "",
                ].join(" ")}
                style={
                  pathname === l.href
                    ? {
                        background: "rgba(255,215,0,0.06)",
                        boxShadow: "0 0 18px rgba(255,215,0,0.04) inset",
                      }
                    : {}
                }
              >
                {l.label}
                {pathname === l.href && (
                  <span
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "#ffd700", boxShadow: "0 0 6px #ffd700" }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/inscricao"
              className="text-[9px] tracking-[0.15em] uppercase font-outfit px-3 py-1.5 rounded-full"
              style={{
                background: "linear-gradient(90deg, rgba(255,51,153,0.15), rgba(255,215,0,0.1))",
                border: "1px solid rgba(255,51,153,0.25)",
                color: "#ff3399",
              }}
            >
              Inscrição
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="p-1.5 text-[#C9A84C] hover:text-[#FFE699] transition-colors duration-300"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        <div
          className="backdrop-blur-2xl border-t border-[rgba(201,168,76,0.08)] px-5 pb-5 pt-3 space-y-0.5"
          style={{ background: "rgba(0,0,0,0.94)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={[
                "flex items-center justify-between px-4 py-3 text-[10px] tracking-[0.2em] uppercase rounded-xl transition-all duration-200 font-outfit",
                pathname === l.href
                  ? "text-[#FFE699] bg-[rgba(255,215,0,0.07)]"
                  : "text-[rgba(255,230,153,0.5)] hover:text-[#FFE699] hover:bg-[rgba(255,215,0,0.03)]",
              ].join(" ")}
            >
              <span>{l.label}</span>
              {l.admin && (
                <span className="text-[8px] px-1.5 py-0.5 rounded border border-[rgba(201,168,76,0.18)] text-[rgba(201,168,76,0.45)]">
                  WP
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
