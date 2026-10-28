import type { KeyboardLayout } from '../../types/keyboard';

/**
 * Қазақша keyboard layout, converted from Microsoft's KBDKAZ definition
 * by scripts/klc-to-layout.cjs.
 */
export const kkKzLayout: KeyboardLayout = {
  id: 'kk-kz',
  name: 'Қазақша',
  language: 'kk',
  flag: '🇰🇿',
  keys: [
    // Row 1 - Number/Symbol row (top row)
    { id: 'backtick', primary: '(', shifted: ')', group: 1 },
    { id: '1', primary: '"', shifted: '!', group: 1 },
    { id: '2', primary: 'ә', shifted: 'Ә', group: 1 },
    { id: '3', primary: 'і', shifted: 'І', group: 2 },
    { id: '4', primary: 'ң', shifted: 'Ң', group: 3 },
    { id: '5', primary: 'ғ', shifted: 'Ғ', group: 4 },
    { id: '6', primary: ',', shifted: ';', group: 4 },
    { id: '7', primary: '.', shifted: ':', group: 5 },
    { id: '8', primary: 'ү', shifted: 'Ү', group: 5 },
    { id: '9', primary: 'ұ', shifted: 'Ұ', group: 6 },
    { id: '0', primary: 'қ', shifted: 'Қ', group: 7 },
    { id: 'underscore', primary: 'ө', shifted: 'Ө', group: 8 },
    { id: 'equal', primary: 'һ', shifted: 'Һ', group: 8 },
    { id: 'backspace', primary: 'backspace', width: 'tab' },
    
    // Row 2 - QWERTY row
    { id: 'tab', primary: 'tab', width: 'tab' },
    { id: 'q', primary: 'й', shifted: 'Й', group: 1 },
    { id: 'w', primary: 'ц', shifted: 'Ц', group: 2 },
    { id: 'e', primary: 'у', shifted: 'У', group: 3 },
    { id: 'r', primary: 'к', shifted: 'К', group: 4 },
    { id: 't', primary: 'е', shifted: 'Е', group: 4 },
    { id: 'y', primary: 'н', shifted: 'Н', group: 5 },
    { id: 'u', primary: 'г', shifted: 'Г', group: 5 },
    { id: 'i', primary: 'ш', shifted: 'Ш', group: 6 },
    { id: 'o', primary: 'щ', shifted: 'Щ', group: 7 },
    { id: 'p', primary: 'з', shifted: 'З', group: 8 },
    { id: 'leftSquareBracket', primary: 'х', shifted: 'Х', group: 8 },
    { id: 'rightSquareBracket', primary: 'ъ', shifted: 'Ъ', group: 8 },
    { id: 'backSlash', primary: '\\', shifted: '/', group: 8 },
    
    // Row 3 - Home row (ASDF)
    { id: 'caps_lock', primary: 'caps', width: 'caps' },
    { id: 'a', primary: 'ф', shifted: 'Ф', group: 1 },
    { id: 's', primary: 'ы', shifted: 'Ы', group: 2 },
    { id: 'd', primary: 'в', shifted: 'В', group: 3 },
    { id: 'f', primary: 'а', shifted: 'А', group: 4 },
    { id: 'g', primary: 'п', shifted: 'П', group: 4 },
    { id: 'h', primary: 'р', shifted: 'Р', group: 5 },
    { id: 'j', primary: 'о', shifted: 'О', group: 5 },
    { id: 'k', primary: 'л', shifted: 'Л', group: 6 },
    { id: 'l', primary: 'д', shifted: 'Д', group: 7 },
    { id: 'cologn', primary: 'ж', shifted: 'Ж', group: 8 },
    { id: 'quote', primary: 'э', shifted: 'Э', group: 8 },
    { id: 'enter', primary: 'enter', width: 'enter' },
    
    // Row 4 - Bottom letter row (ZXCV)
    { id: 'shift-l', primary: 'shift', width: 'shift' },
    { id: 'z', primary: 'я', shifted: 'Я', group: 1 },
    { id: 'x', primary: 'ч', shifted: 'Ч', group: 2 },
    { id: 'c', primary: 'с', shifted: 'С', group: 3 },
    { id: 'v', primary: 'м', shifted: 'М', group: 4 },
    { id: 'b', primary: 'и', shifted: 'И', group: 4 },
    { id: 'n', primary: 'т', shifted: 'Т', group: 5 },
    { id: 'm', primary: 'ь', shifted: 'Ь', group: 5 },
    { id: 'comma', primary: 'б', shifted: 'Б', group: 6 },
    { id: 'period', primary: 'ю', shifted: 'Ю', group: 7 },
    { id: 'slash', primary: '№', shifted: '?', group: 8 },
    { id: 'shift-r', primary: 'shift', width: 'shift' },
    
    // Row 5 - Space bar row
    { id: 'space', primary: ' ', width: 'space' },
  ],
};
