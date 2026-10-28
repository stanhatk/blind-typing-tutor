import type { KeyboardLayout } from '../../types/keyboard';

/**
 * اردو keyboard layout, converted from Microsoft's KBDURDU definition
 * by scripts/klc-to-layout.cjs.
 */
export const urPkLayout: KeyboardLayout = {
  id: 'ur-pk',
  name: 'اردو',
  language: 'ur',
  flag: '🇵🇰',
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '`', shifted: '~', group: 1 },
    { id: '1', primary: '1', shifted: '!', group: 1 },
    { id: '2', primary: '2', shifted: '@', group: 1 },
    { id: '3', primary: '3', shifted: '#', group: 2 },
    { id: '4', primary: '4', shifted: '$', group: 3 },
    { id: '5', primary: '5', shifted: '٪', group: 4 },
    { id: '6', primary: '6', shifted: '^', group: 4 },
    { id: '7', primary: '7', shifted: 'ۖ', group: 5 },
    { id: '8', primary: '8', shifted: '٭', group: 5 },
    { id: '9', primary: '9', shifted: ')', group: 6 },
    { id: '0', primary: '0', shifted: '(', group: 7 },
    { id: 'underscore', primary: '-', shifted: '_', group: 8 },
    { id: 'equal', primary: '=', shifted: '+', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'ط', shifted: 'ظ', group: 1 },
    { id: 'w', primary: 'ص', shifted: 'ض', group: 2 },
    { id: 'e', primary: 'ھ', shifted: 'ذ', group: 3 },
    { id: 'r', primary: 'د', shifted: 'ڈ', group: 4 },
    { id: 't', primary: 'ٹ', shifted: 'ث', group: 4 },
    { id: 'y', primary: 'پ', shifted: 'ّ', group: 5 },
    { id: 'u', primary: 'ت', shifted: 'ۃ', group: 5 },
    { id: 'i', primary: 'ب', shifted: 'ـ', group: 6 },
    { id: 'o', primary: 'ج', shifted: 'چ', group: 7 },
    { id: 'p', primary: 'ح', shifted: 'خ', group: 8 },
    { id: 'leftSquareBracket', primary: ']', shifted: '}', group: 8 },
    { id: 'rightSquareBracket', primary: '[', shifted: '{', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'م', shifted: 'ژ', group: 1 },
    { id: 's', primary: 'و', shifted: 'ز', group: 2 },
    { id: 'd', primary: 'ر', shifted: 'ڑ', group: 3 },
    { id: 'f', primary: 'ن', shifted: 'ں', group: 4 },
    { id: 'g', primary: 'ل', shifted: 'ۂ', group: 4 },
    { id: 'h', primary: 'ہ', shifted: 'ء', group: 5 },
    { id: 'j', primary: 'ا', shifted: 'آ', group: 5 },
    { id: 'k', primary: 'ک', shifted: 'گ', group: 6 },
    { id: 'l', primary: 'ی', shifted: 'ي', group: 7 },
    { id: 'cologn', primary: '؛', shifted: ':', group: 8 },
    { id: 'quote', primary: '\'', shifted: '"', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shiftIso' },
    { id: 'intlBackslash', primary: '\\', shifted: '|', group: 1 },
    { id: 'z', primary: 'ق', shifted: '‍', group: 1 },
    { id: 'x', primary: 'ف', shifted: '‌', group: 2 },
    { id: 'c', primary: 'ے', shifted: 'ۓ', group: 3 },
    { id: 'v', primary: 'س', shifted: '‎', group: 4 },
    { id: 'b', primary: 'ش', shifted: 'ؤ', group: 4 },
    { id: 'n', primary: 'غ', shifted: 'ئ', group: 5 },
    { id: 'm', primary: 'ع', shifted: '‏', group: 5 },
    { id: 'comma', primary: '،', shifted: '>', group: 6 },
    { id: 'period', primary: '۔', shifted: '<', group: 7 },
    { id: 'slash', primary: '/', shifted: '؟', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
