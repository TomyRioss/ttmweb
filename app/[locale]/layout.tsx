import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TransitionProvider } from "../components/TransitionContext";
import PageTransition from "../components/PageTransition";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";
import { PostHogProvider } from "../components/PostHogProvider";
import { PostHogPageView } from "../components/PostHogPageView";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";

const rinter = localFont({
  src: "../../public/fonts/Rinter.woff2",
  variable: "--font-rinter",
  display: "swap",
});

const siteUrl = "https://ttmagencia.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: {
      canonical: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      languages: {
        es: siteUrl,
        en: `${siteUrl}/en`,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_AR",
      url: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      siteName: "TTM Agencia",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "jsonLd" });

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TTM Agencia",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    description: t("orgDescription"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+54-911-7141-0652",
      contactType: "customer service",
      areaServed: "AR",
      availableLanguage: locale === "en" ? "English" : "Spanish",
    },
    sameAs: [
      "https://www.instagram.com/ttmagency.ok/",
      "https://wa.me/5491171410652",
    ],
  };

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: t.raw("serviceTypes") as string[],
    provider: { "@type": "Organization", name: "TTM Agencia", url: siteUrl },
    areaServed: { "@type": "Country", name: "Argentina" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t("catalogName"),
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: t("webDevCatalog"),
          itemListElement: (t.raw("webDevItems") as string[]).map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
        {
          "@type": "OfferCatalog",
          name: t("automationCatalog"),
          itemListElement: (t.raw("automationItems") as string[]).map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      ],
    },
  };

  return (
    <html lang={locale} className={`${rinter.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
        <NextIntlClientProvider>
          <PostHogProvider>
            <Suspense fallback={null}>
              <PostHogPageView />
            </Suspense>
            <TransitionProvider>
              <Navbar />
              <PageTransition />
              {children}
            </TransitionProvider>
          </PostHogProvider>
          <ChatWidget />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
