import type { LanguageCode } from '../types/keyboard';
import { getLetterFrequencies, getWordsByLength, type Complexity } from './complexity';
import { getPracticeChars } from './practiceLayout';
import type { LanguageContent } from '../words';

export type Language = LanguageCode;

/**
 * A native word shown above the romanization typed for it
 */
export interface WordHint {
  start: number; // Index of the word's first character in the text
  end: number;   // Index after its last character
  native: string;
}

export interface GeneratedText {
  text: string;
  hints: WordHint[];
}

/**
 * What to type for a word: its romanization (Japanese, Chinese), or the word
 * itself. Romanized languages are practiced by typing romaji or pinyin with
 * the native word shown above it.
 */
export function getTypedWord(content: LanguageContent, word: string): string {
  return content.readings?.[word] ?? word;
}

export class Generator {
  private words: string[] = [];
  private allWords: string[];
  private content: LanguageContent;
  // Short and long words, and letter frequencies, computed once
  private lengthPools = new Map<Complexity, string[]>();
  private letterFrequencies?: Map<string, number>;
  private practiceChars?: Set<string>;

  /**
   * Every character typed when practicing this language (computed once)
   */
  public getPracticeChars(): Set<string> {
    this.practiceChars ??= getPracticeChars(this.content);
    return this.practiceChars;
  }
  private number: number;
  private language: Language;

  constructor(lang: Language, content: LanguageContent, number: number = 8) {
    this.language = lang;
    this.content = content;
    this.allWords = content.words;
    if (this.allWords.length === 0) {
      console.error(`No words found for language: ${lang}`);
    }
    this.number = number;
    this.update();
  }

  private rand(low: number, high: number) {
    return Math.floor((high - low + 1) * Math.random()) + Math.floor(low);
  }

  public update() {
    if (this.allWords.length === 0) {
      console.error('Cannot update: word list is empty');
      this.words = [];
      return;
    }

    const output: string[] = [];
    for (let i = 0; i < this.number; i++) {
      output.push(this.allWords[this.rand(0, this.allWords.length - 1)]);
    }
    this.words = output;
  }

  private shuffle(array: string[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  public getWords(): GeneratedText {
    if (this.words.length === 0) {
      console.error('Cannot get words: word list is empty. Attempting to update...');
      this.update();
      if (this.words.length === 0) {
        return { text: '', hints: [] };
      }
    }
    return this.toText(this.shuffle(this.words));
  }

  /**
   * Words mode text for a complexity: random letter groups, or different
   * short or long words
   */
  public getComplexityText(complexity: Complexity): GeneratedText {
    if (complexity === 'letters') return this.getLetterGroups();
    let pool = this.lengthPools.get(complexity);
    if (!pool) {
      pool = getWordsByLength(this.allWords, (word) => getTypedWord(this.content, word), complexity);
      this.lengthPools.set(complexity, pool);
    }
    return this.toText(this.shuffle(pool).slice(0, this.number));
  }

  // Random letter groups, common letters more often (square root of their
  // frequency, so rare letters still come up). Korean jamo are typed one per
  // group: an IME would join neighbours into a syllable.
  private getLetterGroups(): GeneratedText {
    this.letterFrequencies ??= getLetterFrequencies(this.allWords.map((word) => getTypedWord(this.content, word)));
    const letters = [...this.letterFrequencies.entries()].map(([letter, count]) => [letter, Math.sqrt(count)] as const);
    const total = letters.reduce((sum, [, weight]) => sum + weight, 0);
    const pick = () => {
      let r = Math.random() * total;
      for (const [letter, weight] of letters) {
        r -= weight;
        if (r <= 0) return letter;
      }
      return letters[letters.length - 1][0];
    };
    const singleLetters = this.language === 'ko';
    const groups = Array.from({ length: singleLetters ? 12 : this.number }, () =>
      Array.from({ length: singleLetters ? 1 : this.rand(3, 5) }, pick).join('')
    );
    return { text: groups.join(' '), hints: [] };
  }

  // Join words into the text to type, with native-word hints for romanized languages
  private toText(words: string[]): GeneratedText {
    const romanized = !!this.content.readings;
    const hints: WordHint[] = [];
    let text = '';
    for (const word of words) {
      if (text) text += ' ';
      const typed = getTypedWord(this.content, word);
      if (romanized) hints.push({ start: text.length, end: text.length + typed.length, native: word });
      text += typed;
    }
    return { text, hints };
  }

  /**
   * Two or three everyday sentences (Phrases mode), or random words when the
   * language has no sentences yet
   */
  public getPhrases(): GeneratedText {
    const phrases = this.content.phrases;
    if (!phrases?.length) {
      this.update();
      return this.getWords();
    }
    const picked: string[] = [];
    let length = 0;
    while (picked.length < 3 && (picked.length < 2 || length < 60)) {
      const phrase = phrases[this.rand(0, phrases.length - 1)];
      if (picked.includes(phrase) && phrases.length > picked.length) continue;
      picked.push(phrase);
      length += phrase.length;
    }

    const hints: WordHint[] = [];
    let text = '';
    for (const phrase of picked) {
      const tokens = this.content.phraseTokens?.[phrase];
      if (!tokens) {
        text += (text ? ' ' : '') + phrase;
        continue;
      }
      // Romanized sentence: words separated by spaces, punctuation attached
      for (const [native, typed] of tokens) {
        const isWord = /\p{L}/u.test(typed);
        if (isWord && text) text += ' ';
        if (isWord) hints.push({ start: text.length, end: text.length + typed.length, native });
        text += typed;
      }
    }
    return { text, hints };
  }

  public getLanguage() {
    return this.language;
  }
}

