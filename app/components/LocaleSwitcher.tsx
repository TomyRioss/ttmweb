"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const LOCALES = ["es", "en"] as const;

export default function LocaleSwitcher({ mobile = false }: { mobile?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={mobile ? "flex items-center gap-3" : "flex items-center gap-2"}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          <Link
            href={pathname}
            locale={l}
            className={`text-sm font-medium uppercase tracking-widest transition-colors duration-200 ${
              l === locale
                ? "text-[var(--brand-primary)] font-bold"
                : "text-[var(--brand-text-secondary)] hover:text-[var(--brand-primary)]"
            }`}
          >
            {l}
          </Link>
          {i === 0 && <span className="text-[var(--brand-text-secondary)]">/</span>}
        </span>
      ))}
    </div>
  );
}
