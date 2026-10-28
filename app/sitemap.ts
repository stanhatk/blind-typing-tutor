import { MetadataRoute } from "next";
import {
  INTERFACE_LANGUAGE_OPTIONS,
  LEARNING_LANGUAGE_OPTIONS,
  BASE_URL,
} from "@/config/constants";
import { POPULAR_CROSS_LANGUAGE, isIndexablePage } from "@/config/seo";

// Content types for practice modes
const CONTENT_TYPES = ["words", "phrases", "custom"] as const;

// Popular interface languages get higher priority
const POPULAR_LANGS = ["en", "es", "fr", "de", "pt", "ru", "zh", "ja"];

function getPriority(
  interfaceLang: string,
  studyLang: string,
  mode: string
): number {
  if (mode === "custom") return 0.5;

  if (interfaceLang === studyLang) {
    return POPULAR_LANGS.includes(interfaceLang) ? 0.9 : 0.8;
  }

  const crossLangs = POPULAR_CROSS_LANGUAGE[interfaceLang] || [];
  if (crossLangs.includes(studyLang)) {
    return 0.7;
  }

  return 0.3;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Every indexable page (same-language, English interface, popular pairs).
  // hreflang alternates only list the indexable variants of the same page.
  INTERFACE_LANGUAGE_OPTIONS.forEach((interfaceLang) => {
    LEARNING_LANGUAGE_OPTIONS.forEach((studyLang) => {
      if (!isIndexablePage(interfaceLang.code, studyLang.code)) return;

      CONTENT_TYPES.forEach((mode) => {
        const languageAlternates: Record<string, string> = {};
        INTERFACE_LANGUAGE_OPTIONS.forEach((lang) => {
          if (!isIndexablePage(lang.code, studyLang.code)) return;
          languageAlternates[lang.code] =
            `${BASE_URL}/${lang.code}/${studyLang.code}/${mode}`;
        });
        languageAlternates["x-default"] =
          `${BASE_URL}/en/${studyLang.code}/${mode}`;

        urls.push({
          url: `${BASE_URL}/${interfaceLang.code}/${studyLang.code}/${mode}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: getPriority(interfaceLang.code, studyLang.code, mode),
          alternates: {
            languages: languageAlternates,
          },
        });
      });
    });
  });

  return urls;
}
