"use client";

import dynamic from "next/dynamic";

// Preload eagerly so bundle fetches in parallel with page render
const ditherImport = import("./components/Dither");
const Dither = dynamic(() => ditherImport, { ssr: false });
import VisionMision from "./components/VisionMision";
import Servicios from "./components/Servicios";
import Resultados from "./components/Resultados";
import Contacto from "./components/Contacto";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [subtitleWidth, setSubtitleWidth] = useState<number | undefined>();

  useEffect(() => {
    const update = () => {
      if (h1Ref.current) setSubtitleWidth(h1Ref.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[var(--brand-accent)] flex flex-col md:flex-row items-stretch pt-16 min-h-[85vh]">
        {/* Left: text */}
        <div className="relative z-20 flex flex-col justify-center gap-5 px-6 md:pl-48 md:pr-16 py-16 md:py-0 md:w-[60%]">
          <h1
            ref={h1Ref}
            className="font-black tracking-tight text-[var(--brand-primary)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, maxWidth: "620px" }}
          >
            El desarrollo tecnologico de tú negocio comienza hoy.
          </h1>

          <p
            className="text-[var(--brand-text-secondary)] font-light"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", maxWidth: subtitleWidth }}
          >
            Desde páginas para que des tus primeros pasos hasta automatizaciones para mejorar cualquier proceso, somos tus socios técnicos.
          </p>

          <div className="flex flex-row items-center gap-4 mt-2">
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-md text-white font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ background: "var(--brand-primary)" }}
            >
              Agendar demo
            </a>
            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wide border transition-colors hover:bg-[var(--brand-accent)]"
              style={{ borderColor: "var(--brand-primary)", color: "var(--brand-primary)" }}
            >
              Conoce más
            </a>
          </div>
        </div>

        {/* Right: video */}
        <div className="relative md:w-[40%] min-h-[45vh] md:min-h-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Bottom curve */}
        <svg
          className="absolute bottom-0 left-0 w-full z-20 text-[var(--brand-surface)]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: "60px" }}
        >
          <path fill="currentColor" d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" />
        </svg>
      </section>

      <VisionMision />
      <Servicios />
      <Resultados />
      <Contacto />

      <footer className="bg-[var(--brand-text-primary)] py-12 px-6 text-center flex flex-col items-center gap-6">
        <nav className="flex items-center gap-6">
          {[
            { label: "Facebook", href: "https://www.facebook.com/" },
            { label: "Instagram", href: "https://www.instagram.com/ttmagency.ok/" },
            { label: "WhatsApp", href: "https://wa.me/5491171410652" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 hover:text-[var(--brand-primary)]"
            >
              {social.label}
            </a>
          ))}
        </nav>

        <div className="w-10 h-px bg-white/15" />

        <p className="text-white/40 text-sm uppercase tracking-widest">
          © {new Date().getFullYear()} TTM Agencia — Todos los derechos reservados
        </p>
      </footer>
    </>
  );
}
