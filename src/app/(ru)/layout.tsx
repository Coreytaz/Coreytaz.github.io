import type { ReactNode } from "react";
import { RootDocument } from "@/components/root-document";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("ru");
export default function RussianLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="ru">{children}</RootDocument>;
}
