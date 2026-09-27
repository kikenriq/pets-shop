import type { Metadata } from 'next';
import './globals.css';
import { bangers, nunito } from '@/lib/fonts';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/components/cart/CartProvider';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  // Resolved from the deploy platform — see lib/site.ts.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — High quality pet food & supplies`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    'Food, toys and care products for dogs, cats, birds and fish. Free shipping on orders over $50, 30-day returns.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — High quality pet food & supplies`,
    description:
      'Food, toys and care products for dogs, cats, birds and fish.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bangers.variable} ${nunito.variable}`}>
      <body>
        <CartProvider>
          <a
            href="#main"
            className="sr-only rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
