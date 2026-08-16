import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Tightened up: the old version had a 50/50 split with a lot of dead space on
 * both sides. This puts the offer on a contained brand-coloured card so it
 * reads as a single deliberate block instead of a half-empty section.
 */
export default function CTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-[92%] max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-card bg-brand-500">
          <Image
            src="/images/cta-bg.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover opacity-15"
          />

          <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="max-w-lg text-white">
              <Image
                src="/images/cta-icon.png"
                alt=""
                aria-hidden="true"
                width={56}
                height={56}
                className="mb-4 size-14 object-contain"
              />
              {/* This heading was written with `class` instead of `className`,
                  so its size and weight never actually applied. */}
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Get 20% off your first order
              </h2>
              <p className="mt-4 text-white/90">
                Join the newsletter for new arrivals, seasonal deals and care
                tips from our vets. No spam, unsubscribe any time.
              </p>
              {/* Was a <button> wrapping an <a> — invalid nesting and a double
                  tab stop. */}
              <Link
                href="/products"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-brand-600 transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start shopping
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="relative aspect-4/3 w-full">
              <Image
                src="/images/cta-banner.png"
                alt="A happy dog surrounded by Pet's Shop products"
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
