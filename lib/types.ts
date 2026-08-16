/**
 * Money is always an integer number of cents.
 *
 * The original build stored prices as strings with the symbol baked in
 * (price='$15.00'), which cannot be summed. Floats are not an option either:
 * 0.1 + 0.2 !== 0.3, and those rounding errors turn into real money once a
 * cart has a subtotal. Every payment provider (Stripe included) expects the
 * minor unit, so cents it is.
 */
export type Cents = number;

export type CategorySlug =
  | 'cat-food'
  | 'cat-toys'
  | 'dog-food'
  | 'dog-toys'
  | 'chew-toys'
  | 'fish-food'
  | 'bird-food'
  | 'pet-care';

export type BrandSlug =
  | 'dogcat'
  | 'husky'
  | 'catis'
  | 'flying-corgi'
  | 'doglogo';

export interface Category {
  slug: CategorySlug;
  name: string;
  image: string;
  /** Short blurb shown on the catalog header when this filter is active. */
  description: string;
}

export interface Brand {
  slug: BrandSlug;
  name: string;
  logo: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Product line the variant belongs to, e.g. "Vet Essentials". */
  family: string;
  /** What makes this variant different, e.g. "Salmon · 2 kg". */
  variant: string;
  description: string;
  priceCents: Cents;
  /** Original price, when discounted. Drives the sale badge. */
  compareAtCents?: Cents;
  currency: 'USD';
  /** First image is primary; a second one is revealed on hover when present. */
  images: string[];
  categorySlug: CategorySlug;
  brandSlug: BrandSlug;
  stock: number;
  /** 0–5, one decimal. */
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  specs: Spec[];
  /** Milliseconds since epoch — used by the "newest" sort. */
  addedAt: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface PromoBanner {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
  image: string;
  /** Tailwind classes for the card surface. */
  tone: string;
  /** Larger card in the bento layout. */
  wide?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/** Shape the cart will use in Phase 3 — declared now so pricing stays honest. */
export interface CartLine {
  productId: string;
  quantity: number;
}

/* ---------------------------------------------------------------- filters */

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'newest', label: 'Newest' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export interface ProductFilters {
  category?: CategorySlug;
  brand?: BrandSlug;
  /** Inclusive bounds, in cents. */
  minPrice?: Cents;
  maxPrice?: Cents;
  inStock?: boolean;
  onSale?: boolean;
  minRating?: number;
  sort: SortValue;
  page: number;
}
