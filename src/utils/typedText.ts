import { hangulToJamo, isHangul, isUnfinishedSyllable } from './hangul';

// Typographic and typewriter apostrophes are typed with the same key
export const APOSTROPHES = ["'", '’', '‘', 'ʼ'];

export function charsMatch(typed: string, expected: string): boolean {
  return typed === expected || (APOSTROPHES.includes(typed) && APOSTROPHES.includes(expected));
}

/**
 * Whether typed text is an unfinished form of the expected character, so it
 * should wait for more keystrokes instead of counting as a mistake:
 * - a letter still missing some accents ('ê' or 'ă' for 'ế' or 'ặ'), as on
 *   the Vietnamese layout or with input tools that rewrite the last letter
 * - the first jamo of a Hangul syllable ('ㄷ' or '다' for '단')
 */
export function isPartialChar(typed: string, expected: string): boolean {
  if (!typed || typed === expected) return false;

  if (isHangul(expected)) {
    const typedJamo = hangulToJamo(typed);
    const expectedJamo = hangulToJamo(expected);
    return typedJamo.length < expectedJamo.length &&
      typedJamo.every((jamo, i) => jamo === expectedJamo[i]);
  }

  // Same base letter, and every typed accent is one the expected letter has
  const [typedBase, ...typedMarks] = [...typed.normalize('NFD')];
  const [expectedBase, ...expectedMarks] = [...expected.normalize('NFD')];
  return typedBase === expectedBase &&
    typedMarks.length < expectedMarks.length &&
    typedMarks.every((mark) => expectedMarks.includes(mark));
}

export interface ScoredInput {
  input: string; // Accepted text (typed characters, mistakes included unless correcting)
  pending: string | null; // Accepted text plus an unfinished character, if any
  typed: number;
  wrong: number;
}

/**
 * Score a longer input value against the text: every new character is
 * checked (paste and IMEs can insert several); an unfinished character at the
 * end (a letter waiting for an accent, a Hangul syllable still growing)
 * waits for more keys. In correction mode a mistake is not accepted.
 */
export function scoreInput(text: string, input: string, rawValue: string, correctionMode: boolean): ScoredInput {
  // Compare in NFC so 'é' typed as 'e' + combining accent matches 'é'
  const value = rawValue.normalize('NFC');
  let accepted = input;
  let typed = 0;
  let wrong = 0;
  for (let i = input.length; i < value.length && accepted.length < text.length; i++) {
    const expected = text[accepted.length];
    const rest = value.slice(i);
    const unfinished = isPartialChar(rest, expected) ||
      (i === value.length - 1 && isUnfinishedSyllable(value[i], text.slice(accepted.length)));
    if (unfinished) return { input: accepted, pending: accepted + rest, typed, wrong };
    typed++;
    if (charsMatch(value[i], expected)) {
      accepted += expected;
    } else {
      wrong++;
      if (correctionMode) break;
      accepted += value[i];
    }
  }
  return { input: accepted, pending: null, typed, wrong };
}
