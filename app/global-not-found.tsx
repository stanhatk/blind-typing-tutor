import type { Metadata } from "next";
import { RootDocument } from "@/components/layout/RootDocument";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page Not Found | Blind Typing Tutor",
  robots: { index: false, follow: true },
};

// URLs that match no route (with several root layouts there is no app/not-found)
export default function GlobalNotFound() {
  return (
    <RootDocument interfaceLang="en">
      <NotFoundContent />
    </RootDocument>
  );
}
