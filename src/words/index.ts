import type { LanguageCode } from '../types/keyboard';

/**
 * Practice content for one language, loaded on demand so each page only
 * downloads the language being practiced.
 */
export interface LanguageContent {
  words: string[];
  // Romanization typed for each word (Japanese romaji, Chinese pinyin)
  readings?: Record<string, string>;
  // Everyday sentences for Phrases mode
  phrases?: string[];
  // Japanese/Chinese sentences split into [native word, romanization] pairs
  phraseTokens?: Record<string, [string, string][]>;
}

// Phrases per language; Japanese and Chinese also need their tokenized readings
const PHRASE_LOADERS: Partial<Record<LanguageCode, () => Promise<Partial<LanguageContent>>>> = {
  en: () => import('../phrases/phrases_en'),
  de: () => import('../phrases/phrases_de'),
  fr: () => import('../phrases/phrases_fr'),
  ja: () =>
    Promise.all([import('../phrases/phrases_ja'), import('../phrases/readings_phrases_ja')])
      .then(([p, r]) => ({ phrases: p.phrases, phraseTokens: r.phraseTokens })),
  zh: () =>
    Promise.all([import('../phrases/phrases_zh'), import('../phrases/readings_phrases_zh')])
      .then(([p, r]) => ({ phrases: p.phrases, phraseTokens: r.phraseTokens })),
  es: () => import('../phrases/phrases_es'),
  pt: () => import('../phrases/phrases_pt'),
  it: () => import('../phrases/phrases_it'),
  nl: () => import('../phrases/phrases_nl'),
  ru: () => import('../phrases/phrases_ru'),
  uk: () => import('../phrases/phrases_uk'),
  pl: () => import('../phrases/phrases_pl'),
  cs: () => import('../phrases/phrases_cs'),
  sv: () => import('../phrases/phrases_sv'),
  no: () => import('../phrases/phrases_no'),
  da: () => import('../phrases/phrases_da'),
  fi: () => import('../phrases/phrases_fi'),
  hu: () => import('../phrases/phrases_hu'),
  ro: () => import('../phrases/phrases_ro'),
  el: () => import('../phrases/phrases_el'),
  tr: () => import('../phrases/phrases_tr'),
  he: () => import('../phrases/phrases_he'),
  ar: () => import('../phrases/phrases_ar'),
  hi: () => import('../phrases/phrases_hi'),
  ko: () => import('../phrases/phrases_ko'),
  vi: () => import('../phrases/phrases_vi'),
  id: () => import('../phrases/phrases_id'),
  ms: () => import('../phrases/phrases_ms'),
  th: () => import('../phrases/phrases_th'),
};

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
  const [content, phrases] = await Promise.all([
    (LOADERS[lang] ?? LOADERS.en)(),
    PHRASE_LOADERS[lang]?.() ?? Promise.resolve<Partial<LanguageContent>>({}),
  ]);
  return {
    ...content,
    ...phrases,
    words: content.words.map((word) => word.normalize('NFC')),
    phrases: phrases.phrases?.map((phrase) => phrase.normalize('NFC')),
  };
}
