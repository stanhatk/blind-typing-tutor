import type { KeyboardLayout } from '../../types/keyboard';

/**
 * ไทย (เกษมณี) keyboard layout, converted from Microsoft's KBDTH0 definition
 * by scripts/klc-to-layout.cjs.
 */
export const thThLayout: KeyboardLayout = {
  id: 'th-th',
  name: 'ไทย (เกษมณี)',
  language: 'th',
  flag: '🇹🇭',
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '_', shifted: '%', group: 1 },
    { id: '1', primary: 'ๅ', shifted: '+', group: 1 },
    { id: '2', primary: '/', shifted: '๑', group: 1 },
    { id: '3', primary: '-', shifted: '๒', group: 2 },
    { id: '4', primary: 'ภ', shifted: '๓', group: 3 },
    { id: '5', primary: 'ถ', shifted: '๔', group: 4 },
    { id: '6', primary: 'ุ', shifted: 'ู', group: 4 },
    { id: '7', primary: 'ึ', shifted: '฿', group: 5 },
    { id: '8', primary: 'ค', shifted: '๕', group: 5 },
    { id: '9', primary: 'ต', shifted: '๖', group: 6 },
    { id: '0', primary: 'จ', shifted: '๗', group: 7 },
    { id: 'underscore', primary: 'ข', shifted: '๘', group: 8 },
    { id: 'equal', primary: 'ช', shifted: '๙', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'ๆ', shifted: '๐', group: 1 },
    { id: 'w', primary: 'ไ', shifted: '"', group: 2 },
    { id: 'e', primary: 'ำ', shifted: 'ฎ', group: 3 },
    { id: 'r', primary: 'พ', shifted: 'ฑ', group: 4 },
    { id: 't', primary: 'ะ', shifted: 'ธ', group: 4 },
    { id: 'y', primary: 'ั', shifted: 'ํ', group: 5 },
    { id: 'u', primary: 'ี', shifted: '๊', group: 5 },
    { id: 'i', primary: 'ร', shifted: 'ณ', group: 6 },
    { id: 'o', primary: 'น', shifted: 'ฯ', group: 7 },
    { id: 'p', primary: 'ย', shifted: 'ญ', group: 8 },
    { id: 'leftSquareBracket', primary: 'บ', shifted: 'ฐ', group: 8 },
    { id: 'rightSquareBracket', primary: 'ล', shifted: ',', group: 8 },
    { id: 'backSlash', primary: 'ฃ', shifted: 'ฅ', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ฟ', shifted: 'ฤ', group: 1 },
    { id: 's', primary: 'ห', shifted: 'ฆ', group: 2 },
    { id: 'd', primary: 'ก', shifted: 'ฏ', group: 3 },
    { id: 'f', primary: 'ด', shifted: 'โ', group: 4 },
    { id: 'g', primary: 'เ', shifted: 'ฌ', group: 4 },
    { id: 'h', primary: '้', shifted: '็', group: 5 },
    { id: 'j', primary: '่', shifted: '๋', group: 5 },
    { id: 'k', primary: 'า', shifted: 'ษ', group: 6 },
    { id: 'l', primary: 'ส', shifted: 'ศ', group: 7 },
    { id: 'cologn', primary: 'ว', shifted: 'ซ', group: 8 },
    { id: 'quote', primary: 'ง', shifted: '.', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'ผ', shifted: '(', group: 1 },
    { id: 'x', primary: 'ป', shifted: ')', group: 2 },
    { id: 'c', primary: 'แ', shifted: 'ฉ', group: 3 },
    { id: 'v', primary: 'อ', shifted: 'ฮ', group: 4 },
    { id: 'b', primary: 'ิ', shifted: 'ฺ', group: 4 },
    { id: 'n', primary: 'ื', shifted: '์', group: 5 },
    { id: 'm', primary: 'ท', shifted: '?', group: 5 },
    { id: 'comma', primary: 'ม', shifted: 'ฒ', group: 6 },
    { id: 'period', primary: 'ใ', shifted: 'ฬ', group: 7 },
    { id: 'slash', primary: 'ฝ', shifted: 'ฦ', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
