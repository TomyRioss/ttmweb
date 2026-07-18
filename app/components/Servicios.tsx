"use client";

const SERVICES = [
  {
    title: "Desarrollo Web",
    img: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=900",
    items: [
      "Landing Pages",
      "Desarrollo Web Personalizado",
      "Desarrollo de Sitios E-Commerce",
      "Sitios Web Inmobiliarias",
    ],
  },
  {
    title: "Automatizaciones",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=900",
    items: [
      "Soporte Automatizado",
      "Cualificación Automatizada",
      "Automatizaciones a medida",
      "Chatbot integrado",
      "Whatsapp Automatizado",
    ],
  },
];

export default function Servicios() {
  const scrollToContact = () => {
    const el = document.querySelector("#contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicios" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-3"
              style={{ color: "var(--brand-primary)" }}
            >
              Lo que hacemos
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--brand-text-primary)]">
              Servicios
            </h2>
            <p className="sr-only">
              Agencia de programación y diseño web: programador web, diseñador web y desarrollo de sitios web a medida.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="text-sm font-semibold text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
          >
            Consultar →
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {SERVICES.map(({ title, img, items }) => (
            <div key={title} className="group cursor-pointer" onClick={scrollToContact}>

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-[16/5] mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: "var(--brand-primary)" }}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-black uppercase tracking-wide text-[var(--brand-text-primary)] mb-3">
                {title}
              </h3>

              {/* Sub-items */}
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="text-base font-medium text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)] transition-colors duration-150 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
