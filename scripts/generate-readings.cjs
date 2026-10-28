/**
 * Regenerates src/words/readings_ja.ts and readings_zh.ts source data, and the
 * per-word romanization of the Japanese/Chinese sentences in src/phrases/.
 * Usage: npm install --prefix /tmp/readings pinyin-pro@3.29.5 wanakana@5.3.1 kuromoji@0.1.2
 *        node scripts/generate-readings.cjs /tmp/readings/node_modules . <out dir>
 * Writes ja.json, zh.json, ja_phrases.json and zh_phrases.json; review them
 * before updating the readings files.
 */
const [, , deps, proj, out] = process.argv;
const fs = require('fs'), path = require('path');
const { pinyin } = require(path.join(deps, 'pinyin-pro'));
const wanakana = require(path.join(deps, 'wanakana'));
const kuromoji = require(path.join(deps, 'kuromoji'));
const strings = (file) => {
  const s = fs.readFileSync(path.join(proj, file), 'utf8').split('=').slice(1).join('=');
  return [...new Set([...s.matchAll(/["']([^"'\n]+)["']/g)].map(m => m[1].normalize('NFC')))];
};
const words = (lang) => strings(`src/words/words_${lang}.ts`);
const phrases = (lang) => strings(`src/phrases/phrases_${lang}.ts`);
// Full-width punctuation is typed with the ASCII key when the IME is off
const PUNCTUATION = { '。': '.', '、': ',', '，': ',', '？': '?', '！': '!' };
// Chinese: toneless pinyin, ü as v (as typed in pinyin input methods)
// Reviewed corrections for characters with several readings
const ZH_FIXES = { '了': 'le' };
const zh = {};
for (const w of words('zh')) {
  const hanzi = w.replace(/[^\u4e00-\u9fff]/g, ''); // punctuation is not typed
  zh[w] = ZH_FIXES[w] ?? pinyin(hanzi, { toneType: 'none', type: 'array', v: true }).join('').toLowerCase();
}
fs.writeFileSync(path.join(out, 'zh.json'), JSON.stringify(zh, null, 1));

// Chinese sentences: one token per character, so each hanzi sits above its
// syllable; pinyin-pro reads characters in sentence context (polyphones)
// Reviewed corrections: sentence -> { character index: pinyin }
const ZH_PHRASE_FIXES = { '我得买面包和牛奶。': { 1: 'dei' }, '慢慢地仔细打字。': { 2: 'de' } };
const zhPhrases = {};
for (const sentence of phrases('zh')) {
  const context = pinyin(sentence, { toneType: 'none', type: 'array', v: true });
  if (context.length !== [...sentence].length) throw new Error(`pinyin misaligned: ${sentence}`);
  zhPhrases[sentence] = [...sentence].map((char, i) =>
    [char, PUNCTUATION[char] ?? ZH_PHRASE_FIXES[sentence]?.[i] ?? context[i].toLowerCase()]);
}
fs.writeFileSync(path.join(out, 'zh_phrases.json'), JSON.stringify(zhPhrases, null, 1));
// Japanese: kana reading, then IME keystrokes
// Kana that wanakana spells differently from IME input
const EXTENDED = {
  'ふぁ': 'fa', 'ふぃ': 'fi', 'ふぇ': 'fe', 'ふぉ': 'fo', 'うぃ': 'wi', 'うぇ': 'we', 'うぉ': 'who',
  'てぃ': 'thi', 'でぃ': 'dhi', 'とぅ': 'twu', 'どぅ': 'dwu', 'しぇ': 'she', 'じぇ': 'je', 'ちぇ': 'che',
  'ゔぁ': 'va', 'ゔぃ': 'vi', 'ゔぇ': 've', 'ゔぉ': 'vo', 'ゔ': 'vu',
};
const toHira = (kana) => wanakana.toHiragana(kana, { passRomaji: true, convertLongVowelMark: false });
const kanaToKeys = (kana) => {
  let hira = toHira(kana);
  for (const [k, v] of Object.entries(EXTENDED)) hira = hira.split(k).join(v);
  // ん is typed "nn" so it never merges with the next kana
  return hira.split('ん').map(part => wanakana.toRomaji(part))
    .join('nn')
    .replace(/ー/g, '-')
    .replace(/tch/g, 'cch'); // っち is typed "cchi"
};
// Reviewed corrections where the analyzer picked the wrong reading
const JA_FIXES = { '後': 'うしろ', '分': 'ふん', '日本': 'にほん', '辛い': 'からい', '万': 'まん' };
kuromoji.builder({ dicPath: path.join(deps, 'kuromoji/dict') }).build((err, tokenizer) => {
  if (err) throw err;
  const ja = {};
  for (const w of words('ja')) {
    const reading = JA_FIXES[w] ?? (/[\u4e00-\u9fff]/.test(w)
      ? tokenizer.tokenize(w).map(t => (t.reading && t.reading !== '*') ? t.reading : t.surface_form).join('')
      : w);
    ja[w] = { kana: toHira(reading), keys: kanaToKeys(reading) };
  }
  fs.writeFileSync(path.join(out, 'ja.json'), JSON.stringify(ja, null, 1));

  // Japanese sentences: one token per word, with inflections, auxiliaries and
  // suffixes attached to the word before them (食べ + ます -> 食べます)
  const attaches = (t) => t.pos === '助動詞' || t.pos_detail_1 === '接尾' ||
    (t.pos === '動詞' && t.pos_detail_1 === '非自立') ||
    (t.pos === '助詞' && t.pos_detail_1 === '接続助詞' && ['て', 'で', 'ば'].includes(t.surface_form));
  // Reviewed corrections where the reading depends on the sentence
  const JA_PHRASE_FIXES = {
    '何です': 'なんです', '角': 'かど', '空きました': 'すきました', '開いています': 'あいています',
    '開きます': 'あきます', '弾きます': 'ひきます', '一匹': 'いっぴき', '九時': 'くじ',
  };
  const jaPhrases = {};
  for (const sentence of phrases('ja')) {
    const tokens = [];
    for (const t of tokenizer.tokenize(sentence)) {
      const surface = t.surface_form;
      if (PUNCTUATION[surface]) {
        tokens.push([surface, PUNCTUATION[surface], null, false]);
        continue;
      }
      const reading = t.reading && t.reading !== '*' ? t.reading : surface;
      const previous = tokens[tokens.length - 1];
      // Attach endings to their word, and words to a preceding prefix (お + 名前)
      if (previous && previous[1] === null && (attaches(t) || previous[3])) {
        previous[0] += surface;
        previous[2] += reading;
        previous[3] = false;
      } else {
        tokens.push([surface, null, reading, t.pos === '接頭詞']);
      }
    }
    for (const token of tokens) {
      if (JA_PHRASE_FIXES[token[0]]) token[2] = JA_PHRASE_FIXES[token[0]];
    }
    jaPhrases[sentence] = tokens.map(([native, typed, reading]) => [native, typed ?? kanaToKeys(reading)]);
  }
  fs.writeFileSync(path.join(out, 'ja_phrases.json'), JSON.stringify(jaPhrases, null, 1));
  console.log('ja', Object.keys(ja).length, 'zh', Object.keys(zh).length);
});
