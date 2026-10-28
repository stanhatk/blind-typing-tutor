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
