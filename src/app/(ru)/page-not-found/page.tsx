import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found-page";

export const metadata: Metadata = {
  title: "404 — Stepan Bykov",
  robots: { index: false, follow: true },
  alternates: { canonical: null, languages: {} },
};
export default NotFoundPage;
