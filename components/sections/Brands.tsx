import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import { brands, countByBrand } from '@/data/catalog';

export default function Brands() {
  return (
    <section id="brands" className="scroll-mt-24 pb-16 sm:pb-20">
      <div className="mx-auto w-[92%] max-w-7xl">
        <SectionHeading accent="Best" rest="Brands" />

        {/* All five of these were labelled "Cat Food" in the old markup. */}
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <li key={brand.slug}>
              <Link
                href={`/products?brand=${brand.slug}`}
                className="group flex h-full flex-col items-center rounded-card border border-hairline bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
              >
                <div className="relative aspect-3/2 w-full">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="(max-width: 640px) 45vw, 200px"
                    className="object-contain grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-3 text-sm font-bold text-ink transition-colors group-hover:text-brand-600">
                  {brand.name}
                </h3>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {countByBrand(brand.slug)} products
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
