import type {
  BrandSlug,
  CategorySlug,
  Product,
  ProductFilters,
  SortValue,
} from './types';
import { SORT_OPTIONS } from './types';

export const PAGE_SIZE = 12;

export type RawSearchParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

const toInt = (v: string | undefined): number | undefined => {
  if (v === undefined) return undefined;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
};

const isSort = (v: string | undefined): v is SortValue =>
  SORT_OPTIONS.some((o) => o.value === v);

/**
 * Filters live in the URL rather than in component state: the result is
 * shareable, survives the back button and can be rendered on the server.
 * Anything unparseable falls back to a sane default instead of throwing.
 */
export function parseFilters(params: RawSearchParams): ProductFilters {
  const sort = first(params.sort);
  const page = toInt(first(params.page)) ?? 1;

  return {
    category: first(params.category) as CategorySlug | undefined,
    brand: first(params.brand) as BrandSlug | undefined,
    minPrice: toInt(first(params.min)),
    maxPrice: toInt(first(params.max)),
    inStock: first(params.stock) === '1',
    onSale: first(params.sale) === '1',
    minRating: toInt(first(params.rating)),
    sort: isSort(sort) ? sort : 'featured',
    page: page > 0 ? page : 1,
  };
}

/** Turns filters back into a query string, dropping defaults for clean URLs. */
export function buildQuery(
  filters: Partial<ProductFilters>,
  overrides: Partial<ProductFilters> = {}
): string {
  const merged = { ...filters, ...overrides };
  const q = new URLSearchParams();

  if (merged.category) q.set('category', merged.category);
  if (merged.brand) q.set('brand', merged.brand);
  if (merged.minPrice !== undefined) q.set('min', String(merged.minPrice));
  if (merged.maxPrice !== undefined) q.set('max', String(merged.maxPrice));
  if (merged.inStock) q.set('stock', '1');
  if (merged.onSale) q.set('sale', '1');
  if (merged.minRating) q.set('rating', String(merged.minRating));
  if (merged.sort && merged.sort !== 'featured') q.set('sort', merged.sort);
  if (merged.page && merged.page > 1) q.set('page', String(merged.page));

  const s = q.toString();
  return s ? `?${s}` : '';
}

function compare(a: Product, b: Product, sort: SortValue): number {
  switch (sort) {
    case 'price-asc':
      return a.priceCents - b.priceCents;
    case 'price-desc':
      return b.priceCents - a.priceCents;
    case 'rating':
      return b.rating - a.rating || b.reviewCount - a.reviewCount;
    case 'newest':
      return b.addedAt - a.addedAt;
    case 'featured':
    default:
      // Featured first, then better rated — a stable, meaningful default.
      return Number(b.featured) - Number(a.featured) || b.rating - a.rating;
  }
}

/** Pure: same inputs, same output. Easy to unit test in Phase 3. */
export function applyFilters(
  all: Product[],
  filters: ProductFilters
): Product[] {
  const matched = all.filter((p) => {
    if (filters.category && p.categorySlug !== filters.category) return false;
    if (filters.brand && p.brandSlug !== filters.brand) return false;
    if (filters.minPrice !== undefined && p.priceCents < filters.minPrice)
      return false;
    if (filters.maxPrice !== undefined && p.priceCents > filters.maxPrice)
      return false;
    if (filters.inStock && p.stock === 0) return false;
    if (filters.onSale && !p.compareAtCents) return false;
    if (filters.minRating && p.rating < filters.minRating) return false;
    return true;
  });

  return matched.sort((a, b) => compare(a, b, filters.sort));
}

export function paginate<T>(items: T[], page: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;

  return {
    items: items.slice(start, start + PAGE_SIZE),
    page: safePage,
    totalPages,
    total: items.length,
  };
}

/** True when anything other than sorting/pagination is applied. */
export function hasActiveFilters(f: ProductFilters): boolean {
  return Boolean(
    f.category ||
      f.brand ||
      f.minPrice !== undefined ||
      f.maxPrice !== undefined ||
      f.inStock ||
      f.onSale ||
      f.minRating
  );
}
