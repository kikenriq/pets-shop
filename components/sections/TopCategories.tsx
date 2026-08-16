import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  categories,
  countByCategory,
  featuredCategorySlugs,
} from '@/data/catalog';

export default function TopCategories() {
  const shown = featuredCategorySlugs
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section id="categories" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto w-[92%] max-w-7xl">
        <SectionHeading accent="Top" rest="categories" />

        {/* Was a flex row with min-w-[cal(33.33%-20px)] — invalid CSS that
            silently never applied. A grid needs no calc at all. */}
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {shown.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/products?category=${category.slug}`}
                className="group block rounded-card p-3 text-center transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 transition-colors duration-300 group-hover:bg-brand-50">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                    className="object-contain p-5 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-3 font-bold text-ink transition-colors group-hover:text-brand-600">
                  {category.name}
                </h3>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {countByCategory(category.slug)} products
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
