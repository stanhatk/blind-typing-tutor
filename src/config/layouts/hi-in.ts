import type { KeyboardLayout } from '../../types/keyboard';

/**
 * हिन्दी (Devanagari) keyboard layout, converted from Microsoft's KBDINDEV definition
 * by scripts/klc-to-layout.cjs.
 */
export const hiInLayout: KeyboardLayout = {
  id: 'hi-in',
  name: 'हिन्दी (Devanagari)',
  language: 'hi',
  flag: '🇮🇳',
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: 'ॊ', shifted: 'ऒ', group: 1 },
    { id: '1', primary: '1', shifted: 'ऍ', altGr: '१', group: 1 },
    { id: '2', primary: '2', shifted: 'ॅ', altGr: '२', group: 1 },
    { id: '3', primary: '3', shifted: '्र', altGr: '३', group: 2 },
    { id: '4', primary: '4', shifted: 'र्', altGr: '४', group: 3 },
    { id: '5', primary: '5', shifted: 'ज्ञ', altGr: '५', group: 4 },
    { id: '6', primary: '6', shifted: 'त्र', altGr: '६', group: 4 },
    { id: '7', primary: '7', shifted: 'क्ष', altGr: '७', group: 5 },
    { id: '8', primary: '8', shifted: 'श्र', altGr: '८', group: 5 },
    { id: '9', primary: '9', shifted: '(', altGr: '९', group: 6 },
    { id: '0', primary: '0', shifted: ')', altGr: '०', group: 7 },
    { id: 'underscore', primary: '-', shifted: 'ः', group: 8 },
    { id: 'equal', primary: 'ृ', shifted: 'ऋ', altGr: 'ॄ', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'ौ', shifted: 'औ', group: 1 },
    { id: 'w', primary: 'ै', shifted: 'ऐ', group: 2 },
    { id: 'e', primary: 'ा', shifted: 'आ', group: 3 },
    { id: 'r', primary: 'ी', shifted: 'ई', altGr: 'ॣ', group: 4 },
    { id: 't', primary: 'ू', shifted: 'ऊ', group: 4 },
    { id: 'y', primary: 'ब', shifted: 'भ', group: 5 },
    { id: 'u', primary: 'ह', shifted: 'ङ', group: 5 },
    { id: 'i', primary: 'ग', shifted: 'घ', altGr: 'ग़', group: 6 },
    { id: 'o', primary: 'द', shifted: 'ध', group: 7 },
    { id: 'p', primary: 'ज', shifted: 'झ', altGr: 'ज़', group: 8 },
    { id: 'leftSquareBracket', primary: 'ड', shifted: 'ढ', altGr: 'ड़', group: 8 },
    { id: 'rightSquareBracket', primary: '़', shifted: 'ञ', group: 8 },
    { id: 'backSlash', primary: 'ॉ', shifted: 'ऑ', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ो', shifted: 'ओ', group: 1 },
    { id: 's', primary: 'े', shifted: 'ए', group: 2 },
    { id: 'd', primary: '्', shifted: 'अ', altGr: '॒', group: 3 },
    { id: 'f', primary: 'ि', shifted: 'इ', altGr: 'ॢ', group: 4 },
    { id: 'g', primary: 'ु', shifted: 'उ', group: 4 },
    { id: 'h', primary: 'प', shifted: 'फ', group: 5 },
    { id: 'j', primary: 'र', shifted: 'ऱ', group: 5 },
    { id: 'k', primary: 'क', shifted: 'ख', altGr: 'क़', group: 6 },
    { id: 'l', primary: 'त', shifted: 'थ', group: 7 },
    { id: 'cologn', primary: 'च', shifted: 'छ', altGr: '॒', group: 8 },
    { id: 'quote', primary: 'ट', shifted: 'ठ', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'ॆ', shifted: 'ऎ', altGr: '॓', group: 1 },
    { id: 'x', primary: 'ं', shifted: 'ँ', group: 2 },
    { id: 'c', primary: 'म', shifted: 'ण', altGr: '॔', group: 3 },
    { id: 'v', primary: 'न', shifted: 'ऩ', group: 4 },
    { id: 'b', primary: 'व', shifted: 'ऴ', group: 4 },
    { id: 'n', primary: 'ल', shifted: 'ळ', group: 5 },
    { id: 'm', primary: 'स', shifted: 'श', group: 5 },
    { id: 'comma', primary: ',', shifted: 'ष', altGr: '॰', group: 6 },
    { id: 'period', primary: '.', shifted: '।', altGr: '॥', group: 7 },
    { id: 'slash', primary: 'य', shifted: 'य़', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
