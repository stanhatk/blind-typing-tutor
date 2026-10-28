import { test, expect } from "@playwright/test";
import { getAllLayouts, getLayout } from "../src/config/layouts";
import { VALID_LEARNING_LANGUAGES } from "../src/config/constants";
import { getWordList } from "../src/utils/Generator";
import { canTypeChar } from "../src/utils/keyStrokes";
import type { KeyboardLayoutId, LanguageCode } from "../src/types/keyboard";

/**
 * Every character in a language's word list must be typeable on that
 * language's keyboard layouts (directly, with Shift/AltGr, or with a dead
 * key), otherwise the virtual keyboard cannot show which key to press.
 */

// Languages typed through a romanizing IME, whose characters do not map to
// keys. Remove an entry once its layout supports the word list.
const NOT_YET_SUPPORTED: Partial<Record<LanguageCode, string>> = {
  ja: "kana/kanji need romaji input mapping",
  zh: "hanzi need pinyin input mapping",
};

// Languages written with a layout of another language
const FALLBACK_LAYOUTS: Partial<Record<LanguageCode, KeyboardLayoutId[]>> = {
  id: ["en-us"],
  ms: ["en-us"],
};

test.describe("Keyboard layout coverage", () => {
  // Pure data check: run once, not per browser
  test.skip(({ browserName }) => browserName !== "chromium");

  for (const language of VALID_LEARNING_LANGUAGES) {
    if (NOT_YET_SUPPORTED[language]) continue;

    test(`every ${language} word can be typed on its layouts`, () => {
      const layoutIds =
        FALLBACK_LAYOUTS[language] ??
        getAllLayouts()
          .filter((layout) => layout.language === language)
          .map((layout) => layout.id);
      expect(layoutIds, `no layout for ${language}`).not.toHaveLength(0);

      const words = getWordList(language);
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
