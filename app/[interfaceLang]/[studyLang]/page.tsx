import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_URL } from "@/config/constants";
import { getLayout } from "@/config/layouts";
import { GUIDES, getGuide } from "@/guides";
import { translations, type InterfaceLanguage } from "@/translations";

// /{interfaceLang}/{slug}: guide pages. Practice pages have a third segment.
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ interfaceLang: string; studyLang: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    interfaceLang: guide.interfaceLang,
    studyLang: guide.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { interfaceLang, studyLang } = await params;
  const guide = getGuide(interfaceLang, studyLang);
  if (!guide) notFound();
  const url = `${BASE_URL}/${guide.interfaceLang}/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: "article",
      locale: guide.interfaceLang,
      images: ["/og-image.png"],
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { interfaceLang, studyLang } = await params;
  const guide = getGuide(interfaceLang, studyLang);
  if (!guide) notFound();

  const t = translations[guide.interfaceLang as InterfaceLanguage];
  const lang = guide.interfaceLang;
  const url = `${BASE_URL}/${lang}/${guide.slug}`;

  // Keys per finger, read from the layout (group 1 = left pinky ... 8 = right pinky)
  const layout = getLayout(guide.layoutId);
  const fingerKeys = guide.fingerTable.fingerNames.map((name, index) => ({
    name,
    keys: layout.keys
      .filter((key) => key.group === index + 1 && [...key.primary].length === 1)
      .map((key) => key.primary.toLocaleUpperCase(lang)),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    inLanguage: lang,
    url,
    mainEntityOfPage: url,
    image: `${BASE_URL}/screenshot-light.png`,
    author: { "@type": "Person", name: "Stanislav Khatko" },
    publisher: { "@id": `${BASE_URL}/#org` },
    isPartOf: { "@id": `${BASE_URL}/#website` },
  };

  const h2 = "text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="max-w-2xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-200 leading-relaxed">
        <p className="mb-6">
          <a
            href={`/${lang}/${lang}/words`}
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← {t.title}
          </a>
        </p>

        <article>
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {guide.h1}
          </h1>
          <p className="mb-4">{guide.intro}</p>

          {guide.sections.map((section, index) => (
            <section key={section.heading}>
              <h2 className={h2}>{section.heading}</h2>
              {section.list && (
                <ul className="list-disc ps-6 mb-4 space-y-1">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mb-4">
                  {paragraph}
                </p>
              ))}
              {index === guide.fingerTable.afterSection && (
                <table className="w-full mb-4 text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-600 text-start">
                      <th className="py-2 pe-4 text-start">{guide.fingerTable.finger}</th>
                      <th className="py-2 text-start">{guide.fingerTable.keys}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fingerKeys.map((row) => (
                      <tr
                        key={row.name}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="py-2 pe-4">{row.name}</td>
                        <td className="py-2 font-mono">{row.keys.join(" ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          ))}

          <h2 className={h2}>{guide.practice.heading}</h2>
          <ul className="list-disc ps-6 mb-4 space-y-1">
            <li>
              <a href={`/${lang}/${lang}/words`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                {guide.practice.words}
              </a>
            </li>
            <li>
              <a href={`/${lang}/${lang}/phrases`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                {guide.practice.phrases}
              </a>
            </li>
            <li>
              <a href={`/${lang}/${lang}/custom`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                {guide.practice.custom}
              </a>
            </li>
          </ul>
        </article>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <a href="/privacy" className="hover:underline">
          {t.privacyAndContact}
        </a>
      </footer>
    </>
  );
}
