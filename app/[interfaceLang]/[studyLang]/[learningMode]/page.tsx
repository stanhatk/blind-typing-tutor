import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppContent } from "./AppContent";
import { SEOContent } from "./SEOContent";
import type { ContentType } from "@/utils/url";
import {
  BASE_URL,
  INTERFACE_LANGUAGE_OPTIONS,
  LEARNING_LANGUAGE_OPTIONS,
} from "@/config/constants";
import { generatePageMetadata } from "@/utils/metadata";
import { translations, type InterfaceLanguage } from "@/translations";

const CONTENT_TYPES: ContentType[] = ["words", "phrases", "custom"];

interface PageProps {
  params: Promise<{
    interfaceLang: string;
    studyLang: string;
    learningMode: string;
  }>;
}

function isValidRoute(
  interfaceLang: string,
  studyLang: string,
  learningMode: string
): boolean {
  return (
    INTERFACE_LANGUAGE_OPTIONS.some((opt) => opt.code === interfaceLang) &&
    LEARNING_LANGUAGE_OPTIONS.some((opt) => opt.code === studyLang) &&
    CONTENT_TYPES.includes(learningMode as ContentType)
  );
}

// Generate static params for all route combinations at build time
export async function generateStaticParams() {
  const params: Array<{
    interfaceLang: string;
    studyLang: string;
    learningMode: string;
  }> = [];

  INTERFACE_LANGUAGE_OPTIONS.forEach((interfaceLang) => {
    LEARNING_LANGUAGE_OPTIONS.forEach((studyLang) => {
      CONTENT_TYPES.forEach((learningMode) => {
        params.push({
          interfaceLang: interfaceLang.code,
          studyLang: studyLang.code,
          learningMode,
        });
      });
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { interfaceLang, studyLang, learningMode } = await params;
  if (!isValidRoute(interfaceLang, studyLang, learningMode)) {
    notFound();
  }
  return generatePageMetadata({
    interfaceLang,
    studyLang,
    learningMode,
  });
}

export default async function LearningModePage({ params }: PageProps) {
  const { interfaceLang, studyLang, learningMode } = await params;

  if (!isValidRoute(interfaceLang, studyLang, learningMode)) {
    notFound();
  }

  const metadata = generatePageMetadata({
    interfaceLang,
    studyLang,
    learningMode,
  });
  const t = translations[interfaceLang as InterfaceLanguage];
  const pageUrl = String(metadata.alternates?.canonical);
  const studyLangName =
    t.languageNames[studyLang as keyof typeof t.languageNames] ?? studyLang;
  const modeName =
    learningMode === "words"
      ? t.words
      : learningMode === "phrases"
        ? t.phrases
        : t.custom;

  // One site-wide entity graph; only the WebPage and breadcrumbs vary per URL
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#org`,
        name: "WordMemo",
        url: "https://www.wordmemo.net/",
        logo: `${BASE_URL}/apple-touch-icon.png`,
        founder: { "@type": "Person", name: "Stanislav Khatko" },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: "Blind Typing Tutor",
        publisher: { "@id": `${BASE_URL}/#org` },
      },
      {
        "@type": "WebApplication",
        "@id": `${BASE_URL}/#app`,
        name: "Blind Typing Tutor",
        url: `${BASE_URL}/`,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${BASE_URL}/#org` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: metadata.title,
        description: metadata.description,
        inLanguage: interfaceLang,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        mainEntity: { "@id": `${BASE_URL}/#app` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t.title,
            item: `${BASE_URL}/${interfaceLang}/${interfaceLang}/words`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: studyLangName,
            item: `${BASE_URL}/${interfaceLang}/${studyLang}/words`,
          },
          { "@type": "ListItem", position: 3, name: modeName },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AppContent
        params={{
          interfaceLang,
          studyLang,
          learningMode: learningMode as ContentType,
        }}
      />
      <SEOContent
        interfaceLang={interfaceLang}
        studyLang={studyLang}
        learningMode={learningMode as ContentType}
      />
      <footer className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {/* Every same-language page, named in its own language */}
        <nav aria-label={t.interfaceLanguage}>
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-4">
            {INTERFACE_LANGUAGE_OPTIONS.map(({ code }) => (
              <li key={code}>
                <a
                  href={`/${code}/${code}/words`}
                  lang={code}
                  className="hover:underline"
                >
                  {translations[code].languageNames[code]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="/privacy" className="hover:underline">
          {t.privacyAndContact}
        </a>
      </footer>
    </>
  );
}
