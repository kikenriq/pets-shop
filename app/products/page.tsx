import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import FilterPanel from '@/components/catalog/FilterPanel';
import SortSelect from '@/components/catalog/SortSelect';
import Pagination from '@/components/catalog/Pagination';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import {
  applyFilters,
  hasActiveFilters,
  paginate,
  parseFilters,
  type RawSearchParams,
} from '@/lib/filters';
import {
  brands,
  categories,
  countByBrand,
  countByCategory,
  getBrandBySlug,
  getCategoryBySlug,
  priceBounds,
  products,
} from '@/data/catalog';

export const metadata: Metadata = {
  title: 'All products',
  description:
    'Browse food, toys and care products for dogs, cats, birds and fish.',
};

export default async function ProductsPage({
  searchParams,
}: {
  // In Next 16 searchParams is a Promise and must be awaited.
  searchParams: Promise<RawSearchParams>;
}) {
  const filters = parseFilters(await searchParams);
  const matched = applyFilters(products, filters);
  const { items, page, totalPages, total } = paginate(matched, filters.page);

  const activeCategory = filters.category
    ? getCategoryBySlug(filters.category)
    : undefined;
  const activeBrand = filters.brand ? getBrandBySlug(filters.brand) : undefined;

  const heading = activeCategory?.name ?? activeBrand?.name ?? 'All products';
  const blurb =
    activeCategory?.description ??
    (activeBrand ? `Everything we stock from ${activeBrand.name}.` : null);

  const categoriesWithCounts = categories.map((c) => ({
    ...c,
    count: countByCategory(c.slug),
  }));
  const brandsWithCounts = brands.map((b) => ({
    ...b,
    count: countByBrand(b.slug),
  }));

  return (
    <div className="mx-auto w-[92%] max-w-7xl pb-20 pt-28">
      <Breadcrumbs
        trail={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          ...(activeCategory
            ? [{ label: activeCategory.name, href: null }]
            : []),
        ]}
      />

      <header className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {heading}
        </h1>
        {blurb && <p className="mt-2 max-w-2xl text-ink-muted">{blurb}</p>}
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
        {/* useSearchParams needs a Suspense boundary during prerender. */}
        <Suspense fallback={<div className="h-10" />}>
          <FilterPanel
            categories={categoriesWithCounts}
            brands={brandsWithCounts}
            bounds={priceBounds()}
          />
        </Suspense>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
            <p className="text-sm text-ink-muted" aria-live="polite">
              {total} {total === 1 ? 'product' : 'products'}
              {totalPages > 1 && (
                <span className="text-ink-muted">
                  {' '}
                  · page {page} of {totalPages}
                </span>
              )}
            </p>
            <Suspense fallback={null}>
              <SortSelect />
            </Suspense>
          </div>

          {items.length === 0 ? (
            <div className="rounded-card border border-dashed border-hairline p-16 text-center">
              <p className="text-lg font-semibold text-ink">
                No products matched those filters
              </p>
              <p className="mt-2 text-ink-muted">
                Try widening the price range or clearing a filter.
              </p>
              {hasActiveFilters(filters) && (
                <Link
                  href="/products"
                  className="mt-6 inline-flex rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
                >
                  Clear all filters
                </Link>
              )}
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((product, i) => (
                <li key={product.id}>
                  <ProductCard product={product} priority={i < 3} />
                </li>
              ))}
            </ul>
          )}

          <Pagination filters={{ ...filters, page }} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
