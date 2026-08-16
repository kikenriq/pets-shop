'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';

/**
 * Quantity stepper + add button. The cart store lands in Phase 3; until then
 * the button is deliberately inert rather than pretending to work.
 */
export default function AddToCartControls({ stock }: { stock: number }) {
  const [qty, setQty] = useState(1);
  const outOfStock = stock === 0;
  const max = Math.min(stock, 10);

  const clamp = (n: number) => Math.min(Math.max(1, n), Math.max(1, max));

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center rounded-full border border-hairline">
        <button
          type="button"
          onClick={() => setQty((q) => clamp(q - 1))}
          disabled={outOfStock || qty <= 1}
          aria-label="Decrease quantity"
          className="flex size-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-neutral-100 disabled:opacity-40"
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>

        <label htmlFor="qty" className="sr-only">
          Quantity
        </label>
        <input
          id="qty"
          type="number"
          min={1}
          max={max}
          value={qty}
          disabled={outOfStock}
          onChange={(e) => setQty(clamp(Number(e.target.value)))}
          className="w-14 border-0 bg-transparent text-center font-bold tabular-nums text-ink focus:outline-none disabled:opacity-40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          type="button"
          onClick={() => setQty((q) => clamp(q + 1))}
          disabled={outOfStock || qty >= max}
          aria-label="Increase quantity"
          className="flex size-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-neutral-100 disabled:opacity-40"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        disabled={outOfStock}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-4 font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        <ShoppingBag className="size-5" aria-hidden="true" />
        {outOfStock ? 'Out of stock' : 'Add to cart'}
      </button>
    </div>
  );
}
