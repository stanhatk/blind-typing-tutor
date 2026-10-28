import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppContent } from "./AppContent";
import { SEOContent } from "./SEOContent";
import type { ContentType } from "@/utils/url";
import {
  INTERFACE_LANGUAGE_OPTIONS,
  LEARNING_LANGUAGE_OPTIONS,
} from "@/config/constants";
import { generatePageMetadata } from "@/utils/metadata";

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: metadata.title,
    description: metadata.description,
    url: metadata.alternates?.canonical,
    inLanguage: interfaceLang,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
    </>
  );
}
