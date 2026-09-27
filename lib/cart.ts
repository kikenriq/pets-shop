import type { CartLine, Cents, Product } from './types';

/**
 * Pure cart maths. No React, no storage, no clock — everything here is a
 * function of its arguments, which is what makes it worth testing. This is
 * the layer where a bug costs real money.
 */

/** Orders at or above this subtotal ship free. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 5_000;
export const FLAT_SHIPPING_CENTS = 495;
/** Flat demo tax rate; a real store would resolve this per destination. */
export const TAX_RATE = 0.07;
/** Per-line cap, independent of stock. */
export const MAX_PER_LINE = 10;

export interface CartItem {
  product: Product;
  quantity: number;
  /** unit price × quantity */
  lineTotalCents: Cents;
}

export interface CartTotals {
  itemCount: number;
  subtotalCents: Cents;
  shippingCents: Cents;
  taxCents: Cents;
  totalCents: Cents;
  /** 0 once the order qualifies for free shipping. */
  freeShippingRemainingCents: Cents;
}

export const clampQuantity = (quantity: number, stock: number): number => {
  const ceiling = Math.min(stock, MAX_PER_LINE);
  if (ceiling <= 0) return 0;
  // Guard against NaN from a corrupted store or a hand-edited input.
  const n = Number.isFinite(quantity) ? Math.floor(quantity) : 1;
  return Math.min(Math.max(1, n), ceiling);
};

/**
 * Joins stored lines against the live catalogue.
 *
 * Stored carts outlive deploys, so a line can reference a product that has
 * since been renamed away or sold out. Those are dropped rather than rendered
 * as a broken row — the alternative is a checkout that charges for something
 * that no longer exists.
 */
export function resolveCart(
  lines: CartLine[],
  catalogue: Product[]
): CartItem[] {
  const byId = new Map(catalogue.map((p) => [p.id, p]));

  return lines.flatMap((line) => {
    const product = byId.get(line.productId);
    if (!product || product.stock === 0) return [];

    const quantity = clampQuantity(line.quantity, product.stock);
    if (quantity === 0) return [];

    return [
      {
        product,
        quantity,
        lineTotalCents: product.priceCents * quantity,
      },
    ];
  });
}

export function calculateTotals(items: CartItem[]): CartTotals {
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const subtotalCents = items.reduce((n, i) => n + i.lineTotalCents, 0);

  const qualifiesForFreeShipping =
    subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
  const shippingCents =
    subtotalCents === 0 || qualifiesForFreeShipping ? 0 : FLAT_SHIPPING_CENTS;

  // Tax is computed once on the subtotal rather than per line: rounding each
  // line separately drifts by a cent or two on larger carts.
  const taxCents = Math.round(subtotalCents * TAX_RATE);

  return {
    itemCount,
    subtotalCents,
    shippingCents,
    taxCents,
    totalCents: subtotalCents + shippingCents + taxCents,
    freeShippingRemainingCents: qualifiesForFreeShipping
      ? 0
      : Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents),
  };
}

/* ------------------------------------------------------------- reducer ---- */

export type CartAction =
  | { type: 'hydrate'; lines: CartLine[] }
  | { type: 'add'; productId: string; quantity: number }
  | { type: 'setQuantity'; productId: string; quantity: number }
  | { type: 'remove'; productId: string }
  | { type: 'clear' };

/**
 * Quantities are not clamped against stock here — the reducer has no
 * catalogue. `resolveCart` clamps at read time, which also re-clamps stored
 * lines whenever stock changes under them.
 */
export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines;

    case 'add': {
      const quantity = Math.max(1, Math.floor(action.quantity) || 1);
      const existing = state.find((l) => l.productId === action.productId);
      if (!existing) return [...state, { productId: action.productId, quantity }];
      return state.map((l) =>
        l.productId === action.productId
          ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_PER_LINE) }
          : l
      );
    }

    case 'setQuantity': {
      const quantity = Math.floor(action.quantity);
      if (quantity <= 0) {
        return state.filter((l) => l.productId !== action.productId);
      }
      return state.map((l) =>
        l.productId === action.productId
          ? { ...l, quantity: Math.min(quantity, MAX_PER_LINE) }
          : l
      );
    }

    case 'remove':
      return state.filter((l) => l.productId !== action.productId);

    case 'clear':
      return [];

    default:
      return state;
  }
}

/* ------------------------------------------------------------- storage ---- */

export const CART_STORAGE_KEY = 'petsshop.cart.v1';

/** Never throws: a corrupt or unreadable store yields an empty cart. */
export function parseStoredCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((entry) => {
      if (typeof entry !== 'object' || entry === null) return [];
      const { productId, quantity } = entry as Record<string, unknown>;
      if (typeof productId !== 'string' || !productId) return [];
      if (typeof quantity !== 'number' || !Number.isFinite(quantity)) return [];
      const q = Math.floor(quantity);
      if (q <= 0) return [];
      return [{ productId, quantity: Math.min(q, MAX_PER_LINE) }];
    });
  } catch {
    return [];
  }
}
