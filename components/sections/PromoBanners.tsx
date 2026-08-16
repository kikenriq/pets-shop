import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { promoBanners } from '@/data/catalog';

/**
 * Rebuilt as a bento: one lead card carries the offer and two support it.
 * The previous version gave all three equal weight with arbitrary pastel
 * backgrounds, and laid a white gradient over the photo that swallowed the
 * left third of every image.
 */
export default function PromoBanners() {
  const [lead, ...rest] = promoBanners;

  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto grid w-[92%] max-w-7xl gap-5 lg:grid-cols-3">
        {/* Lead card */}
        <article
          className={`group relative isolate flex min-h-80 overflow-hidden rounded-card lg:col-span-2 ${lead.tone}`}
        >
          <Image
            src={lead.image}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 1024px) 92vw, 60vw"
            className="object-cover object-right transition-transform duration-700 group-hover:scale-105"
          />
          {/* Scrim only over the text column, so the photo stays visible. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent lg:to-40%"
          />
          <div className="relative z-10 flex max-w-md flex-col items-start justify-center gap-3 p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
              {lead.eyebrow}
            </p>
            <h3 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {lead.title}
            </h3>
            <p className="text-ink-muted">{lead.copy}</p>
            <Link
              href={lead.href}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              {lead.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </article>

        {/* Support cards */}
        <div className="grid gap-5">
          {rest.map((banner) => (
            <article
              key={banner.id}
              className={`group relative isolate flex min-h-40 overflow-hidden rounded-card ${banner.tone}`}
            >
              <Image
                src={banner.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 1024px) 92vw, 30vw"
                className="object-cover object-right transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-r from-white via-white/75 to-transparent"
              />
              <div className="relative z-10 flex max-w-[65%] flex-col items-start justify-center gap-1.5 p-6">
                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-brand-600">
                  {banner.eyebrow}
                </p>
                <h3 className="text-xl font-bold leading-tight text-ink">
                  {banner.title}
                </h3>
                <Link
                  href={banner.href}
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-ink after:absolute after:inset-0 hover:text-brand-600"
                >
                  {banner.cta}
                  <ArrowRight
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
