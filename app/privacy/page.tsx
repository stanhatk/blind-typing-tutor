import type { Metadata } from "next";
import { BASE_URL } from "@/config/constants";

const GITHUB_URL = "https://github.com/stanhatk/blind-typing-tutor";

export const metadata: Metadata = {
  title: "Privacy Policy & Contact | Blind Typing Tutor",
  description:
    "What data Blind Typing Tutor stores, which Google services it uses for analytics and ads, and how to contact the author.",
  alternates: { canonical: `${BASE_URL}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-200 leading-relaxed">
      <p className="mb-6">
        <a href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Blind Typing Tutor
        </a>
      </p>

      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Privacy Policy &amp; Contact
      </h1>
      <p className="mb-4">
        Blind Typing Tutor is a free touch typing trainer made by Stanislav
        Khatko as part of WordMemo. There are no accounts, and nothing you type
        is sent to a server.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white">
        Data stored in your browser
      </h2>
      <p className="mb-4">
        Your settings (interface language, practice language, keyboard layout,
        display options) and any custom text you paste are saved in your
        browser&apos;s local storage so they are there next time. They never
        leave your device. Clearing your browser data removes them.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white">
        Analytics
      </h2>
      <p className="mb-4">
        We use Google Analytics 4 to count visits and see which languages,
        layouts and practice modes are used. It records page views, setting
        changes, and when you start and finish a practice text, never the text
        you type. Google Analytics sets cookies and
        processes your IP address; see{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          how Google uses data from sites that use its services
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white">
        Advertising
      </h2>
      <p className="mb-4">
        The site is funded by Google AdSense. Google and its partners use
        cookies to show ads, which may be personalised based on your visits to
        this and other sites. In the EEA, the UK and Switzerland you are asked
        for consent first, and you can change your choice at any time from the
        privacy settings link that Google&apos;s consent message adds to the
        page. You can also manage personalised ads in{" "}
        <a
          href="https://adssettings.google.com"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Google Ad Settings
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white">
        Hosting and fonts
      </h2>
      <p className="mb-4">
        The site is hosted on Vercel, which keeps standard server logs (such as
        IP address and browser) for security and operation. Fonts are loaded
        from Google Fonts, which receives your IP address when they load.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white">
        Practice content
      </h2>
      <p className="mb-4">
        Word lists are derived from{" "}
        <a
          href="https://github.com/hermitdave/FrequencyWords"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          FrequencyWords
        </a>{" "}
        by Hermit Dave (CC BY-SA 4.0) and the{" "}
        <a
          href="https://wortschatz.uni-leipzig.de/en/download"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Leipzig Corpora Collection
        </a>{" "}
        (CC BY 4.0). Keyboard layouts follow Microsoft&apos;s Windows layout
        definitions.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white">
        Contact
      </h2>
      <p className="mb-4">
        For questions, bug reports or data requests, open an issue on{" "}
        <a
          href={`${GITHUB_URL}/issues`}
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </main>
  );
}
