import { Bangers, Nunito_Sans } from 'next/font/google';

/**
 * Self-hosted by Next at build time. The old index.html also pulled in
 * Carter One, which was downloaded on every page load and never used —
 * dropped here.
 */
export const bangers = Bangers({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-bangers',
});

export const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-nunito',
});
