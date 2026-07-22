import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// ponytail: ISO country codes, not an exhaustive list of every Spanish-speaking territory
const SPANISH_SPEAKING_COUNTRIES = new Set([
  "AR", "ES", "MX", "CO", "CL", "PE", "VE", "EC", "GT", "CU",
  "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "GQ", "PR",
]);

export default function proxy(request: NextRequest) {
  const hasChosenLocale = request.cookies.has("NEXT_LOCALE");
  const isRoot = request.nextUrl.pathname === "/";

  if (!hasChosenLocale && isRoot) {
    const country = request.headers.get("x-vercel-ip-country");
    if (country && !SPANISH_SPEAKING_COUNTRIES.has(country)) {
      const url = request.nextUrl.clone();
      url.pathname = "/en";
      return NextResponse.redirect(url);
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|ingest|_next|_vercel|.*\\..*).*)"],
};
