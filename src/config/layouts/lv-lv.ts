import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Latviešu keyboard layout, converted from Microsoft's KBDLVST definition
 * by scripts/klc-to-layout.cjs.
 */
export const lvLvLayout: KeyboardLayout = {
  id: 'lv-lv',
  name: 'Latviešu',
  language: 'lv',
  flag: '🇱🇻',
  deadKeys: {
    '\u0304': '\'', // macron
    '\u030C': '\'', // caron
    '\u0327': '\'', // cedilla
  },
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '`', shifted: '~', altGr: '­', group: 1 },
    { id: '1', primary: '1', shifted: '!', altGr: ' ', group: 1 },
    { id: '2', primary: '2', shifted: '@', altGr: '«', group: 1 },
    { id: '3', primary: '3', shifted: '#', altGr: '»', group: 2 },
    { id: '4', primary: '4', shifted: '$', altGr: '€', group: 3 },
    { id: '5', primary: '5', shifted: '%', group: 4 },
    { id: '6', primary: '6', shifted: '^', altGr: '’', group: 4 },
    { id: '7', primary: '7', shifted: '&', group: 5 },
    { id: '8', primary: '8', shifted: '*', group: 5 },
    { id: '9', primary: '9', shifted: '(', group: 6 },
    { id: '0', primary: '0', shifted: ')', group: 7 },
    { id: 'underscore', primary: '-', shifted: '_', altGr: '–', group: 8 },
    { id: 'equal', primary: '=', shifted: '+', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'q', shifted: 'Q', group: 1 },
    { id: 'w', primary: 'w', shifted: 'W', group: 2 },
    { id: 'e', primary: 'e', shifted: 'E', altGr: 'ē', group: 3 },
    { id: 'r', primary: 'r', shifted: 'R', altGr: 'ŗ', group: 4 },
    { id: 't', primary: 't', shifted: 'T', group: 4 },
    { id: 'y', primary: 'y', shifted: 'Y', group: 5 },
    { id: 'u', primary: 'u', shifted: 'U', altGr: 'ū', group: 5 },
    { id: 'i', primary: 'i', shifted: 'I', altGr: 'ī', group: 6 },
    { id: 'o', primary: 'o', shifted: 'O', altGr: 'ō', group: 7 },
    { id: 'p', primary: 'p', shifted: 'P', group: 8 },
    { id: 'leftSquareBracket', primary: '[', shifted: '{', group: 8 },
    { id: 'rightSquareBracket', primary: ']', shifted: '}', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'a', shifted: 'A', altGr: 'ā', group: 1 },
    { id: 's', primary: 's', shifted: 'S', altGr: 'š', group: 2 },
    { id: 'd', primary: 'd', shifted: 'D', group: 3 },
    { id: 'f', primary: 'f', shifted: 'F', group: 4 },
    { id: 'g', primary: 'g', shifted: 'G', altGr: 'ģ', group: 4 },
    { id: 'h', primary: 'h', shifted: 'H', group: 5 },
    { id: 'j', primary: 'j', shifted: 'J', group: 5 },
    { id: 'k', primary: 'k', shifted: 'K', altGr: 'ķ', group: 6 },
    { id: 'l', primary: 'l', shifted: 'L', altGr: 'ļ', group: 7 },
    { id: 'cologn', primary: ';', shifted: ':', group: 8 },
    { id: 'quote', primary: '\'', shifted: '"', altGr: '´', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shiftIso' },
    { id: 'intlBackslash', primary: '\\', shifted: '|', group: 1 },
    { id: 'z', primary: 'z', shifted: 'Z', altGr: 'ž', group: 1 },
    { id: 'x', primary: 'x', shifted: 'X', group: 2 },
    { id: 'c', primary: 'c', shifted: 'C', altGr: 'č', group: 3 },
    { id: 'v', primary: 'v', shifted: 'V', group: 4 },
    { id: 'b', primary: 'b', shifted: 'B', group: 4 },
    { id: 'n', primary: 'n', shifted: 'N', altGr: 'ņ', group: 5 },
    { id: 'm', primary: 'm', shifted: 'M', group: 5 },
    { id: 'comma', primary: ',', shifted: '<', group: 6 },
    { id: 'period', primary: '.', shifted: '>', group: 7 },
    { id: 'slash', primary: '/', shifted: '?', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
