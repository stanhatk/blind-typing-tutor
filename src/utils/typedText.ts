import { hangulToJamo, isHangul } from './hangul';

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
