import type { KeyboardLayout } from '../types/keyboard';

export interface KeyStroke {
  targetKeyId: string;
  shiftTarget: 'l' | 'r' | null;
}

// Typographic and typewriter apostrophes are typed with the same key
const APOSTROPHES = ["'", '’', '‘', 'ʼ'];

/**
 * Find the key (and Shift side) that produces a character directly,
 * checking primary, shifted, and AltGr characters.
 */
function findDirectKeyStroke(layout: KeyboardLayout, char: string): KeyStroke | null {
  // Normalize the key for comparison (handle case-insensitive matching)
  const normalizedKey = char.toLowerCase();
  const isUpperCase = char !== normalizedKey;

  const keyDef = layout.keys.find(k => {
    // For exact case matching when key is uppercase
    if (isUpperCase) {
      return k.shifted === char || k.primary === char || k.altGr === char;
    }
    return (
      k.primary.toLowerCase() === normalizedKey ||
      k.shifted?.toLowerCase() === normalizedKey ||
      k.altGr?.toLowerCase() === normalizedKey
    );
  });
  if (!keyDef) return null;

  // Shift is needed if the character is the uppercase shifted character, or
  // a lowercase character that is only on the shifted level (e.g. '!' on '1')
  const isShifted = isUpperCase
    ? keyDef.shifted === char
    : keyDef.shifted?.toLowerCase() === normalizedKey &&
      keyDef.primary.toLowerCase() !== normalizedKey;
  if (!isShifted) return { targetKeyId: keyDef.id, shiftTarget: null };

  // Use the Shift key on the opposite hand
  const isLeftHand = layout.leftHandKeys.includes(keyDef.primary.toLowerCase());
  return { targetKeyId: keyDef.id, shiftTarget: isLeftHand ? 'r' : 'l' };
}

/**
 * Find the key on its own, or another apostrophe variant if the layout only has one
 */
export function findKeyStroke(layout: KeyboardLayout, char: string): KeyStroke | null {
  const direct = findDirectKeyStroke(layout, char);
  if (direct || !APOSTROPHES.includes(char)) return direct;
  for (const variant of APOSTROPHES) {
    const stroke = findDirectKeyStroke(layout, variant);
    if (stroke) return stroke;
  }
  return null;
}

/**
 * Split an accented letter without its own key into its dead key and base
 * letter (e.g. 'ã' -> '~', 'a'; 'Á' -> '´', 'A'), or null if not possible.
 */
export function getDeadKeySequence(
  layout: KeyboardLayout,
  char: string
): { deadChar: string; base: string } | null {
  const [base, mark, ...rest] = [...char.normalize('NFD')];
  const deadChar = mark && rest.length === 0 ? layout.deadKeys?.[mark] : undefined;
  return deadChar ? { deadChar, base } : null;
}

/**
 * Keystroke to highlight for the next character. For accented letters typed
 * with a dead key, this is the dead key first, then the base letter.
 */
export function getNextKeyStroke(
  layout: KeyboardLayout,
  char: string,
  deadKeyPending: boolean
): KeyStroke | null {
  const direct = findKeyStroke(layout, char);
  if (direct) return direct;
  const sequence = getDeadKeySequence(layout, char);
  if (!sequence) return null;
  return findKeyStroke(layout, deadKeyPending ? sequence.base : sequence.deadChar);
}

/**
 * Whether a character can be typed on the layout, directly or with a dead key
 */
export function canTypeChar(layout: KeyboardLayout, char: string): boolean {
  if (char === ' ' || findKeyStroke(layout, char)) return true;
  const sequence = getDeadKeySequence(layout, char);
  return !!sequence &&
    !!findKeyStroke(layout, sequence.deadChar) &&
    !!findKeyStroke(layout, sequence.base);
}
