import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/lib/content";

export function NotFoundPage() {
  const copy = portfolio.copy.ru;
  return (
    <main className="not-found container">
      <p className="eyebrow">STEPAN BYKOV / 404</p>
      <span className="not-found-number" aria-hidden="true">
        404<span>✳</span>
      </span>
      <h1>{copy.notFoundTitle}</h1>
      <p>{copy.notFoundText}</p>
      <Link className="action-primary" href="/">
        {copy.home}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <Link className="action-text" href="/en/" lang="en">
        English version
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </main>
  );
}
