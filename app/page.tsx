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
      <section className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center">
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Dither overlay — grey, very transparent */}
        <div className="absolute inset-0 z-10 opacity-[0.18] mix-blend-screen animate-[fadeIn_0.8s_ease-in_forwards]">
          <Dither
            waveColor={[1.0, 0.85, 0.7]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={3.6}
            waveAmplitude={0.37}
            waveFrequency={2.4}
            waveSpeed={0.02}
          />
        </div>

        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,107,0,0.08)_0%,transparent_100%)]" />

        <div className="relative z-20 flex flex-col items-start gap-3 text-left px-6 w-fit">
          <h1
            ref={h1Ref}
            className="select-none tracking-[0.25em] uppercase"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)", color: "var(--brand-primary)" }}
          >
            TTM
            <span className="ml-4 font-bold text-white">
              Agencia
            </span>
          </h1>

          <p
            className="text-white/60 text-lg font-light tracking-wide"
            style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", maxWidth: subtitleWidth }}
          >
            Desarrollo web de alto impacto y automatizaciones inteligentes para
            escalar tu negocio.
          </p>

          <button
            onClick={() => {
              const el = document.querySelector("#vision");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-4 flex flex-row items-center gap-2 cursor-pointer group"
          >
            <span className="italic text-[#FF6B00] text-xl tracking-wide group-hover:text-[#FF8C38] transition-colors">
              Conoce más
            </span>
            <svg
              className="w-5 h-5 text-[#FF6B00] group-hover:text-[#FF8C38] transition-colors animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </button>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-10 bg-[#1A1A1A] animate-pulse" />
          <span className="text-[#1A1A1A] text-xs uppercase tracking-[0.3em]">Scroll</span>
        </div>
      </section>

      <VisionMision />
      <Servicios />
      <Resultados />
      <Contacto />

      <footer className="bg-[var(--brand-text-primary)] py-10 px-6 text-center">
        <p className="text-white/40 text-sm uppercase tracking-widest">
          © {new Date().getFullYear()} TTM Agencia — Todos los derechos reservados
        </p>
      </footer>
    </>
  );
}
