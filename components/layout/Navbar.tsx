'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/#categories', label: 'Collection' },
  { href: '/#brands', label: 'Brands' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totals, ready, openDrawer } = useCart();

  /*
   * Only the home page has a dark hero behind the header, so only there can
   * the bar start transparent with white text. Everywhere else the page
   * background is white and the bar must be solid from the start — otherwise
   * it renders white-on-white and disappears.
   */
  const overHero = pathname === '/';
  const solid = scrolled || !overHero;

  /*
   * The previous version registered this listener with no dependency array
   * and no cleanup, so a new listener was added on every render and none
   * were ever removed. Empty deps + a cleanup fixes both; `passive` lets the
   * browser skip waiting on the handler before scrolling.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet on Escape, and stop the page scrolling behind it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        solid ? 'bg-white/95 py-3 shadow-md backdrop-blur-sm' : 'py-5'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex w-[92%] max-w-7xl items-center justify-between gap-6"
      >
        <Link
          href="/"
          className={`font-display text-3xl tracking-wide transition-colors ${
            solid ? 'text-ink' : 'text-white'
          }`}
        >
          Pet&apos;s Shop
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-semibold transition-colors hover:text-brand-500 ${
                  solid ? 'text-ink' : 'text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openDrawer}
            /* `ready` is false until the stored cart has been read, so the
               first client render matches the server's empty cart. */
            aria-label={
              ready
                ? `Cart, ${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'}`
                : 'Cart'
            }
            className={`relative flex size-11 items-center justify-center rounded-full transition-colors hover:bg-black/5 ${
              solid ? 'text-ink' : 'text-white'
            }`}
          >
            <ShoppingBag className="size-6" aria-hidden="true" />
            {ready && totals.itemCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[0.7rem] font-bold text-white tabular-nums"
              >
                {totals.itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`flex size-11 items-center justify-center rounded-full transition-colors hover:bg-black/5 lg:hidden ${
              solid ? 'text-ink' : 'text-white'
            }`}
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile sheet. The old one stayed in the tab order while off-screen
          because it was only shifted with -left-full; this unmounts instead. */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 size-full bg-black/50"
          />
          <div
            id="mobile-menu"
            className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-white p-6 shadow-xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-2xl text-ink">
                Pet&apos;s Shop
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full hover:bg-black/5"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
