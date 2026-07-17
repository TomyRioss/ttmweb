"use client";

import { useRef } from "react";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Sleekstyles",
    category: "E-Commerce",
    desc: "E-commerce completo con integración a CRM y ERP",
    img: "/portfolio/sleekstyles/sleekstyles.png",
  },
  {
    id: 2,
    title: "Andrea Real State",
    category: "Inmobiliaria",
    desc: "Catálogo inmobiliario con sistema de administración simplificada y captación de prospectos",
    img: "/portfolio/andraderealstate/Captura de pantalla (137).png",
  },
  {
    id: 3,
    title: "Krayson Studio",
    category: "Estudio Técnico",
    desc: "Página web completa para estudio técnico incluyendo pagos integrados",
    img: "/portfolio/kraysonstudio/krayson.png",
  },
  {
    id: 4,
    title: "SummerMK",
    category: "Marketing",
    desc: "Landing page para agencia de Marketing de alto nivel con diseño minimalista",
    img: "/portfolio/summermk/Captura de pantalla (134).png",
  },
  {
    id: 5,
    title: "PlatoRest",
    category: "Gastronomía",
    desc: "Sistema de fidelización, gestión de inventario y cobros para gastronomía",
    img: "/portfolio/platorest/platorest.png",
  },
];

export default function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    trackRef.current.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (!trackRef.current) return;
    trackRef.current.style.cursor = "grab";
    trackRef.current.style.userSelect = "";
  };

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = 340;
    trackRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="bg-[var(--brand-surface)] py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">

          {/* Left — text */}
          <div className="md:w-56 flex-shrink-0">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--brand-text-primary)] leading-none mb-4">
              Port<br />folio
            </h2>
            <div
              className="h-1 w-12 rounded-full mb-6"
              style={{ background: "var(--brand-primary)" }}
            />
            <p className="text-[var(--brand-text-secondary)] leading-relaxed text-base">
              Proyectos que combinan diseño de alto impacto con tecnología precisa. Cada trabajo es una solución real para un negocio real.
            </p>

            {/* Arrows */}
            <div className="flex gap-3 mt-10">
              <button
                onClick={() => scroll("left")}
                aria-label="Anterior"
                className="w-11 h-11 rounded-full border border-[var(--brand-accent)] bg-white flex items-center justify-center text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)] hover:text-white hover:border-[var(--brand-primary)] transition-all duration-200"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Siguiente"
                className="w-11 h-11 rounded-full border border-[var(--brand-accent)] bg-white flex items-center justify-center text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)] hover:text-white hover:border-[var(--brand-primary)] transition-all duration-200"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right — carousel */}
          <div className="flex-1 min-w-0">
            <div
              ref={trackRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {PORTFOLIO_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[480px] group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <span className="text-white/70 text-xs uppercase tracking-widest font-semibold mb-1">
                        {item.category}
                      </span>
                      <span className="text-white font-bold text-lg leading-tight mb-1">
                        {item.title}
                      </span>
                      <span className="text-white/80 text-sm leading-snug">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 px-1">
                    <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--brand-primary)" }}>
                      {item.category}
                    </p>
                    <p className="text-[var(--brand-text-primary)] font-semibold mt-0.5">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
