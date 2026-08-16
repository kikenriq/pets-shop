import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import {
  Facebook,
  Instagram,
  XTwitter,
  YouTube,
} from '@/components/ui/SocialIcons';
import { brands, categories } from '@/data/catalog';

const columns = [
  {
    title: 'Corporate',
    links: [
      { label: 'About us', href: '/#categories' },
      { label: 'Our brands', href: '/#brands' },
      { label: 'Careers', href: '/#contact' },
      { label: 'Affiliates', href: '/#contact' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Shipping & delivery', href: '/#contact' },
      { label: 'Returns policy', href: '/#contact' },
      { label: 'Privacy policy', href: '/#contact' },
      { label: 'Terms of service', href: '/#contact' },
    ],
  },
];

const socials = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: Facebook },
  { label: 'X', href: 'https://x.com', Icon: XTwitter },
  { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { label: 'YouTube', href: 'https://youtube.com', Icon: YouTube },
];

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-ink text-white">
      <div className="mx-auto grid w-[92%] max-w-7xl gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl tracking-wide">Pet&apos;s Shop</p>
          <p className="mt-4 max-w-xs text-sm text-neutral-300">
            Food, toys and care products for the pets that run your household.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {/* These two used `class` instead of `className`, so the flex
                alignment never applied and icon and text stacked. */}
            <li className="flex items-center gap-2 font-semibold">
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <a href="tel:+18005551234" className="hover:text-brand-400">
                +1 800 555 1234
              </a>
            </li>
            <li className="flex items-center gap-2 font-semibold">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <a href="mailto:hello@petsshop.com" className="hover:text-brand-400">
                hello@petsshop.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Categories</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-300">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products?category=${c.slug}`}
                  className="hover:text-brand-400"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-xl font-semibold">{column.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-[92%] max-w-7xl flex-wrap items-center justify-between gap-4 py-6">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Pet&apos;s Shop. Demo store built with
            Next.js.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-500"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="sr-only">
        Brands we stock: {brands.map((b) => b.name).join(', ')}
      </p>
    </footer>
  );
}
