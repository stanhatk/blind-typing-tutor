import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Nederlands keyboard layout, converted from Microsoft's KBDUSX definition
 * by scripts/klc-to-layout.cjs.
 */
export const nlNlLayout: KeyboardLayout = {
  id: 'nl-nl',
  name: 'Nederlands',
  language: 'nl',
  flag: '🇳🇱',
  deadKeys: {
    '\u0301': '\'', // acute
    '\u0327': '\'', // cedilla
    '\u0308': '"', // diaeresis
    '\u0302': '^', // circumflex
    '\u0300': '`', // grave
    '\u0303': '~', // tilde
  },
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '`', shifted: '~', group: 1 },
    { id: '1', primary: '1', shifted: '!', altGr: '¡', group: 1 },
    { id: '2', primary: '2', shifted: '@', altGr: '²', group: 1 },
    { id: '3', primary: '3', shifted: '#', altGr: '³', group: 2 },
    { id: '4', primary: '4', shifted: '$', altGr: '¤', group: 3 },
    { id: '5', primary: '5', shifted: '%', altGr: '€', group: 4 },
    { id: '6', primary: '6', shifted: '^', altGr: '¼', group: 4 },
    { id: '7', primary: '7', shifted: '&', altGr: '½', group: 5 },
    { id: '8', primary: '8', shifted: '*', altGr: '¾', group: 5 },
    { id: '9', primary: '9', shifted: '(', altGr: '‘', group: 6 },
    { id: '0', primary: '0', shifted: ')', altGr: '’', group: 7 },
    { id: 'underscore', primary: '-', shifted: '_', altGr: '¥', group: 8 },
    { id: 'equal', primary: '=', shifted: '+', altGr: '×', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'q', shifted: 'Q', altGr: 'ä', group: 1 },
    { id: 'w', primary: 'w', shifted: 'W', altGr: 'å', group: 2 },
    { id: 'e', primary: 'e', shifted: 'E', altGr: 'é', group: 3 },
    { id: 'r', primary: 'r', shifted: 'R', altGr: '®', group: 4 },
    { id: 't', primary: 't', shifted: 'T', altGr: 'þ', group: 4 },
    { id: 'y', primary: 'y', shifted: 'Y', altGr: 'ü', group: 5 },
    { id: 'u', primary: 'u', shifted: 'U', altGr: 'ú', group: 5 },
    { id: 'i', primary: 'i', shifted: 'I', altGr: 'í', group: 6 },
    { id: 'o', primary: 'o', shifted: 'O', altGr: 'ó', group: 7 },
    { id: 'p', primary: 'p', shifted: 'P', altGr: 'ö', group: 8 },
    { id: 'leftSquareBracket', primary: '[', shifted: '{', altGr: '«', group: 8 },
    { id: 'rightSquareBracket', primary: ']', shifted: '}', altGr: '»', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', altGr: '¬', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'a', shifted: 'A', altGr: 'á', group: 1 },
    { id: 's', primary: 's', shifted: 'S', altGr: 'ß', group: 2 },
    { id: 'd', primary: 'd', shifted: 'D', altGr: 'ð', group: 3 },
    { id: 'f', primary: 'f', shifted: 'F', group: 4 },
    { id: 'g', primary: 'g', shifted: 'G', group: 4 },
    { id: 'h', primary: 'h', shifted: 'H', group: 5 },
    { id: 'j', primary: 'j', shifted: 'J', group: 5 },
    { id: 'k', primary: 'k', shifted: 'K', group: 6 },
    { id: 'l', primary: 'l', shifted: 'L', altGr: 'ø', group: 7 },
    { id: 'cologn', primary: ';', shifted: ':', altGr: '¶', group: 8 },
    { id: 'quote', primary: '\'', shifted: '"', altGr: '´', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'z', shifted: 'Z', altGr: 'æ', group: 1 },
    { id: 'x', primary: 'x', shifted: 'X', group: 2 },
    { id: 'c', primary: 'c', shifted: 'C', altGr: '©', group: 3 },
    { id: 'v', primary: 'v', shifted: 'V', group: 4 },
    { id: 'b', primary: 'b', shifted: 'B', group: 4 },
    { id: 'n', primary: 'n', shifted: 'N', altGr: 'ñ', group: 5 },
    { id: 'm', primary: 'm', shifted: 'M', altGr: 'µ', group: 5 },
    { id: 'comma', primary: ',', shifted: '<', altGr: 'ç', group: 6 },
    { id: 'period', primary: '.', shifted: '>', group: 7 },
    { id: 'slash', primary: '/', shifted: '?', altGr: '¿', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
