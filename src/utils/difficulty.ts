import type { KeyboardLayout } from '../types/keyboard';
import { findKeyStroke, getCharKeySequence } from './keyStrokes';

export const LEVELS = [1, 2, 3, 4, 5] as const;
export type Level = (typeof LEVELS)[number];

// Letter rows by key id, so the levels follow each layout's own keys
const HOME_ROW = new Set(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'cologn', 'quote']);
const TOP_ROW = new Set(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'leftSquareBracket', 'rightSquareBracket', 'backSlash']);
const BOTTOM_ROW = new Set(['z', 'x', 'c', 'v', 'b', 'n', 'm', 'comma', 'period', 'slash', 'intlBackslash']);

const LONG_WORD = 9; // characters

/**
 * Difficulty of typing a word on a layout, by the keys it needs:
 * 1 home row only, 2 + top row, 3 + bottom row, 4 + number row, Shift or
 * AltGr, 5 long words. Multi-key characters (dead keys, Hangul jamo, tone
 * marks) count by the rows of their keys.
 * Returns null if the word cannot be typed on the layout.
 */
export function getWordLevel(layout: KeyboardLayout, word: string): Level | null {
  const levels = getKeyLevels(layout, word);
  if (!levels) return null;
  const level = Math.max(1, ...levels) as Level;
  return [...word].length >= LONG_WORD ? 5 : level;
}

// Level of each keystroke of a word (row, or 4 for Shift/AltGr/number row)
function getKeyLevels(layout: KeyboardLayout, word: string): Level[] | null {
  const levels: Level[] = [];
  for (const char of word) {
    if (char === ' ') continue;
    const keys = getCharKeySequence(layout, char);
    if (!keys) return null;
    for (const key of keys) {
      const stroke = findKeyStroke(layout, key);
      if (!stroke) return null;
      const id = stroke.targetKeyId;
      const rowLevel = HOME_ROW.has(id) ? 1 : TOP_ROW.has(id) ? 2 : BOTTOM_ROW.has(id) ? 3 : 4;
      levels.push(stroke.shiftTarget || stroke.altGr ? 4 : rowLevel);
    }
  }
  return levels;
}

const MIN_WORDS_PER_LEVEL = 30;

/**
 * Words to practice at a level. When a layout has too few words at a level
 * (e.g. home-row-only words), it is topped up to MIN_WORDS_PER_LEVEL with the
 * words closest to it: fewest keys above the level, then most frequent.
 */
export function getLevelWords(
  layout: KeyboardLayout,
  words: string[],
  typedWord: (word: string) => string,
  level: Level
): string[] {
  const result: string[] = [];
  const others: { word: string; keysAbove: number; distance: number }[] = [];
  words.forEach((word) => {
    const typed = typedWord(word);
    const wordLevel = getWordLevel(layout, typed);
    if (!wordLevel) return;
    if (wordLevel === level) {
      result.push(word);
    } else {
      const keysAbove = getKeyLevels(layout, typed)!.filter((keyLevel) => keyLevel > level).length;
      others.push({ word, keysAbove, distance: Math.abs(wordLevel - level) });
    }
  });
  if (result.length < MIN_WORDS_PER_LEVEL) {
    // Stable sort keeps frequency order among equally close words
    others.sort((a, b) => a.keysAbove - b.keysAbove || a.distance - b.distance);
    result.push(...others.slice(0, MIN_WORDS_PER_LEVEL - result.length).map(({ word }) => word));
  }
  return result.length > 0 ? result : words;
}
