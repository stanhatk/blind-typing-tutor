import { notFound, permanentRedirect } from "next/navigation";
import { INTERFACE_LANGUAGE_OPTIONS } from "@/config/constants";

interface PageProps {
  params: Promise<{
    interfaceLang: string;
  }>;
}

/**
 * Language homepages are aliases of the words practice page.
 * A permanent redirect keeps /en from being indexed with the same title
 * as /en/en/words, /en/en/phrases, and /en/en/custom.
 */
export async function generateStaticParams() {
  return INTERFACE_LANGUAGE_OPTIONS.map((lang) => ({
    interfaceLang: lang.code,
  }));
}

export default async function InterfaceLangPage({ params }: PageProps) {
  const { interfaceLang } = await params;
  const validLang = INTERFACE_LANGUAGE_OPTIONS.find(
    (opt) => opt.code === interfaceLang
  );

  if (!validLang) {
    notFound();
  }

  permanentRedirect(`/${interfaceLang}/${interfaceLang}/words`);
}
