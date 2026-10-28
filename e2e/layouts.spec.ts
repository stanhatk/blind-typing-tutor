import { test, expect } from "@playwright/test";
import { getAllLayouts, getLayout } from "../src/config/layouts";
import { VALID_LEARNING_LANGUAGES } from "../src/config/constants";
import { getTypedWord } from "../src/utils/Generator";
import { loadContent } from "../src/words";
import { canTypeChar } from "../src/utils/keyStrokes";
import type { KeyboardLayoutId, LanguageCode } from "../src/types/keyboard";

/**
 * Every word must be typeable on its language's keyboard layouts (directly,
 * with Shift/AltGr, with a dead key, or as jamo/tone-mark sequences),
 * otherwise the virtual keyboard cannot show which key to press. Japanese and
 * Chinese are checked by their romaji/pinyin, which is what gets typed.
 */

// Smallest acceptable word list (hand-curated Japanese, Chinese and Thai lists are ~450)
const MIN_WORDS = 400;

// Languages written with a layout of another language
const FALLBACK_LAYOUTS: Partial<Record<LanguageCode, KeyboardLayoutId[]>> = {
  id: ["en-us"],
  ms: ["en-us"],
};

test.describe("Keyboard layout coverage", () => {
  // Pure data check: run once, not per browser
  test.skip(({ browserName }) => browserName !== "chromium");

  for (const language of VALID_LEARNING_LANGUAGES) {
    test(`every ${language} word can be typed on its layouts`, async () => {
      const layoutIds =
        FALLBACK_LAYOUTS[language] ??
        getAllLayouts()
          .filter((layout) => layout.language === language)
          .map((layout) => layout.id);
      expect(layoutIds, `no layout for ${language}`).not.toHaveLength(0);

      const content = await loadContent(language);
      expect(content.words.length, `${language} word count`).toBeGreaterThanOrEqual(MIN_WORDS);
      const duplicates = content.words.filter((word, i) => content.words.indexOf(word) !== i);
      expect(duplicates, `duplicate ${language} words`).toEqual([]);
      const source = (await import(`../src/words/words_${language}`)).words as string[];
      expect(source.filter((word) => word !== word.normalize("NFC")), `non-NFC ${language} words`).toEqual([]);

      const words = content.words.map((word) => getTypedWord(content, word));
      for (const layoutId of layoutIds) {
        const layout = getLayout(layoutId);
        const untypeable = words.filter((word) =>
          [...word].some((char) => !canTypeChar(layout, char))
        );
        expect(untypeable, `untypeable ${language} words on ${layoutId}`).toEqual([]);
      }
    });
  }
});
