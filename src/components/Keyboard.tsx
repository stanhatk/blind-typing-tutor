"use client";

import { useMemo, useState, useEffect } from 'react';
import type { KeyboardLayoutId, KeyDefinition } from '../types/keyboard';
import { getLayout } from '../config/layouts';
import { findKeyStroke, getNextKeyChar } from '../utils/keyStrokes';

interface KeyboardProps {
  upcomingText: string; // Text still to type, starting at the cursor
  pendingText?: string; // Typed but unfinished: a dead key, a letter awaiting its accent, a Hangul syllable
  layoutId: KeyboardLayoutId;
  showHands: boolean;
  showColors: boolean;
  showEnglishHints?: boolean; // Show English characters as hints on non-English layouts
  lastPressedKey?: string | null; // Last key that was physically pressed (for highlighting)
  deadKeyPending?: boolean; // A dead key was pressed and is waiting for its base letter
}

/**
 * Letter keys show the uppercase letter, like printed keycaps, but only when
 * Shift really produces it: CSS capitalize would turn 'ς' into 'Σ' and 'ß' into 'Ss'.
 */
function getKeyLabel(keyDef: KeyDefinition, language: string): string {
  // Locale-aware so Turkish 'i' becomes 'İ'
  const label = keyDef.shifted && keyDef.shifted === keyDef.primary.toLocaleUpperCase(language)
    ? keyDef.shifted
    : keyDef.primary;
  // A lone Latin combining mark (Vietnamese tone key) is invisible, and fonts
  // lack glyphs for it on a dotted circle, so show it on a sample letter: 'ả'.
  // Thai and Devanagari marks are left alone: browsers draw their own placeholder.
  if (label === '\u200C') return 'ZWNJ';
  if (label === '\u200D') return 'ZWJ';
  return /^[\u0300-\u036F]$/.test(label) ? `a${label}`.normalize('NFC') : label;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  upcomingText,
  pendingText = '',
  layoutId,
  showHands,
  showColors,
  showEnglishHints = false,
  lastPressedKey = null,
  deadKeyPending = false
}) => {
  const layout = getLayout(layoutId);
  const enLayout = layoutId !== 'en-us' ? getLayout('en-us') : null;

  // Only show English hints after mount to prevent hydration mismatch
  // Server always renders without hints, client enables after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const effectiveShowEnglishHints = mounted && showEnglishHints;

  // Compute target key, Shift and AltGr for the next keystroke
  const { targetKeyId, shiftTarget, altGrTarget, spaceHand } = useMemo(() => {
    const none = { targetKeyId: null, shiftTarget: null, altGrTarget: false, spaceHand: null };
    // Two characters, because a Korean IME can start the next syllable on the current one
    const upcoming = upcomingText.slice(0, 2).replace(/\u00A0/g, ' ');
    const nextChar = getNextKeyChar(layout, upcoming, pendingText, deadKeyPending);
    if (!nextChar) return none;

    if (nextChar === ' ') {
      return { ...none, targetKeyId: 'space', spaceHand: 'r' as const };
    }

    const stroke = findKeyStroke(layout, nextChar);
    if (!stroke) return none;
    return {
      targetKeyId: stroke.targetKeyId,
      shiftTarget: stroke.shiftTarget,
      altGrTarget: stroke.altGr,
      spaceHand: null,
    };
  }, [upcomingText, pendingText, layout, deadKeyPending]);

  // Compute pressed key ID from lastPressedKey using useMemo instead of useEffect
  const pressedKeyId = useMemo(() => {
    if (!lastPressedKey) {
      return null;
    }

    // Handle special keys
    if (lastPressedKey === 'backspace') {
      return 'backspace';
    }
    if (lastPressedKey === 'enter') {
      return 'enter';
    }
    if (lastPressedKey === 'tab') {
      return 'tab';
    }
    if (lastPressedKey === ' ') {
      return 'space';
    }

    // Find the key in the layout
    const normalizedKey = lastPressedKey.toLowerCase();
    const isUpperCase = lastPressedKey !== normalizedKey;

    const keyDef = layout.keys.find(k => {
      const primaryMatch = k.primary.toLowerCase() === normalizedKey;
      const shiftedMatch = k.shifted?.toLowerCase() === normalizedKey;
      const altGrMatch = k.altGr?.toLowerCase() === normalizedKey;

      if (isUpperCase) {
        return k.shifted === lastPressedKey || k.primary === lastPressedKey || k.altGr === lastPressedKey;
      }

      return primaryMatch || shiftedMatch || altGrMatch;
    });

    return keyDef ? keyDef.id : null;
  }, [lastPressedKey, layout.keys]);

  // Color mapping based on hands2.png - centralized for easy maintenance
  const getGroupColor = (group: number | null, opacity: number = 1): { backgroundColor: string } | null => {
    if (group === null) return null;

    // hands2.png color mapping
    const colors: Record<number, string> = {
      1: '#AD7FA8', // Left pinky - light purple
      2: '#729FCF', // Left index - light blue
      3: '#73D216', // Left middle - bright green
      4: '#FCAF3E', // Left ring - orange
      5: '#FCE94F', // Right index - yellow
      6: '#FCAF3E', // Right middle - orange
      7: '#729FCF', // Right ring - light blue
      8: '#AD7FA8', // Right pinky - light purple
    };

    const color = colors[group];
    if (!color) return null;

    // Convert hex to rgba for opacity support
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`
    };
  };

  const getKeyClass = (keyId: string, group?: number): { className: string; style?: React.CSSProperties } => {
    let classes = "key flex justify-center items-center border border-gray-800 rounded m-0.5 text-sm transition-colors duration-100 relative ";
    let style: React.CSSProperties | undefined;

    // Size classes based on width property
    const key = layout.keys.find(k => k.id === keyId);
    if (key?.width === 'tab') classes += "w-[82px] h-[55px] ";
    else if (key?.width === 'caps') classes += "w-[98px] h-[55px] ";
    else if (key?.width === 'enter') classes += "w-[98px] h-[55px] ";
    else if (key?.width === 'shift') classes += "w-[128px] h-[55px] ";
    else if (key?.width === 'shiftIso') classes += "w-[69px] h-[55px] "; // ISO: shorter Shift plus an extra key
    else if (key?.width === 'space') classes += "w-[330px] h-[55px] ";
    else if (keyId === 'altgr') classes += "w-[82px] h-[55px] ";
    else classes += "w-[55px] h-[55px] ";
    // Special keys (Tab, Shift, ...) are capitalized; letter keys use getKeyLabel
    if (key?.width || keyId === 'altgr') classes += "capitalize ";

    // Override group for shift keys: both left and right shift use left pinky (group 1)
    // Assign groups to special keys that don't have them in layout
    let effectiveGroup = group;
    if (keyId === 'shift-l' || keyId === 'shift-r') {
      effectiveGroup = 1; // Both shift keys use left pinky
    } else if (keyId === 'tab' || keyId === 'caps_lock') {
      effectiveGroup = 1; // Tab and Caps Lock use left pinky
    } else if (keyId === 'backspace' || keyId === 'enter') {
      effectiveGroup = 8; // Backspace and Enter use right pinky
    }

    // Space and AltGr use gray color (thumbs)
    const isSpace = keyId === 'space' || keyId === 'altgr';

    // Active state (correct key)
    const isActive =
      keyId === targetKeyId ||
      keyId === `shift-${shiftTarget}` ||
      (keyId === 'altgr' && altGrTarget);

    // Pressed state (any key pressed, even if incorrect)
    const isPressed = keyId === pressedKeyId || (pressedKeyId === 'space' && keyId === 'space');

    if (isActive) {
      // Active: full color from hands2.png - always white text on colored background
      if (isSpace) {
        style = { backgroundColor: '#727272' };
      } else if (effectiveGroup) {
        const colorStyle = getGroupColor(effectiveGroup, 1);
        if (colorStyle) style = colorStyle;
      }
      classes += "text-black border-2 border-gray-800 ";
      // The hand sprite has no AltGr pose
      if (showHands && keyId !== 'altgr') classes += "key-target ";
    } else if (isPressed) {
      // Pressed: gray highlight - white text on gray background
      classes += "bg-gray-400 text-white border-2 border-gray-600 transition-all duration-200 ";
    } else {
      // Passive: lighter colors if showColors is enabled - dark text on light background
      if (showColors) {
        if (isSpace) {
          style = { backgroundColor: 'rgba(114, 114, 114, 0.3)' };
        } else if (effectiveGroup) {
          const colorStyle = getGroupColor(effectiveGroup, 0.3);
          if (colorStyle) style = colorStyle;
        } else {
          classes += "bg-gray-100 ";
        }
      } else {
        classes += "bg-gray-100 ";
      }
      // Always dark text on light backgrounds (keyboard colors are consistent across themes)
      classes += "text-gray-900 ";
    }

    // Use effectiveGroup for CSS class to ensure correct hand visualization
    if (effectiveGroup) classes += `group-${effectiveGroup} `;
    if (keyId === 'space' && spaceHand === 'r') classes += "righthand ";

    return { className: classes, style };
  };

  // Render key content with optional English hints
  const renderKeyContent = (keyDef: KeyDefinition) => {
    // Special keys
    if (['tab', 'caps_lock', 'shift-l', 'shift-r', 'backspace', 'enter', 'space'].includes(keyDef.id)) {
      return keyDef.primary.replace('-', ' ');
    }

    // Show English hints for non-English layouts (only after mount to prevent hydration mismatch)
    if (effectiveShowEnglishHints && enLayout) {
      const enKey = enLayout.keys.find(k => k.id === keyDef.id);
      if (enKey && enKey.primary !== keyDef.primary) {
        return (
          <div className="flex flex-col items-center justify-center leading-tight">
            <span className="text-[10px] opacity-60">{getKeyLabel(enKey, "en")}</span>
            <span className="text-sm font-medium">{getKeyLabel(keyDef, layout.language)}</span>
          </div>
        );
      }
    }

    return getKeyLabel(keyDef, layout.language);
  };

  // Get keys for each row using a more robust row detection system
  // This determines rows based on key positions relative to row markers
  const rowKeys = useMemo(() => {
    const keys = layout.keys;
    const tabIndex = keys.findIndex(k => k.id === 'tab');
    const capsIndex = keys.findIndex(k => k.id === 'caps_lock');
    const shiftLIndex = keys.findIndex(k => k.id === 'shift-l');
    const spaceIndex = keys.findIndex(k => k.id === 'space');

    // Determine which row each key belongs to based on its position
    const getKeyRow = (keyIndex: number): number => {
      if (keyIndex < tabIndex || (tabIndex === -1 && keyIndex < capsIndex)) return 1;
      if (keyIndex >= tabIndex && keyIndex < capsIndex) return 2;
      if (keyIndex >= capsIndex && keyIndex < shiftLIndex) return 3;
      if (keyIndex >= shiftLIndex && keyIndex < spaceIndex) return 4;
      if (keyIndex === spaceIndex) return 5;
      return 0; // Unknown
    };

    const rows: KeyDefinition[][] = [[], [], [], [], []];
    keys.forEach((key, index) => {
      const row = getKeyRow(index);
      if (row > 0 && row <= 5) {
        rows[row - 1].push(key);
      }
    });

    return rows;
  }, [layout.keys]);

  const [row1Keys, row2Keys, row3Keys, row4Keys, row5Keys] = rowKeys;
  const spaceKey = row5Keys?.[0];
  const hasAltGr = layout.keys.some(k => k.altGr);

  return (
    // Physical keyboards are not mirrored in right-to-left interfaces
    <div dir="ltr" className="flex flex-col items-center justify-center mt-12 select-none opacity-100 transition-opacity duration-200 w-full max-w-[855px] mx-auto">
      {/* Row 1 - Number row */}
      <div className="flex w-full">
        {row1Keys.map(key => {
          const { className, style } = getKeyClass(key.id, key.group);
          return (
            <div key={key.id} id={key.id} className={className} style={style}>
              {renderKeyContent(key)}
            </div>
          );
        })}
      </div>

      {/* Row 2 - Top letter row */}
      <div className="flex w-full">
        {row2Keys.map(key => {
          const { className, style } = getKeyClass(key.id, key.group);
          return (
            <div key={key.id} id={key.id} className={className} style={style}>
              {renderKeyContent(key)}
            </div>
          );
        })}
      </div>

      {/* Row 3 - Home row */}
      <div className="flex w-full">
        {row3Keys.map(key => {
          const { className, style } = getKeyClass(key.id, key.group);
          return (
            <div key={key.id} id={key.id} className={className} style={style}>
              {renderKeyContent(key)}
            </div>
          );
        })}
      </div>

      {/* Row 4 - Bottom row */}
      <div className="flex w-full">
        {row4Keys.map(key => {
          const { className, style } = getKeyClass(key.id, key.group);
          return (
            <div key={key.id} id={key.id} className={className} style={style}>
              {renderKeyContent(key)}
            </div>
          );
        })}
      </div>

      {/* Row 5 - Space bar */}
      <div className="flex w-full justify-center h-[60px]">
        {spaceKey && spaceKey.id === 'space' && (() => {
          const { className, style } = getKeyClass('space');
          return <div id="space" className={className} style={style}></div>;
        })()}
        {/* AltGr (right Alt / Option) for characters on the third key level */}
        {hasAltGr && (() => {
          const { className, style } = getKeyClass('altgr');
          return <div id="altgr" className={className} style={style}>AltGr</div>;
        })()}
      </div>
    </div>
  );
};
