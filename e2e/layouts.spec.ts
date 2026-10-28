import { test, expect } from "@playwright/test";
import { getAllLayouts, getLayout } from "../src/config/layouts";
import { VALID_LEARNING_LANGUAGES } from "../src/config/constants";
import { getTypedWord, getWordList } from "../src/utils/Generator";
import { canTypeChar } from "../src/utils/keyStrokes";
import type { KeyboardLayoutId, LanguageCode } from "../src/types/keyboard";

/**
 * Every word must be typeable on its language's keyboard layouts (directly,
 * with Shift/AltGr, with a dead key, or as jamo/tone-mark sequences),
 * otherwise the virtual keyboard cannot show which key to press. Japanese and
 * Chinese are checked by their romaji/pinyin, which is what gets typed.
 */

// Languages written with a layout of another language
const FALLBACK_LAYOUTS: Partial<Record<LanguageCode, KeyboardLayoutId[]>> = {
  id: ["en-us"],
  ms: ["en-us"],
};

test.describe("Keyboard layout coverage", () => {
  // Pure data check: run once, not per browser
  test.skip(({ browserName }) => browserName !== "chromium");

  for (const language of VALID_LEARNING_LANGUAGES) {
    test(`every ${language} word can be typed on its layouts`, () => {
      const layoutIds =
        FALLBACK_LAYOUTS[language] ??
        getAllLayouts()
          .filter((layout) => layout.language === language)
          .map((layout) => layout.id);
      expect(layoutIds, `no layout for ${language}`).not.toHaveLength(0);

      const words = getWordList(language).map((word) => getTypedWord(language, word));
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
