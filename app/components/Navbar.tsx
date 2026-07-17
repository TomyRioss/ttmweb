"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#portfolio" },
  { label: "Resultados", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 select-none"
          >
            <span
              className="text-xl font-black tracking-widest uppercase"
              style={{ color: "var(--brand-primary)" }}
            >
              TTM
            </span>
            <span className="text-xl font-light tracking-widest uppercase text-[var(--brand-text-primary)]">
              Agencia
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.label === "Contacto" ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 text-white hover:opacity-90"
                  style={{ background: "var(--brand-primary)" }}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium uppercase tracking-widest text-[var(--brand-text-primary)] transition-colors duration-200 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--brand-primary)] after:transition-all after:duration-200 hover:after:w-full"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
          >
            {[
              { transform: open ? "translateY(7px) rotate(45deg)" : "none", opacity: 1 },
              { transform: "none", opacity: open ? 0 : 1 },
              { transform: open ? "translateY(-7px) rotate(-45deg)" : "none", opacity: 1 },
            ].map((style, i) => (
              <span
                key={i}
                className="block w-6 h-px transition-all duration-300 origin-center"
                style={{
                  ...style,
                  background: "var(--brand-text-primary)",
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8 bg-white transition-all duration-400"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-2xl font-light uppercase tracking-[0.2em] text-[var(--brand-text-primary)] hover:text-[var(--brand-primary)] transition-colors duration-200 cursor-pointer"
            style={{
              transform: open ? "translateY(0)" : "translateY(12px)",
              opacity: open ? 1 : 0,
              transition: `opacity 400ms ${i * 60}ms, transform 400ms ${i * 60}ms, color 200ms`,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
