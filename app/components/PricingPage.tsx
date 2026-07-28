"use client";
import { useTranslations } from "next-intl";

const plans = [
  { name: "Gratis", price: 0, features: ["1 auditoría única", "Reporte básico", "5 issues detectados", "Sin seguimiento"], cta: "Pedí tu auditoría", href: "/audit", featured: false },
  { name: "Starter", price: 19, unit: "USD/mes", features: ["Auditorías semanales", "Reporte detallado", "Tracking de rankings", "Email de soporte", "1 sitio web"], cta: "Elegir Starter", href: "#", featured: false },
  { name: "Growth", price: 49, unit: "USD/mes", features: ["Auditorías diarias", "Reportes a tu equipo", "DataForSEO rankings", "Soporte prioritario", "Hasta 3 sitios", "Recomendaciones IA"], cta: "Elegir Growth", href: "#", featured: true },
  { name: "Enterprise", price: 99, unit: "USD/mes", features: ["Todo lo de Growth", "Sitios ilimitados", "API personalizada", "Soporte 24/7", "Gerente dedicado"], cta: "Contactar", href: "/contact", featured: false },
];

export default function PricingPage() {
  const t = useTranslations();
  return (
    <main className="min-h-screen pt-24">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Planes</h1>
        <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">Automatizá tu crecimiento con auditorías SEO periódicas y reportes detallados.</p>
        <div className="grid md:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-xl border p-6 flex flex-col ${p.featured ? 'border-blue-500 bg-blue-500/10 scale-105' : 'border-white/10 bg-white/5'}`}>
              {p.featured && <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Recomendado</span>}
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <p className="text-3xl font-black mb-4">${p.price}<span className="text-sm font-normal text-white/50">/{p.unit?.split("/")[1] || "mes"}</span></p>
              <ul className="space-y-2 mb-8 flex-1">
                {p.features.map((f, i) => <li key={i} className="flex items-start gap-2 text-sm"><span className="text-green-400 mt-0.5">✓</span>{f}</li>)}
              </ul>
              <a href={p.href} className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-colors ${p.featured ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10 hover:bg-white/20'}`}>{p.cta}</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
