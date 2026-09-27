import { describe, expect, it } from 'vitest';
import {
  CART_STORAGE_KEY,
  FLAT_SHIPPING_CENTS,
  FREE_SHIPPING_THRESHOLD_CENTS,
  MAX_PER_LINE,
  TAX_RATE,
  calculateTotals,
  cartReducer,
  clampQuantity,
  parseStoredCart,
  resolveCart,
} from '@/lib/cart';
import type { CartLine, Product } from '@/lib/types';

/** Minimal product factory — only the fields the cart maths touches. */
function product(overrides: Partial<Product> = {}): Product {
  return {
    id: 'p-1',
    slug: 'test-product',
    name: 'Test Product',
    family: 'Test',
    variant: 'Default',
    description: '',
    priceCents: 1000,
    currency: 'USD',
    images: ['/images/product-1.jpg'],
    categorySlug: 'dog-food',
    brandSlug: 'dogcat',
    stock: 5,
    rating: 4,
    reviewCount: 10,
    tags: [],
    featured: false,
    specs: [],
    addedAt: 0,
    ...overrides,
  };
}

describe('clampQuantity', () => {
  it('keeps a quantity that fits within stock', () => {
    expect(clampQuantity(3, 5)).toBe(3);
  });

  it('never goes below one', () => {
    expect(clampQuantity(0, 5)).toBe(1);
    expect(clampQuantity(-4, 5)).toBe(1);
  });

  it('caps at stock when stock is the tighter limit', () => {
    expect(clampQuantity(9, 3)).toBe(3);
  });

  it('caps at the per-line limit when stock is plentiful', () => {
    expect(clampQuantity(50, 999)).toBe(MAX_PER_LINE);
  });

  it('returns zero when there is no stock', () => {
    expect(clampQuantity(2, 0)).toBe(0);
  });

  it('survives NaN from a corrupted store', () => {
    expect(clampQuantity(Number.NaN, 5)).toBe(1);
  });
});

describe('resolveCart', () => {
  const catalogue = [
    product({ id: 'a', priceCents: 1500, stock: 4 }),
    product({ id: 'b', priceCents: 700, stock: 2 }),
  ];

  it('joins stored lines against the catalogue', () => {
    const items = resolveCart([{ productId: 'a', quantity: 2 }], catalogue);
    expect(items).toHaveLength(1);
    expect(items[0].lineTotalCents).toBe(3000);
  });

  it('drops lines whose product no longer exists', () => {
    // A cart stored before a deploy can reference a product that is gone.
    const items = resolveCart([{ productId: 'ghost', quantity: 1 }], catalogue);
    expect(items).toEqual([]);
  });

  it('drops lines whose product sold out', () => {
    const items = resolveCart(
      [{ productId: 'c', quantity: 1 }],
      [...catalogue, product({ id: 'c', stock: 0 })]
    );
    expect(items).toEqual([]);
  });

  it('re-clamps a stored quantity that now exceeds stock', () => {
    const items = resolveCart([{ productId: 'b', quantity: 9 }], catalogue);
    expect(items[0].quantity).toBe(2);
    expect(items[0].lineTotalCents).toBe(1400);
  });
});

describe('calculateTotals', () => {
  const itemsWorth = (cents: number) => [
    { product: product({ priceCents: cents }), quantity: 1, lineTotalCents: cents },
  ];

  it('returns zeroes for an empty cart, with no shipping charge', () => {
    const t = calculateTotals([]);
    expect(t).toMatchObject({
      itemCount: 0,
      subtotalCents: 0,
      shippingCents: 0,
      taxCents: 0,
      totalCents: 0,
    });
  });

  it('charges flat shipping below the free threshold', () => {
    const t = calculateTotals(itemsWorth(FREE_SHIPPING_THRESHOLD_CENTS - 1));
    expect(t.shippingCents).toBe(FLAT_SHIPPING_CENTS);
    expect(t.freeShippingRemainingCents).toBe(1);
  });

  it('ships free exactly at the threshold', () => {
    const t = calculateTotals(itemsWorth(FREE_SHIPPING_THRESHOLD_CENTS));
    expect(t.shippingCents).toBe(0);
    expect(t.freeShippingRemainingCents).toBe(0);
  });

  it('sums quantities across lines', () => {
    const t = calculateTotals([
      { product: product({ id: 'a' }), quantity: 2, lineTotalCents: 2000 },
      { product: product({ id: 'b' }), quantity: 3, lineTotalCents: 900 },
    ]);
    expect(t.itemCount).toBe(5);
    expect(t.subtotalCents).toBe(2900);
  });

  it('taxes the subtotal once rather than each line', () => {
    // Three lines of 333c: per-line rounding gives 3 × 23 = 69, but taxing the
    // 999c subtotal gives 70. The subtotal figure is the correct one.
    const lines = [1, 2, 3].map((n) => ({
      product: product({ id: `p${n}`, priceCents: 333 }),
      quantity: 1,
      lineTotalCents: 333,
    }));
    const t = calculateTotals(lines);
    expect(t.subtotalCents).toBe(999);
    expect(t.taxCents).toBe(Math.round(999 * TAX_RATE));
    expect(t.taxCents).toBe(70);
  });

  it('total is always subtotal + shipping + tax', () => {
    const t = calculateTotals(itemsWorth(2599));
    expect(t.totalCents).toBe(t.subtotalCents + t.shippingCents + t.taxCents);
  });

  it('keeps every figure an integer number of cents', () => {
    const t = calculateTotals(itemsWorth(1999));
    for (const v of Object.values(t)) {
      expect(Number.isInteger(v)).toBe(true);
    }
  });
});

describe('cartReducer', () => {
  const empty: CartLine[] = [];

  it('adds a new line', () => {
    expect(cartReducer(empty, { type: 'add', productId: 'a', quantity: 2 })).toEqual([
      { productId: 'a', quantity: 2 },
    ]);
  });

  it('merges into the existing line instead of duplicating it', () => {
    const state = [{ productId: 'a', quantity: 2 }];
    expect(cartReducer(state, { type: 'add', productId: 'a', quantity: 3 })).toEqual([
      { productId: 'a', quantity: 5 },
    ]);
  });

  it('caps a merged line at the per-line limit', () => {
    const state = [{ productId: 'a', quantity: 8 }];
    const next = cartReducer(state, { type: 'add', productId: 'a', quantity: 8 });
    expect(next[0].quantity).toBe(MAX_PER_LINE);
  });

  it('removes the line when quantity drops to zero', () => {
    const state = [{ productId: 'a', quantity: 1 }];
    expect(
      cartReducer(state, { type: 'setQuantity', productId: 'a', quantity: 0 })
    ).toEqual([]);
  });

  it('clears everything', () => {
    const state = [
      { productId: 'a', quantity: 1 },
      { productId: 'b', quantity: 2 },
    ];
    expect(cartReducer(state, { type: 'clear' })).toEqual([]);
  });

  it('does not mutate the previous state', () => {
    const state = [{ productId: 'a', quantity: 1 }];
    const snapshot = structuredClone(state);
    cartReducer(state, { type: 'add', productId: 'a', quantity: 1 });
    expect(state).toEqual(snapshot);
  });
});

describe('parseStoredCart', () => {
  it('reads a well-formed cart', () => {
    const raw = JSON.stringify([{ productId: 'a', quantity: 2 }]);
    expect(parseStoredCart(raw)).toEqual([{ productId: 'a', quantity: 2 }]);
  });

  it('returns empty for null, junk or the wrong shape', () => {
    expect(parseStoredCart(null)).toEqual([]);
    expect(parseStoredCart('not json at all')).toEqual([]);
    expect(parseStoredCart('{"productId":"a"}')).toEqual([]);
  });

  it('discards malformed entries but keeps the valid ones', () => {
    const raw = JSON.stringify([
      { productId: 'a', quantity: 2 },
      { productId: '', quantity: 1 },
      { productId: 'b', quantity: 'three' },
      { productId: 'c', quantity: -1 },
      null,
      { productId: 'd', quantity: 1 },
    ]);
    expect(parseStoredCart(raw)).toEqual([
      { productId: 'a', quantity: 2 },
      { productId: 'd', quantity: 1 },
    ]);
  });

  it('caps a hand-edited quantity at the per-line limit', () => {
    const raw = JSON.stringify([{ productId: 'a', quantity: 9999 }]);
    expect(parseStoredCart(raw)[0].quantity).toBe(MAX_PER_LINE);
  });

  it('uses a versioned storage key so the shape can change later', () => {
    expect(CART_STORAGE_KEY).toMatch(/\.v\d+$/);
  });
});
