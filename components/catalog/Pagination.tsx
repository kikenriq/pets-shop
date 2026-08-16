import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buildQuery } from '@/lib/filters';
import type { ProductFilters } from '@/lib/types';

export default function Pagination({
  filters,
  totalPages,
}: {
  filters: ProductFilters;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const current = filters.page;

  const linkClass = (active: boolean) =>
    `flex size-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
      active
        ? 'border-brand-500 bg-brand-500 text-white'
        : 'border-hairline text-ink hover:border-brand-300'
    }`;

  return (
    <nav aria-label="Pagination" className="mt-12 flex justify-center gap-2">
      {current > 1 && (
        <Link
          href={`/products${buildQuery(filters, { page: current - 1 })}`}
          aria-label="Previous page"
          className={linkClass(false)}
          scroll={false}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={`/products${buildQuery(filters, { page: p })}`}
          aria-label={`Page ${p}`}
          aria-current={p === current ? 'page' : undefined}
          className={linkClass(p === current)}
          scroll={false}
        >
          {p}
        </Link>
      ))}

      {current < totalPages && (
        <Link
          href={`/products${buildQuery(filters, { page: current + 1 })}`}
          aria-label="Next page"
          className={linkClass(false)}
          scroll={false}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
