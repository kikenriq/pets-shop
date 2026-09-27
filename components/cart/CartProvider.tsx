'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { products } from '@/data/catalog';
import {
  CART_STORAGE_KEY,
  calculateTotals,
  cartReducer,
  parseStoredCart,
  resolveCart,
  type CartAction,
  type CartItem,
  type CartTotals,
} from '@/lib/cart';
import type { CartLine } from '@/lib/types';

interface CartContextValue {
  items: CartItem[];
  totals: CartTotals;
  /** False until the stored cart has been read, to avoid a hydration mismatch. */
  ready: boolean;
  drawerOpen: boolean;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

interface CartState {
  lines: CartLine[];
  hydrated: boolean;
}

/**
 * Thin wrapper over the pure `cartReducer`, adding only the hydrated flag.
 * Keeping the flag in reducer state (rather than a separate useState set from
 * an effect) means the effect below just dispatches, which is both simpler and
 * what react-hooks/set-state-in-effect is asking for.
 */
function reducer(state: CartState, action: CartAction): CartState {
  if (action.type === 'hydrate') {
    return { lines: action.lines, hydrated: true };
  }
  return { ...state, lines: cartReducer(state.lines, action) };
}

const INITIAL: CartState = { lines: [], hydrated: false };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { lines, hydrated } = state;

  // Read once on mount. The server has no localStorage, so the first client
  // render must match the server's empty cart and only then hydrate.
  useEffect(() => {
    let stored: CartLine[] = [];
    try {
      stored = parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY));
    } catch {
      // Private mode or blocked storage: carry on with an empty cart.
    }
    dispatch({ type: 'hydrate', lines: stored });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage full or unavailable — the cart still works for this session.
    }
  }, [lines, hydrated]);

  const items = useMemo(() => resolveCart(lines, products), [lines]);
  const totals = useMemo(() => calculateTotals(items), [items]);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const add = useCallback((productId: string, quantity = 1) => {
    dispatch({ type: 'add', productId, quantity });
    setDrawerOpen(true);
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'setQuantity', productId, quantity });
  }, []);

  const remove = useCallback((productId: string) => {
    dispatch({ type: 'remove', productId });
  }, []);

  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo(
    () => ({
      items,
      totals,
      ready: hydrated,
      drawerOpen,
      add,
      setQuantity,
      remove,
      clear,
      openDrawer,
      closeDrawer,
    }),
    [
      items,
      totals,
      hydrated,
      drawerOpen,
      add,
      setQuantity,
      remove,
      clear,
      openDrawer,
      closeDrawer,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
