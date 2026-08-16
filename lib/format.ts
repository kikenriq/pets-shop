import type { Cents } from './types';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/** 1500 -> "$15.00". Formatting lives here so cents never leak into JSX. */
export function formatPrice(cents: Cents): string {
  return formatter.format(cents / 100);
}

/** Percentage saved, rounded. Returns null when there is no discount. */
export function discountPercent(
  priceCents: Cents,
  compareAtCents?: Cents
): number | null {
  if (!compareAtCents || compareAtCents <= priceCents) return null;
  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}
