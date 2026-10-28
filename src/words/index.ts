import type { LanguageCode } from '../types/keyboard';

/**
 * Practice content for one language, loaded on demand so each page only
 * downloads the language being practiced.
 */
export interface LanguageContent {
  words: string[];
  // Romanization typed for each word (Japanese romaji, Chinese pinyin)
  readings?: Record<string, string>;
}

const words = (load: Promise<{ words: string[] }>) =>
  load.then((m): LanguageContent => ({ words: m.words }));

const withReadings = (
  load: Promise<{ words: string[] }>,
  loadReadings: Promise<{ readings: Record<string, string> }>
) =>
  Promise.all([load, loadReadings]).then(
    ([w, r]): LanguageContent => ({ words: w.words, readings: r.readings })
  );

// Each import() becomes its own chunk
const LOADERS: Record<LanguageCode, () => Promise<LanguageContent>> = {
  en: () => words(import('./words_en')),
  uk: () => words(import('./words_uk')),
  tr: () => words(import('./words_tr')),
  de: () => words(import('./words_de')),
  fr: () => words(import('./words_fr')),
  es: () => words(import('./words_es')),
  pt: () => words(import('./words_pt')),
  ru: () => words(import('./words_ru')),
  it: () => words(import('./words_it')),
  pl: () => words(import('./words_pl')),
  nl: () => words(import('./words_nl')),
  sv: () => words(import('./words_sv')),
  no: () => words(import('./words_no')),
  da: () => words(import('./words_da')),
  fi: () => words(import('./words_fi')),
  cs: () => words(import('./words_cs')),
  hu: () => words(import('./words_hu')),
  ro: () => words(import('./words_ro')),
  el: () => words(import('./words_el')),
  he: () => words(import('./words_he')),
  ja: () => withReadings(import('./words_ja'), import('./readings_ja')),
  ko: () => words(import('./words_ko')),
  zh: () => withReadings(import('./words_zh'), import('./readings_zh')),
  ar: () => words(import('./words_ar')),
  hi: () => words(import('./words_hi')),
  th: () => words(import('./words_th')),
  vi: () => words(import('./words_vi')),
  id: () => words(import('./words_id')),
  ms: () => words(import('./words_ms')),
};

/**
 * Load a language's practice content, in NFC so it matches what keyboards
 * and IMEs produce
 */
export async function loadContent(lang: LanguageCode): Promise<LanguageContent> {
  const content = await (LOADERS[lang] ?? LOADERS.en)();
  return { ...content, words: content.words.map((word) => word.normalize('NFC')) };
}
