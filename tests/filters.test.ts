import { describe, expect, it } from 'vitest';
import {
  PAGE_SIZE,
  applyFilters,
  buildQuery,
  hasActiveFilters,
  paginate,
  parseFilters,
} from '@/lib/filters';
import type { Product } from '@/lib/types';

function product(overrides: Partial<Product> = {}): Product {
  return {
    id: 'p-1',
    slug: 'p-1',
    name: 'Product',
    family: 'Family',
    variant: 'Default',
    description: '',
    priceCents: 1000,
    currency: 'USD',
    images: [],
    categorySlug: 'dog-food',
    brandSlug: 'dogcat',
    stock: 5,
    rating: 4,
    reviewCount: 1,
    tags: [],
    featured: false,
    specs: [],
    addedAt: 0,
    ...overrides,
  };
}

describe('parseFilters', () => {
  it('falls back to sensible defaults for an empty query', () => {
    expect(parseFilters({})).toMatchObject({ sort: 'featured', page: 1 });
  });

  it('reads every supported parameter', () => {
    const f = parseFilters({
      category: 'cat-food',
      brand: 'catis',
      min: '1000',
      max: '5000',
      stock: '1',
      sale: '1',
      rating: '4',
      sort: 'price-asc',
      page: '3',
    });
    expect(f).toMatchObject({
      category: 'cat-food',
      brand: 'catis',
      minPrice: 1000,
      maxPrice: 5000,
      inStock: true,
      onSale: true,
      minRating: 4,
      sort: 'price-asc',
      page: 3,
    });
  });

  it('ignores an unknown sort rather than trusting the URL', () => {
    expect(parseFilters({ sort: 'drop-tables' }).sort).toBe('featured');
  });

  it('recovers from a non-numeric or negative page', () => {
    expect(parseFilters({ page: 'abc' }).page).toBe(1);
    expect(parseFilters({ page: '-2' }).page).toBe(1);
  });

  it('takes the first value when a parameter is repeated', () => {
    expect(parseFilters({ category: ['cat-food', 'dog-food'] }).category).toBe(
      'cat-food'
    );
  });
});

describe('buildQuery', () => {
  it('omits defaults so clean URLs stay clean', () => {
    expect(buildQuery({ sort: 'featured', page: 1 })).toBe('');
  });

  it('serialises only what differs from the default', () => {
    expect(buildQuery({ category: 'cat-food', sort: 'featured', page: 2 })).toBe(
      '?category=cat-food&page=2'
    );
  });

  it('applies overrides on top of the current filters', () => {
    expect(buildQuery({ category: 'cat-food', sort: 'rating', page: 1 }, { page: 4 }))
      .toBe('?category=cat-food&sort=rating&page=4');
  });

  it('round-trips through parseFilters', () => {
    const original = parseFilters({ brand: 'husky', max: '3000', sort: 'newest' });
    const reparsed = parseFilters(
      Object.fromEntries(new URLSearchParams(buildQuery(original).slice(1)))
    );
    expect(reparsed).toEqual(original);
  });
});

describe('applyFilters', () => {
  const catalogue = [
    product({ id: 'a', priceCents: 1000, rating: 4.5, categorySlug: 'dog-food', stock: 3, featured: true, addedAt: 300 }),
    product({ id: 'b', priceCents: 5000, rating: 3.2, categorySlug: 'cat-food', stock: 0, addedAt: 200 }),
    product({ id: 'c', priceCents: 2500, rating: 4.9, categorySlug: 'cat-food', stock: 7, compareAtCents: 3000, addedAt: 500 }),
  ];
  const base = { sort: 'featured' as const, page: 1 };

  it('returns everything when nothing is filtered', () => {
    expect(applyFilters(catalogue, base)).toHaveLength(3);
  });

  it('filters by category', () => {
    const r = applyFilters(catalogue, { ...base, category: 'cat-food' });
    expect(r.map((p) => p.id).sort()).toEqual(['b', 'c']);
  });

  it('treats the price range as inclusive at both ends', () => {
    const r = applyFilters(catalogue, { ...base, minPrice: 1000, maxPrice: 2500 });
    expect(r.map((p) => p.id).sort()).toEqual(['a', 'c']);
  });

  it('excludes sold-out products when asked', () => {
    const r = applyFilters(catalogue, { ...base, inStock: true });
    expect(r.map((p) => p.id)).not.toContain('b');
  });

  it('keeps only discounted products when asked', () => {
    expect(applyFilters(catalogue, { ...base, onSale: true }).map((p) => p.id)).toEqual(['c']);
  });

  it('applies rating as a minimum, not an exact match', () => {
    const r = applyFilters(catalogue, { ...base, minRating: 4 });
    expect(r.map((p) => p.id).sort()).toEqual(['a', 'c']);
  });

  it('combines filters as AND', () => {
    const r = applyFilters(catalogue, { ...base, category: 'cat-food', inStock: true });
    expect(r.map((p) => p.id)).toEqual(['c']);
  });

  it('sorts by price in both directions', () => {
    expect(applyFilters(catalogue, { ...base, sort: 'price-asc' }).map((p) => p.priceCents))
      .toEqual([1000, 2500, 5000]);
    expect(applyFilters(catalogue, { ...base, sort: 'price-desc' }).map((p) => p.priceCents))
      .toEqual([5000, 2500, 1000]);
  });

  it('sorts by rating and by recency', () => {
    expect(applyFilters(catalogue, { ...base, sort: 'rating' })[0].id).toBe('c');
    expect(applyFilters(catalogue, { ...base, sort: 'newest' })[0].id).toBe('c');
  });

  it('puts featured products first by default', () => {
    expect(applyFilters(catalogue, base)[0].id).toBe('a');
  });

  it('returns an empty list rather than throwing on an impossible combination', () => {
    expect(applyFilters(catalogue, { ...base, category: 'cat-food', brand: 'husky' })).toEqual([]);
  });
});

describe('paginate', () => {
  const many = Array.from({ length: PAGE_SIZE * 2 + 3 }, (_, i) =>
    product({ id: `p${i}` })
  );

  it('slices a full page', () => {
    const r = paginate(many, 1);
    expect(r.items).toHaveLength(PAGE_SIZE);
    expect(r.totalPages).toBe(3);
    expect(r.total).toBe(many.length);
  });

  it('returns the remainder on the last page', () => {
    expect(paginate(many, 3).items).toHaveLength(3);
  });

  it('clamps a page number past the end back into range', () => {
    // Otherwise a stale ?page=99 link renders an empty grid.
    expect(paginate(many, 99).page).toBe(3);
    expect(paginate(many, 99).items).toHaveLength(3);
  });

  it('clamps a page below one', () => {
    expect(paginate(many, 0).page).toBe(1);
  });

  it('reports one page for an empty result set', () => {
    expect(paginate([], 1)).toMatchObject({ items: [], page: 1, totalPages: 1, total: 0 });
  });
});

describe('hasActiveFilters', () => {
  it('ignores sorting and pagination', () => {
    expect(hasActiveFilters({ sort: 'price-asc', page: 3 })).toBe(false);
  });

  it('detects a real filter', () => {
    expect(hasActiveFilters({ sort: 'featured', page: 1, category: 'cat-food' })).toBe(true);
    expect(hasActiveFilters({ sort: 'featured', page: 1, inStock: true })).toBe(true);
  });
});
