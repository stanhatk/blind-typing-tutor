import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Generator, type Language } from "../utils/Generator";
import { soundManager } from "../utils/SoundManager";
import { getStorageItem, setStorageItem } from "../utils/storage";

// Typographic and typewriter apostrophes are typed with the same key
const APOSTROPHES = "'\u2019\u2018\u02BC";

function charsMatch(typed: string, expected: string): boolean {
  return typed === expected || (APOSTROPHES.includes(typed) && APOSTROPHES.includes(expected));
}

interface TypingEngineProps {
  mode: "practice" | "beginner" | "custom";
  language: Language;
  correctionMode: boolean;
}

export function useTypingEngine({ mode, language, correctionMode }: TypingEngineProps) {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dead keys and IMEs compose characters: macOS shows a temporary '´' until
  // the base letter is typed. While composing, the input shows the raw value
  // and nothing is scored; the committed character is scored on compositionend.
  const isComposingRef = useRef(false);
  const [composingValue, setComposingValue] = useState<string | null>(null);
  const [deadKeyPending, setDeadKeyPending] = useState(false);

  // Stats State
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);

  // Generator
  const generator = useMemo(() => new Generator(language), [language]);

  // Custom Mode State
  const [customText, setCustomText] = useState(() => getStorageItem("customText") || "");
  const [isCustomSetup, setIsCustomSetup] = useState(false);

  // Track previous mode to detect mode switches
  const prevModeRef = useRef<"practice" | "beginner" | "custom">(mode);
  // Track if this is the initial mount
  const isInitialMountRef = useRef(true);

  const generateText = useCallback(() => {
    if (mode === "custom") {
      setInput("");
    } else if (mode === "beginner") {
      setText(generator.getOne());
      setInput("");
    } else {
      generator.update();
      setText(generator.getWords());
      setInput("");
    }

    setStartTime(null);
    setErrors(0);
    setTotalTyped(0);
    setWpm(0);
    setAccuracy(100);
    // Defer focus to ensure DOM is ready
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [mode, generator]);

  // Initialize text when mode or language changes
  /* eslint-disable react-hooks/set-state-in-effect -- intentional mode/language initialization */
  useEffect(() => {
    if (mode === "custom") {
      const saved = getStorageItem("customText");
      const isSwitchingToCustom = !isInitialMountRef.current && prevModeRef.current !== "custom";

      if (isSwitchingToCustom) {
        setIsCustomSetup(true);
        setText("");
        setCustomText(saved || "");
      } else if (isInitialMountRef.current && saved && saved.trim()) {
        setText(saved.trim().normalize("NFC"));
        setIsCustomSetup(false);
      } else if (saved && saved.trim()) {
        setText(saved.trim().normalize("NFC"));
        setIsCustomSetup(false);
      } else {
        setIsCustomSetup(true);
        setText("");
      }
    } else {
      setIsCustomSetup(false);
      generateText();
    }

    // Update previous mode and mark initial mount as complete
    prevModeRef.current = mode;
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
    }
  }, [mode, language, generateText]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Timer for WPM updates
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (startTime) {
      interval = setInterval(() => {
        const timeInMinutes = (Date.now() - startTime) / 60000;
        const currentWpm = totalTyped / 5 / timeInMinutes;
        setWpm(Math.max(0, currentWpm));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, totalTyped]);

  const processValue = (rawValue: string) => {
    // Compare in NFC so 'é' typed as 'e' + combining accent matches 'é'
    const val = rawValue.normalize("NFC");
    setDeadKeyPending(false);

    if (val.length > input.length) {
      if (!startTime) {
        setStartTime(Date.now());
      }

      // Check every inserted character (paste, autocomplete and IMEs can insert several)
      let accepted = input;
      let typed = 0;
      let wrong = 0;
      for (let i = input.length; i < val.length && accepted.length < text.length; i++) {
        const expectedChar = text[accepted.length];
        typed++;
        if (charsMatch(val[i], expectedChar)) {
          accepted += expectedChar;
        } else {
          wrong++;
          if (correctionMode) break;
          accepted += val[i];
        }
      }
      if (typed === 0) return;

      const newTotal = totalTyped + typed;
      const newErrors = errors + wrong;
      setTotalTyped(newTotal);
      setErrors(newErrors);
      setAccuracy(Math.max(0, ((newTotal - newErrors) / newTotal) * 100));
      if (wrong > 0) {
        soundManager.playError();
      } else {
        soundManager.playClick();
      }

      setInput(accepted);
      if (accepted.length === text.length) {
        if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
        completionTimeoutRef.current = setTimeout(() => {
          generateText();
          completionTimeoutRef.current = null;
        }, 300);
      }
    } else if (val.length < input.length) {
      // Backspace
      let currentErrors = 0;
      for (let i = 0; i < val.length; i++) {
        if (!charsMatch(val[i], text[i])) currentErrors++;
      }
      setErrors(currentErrors);
      setAccuracy(val.length > 0 ? Math.max(0, ((val.length - currentErrors) / val.length) * 100) : 100);
      setTotalTyped(val.length);
      setInput(val);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isComposingRef.current || (e.nativeEvent as InputEvent).isComposing) {
      setComposingValue(e.target.value);
      return;
    }
    processValue(e.target.value);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
    setDeadKeyPending(true);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setComposingValue(null);
    processValue(e.currentTarget.value);
  };

  const handleCustomSubmit = () => {
    if (customText.trim()) {
      const trimmedText = customText.trim().normalize("NFC");
      setText(trimmedText);
      setStorageItem("customText", trimmedText);
      setIsCustomSetup(false);
      setStartTime(null);
      setErrors(0);
      setTotalTyped(0);
      setWpm(0);
      setAccuracy(100);
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const activeKey = useMemo(() => {
    if (input.length >= text.length) return null;
    return text[input.length];
  }, [input.length, text]);

  // Keyboard highlighting listener
  useEffect(() => {
    const timeoutRefs: ReturnType<typeof setTimeout>[] = [];
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCustomSetup) return;
      timeoutRefs.forEach(clearTimeout);
      timeoutRefs.length = 0;

      if (e.key === "Dead") setDeadKeyPending(true);

      let keyLabel: string | null = null;
      if (e.key.length === 1) keyLabel = e.key;
      else if (["Backspace", "Enter", "Tab", " "].includes(e.key)) {
        keyLabel = e.key.toLowerCase() === " " ? " " : e.key.toLowerCase();
      }

      if (keyLabel) {
        setLastPressedKey(keyLabel);
        const timeout = setTimeout(() => setLastPressedKey(null), 200);
        timeoutRefs.push(timeout);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      timeoutRefs.forEach(clearTimeout);
    };
  }, [isCustomSetup]);

  return {
    text, input, setInput, inputRef,
    startTime, errors, totalTyped, wpm, accuracy,
    lastPressedKey, activeKey, deadKeyPending,
    inputValue: composingValue ?? input,
    customText, setCustomText, isCustomSetup, setIsCustomSetup,
    handleInput, handleCompositionStart, handleCompositionEnd, handleCustomSubmit, generateText
  };
}
