import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Српски keyboard layout, converted from Microsoft's KBDYCC definition
 * by scripts/klc-to-layout.cjs.
 */
export const srRsLayout: KeyboardLayout = {
  id: 'sr-rs',
  name: 'Српски',
  language: 'sr',
  flag: '🇷🇸',
  deadKeys: {
    '\u0301': '\'', // acute
  },
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '`', shifted: '~', group: 1 },
    { id: '1', primary: '1', shifted: '!', group: 1 },
    { id: '2', primary: '2', shifted: '"', group: 1 },
    { id: '3', primary: '3', shifted: '#', group: 2 },
    { id: '4', primary: '4', shifted: '$', group: 3 },
    { id: '5', primary: '5', shifted: '%', group: 4 },
    { id: '6', primary: '6', shifted: '&', group: 4 },
    { id: '7', primary: '7', shifted: '/', group: 5 },
    { id: '8', primary: '8', shifted: '(', group: 5 },
    { id: '9', primary: '9', shifted: ')', group: 6 },
    { id: '0', primary: '0', shifted: '=', group: 7 },
    { id: 'underscore', primary: '\'', shifted: '?', group: 8 },
    { id: 'equal', primary: '+', shifted: '*', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'љ', shifted: 'Љ', group: 1 },
    { id: 'w', primary: 'њ', shifted: 'Њ', group: 2 },
    { id: 'e', primary: 'е', shifted: 'Е', altGr: '€', group: 3 },
    { id: 'r', primary: 'р', shifted: 'Р', group: 4 },
    { id: 't', primary: 'т', shifted: 'Т', group: 4 },
    { id: 'y', primary: 'з', shifted: 'З', group: 5 },
    { id: 'u', primary: 'у', shifted: 'У', group: 5 },
    { id: 'i', primary: 'и', shifted: 'И', group: 6 },
    { id: 'o', primary: 'о', shifted: 'О', group: 7 },
    { id: 'p', primary: 'п', shifted: 'П', group: 8 },
    { id: 'leftSquareBracket', primary: 'ш', shifted: 'Ш', group: 8 },
    { id: 'rightSquareBracket', primary: 'ђ', shifted: 'Ђ', group: 8 },
    { id: 'backSlash', primary: 'ж', shifted: 'Ж', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'а', shifted: 'А', group: 1 },
    { id: 's', primary: 'с', shifted: 'С', group: 2 },
    { id: 'd', primary: 'д', shifted: 'Д', group: 3 },
    { id: 'f', primary: 'ф', shifted: 'Ф', group: 4 },
    { id: 'g', primary: 'г', shifted: 'Г', group: 4 },
    { id: 'h', primary: 'х', shifted: 'Х', group: 5 },
    { id: 'j', primary: 'ј', shifted: 'Ј', group: 5 },
    { id: 'k', primary: 'к', shifted: 'К', group: 6 },
    { id: 'l', primary: 'л', shifted: 'Л', group: 7 },
    { id: 'cologn', primary: 'ч', shifted: 'Ч', group: 8 },
    { id: 'quote', primary: 'ћ', shifted: 'Ћ', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shiftIso' },
    { id: 'intlBackslash', primary: '<', shifted: '>', group: 1 },
    { id: 'z', primary: 'ѕ', shifted: 'Ѕ', group: 1 },
    { id: 'x', primary: 'џ', shifted: 'Џ', group: 2 },
    { id: 'c', primary: 'ц', shifted: 'Ц', group: 3 },
    { id: 'v', primary: 'в', shifted: 'В', group: 4 },
    { id: 'b', primary: 'б', shifted: 'Б', group: 4 },
    { id: 'n', primary: 'н', shifted: 'Н', group: 5 },
    { id: 'm', primary: 'м', shifted: 'М', group: 5 },
    { id: 'comma', primary: ',', shifted: ';', altGr: '<', group: 6 },
    { id: 'period', primary: '.', shifted: ':', altGr: '>', group: 7 },
    { id: 'slash', primary: '-', shifted: '_', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
