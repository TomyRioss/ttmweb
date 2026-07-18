import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TransitionProvider } from "./components/TransitionContext";
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";
import { PostHogProvider } from "./components/PostHogProvider";
import { PostHogPageView } from "./components/PostHogPageView";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";

const rinter = localFont({
  src: "../public/fonts/Rinter.woff2",
  variable: "--font-rinter",
  display: "swap",
});

const siteUrl = "https://ttmagencia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TTM Agencia — Desarrollo Web y Automatizaciones en Buenos Aires",
    template: "%s | TTM Agencia",
  },
  description:
    "TTM Agencia desarrolla sitios web, landing pages, e-commerce y automatizaciones con IA (chatbots, WhatsApp automatizado) para negocios en Buenos Aires, Argentina.",
  keywords: [
    "desarrollo web Buenos Aires",
    "agencia de desarrollo web",
    "landing pages",
    "automatizaciones con IA",
    "chatbot WhatsApp automatizado",
    "desarrollo de sitios e-commerce",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "TTM Agencia",
    title: "TTM Agencia — Desarrollo Web y Automatizaciones en Buenos Aires",
    description:
      "Desarrollo web, landing pages, e-commerce y automatizaciones con IA para negocios en Buenos Aires, Argentina.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TTM Agencia — Desarrollo Web y Automatizaciones en Buenos Aires",
    description:
      "Desarrollo web, landing pages, e-commerce y automatizaciones con IA para negocios en Buenos Aires, Argentina.",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TTM Agencia",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  description:
    "TTM Agencia desarrolla sitios web, landing pages, e-commerce y automatizaciones con IA para negocios en Buenos Aires, Argentina.",
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
    availableLanguage: "Spanish",
  },
  sameAs: [
    "https://www.instagram.com/ttmagency.ok/",
    "https://wa.me/5491171410652",
  ],
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: { "@type": "Organization", name: "TTM Agencia", url: siteUrl },
  areaServed: { "@type": "Country", name: "Argentina" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios TTM Agencia",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Desarrollo Web",
        itemListElement: [
          "Landing Pages",
          "Desarrollo Web Personalizado",
          "Desarrollo de Sitios E-Commerce",
          "Sitios Web Inmobiliarias",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
      {
        "@type": "OfferCatalog",
        name: "Automatizaciones",
        itemListElement: [
          "Soporte Automatizado",
          "Cualificación Automatizada",
          "Automatizaciones a medida",
          "Chatbot integrado",
          "WhatsApp Automatizado",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${rinter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
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
        <Analytics />
      </body>
    </html>
  );
}
