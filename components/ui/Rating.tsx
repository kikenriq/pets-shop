import { Star } from 'lucide-react';

/**
 * The old markup hardcoded SIX empty outline stars on every product, with no
 * rating prop at all. Five stars, filled to the actual value, announced once
 * to screen readers.
 */
export default function Rating({
  value,
  reviewCount,
}: {
  value: number;
  reviewCount?: number;
}) {
  const rounded = Math.round(value);

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rated ${value} out of 5${
        reviewCount ? ` from ${reviewCount} reviews` : ''
      }`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={
            i < rounded
              ? 'size-4 fill-accent-amber text-accent-amber'
              : 'size-4 text-hairline'
          }
        />
      ))}
      {reviewCount !== undefined && (
        <span className="ml-1 text-xs text-ink-muted">({reviewCount})</span>
      )}
    </div>
  );
}
