import { useState, useEffect, useRef, useCallback } from "react";
import { Generator, type Language, type GeneratedText, type WordHint } from "../utils/Generator";
import { loadContent } from "../words";
import { soundManager } from "../utils/SoundManager";
import { getStorageItem, setStorageItem } from "../utils/storage";
import { charsMatch, isPartialChar } from "../utils/typedText";

interface TypingEngineProps {
  mode: "practice" | "beginner" | "custom";
  language: Language;
  correctionMode: boolean;
}

export function useTypingEngine({ mode, language, correctionMode }: TypingEngineProps) {
  const [text, setText] = useState("");
  // Native words shown above their romanization (Japanese, Chinese)
  const [hints, setHints] = useState<WordHint[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Characters typed in several steps are not scored until finished:
  // - dead keys and IMEs compose characters (macOS shows a temporary '´', a
  //   Korean IME builds a syllable); scored on compositionend
  // - letters waiting for an accent key ('ê' before the acute of 'ế')
  // Meanwhile the input shows this raw value.
  const isComposingRef = useRef(false);
  const [pendingValue, setPendingValue] = useState<string | null>(null);
  const [deadKeyPending, setDeadKeyPending] = useState(false);

  // Stats State
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);

  // Generator, created once the language's content has loaded. A generator
  // for a previous language is ignored while the next one loads.
  const [loaded, setLoaded] = useState<{ language: Language; generator: Generator } | null>(null);
  const generator = loaded?.language === language ? loaded.generator : null;

  useEffect(() => {
    let cancelled = false;
    loadContent(language)
      .then((content) => {
        if (!cancelled) setLoaded({ language, generator: new Generator(language, content) });
      })
      .catch((error) => console.error(`Failed to load practice content for ${language}:`, error));
    return () => {
      cancelled = true;
    };
  }, [language]);

  // Custom Mode State
  const [customText, setCustomText] = useState(() => getStorageItem("customText") || "");
  const [isCustomSetup, setIsCustomSetup] = useState(false);

  // Track previous mode to detect mode switches
  const prevModeRef = useRef<"practice" | "beginner" | "custom">(mode);
  // Track if this is the initial mount
  const isInitialMountRef = useRef(true);

  const showGenerated = ({ text: generated, hints: generatedHints }: GeneratedText) => {
    setText(generated);
    setHints(generatedHints);
  };

  const generateText = useCallback(() => {
    if (mode === "custom") {
      setInput("");
    } else if (!generator) {
      return; // Content still loading
    } else if (mode === "beginner") {
      showGenerated(generator.getOne());
      setInput("");
    } else {
      generator.update();
      showGenerated(generator.getWords());
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
      // Custom text is typed as entered, without romanization hints
      setHints([]);
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
    setPendingValue(null);

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
        // The rest is an unfinished form of the next character: wait for more keys
        if (isPartialChar(val.slice(i), expectedChar)) {
          setPendingValue(accepted + val.slice(i));
          break;
        }
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
      setPendingValue(e.target.value);
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
    processValue(e.currentTarget.value);
  };

  const handleCustomSubmit = () => {
    if (customText.trim()) {
      const trimmedText = customText.trim().normalize("NFC");
      setText(trimmedText);
      setHints([]);
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
    text, hints, input, setInput, inputRef,
    startTime, errors, totalTyped, wpm, accuracy,
    lastPressedKey, deadKeyPending,
    inputValue: pendingValue ?? input,
    pendingText: pendingValue?.startsWith(input) ? pendingValue.slice(input.length) : "",
    upcomingText: text.slice(input.length),
    customText, setCustomText, isCustomSetup, setIsCustomSetup,
    handleInput, handleCompositionStart, handleCompositionEnd, handleCustomSubmit, generateText
  };
}
