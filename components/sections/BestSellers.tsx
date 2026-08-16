import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { featuredProducts } from '@/data/catalog';

export default function BestSellers() {
  const products = featuredProducts();

  return (
    <section id="best-sellers" className="scroll-mt-24 bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto w-[92%] max-w-7xl">
        <SectionHeading accent="Best" rest="Seller" />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, i) => (
            <li key={product.id}>
              <ProductCard product={product} priority={i < 4} />
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center rounded-full border-2 border-ink px-8 py-3 font-bold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
