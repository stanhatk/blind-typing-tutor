import { test, expect } from "@playwright/test";
import { getLayout, getLayoutIdsForLanguage } from "../src/config/layouts";
import { VALID_LEARNING_LANGUAGES } from "../src/config/constants";
import { getTypedWord } from "../src/utils/Generator";
import { loadContent } from "../src/words";
import { canTypeChar } from "../src/utils/keyStrokes";
import { LEVELS, getLevelWords } from "../src/utils/difficulty";

/**
 * Every word must be typeable on its language's keyboard layouts (directly,
 * with Shift/AltGr, with a dead key, or as jamo/tone-mark sequences),
 * otherwise the virtual keyboard cannot show which key to press. Japanese and
 * Chinese are checked by their romaji/pinyin, which is what gets typed.
 */

// Smallest acceptable word list (hand-curated Japanese, Chinese and Thai lists are ~450)
const MIN_WORDS = 400;
const MIN_PHRASES = 90;


test.describe("Keyboard layout coverage", () => {
  // Pure data check: run once, not per browser
  test.skip(({ browserName }) => browserName !== "chromium");

  for (const language of VALID_LEARNING_LANGUAGES) {
    test(`every ${language} word and phrase can be typed on its layouts`, async () => {
      const layoutIds = getLayoutIdsForLanguage(language);
      expect(layoutIds, `no layout for ${language}`).not.toHaveLength(0);

      const content = await loadContent(language);
      expect(content.words.length, `${language} word count`).toBeGreaterThanOrEqual(MIN_WORDS);
      const duplicates = content.words.filter((word, i) => content.words.indexOf(word) !== i);
      expect(duplicates, `duplicate ${language} words`).toEqual([]);
      const source = (await import(`../src/words/words_${language}`)).words as string[];
      expect(source.filter((word) => word !== word.normalize("NFC")), `non-NFC ${language} words`).toEqual([]);

      const words = content.words.map((word) => getTypedWord(content, word));
      // Sentences are checked by what is typed: romanized tokens for Japanese/Chinese
      const phrases = (content.phrases ?? []).map((phrase) =>
        content.phraseTokens?.[phrase]?.map(([, typed]) => typed).join(" ") ?? phrase
      );
      expect(phrases.length, `${language} phrases`).toBeGreaterThanOrEqual(MIN_PHRASES);
      for (const layoutId of layoutIds) {
        const layout = getLayout(layoutId);
        const untypeable = words.filter((word) =>
          [...word].some((char) => !canTypeChar(layout, char))
        );
        expect(untypeable, `untypeable ${language} words on ${layoutId}`).toEqual([]);
        const untypeablePhrases = phrases.filter((phrase) =>
          [...phrase].some((char) => !canTypeChar(layout, char))
        );
        expect(untypeablePhrases, `untypeable ${language} phrases on ${layoutId}`).toEqual([]);
        // Every Words mode level has enough words to practice
        for (const level of LEVELS) {
          const levelWords = getLevelWords(layout, content.words, (word) => getTypedWord(content, word), level);
          expect(levelWords.length, `${language} level ${level} on ${layoutId}`).toBeGreaterThanOrEqual(30);
        }
      }
    });
  }
});
