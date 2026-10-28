import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Lietuvių keyboard layout, converted from Microsoft's KBDLT1 definition
 * by scripts/klc-to-layout.cjs.
 */
export const ltLtLayout: KeyboardLayout = {
  id: 'lt-lt',
  name: 'Lietuvių',
  language: 'lt',
  flag: '🇱🇹',
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '`', shifted: '~', group: 1 },
    { id: '1', primary: 'ą', shifted: 'Ą', altGr: '1', group: 1 },
    { id: '2', primary: 'č', shifted: 'Č', altGr: '2', group: 1 },
    { id: '3', primary: 'ę', shifted: 'Ę', altGr: '3', group: 2 },
    { id: '4', primary: 'ė', shifted: 'Ė', altGr: '4', group: 3 },
    { id: '5', primary: 'į', shifted: 'Į', altGr: '5', group: 4 },
    { id: '6', primary: 'š', shifted: 'Š', altGr: '6', group: 4 },
    { id: '7', primary: 'ų', shifted: 'Ų', altGr: '7', group: 5 },
    { id: '8', primary: 'ū', shifted: 'Ū', altGr: '8', group: 5 },
    { id: '9', primary: '9', shifted: '(', altGr: '9', group: 6 },
    { id: '0', primary: '0', shifted: ')', altGr: '0', group: 7 },
    { id: 'underscore', primary: '-', shifted: '_', group: 8 },
    { id: 'equal', primary: 'ž', shifted: 'Ž', altGr: '=', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'q', shifted: 'Q', group: 1 },
    { id: 'w', primary: 'w', shifted: 'W', group: 2 },
    { id: 'e', primary: 'e', shifted: 'E', altGr: '€', group: 3 },
    { id: 'r', primary: 'r', shifted: 'R', group: 4 },
    { id: 't', primary: 't', shifted: 'T', group: 4 },
    { id: 'y', primary: 'y', shifted: 'Y', group: 5 },
    { id: 'u', primary: 'u', shifted: 'U', group: 5 },
    { id: 'i', primary: 'i', shifted: 'I', group: 6 },
    { id: 'o', primary: 'o', shifted: 'O', group: 7 },
    { id: 'p', primary: 'p', shifted: 'P', group: 8 },
    { id: 'leftSquareBracket', primary: '[', shifted: '{', group: 8 },
    { id: 'rightSquareBracket', primary: ']', shifted: '}', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'a', shifted: 'A', group: 1 },
    { id: 's', primary: 's', shifted: 'S', group: 2 },
    { id: 'd', primary: 'd', shifted: 'D', group: 3 },
    { id: 'f', primary: 'f', shifted: 'F', group: 4 },
    { id: 'g', primary: 'g', shifted: 'G', group: 4 },
    { id: 'h', primary: 'h', shifted: 'H', group: 5 },
    { id: 'j', primary: 'j', shifted: 'J', group: 5 },
    { id: 'k', primary: 'k', shifted: 'K', group: 6 },
    { id: 'l', primary: 'l', shifted: 'L', group: 7 },
    { id: 'cologn', primary: ';', shifted: ':', group: 8 },
    { id: 'quote', primary: '\'', shifted: '"', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shiftIso' },
    { id: 'intlBackslash', primary: '\\', shifted: '|', group: 1 },
    { id: 'z', primary: 'z', shifted: 'Z', group: 1 },
    { id: 'x', primary: 'x', shifted: 'X', group: 2 },
    { id: 'c', primary: 'c', shifted: 'C', group: 3 },
    { id: 'v', primary: 'v', shifted: 'V', group: 4 },
    { id: 'b', primary: 'b', shifted: 'B', group: 4 },
    { id: 'n', primary: 'n', shifted: 'N', group: 5 },
    { id: 'm', primary: 'm', shifted: 'M', group: 5 },
    { id: 'comma', primary: ',', shifted: '<', group: 6 },
    { id: 'period', primary: '.', shifted: '>', group: 7 },
    { id: 'slash', primary: '/', shifted: '?', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
