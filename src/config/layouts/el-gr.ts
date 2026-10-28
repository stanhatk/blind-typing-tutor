import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Greek QWERTY keyboard layout
 * Standard layout used in Greece
 */
export const elGrLayout: KeyboardLayout = {
  id: 'el-gr',
  name: 'Ελληνικά',
  language: 'el',
  flag: '🇬🇷',
  deadKeys: {
    '\u0301': '΄', // tonos
    '\u0308': '¨', // dialytika
  },
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
    { id: 'q', primary: ';', shifted: ':', group: 1 },
    { id: 'w', primary: 'ς', group: 2 }, // Shift+W is not used for Σ; that is Shift+S,
    { id: 'e', primary: 'ε', shifted: 'Ε', group: 3 },
    { id: 'r', primary: 'ρ', shifted: 'Ρ', group: 4 },
    { id: 't', primary: 'τ', shifted: 'Τ', group: 4 },
    { id: 'y', primary: 'υ', shifted: 'Υ', group: 5 },
    { id: 'u', primary: 'θ', shifted: 'Θ', group: 5 },
    { id: 'i', primary: 'ι', shifted: 'Ι', group: 6 },
    { id: 'o', primary: 'ο', shifted: 'Ο', group: 7 },
    { id: 'p', primary: 'π', shifted: 'Π', group: 8 },
    { id: 'leftSquareBracket', primary: '[', shifted: '{', group: 8 },
    { id: 'rightSquareBracket', primary: ']', shifted: '}', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '|', group: 8 },
    
    // Row 3 - Home row
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'α', shifted: 'Α', group: 1 },
    { id: 's', primary: 'σ', shifted: 'Σ', group: 2 },
    { id: 'd', primary: 'δ', shifted: 'Δ', group: 3 },
    { id: 'f', primary: 'φ', shifted: 'Φ', group: 4 },
    { id: 'g', primary: 'γ', shifted: 'Γ', group: 4 },
    { id: 'h', primary: 'η', shifted: 'Η', group: 5 },
    { id: 'j', primary: 'ξ', shifted: 'Ξ', group: 5 },
    { id: 'k', primary: 'κ', shifted: 'Κ', group: 6 },
    { id: 'l', primary: 'λ', shifted: 'Λ', group: 7 },
    { id: 'cologn', primary: '΄', shifted: '¨', group: 8 },
    { id: 'quote', primary: "'", shifted: '"', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom row
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'ζ', shifted: 'Ζ', group: 1 },
    { id: 'x', primary: 'χ', shifted: 'Χ', group: 2 },
    { id: 'c', primary: 'ψ', shifted: 'Ψ', group: 3 },
    { id: 'v', primary: 'ω', shifted: 'Ω', group: 4 },
    { id: 'b', primary: 'β', shifted: 'Β', group: 4 },
    { id: 'n', primary: 'ν', shifted: 'Ν', group: 5 },
    { id: 'm', primary: 'μ', shifted: 'Μ', group: 5 },
    { id: 'comma', primary: ',', shifted: '<', group: 6 },
    { id: 'period', primary: '.', shifted: '>', group: 7 },
    { id: 'slash', primary: '/', shifted: '?', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar
    { id: 'space', primary: ' ', width: 'space' },
  ],
};

