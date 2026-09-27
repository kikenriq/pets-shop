import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Truck, Undo2 } from 'lucide-react';
import Rating from '@/components/ui/Rating';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductCard from '@/components/ui/ProductCard';
import ProductGallery from '@/components/product/ProductGallery';
import AddToCartControls from '@/components/product/AddToCartControls';
import ProductTabs from '@/components/product/ProductTabs';
import ReviewsSection from '@/components/product/ReviewsSection';
import { discountPercent, formatPrice } from '@/lib/format';
import {
  getBrandBySlug,
  getCategoryBySlug,
  getProductBySlug,
  products,
  relatedProducts,
} from '@/data/catalog';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const brand = getBrandBySlug(product.brandSlug);
  const discount = discountPercent(product.priceCents, product.compareAtCents);
  const related = relatedProducts(product);

  // Sibling variants of the same line, so shoppers can switch size/flavour.
  const siblings = products.filter(
    (p) => p.family === product.family && p.id !== product.id
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { '@type': 'Brand', name: brand?.name },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: (product.priceCents / 100).toFixed(2),
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="mx-auto w-[92%] max-w-7xl pb-20 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        trail={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          ...(category
            ? [
                {
                  label: category.name,
                  href: `/products?category=${category.slug}`,
                },
              ]
            : []),
          { label: product.family, href: null },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {category?.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} reviewCount={product.reviewCount} />
            {brand && (
              <Link
                href={`/products?brand=${brand.slug}`}
                className="text-sm text-ink-muted underline-offset-2 hover:text-brand-600 hover:underline"
              >
                by {brand.name}
              </Link>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-600">
              {formatPrice(product.priceCents)}
            </span>
            {product.compareAtCents && (
              <>
                <span className="text-lg text-ink-muted line-through">
                  {formatPrice(product.compareAtCents)}
                </span>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-sm font-bold text-brand-700">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-ink-muted">
            {product.description}
          </p>

          {siblings.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
                Other options
              </p>
              <ul className="flex flex-wrap gap-2">
                <li>
                  <span className="inline-flex rounded-full border-2 border-brand-500 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                    {product.variant}
                  </span>
                </li>
                {siblings.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/products/${s.slug}`}
                      className="inline-flex rounded-full border-2 border-hairline px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-300"
                    >
                      {s.variant}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-6 flex items-center gap-2 text-sm font-semibold">
            {product.stock > 0 ? (
              <>
                <Check className="size-4 text-green-700" aria-hidden="true" />
                <span className="text-green-700">
                  In stock — {product.stock} available
                </span>
              </>
            ) : (
              <span className="text-ink-muted">Out of stock</span>
            )}
          </p>

          <AddToCartControls productId={product.id} stock={product.stock} />

          <ul className="mt-8 space-y-3 border-t border-hairline pt-6 text-sm text-ink-muted">
            <li className="flex items-center gap-3">
              <Truck className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
              Free shipping on orders over $50
            </li>
            <li className="flex items-center gap-3">
              <Undo2 className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
              30-day returns on unopened items
            </li>
          </ul>
        </div>
      </div>

      <ProductTabs description={product.description} specs={product.specs} />

      <ReviewsSection product={product} />

      {related.length > 0 && (
        <section className="mt-16 border-t border-hairline pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            You might also like
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
