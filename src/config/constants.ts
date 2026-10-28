import type { KeyboardLayoutId, LanguageCode } from "../types/keyboard";
import type { InterfaceLanguage } from "../translations";

// ============================================================================
// Application Constants
// ============================================================================

/**
 * Base URL for the application
 * Used for canonical URLs, sitemap generation, and metadata
 */
export const BASE_URL = "https://blind-typing-tutor.wordmemo.net";

// ============================================================================
// Language Validation
// ============================================================================

// Language validation arrays - single source of truth
export const VALID_INTERFACE_LANGUAGES: readonly InterfaceLanguage[] = [
  "en",
  "uk",
  "tr",
  "de",
  "fr",
  "es",
  "pt",
  "ru",
  "zh",
  "ja",
  "ko",
  "ar",
  "hi",
  "it",
  "pl",
  "nl",
  "sv",
  "no",
  "da",
  "fi",
  "cs",
  "hu",
  "ro",
  "el",
  "he",
  "th",
  "vi",
  "id",
  "ms",
] as const;

export const VALID_LEARNING_LANGUAGES: readonly LanguageCode[] = [
  "en",
  "uk",
  "tr",
  "de",
  "fr",
  "es",
  "pt",
  "ru",
  "zh",
  "ja",
  "ko",
  "ar",
  "hi",
  "it",
  "pl",
  "nl",
  "sv",
  "no",
  "da",
  "fi",
  "cs",
  "hu",
  "ro",
  "el",
  "he",
  "th",
  "vi",
  "id",
  "ms",
  "ca",
  "hr",
  "sk",
  "sl",
  "lt",
  "lv",
  "et",
  "bg",
  "sr",
  "kk",
  "bn",
  "fa",
  "ur",
  "ta",
  "sw",
  "tl",
] as const;

// Type guard functions for safe type narrowing
export function isValidInterfaceLanguage(
  lang: string
): lang is InterfaceLanguage {
  return VALID_INTERFACE_LANGUAGES.includes(lang as InterfaceLanguage);
}

export function isValidLearningLanguage(lang: string): lang is LanguageCode {
  return VALID_LEARNING_LANGUAGES.includes(lang as LanguageCode);
}

// Helper function to validate and return interface language with fallback
export function validateInterfaceLanguage(
  lang: string | undefined | null,
  fallback: InterfaceLanguage = "en"
): InterfaceLanguage {
  if (lang && isValidInterfaceLanguage(lang)) {
    return lang;
  }
  return fallback;
}

// Helper function to validate and return learning language with fallback
export function validateLearningLanguage(
  lang: string | undefined | null,
  fallback: LanguageCode = "en"
): LanguageCode {
  if (lang && isValidLearningLanguage(lang)) {
    return lang;
  }
  return fallback;
}

// ============================================================================
// Keyboard Layouts
// ============================================================================

/**
 * Popular keyboard layouts shown first in the layout selector
 * Ordered by popularity/usage
 */
export const POPULAR_LAYOUT_IDS: KeyboardLayoutId[] = [
  "en-us",
  "en-gb",
  "de-de",
  "fr-fr",
  "es-es",
  "pt-pt",
  "ru-ru",
  "it-it",
  "nl-nl",
  "pl-pl",
  "tr-q",
  "uk-ua",
  "sv-se",
  "fi-fi",
  "no-no",
  "da-dk",
  "cs-cz",
  "hu-hu",
  "ro-ro",
  "el-gr",
  "ja-jp",
  "ko-kr",
  "zh-cn",
  "ar-sa",
  "he-il",
  "hi-in",
  "th-th",
  "vi-vn",
  "hr-hr",
  "sk-sk",
  "lt-lt",
  "lv-lv",
  "et-ee",
  "bg-bg",
  "sr-rs",
  "kk-kz",
  "bn-bd",
  "fa-ir",
  "ur-pk",
  "ta-in",
];

// ============================================================================
// Language Options for UI
// ============================================================================

/**
 * Available learning languages with display names and flags
 * Used in language selection dropdowns
 */
export const LEARNING_LANGUAGE_OPTIONS: {
  code: LanguageCode;
  name: string;
  flag: string;
}[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "uk", name: "Українська", flag: "🇺🇦" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "sv", name: "Svenska", flag: "🇸🇪" },
    { code: "no", name: "Norsk", flag: "🇳🇴" },
    { code: "da", name: "Dansk", flag: "🇩🇰" },
    { code: "fi", name: "Suomi", flag: "🇫🇮" },
    { code: "cs", name: "Čeština", flag: "🇨🇿" },
    { code: "hu", name: "Magyar", flag: "🇭🇺" },
    { code: "ro", name: "Română", flag: "🇷🇴" },
    { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
    { code: "he", name: "עברית", flag: "🇮🇱" },
    { code: "th", name: "ไทย", flag: "🇹🇭" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
    { code: "ca", name: "Català", flag: "🇦🇩" },
    { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
    { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
    { code: "sl", name: "Slovenščina", flag: "🇸🇮" },
    { code: "lt", name: "Lietuvių", flag: "🇱🇹" },
    { code: "lv", name: "Latviešu", flag: "🇱🇻" },
    { code: "et", name: "Eesti", flag: "🇪🇪" },
    { code: "bg", name: "Български", flag: "🇧🇬" },
    { code: "sr", name: "Српски", flag: "🇷🇸" },
    { code: "kk", name: "Қазақша", flag: "🇰🇿" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
    { code: "tl", name: "Filipino", flag: "🇵🇭" },
  ];

/**
 * Available interface languages with display names and flags
 * Used in interface language selection dropdowns
 */
export const INTERFACE_LANGUAGE_OPTIONS: {
  code: InterfaceLanguage;
  name: string;
  flag: string;
}[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "uk", name: "Українська", flag: "🇺🇦" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "sv", name: "Svenska", flag: "🇸🇪" },
    { code: "no", name: "Norsk", flag: "🇳🇴" },
    { code: "da", name: "Dansk", flag: "🇩🇰" },
    { code: "fi", name: "Suomi", flag: "🇫🇮" },
    { code: "cs", name: "Čeština", flag: "🇨🇿" },
    { code: "hu", name: "Magyar", flag: "🇭🇺" },
    { code: "ro", name: "Română", flag: "🇷🇴" },
    { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
    { code: "he", name: "עברית", flag: "🇮🇱" },
    { code: "th", name: "ไทย", flag: "🇹🇭" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  ];
