import { test, expect } from "@playwright/test";
import { getAllLayouts, getLayout, getLayoutIdsForLanguage } from "../src/config/layouts";
import { VALID_LEARNING_LANGUAGES } from "../src/config/constants";
import { getTypedWord } from "../src/utils/Generator";
import { getKeyHighlight } from "../src/utils/keyStrokes";
import { getKeyLayouts, getPracticeChars, getPracticeLayout } from "../src/utils/practiceLayout";
import { emulateKeyPress, getDeadKeyMark, getLayoutChar } from "../src/utils/layoutEmulation";
import { scoreInput } from "../src/utils/typedText";
import { composeHangul, isHangul } from "../src/utils/hangul";
import { getLetterFrequencies } from "../src/utils/complexity";
import { loadContent, type LanguageContent } from "../src/words";
import type { KeyboardLayout, LanguageCode } from "../src/types/keyboard";

/**
 * Every keyboard shown x every practice language x the system layout a user
 * might have: a simulated user presses only the highlighted physical keys
 * (with Shift/AltGr), and the typed text must match without a mistake.
 * Uses the app's own highlight, emulation and scoring functions.
 */

const ID_TO_CODE: Record<string, string> = {
  backtick: "Backquote", underscore: "Minus", equal: "Equal", leftSquareBracket: "BracketLeft",
  rightSquareBracket: "BracketRight", backSlash: "Backslash", cologn: "Semicolon", quote: "Quote",
  comma: "Comma", period: "Period", slash: "Slash", intlBackslash: "IntlBackslash",
};
const codeFor = (keyId: string) =>
  ID_TO_CODE[keyId] ?? (/^\d$/.test(keyId) ? `Digit${keyId}` : `Key${keyId.toUpperCase()}`);

// Every letter, some words and two phrases, as typed
function sampleText(content: LanguageContent): string {
  const typedWords = content.words.map((word) => getTypedWord(content, word));
  const letters = [...getLetterFrequencies(typedWords).keys()].join(" ");
  const phrases = (content.phrases ?? []).slice(0, 2).map((phrase) => {
    const tokens = content.phraseTokens?.[phrase];
    if (!tokens) return phrase;
    return tokens.reduce((text, [, typed]) => (text && /\p{L}/u.test(typed) ? `${text} ${typed}` : text + typed), "");
  });
  return [letters, typedWords.slice(0, 15).join(" "), ...phrases].join(" ").normalize("NFC");
}

// Type text by pressing the highlighted keys; returns a problem, or null
function simulate(text: string, shown: KeyboardLayout, practice: KeyboardLayout, language: LanguageCode, system: KeyboardLayout): string | null {
  const keyLayouts = getKeyLayouts(shown.id, practice.id, language);
  let input = "";
  let pending: string | null = null;
  let systemDead: string | null = null; // Mark of a system dead key waiting for its letter
  let emulatedDead: string | null = null;
  let deadKeyPending = false;

  for (let steps = 0; input.length < text.length; steps++) {
    if (steps > text.length * 6) return `stuck at "${text.slice(input.length, input.length + 8)}"`;
    const value = pending ?? input;
    const stroke = getKeyHighlight(keyLayouts, text.slice(input.length), pending ? pending.slice(input.length) : "", deadKeyPending);
    if (!stroke) return `no key highlighted for "${text.slice(input.length, input.length + 8)}"`;

    let newValue: string;
    if (stroke.targetKeyId === "space") {
      const result = emulateKeyPress({ practiceLayout: practice, text, input, value, systemKey: " ", code: "Space", shift: false, altGr: false, deadMark: emulatedDead });
      newValue = result.kind === "type" ? result.value : value + " ";
      emulatedDead = null;
    } else {
      const code = codeFor(stroke.targetKeyId);
      const shift = !!stroke.shiftTarget;
      const altGr = stroke.altGr;
      // What the system layout reports for this key
      // (Alt/Option on systems without AltGr types the key's own character)
      // (Alt/Option on systems without AltGr types the key's own character; the
      // ISO key left of Z types "\\" on layouts that do not define it)
      const systemChar = getLayoutChar(system, code, shift, altGr) ??
        (altGr ? getLayoutChar(system, code, shift, false) : null) ??
        (code === "IntlBackslash" ? (shift ? "|" : "\\") : null);
      let systemKey = "Unidentified";
      let systemValue: string | null = null;
      if (systemChar && systemDead) {
        const composed = (systemChar + systemDead).normalize("NFC");
        systemKey = [...composed].length === 1 ? composed : systemChar;
        systemValue = value + systemKey;
      } else if (systemChar && getDeadKeyMark(system, systemChar)) {
        systemKey = "Dead";
      } else if (systemChar) {
        systemKey = systemChar;
        systemValue = value + systemChar;
      }

      const result = emulateKeyPress({ practiceLayout: practice, text, input, value, systemKey, code, shift, altGr, deadMark: emulatedDead });
      if (result.kind === "deadKey") {
        emulatedDead = result.mark;
        systemDead = null;
        deadKeyPending = true;
        continue;
      }
      if (result.kind === "type") {
        newValue = result.value;
      } else if (systemKey === "Dead") {
        systemDead = getDeadKeyMark(system, systemChar!);
        deadKeyPending = true;
        continue;
      } else if (system.language === "ko" && isHangul(systemKey)) {
        newValue = composeHangul(value, systemKey); // The Korean IME assembles syllables
      } else if (systemValue !== null) {
        newValue = systemValue;
      } else {
        return `key ${stroke.targetKeyId} types nothing on ${system.id}`;
      }
      emulatedDead = null;
      systemDead = null;
    }
    deadKeyPending = false;

    const scored = scoreInput(text, input, newValue, true);
    if (scored.wrong > 0) {
      return `mistake after "${text.slice(Math.max(0, input.length - 6), input.length)}": expected "${text[input.length]}", typed "${newValue.slice(input.length)}" (key ${stroke.targetKeyId}${stroke.shiftTarget ? "+Shift" : ""}${stroke.altGr ? "+AltGr" : ""})`;
    }
    input = scored.input;
    pending = scored.pending;
  }
  return null;
}

test.describe("Keyboard x language x system layout", () => {
  // Pure simulation: run once, not per browser
  test.skip(({ browserName }) => browserName !== "chromium");

  for (const language of VALID_LEARNING_LANGUAGES) {
    test(`follow the highlighted keys: ${language}`, async () => {
      const content = await loadContent(language);
      const text = sampleText(content);
      const chars = getPracticeChars(content);
      const problems: string[] = [];
      for (const { id } of getAllLayouts()) {
        const shown = getLayout(id);
        const practice = getPracticeLayout(shown, language, chars);
        // System layout: the shown keyboard's, or the practice language's installed
        const systems = new Set([shown.id, practice.id, ...getLayoutIdsForLanguage(language)]);
        for (const systemId of systems) {
          const problem = simulate(text, shown, practice, language, getLayout(systemId));
          if (problem) problems.push(`shown ${id}, system ${systemId}: ${problem}`);
        }
      }
      expect(problems).toEqual([]);
    });
  }
});
