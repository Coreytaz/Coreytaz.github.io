"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ErrorPageSettings } from "@/lib/error-page-settings";

const ErrorPageContext = createContext<ErrorPageSettings | null>(null);

export function ErrorPageProvider({
  value,
  children,
}: {
  value: ErrorPageSettings;
  children: ReactNode;
}) {
  return <ErrorPageContext value={value}>{children}</ErrorPageContext>;
}

export function useErrorPageSettings() {
  const settings = useContext(ErrorPageContext);
  if (!settings) throw new Error("Error pages require ErrorPageProvider");
  return settings;
}
