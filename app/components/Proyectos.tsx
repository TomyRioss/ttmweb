import Image from "next/image";

const PROJECTS = [
  {
    title: "SleekStyles",
    category: "Desarrollo Web",
    description: "E-commerce completo con integración a CRM y ERP.",
    tags: ["E-commerce", "CRM", "ERP"],
    image: "/portfolio/sleekstyles/sleekstyles.png",
  },
  {
    title: "Andrea Real State",
    category: "Desarrollo Web",
    description: "Catálogo inmobiliario con sistema de administración simplificada y captación de prospectos.",
    tags: ["Real Estate", "Admin", "Leads"],
    image: "/portfolio/andraderealstate/Captura de pantalla (137).png",
  },
  {
    title: "Krayson Studio",
    category: "Desarrollo Web",
    description: "Página web completa para estudio técnico incluyendo pagos integrados.",
    tags: ["Studio", "Pagos", "Web"],
    image: "/portfolio/kraysonstudio/krayson.png",
  },
  {
    title: "SummerMK",
    category: "Landing Page",
    description: "Landing page para agencia de Marketing de alto nivel con diseño minimalista.",
    tags: ["Marketing", "Landing", "Minimalista"],
    image: "/portfolio/summermk/Captura de pantalla (134).png",
  },
  {
    title: "PlatoRest",
    category: "Desarrollo Web",
    description: "Sistema de fidelización, gestión de inventario y cobros para gastronomía.",
    tags: ["Fidelización", "Inventario", "Cobros"],
    image: "/portfolio/platorest/platorest.png",
  },
];

export default function Proyectos() {
  return (
    <section id="proyectos" className="bg-[var(--brand-surface)] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--brand-primary)" }}
          >
            Nuestro trabajo
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--brand-text-primary)]">
            Proyectos
          </h2>
          <div
            className="mt-4 mx-auto h-1 w-16 rounded-full"
            style={{ background: "var(--brand-primary)" }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map(({ title, category, description, tags, image }) => (
            <div
              key={title}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-56 overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <span
                  className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-3 px-3 py-1 rounded-full"
                  style={{
                    color: "var(--brand-primary)",
                    background: "var(--brand-accent)",
                  }}
                >
                  {category}
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-[var(--brand-text-primary)]">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--brand-text-secondary)] mb-4">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded font-mono bg-gray-100 text-[var(--brand-text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
