/**
 * Regenerates src/words/readings_ja.ts and readings_zh.ts source data.
 * Usage: npm install --prefix /tmp/readings pinyin-pro@3.29.5 wanakana@5.3.1 kuromoji@0.1.2
 *        node scripts/generate-readings.cjs /tmp/readings/node_modules . <out dir>
 * Writes ja.json and zh.json; review them before updating the readings files.
 */
const [, , deps, proj, out] = process.argv;
const fs = require('fs'), path = require('path');
const { pinyin } = require(path.join(deps, 'pinyin-pro'));
const wanakana = require(path.join(deps, 'wanakana'));
const kuromoji = require(path.join(deps, 'kuromoji'));
const words = (lang) => {
  const s = fs.readFileSync(path.join(proj, `src/words/words_${lang}.ts`), 'utf8').split('=').slice(1).join('=');
  return [...new Set([...s.matchAll(/["']([^"'\n]+)["']/g)].map(m => m[1].normalize('NFC')))];
};
// Chinese: toneless pinyin, ü as v (as typed in pinyin input methods)
// Reviewed corrections for characters with several readings
const ZH_FIXES = { '了': 'le' };
const zh = {};
for (const w of words('zh')) {
  const hanzi = w.replace(/[^\u4e00-\u9fff]/g, ''); // punctuation is not typed
  zh[w] = ZH_FIXES[w] ?? pinyin(hanzi, { toneType: 'none', type: 'array', v: true }).join('').toLowerCase();
}
fs.writeFileSync(path.join(out, 'zh.json'), JSON.stringify(zh, null, 1));
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
  console.log('ja', Object.keys(ja).length, 'zh', Object.keys(zh).length);
});
