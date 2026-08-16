import Image from 'next/image';
import Link from 'next/link';
import Rating from './Rating';
import { discountPercent, formatPrice } from '@/lib/format';
import type { Product } from '@/lib/types';

/**
 * Replaces the old `Items.jsx`, which took three props, was not clickable,
 * had no add-to-cart affordance and shipped `alt=""` on the product photo.
 */
export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const discount = discountPercent(product.priceCents, product.compareAtCents);
  const outOfStock = product.stock === 0;
  const [primary, hover] = product.images;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-hairline bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        <Image
          src={primary}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          priority={priority}
          className="object-contain p-6 transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* Second shot revealed on hover — these files shipped in the repo but
            were never referenced by the old build. */}
        {hover && (
          <Image
            src={hover}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
            className="scale-105 object-contain p-6 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        )}

        {discount !== null && !outOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-500 px-2.5 py-1 text-xs font-bold text-white">
            −{discount}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-white">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Rating value={product.rating} reviewCount={product.reviewCount} />

        <h3 className="font-semibold leading-snug text-ink">
          {/* Stretched link keeps the whole card clickable without nesting
              interactive elements inside each other. */}
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 hover:text-brand-600"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-bold text-brand-600">
            {formatPrice(product.priceCents)}
          </span>
          {product.compareAtCents && (
            <span className="text-sm text-ink-muted line-through">
              {formatPrice(product.compareAtCents)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
