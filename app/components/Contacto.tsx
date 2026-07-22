"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

type Tab = "agendar" | "contactar";

function CalendlyWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      data-url="https://calendly.com/tomyrios2006/reunion-de-presentacion"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}

export default function Contacto() {
  const t = useTranslations("contact");
  const [tab, setTab] = useState<Tab>("agendar");

  return (
    <section id="contacto" className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--brand-text-primary)]">
            {t("heading")}
          </h2>
          <div
            className="mt-4 mx-auto h-1 w-16 rounded-full"
            style={{ background: "var(--brand-primary)" }}
          />
          <p className="mt-6 text-[var(--brand-text-secondary)] text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 p-1 bg-gray-100 rounded-xl w-fit mx-auto">
          {(["agendar", "contactar"] as Tab[]).map((tKey) => (
            <button
              key={tKey}
              onClick={() => setTab(tKey)}
              className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer"
              style={
                tab === tKey
                  ? { background: "var(--brand-primary)", color: "#fff" }
                  : { color: "var(--brand-text-secondary)" }
              }
            >
              {tKey === "agendar" ? t("tabAgendar") : t("tabContactar")}
            </button>
          ))}
        </div>

        {tab === "agendar" ? (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <p className="md:w-48 shrink-0 text-[var(--brand-text-primary)] text-lg font-semibold leading-snug md:pt-8 underline decoration-[var(--brand-primary)] decoration-4 underline-offset-4">
              {t("scheduleHint")}
            </p>
            <div className="flex-1 min-w-0">
              <CalendlyWidget />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <a
              href="https://wa.me/5491171410652"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold uppercase tracking-widest text-sm transition-opacity hover:opacity-90"
              style={{ background: "#25D366" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t("whatsappCta")}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
