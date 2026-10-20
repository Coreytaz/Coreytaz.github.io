import type { ReactNode } from "react";
import { RootDocument } from "@/components/root-document";

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument locale="ru">{children}</RootDocument>;
}
