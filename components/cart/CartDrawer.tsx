'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from './CartProvider';
import { formatPrice } from '@/lib/format';
import { FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/cart';

export default function CartDrawer() {
  const { items, totals, drawerOpen, closeDrawer, setQuantity, remove } =
    useCart();

  // Close on Escape and stop the page behind from scrolling.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  const progress = Math.min(
    100,
    (totals.subtotalCents / FREE_SHIPPING_THRESHOLD_CENTS) * 100
  );

  return (
    <div className="fixed inset-0 z-100" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeDrawer}
        className="absolute inset-0 size-full bg-black/50"
      />

      <div className="absolute inset-y-0 right-0 flex w-96 max-w-[92%] flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-hairline p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
            <ShoppingBag className="size-5" aria-hidden="true" />
            Your cart
            {totals.itemCount > 0 && (
              <span className="rounded-full bg-brand-500 px-2 py-0.5 text-xs text-white">
                {totals.itemCount}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex size-9 items-center justify-center rounded-full hover:bg-neutral-100"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-500">
              <ShoppingBag className="size-7" aria-hidden="true" />
            </span>
            <p className="font-semibold text-ink">Your cart is empty</p>
            <Link
              href="/products"
              onClick={closeDrawer}
              className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            {totals.freeShippingRemainingCents > 0 && (
              <div className="border-b border-hairline bg-brand-50/60 px-5 py-3">
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
            )}

            <ul className="flex-1 divide-y divide-hairline overflow-y-auto">
              {items.map(({ product, quantity, lineTotalCents }) => (
                <li key={product.id} className="flex gap-3 p-4">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={closeDrawer}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={closeDrawer}
                      className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand-600"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {formatPrice(product.priceCents)} each
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-full border border-hairline">
                        <button
                          type="button"
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="flex size-8 items-center justify-center rounded-full hover:bg-neutral-100"
                        >
                          <Minus className="size-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          disabled={quantity >= Math.min(product.stock, 10)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="flex size-8 items-center justify-center rounded-full hover:bg-neutral-100 disabled:opacity-40"
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-ink tabular-nums">
                        {formatPrice(lineTotalCents)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="flex size-8 shrink-0 items-center justify-center self-start rounded-full text-ink-muted hover:bg-neutral-100 hover:text-red-600"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="border-t border-hairline p-5">
              <dl className="space-y-1.5 text-sm">
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
                  <dt className="text-ink-muted">Tax</dt>
                  <dd className="font-semibold tabular-nums">
                    {formatPrice(totals.taxCents)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-hairline pt-2 text-base">
                  <dt className="font-bold">Total</dt>
                  <dd className="font-bold text-brand-600 tabular-nums">
                    {formatPrice(totals.totalCents)}
                  </dd>
                </div>
              </dl>

              <Link
                href="/cart"
                onClick={closeDrawer}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-brand-500 px-6 py-3.5 font-bold text-white transition-colors hover:bg-brand-600"
              >
                View cart &amp; checkout
              </Link>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
