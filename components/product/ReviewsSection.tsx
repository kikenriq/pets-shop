import { CheckCircle2, Star } from 'lucide-react';
import Rating from '@/components/ui/Rating';
import { getReviewsFor, ratingBreakdown } from '@/data/reviews';
import type { Product } from '@/lib/types';

export default function ReviewsSection({ product }: { product: Product }) {
  const list = getReviewsFor(product.id);
  const breakdown = ratingBreakdown(product.id);
  const total = list.length;

  return (
    <section className="mt-16 border-t border-hairline pt-12">
      <h2 className="text-2xl font-bold tracking-tight text-ink">
        Customer reviews
      </h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-[18rem_1fr]">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-ink">{product.rating}</span>
            <span className="text-ink-muted">/ 5</span>
          </div>
          <div className="mt-2">
            <Rating value={product.rating} />
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            Based on {product.reviewCount} ratings
          </p>

          <ul className="mt-6 space-y-2">
            {breakdown.map((count, i) => {
              const star = 5 - i;
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <li key={star} className="flex items-center gap-3 text-sm">
                  <span className="flex w-10 items-center gap-1 text-ink-muted">
                    {star}
                    <Star className="size-3 fill-accent-amber text-accent-amber" aria-hidden="true" />
                  </span>
                  <span
                    className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100"
                    role="img"
                    aria-label={`${count} of ${total} reviews gave ${star} stars`}
                  >
                    <span
                      className="block h-full rounded-full bg-accent-amber"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-6 text-right tabular-nums text-ink-muted">
                    {count}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="divide-y divide-hairline">
          {list.map((review) => (
            <li key={review.id} className="py-6 first:pt-0">
              <div className="flex flex-wrap items-center gap-3">
                <Rating value={review.rating} />
                <h3 className="font-semibold text-ink">{review.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {review.body}
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                <span className="font-semibold text-ink">{review.author}</span>
                <time dateTime={review.date}>{review.date}</time>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 text-green-700">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    Verified purchase
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
