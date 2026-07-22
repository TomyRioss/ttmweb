"use client";

import { useTranslations } from "next-intl";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Resultados() {
  const t = useTranslations("results");
  const testimonials = t.raw("testimonials") as { quote: string; author: string; role: string }[];
  const bullets = t.raw("bullets") as string[];
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonios"
      className="bg-[var(--brand-text-primary)] py-24 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            {t("heading")}
          </h2>
          <div
            className="h-1 w-16 rounded-full mb-8"
            style={{ background: "var(--brand-primary)" }}
          />
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-sm">
            {t("tagline")}
          </p>

          <ul className="flex flex-col gap-3">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "var(--brand-primary)" }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-white/80 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — infinite vertical carousel */}
        <div className="relative h-[480px] overflow-hidden">
          {/* fade top */}
          <div className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none bg-gradient-to-b from-[#1a1a1a] to-transparent" />
          {/* fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none bg-gradient-to-t from-[#1a1a1a] to-transparent" />

          <div className="animate-scroll-y hover:[animation-play-state:paused] flex flex-col gap-4">
            {doubled.map(({ quote, author, role }, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-shrink-0"
              >
                <p className="text-white/80 text-sm leading-relaxed italic mb-5">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                    style={{ background: "var(--brand-primary)" }}
                  >
                    {initialsOf(author)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{author}</div>
                    <div
                      className="text-xs uppercase tracking-widest"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
