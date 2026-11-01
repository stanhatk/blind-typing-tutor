/**
 * Google Analytics 4 (GA4) Integration Utility
 */

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, eventParams?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
    GAManifest?: boolean;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

export const initGA = () => {
  if (typeof window === "undefined" || window.GAManifest) return;

  // Queue events right away; gtag.js reads the queue once it loads
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date() as unknown as string);
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false, // We will handle page views manually
  });

  // Load the library when the browser is idle, after the trainer is usable
  const load = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(load, { timeout: 4000 });
  } else {
    setTimeout(load, 2000);
  }

  window.GAManifest = true;
};

export const trackPageView = (path: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
    });
  }
};

export const trackSettingsChange = (settingName: string, value: string | boolean) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "settings_change", {
      setting_name: settingName,
      setting_value: value,
    });
  }
};

// What is being practiced, sent with practice events (no typed text)
export interface PracticeContext {
  studyLang: string;
  mode: string;
  complexity: string;
  layoutId: string;
  practiceLayoutId: string;
}

const practiceParams = (context: PracticeContext) => ({
  study_lang: context.studyLang,
  mode: context.mode,
  complexity: context.mode === "beginner" ? context.complexity : "none",
  layout_id: context.layoutId,
  // Typed with the practice layout emulated on another keyboard
  emulated: context.practiceLayoutId !== context.layoutId,
});

/**
 * First keystroke of a text
 */
export const trackPracticeStart = (context: PracticeContext) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "practice_start", practiceParams(context));
  }
};

/**
 * A text typed to the end
 */
export const trackTextComplete = (
  context: PracticeContext,
  result: { wpm: number; accuracy: number; chars: number; durationSec: number }
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "text_complete", {
      ...practiceParams(context),
      wpm: Math.round(result.wpm),
      accuracy: Math.round(result.accuracy),
      chars: result.chars,
      duration_sec: Math.round(result.durationSec),
    });
  }
};
