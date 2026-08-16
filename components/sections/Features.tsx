import Image from 'next/image';
import { features } from '@/data/catalog';

/**
 * Reworked from four flat outlined boxes into a single banded strip. As a
 * reassurance row it should read as one unit under the product grid, not
 * compete with the sections around it.
 */
export default function Features() {
  return (
    <section className="py-14">
      <div className="mx-auto w-[92%] max-w-7xl">
        <h2 className="sr-only">Why shop with us</h2>
        <ul className="grid divide-y divide-hairline overflow-hidden rounded-card border border-hairline bg-white sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {features.map((feature, i) => (
            <li
              key={feature.id}
              className={`group flex items-center gap-4 p-6 transition-colors hover:bg-brand-50/60 ${
                i > 0 ? 'lg:border-l lg:border-hairline' : ''
              } ${i === 2 ? 'sm:border-t sm:border-hairline lg:border-t-0' : ''} ${
                i === 3 ? 'sm:border-t sm:border-hairline lg:border-t-0' : ''
              } ${i === 1 ? 'sm:border-l sm:border-hairline' : ''} ${
                i === 3 ? 'sm:border-l sm:border-hairline' : ''
              }`}
            >
              <Image
                src={feature.icon}
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
                className="size-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div>
                <h3 className="font-bold text-ink">{feature.title}</h3>
                <p className="mt-0.5 text-sm text-ink-muted">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
