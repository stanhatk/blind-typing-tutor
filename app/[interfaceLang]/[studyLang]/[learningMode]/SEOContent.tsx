import { translations } from "@/translations";
import type { InterfaceLanguage } from "@/translations";
import type { ContentType } from "@/utils/url";
import { isIndexablePage } from "@/config/seo";
import { LEARNING_LANGUAGE_OPTIONS } from "@/config/constants";
import {
  getAllLayouts,
  getLayout,
  getLayoutIdsForLanguage,
} from "@/config/layouts";
import { loadContent } from "@/words";
import type { LanguageCode } from "@/types/keyboard";

const LAYOUT_COUNT = getAllLayouts().length;
const LANGUAGE_COUNT = LEARNING_LANGUAGE_OPTIONS.length;
const MODES: ContentType[] = ["words", "phrases", "custom"];
// Physical keys where the fingers rest
const HOME_ROW_KEYS = ["a", "s", "d", "f", "j", "k", "l", "cologn"];
const FAQ = [1, 2, 3, 4, 5] as const;

interface SEOContentProps {
  interfaceLang: string;
  studyLang: string;
  learningMode: ContentType;
}

/**
 * Visible article below the trainer: what touch typing is, the current mode,
 * how to practice and links to related practice pages. Server-rendered and
 * fully translated, so every interface language gets its own text.
 */
export async function SEOContent({
  interfaceLang,
  studyLang,
  learningMode,
}: SEOContentProps) {
  // Validate interfaceLang to prevent errors from invalid routes (e.g., .well-known paths)
  const t = translations[interfaceLang as InterfaceLanguage] || translations.en;
  const languageName = (code: string) =>
    t.languageNames[code as keyof typeof t.languageNames] ?? code.toUpperCase();
  const modeName = (mode: ContentType) =>
    mode === "words" ? t.words : mode === "phrases" ? t.phrases : t.custom;

  // Facts that differ per practice language: its layout, home row and words
  const content = await loadContent(studyLang as LanguageCode);
  const layoutId = getLayoutIdsForLanguage(studyLang as LanguageCode)[0];
  const layout = layoutId ? getLayout(layoutId) : undefined;
  const homeRow = layout
    ? HOME_ROW_KEYS.map(
        (id) => layout.keys.find((key) => key.id === id)?.primary ?? ""
      )
    : [];
  // CJK words are short in characters, so a shorter minimum length
  const minLength = content.readings ? 2 : 4;
  const sampleWords = content.words
    .filter((word) => [...word].length >= minLength)
    .slice(0, 8)
    .map((word) =>
      content.readings?.[word] ? `${word} (${content.readings[word]})` : word
    );
  // Letters the language uses beyond A–Z; every letter for other scripts.
  // Skipped for romanized (ja, zh) and syllable-based (ko, ...) languages.
  const letters = [
    ...new Set(
      // Lm skips modifier letters such as the Arabic tatweel
      content.words.join("").toLocaleLowerCase(studyLang).match(/(?!\p{Lm})\p{L}/gu)
    ),
  ]
    .filter((letter) => !/[a-z]/.test(letter))
    .sort((a, b) => a.localeCompare(b, studyLang));
  const showLetters = !content.readings && letters.length > 0 && letters.length <= 60;
  const listSeparator = ["ar", "fa", "ur"].includes(studyLang)
    ? "، "
    : ["ja", "zh"].includes(studyLang)
      ? "、"
      : ", ";
  const samplePhrases = content.phrases?.slice(0, 3) ?? [];
  const formatCount = (count: number) =>
    count.toLocaleString(t === translations.en ? "en" : interfaceLang);

  const modeSection = {
    words: { heading: t.articleWordsHeading, text: t.articleWordsText },
    phrases: { heading: t.articlePhrasesHeading, text: t.articlePhrasesText },
    custom: { heading: t.articleCustomHeading, text: t.articleCustomText },
  }[learningMode];

  // Other modes of this language, then the same mode in popular languages
  const related = [
    ...MODES.map((mode) => ({ studyLang, mode })),
    ...["en", "es", "fr", "de", "pt", "ru", "zh", "ja"].map((lang) => ({
      studyLang: lang,
      mode: learningMode,
    })),
  ].filter(
    (link, index, self) =>
      self.findIndex(
        (l) => l.studyLang === link.studyLang && l.mode === link.mode
      ) === index &&
      !(link.studyLang === studyLang && link.mode === learningMode) &&
      isIndexablePage(interfaceLang, link.studyLang)
  );

  const h2 = "text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100";

  return (
    <article
      id="about"
      className="max-w-3xl mx-auto px-4 py-12 scroll-mt-20 leading-relaxed text-gray-700 dark:text-gray-300"
    >
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {t.articleH1
          .replace("{lang}", languageName(studyLang))
          .replace("{mode}", modeName(learningMode))}
      </h1>
      <p className="mb-4">{t.articleIntro}</p>
      {t.articleScreenReaderNote && (
        <p className="mb-4 text-sm">{t.articleScreenReaderNote}</p>
      )}

      <h2 className={h2}>{modeSection.heading}</h2>
      <p className="mb-4">{modeSection.text}</p>

      <h2 className={h2}>{t.articleHowToHeading}</h2>
      <p className="mb-4">{t.articleHowToText}</p>

      <h2 className={h2}>{t.articleFeaturesHeading}</h2>
      <ul className="list-disc ps-6 mb-4 space-y-1">
        <li>{t.articleFeatureKeyboard}</li>
        <li>
          {t.articleFeatureLanguages
            .replace("{languages}", String(LANGUAGE_COUNT))
            .replace("{layouts}", String(LAYOUT_COUNT))}
        </li>
        <li>{t.articleFeatureStats}</li>
        <li>{t.articleFeatureFree}</li>
      </ul>

      <h2 className={h2}>{t.factsHeading}</h2>
      <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 mb-2">
        {layout && (
          <>
            <dt className="font-medium">{t.factLayout}</dt>
            <dd>{layout.name}</dd>
            <dt className="font-medium">{t.factHomeRow}</dt>
            <dd className="font-mono" dir="ltr">
              {homeRow.slice(0, 4).join(" ")}
              {"   "}
              {homeRow.slice(4).join(" ")}
            </dd>
          </>
        )}
        <dt className="font-medium">{t.factWords}</dt>
        <dd>
          {t.factWordsValue.replace("{count}", formatCount(content.words.length))}
        </dd>
        {content.phrases && (
          <>
            <dt className="font-medium">{t.factPhrases}</dt>
            <dd>
              {t.factPhrasesValue.replace(
                "{count}",
                formatCount(content.phrases.length)
              )}
            </dd>
          </>
        )}
        <dt className="font-medium">{t.factSampleWords}</dt>
        <dd lang={studyLang}>{sampleWords.join(listSeparator)}</dd>
        {showLetters && (
          <>
            <dt className="font-medium">{t.factLetters}</dt>
            <dd lang={studyLang}>{letters.join(" ")}</dd>
          </>
        )}
        {samplePhrases.length > 0 && (
          <>
            <dt className="font-medium">{t.factSamplePhrases}</dt>
            <dd lang={studyLang}>
              {samplePhrases.map((phrase) => (
                <p key={phrase}>{phrase}</p>
              ))}
            </dd>
          </>
        )}
      </dl>
      <p className="mb-4 text-sm">
        <a href="/privacy#credits" className="underline hover:no-underline">
          {t.factSourceLink}
        </a>
      </p>

      <h2 className={h2}>{t.faqHeading}</h2>
      {FAQ.map((n) => (
        <div key={n} className="mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {t[`faq${n}Q`]}
          </h3>
          <p>{t[`faq${n}A`]}</p>
        </div>
      ))}

      {related.length > 0 && (
        <nav aria-labelledby="related-practice">
          <h2 id="related-practice" className={h2}>
            {t.articleRelatedHeading}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((link) => (
              <li key={`${link.studyLang}-${link.mode}`}>
                <a
                  href={`/${interfaceLang}/${link.studyLang}/${link.mode}`}
                  className="inline-block px-3 py-1.5 rounded-lg bg-white/70 dark:bg-gray-800/70 text-indigo-700 dark:text-indigo-300 hover:underline"
                >
                  {languageName(link.studyLang)}: {modeName(link.mode)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  );
}
