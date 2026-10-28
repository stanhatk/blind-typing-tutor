import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Hindi InScript keyboard layout (Devanagari)
 * Standard Indian government layout (Windows "Hindi Traditional").
 * Vowel signs, halant (्) and nukta (़) are separate keystrokes.
 */
export const hiInLayout: KeyboardLayout = {
  id: 'hi-in',
  name: 'हिन्दी (Devanagari)',
  language: 'hi',
  flag: '🇮🇳',
  leftHandKeys: ['ौ', 'ै', 'ा', 'ी', 'ू', 'ो', 'े', '्', 'ि', 'ु', 'ॆ', 'ं', 'म', 'न', 'व'],
  keys: [
    // Row 1 - Number row
    { id: 'backtick', primary: 'ॊ', shifted: 'ऒ', group: 1 },
    { id: '1', primary: '1', shifted: 'ऍ', group: 1 },
    { id: '2', primary: '2', shifted: 'ॅ', group: 1 },
    { id: '3', primary: '3', shifted: '्र', group: 2 },
    { id: '4', primary: '4', shifted: 'र्', group: 3 },
    { id: '5', primary: '5', shifted: 'ज्ञ', group: 4 },
    { id: '6', primary: '6', shifted: 'त्र', group: 4 },
    { id: '7', primary: '7', shifted: 'क्ष', group: 5 },
    { id: '8', primary: '8', shifted: 'श्र', group: 5 },
    { id: '9', primary: '9', shifted: '(', group: 6 },
    { id: '0', primary: '0', shifted: ')', group: 7 },
    { id: 'underscore', primary: '-', shifted: 'ः', group: 8 },
    { id: 'equal', primary: 'ृ', shifted: 'ऋ', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'ौ', shifted: 'औ', group: 1 },
    { id: 'w', primary: 'ै', shifted: 'ऐ', group: 2 },
    { id: 'e', primary: 'ा', shifted: 'आ', group: 3 },
    { id: 'r', primary: 'ी', shifted: 'ई', group: 4 },
    { id: 't', primary: 'ू', shifted: 'ऊ', group: 4 },
    { id: 'y', primary: 'ब', shifted: 'भ', group: 5 },
    { id: 'u', primary: 'ह', shifted: 'ङ', group: 5 },
    { id: 'i', primary: 'ग', shifted: 'घ', group: 6 },
    { id: 'o', primary: 'द', shifted: 'ध', group: 7 },
    { id: 'p', primary: 'ज', shifted: 'झ', group: 8 },
    { id: 'leftSquareBracket', primary: 'ड', shifted: 'ढ', group: 8 },
    { id: 'rightSquareBracket', primary: '़', shifted: 'ञ', group: 8 },
    { id: 'backSlash', primary: 'ॉ', shifted: 'ऑ', group: 8 },
    
    // Row 3 - Home row
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ो', shifted: 'ओ', group: 1 },
    { id: 's', primary: 'े', shifted: 'ए', group: 2 },
    { id: 'd', primary: '्', shifted: 'अ', group: 3 },
    { id: 'f', primary: 'ि', shifted: 'इ', group: 4 },
    { id: 'g', primary: 'ु', shifted: 'उ', group: 4 },
    { id: 'h', primary: 'प', shifted: 'फ', group: 5 },
    { id: 'j', primary: 'र', shifted: 'ऱ', group: 5 },
    { id: 'k', primary: 'क', shifted: 'ख', group: 6 },
    { id: 'l', primary: 'त', shifted: 'थ', group: 7 },
    { id: 'cologn', primary: 'च', shifted: 'छ', group: 8 },
    { id: 'quote', primary: 'ट', shifted: 'ठ', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom row
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'ॆ', shifted: 'ऎ', group: 1 },
    { id: 'x', primary: 'ं', shifted: 'ँ', group: 2 },
    { id: 'c', primary: 'म', shifted: 'ण', group: 3 },
    { id: 'v', primary: 'न', shifted: 'ऩ', group: 4 },
    { id: 'b', primary: 'व', shifted: 'ऴ', group: 4 },
    { id: 'n', primary: 'ल', shifted: 'ळ', group: 5 },
    { id: 'm', primary: 'स', shifted: 'श', group: 5 },
    { id: 'comma', primary: ',', shifted: 'ष', group: 6 },
    { id: 'period', primary: '.', shifted: '।', group: 7 },
    { id: 'slash', primary: 'य', shifted: 'य़', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar
    { id: 'space', primary: ' ', width: 'space' },
  ],
};

