import type { Metadata } from 'next';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export const metadata: Metadata = {
  title: '購物車與結帳｜南庄慢香',
  description: '確認南庄慢香訂單、收件資訊與付款方式。',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <div className="min-h-[70vh] bg-background pt-[76px]"><header className="mx-auto max-w-[1280px] px-6 pt-10 sm:px-10"><p className="text-[10px] tracking-[0.28em] text-secondary/65">A SLOW SCENT, ON ITS WAY</p><h1 className="mt-3 font-serif text-3xl tracking-[0.14em] text-ink">購物車與結帳</h1></header><CheckoutForm/></div>;
}
