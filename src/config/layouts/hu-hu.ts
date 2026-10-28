import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Magyar keyboard layout, converted from Microsoft's KBDHU definition
 * by scripts/klc-to-layout.cjs.
 */
export const huHuLayout: KeyboardLayout = {
  id: 'hu-hu',
  name: 'Magyar',
  language: 'hu',
  flag: '🇭🇺',
  deadKeys: {
    '\u0302': '^', // circumflex
    '\u0306': '˘', // breve
    '\u030A': '°', // ring
    '\u0301': '´', // acute
    '\u030B': '˝', // double acute
    '\u0308': '¨', // diaeresis
    '\u0327': '¸', // cedilla
    '\u030C': 'ˇ', // caron
    '\u0307': '˙', // dot above
    '\u0328': '˛', // ogonek
  },
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '0', shifted: '§', group: 1 },
    { id: '1', primary: '1', shifted: '\'', altGr: '~', group: 1 },
    { id: '2', primary: '2', shifted: '"', altGr: 'ˇ', group: 1 },
    { id: '3', primary: '3', shifted: '+', altGr: '^', group: 2 },
    { id: '4', primary: '4', shifted: '!', altGr: '˘', group: 3 },
    { id: '5', primary: '5', shifted: '%', altGr: '°', group: 4 },
    { id: '6', primary: '6', shifted: '/', altGr: '˛', group: 4 },
    { id: '7', primary: '7', shifted: '=', altGr: '`', group: 5 },
    { id: '8', primary: '8', shifted: '(', altGr: '˙', group: 5 },
    { id: '9', primary: '9', shifted: ')', altGr: '´', group: 6 },
    { id: '0', primary: 'ö', shifted: 'Ö', altGr: '˝', group: 7 },
    { id: 'underscore', primary: 'ü', shifted: 'Ü', altGr: '¨', group: 8 },
    { id: 'equal', primary: 'ó', shifted: 'Ó', altGr: '¸', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'q', shifted: 'Q', altGr: '\\', group: 1 },
    { id: 'w', primary: 'w', shifted: 'W', altGr: '|', group: 2 },
    { id: 'e', primary: 'e', shifted: 'E', altGr: 'Ä', group: 3 },
    { id: 'r', primary: 'r', shifted: 'R', group: 4 },
    { id: 't', primary: 't', shifted: 'T', group: 4 },
    { id: 'y', primary: 'z', shifted: 'Z', group: 5 },
    { id: 'u', primary: 'u', shifted: 'U', altGr: '€', group: 5 },
    { id: 'i', primary: 'i', shifted: 'I', altGr: 'Í', group: 6 },
    { id: 'o', primary: 'o', shifted: 'O', group: 7 },
    { id: 'p', primary: 'p', shifted: 'P', group: 8 },
    { id: 'leftSquareBracket', primary: 'ő', shifted: 'Ő', altGr: '÷', group: 8 },
    { id: 'rightSquareBracket', primary: 'ú', shifted: 'Ú', altGr: '×', group: 8 },
    { id: 'backSlash', primary: 'ű', shifted: 'Ű', altGr: '¤', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'a', shifted: 'A', altGr: 'ä', group: 1 },
    { id: 's', primary: 's', shifted: 'S', altGr: 'đ', group: 2 },
    { id: 'd', primary: 'd', shifted: 'D', altGr: 'Đ', group: 3 },
    { id: 'f', primary: 'f', shifted: 'F', altGr: '[', group: 4 },
    { id: 'g', primary: 'g', shifted: 'G', altGr: ']', group: 4 },
    { id: 'h', primary: 'h', shifted: 'H', group: 5 },
    { id: 'j', primary: 'j', shifted: 'J', altGr: 'í', group: 5 },
    { id: 'k', primary: 'k', shifted: 'K', altGr: 'ł', group: 6 },
    { id: 'l', primary: 'l', shifted: 'L', altGr: 'Ł', group: 7 },
    { id: 'cologn', primary: 'é', shifted: 'É', altGr: '$', group: 8 },
    { id: 'quote', primary: 'á', shifted: 'Á', altGr: 'ß', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shiftIso' },
    { id: 'intlBackslash', primary: 'í', shifted: 'Í', altGr: '<', group: 1 },
    { id: 'z', primary: 'y', shifted: 'Y', altGr: '>', group: 1 },
    { id: 'x', primary: 'x', shifted: 'X', altGr: '#', group: 2 },
    { id: 'c', primary: 'c', shifted: 'C', altGr: '&', group: 3 },
    { id: 'v', primary: 'v', shifted: 'V', altGr: '@', group: 4 },
    { id: 'b', primary: 'b', shifted: 'B', altGr: '{', group: 4 },
    { id: 'n', primary: 'n', shifted: 'N', altGr: '}', group: 5 },
    { id: 'm', primary: 'm', shifted: 'M', altGr: '<', group: 5 },
    { id: 'comma', primary: ',', shifted: '?', altGr: ';', group: 6 },
    { id: 'period', primary: '.', shifted: ':', altGr: '>', group: 7 },
    { id: 'slash', primary: '-', shifted: '_', altGr: '*', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
