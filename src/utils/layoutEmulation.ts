import type { KeyboardLayout } from '../types/keyboard';
import { composeHangul, isHangul } from './hangul';
import { charsMatch, scoreInput } from './typedText';

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

export type KeyPressResult =
  | { kind: 'native' } // Let the system layout type its character
  | { kind: 'deadKey'; mark: string } // An emulated dead key, waiting for its letter
  | { kind: 'type'; value: string }; // The new input value

/**
 * What a key press types while practicing. The system layout's own character
 * is kept when it fits the text (it is the expected character or the start of
 * it), so typing with the practice language's layout installed is unchanged.
 * Otherwise the practice layout's character at the same physical key is
 * typed: with Shift/AltGr, dead keys, Tamil vowel signs and Hangul syllables.
 */
export function emulateKeyPress(options: {
  practiceLayout: KeyboardLayout;
  text: string; // Text to type
  input: string; // Accepted input
  value: string; // Input value, including an unfinished character
  systemKey: string; // KeyboardEvent.key: the system layout's character, or "Dead"
  code: string; // KeyboardEvent.code: the physical key
  shift: boolean;
  altGr: boolean;
  deadMark: string | null; // Mark of an emulated dead key waiting for its letter
}): KeyPressResult {
  const { practiceLayout, text, input, value, systemKey, code, shift, altGr, deadMark } = options;
  const expected = text[value.length];
  // Space after an emulated dead key types the accent itself (as on Windows)
  if (code === 'Space' && deadMark) {
    return { kind: 'type', value: value + (practiceLayout.deadKeys?.[deadMark] ?? '') + ' ' };
  }
  // An input method handles the key ("Process"), or it is a named key (Enter).
  // Keys typing several characters at once (Arabic لا) are characters too.
  const isNamedKey = systemKey !== 'Dead' && /^[A-Z][A-Za-z0-9]+$/.test(systemKey);
  if (systemKey === 'Process' || systemKey === 'Unidentified' || isNamedKey) {
    return { kind: 'native' };
  }
  const char = getLayoutChar(practiceLayout, code, shift, altGr);
  if (!char) return { kind: 'native' };

  // Keep the system's character when it fits the text. System dead keys are
  // always emulated (their accent may differ from the practice layout's). An
  // unfinished letter counts only when the practice layout types it too: on
  // systems without AltGr, Alt+E types a plain "e", and Turkish Q types "i"
  // where Spanish has its acute dead key, neither the start of "ę" or "í".
  if (!deadMark && systemKey !== 'Dead') {
    const scored = scoreInput(text, input, value + systemKey, true);
    const fits = scored.wrong === 0 && (scored.typed > 0 || (!!scored.pending && !altGr && systemKey === char));
    if (fits) return { kind: 'native' };
  }

  // A dead key waits for its letter, unless the text wants the accent itself
  const mark = getDeadKeyMark(practiceLayout, char);
  if (mark && !deadMark && !(expected && charsMatch(char, expected))) return { kind: 'deadKey', mark };
  let typed = char;
  if (deadMark) {
    const composed = (char + deadMark).normalize('NFC');
    typed = [...composed].length === 1 ? composed : char;
  }
  if (practiceLayout.language === 'ko' && isHangul(typed)) {
    return { kind: 'type', value: composeHangul(value, typed) };
  }
  return { kind: 'type', value: value + applyVowelSign(practiceLayout, value, typed) };
}
