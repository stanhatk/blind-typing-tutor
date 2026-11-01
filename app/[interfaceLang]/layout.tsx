import { RootDocument, rootMetadata } from "@/components/layout/RootDocument";
import "../globals.css";

export const metadata = rootMetadata;

export default async function InterfaceLangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ interfaceLang: string }>;
}>) {
  const { interfaceLang } = await params;
  return <RootDocument interfaceLang={interfaceLang}>{children}</RootDocument>;
}
