import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { INTERFACE_LANGUAGE_OPTIONS } from "@/config/constants";
import { getTextDirection, getLanguageTag } from "@/utils/textDirection";
import type { InterfaceLanguage } from "@/translations";

// Self-hosted by next/font: no render-blocking request to Google Fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

// Ads only on the production deployment, not on previews or localhost.
// Read at build time, so pages stay static.
const showAdsense = process.env.VERCEL_ENV === "production";

/** Metadata shared by every root layout; pages override title and description */
export const rootMetadata: Metadata = {
  metadataBase: new URL("https://blind-typing-tutor.wordmemo.net"),
  title: "Touch Typing Trainer | Blind Typing Practice Online",
  description:
    "Master touch typing with our free online blind typing tutor. Practice on 40+ keyboard layouts with real-time WPM tracking, accuracy stats, and visual keyboard. Learn typing without looking at the keyboard.",
  keywords:
    "touch typing, blind typing, typing tutor, keyboard trainer, typing practice, typing speed, WPM, typing accuracy, typing trainer, online typing practice",
  authors: [{ name: "Stanislav Khatko" }],
  openGraph: {
    type: "website",
    url: "https://blind-typing-tutor.wordmemo.net",
    title: "Touch Typing Trainer | Blind Typing Practice Online",
    description:
      "Master touch typing with our free online blind typing tutor. Practice on 40+ keyboard layouts with real-time WPM tracking, accuracy stats, and visual keyboard. Learn typing without looking at the keyboard.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Touch Typing Trainer | Blind Typing Practice Online",
    description:
      "Master touch typing with our free online blind typing tutor. Practice on 40+ keyboard layouts with real-time WPM tracking, accuracy stats, and visual keyboard. Learn typing without looking at the keyboard.",
    images: ["/og-image.png"],
  },
};

interface RootDocumentProps {
  interfaceLang: string;
  children: React.ReactNode;
}

/**
 * The <html> document for every root layout. The interface language comes
 * from the route, not from request headers, so pages can be prerendered.
 */
export function RootDocument({ interfaceLang, children }: RootDocumentProps) {
  // Validate interface language
  const validLang = INTERFACE_LANGUAGE_OPTIONS.find(
    (opt) => opt.code === interfaceLang,
  );
  const validatedLang = (
    validLang ? interfaceLang : "en"
  ) as InterfaceLanguage;

  // Get language attributes
  const lang = getLanguageTag(validatedLang);
  const dir = getTextDirection(validatedLang);

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent dark mode flicker - runs before any content renders */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var darkMode = localStorage.getItem('darkMode');
                  if (darkMode === 'true' || (darkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {showAdsense ? (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2268903952968625"
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
