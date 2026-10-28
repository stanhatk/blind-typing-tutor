import { test, expect } from "@playwright/test";
import { getAllLayouts, getLayout, getLayoutIdsForLanguage } from "../src/config/layouts";
import { VALID_LEARNING_LANGUAGES } from "../src/config/constants";
import { getTypedWord } from "../src/utils/Generator";
import { loadContent } from "../src/words";
import { canTypeChar } from "../src/utils/keyStrokes";
import { getLetterFrequencies, getWordsByLength } from "../src/utils/complexity";
import { getPracticeChars, getPracticeLayout } from "../src/utils/practiceLayout";

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

      // Words mode complexity: letters, and short words really shorter than long ones
      expect(getLetterFrequencies(words).size, `${language} letters`).toBeGreaterThanOrEqual(10);
      const typed = (word: string) => getTypedWord(content, word);
      const averageLength = (list: string[]) => list.reduce((sum, word) => sum + [...typed(word)].length, 0) / list.length;
      const short = getWordsByLength(content.words, typed, "short");
      const long = getWordsByLength(content.words, typed, "long");
      expect(short.length, `${language} short words`).toBeGreaterThanOrEqual(30);
      expect(long.length, `${language} long words`).toBeGreaterThanOrEqual(30);
      expect(averageLength(long), `${language} long vs short words`).toBeGreaterThan(averageLength(short) + 1);
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
        const untypeableLetters = [...getLetterFrequencies(words).keys()].filter((letter) => !canTypeChar(layout, letter));
        expect(untypeableLetters, `untypeable ${language} letters on ${layoutId}`).toEqual([]);
      }
    });
  }

  // Any keyboard shown with any practice language: the practice layout must
  // type every character
  for (const language of VALID_LEARNING_LANGUAGES) {
    test(`every keyboard can practice ${language}`, async () => {
      const content = await loadContent(language);
      const chars = getPracticeChars(content);
      for (const { id } of getAllLayouts()) {
        const practice = getPracticeLayout(getLayout(id), language, chars);
        const untypeable = [...chars].filter((char) => !canTypeChar(practice, char));
        expect(untypeable, `${language} on ${id} via ${practice.id}`).toEqual([]);
      }
    });
  }

  // Key ids name physical positions (the US key at that spot), so layouts can
  // stand in for each other: same ids in the same order as en-us
  test("every layout uses positional key ids", () => {
    const order = getLayout("en-us").keys.map((key) => key.id);
    for (const { id } of getAllLayouts()) {
      const ids = getLayout(id).keys.map((key) => key.id).filter((keyId) => keyId !== "intlBackslash");
      expect(ids, `key ids of ${id}`).toEqual(order);
    }
  });
});
