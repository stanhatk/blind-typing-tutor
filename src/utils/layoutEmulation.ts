import type { KeyboardLayout } from '../types/keyboard';

/**
 * Typing a language without its keyboard layout installed: a key press reports
 * its physical position (KeyboardEvent.code), so the practice layout's
 * character at that position can be typed instead of the system layout's.
 */

// KeyboardEvent.code -> key id (key ids are physical positions)
const CODE_TO_KEY_ID: Record<string, string> = {
  Backquote: 'backtick', Minus: 'underscore', Equal: 'equal',
  BracketLeft: 'leftSquareBracket', BracketRight: 'rightSquareBracket', Backslash: 'backSlash',
  Semicolon: 'cologn', Quote: 'quote', Comma: 'comma', Period: 'period', Slash: 'slash',
  IntlBackslash: 'intlBackslash',
};
for (let digit = 0; digit <= 9; digit++) CODE_TO_KEY_ID[`Digit${digit}`] = String(digit);
for (const letter of 'abcdefghijklmnopqrstuvwxyz') CODE_TO_KEY_ID[`Key${letter.toUpperCase()}`] = letter;

/**
 * Character the layout types at a physical key, or null for keys it does not define
 */
export function getLayoutChar(
  layout: KeyboardLayout,
  code: string,
  shift: boolean,
  altGr: boolean
): string | null {
  const keyId = CODE_TO_KEY_ID[code];
  const key = keyId ? layout.keys.find((k) => k.id === keyId) : undefined;
  if (!key) return null;
  if (altGr) {
    if (!key.altGr) return null;
    return shift ? key.altGr.toLocaleUpperCase(layout.language) : key.altGr;
  }
  return shift ? (key.shifted ?? key.primary.toLocaleUpperCase(layout.language)) : key.primary;
}

/**
 * The combining mark of a dead key on the layout ('´' -> acute), or null
 */
export function getDeadKeyMark(layout: KeyboardLayout, char: string): string | null {
  const entry = Object.entries(layout.deadKeys ?? {}).find(([, dead]) => dead === char);
  return entry ? entry[0] : null;
}

/**
 * Tamil 99: an independent vowel typed after a consonant becomes its vowel
 * sign (க + ஆ = கா), as the system input method does
 */
export function applyVowelSign(layout: KeyboardLayout, previous: string, vowel: string): string {
  if (!layout.vowelSignKeys || !/[க-ஹ]$/.test(previous)) return vowel;
  const sign = Object.entries(layout.vowelSignKeys).find(([, key]) => key === vowel)?.[0];
  return sign ?? vowel;
}
