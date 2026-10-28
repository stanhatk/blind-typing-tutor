import type { KeyboardLayout } from '../../types/keyboard';

/**
 * فارسی keyboard layout, converted from Microsoft's KBDFAR definition
 * by scripts/klc-to-layout.cjs.
 */
export const faIrLayout: KeyboardLayout = {
  id: 'fa-ir',
  name: 'فارسی',
  language: 'fa',
  flag: '🇮🇷',
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '‍', shifted: '‍', group: 1 },
    { id: '1', primary: '۱', shifted: '!', group: 1 },
    { id: '2', primary: '۲', shifted: '٬', group: 1 },
    { id: '3', primary: '۳', shifted: '٫', group: 2 },
    { id: '4', primary: '۴', shifted: 'ریال', group: 3 },
    { id: '5', primary: '۵', shifted: '٪', group: 4 },
    { id: '6', primary: '۶', shifted: '×', group: 4 },
    { id: '7', primary: '۷', shifted: '،', group: 5 },
    { id: '8', primary: '۸', shifted: '*', group: 5 },
    { id: '9', primary: '۹', shifted: ')', group: 6 },
    { id: '0', primary: '۰', shifted: '(', group: 7 },
    { id: 'underscore', primary: '-', shifted: 'ـ', group: 8 },
    { id: 'equal', primary: '=', shifted: '+', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'ض', shifted: 'ْ', group: 1 },
    { id: 'w', primary: 'ص', shifted: 'ٌ', group: 2 },
    { id: 'e', primary: 'ث', shifted: 'ٍ', group: 3 },
    { id: 'r', primary: 'ق', shifted: 'ً', group: 4 },
    { id: 't', primary: 'ف', shifted: 'ُ', group: 4 },
    { id: 'y', primary: 'غ', shifted: 'ِ', group: 5 },
    { id: 'u', primary: 'ع', shifted: 'َ', group: 5 },
    { id: 'i', primary: 'ه', shifted: 'ّ', group: 6 },
    { id: 'o', primary: 'خ', shifted: ']', group: 7 },
    { id: 'p', primary: 'ح', shifted: '[', group: 8 },
    { id: 'leftSquareBracket', primary: 'ج', shifted: '}', group: 8 },
    { id: 'rightSquareBracket', primary: 'چ', shifted: '{', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ش', shifted: 'ؤ', group: 1 },
    { id: 's', primary: 'س', shifted: 'ئ', group: 2 },
    { id: 'd', primary: 'ی', shifted: 'ي', group: 3 },
    { id: 'f', primary: 'ب', shifted: 'إ', group: 4 },
    { id: 'g', primary: 'ل', shifted: 'أ', group: 4 },
    { id: 'h', primary: 'ا', shifted: 'آ', group: 5 },
    { id: 'j', primary: 'ت', shifted: 'ة', group: 5 },
    { id: 'k', primary: 'ن', shifted: '»', group: 6 },
    { id: 'l', primary: 'م', shifted: '«', group: 7 },
    { id: 'cologn', primary: 'ک', shifted: ':', group: 8 },
    { id: 'quote', primary: 'گ', shifted: '؛', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shiftIso' },
    { id: 'intlBackslash', primary: '\\', shifted: '|', group: 1 },
    { id: 'z', primary: 'ظ', shifted: 'ك', group: 1 },
    { id: 'x', primary: 'ط', shifted: 'ط', group: 2 },
    { id: 'c', primary: 'ز', shifted: 'ژ', group: 3 },
    { id: 'v', primary: 'ر', shifted: 'ٰ', group: 4 },
    { id: 'b', primary: 'ذ', shifted: '‌', group: 4 },
    { id: 'n', primary: 'د', shifted: 'ٔ', group: 5 },
    { id: 'm', primary: 'پ', shifted: 'ء', group: 5 },
    { id: 'comma', primary: 'و', shifted: '>', group: 6 },
    { id: 'period', primary: '.', shifted: '<', group: 7 },
    { id: 'slash', primary: '/', shifted: '؟', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
