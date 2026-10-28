import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Turkish F keyboard layout (Ergonomic)
 * Designed specifically for Turkish language in 1955
 * Optimized for letter frequency and typing efficiency
 */
export const trFLayout: KeyboardLayout = {
  id: 'tr-f',
  name: 'Türkçe F',
  language: 'tr',
  flag: '🇹🇷',
  // Turkish F layout has different hand distribution - all vowels on left
  keys: [
    // Row 1 - Number row (Turkish F has + before 1)
    { id: 'backtick', primary: '+', shifted: '*', altGr: '¬', group: 1 },
    { id: '1', primary: '1', shifted: '!', altGr: '¹', group: 1 },
    { id: '2', primary: '2', shifted: '"', altGr: '²', group: 1 },
    { id: '3', primary: '3', shifted: '^', altGr: '#', group: 2 },
    { id: '4', primary: '4', shifted: '$', altGr: '¼', group: 3 },
    { id: '5', primary: '5', shifted: '%', altGr: '½', group: 4 },
    { id: '6', primary: '6', shifted: '&', group: 4 },
    { id: '7', primary: '7', shifted: "'", altGr: '{', group: 5 },
    { id: '8', primary: '8', shifted: '(', altGr: '[', group: 5 },
    { id: '9', primary: '9', shifted: ')', altGr: ']', group: 6 },
    { id: '0', primary: '0', shifted: '=', altGr: '}', group: 7 },
    { id: 'underscore', primary: '/', shifted: '?', altGr: '\\', group: 8 },
    { id: 'equal', primary: '-', shifted: '_', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },

    // Row 2 - F-keyboard top row (F G Ğ I O D R N H P Q W X)
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'f', shifted: 'F', altGr: '@', group: 1 },
    { id: 'w', primary: 'g', shifted: 'G', group: 2 },
    { id: 'e', primary: 'ğ', shifted: 'Ğ', group: 3 },
    { id: 'r', primary: 'ı', shifted: 'I', group: 4 }, // Undotted i
    { id: 't', primary: 'o', shifted: 'O', group: 4 },
    { id: 'y', primary: 'd', shifted: 'D', group: 5 },
    { id: 'u', primary: 'r', shifted: 'R', group: 5 },
    { id: 'i', primary: 'n', shifted: 'N', group: 6 },
    { id: 'o', primary: 'h', shifted: 'H', group: 7 },
    { id: 'p', primary: 'p', shifted: 'P', group: 8 },
    { id: 'leftSquareBracket', primary: 'q', shifted: 'Q', altGr: '¨', group: 8 },
    { id: 'rightSquareBracket', primary: 'w', shifted: 'W', altGr: '~', group: 8 },
    { id: 'backSlash', primary: 'x', shifted: 'X', altGr: '`', group: 8 },

    // Row 3 - Home row (U İ E A Ü T K M L Y Ş)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'u', shifted: 'U', group: 1 },
    { id: 's', primary: 'i', shifted: 'İ', group: 2 }, // Dotted i
    { id: 'd', primary: 'e', shifted: 'E', altGr: '€', group: 3 },
    { id: 'f', primary: 'a', shifted: 'A', group: 4 },
    { id: 'g', primary: 'ü', shifted: 'Ü', group: 4 },
    { id: 'h', primary: 't', shifted: 'T', altGr: '₺', group: 5 },
    { id: 'j', primary: 'k', shifted: 'K', group: 5 },
    { id: 'k', primary: 'm', shifted: 'M', group: 6 },
    { id: 'l', primary: 'l', shifted: 'L', group: 7 },
    { id: 'cologn', primary: 'y', shifted: 'Y', altGr: '´', group: 8 },
    { id: 'quote', primary: 'ş', shifted: 'Ş', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },

    // Row 4 - Bottom row (J Ö V C Ç Z S B . , :)
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'j', shifted: 'J', altGr: '<', group: 1 },
    { id: 'x', primary: 'ö', shifted: 'Ö', altGr: '>', group: 2 },
    { id: 'c', primary: 'v', shifted: 'V', group: 3 },
    { id: 'v', primary: 'c', shifted: 'C', group: 4 },
    { id: 'b', primary: 'ç', shifted: 'Ç', group: 4 },
    { id: 'n', primary: 'z', shifted: 'Z', group: 5 },
    { id: 'm', primary: 's', shifted: 'S', group: 5 },
    { id: 'comma', primary: 'b', shifted: 'B', altGr: '×', group: 6 },
    { id: 'period', primary: '.', shifted: ':', altGr: '÷', group: 7 },
    { id: 'slash', primary: ',', shifted: ';', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },

    // Row 5 - Space bar
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
