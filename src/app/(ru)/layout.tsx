import type { ReactNode } from "react";
import { LocaleBoundary } from "@/components/locale-boundary";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("ru");
export default function RussianLayout({ children }: { children: ReactNode }) {
  return <LocaleBoundary locale="ru">{children}</LocaleBoundary>;
}
