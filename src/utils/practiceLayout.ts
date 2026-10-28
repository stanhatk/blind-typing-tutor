import type { KeyboardLayout, LanguageCode } from '../types/keyboard';
import type { LanguageContent } from '../words';
import { getLayout, getLayoutIdsForLanguage } from '../config/layouts';
import { canTypeChar } from './keyStrokes';

/**
 * Every character typed when practicing a language: words as typed
 * (romaji/pinyin for Japanese and Chinese) and phrases.
 */
export function getPracticeChars(content: LanguageContent): Set<string> {
  const chars = new Set<string>();
  const add = (text: string) => {
    for (const char of text) if (char !== ' ') chars.add(char);
  };
  for (const word of content.words) add(content.readings?.[word] ?? word);
  for (const phrase of content.phrases ?? []) {
    const tokens = content.phraseTokens?.[phrase];
    if (tokens) tokens.forEach(([, typed]) => add(typed));
    else add(phrase);
  }
  return chars;
}

/**
 * The layout whose keys are used to practice a language with a keyboard
 * shown: the shown layout when it can type everything, otherwise the
 * language's own layout (or US QWERTY). Practicing English with a Ukrainian
 * keyboard, the system layout is switched but the same physical keys are
 * pressed; key ids are physical positions, so the shown keyboard highlights
 * the practice layout's keys.
 */
export function getPracticeLayout(
  shown: KeyboardLayout,
  language: LanguageCode,
  chars: Iterable<string>
): KeyboardLayout {
  const needed = [...chars];
  const canTypeAll = (layout: KeyboardLayout) => needed.every((char) => canTypeChar(layout, char));
  if (canTypeAll(shown)) return shown;
  const candidates = [...getLayoutIdsForLanguage(language), 'en-us' as const].map((id) => getLayout(id));
  return candidates.find(canTypeAll) ?? candidates[0];
}
