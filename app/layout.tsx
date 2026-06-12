import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TransitionProvider } from "./components/TransitionContext";
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";

const rinter = localFont({
  src: "../public/fonts/Rinter.woff2",
  variable: "--font-rinter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TTM Agencia",
  description: "TTM Agencia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${rinter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TransitionProvider>
          <Navbar />
          <PageTransition />
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
