"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AuditPage() {
  const t = useTranslations("audit");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, email }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.report) setReport(data.report);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const features = t.raw("features") as string[];
  const [report, setReport] = useState<any>(null);

  return (
    <main className="min-h-screen pt-24">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-lg text-white/70 mb-8">{t("heroSub")}</p>

            <div className="space-y-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2">{t("successTitle")}</h2>
                <p className="text-white/70">{t("successDesc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">{t("formTitle")}</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("urlLabel")}
                  </label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t("urlPlaceholder")}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("emailLabel")}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 font-semibold transition-colors"
                >
                  {status === "loading" ? t("processing") : t("submit")}
                </button>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">
                    {t("errorDesc")}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
