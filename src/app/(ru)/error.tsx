"use client";

import { ErrorPage } from "@/components/error-page";

export default function ErrorBoundary({ retry }: { retry: () => void }) {
  return <ErrorPage status={500} retry={retry} />;
}
