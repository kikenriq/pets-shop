import type { Metadata } from 'next';
import CartView from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: 'Your cart',
  // A personal cart has nothing to index and shouldn't appear in results.
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartView />;
}
