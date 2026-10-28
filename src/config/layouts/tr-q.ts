import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Türkçe Q keyboard layout, converted from Microsoft's KBDTUQ definition
 * by scripts/klc-to-layout.cjs.
 */
export const trQLayout: KeyboardLayout = {
  id: 'tr-q',
  name: 'Türkçe Q',
  language: 'tr',
  flag: '🇹🇷',
  deadKeys: {
    '\u0302': '^', // circumflex
    '\u0301': '´', // acute
    '\u0308': '¨', // diaeresis
    '\u0300': '`', // grave
    '\u0303': '~', // tilde
  },
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '"', shifted: 'é', altGr: '<', group: 1 },
    { id: '1', primary: '1', shifted: '!', altGr: '>', group: 1 },
    { id: '2', primary: '2', shifted: '\'', altGr: '£', group: 1 },
    { id: '3', primary: '3', shifted: '^', altGr: '#', group: 2 },
    { id: '4', primary: '4', shifted: '+', altGr: '$', group: 3 },
    { id: '5', primary: '5', shifted: '%', altGr: '½', group: 4 },
    { id: '6', primary: '6', shifted: '&', group: 4 },
    { id: '7', primary: '7', shifted: '/', altGr: '{', group: 5 },
    { id: '8', primary: '8', shifted: '(', altGr: '[', group: 5 },
    { id: '9', primary: '9', shifted: ')', altGr: ']', group: 6 },
    { id: '0', primary: '0', shifted: '=', altGr: '}', group: 7 },
    { id: 'underscore', primary: '*', shifted: '?', altGr: '\\', group: 8 },
    { id: 'equal', primary: '-', shifted: '_', altGr: '|', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'q', shifted: 'Q', altGr: '@', group: 1 },
    { id: 'w', primary: 'w', shifted: 'W', group: 2 },
    { id: 'e', primary: 'e', shifted: 'E', altGr: '€', group: 3 },
    { id: 'r', primary: 'r', shifted: 'R', group: 4 },
    { id: 't', primary: 't', shifted: 'T', altGr: '₺', group: 4 },
    { id: 'y', primary: 'y', shifted: 'Y', group: 5 },
    { id: 'u', primary: 'u', shifted: 'U', group: 5 },
    { id: 'i', primary: 'ı', shifted: 'I', altGr: 'i', group: 6 },
    { id: 'o', primary: 'o', shifted: 'O', group: 7 },
    { id: 'p', primary: 'p', shifted: 'P', group: 8 },
    { id: 'leftSquareBracket', primary: 'ğ', shifted: 'Ğ', altGr: '¨', group: 8 },
    { id: 'rightSquareBracket', primary: 'ü', shifted: 'Ü', altGr: '~', group: 8 },
    { id: 'backSlash', primary: ',', shifted: ';', altGr: '`', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'a', shifted: 'A', altGr: 'æ', group: 1 },
    { id: 's', primary: 's', shifted: 'S', altGr: 'ß', group: 2 },
    { id: 'd', primary: 'd', shifted: 'D', group: 3 },
    { id: 'f', primary: 'f', shifted: 'F', group: 4 },
    { id: 'g', primary: 'g', shifted: 'G', group: 4 },
    { id: 'h', primary: 'h', shifted: 'H', group: 5 },
    { id: 'j', primary: 'j', shifted: 'J', group: 5 },
    { id: 'k', primary: 'k', shifted: 'K', group: 6 },
    { id: 'l', primary: 'l', shifted: 'L', group: 7 },
    { id: 'cologn', primary: 'ş', shifted: 'Ş', altGr: '´', group: 8 },
    { id: 'quote', primary: 'i', shifted: 'İ', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shiftIso' },
    { id: 'intlBackslash', primary: '<', shifted: '>', altGr: '|', group: 1 },
    { id: 'z', primary: 'z', shifted: 'Z', group: 1 },
    { id: 'x', primary: 'x', shifted: 'X', group: 2 },
    { id: 'c', primary: 'c', shifted: 'C', group: 3 },
    { id: 'v', primary: 'v', shifted: 'V', group: 4 },
    { id: 'b', primary: 'b', shifted: 'B', group: 4 },
    { id: 'n', primary: 'n', shifted: 'N', group: 5 },
    { id: 'm', primary: 'm', shifted: 'M', group: 5 },
    { id: 'comma', primary: 'ö', shifted: 'Ö', group: 6 },
    { id: 'period', primary: 'ç', shifted: 'Ç', group: 7 },
    { id: 'slash', primary: '.', shifted: ':', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
