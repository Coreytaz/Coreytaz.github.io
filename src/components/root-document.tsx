import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import type { Locale } from "@/lib/content-schema";
import "@/app/globals.css";

export function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
