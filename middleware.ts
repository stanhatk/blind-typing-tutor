import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VALID_INTERFACE_LANGUAGES } from "@/config/constants";
import type { InterfaceLanguage } from "@/translations";

/**
 * Redirect "/" to the visitor's language. Only the root runs through
 * middleware, so every other page can be served from the static cache.
 */
export function middleware(request: NextRequest) {
  // Parse accept-language header (format: "en-US,en;q=0.9,es;q=0.8")
  const preferredLanguages = (request.headers.get("accept-language") || "")
    .split(",")
    .map((lang) => lang.trim().split(";")[0].split("-")[0].toLowerCase())
    .filter(Boolean);

  // Find first matching supported language
  const interfaceLang =
    preferredLanguages.find((lang) =>
      VALID_INTERFACE_LANGUAGES.includes(lang as InterfaceLanguage),
    ) || "en";

  // 307, not permanent: the target depends on the visitor
  return NextResponse.redirect(
    new URL(`/${interfaceLang}/${interfaceLang}/words`, request.url),
  );
}

export const config = {
  matcher: "/",
};
