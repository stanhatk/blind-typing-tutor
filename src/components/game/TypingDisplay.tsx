"use client";

import React, { useRef, useEffect } from "react";
import type { WordHint } from "../../utils/Generator";

interface TypingDisplayProps {
  text: string;
  hints?: WordHint[]; // Native words shown above their romanization (Japanese, Chinese)
  input: string;
  inputValue: string; // Raw input value, including an in-progress dead key/IME composition
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompositionStart: () => void;
  handleCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

/**
 * Render each character, grouping the characters of hinted words in <ruby>
 * so the native word appears above its romanization.
 */
function renderWithHints(
  text: string,
  hints: WordHint[],
  renderChar: (char: string, index: number) => React.ReactNode
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let index = 0;
  for (const hint of hints) {
    for (; index < hint.start; index++) nodes.push(renderChar(text[index], index));
    const chars: React.ReactNode[] = [];
    for (; index < hint.end; index++) chars.push(renderChar(text[index], index));
    nodes.push(
      <ruby key={`hint-${hint.start}`} className="[ruby-align:center] whitespace-nowrap">
        {chars}
        <rt className="font-sans text-base tracking-normal text-gray-500 dark:text-gray-400 select-none">{hint.native}</rt>
      </ruby>
    );
  }
  for (; index < text.length; index++) nodes.push(renderChar(text[index], index));
  return nodes;
}

export const TypingDisplay: React.FC<TypingDisplayProps> = ({
  text,
  hints = [],
  input,
  inputValue,
  handleInput,
  handleCompositionStart,
  handleCompositionEnd,
  inputRef,
}) => {
  const textDisplayRef = useRef<HTMLDivElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);

  // Auto-scroll to current typing position
  useEffect(() => {
    if (currentCharRef.current && textDisplayRef.current) {
      currentCharRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [input.length, text]);

  return (
    <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8 transition-colors">
      <div
        ref={textDisplayRef}
        data-testid="text-display"
        className={`mb-8 text-3xl font-mono text-gray-900 dark:text-white ${hints.length ? "leading-[2.4] max-h-44" : "leading-relaxed max-h-32"} wrap-break-words relative tracking-wide overflow-y-auto`}
      >
        {renderWithHints(text, hints, (char, index) => {
          let color = "text-gray-400 dark:text-gray-500";
          const isCurrentChar = index === input.length;

          if (index < input.length) {
            color =
              input[index] === char
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30";
          } else if (isCurrentChar) {
            color =
              "text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400";
          }
          return (
            <span
              key={index}
              ref={isCurrentChar ? currentCharRef : null}
              className={color}
            >
              {char}
            </span>
          );
        })}
      </div>

      <input
        data-testid="typing-input"
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        // Keep mobile keyboards from changing what was typed
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        // Hidden but not zero-width: Chrome drops text before a dead-key/IME
        // composition when the input has no content width
        className="absolute opacity-0 top-0 left-0 w-full h-px p-0 border-0 text-base pointer-events-none"
        autoFocus
        onBlur={() => inputRef.current?.focus()}
      />
    </div>
  );
};
