'use client';

import { useState } from 'react';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { clampQuantity, MAX_PER_LINE } from '@/lib/cart';

export default function AddToCartControls({
  productId,
  stock,
}: {
  productId: string;
  stock: number;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const outOfStock = stock === 0;
  const max = Math.min(stock, MAX_PER_LINE);

  const handleAdd = () => {
    add(productId, qty);
    setJustAdded(true);
    // Brief confirmation, then back to the default label.
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center rounded-full border border-hairline">
        <button
          type="button"
          onClick={() => setQty((q) => clampQuantity(q - 1, stock))}
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
          onChange={(e) => setQty(clampQuantity(Number(e.target.value), stock))}
          className="w-14 border-0 bg-transparent text-center font-bold tabular-nums text-ink focus:outline-none disabled:opacity-40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          type="button"
          onClick={() => setQty((q) => clampQuantity(q + 1, stock))}
          disabled={outOfStock || qty >= max}
          aria-label="Increase quantity"
          className="flex size-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-neutral-100 disabled:opacity-40"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={outOfStock}
        className={`flex flex-1 items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-colors disabled:cursor-not-allowed disabled:bg-neutral-300 ${
          justAdded ? 'bg-green-600' : 'bg-brand-500 hover:bg-brand-600'
        }`}
      >
        {justAdded ? (
          <>
            <Check className="size-5" aria-hidden="true" />
            Added to cart
          </>
        ) : (
          <>
            <ShoppingBag className="size-5" aria-hidden="true" />
            {outOfStock ? 'Out of stock' : 'Add to cart'}
          </>
        )}
      </button>

      {/* Announced to screen readers without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        {justAdded ? `${qty} added to your cart` : ''}
      </p>
    </div>
  );
}
