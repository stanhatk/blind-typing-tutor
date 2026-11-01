import { RootDocument, rootMetadata } from "@/components/layout/RootDocument";
import "../globals.css";

export const metadata = rootMetadata;

// Root layout for English-only pages outside /[interfaceLang] (privacy)
export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument interfaceLang="en">{children}</RootDocument>;
}
