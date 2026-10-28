import { hangulToJamo, isHangul } from './hangul';

/**
 * Words mode complexity, the same for every language:
 * - letters: random groups of the language's letters
 * - short / long: the shortest and longest third of the word list, by the
 *   length typed (romaji/pinyin for Japanese and Chinese), so "short" and
 *   "long" fit each language's own word lengths
 */
export const COMPLEXITIES = ['letters', 'short', 'long'] as const;
export type Complexity = (typeof COMPLEXITIES)[number];

export function isComplexity(value: string | null): value is Complexity {
  return COMPLEXITIES.includes(value as Complexity);
}

/**
 * Letters typed in a language's words, each with how often it occurs.
 * Lowercase letters only; vowel signs and other marks are left out because
 * they are not typed on their own (Hindi ा, Tamil ா). Hangul syllables count
 * as their jamo, the keys typed.
 */
export function getLetterFrequencies(typedWords: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const word of typedWords) {
    const letters = [...word].some(isHangul) ? hangulToJamo(word) : [...word];
    for (const letter of letters) {
      // Lowercase or uncased letters (not capitals, or ـ and ー, which lengthen others)
      if (!/^[\p{Ll}\p{Lo}]$/u.test(letter) || letter === '\u0640') continue;
      counts.set(letter, (counts.get(letter) ?? 0) + 1);
    }
  }
  return counts;
}

const MIN_WORDS = 30;

/**
 * The shortest or longest third of the words by typed length (at least 30)
 */
export function getWordsByLength(
  words: string[],
  typedWord: (word: string) => string,
  complexity: 'short' | 'long'
): string[] {
  const length = (word: string) => [...typedWord(word)].length;
  const sorted = [...words].sort((a, b) => length(a) - length(b));
  const third = Math.max(MIN_WORDS, Math.ceil(sorted.length / 3));
  if (complexity === 'short') {
    const limit = length(sorted[Math.min(third, sorted.length) - 1]);
    return words.filter((word) => length(word) <= limit);
  }
  const limit = length(sorted[Math.max(0, sorted.length - third)]);
  return words.filter((word) => length(word) >= limit);
}
