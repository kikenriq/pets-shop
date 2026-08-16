import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  /** null marks the current page — rendered as text, not a link. */
  href: string | null;
}

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-muted">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-1">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="hover:text-brand-600">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-ink">
                  {crumb.label}
                </span>
              )}
              {!last && (
                <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
