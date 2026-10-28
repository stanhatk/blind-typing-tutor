/**
 * Hangul syllables are typed as jamo (letters) that the IME assembles into
 * syllable blocks: 가 = ㄱ + ㅏ, 왔 = ㅇ + ㅗ + ㅏ + ㅆ.
 */

const SYLLABLE_BASE = 0xac00;
const SYLLABLE_COUNT = 11172;

// Compatibility jamo, as printed on the keys, in Unicode syllable order
const INITIALS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const VOWELS = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const FINALS = ['', ...'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'];

// Jamo without their own key, typed as two keys
const COMPOUND_JAMO: Record<string, string> = {
  'ㅘ': 'ㅗㅏ', 'ㅙ': 'ㅗㅐ', 'ㅚ': 'ㅗㅣ', 'ㅝ': 'ㅜㅓ', 'ㅞ': 'ㅜㅔ', 'ㅟ': 'ㅜㅣ', 'ㅢ': 'ㅡㅣ',
  'ㄳ': 'ㄱㅅ', 'ㄵ': 'ㄴㅈ', 'ㄶ': 'ㄴㅎ', 'ㄺ': 'ㄹㄱ', 'ㄻ': 'ㄹㅁ', 'ㄼ': 'ㄹㅂ',
  'ㄽ': 'ㄹㅅ', 'ㄾ': 'ㄹㅌ', 'ㄿ': 'ㄹㅍ', 'ㅀ': 'ㄹㅎ', 'ㅄ': 'ㅂㅅ',
};

/**
 * Jamo keystrokes for text, in typing order. Other characters pass through.
 */
export function hangulToJamo(text: string): string[] {
  const jamo: string[] = [];
  for (const char of text) {
    const index = char.charCodeAt(0) - SYLLABLE_BASE;
    const parts = index >= 0 && index < SYLLABLE_COUNT
      ? [INITIALS[Math.floor(index / 588)], VOWELS[Math.floor((index % 588) / 28)], FINALS[index % 28]]
      : [char];
    for (const part of parts) {
      if (part) jamo.push(...(COMPOUND_JAMO[part] ?? part));
    }
  }
  return jamo;
}

export function isHangul(char: string): boolean {
  const code = char.charCodeAt(0);
  return (code >= SYLLABLE_BASE && code < SYLLABLE_BASE + SYLLABLE_COUNT) ||
    (code >= 0x3131 && code <= 0x318e);
}

// Two jamo typed in a row that form one: ㅗ + ㅏ = ㅘ, ㄱ + ㅅ = ㄳ
const COMBINED_JAMO: Record<string, string> = Object.fromEntries(
  Object.entries(COMPOUND_JAMO).map(([compound, parts]) => [parts, compound])
);

const syllable = (initial: string, vowel: string, final = '') =>
  String.fromCharCode(
    SYLLABLE_BASE + INITIALS.indexOf(initial) * 588 + VOWELS.indexOf(vowel) * 28 + FINALS.indexOf(final)
  );

/**
 * Add a typed jamo to text, assembling syllables as a Korean IME does:
 * ㄷ + ㅏ = 다, 다 + ㅇ = 당, 당 + ㅛ = 다요 (the final consonant moves on).
 */
export function composeHangul(text: string, jamo: string): string {
  const before = text.slice(0, -1);
  const last = text.slice(-1);
  const isVowel = VOWELS.includes(jamo);
  const index = last.charCodeAt(0) - SYLLABLE_BASE;

  if (last && index >= 0 && index < SYLLABLE_COUNT) {
    const initial = INITIALS[Math.floor(index / 588)];
    const vowel = VOWELS[Math.floor((index % 588) / 28)];
    const final = FINALS[index % 28];
    if (!isVowel) {
      const newFinal = final ? COMBINED_JAMO[final + jamo] : jamo;
      if (newFinal && FINALS.includes(newFinal)) return before + syllable(initial, vowel, newFinal);
      return text + jamo;
    }
    if (!final) {
      const combined = COMBINED_JAMO[vowel + jamo];
      return combined ? before + syllable(initial, combined) : text + jamo;
    }
    // The final consonant (or the second half of a double final) starts the next syllable
    const parts = COMPOUND_JAMO[final];
    const [kept, moved] = parts ? [parts[0], parts[1]] : ['', final];
    if (!INITIALS.includes(moved)) return text + jamo;
    return before + syllable(initial, vowel, kept) + syllable(moved, jamo);
  }
  if (last && INITIALS.includes(last) && isVowel) return before + syllable(last, jamo);
  if (last && VOWELS.includes(last) && isVowel && COMBINED_JAMO[last + jamo]) return before + COMBINED_JAMO[last + jamo];
  return text + jamo;
}

/**
 * Whether a Hangul syllable may still grow while typing the expected text:
 * 다 typed for 다요 can become 당 before the ㅇ moves on to 요.
 */
export function isUnfinishedSyllable(typed: string, expectedRest: string): boolean {
  if (!isHangul(typed)) return false;
  const typedJamo = hangulToJamo(typed);
  const expectedJamo = hangulToJamo(expectedRest.slice(0, 3));
  return typedJamo.length < expectedJamo.length && typedJamo.every((jamo, i) => jamo === expectedJamo[i]);
}
