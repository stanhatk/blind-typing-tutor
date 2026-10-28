/**
 * Builds candidate word lists from frequency data, for review before they
 * replace src/words/words_{lang}.ts.
 *
 * Usage:
 *   node scripts/build-word-lists.cjs <data dir> <out dir> [--write] [lang...]
 *
 * With --write, also replaces src/words/words_{lang}.ts with the result
 * (frequency words, then the curated words kept).
 *
 * <data dir> holds downloads (not committed):
 *   freq/{lang}.txt    FrequencyWords 2018 {lang}_50k.txt, "word count" per line
 *                      (CC BY-SA 4.0, https://github.com/hermitdave/FrequencyWords)
 *   casing/{lang}.txt  "rank<TAB>word<TAB>count" of word casings, counted from
 *                      Leipzig Corpora Collection sentences (CC BY 4.0,
 *                      https://wortschatz.uni-leipzig.de/en/download), skipping
 *                      sentence-initial words. Made by casing.py.
 *   bad/{code}.txt     LDNOOBW lists (CC BY 4.0), to drop profanity
 *
 * A frequency word is kept when it is typeable on the language's layouts and
 * appears in the corpus mostly in lowercase (mostly capitalized = a name).
 * German keeps the capitalized form instead, since it capitalizes nouns.
 * Languages without FrequencyWords data are ranked by the corpus counts.
 *
 * Writes {out}/{lang}.json: the frequency words, the existing curated words
 * kept, and the ones dropped with reasons.
 */
const [, , dataDir, outDir, ...rest] = process.argv;
const write = rest.includes('--write');
const onlyLangs = rest.filter((arg) => arg !== '--write');
const fs = require('fs');
const path = require('path');
const { createJiti } = require('jiti');

const project = path.join(__dirname, '..');
const jiti = createJiti(project + '/', { alias: { '@': project + '/src' } });

const TARGET = 1000; // frequency words per language
const MAX_RANK = 20000; // only consider the most frequent words
const MIN_CORPUS_COUNT = 3;
const BAD = { tl: 'fil' };
// Languages that capitalize common nouns (German "Haus")
const CAPITALIZED_NOUNS = new Set(['de']);
// Names and foreign words found in review, dropped from the frequency lists
const EXCLUDE = {
  de: ['david', 'max', 'paris', 'the', 'you', 'okay', 'ok', 'hey', 'jack', 'john', 'mike', 'sam', 'tom', 'captain', 'sir'],
  ar: ['ماري'],
  it: ['po'], // fragment of po’
  uk: ['да', 'но'], // Russian words common in Ukrainian subtitles
  ta: ['கொரோனா', 'வைரஸ்'], // corona, virus: a 2020 news corpus
  // English words in Wikipedia text
  tl: ['of', 'album', 'de', 'and', 'video', 'in', 'for', 'season', 'network', 'to', 'media', 'no', 'base', 'studio',
    'rock', 'single', 'drama', 'del', 'game', 'live', 'normal', 'year', 'popular', 'on', 'record', 'natural',
    'channel', 'personal', 'track', 'metal', 'show', 'species', 'basketball', 'artist', 'digital', 'system',
    'gas', 'tour', 'online', 'regular'],
  sw: ['of', 'video', 'de', 'studio', 'single', 'data', 'es', 'in', 'and'],
};
// Everyday words the profanity lists also match, kept after review
const ALLOW = {
  pt: ['comer', 'cerveja', 'inferno', 'saco'],
  it: ['pesce', 'regina', 'cadavere', 'tirare'],
  es: ['infierno', 'drogas', 'asesinato', 'idiota'],
  fr: ['folle'],
  nl: ['nicht', 'pot', 'gat', 'beurt', 'schatje'],
  sv: ['hård'],
  fi: ['panna', 'jätkä'],
};
// Languages whose subtitles often drop diacritics: ranked by the news corpus
// instead, and words rejected when a form with diacritics is far more common
const CORPUS_RANKED = new Set(['ro', 'sr']);
const stripMarks = (word) => word.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC');
// Legacy cedilla letters typed with the comma-below keys (Romanian ş ţ -> ș ț),
// and one apostrophe character for words that contain one (ім’я, aujourd’hui)
const fixLetters = (lang, word) => {
  let fixed = word.replace(/['ʼ]/g, '’');
  // Persian is written with ی and ک, not the Arabic ي and ك often found in subtitles
  if (lang === 'fa') fixed = fixed.replace(/ي/g, 'ی').replace(/ك/g, 'ک');
  return lang === 'ro' ? fixed.replace(/ş/g, 'ș').replace(/ţ/g, 'ț').replace(/Ş/g, 'Ș').replace(/Ţ/g, 'Ț') : fixed;
};
// Letters and marks, optionally joined by an apostrophe or hyphen inside the word
const WORD = String.raw`[\p{L}\p{M}]+(?:[’-][\p{L}\p{M}]+)*`;

const read = (file) => fs.readFileSync(file, 'utf8');
const exists = (file) => fs.existsSync(file);

async function main() {
  const { getLayoutIdsForLanguage, getLayout } = await jiti.import('./src/config/layouts/index.ts');
  const { canTypeChar } = await jiti.import('./src/utils/keyStrokes.ts');

  const langs = onlyLangs.length ? onlyLangs : fs.readdirSync(path.join(dataDir, 'casing')).map((f) => f.replace('.txt', ''));
  for (const lang of langs) {
    const layouts = getLayoutIdsForLanguage(lang).map((id) => getLayout(id));
    if (layouts.length === 0) {
      console.log(`${lang}: no layout, skipped`);
      continue;
    }
    // Typed form: romaji/pinyin for Japanese and Chinese, else the word itself
    let readings = {};
    const typeable = (word) => [...(readings[word] ?? word)].every((c) => layouts.every((layout) => canTypeChar(layout, c)));
    const allowSpaces = lang === 'vi'; // Vietnamese words are space-separated syllables
    const shape = new RegExp(allowSpaces ? `^${WORD}( ${WORD})*$` : `^${WORD}$`, 'u');
    const lower = (word) => fixLetters(lang, word.toLocaleLowerCase(lang).normalize('NFC'));

    // Corpus counts: lowercase word -> { casing: count }
    const casing = new Map();
    const casingFile = path.join(dataDir, `casing/${lang}.txt`);
    if (exists(casingFile)) {
      for (const line of read(casingFile).split('\n')) {
        const [, rawVariant, count] = line.split('\t');
        const variant = rawVariant && fixLetters(lang, rawVariant.normalize('NFC'));
        // Letters only, lowercase or Capitalized (not ALL CAPS)
        if (!variant || !shape.test(variant) || variant.slice(1) !== lower(variant.slice(1))) continue;
        const counts = casing.get(lower(variant)) ?? {};
        counts[variant] = (counts[variant] ?? 0) + Number(count);
        casing.set(lower(variant), counts);
      }
    }
    const total = (counts) => Object.values(counts).reduce((a, b) => a + b, 0);
    // Most common spelling for each form without diacritics ("si" -> "și")
    const accented = new Map();
    for (const [word, counts] of casing) {
      const key = stripMarks(word);
      if (total(counts) > (accented.get(key)?.count ?? 0)) accented.set(key, { word, count: total(counts) });
    }
    const missingDiacritics = (word) => {
      if (!CORPUS_RANKED.has(lang) || stripMarks(word) !== word) return false;
      const best = accented.get(word);
      return !!best && best.word !== word && best.count >= 3 * total(casing.get(word) ?? {});
    };

    // The correctly cased common word, or null for unknown words and names
    const canonical = (word) => {
      const counts = casing.get(word);
      if (!counts || total(counts) < MIN_CORPUS_COUNT) return null;
      const lowercaseCount = counts[word] ?? 0;
      const [best, bestCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      if (CAPITALIZED_NOUNS.has(lang)) {
        // Prefer lowercase when it is common too (adjectives also used as nouns: rot/Rot)
        return lowercaseCount >= 0.3 * bestCount ? word : best;
      }
      return lowercaseCount * 2 >= total(counts) ? word : null;
    };

    const badFile = path.join(dataDir, `bad/${BAD[lang] ?? lang}.txt`);
    const bad = new Set(exists(badFile) ? read(badFile).split('\n').map((w) => lower(w.trim())).filter(Boolean) : []);

    const reasonFor = (word) => {
      if (!shape.test(word)) return 'shape';
      const length = [...word].length;
      if (length < 2 || length > 15) return 'length';
      if (bad.has(lower(word)) && !ALLOW[lang]?.includes(lower(word))) return 'profanity';
      if (!typeable(word)) return 'untypeable';
      if (missingDiacritics(lower(word))) return 'diacritics';
      return null;
    };

    // Ranked candidates: subtitle frequencies, or corpus counts when missing
    const freqFile = path.join(dataDir, `freq/${lang}.txt`);
    const ranked = exists(freqFile) && !CORPUS_RANKED.has(lang)
      ? read(freqFile).split('\n').slice(0, MAX_RANK).map((line) => lower(line.split(' ')[0] ?? ''))
      : [...casing.entries()].sort((a, b) => total(b[1]) - total(a[1])).slice(0, MAX_RANK).map(([word]) => word);

    const frequent = [];
    const rejected = {};
    for (const raw of ranked) {
      if (!raw || EXCLUDE[lang]?.includes(raw)) continue;
      const reason = reasonFor(raw) ?? (canonical(raw) ? null : 'corpus');
      const word = reason ? null : canonical(raw);
      if (!word || frequent.includes(word)) {
        if (reason) rejected[reason] = (rejected[reason] ?? 0) + 1;
        continue;
      }
      frequent.push(word);
      if (frequent.length >= TARGET) break;
    }

    // Existing curated words: kept unless invalid
    let curated = [];
    // Read the language's own files: loadContent falls back to English for
    // languages it does not know yet
    const wordsFile = path.join(project, `src/words/words_${lang}.ts`);
    if (exists(wordsFile)) {
      curated = (await jiti.import(wordsFile)).words;
      const readingsFile = path.join(project, `src/words/readings_${lang}.ts`);
      if (exists(readingsFile)) readings = (await jiti.import(readingsFile)).readings;
    }
    const kept = [];
    const dropped = [];
    for (const original of new Set(curated.map((w) => fixLetters(lang, w.normalize('NFC'))))) {
      // Fix the casing of curated German nouns too ("gesicht" -> "Gesicht")
      const word = CAPITALIZED_NOUNS.has(lang) ? (canonical(lower(original)) ?? original) : original;
      const reason = /\p{L}/u.test(word) ? (reasonFor(word) === 'length' && [...word].length === 1 ? null : reasonFor(word)) : 'shape';
      if (reason) dropped.push({ word, reason });
      else if (!frequent.includes(word) && !kept.includes(word)) kept.push(word);
    }

    fs.writeFileSync(path.join(outDir, `${lang}.json`), JSON.stringify({ frequent, kept, dropped, rejected }, null, 1));
    const source = frequent.length === 0 ? 'curated' : exists(freqFile) && !CORPUS_RANKED.has(lang) ? 'subtitles' : 'corpus';
    if (write) writeWordList(lang, [...frequent, ...kept], source);
    console.log(`${lang}: ${frequent.length} frequency + ${kept.length} curated kept, ${dropped.length} curated dropped; rejected ${JSON.stringify(rejected)}`);
  }
}

function writeWordList(lang, words, source) {
  const name = new Intl.DisplayNames(['en'], { type: 'language' }).of(lang);
  const header = {
    subtitles: ` * Built by scripts/build-word-lists.cjs from FrequencyWords (Hermit Dave,
 * OpenSubtitles 2018, CC BY-SA 4.0), checked against the Leipzig Corpora
 * Collection (CC BY 4.0), plus hand-curated words.
 * This list is licensed CC BY-SA 4.0.`,
    corpus: ` * Built by scripts/build-word-lists.cjs from the Leipzig Corpora Collection
 * (CC BY 4.0), plus hand-curated words.
 * This list is licensed CC BY 4.0.`,
    curated: ` * Hand-curated; deduplicated by scripts/build-word-lists.cjs.`,
  }[source];
  const lines = [];
  for (let i = 0; i < words.length; i += 10) {
    lines.push('  ' + words.slice(i, i + 10).map((w) => JSON.stringify(w)).join(', ') + ',');
  }
  const order = source === 'curated' ? '' : ', most frequent first';
  const file = `/**
 * ${name} words for typing practice${order}.
${header}
 */
export const words: string[] = [
${lines.join('\n')}
];
`;
  fs.writeFileSync(path.join(project, `src/words/words_${lang}.ts`), file);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
