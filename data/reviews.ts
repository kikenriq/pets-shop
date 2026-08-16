import type { Review } from '@/lib/types';
import { products } from './catalog';

/**
 * Fictional reviews for the demo store.
 *
 * Deterministic on purpose: everything is derived from the product id, with no
 * Math.random and no Date.now. A random generator here would produce different
 * text on the server and on the client and blow up hydration, and would make
 * every build output differ.
 */
const AUTHORS = [
  'Marta R.', 'Kevin O.', 'Priya S.', 'Diego L.', 'Anne T.',
  'Sam H.', 'Lucia F.', 'Tom W.', 'Nadia K.', 'Ben A.',
  'Yara M.', 'Chris P.',
];

const POSITIVE = [
  {
    title: 'Exactly what we needed',
    body: 'Switched over a month ago and the difference was obvious within two weeks. No more scratching, and mealtimes are much less of a negotiation.',
  },
  {
    title: 'Worth the price',
    body: 'Costs a bit more than what we used before, but it lasts longer and there is far less waste, so it evens out.',
  },
  {
    title: 'Vet recommended this one',
    body: 'Our vet suggested it after some digestive trouble. Three months in and everything has settled down nicely.',
  },
  {
    title: 'Fast delivery, sealed well',
    body: 'Arrived two days after ordering and the packaging was intact. Will be ordering again.',
  },
];

const MIXED = [
  {
    title: 'Good, with one caveat',
    body: 'No complaints about the quality itself, but the packaging is awkward to reseal once you open it. Worth decanting into a container.',
  },
  {
    title: 'Took some getting used to',
    body: 'Mine was suspicious of it for the first few days. Mixing it with the old one for a week sorted that out.',
  },
];

const CRITICAL = [
  {
    title: 'Not for us',
    body: 'Quality seems fine and plenty of people clearly get on with it, but mine simply would not touch it. Returns were painless at least.',
  },
];

/** Small deterministic hash so each product gets a stable but varied set. */
function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
}

function buildReviews(): Review[] {
  const all: Review[] = [];

  for (const product of products) {
    const seed = hash(product.id);
    // Between 2 and 4 reviews, weighted so the average lands near the rating.
    const count = 2 + (seed % 3);

    for (let i = 0; i < count; i += 1) {
      const n = seed + i * 977;
      const highRated = product.rating >= 4.5;
      const pool =
        i === count - 1 && !highRated
          ? n % 2 === 0
            ? MIXED
            : CRITICAL
          : n % 5 === 0
            ? MIXED
            : POSITIVE;

      const entry = pool[n % pool.length];
      const stars =
        pool === POSITIVE ? 5 - (n % 2) : pool === MIXED ? 4 - (n % 2) : 2;

      // Fixed dates derived from the seed — no clock involved.
      const day = 1 + (n % 28);
      const month = 1 + (n % 12);

      all.push({
        id: `${product.id}-r${i + 1}`,
        productId: product.id,
        author: AUTHORS[(n + i) % AUTHORS.length],
        rating: stars,
        date: `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        title: entry.title,
        body: entry.body,
        verified: n % 3 !== 0,
      });
    }
  }

  return all;
}

export const reviews: Review[] = buildReviews();

export const getReviewsFor = (productId: string): Review[] =>
  reviews
    .filter((r) => r.productId === productId)
    .sort((a, b) => b.date.localeCompare(a.date));

/** Counts per star value, 5 → 1, for the rating breakdown bars. */
export function ratingBreakdown(productId: string): number[] {
  const list = getReviewsFor(productId);
  return [5, 4, 3, 2, 1].map(
    (star) => list.filter((r) => r.rating === star).length
  );
}
