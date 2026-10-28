// Popular cross-language combinations (interfaceLang -> studyLangs)
// These represent the most common language-learning pairings
export const POPULAR_CROSS_LANGUAGE: Record<string, string[]> = {
  en: ["es", "fr", "de", "zh", "ja", "ko", "pt", "ru", "ar", "hi", "it", "tr"],
  es: ["en", "pt", "fr", "de", "it"],
  fr: ["en", "es", "de", "it"],
  de: ["en", "fr", "es"],
  pt: ["en", "es"],
  ru: ["en", "de", "fr"],
  zh: ["en"],
  ja: ["en"],
  ko: ["en"],
  tr: ["en", "de"],
  ar: ["en", "fr"],
  hi: ["en"],
  it: ["en", "es", "fr"],
  uk: ["en", "pl"],
  pl: ["en", "de"],
  nl: ["en", "de"],
  sv: ["en", "no", "da"],
  no: ["en", "sv", "da"],
  da: ["en", "sv", "no"],
  fi: ["en", "sv"],
  cs: ["en", "de"],
  hu: ["en", "de"],
  ro: ["en", "it"],
  el: ["en"],
  he: ["en"],
  th: ["en"],
  vi: ["en"],
  id: ["en", "ms"],
  ms: ["en", "id"],
};

/**
 * Pages worth indexing: same-language pages, the English interface for every
 * study language (it is the x-default of each hreflang cluster), and popular
 * cross-language pairs. All other combinations still render but are noindex,
 * so search engines do not crawl ~2,000 near-duplicate pages.
 */
export function isIndexablePage(interfaceLang: string, studyLang: string): boolean {
  return (
    interfaceLang === studyLang ||
    interfaceLang === "en" ||
    (POPULAR_CROSS_LANGUAGE[interfaceLang] || []).includes(studyLang)
  );
}
