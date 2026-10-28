import type { KeyboardLayout } from '../../types/keyboard';

/**
 * தமிழ் 99 keyboard layout, converted from Microsoft's KBDTAM99 definition
 * by scripts/klc-to-layout.cjs.
 */
export const taInLayout: KeyboardLayout = {
  id: 'ta-in',
  name: 'தமிழ் 99',
  language: 'ta',
  flag: '🇮🇳',
  // The IME turns a vowel typed after a consonant into its sign (க + ஆ = கா)
  vowelSignKeys: {
    'ா': 'ஆ',
    'ி': 'இ',
    'ீ': 'ஈ',
    'ு': 'உ',
    'ூ': 'ஊ',
    'ெ': 'எ',
    'ே': 'ஏ',
    'ை': 'ஐ',
    'ொ': 'ஒ',
    'ோ': 'ஓ',
    'ௌ': 'ஔ',
  },
  keys: [
    // Row 1 - Number/Symbol row (top row)
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
    { id: 'q', primary: 'ஆ', shifted: 'ஸ', group: 1 },
    { id: 'w', primary: 'ஈ', shifted: 'ஷ', group: 2 },
    { id: 'e', primary: 'ஊ', shifted: 'ஜ', group: 3 },
    { id: 'r', primary: 'ஐ', shifted: 'ஹ', group: 4 },
    { id: 't', primary: 'ஏ', shifted: 'க்ஷ', group: 4 },
    { id: 'y', primary: 'ள', shifted: 'ஶ்ரீ', group: 5 },
    { id: 'u', primary: 'ற', shifted: 'ஶ', group: 5 },
    { id: 'i', primary: 'ன', group: 6 },
    { id: 'o', primary: 'ட', shifted: '[', group: 7 },
    { id: 'p', primary: 'ண', shifted: ']', group: 8 },
    { id: 'leftSquareBracket', primary: 'ச', shifted: '{', group: 8 },
    { id: 'rightSquareBracket', primary: 'ஞ', shifted: '}', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'அ', shifted: '௹', group: 1 },
    { id: 's', primary: 'இ', shifted: '௺', group: 2 },
    { id: 'd', primary: 'உ', shifted: '௸', group: 3 },
    { id: 'f', primary: '்', shifted: 'ஃ', group: 4 },
    { id: 'g', primary: 'எ', shifted: 'எ', group: 4 },
    { id: 'h', primary: 'க', shifted: 'க', group: 5 },
    { id: 'j', primary: 'ப', shifted: 'ப', group: 5 },
    { id: 'k', primary: 'ம', shifted: '"', group: 6 },
    { id: 'l', primary: 'த', shifted: ':', group: 7 },
    { id: 'cologn', primary: 'ந', shifted: ';', group: 8 },
    { id: 'quote', primary: 'ய', shifted: '\'', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'ஔ', shifted: '௳', group: 1 },
    { id: 'x', primary: 'ஓ', shifted: '௴', group: 2 },
    { id: 'c', primary: 'ஒ', shifted: '௵', group: 3 },
    { id: 'v', primary: 'வ', shifted: '௶', group: 4 },
    { id: 'b', primary: 'ங', shifted: '௷', group: 4 },
    { id: 'n', primary: 'ல', shifted: 'ௐ', group: 5 },
    { id: 'm', primary: 'ர', shifted: '/', group: 5 },
    { id: 'comma', primary: ',', shifted: '<', group: 6 },
    { id: 'period', primary: '.', shifted: '>', group: 7 },
    { id: 'slash', primary: 'ழ', shifted: '?', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
