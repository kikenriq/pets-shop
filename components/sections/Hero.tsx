import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex min-h-[38rem] w-full items-center overflow-hidden bg-brand-500 pt-24 lg:min-h-[44rem]">
      <Image
        src="/images/hero-banner.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />

      {/* The old hero put white text straight on the photo. This scrim keeps
          the headline legible regardless of what sits behind it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-brand-600/80 via-brand-500/40 to-transparent"
      />

      <div className="relative mx-auto w-[92%] max-w-7xl">
        <div className="max-w-xl text-white">
          <h1 className="font-display text-5xl leading-none tracking-wide sm:text-6xl lg:text-7xl">
            High Quality
            <span className="mt-1 block text-6xl sm:text-7xl lg:text-8xl">
              Pet Food
            </span>
          </h1>
          <p className="mt-5 text-lg font-semibold">Sale up to 40% off today</p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center rounded-full bg-ink px-8 py-3.5 font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-ink-soft"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
