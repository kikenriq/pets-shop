'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from './CartProvider';
import { formatPrice } from '@/lib/format';
import {
  FREE_SHIPPING_THRESHOLD_CENTS,
  MAX_PER_LINE,
  TAX_RATE,
} from '@/lib/cart';

export default function CartView() {
  const { items, totals, ready, setQuantity, remove, clear } = useCart();

  // Until the stored cart is read, render the same empty shell the server did.
  if (!ready) {
    return (
      <div className="mx-auto w-[92%] max-w-5xl pb-24 pt-32">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-100" />
        <div className="mt-8 h-40 animate-pulse rounded-card bg-neutral-100" />
      </div>
    );
  }

  if (items.length === 0) {
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

  const progress = Math.min(
    100,
    (totals.subtotalCents / FREE_SHIPPING_THRESHOLD_CENTS) * 100
  );

  return (
    <div className="mx-auto w-[92%] max-w-6xl pb-24 pt-28">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-brand-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Continue shopping
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Your cart
      </h1>
      <p className="mt-2 text-ink-muted" aria-live="polite">
        {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <section aria-label="Cart items">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {items.map(({ product, quantity, lineTotalCents }) => {
              const max = Math.min(product.stock, MAX_PER_LINE);
              return (
                <li key={product.id} className="flex flex-wrap gap-4 py-5">
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative size-24 shrink-0 overflow-hidden rounded-card bg-neutral-50"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="96px"
                      className="object-contain p-3"
                    />
                  </Link>

                  <div className="min-w-48 flex-1">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-semibold text-ink hover:text-brand-600"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-ink-muted">
                      {formatPrice(product.priceCents)} each
                    </p>
                    {quantity >= max && (
                      <p className="mt-1 text-xs text-ink-muted">
                        {product.stock < MAX_PER_LINE
                          ? `Only ${product.stock} left in stock`
                          : `Limit ${MAX_PER_LINE} per order`}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-hairline">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="flex size-10 items-center justify-center rounded-full hover:bg-neutral-100"
                      >
                        <Minus className="size-4" aria-hidden="true" />
                      </button>
                      <span className="w-9 text-center font-bold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        disabled={quantity >= max}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="flex size-10 items-center justify-center rounded-full hover:bg-neutral-100 disabled:opacity-40"
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </button>
                    </div>

                    <span className="w-20 text-right font-bold text-ink tabular-nums">
                      {formatPrice(lineTotalCents)}
                    </span>

                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="flex size-10 items-center justify-center rounded-full text-ink-muted hover:bg-neutral-100 hover:text-red-600"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={clear}
            className="mt-5 text-sm font-semibold text-ink-muted underline-offset-4 hover:text-red-600 hover:underline"
          >
            Clear cart
          </button>
        </section>

        <aside aria-label="Order summary" className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-card border border-hairline p-6">
            <h2 className="text-lg font-bold text-ink">Order summary</h2>

            {totals.freeShippingRemainingCents > 0 ? (
              <div className="mt-4 rounded-xl bg-brand-50/70 p-3">
                <p className="text-xs text-ink-muted">
                  Add{' '}
                  <strong className="text-brand-700">
                    {formatPrice(totals.freeShippingRemainingCents)}
                  </strong>{' '}
                  more for free shipping
                </p>
                <span
                  className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white"
                  role="img"
                  aria-label={`${Math.round(progress)}% of the way to free shipping`}
                >
                  <span
                    className="block h-full rounded-full bg-brand-500 transition-[width] duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </span>
              </div>
            ) : (
              <p className="mt-4 rounded-xl bg-green-50 p-3 text-xs font-semibold text-green-700">
                Your order ships free
              </p>
            )}

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Subtotal</dt>
                <dd className="font-semibold tabular-nums">
                  {formatPrice(totals.subtotalCents)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Shipping</dt>
                <dd className="font-semibold tabular-nums">
                  {totals.shippingCents === 0
                    ? 'Free'
                    : formatPrice(totals.shippingCents)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">
                  Tax ({Math.round(TAX_RATE * 100)}%)
                </dt>
                <dd className="font-semibold tabular-nums">
                  {formatPrice(totals.taxCents)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-hairline pt-3 text-lg">
                <dt className="font-bold">Total</dt>
                <dd className="font-bold text-brand-600 tabular-nums">
                  {formatPrice(totals.totalCents)}
                </dd>
              </div>
            </dl>

            {/* Wired up in Phase 4, once the Stripe route handler exists. */}
            <button
              type="button"
              disabled
              className="mt-6 w-full cursor-not-allowed rounded-full bg-neutral-300 px-6 py-3.5 font-bold text-white"
            >
              Checkout
            </button>
            <p className="mt-2 text-center text-xs text-ink-muted">
              Checkout is the next milestone — the cart and totals above are
              fully functional.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
