import { MetadataRoute } from "next";
import {
  INTERFACE_LANGUAGE_OPTIONS,
  LEARNING_LANGUAGE_OPTIONS,
  BASE_URL,
} from "@/config/constants";
import { isIndexablePage } from "@/config/seo";
import { GUIDES } from "@/guides";

// Content types for practice modes
const CONTENT_TYPES = ["words", "phrases", "custom"] as const;

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
          alternates: {
            languages: languageAlternates,
          },
        });
      });
    });
  });

  // lastmod, changefreq and priority are omitted: a build timestamp on every
  // URL is not a real change date, and Google ignores the other two
  urls.push({ url: `${BASE_URL}/privacy` });
  GUIDES.forEach((guide) =>
    urls.push({ url: `${BASE_URL}/${guide.interfaceLang}/${guide.slug}` })
  );

  return urls;
}
