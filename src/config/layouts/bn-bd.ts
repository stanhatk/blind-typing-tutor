import type { KeyboardLayout } from '../../types/keyboard';

/**
 * বাংলা (InScript) keyboard layout, converted from Microsoft's KBDINBE2 definition
 * by scripts/klc-to-layout.cjs.
 */
export const bnBdLayout: KeyboardLayout = {
  id: 'bn-bd',
  name: 'বাংলা (InScript)',
  language: 'bn',
  flag: '🇧🇩',
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '॥', shifted: 'অ্যা', group: 1 },
    { id: '1', primary: '১', shifted: '!', group: 1 },
    { id: '2', primary: '২', shifted: '@', group: 1 },
    { id: '3', primary: '৩', shifted: '্র', group: 2 },
    { id: '4', primary: '৪', shifted: 'র্', group: 3 },
    { id: '5', primary: '৫', shifted: 'জ্ঞ', group: 4 },
    { id: '6', primary: '৬', shifted: 'ত্র', group: 4 },
    { id: '7', primary: '৭', shifted: 'ক্ষ', group: 5 },
    { id: '8', primary: '৮', shifted: 'শ্র', group: 5 },
    { id: '9', primary: '৯', shifted: '(', group: 6 },
    { id: '0', primary: '০', shifted: ')', group: 7 },
    { id: 'underscore', primary: '-', shifted: 'ঃ', group: 8 },
    { id: 'equal', primary: 'ৃ', shifted: 'ঋ', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'ৌ', shifted: 'ঔ', group: 1 },
    { id: 'w', primary: 'ৈ', shifted: 'ঐ', group: 2 },
    { id: 'e', primary: 'া', shifted: 'আ', group: 3 },
    { id: 'r', primary: 'ী', shifted: 'ঈ', group: 4 },
    { id: 't', primary: 'ূ', shifted: 'ঊ', group: 4 },
    { id: 'y', primary: 'ব', shifted: 'ভ', group: 5 },
    { id: 'u', primary: 'হ', shifted: 'ঙ', group: 5 },
    { id: 'i', primary: 'গ', shifted: 'ঘ', group: 6 },
    { id: 'o', primary: 'দ', shifted: 'ধ', group: 7 },
    { id: 'p', primary: 'জ', shifted: 'ঝ', group: 8 },
    { id: 'leftSquareBracket', primary: 'ড', shifted: 'ঢ', group: 8 },
    { id: 'rightSquareBracket', primary: '়', shifted: 'ঞ', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ো', shifted: 'ও', group: 1 },
    { id: 's', primary: 'ে', shifted: 'এ', group: 2 },
    { id: 'd', primary: '্', shifted: 'অ', group: 3 },
    { id: 'f', primary: 'ি', shifted: 'ই', group: 4 },
    { id: 'g', primary: 'ু', shifted: 'উ', group: 4 },
    { id: 'h', primary: 'প', shifted: 'ফ', group: 5 },
    { id: 'j', primary: 'র', shifted: 'ৎ', group: 5 },
    { id: 'k', primary: 'ক', shifted: 'খ', group: 6 },
    { id: 'l', primary: 'ত', shifted: 'থ', group: 7 },
    { id: 'cologn', primary: 'চ', shifted: 'ছ', group: 8 },
    { id: 'quote', primary: 'ট', shifted: 'ঠ', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'z', shifted: 'Z', group: 1 },
    { id: 'x', primary: 'ং', shifted: 'ঁ', group: 2 },
    { id: 'c', primary: 'ম', shifted: 'ণ', group: 3 },
    { id: 'v', primary: 'ন', group: 4 },
    { id: 'b', primary: 'ব', group: 4 },
    { id: 'n', primary: 'ল', group: 5 },
    { id: 'm', primary: 'স', shifted: 'শ', group: 5 },
    { id: 'comma', primary: ',', shifted: 'ষ', group: 6 },
    { id: 'period', primary: '.', shifted: '।', group: 7 },
    { id: 'slash', primary: 'য়', shifted: 'য', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
