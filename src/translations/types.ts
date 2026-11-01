import type { LanguageCode } from "../types/keyboard";

export type InterfaceLanguage =
  | "en"
  | "uk"
  | "tr"
  | "de"
  | "fr"
  | "es"
  | "pt"
  | "ru"
  | "zh"
  | "ja"
  | "ko"
  | "ar"
  | "hi"
  | "it"
  | "pl"
  | "nl"
  | "sv"
  | "no"
  | "da"
  | "fi"
  | "cs"
  | "hu"
  | "ro"
  | "el"
  | "he"
  | "th"
  | "vi"
  | "id"
  | "ms";

// Base translation keys type - ensures all keys are present
export type TranslationKeys = {
  title: string;
  practice: string;
  beginner: string;
  custom: string;
  pasteText: string;
  start: string;
  soundOn: string;
  soundOff: string;
  darkMode: string;
  lightMode: string;
  wpm: string;
  accuracy: string;
  errors: string;
  toggleKeyboard: string;
  toggleHands: string;
  toggleColors: string;
  toggleCorrection: string;
  learningMode: string;
  learningLanguage: string;
  interfaceLanguage: string;
  words: string;
  phrases: string;
  complexity: string; // Words mode complexity selector
  complexityNames: Record<"letters" | "short" | "long", string>;
  programming: string;
  support: string;
  supportTitle: string;
  reportIssue: string;
  reportIssueTitle: string;
  privacyAndContact: string;
  typingInputLabel: string; // Accessible name of the hidden typing input
  close: string;
  // Visible article below the trainer; {lang}, {mode}, {languages}, {layouts} are replaced at render
  articleH1: string;
  articleIntro: string;
  articleWordsHeading: string;
  articleWordsText: string;
  articlePhrasesHeading: string;
  articlePhrasesText: string;
  articleCustomHeading: string;
  articleCustomText: string;
  articleHowToHeading: string;
  articleHowToText: string;
  articleFeaturesHeading: string;
  articleFeatureKeyboard: string;
  articleFeatureLanguages: string;
  articleFeatureStats: string;
  articleFeatureFree: string;
  articleRelatedHeading: string;
  articleScreenReaderNote?: string; // English only: "blind typing" also means software for blind users
  metaDescription: string;
  cancel: string;
  selectKeyboardLayout: string;
  seoTitle: string; // SEO-optimized title with primary keywords
  seoDescription: string; // SEO-optimized description with primary keywords
  seoKeywords: string; // SEO-optimized keywords with primary keywords
  seoTitleWords: string; // Page-specific title for Words mode (includes {lang} placeholder)
  seoTitlePhrases: string; // Page-specific title for Phrases mode (includes {lang} placeholder)
  seoTitleCustom: string; // Page-specific title for Custom mode (includes {lang} placeholder)
  seoDescriptionWords: string; // Page-specific description for Words mode (includes {lang} placeholder)
  seoDescriptionPhrases: string; // Page-specific description for Phrases mode (includes {lang} placeholder)
  seoDescriptionCustom: string; // Page-specific description for Custom mode (includes {lang} placeholder)
  seoBlindTypingTitle: string; // High-value keyword title with "blind typing" (includes {lang} placeholder)
  seoBlindTypingDescription: string; // High-value keyword description with "blind typing" (includes {lang} placeholder)
  mobileDesktopRequired: string;
  mobileDescription: string;
  languageNames: Record<LanguageCode, string>; // Must include all language codes
};

// Main translations type - ensures all interface languages are present
export type Translations = {
  [key in InterfaceLanguage]: TranslationKeys;
};
