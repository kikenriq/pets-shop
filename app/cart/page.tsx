import type { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Your cart',
  robots: { index: false, follow: true },
};

/**
 * Empty state only — the cart store, line items and totals land in Phase 3.
 * It exists now because the navbar links here, and Next prefetches that link:
 * without the route the header fired a 404 on every page load.
 */
export default function CartPage() {
  return (
    <div className="mx-auto flex w-[92%] max-w-2xl flex-col items-center gap-6 pb-24 pt-40 text-center">
      <span className="flex size-20 items-center justify-center rounded-full bg-brand-50 text-brand-500">
        <ShoppingBag className="size-9" aria-hidden="true" />
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-ink">
        Your cart is empty
      </h1>
      <p className="text-ink-muted">
        Once you add something, it will show up here with your running total.
      </p>
      <Link
        href="/products"
        className="rounded-full bg-brand-500 px-8 py-3.5 font-bold text-white transition-colors hover:bg-brand-600"
      >
        Browse products
      </Link>
    </div>
  );
}
