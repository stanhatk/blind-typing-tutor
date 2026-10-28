import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Slovenčina keyboard layout, converted from Microsoft's KBDSL definition
 * by scripts/klc-to-layout.cjs.
 */
export const skSkLayout: KeyboardLayout = {
  id: 'sk-sk',
  name: 'Slovenčina',
  language: 'sk',
  flag: '🇸🇰',
  deadKeys: {
    '\u030C': 'ˇ', // caron
    '\u0302': '^', // circumflex
    '\u0306': '˘', // breve
    '\u030A': '°', // ring
    '\u0307': '˙', // dot above
    '\u0301': '´', // acute
    '\u030B': '˝', // double acute
    '\u0327': '¸', // cedilla
    '\u0308': '¨', // diaeresis
    '\u0328': '˛', // ogonek
  },
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: ';', shifted: '°', group: 1 },
    { id: '1', primary: '+', shifted: '1', altGr: '~', group: 1 },
    { id: '2', primary: 'ľ', shifted: '2', altGr: 'ˇ', group: 1 },
    { id: '3', primary: 'š', shifted: '3', altGr: '^', group: 2 },
    { id: '4', primary: 'č', shifted: '4', altGr: '˘', group: 3 },
    { id: '5', primary: 'ť', shifted: '5', altGr: '°', group: 4 },
    { id: '6', primary: 'ž', shifted: '6', altGr: '˛', group: 4 },
    { id: '7', primary: 'ý', shifted: '7', altGr: '`', group: 5 },
    { id: '8', primary: 'á', shifted: '8', altGr: '˙', group: 5 },
    { id: '9', primary: 'í', shifted: '9', altGr: '´', group: 6 },
    { id: '0', primary: 'é', shifted: '0', altGr: '˝', group: 7 },
    { id: 'underscore', primary: '=', shifted: '%', altGr: '¨', group: 8 },
    { id: 'equal', primary: '´', shifted: 'ˇ', altGr: '¸', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'q', shifted: 'Q', altGr: '\\', group: 1 },
    { id: 'w', primary: 'w', shifted: 'W', altGr: '|', group: 2 },
    { id: 'e', primary: 'e', shifted: 'E', altGr: '€', group: 3 },
    { id: 'r', primary: 'r', shifted: 'R', group: 4 },
    { id: 't', primary: 't', shifted: 'T', group: 4 },
    { id: 'y', primary: 'z', shifted: 'Z', group: 5 },
    { id: 'u', primary: 'u', shifted: 'U', group: 5 },
    { id: 'i', primary: 'i', shifted: 'I', group: 6 },
    { id: 'o', primary: 'o', shifted: 'O', group: 7 },
    { id: 'p', primary: 'p', shifted: 'P', altGr: '\'', group: 8 },
    { id: 'leftSquareBracket', primary: 'ú', shifted: '/', altGr: '÷', group: 8 },
    { id: 'rightSquareBracket', primary: 'ä', shifted: '(', altGr: '×', group: 8 },
    { id: 'backSlash', primary: 'ň', shifted: ')', altGr: '¤', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'a', shifted: 'A', group: 1 },
    { id: 's', primary: 's', shifted: 'S', altGr: 'đ', group: 2 },
    { id: 'd', primary: 'd', shifted: 'D', altGr: 'Đ', group: 3 },
    { id: 'f', primary: 'f', shifted: 'F', altGr: '[', group: 4 },
    { id: 'g', primary: 'g', shifted: 'G', altGr: ']', group: 4 },
    { id: 'h', primary: 'h', shifted: 'H', group: 5 },
    { id: 'j', primary: 'j', shifted: 'J', group: 5 },
    { id: 'k', primary: 'k', shifted: 'K', altGr: 'ł', group: 6 },
    { id: 'l', primary: 'l', shifted: 'L', altGr: 'Ł', group: 7 },
    { id: 'cologn', primary: 'ô', shifted: '"', altGr: '$', group: 8 },
    { id: 'quote', primary: '§', shifted: '!', altGr: 'ß', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shiftIso' },
    { id: 'intlBackslash', primary: '&', shifted: '*', altGr: '<', group: 1 },
    { id: 'z', primary: 'y', shifted: 'Y', altGr: '>', group: 1 },
    { id: 'x', primary: 'x', shifted: 'X', altGr: '#', group: 2 },
    { id: 'c', primary: 'c', shifted: 'C', altGr: '&', group: 3 },
    { id: 'v', primary: 'v', shifted: 'V', altGr: '@', group: 4 },
    { id: 'b', primary: 'b', shifted: 'B', altGr: '{', group: 4 },
    { id: 'n', primary: 'n', shifted: 'N', altGr: '}', group: 5 },
    { id: 'm', primary: 'm', shifted: 'M', group: 5 },
    { id: 'comma', primary: ',', shifted: '?', altGr: '<', group: 6 },
    { id: 'period', primary: '.', shifted: ':', altGr: '>', group: 7 },
    { id: 'slash', primary: '-', shifted: '_', altGr: '*', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
