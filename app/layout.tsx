import type { Metadata } from 'next';
import './globals.css';
import { bangers, nunito } from '@/lib/fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://pets-shop.example.com'),
  title: {
    default: "Pet's Shop — High quality pet food & supplies",
    template: "%s · Pet's Shop",
  },
  description:
    'Food, toys and care products for dogs, cats, birds and fish. Free shipping on orders over $50, 30-day returns.',
  openGraph: {
    type: 'website',
    siteName: "Pet's Shop",
    title: "Pet's Shop — High quality pet food & supplies",
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
        <a
          href="#main"
          className="sr-only rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
