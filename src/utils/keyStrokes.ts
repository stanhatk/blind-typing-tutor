import type { KeyboardLayout } from '../types/keyboard';
import { hangulToJamo, isHangul } from './hangul';
import { APOSTROPHES } from './typedText';

export interface KeyStroke {
  targetKeyId: string;
  shiftTarget: 'l' | 'r' | null;
  altGr: boolean;
}

/**
 * Find the key (and Shift/AltGr) that produces a character directly
 */
function findDirectKeyStroke(layout: KeyboardLayout, char: string): KeyStroke | null {
  const lower = char.toLocaleLowerCase(layout.language);
  const isUpperCase = char !== lower;

  let keyDef = layout.keys.find(k =>
    k.primary === char || k.shifted === char || (!isUpperCase && k.primary.toLowerCase() === lower)
  );
  let altGr = false;
  let isShifted = !!keyDef && keyDef.primary !== char && keyDef.shifted === char;
  if (!keyDef) {
    // AltGr level; Shift+AltGr gives the uppercase letter (e.g. 'Ą')
    keyDef = layout.keys.find(k => k.altGr === char || (isUpperCase && k.altGr === lower));
    altGr = !!keyDef;
    isShifted = !!keyDef && keyDef.altGr !== char;
  }
  if (!keyDef) return null;

  // Shift is pressed with the hand that is not typing the key (finger groups 1-4 are the left hand)
  const isLeftHand = (keyDef.group ?? 8) <= 4;
  return {
    targetKeyId: keyDef.id,
    shiftTarget: isShifted ? (isLeftHand ? 'r' : 'l') : null,
    altGr,
  };
}

/**
 * Find the key on its own, or another apostrophe variant if the layout only has one
 */
export function findKeyStroke(layout: KeyboardLayout, char: string): KeyStroke | null {
  const direct = findDirectKeyStroke(layout, char);
  if (direct || !APOSTROPHES.includes(char)) return direct;
  for (const variant of APOSTROPHES) {
    const stroke = findDirectKeyStroke(layout, variant);
    if (stroke) return stroke;
  }
  return null;
}

/**
 * Split an accented letter into its dead key and base letter
 * (e.g. 'ã' -> '~', 'a'; 'Á' -> '´', 'A'), or null if not possible.
 */
export function getDeadKeySequence(
  layout: KeyboardLayout,
  char: string
): { deadChar: string; base: string } | null {
  const [base, mark, ...rest] = [...char.normalize('NFD')];
  const deadChar = mark && rest.length === 0 ? layout.deadKeys?.[mark] : undefined;
  return deadChar ? { deadChar, base } : null;
}

/**
 * Letter keys followed by combining-accent keys, as on the Vietnamese layout:
 * 'ế' = 'ê' then acute, 'ặ' = 'ă' then dot below.
 */
function getCombiningSequence(layout: KeyboardLayout, char: string): string[] | null {
  const [base, ...marks] = [...char.normalize('NFD')];
  if (marks.length === 0 || marks.length > 3) return null;

  // Try every split of the accents into "precomposed on the letter key" and
  // "typed afterwards", preferring the most precomposed letter
  const splits = Array.from({ length: 1 << marks.length }, (_, mask) => mask)
    .sort((a, b) => countBits(b) - countBits(a));
  for (const mask of splits) {
    const onLetter = marks.filter((_, i) => mask & (1 << i));
    const after = marks.filter((_, i) => !(mask & (1 << i)));
    const letter = (base + onLetter.join('')).normalize('NFC');
    if ([...letter].length === 1 && findKeyStroke(layout, letter) &&
      after.every(mark => findKeyStroke(layout, mark))) {
      return [letter, ...after];
    }
  }
  return null;
}

function countBits(n: number): number {
  return n.toString(2).replace(/0/g, '').length;
}

/**
 * Characters to type, in order, to produce one character of the text
 */
export function getCharKeySequence(layout: KeyboardLayout, char: string): string[] | null {
  if (char === ' ' || findKeyStroke(layout, char)) return [char];

  // Tamil 99: a vowel sign is typed with its independent-vowel key
  const vowelKey = layout.vowelSignKeys?.[char];
  if (vowelKey && findKeyStroke(layout, vowelKey)) return [vowelKey];

  if (isHangul(char)) {
    const jamo = hangulToJamo(char);
    return jamo.every(j => findKeyStroke(layout, j)) ? jamo : null;
  }

  const deadKey = getDeadKeySequence(layout, char);
  if (deadKey && findKeyStroke(layout, deadKey.deadChar) && findKeyStroke(layout, deadKey.base)) {
    return [deadKey.deadChar, deadKey.base];
  }

  return getCombiningSequence(layout, char);
}

/**
 * Whether a character can be typed on the layout
 */
export function canTypeChar(layout: KeyboardLayout, char: string): boolean {
  return getCharKeySequence(layout, char) !== null;
}

/**
 * The next character to type, given the upcoming text and what is already
 * typed of it but not finished (a dead key, a letter waiting for its accent,
 * or a Hangul syllable being composed). Looks past the first character because
 * a Korean IME can show the next syllable's first jamo on the current one.
 */
export function getNextKeyChar(
  layout: KeyboardLayout,
  upcomingText: string,
  pendingText: string,
  deadKeyPending: boolean
): string | null {
  const sequence: string[] = [];
  for (const char of upcomingText) {
    const keys = getCharKeySequence(layout, char);
    if (!keys) break;
    sequence.push(...keys);
  }
  if (sequence.length === 0) return null;

  // Windows dead keys produce no text until the next key is pressed
  if (!pendingText) {
    const startsWithDeadKey = Object.values(layout.deadKeys ?? {}).includes(sequence[0]);
    return deadKeyPending && startsWithDeadKey && sequence.length > 1 ? sequence[1] : sequence[0];
  }

  const typed: string[] = [];
  for (const char of pendingText) {
    typed.push(...(getCharKeySequence(layout, char) ?? [char]));
  }
  const isPrefix = typed.length < sequence.length && typed.every((key, i) => key === sequence[i]);
  return isPrefix ? sequence[typed.length] : sequence[0];
}
