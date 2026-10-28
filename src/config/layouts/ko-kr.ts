import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Korean QWERTY keyboard layout (Hangul input)
 * Standard layout used in South Korea for Hangul input method
 */
export const koKrLayout: KeyboardLayout = {
  id: 'ko-kr',
  name: '한국어 (Hangul)',
  language: 'ko',
  flag: '🇰🇷',
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
    { id: 'q', primary: 'ㅂ', shifted: 'ㅃ', group: 1 },
    { id: 'w', primary: 'ㅈ', shifted: 'ㅉ', group: 2 },
    { id: 'e', primary: 'ㄷ', shifted: 'ㄸ', group: 3 },
    { id: 'r', primary: 'ㄱ', shifted: 'ㄲ', group: 4 },
    { id: 't', primary: 'ㅅ', shifted: 'ㅆ', group: 4 },
    { id: 'y', primary: 'ㅛ', group: 5 },
    { id: 'u', primary: 'ㅕ', group: 5 },
    { id: 'i', primary: 'ㅑ', group: 6 },
    { id: 'o', primary: 'ㅐ', shifted: 'ㅒ', group: 7 },
    { id: 'p', primary: 'ㅔ', shifted: 'ㅖ', group: 8 },
    { id: 'leftSquareBracket', primary: '[', shifted: '{', group: 8 },
    { id: 'rightSquareBracket', primary: ']', shifted: '}', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ㅁ', group: 1 },
    { id: 's', primary: 'ㄴ', group: 2 },
    { id: 'd', primary: 'ㅇ', group: 3 },
    { id: 'f', primary: 'ㄹ', group: 4 },
    { id: 'g', primary: 'ㅎ', group: 4 },
    { id: 'h', primary: 'ㅗ', group: 5 },
    { id: 'j', primary: 'ㅓ', group: 5 },
    { id: 'k', primary: 'ㅏ', group: 6 },
    { id: 'l', primary: 'ㅣ', group: 7 },
    { id: 'cologn', primary: ';', shifted: ':', group: 8 },
    { id: 'quote', primary: "'", shifted: '"', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom row
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'ㅋ', group: 1 },
    { id: 'x', primary: 'ㅌ', group: 2 },
    { id: 'c', primary: 'ㅊ', group: 3 },
    { id: 'v', primary: 'ㅍ', group: 4 },
    { id: 'b', primary: 'ㅠ', group: 4 },
    { id: 'n', primary: 'ㅜ', group: 5 },
    { id: 'm', primary: 'ㅡ', group: 5 },
    { id: 'comma', primary: ',', shifted: '<', group: 6 },
    { id: 'period', primary: '.', shifted: '>', group: 7 },
    { id: 'slash', primary: '/', shifted: '?', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar
    { id: 'space', primary: ' ', width: 'space' },
  ],
};

