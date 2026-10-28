/**
 * Converts a Microsoft Keyboard Layout Creator (.klc) file into a layout file
 * for src/config/layouts/, so layouts come from Microsoft's definitions
 * (downloadable from https://kbdlayout.info/<name>/download/klc).
 *
 * Usage:
 *   node scripts/klc-to-layout.cjs <file.klc> <id> <exportName> <name> <language> <flag>
 * Example:
 *   node scripts/klc-to-layout.cjs kbdcr.klc hr-hr hrHrLayout "Hrvatski" hr 🇭🇷
 *
 * Keeps the key ids, finger groups and row order of en-us.ts, takes the base,
 * Shift and AltGr characters from the KLC file, adds the ISO key left of Z when
 * the layout uses it, and derives deadKeys (combining mark -> dead key) from the
 * KLC DEADKEY tables. Writes src/config/layouts/<id>.ts.
 */
const [, , klcFile, id, exportName, name, language, flag] = process.argv;
const fs = require('fs');
const path = require('path');

// KLC scancode -> key id used by the layouts
const SCANCODES = {
  29: 'backtick', '02': '1', '03': '2', '04': '3', '05': '4', '06': '5', '07': '6', '08': '7', '09': '8',
  '0a': '9', '0b': '0', '0c': 'underscore', '0d': 'equal',
  10: 'q', 11: 'w', 12: 'e', 13: 'r', 14: 't', 15: 'y', 16: 'u', 17: 'i', 18: 'o', 19: 'p',
  '1a': 'leftSquareBracket', '1b': 'rightSquareBracket', '2b': 'backSlash',
  '1e': 'a', '1f': 's', 20: 'd', 21: 'f', 22: 'g', 23: 'h', 24: 'j', 25: 'k', 26: 'l', 27: 'cologn', 28: 'quote',
  '2c': 'z', '2d': 'x', '2e': 'c', '2f': 'v', 30: 'b', 31: 'n', 32: 'm', 33: 'comma', 34: 'period', 35: 'slash',
  56: 'intlBackslash',
};

const buffer = fs.readFileSync(klcFile);
const text = (buffer[0] === 0xff && buffer[1] === 0xfe ? buffer.toString('utf16le') : buffer.toString('utf8')).replace(/^﻿/, '');
const lines = text.split(/\r?\n/).map((line) => line.replace(/\/\/.*$/, '').trim());

// Columns of the LAYOUT table, from the SHIFTSTATE section
const shiftStates = [];
let i = lines.findIndex((line) => line === 'SHIFTSTATE') + 1;
for (; lines[i] !== undefined && /^\d+$/.test(lines[i]) || lines[i] === ''; i++) {
  if (lines[i]) shiftStates.push(Number(lines[i]));
  else if (shiftStates.length) break;
}
const column = (state) => shiftStates.indexOf(state);

// Ligatures: "VK state char char ..." used where the table says %%
const ligatures = {};
const ligStart = lines.findIndex((line) => line === 'LIGATURE');
if (ligStart >= 0) {
  for (let j = ligStart + 1; j < lines.length && !/^[A-Z]+$/.test(lines[j]); j++) {
    const [vk, state, ...chars] = lines[j].split(/\s+/);
    if (vk && chars.length) ligatures[`${vk}:${state}`] = chars.map(decode).join('');
  }
}

function decode(value) {
  const clean = value.replace(/@$/, '');
  if (clean === '-1' || clean === '') return null;
  return clean.length === 4 && /^[0-9a-f]{4}$/i.test(clean) ? String.fromCodePoint(parseInt(clean, 16)) : clean;
}

// LAYOUT table: scancode, VK, Cap, then one value per shift state
const chars = {};
const layoutStart = lines.findIndex((line) => line === 'LAYOUT');
for (let j = layoutStart + 1; j < lines.length && !/^(DEADKEY|KEYNAME|LIGATURE|DESCRIPTIONS|ENDKBD)/.test(lines[j]); j++) {
  const parts = lines[j].split(/\s+/);
  const keyId = SCANCODES[parts[0]?.toLowerCase()];
  if (!keyId) continue;
  const values = parts.slice(3);
  const at = (state) => {
    const value = values[column(state)];
    if (value === undefined) return null;
    if (value === '%%') return ligatures[`${parts[1]}:${column(state)}`] ?? null;
    return decode(value);
  };
  chars[keyId] = { primary: at(0), shifted: at(1), altGr: at(6) };
}

// Dead keys: "DEADKEY xxxx" followed by "base result" pairs
const deadKeys = {};
lines.forEach((line, j) => {
  const match = line.match(/^DEADKEY\s+([0-9a-f]{4})/i);
  if (!match) return;
  const deadChar = String.fromCodePoint(parseInt(match[1], 16));
  for (let k = j + 1; k < lines.length && (lines[k] === '' || /^[0-9a-f]{4}\s+[0-9a-f]{4}/i.test(lines[k])); k++) {
    if (lines[k] === '') continue;
    const [base, result] = lines[k].split(/\s+/).map((v) => String.fromCodePoint(parseInt(v, 16)));
    const decomposed = [...result.normalize('NFD')];
    if (decomposed.length === 2 && decomposed[0] === base) {
      const mark = decomposed[1];
      // Only dead keys that are on a key (not ones reached through another dead key)
      if (!deadKeys[mark] && Object.values(chars).some((c) => [c.primary, c.shifted, c.altGr].includes(deadChar))) {
        deadKeys[mark] = deadChar;
      }
    }
  }
});

// Template: rows, ids, groups and widths of the US layout
const template = fs.readFileSync(path.join(__dirname, '../src/config/layouts/en-us.ts'), 'utf8');
const quote = (value) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const usesIsoKey = !!chars.intlBackslash?.primary;
const body = template
  .slice(template.indexOf('  keys: ['))
  // Keep only the row headings of the US template's comments
  .split('\n').filter((line) => !/^\s*\/\/(?! Row \d)/.test(line)).join('\n')
  .replace(/\{ id: '([^']+)', primary: (?:'(?:[^'\\]|\\.)*'|"[^"]*"), shifted: (?:'(?:[^'\\]|\\.)*'|"[^"]*"), group: (\d) \}/g, (whole, keyId, group) => {
    const c = chars[keyId];
    if (!c || !c.primary) return whole;
    const fields = [`id: '${keyId}'`, `primary: ${quote(c.primary)}`];
    if (c.shifted) fields.push(`shifted: ${quote(c.shifted)}`);
    if (c.altGr) fields.push(`altGr: ${quote(c.altGr)}`);
    fields.push(`group: ${group}`);
    return `{ ${fields.join(', ')} }`;
  })
  .replace(
    "{ id: 'shift-l', primary: 'shift', width: 'shift' },",
    usesIsoKey
      ? `{ id: 'shift-l', primary: 'shift', width: 'shiftIso' },\n    { id: 'intlBackslash', primary: ${quote(chars.intlBackslash.primary)}${chars.intlBackslash.shifted ? `, shifted: ${quote(chars.intlBackslash.shifted)}` : ''}${chars.intlBackslash.altGr ? `, altGr: ${quote(chars.intlBackslash.altGr)}` : ''}, group: 1 },`
      : "{ id: 'shift-l', primary: 'shift', width: 'shift' },"
  );

const markNames = { '́': 'acute', '̀': 'grave', '̂': 'circumflex', '̃': 'tilde', '̈': 'diaeresis', '̌': 'caron', '̊': 'ring', '̨': 'ogonek', '̇': 'dot above', '̆': 'breve', '̋': 'double acute', '̧': 'cedilla', '̄': 'macron' };
const deadKeyLines = Object.entries(deadKeys)
  .map(([mark, dead]) => `    '\\u${mark.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}': ${quote(dead)}, // ${markNames[mark] ?? 'mark'}`)
  .join('\n');
const klcName = path.basename(klcFile, '.klc').toUpperCase();

const file = `import type { KeyboardLayout } from '../../types/keyboard';

/**
 * ${name} keyboard layout, converted from Microsoft's ${klcName} definition
 * by scripts/klc-to-layout.cjs.
 */
export const ${exportName}: KeyboardLayout = {
  id: '${id}',
  name: ${quote(name)},
  language: '${language}',
  flag: '${flag}',
${deadKeyLines ? `  deadKeys: {\n${deadKeyLines}\n  },\n` : ''}${body}`;

fs.writeFileSync(path.join(__dirname, `../src/config/layouts/${id}.ts`), file);
console.log(`${id}: ${Object.keys(chars).length} keys, ISO key: ${usesIsoKey}, dead keys: ${Object.keys(deadKeys).length}`);
