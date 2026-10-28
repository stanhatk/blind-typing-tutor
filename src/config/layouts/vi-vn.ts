import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Tiếng Việt keyboard layout, converted from Microsoft's KBDVNTC definition
 * by scripts/klc-to-layout.cjs.
 */
export const viVnLayout: KeyboardLayout = {
  id: 'vi-vn',
  name: 'Tiếng Việt',
  language: 'vi',
  flag: '🇻🇳',
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '`', shifted: '~', altGr: '`', group: 1 },
    { id: '1', primary: 'ă', shifted: 'Ă', altGr: '1', group: 1 },
    { id: '2', primary: 'â', shifted: 'Â', altGr: '2', group: 1 },
    { id: '3', primary: 'ê', shifted: 'Ê', altGr: '3', group: 2 },
    { id: '4', primary: 'ô', shifted: 'Ô', altGr: '4', group: 3 },
    { id: '5', primary: '̀', shifted: '̀', altGr: '5', group: 4 },
    { id: '6', primary: '̉', shifted: '̉', altGr: '6', group: 4 },
    { id: '7', primary: '̃', shifted: '̃', altGr: '7', group: 5 },
    { id: '8', primary: '́', shifted: '́', altGr: '8', group: 5 },
    { id: '9', primary: '̣', shifted: '̣', altGr: '9', group: 6 },
    { id: '0', primary: 'đ', shifted: 'Đ', altGr: '0', group: 7 },
    { id: 'underscore', primary: '-', shifted: '_', altGr: '-', group: 8 },
    { id: 'equal', primary: '₫', shifted: '+', altGr: '=', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'q', shifted: 'Q', altGr: 'q', group: 1 },
    { id: 'w', primary: 'w', shifted: 'W', altGr: 'w', group: 2 },
    { id: 'e', primary: 'e', shifted: 'E', altGr: 'e', group: 3 },
    { id: 'r', primary: 'r', shifted: 'R', altGr: 'r', group: 4 },
    { id: 't', primary: 't', shifted: 'T', altGr: 't', group: 4 },
    { id: 'y', primary: 'y', shifted: 'Y', altGr: 'y', group: 5 },
    { id: 'u', primary: 'u', shifted: 'U', altGr: 'u', group: 5 },
    { id: 'i', primary: 'i', shifted: 'I', altGr: 'i', group: 6 },
    { id: 'o', primary: 'o', shifted: 'O', altGr: 'o', group: 7 },
    { id: 'p', primary: 'p', shifted: 'P', altGr: 'p', group: 8 },
    { id: 'leftSquareBracket', primary: 'ư', shifted: 'Ư', altGr: '[', group: 8 },
    { id: 'rightSquareBracket', primary: 'ơ', shifted: 'Ơ', altGr: ']', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', altGr: '\\', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'a', shifted: 'A', altGr: 'a', group: 1 },
    { id: 's', primary: 's', shifted: 'S', altGr: 's', group: 2 },
    { id: 'd', primary: 'd', shifted: 'D', altGr: 'd', group: 3 },
    { id: 'f', primary: 'f', shifted: 'F', altGr: 'f', group: 4 },
    { id: 'g', primary: 'g', shifted: 'G', altGr: 'g', group: 4 },
    { id: 'h', primary: 'h', shifted: 'H', altGr: 'h', group: 5 },
    { id: 'j', primary: 'j', shifted: 'J', altGr: 'j', group: 5 },
    { id: 'k', primary: 'k', shifted: 'K', altGr: 'k', group: 6 },
    { id: 'l', primary: 'l', shifted: 'L', altGr: 'l', group: 7 },
    { id: 'cologn', primary: ';', shifted: ':', altGr: ';', group: 8 },
    { id: 'quote', primary: '\'', shifted: '"', altGr: '\'', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'z', shifted: 'Z', altGr: 'z', group: 1 },
    { id: 'x', primary: 'x', shifted: 'X', altGr: 'x', group: 2 },
    { id: 'c', primary: 'c', shifted: 'C', altGr: 'c', group: 3 },
    { id: 'v', primary: 'v', shifted: 'V', altGr: 'v', group: 4 },
    { id: 'b', primary: 'b', shifted: 'B', altGr: 'b', group: 4 },
    { id: 'n', primary: 'n', shifted: 'N', altGr: 'n', group: 5 },
    { id: 'm', primary: 'm', shifted: 'M', altGr: 'm', group: 5 },
    { id: 'comma', primary: ',', shifted: '<', altGr: ',', group: 6 },
    { id: 'period', primary: '.', shifted: '>', altGr: '.', group: 7 },
    { id: 'slash', primary: '/', shifted: '?', altGr: '/', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
