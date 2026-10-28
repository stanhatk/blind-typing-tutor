import type { Metadata } from "next";
import type { LanguageCode } from "../types/keyboard";
import type { ContentType } from "./url";
import type { InterfaceLanguage } from "../translations";
import { translations } from "../translations";
import { buildUrlPath } from "./url";
import {
  validateInterfaceLanguage,
  validateLearningLanguage,
  BASE_URL,
  INTERFACE_LANGUAGE_OPTIONS,
} from "../config/constants";
import { isIndexablePage } from "../config/seo";

const DEFAULT_TITLE = "Blind Typing Tutor - Master Touch Typing Online";
const DEFAULT_DESCRIPTION = "Master touch typing with our free online blind typing tutor.";
const OG_IMAGE = "/og-image.png";

/**
 * Keep the high-value blind-typing phrase and append the practice mode
 * so words, phrases, and custom are not indexed with the same title.
 * Words keeps the full title; other modes use the keyword half plus the mode name.
 */
function titleForSameLanguageMode(baseTitle: string, modeLabel: string): string {
  const head = baseTitle.split("|")[0].trim();
  return `${head} — ${modeLabel}`;
}

/**
 * Untranslated templates are copied from English. Combined with a shared
 * study-language name, that makes titles and descriptions identical.
 * Mention the interface language unless the text already does.
 */
function withInterfaceLanguage(text: string, interfaceName: string): string {
  if (text.includes(interfaceName)) return text;
  return `${text} (${interfaceName})`;
}

function fillTemplate(
  template: string | undefined,
  englishTemplate: string | undefined,
  fallback: string,
  langName: string
): { text: string; copied: boolean } {
  const source = template || fallback;
  return {
    text: source.replace("{lang}", langName),
    copied: source === (englishTemplate || fallback),
  };
}

interface MetadataOptions {
  interfaceLang: string;
  studyLang?: string;
  learningMode?: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

/**
 * Generate hreflang alternates for all interface languages
 * This helps SEO scanners understand language versions of the page
 */
function generateHreflangAlternates(
  currentLang: string,
  studyLang?: string,
  learningMode?: string
): Record<string, string> {
  const alternates: Record<string, string> = {};

  INTERFACE_LANGUAGE_OPTIONS.forEach((lang) => {
    // hreflang must only point at indexable pages
    if (studyLang && !isIndexablePage(lang.code, studyLang)) return;
    let url = `${BASE_URL}/${lang.code}`;
    if (studyLang && learningMode) {
      // For content pages, maintain the same studyLang and learningMode
      url = `${BASE_URL}${buildUrlPath(
        lang.code as InterfaceLanguage,
        learningMode as ContentType,
        studyLang as LanguageCode
      )}`;
    }
    alternates[lang.code] = url;
  });

  // Add x-default pointing to English version
  let defaultUrl = `${BASE_URL}/en`;
  if (studyLang && learningMode) {
    defaultUrl = `${BASE_URL}${buildUrlPath(
      "en",
      learningMode as ContentType,
      studyLang as LanguageCode
    )}`;
  }
  alternates["x-default"] = defaultUrl;

  return alternates;
}

/**
 * Generate Next.js Metadata for a route
 * Consolidates metadata generation logic used across different page types
 * Includes proper hreflang tags for SEO scanners
 */
export function generatePageMetadata(options: MetadataOptions): Metadata {
  const { interfaceLang, studyLang, learningMode, robots } = options;

  // Validate interface language
  const validatedInterfaceLang = validateInterfaceLanguage(interfaceLang);

  // Get translations
  const t = translations[validatedInterfaceLang];

  // Build page-specific title and description using templates with {lang} placeholder
  let title: string;
  let description: string;
  let titleCopied = false;
  let descriptionCopied = false;
  const en = translations.en;

  if (studyLang && learningMode) {
    const validatedStudyLang = validateLearningLanguage(studyLang);
    const studyLangName =
      t.languageNames && validatedStudyLang in t.languageNames
        ? t.languageNames[validatedStudyLang]
        : validatedStudyLang.toUpperCase();

    // Same-language pages (e.g. /en/en/words) are the primary SEO targets and
    // keep the high-value blind-typing title. Phrases and custom get their own
    // titles and descriptions so the three modes are not duplicates.
    const isSameLanguage = validatedInterfaceLang === validatedStudyLang;
    const modeKey = learningMode as ContentType;

    if (isSameLanguage) {
      const blindTitle = fillTemplate(
        t.seoBlindTypingTitle,
        en.seoBlindTypingTitle,
        t.seoTitle || DEFAULT_TITLE,
        studyLangName
      );
      const blindDescription = fillTemplate(
        t.seoBlindTypingDescription,
        en.seoBlindTypingDescription,
        t.seoDescription || DEFAULT_DESCRIPTION,
        studyLangName
      );

      if (modeKey === "words") {
        title = blindTitle.text;
        description = blindDescription.text;
        titleCopied = blindTitle.copied;
        descriptionCopied = blindDescription.copied;
      } else if (modeKey === "phrases") {
        const phraseDescription = fillTemplate(
          t.seoDescriptionPhrases,
          en.seoDescriptionPhrases,
          blindDescription.text,
          studyLangName
        );
        title = titleForSameLanguageMode(blindTitle.text, t.phrases);
        description = phraseDescription.text;
        titleCopied = blindTitle.copied;
        descriptionCopied = phraseDescription.copied;
      } else {
        const customDescription = fillTemplate(
          t.seoDescriptionCustom,
          en.seoDescriptionCustom,
          blindDescription.text,
          studyLangName
        );
        title = titleForSameLanguageMode(blindTitle.text, t.custom);
        description = customDescription.text;
        titleCopied = blindTitle.copied;
        descriptionCopied = customDescription.copied;
      }
    } else if (modeKey === "words") {
      const filledTitle = fillTemplate(
        t.seoTitleWords,
        en.seoTitleWords,
        t.seoTitle || DEFAULT_TITLE,
        studyLangName
      );
      const filledDescription = fillTemplate(
        t.seoDescriptionWords,
        en.seoDescriptionWords,
        t.seoDescription || DEFAULT_DESCRIPTION,
        studyLangName
      );
      title = filledTitle.text;
      description = filledDescription.text;
      titleCopied = filledTitle.copied;
      descriptionCopied = filledDescription.copied;
    } else if (modeKey === "phrases") {
      const filledTitle = fillTemplate(
        t.seoTitlePhrases,
        en.seoTitlePhrases,
        t.seoTitle || DEFAULT_TITLE,
        studyLangName
      );
      const filledDescription = fillTemplate(
        t.seoDescriptionPhrases,
        en.seoDescriptionPhrases,
        t.seoDescription || DEFAULT_DESCRIPTION,
        studyLangName
      );
      title = filledTitle.text;
      description = filledDescription.text;
      titleCopied = filledTitle.copied;
      descriptionCopied = filledDescription.copied;
    } else {
      const filledTitle = fillTemplate(
        t.seoTitleCustom,
        en.seoTitleCustom,
        t.seoTitle || DEFAULT_TITLE,
        studyLangName
      );
      const filledDescription = fillTemplate(
        t.seoDescriptionCustom,
        en.seoDescriptionCustom,
        t.seoDescription || DEFAULT_DESCRIPTION,
        studyLangName
      );
      title = filledTitle.text;
      description = filledDescription.text;
      titleCopied = filledTitle.copied;
      descriptionCopied = filledDescription.copied;
    }
  } else {
    const filledTitle = fillTemplate(t.seoTitle, en.seoTitle, t.title || DEFAULT_TITLE, "");
    const filledDescription = fillTemplate(
      t.seoDescription,
      en.seoDescription,
      t.metaDescription || DEFAULT_DESCRIPTION,
      ""
    );
    title = filledTitle.text;
    description = filledDescription.text;
    titleCopied = filledTitle.copied;
    descriptionCopied = filledDescription.copied;
  }

  const interfaceName =
    t.languageNames && validatedInterfaceLang in t.languageNames
      ? t.languageNames[validatedInterfaceLang]
      : validatedInterfaceLang.toUpperCase();
  if (titleCopied) title = withInterfaceLanguage(title, interfaceName);
  if (descriptionCopied) description = withInterfaceLanguage(description, interfaceName);

  const keywords = t.seoKeywords || t.seoDescription || "";

  // Build canonical URL
  let canonical = BASE_URL;
  if (studyLang && learningMode) {
    canonical = `${BASE_URL}${buildUrlPath(
      validatedInterfaceLang,
      learningMode as ContentType,
      studyLang as LanguageCode
    )}`;
  } else {
    canonical = `${BASE_URL}/${validatedInterfaceLang}`;
  }

  // Generate hreflang alternates for SEO
  const hreflangAlternates = generateHreflangAlternates(
    validatedInterfaceLang,
    studyLang,
    learningMode
  );

  return {
    title,
    description,
    keywords,
    robots: robots || {
      index: !studyLang || isIndexablePage(validatedInterfaceLang, studyLang),
      follow: true,
    },
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [OG_IMAGE],
      type: "website",
      locale: validatedInterfaceLang,
      alternateLocale: Object.keys(hreflangAlternates).filter(
        (lang) => lang !== validatedInterfaceLang && lang !== "x-default"
      ),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

// Legacy interface for backward compatibility
export interface RouteMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export interface RouteParams {
  interfaceLang?: string;
  contentTypeAndLang?: string;
}

/**
 * Generate metadata for a route based on its parameters (legacy format)
 * @deprecated Use generatePageMetadata instead
 */
export function generateMetadata(params: RouteParams): RouteMetadata {
  const { interfaceLang, contentTypeAndLang } = params;

  // Parse contentTypeAndLang (e.g., "words-es" -> { contentType: "words", learningLang: "es" })
  let contentType: ContentType | undefined;
  let learningLang: LanguageCode | undefined;

  if (contentTypeAndLang) {
    const parts = contentTypeAndLang.split("-");
    if (parts.length >= 2) {
      contentType = parts[0] as ContentType;
      learningLang = parts.slice(1).join("-") as LanguageCode;
    }
  }

  // Validate interface language
  const validatedInterfaceLang = validateInterfaceLanguage(interfaceLang);

  // Use base SEO metadata (no content-type specific variations)
  const t = translations[validatedInterfaceLang];
  const title = t.seoTitle || t.title || DEFAULT_TITLE;
  const description = t.seoDescription || t.metaDescription || DEFAULT_DESCRIPTION;
  const keywords = t.seoKeywords || t.seoDescription || "";

  // Build canonical URL
  let canonical = BASE_URL;

  if (learningLang && contentType) {
    canonical = `${BASE_URL}${buildUrlPath(
      validatedInterfaceLang,
      contentType,
      learningLang
    )}`;
  } else if (validatedInterfaceLang !== "en") {
    canonical = `${BASE_URL}/${validatedInterfaceLang}`;
  }

  return {
    title,
    description,
    keywords,
    canonical,
    ogImage: OG_IMAGE,
  };
}
