'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type CartLine = { key: string; productId: string; quantity: number; subscription: boolean; engraving: string };
export type Locale = 'zh' | 'en' | 'ja';

type StoreContextValue = {
  cart: CartLine[];
  cartCount: number;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  addItem: (productId: string, quantity?: number, subscription?: boolean, engraving?: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  setSubscription: (key: string, subscription: boolean) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [locale, setLocaleState] = useState<Locale>('zh');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem('nanzhuang-cart');
      const savedLocale = window.localStorage.getItem('nanzhuang-locale') as Locale | null;
      if (savedCart) setCart(JSON.parse(savedCart) as CartLine[]);
      if (savedLocale && ['zh', 'en', 'ja'].includes(savedLocale)) {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale === 'zh' ? 'zh-Hant' : savedLocale;
      }
    } catch {
      window.localStorage.removeItem('nanzhuang-cart');
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem('nanzhuang-cart', JSON.stringify(cart));
  }, [cart, hydrated]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem('nanzhuang-locale', nextLocale);
    document.documentElement.lang = nextLocale === 'zh' ? 'zh-Hant' : nextLocale === 'ja' ? 'ja' : 'en';
  }, []);

  const addItem = useCallback((productId: string, quantity = 1, subscription = false, engraving = '') => {
    const key = `${productId}:${subscription ? 'subscription' : 'single'}:${engraving}`;
    setCart((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) return current.map((line) => line.key === key ? { ...line, quantity: line.quantity + quantity } : line);
      return [...current, { key, productId, quantity, subscription, engraving }];
    });
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((current) => current.map((line) => line.key === key ? { ...line, quantity } : line));
  }, []);
  const setSubscription = useCallback((key: string, subscription: boolean) => setCart((current) => {
    const target = current.find((line) => line.key === key);
    if (!target) return current;
    const nextKey = `${target.productId}:${subscription ? 'subscription' : 'single'}:${target.engraving}`;
    const duplicate = current.find((line) => line.key === nextKey && line.key !== key);
    if (duplicate) return current.filter((line) => line.key !== key).map((line) => line.key === nextKey ? { ...line, quantity: line.quantity + target.quantity } : line);
    return current.map((line) => line.key === key ? { ...line, key: nextKey, subscription } : line);
  }), []);
  const removeItem = useCallback((key: string) => setCart((current) => current.filter((line) => line.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(() => ({ cart, cartCount: cart.reduce((total, line) => total + line.quantity, 0), locale, setLocale, addItem, setQuantity, setSubscription, removeItem, clearCart }), [cart, locale, setLocale, addItem, setQuantity, setSubscription, removeItem, clearCart]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
}
