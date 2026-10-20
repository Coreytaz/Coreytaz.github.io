import type { ReactNode } from "react";
import { LocaleBoundary } from "@/components/locale-boundary";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en");
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <LocaleBoundary locale="en">{children}</LocaleBoundary>;
}
