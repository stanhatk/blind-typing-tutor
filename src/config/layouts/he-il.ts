import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Hebrew QWERTY keyboard layout
 * Standard layout used in Israel
 */
export const heIlLayout: KeyboardLayout = {
  id: 'he-il',
  name: 'עברית',
  language: 'he',
  flag: '🇮🇱',
  leftHandKeys: ['/', '׳', 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
  keys: [
    // Row 1 - Number row
    { id: 'backtick', primary: '`', shifted: '~', group: 1 },
    { id: '1', primary: '1', shifted: '!', group: 1 },
    { id: '2', primary: '2', shifted: '@', group: 1 },
    { id: '3', primary: '3', shifted: '#', group: 2 },
    { id: '4', primary: '4', shifted: '$', group: 3 },
    { id: '5', primary: '5', shifted: '%', group: 4 },
    { id: '6', primary: '6', shifted: '^', group: 4 },
    { id: '7', primary: '7', shifted: '&', group: 5 },
    { id: '8', primary: '8', shifted: '*', group: 5 },
    { id: '9', primary: '9', shifted: '(', group: 6 },
    { id: '0', primary: '0', shifted: ')', group: 7 },
    { id: 'underscore', primary: '-', shifted: '_', group: 8 },
    { id: 'equal', primary: '=', shifted: '+', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: '/', shifted: 'Q', group: 1 },
    { id: 'w', primary: "'", shifted: 'W', group: 2 },
    { id: 'e', primary: 'ק', shifted: 'E', group: 3 },
    { id: 'r', primary: 'ר', shifted: 'R', group: 4 },
    { id: 't', primary: 'א', shifted: 'T', group: 4 },
    { id: 'y', primary: 'ט', shifted: 'Y', group: 5 },
    { id: 'u', primary: 'ו', shifted: 'U', group: 5 },
    { id: 'i', primary: 'ן', shifted: 'I', group: 6 },
    { id: 'o', primary: 'ם', shifted: 'O', group: 7 },
    { id: 'p', primary: 'פ', shifted: 'P', group: 8 },
    { id: 'leftSquareBracket', primary: '[', shifted: '{', group: 8 },
    { id: 'rightSquareBracket', primary: ']', shifted: '}', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ש', shifted: 'A', group: 1 },
    { id: 's', primary: 'ד', shifted: 'S', group: 2 },
    { id: 'd', primary: 'ג', shifted: 'D', group: 3 },
    { id: 'f', primary: 'כ', shifted: 'F', group: 4 },
    { id: 'g', primary: 'ע', shifted: 'G', group: 4 },
    { id: 'h', primary: 'י', shifted: 'H', group: 5 },
    { id: 'j', primary: 'ח', shifted: 'J', group: 5 },
    { id: 'k', primary: 'ל', shifted: 'K', group: 6 },
    { id: 'l', primary: 'ך', shifted: 'L', group: 7 },
    { id: 'cologn', primary: 'ף', shifted: ':', group: 8 },
    { id: 'quote', primary: ',', shifted: '"', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom row
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'ז', shifted: 'Z', group: 1 },
    { id: 'x', primary: 'ס', shifted: 'X', group: 2 },
    { id: 'c', primary: 'ב', shifted: 'C', group: 3 },
    { id: 'v', primary: 'ה', shifted: 'V', group: 4 },
    { id: 'b', primary: 'נ', shifted: 'B', group: 4 },
    { id: 'n', primary: 'מ', shifted: 'N', group: 5 },
    { id: 'm', primary: 'צ', shifted: 'M', group: 5 },
    { id: 'comma', primary: 'ת', shifted: '>', group: 6 },
    { id: 'period', primary: 'ץ', shifted: '<', group: 7 },
    { id: 'slash', primary: '.', shifted: '?', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar
    { id: 'space', primary: ' ', width: 'space' },
  ],
};

