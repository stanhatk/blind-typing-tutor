import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Български keyboard layout, converted from Microsoft's KBDBU definition
 * by scripts/klc-to-layout.cjs.
 */
export const bgBgLayout: KeyboardLayout = {
  id: 'bg-bg',
  name: 'Български',
  language: 'bg',
  flag: '🇧🇬',
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '`', shifted: '~', group: 1 },
    { id: '1', primary: '1', shifted: '!', group: 1 },
    { id: '2', primary: '2', shifted: '?', group: 1 },
    { id: '3', primary: '3', shifted: '+', group: 2 },
    { id: '4', primary: '4', shifted: '"', group: 3 },
    { id: '5', primary: '5', shifted: '%', group: 4 },
    { id: '6', primary: '6', shifted: '=', group: 4 },
    { id: '7', primary: '7', shifted: ':', group: 5 },
    { id: '8', primary: '8', shifted: '/', group: 5 },
    { id: '9', primary: '9', shifted: '_', group: 6 },
    { id: '0', primary: '0', shifted: '№', group: 7 },
    { id: 'underscore', primary: '-', shifted: 'І', group: 8 },
    { id: 'equal', primary: '.', shifted: 'V', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: ',', shifted: 'ы', group: 1 },
    { id: 'w', primary: 'у', shifted: 'У', group: 2 },
    { id: 'e', primary: 'е', shifted: 'Е', group: 3 },
    { id: 'r', primary: 'и', shifted: 'И', group: 4 },
    { id: 't', primary: 'ш', shifted: 'Ш', group: 4 },
    { id: 'y', primary: 'щ', shifted: 'Щ', group: 5 },
    { id: 'u', primary: 'к', shifted: 'К', group: 5 },
    { id: 'i', primary: 'с', shifted: 'С', group: 6 },
    { id: 'o', primary: 'д', shifted: 'Д', group: 7 },
    { id: 'p', primary: 'з', shifted: 'З', group: 8 },
    { id: 'leftSquareBracket', primary: 'ц', shifted: 'Ц', group: 8 },
    { id: 'rightSquareBracket', primary: ';', shifted: '§', group: 8 },
    { id: 'backSlash', primary: '(', shifted: ')', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ь', shifted: 'Ь', group: 1 },
    { id: 's', primary: 'я', shifted: 'Я', group: 2 },
    { id: 'd', primary: 'а', shifted: 'А', group: 3 },
    { id: 'f', primary: 'о', shifted: 'О', group: 4 },
    { id: 'g', primary: 'ж', shifted: 'Ж', group: 4 },
    { id: 'h', primary: 'г', shifted: 'Г', group: 5 },
    { id: 'j', primary: 'т', shifted: 'Т', group: 5 },
    { id: 'k', primary: 'н', shifted: 'Н', group: 6 },
    { id: 'l', primary: 'в', shifted: 'В', group: 7 },
    { id: 'cologn', primary: 'м', shifted: 'М', group: 8 },
    { id: 'quote', primary: 'ч', shifted: 'Ч', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shiftIso' },
    { id: 'intlBackslash', primary: '\\', shifted: '|', group: 1 },
    { id: 'z', primary: 'ю', shifted: 'Ю', group: 1 },
    { id: 'x', primary: 'й', shifted: 'Й', group: 2 },
    { id: 'c', primary: 'ъ', shifted: 'Ъ', group: 3 },
    { id: 'v', primary: 'э', shifted: 'Э', group: 4 },
    { id: 'b', primary: 'ф', shifted: 'Ф', group: 4 },
    { id: 'n', primary: 'х', shifted: 'Х', group: 5 },
    { id: 'm', primary: 'п', shifted: 'П', group: 5 },
    { id: 'comma', primary: 'р', shifted: 'Р', group: 6 },
    { id: 'period', primary: 'л', shifted: 'Л', group: 7 },
    { id: 'slash', primary: 'б', shifted: 'Б', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
