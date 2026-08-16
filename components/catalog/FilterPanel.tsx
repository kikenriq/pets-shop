'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import type { Brand, Category } from '@/lib/types';

interface Props {
  categories: (Category & { count: number })[];
  brands: (Brand & { count: number })[];
  bounds: { min: number; max: number };
}

/**
 * Writes every choice into the URL. Nothing about the result set lives in
 * component state, so a filtered view can be shared, bookmarked and restored
 * with the back button — and the server renders it directly.
 */
export default function FilterPanel({ categories, brands, bounds }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const update = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (value === null || value === '') next.delete(key);
      else next.set(key, value);
      // Any filter change invalidates the current page number.
      next.delete('page');
      const qs = next.toString();
      router.push(qs ? `/products?${qs}` : '/products', { scroll: false });
    },
    [params, router]
  );

  const clearAll = () => {
    const sort = params.get('sort');
    router.push(sort ? `/products?sort=${sort}` : '/products', {
      scroll: false,
    });
  };

  const current = (key: string) => params.get(key);
  const isActive = (key: string, value: string) => current(key) === value;

  const activeCount = ['category', 'brand', 'min', 'max', 'stock', 'sale', 'rating']
    .filter((k) => params.get(k))
    .length;

  const body = (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
          Category
        </legend>
        <ul className="flex flex-col gap-1">
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                onClick={() =>
                  update('category', isActive('category', c.slug) ? null : c.slug)
                }
                aria-pressed={isActive('category', c.slug)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  isActive('category', c.slug)
                    ? 'bg-brand-50 font-semibold text-brand-700'
                    : 'text-ink-muted hover:bg-neutral-100'
                }`}
              >
                {c.name}
                <span className="text-xs tabular-nums">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
          Brand
        </legend>
        <ul className="flex flex-col gap-1">
          {brands.map((b) => (
            <li key={b.slug}>
              <button
                type="button"
                onClick={() =>
                  update('brand', isActive('brand', b.slug) ? null : b.slug)
                }
                aria-pressed={isActive('brand', b.slug)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  isActive('brand', b.slug)
                    ? 'bg-brand-50 font-semibold text-brand-700'
                    : 'text-ink-muted hover:bg-neutral-100'
                }`}
              >
                {b.name}
                <span className="text-xs tabular-nums">{b.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
          Max price
        </legend>
        <label htmlFor="max-price" className="sr-only">
          Maximum price
        </label>
        <input
          id="max-price"
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={100}
          defaultValue={current('max') ?? bounds.max}
          onChange={(e) => update('max', e.target.value)}
          className="w-full accent-brand-500"
        />
        <p className="mt-2 text-sm text-ink-muted">
          Up to{' '}
          <span className="font-semibold text-ink">
            {formatPrice(Number(current('max') ?? bounds.max))}
          </span>
        </p>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
          Rating
        </legend>
        <ul className="flex flex-wrap gap-2">
          {[4, 3].map((r) => (
            <li key={r}>
              <button
                type="button"
                onClick={() =>
                  update('rating', isActive('rating', String(r)) ? null : String(r))
                }
                aria-pressed={isActive('rating', String(r))}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  isActive('rating', String(r))
                    ? 'border-brand-500 bg-brand-50 font-semibold text-brand-700'
                    : 'border-hairline text-ink-muted hover:border-brand-300'
                }`}
              >
                {r}★ &amp; up
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
          Availability
        </legend>
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={current('stock') === '1'}
              onChange={(e) => update('stock', e.target.checked ? '1' : null)}
              className="size-4 accent-brand-500"
            />
            In stock only
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={current('sale') === '1'}
              onChange={(e) => update('sale', e.target.checked ? '1' : null)}
              className="size-4 accent-brand-500"
            />
            On sale
          </label>
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="rounded-full border border-hairline px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-500 hover:text-brand-600"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm font-semibold lg:hidden"
      >
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Filters
        {activeCount > 0 && (
          <span className="rounded-full bg-brand-500 px-2 text-xs text-white">
            {activeCount}
          </span>
        )}
      </button>

      <aside className="hidden lg:block" aria-label="Product filters">
        {body}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="absolute inset-0 size-full bg-black/50"
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[88%] overflow-y-auto bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="flex size-9 items-center justify-center rounded-full hover:bg-neutral-100"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            {body}
          </div>
        </div>
      )}
    </>
  );
}
