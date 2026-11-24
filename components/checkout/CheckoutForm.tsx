'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useStore } from '@/components/store/StoreProvider';
import { formatPrice, products } from '@/lib/products';

const checkoutSchema = z.object({
  recipient: z.string().trim().min(2, '請填寫收件人姓名。'),
  phone: z.string().regex(/^09\d{8}$/, '請輸入 09 開頭的 10 碼手機號碼。'),
  email: z.string().email('請輸入有效的 Email 地址。'),
  shipping: z.enum(['home', 'store']),
  address: z.string().optional(),
  retailer: z.enum(['7-11', '全家']).optional(),
  store: z.string().optional(),
  payment: z.enum(['card', 'linepay', '街口支付', 'applepay']),
}).superRefine((values, context) => {
  if (values.shipping === 'home' && (values.address?.trim().length ?? 0) < 6) context.addIssue({ code: z.ZodIssueCode.custom, path: ['address'], message: '請輸入完整的宅配地址。' });
  if (values.shipping === 'store' && !values.store) context.addIssue({ code: z.ZodIssueCode.custom, path: ['store'], message: '請選擇超商門市。' });
});

type CheckoutValues = z.infer<typeof checkoutSchema>;
const fieldClass = 'mt-2 w-full border border-secondary/20 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/40 focus:border-secondary';

export default function CheckoutForm() {
  const { cart, setQuantity, setSubscription, removeItem, clearCart } = useStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema), defaultValues: { shipping: 'home', payment: 'card', retailer: '7-11' },
  });
  const shipping = watch('shipping');
  const retailer = watch('retailer');
  const lines = useMemo(() => cart.map((line) => ({ ...line, product: products.find((product) => product.id === line.productId) })).filter((line) => line.product), [cart]);
  const subtotal = lines.reduce((sum, line) => sum + (line.product!.price * (line.subscription ? 0.85 : 1) * line.quantity), 0);
  const shippingCost = shipping === 'store' || subtotal >= 1500 || cart.some((line) => line.productId === 'sample-kit') ? 0 : subtotal > 0 ? 80 : 0;
  const discount = couponApplied ? Math.min(199, subtotal) : 0;
  const total = Math.max(0, subtotal + shippingCost - discount);
  const points = Math.floor(Math.max(0, subtotal - discount) / 100);

  const applyCoupon = () => {
    if (['NANZHUANG199', 'SAMPLE199'].includes(couponInput.trim().toUpperCase())) {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('請輸入有效的試香折抵碼，例如 NANZHUANG199。');
    }
  };

  const onSubmit = (_values: CheckoutValues) => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) return <section className="mx-auto max-w-[700px] px-6 py-28 text-center sm:px-10"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl text-primary">✓</span><p className="mt-8 text-[10px] tracking-[0.28em] text-secondary/65">ORDER RECEIVED</p><h1 className="mt-4 font-serif text-3xl tracking-widest text-ink">謝謝你，山城香氣正準備出發。</h1><p className="mt-5 text-sm leading-8 text-muted">這是展示用結帳流程，訂單已在畫面中建立確認。正式收款、配送與 Email / LINE 通知尚需串接服務商。</p><Link href="/" className="mt-8 inline-flex bg-secondary px-7 py-4 text-xs tracking-widest text-primary">回到南庄慢香</Link></section>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid max-w-[1280px] gap-10 px-6 pb-24 pt-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div className="space-y-10">
        <section><div className="mb-5 flex items-end justify-between"><div><p className="text-[10px] tracking-[0.25em] text-secondary/65">YOUR SELECTION</p><h2 className="mt-2 font-serif text-2xl tracking-widest text-ink">購物車明細</h2></div><Link href="/#collection" className="text-[10px] tracking-widest text-secondary underline underline-offset-4">繼續購物</Link></div>
          {lines.length === 0 ? <div className="border border-dashed border-secondary/25 bg-white/45 px-6 py-10 text-center"><p className="font-serif text-lg text-ink">購物車還沒有香氣。</p><p className="mt-2 text-xs text-muted">挑選一份山城香氣，開始你的慢日常。</p><Link href="/#collection" className="mt-5 inline-block bg-secondary px-6 py-3 text-[10px] tracking-widest text-primary">探索香氛系列</Link></div> : <div className="divide-y divide-secondary/15 border-y border-secondary/15">{lines.map((line) => <div key={line.key} className="grid grid-cols-[84px_1fr_auto] gap-4 py-5"><div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${line.product!.accent}`}><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("https://images.unsplash.com/${line.product!.image}?auto=format&fit=crop&w=360&q=75"),url('/images/nanzhuang-landscape.svg')` }}/></div><div><Link href={`/products/${line.product!.slug}`} className="font-serif text-sm tracking-wide text-ink hover:text-secondary">{line.product!.name}</Link><p className="mt-1 text-[10px] text-muted">NT$ {formatPrice(line.product!.price)}{line.subscription && <span className="ml-2 text-secondary">定期配送 85 折</span>}</p>{line.engraving && <p className="mt-1 text-[10px] text-muted">刻字：{line.engraving}</p>}{line.product!.id !== 'sample-kit' && <label className="mt-2 flex items-center gap-2 text-[9px] text-secondary"><input type="checkbox" checked={line.subscription} onChange={(event) => setSubscription(line.key, event.target.checked)} className="accent-secondary"/>每 2 個月配送・享 85 折</label>}<div className="mt-3 flex items-center gap-3"><button type="button" aria-label="減少數量" onClick={() => line.quantity === 1 ? removeItem(line.key) : setQuantity(line.key, line.quantity - 1)} className="h-6 w-6 border border-secondary/20 text-xs">−</button><span className="min-w-4 text-center text-xs">{line.quantity}</span><button type="button" aria-label="增加數量" onClick={() => setQuantity(line.key, line.quantity + 1)} className="h-6 w-6 border border-secondary/20 text-xs">＋</button><button type="button" onClick={() => removeItem(line.key)} className="ml-2 text-[9px] text-muted underline underline-offset-2">移除</button></div></div><p className="text-xs text-ink">NT$ {formatPrice(Math.round(line.product!.price * (line.subscription ? 0.85 : 1) * line.quantity))}</p></div>)}</div>}
          <div className="mt-5 flex gap-2"><label htmlFor="coupon" className="sr-only">折扣碼</label><input id="coupon" value={couponInput} onChange={(event) => setCouponInput(event.target.value)} placeholder="輸入折扣碼" className="min-w-0 flex-1 border border-secondary/20 bg-white/60 px-4 py-3 text-xs outline-none focus:border-secondary"/><button type="button" onClick={applyCoupon} className="border border-secondary px-5 text-[10px] tracking-widest text-secondary hover:bg-secondary hover:text-primary">{couponApplied ? '已套用' : '套用'}</button></div>{couponApplied && <p className="mt-2 text-[10px] text-secondary">試香折抵碼已套用：折抵 NT$ 199。</p>}{couponError && <p role="alert" className="mt-2 text-[10px] text-red-700">{couponError}</p>}
        </section>

        <section><p className="text-[10px] tracking-[0.25em] text-secondary/65">DELIVERY DETAILS</p><h2 className="mt-2 font-serif text-2xl tracking-widest text-ink">收件資料</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-[10px] tracking-wider text-muted">收件人姓名<input {...register('recipient')} placeholder="姓名" className={fieldClass}/>{errors.recipient && <span role="alert" className="mt-1 block text-red-700">{errors.recipient.message}</span>}</label><label className="text-[10px] tracking-wider text-muted">手機號碼<input {...register('phone')} inputMode="tel" placeholder="09XXXXXXXX" className={fieldClass}/>{errors.phone && <span role="alert" className="mt-1 block text-red-700">{errors.phone.message}</span>}</label><label className="text-[10px] tracking-wider text-muted sm:col-span-2">Email 地址<input {...register('email')} type="email" placeholder="name@example.com" className={fieldClass}/>{errors.email && <span role="alert" className="mt-1 block text-red-700">{errors.email.message}</span>}</label></div>
          <fieldset className="mt-7"><legend className="text-[10px] tracking-widest text-muted">選擇物流方式</legend><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className={`cursor-pointer border p-4 text-xs ${shipping === 'home' ? 'border-secondary bg-secondary/[0.04]' : 'border-secondary/15'}`}><input type="radio" value="home" {...register('shipping')} className="mr-2 accent-secondary"/>宅配到府</label><label className={`cursor-pointer border p-4 text-xs ${shipping === 'store' ? 'border-secondary bg-secondary/[0.04]' : 'border-secondary/15'}`}><input type="radio" value="store" {...register('shipping')} className="mr-2 accent-secondary"/>超商取貨</label></div></fieldset>
          {shipping === 'home' ? <label className="mt-4 block text-[10px] tracking-wider text-muted">宅配地址<input {...register('address')} placeholder="縣市、區域、街道、門牌" className={fieldClass}/>{errors.address && <span role="alert" className="mt-1 block text-red-700">{errors.address.message}</span>}</label> : <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-[10px] tracking-wider text-muted">超商品牌<select {...register('retailer')} className={fieldClass}><option value="7-11">7-ELEVEN</option><option value="全家">全家 FamilyMart</option></select></label><label className="text-[10px] tracking-wider text-muted">門市選擇<select {...register('store')} className={fieldClass}><option value="">請選擇 Mock 門市</option>{(retailer === '7-11' ? ['南庄門市', '苗栗高鐵門市', '竹南山佳門市'] : ['南庄桂花門市', '苗栗車站門市', '竹南海口門市']).map((store) => <option key={store} value={store}>{store}（示意）</option>)}</select>{errors.store && <span role="alert" className="mt-1 block text-red-700">{errors.store.message}</span>}<span className="mt-1 block text-[9px] text-muted/60">門市清單為介面示意，尚未連接物流商。</span></label></div>}
        </section>

        <section><p className="text-[10px] tracking-[0.25em] text-secondary/65">PAYMENT</p><h2 className="mt-2 font-serif text-2xl tracking-widest text-ink">付款方式</h2><fieldset className="mt-5 grid gap-3 sm:grid-cols-2"><legend className="sr-only">選擇付款方式</legend>{[['card', '信用卡', 'Visa / Master / JCB'], ['linepay', 'LINE Pay', '安全快速付款'], ['街口支付', '街口支付', '行動支付'], ['applepay', 'Apple Pay', '快速結帳']].map(([value, title, hint]) => <label key={value} className="flex cursor-pointer items-center gap-3 border border-secondary/15 bg-white/45 p-4 text-xs has-[:checked]:border-secondary has-[:checked]:bg-secondary/[0.04]"><input type="radio" value={value} {...register('payment')} className="accent-secondary"/><span><span className="block text-ink">{title}</span><span className="mt-1 block text-[9px] text-muted">{hint}</span></span></label>)}</fieldset></section>

        <section><p className="text-[10px] tracking-[0.25em] text-secondary/65">MEMBER PERKS</p><h2 className="mt-2 font-serif text-2xl tracking-widest text-ink">會員快速登入</h2><p className="mt-2 text-xs text-muted">登入後可累積桂花點數、收到生日禮金與訂單通知。</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => setLoginMessage('LINE 登入為展示互動，正式使用需設定 LINE Login Channel。')} className="border border-[#06C755]/35 px-5 py-3 text-[10px] tracking-wider text-secondary hover:bg-[#06C755]/5">LINE 一鍵登入</button><button type="button" onClick={() => setLoginMessage('Google 登入為展示互動，正式使用需設定 OAuth 憑證。')} className="border border-secondary/20 px-5 py-3 text-[10px] tracking-wider text-muted hover:bg-white">Google 帳號登入</button></div>{loginMessage && <p role="status" className="mt-2 text-[10px] text-muted">{loginMessage}</p>}</section>
      </div>

      <aside className="h-fit border border-secondary/15 bg-white/55 p-6 lg:sticky lg:top-28"><p className="text-[10px] tracking-[0.25em] text-secondary/65">ORDER SUMMARY</p><h2 className="mt-2 font-serif text-2xl tracking-widest text-ink">訂單摘要</h2><div className="mt-6 space-y-4 border-b border-secondary/15 pb-5 text-xs"><div className="flex justify-between text-muted"><span>商品小計</span><span>NT$ {formatPrice(Math.round(subtotal))}</span></div><div className="flex justify-between text-muted"><span>定期配送優惠</span><span>{lines.some((line) => line.subscription) ? '已享 85 折' : '—'}</span></div><div className="flex justify-between text-muted"><span>折扣碼</span><span>{discount ? `− NT$ ${formatPrice(discount)}` : '—'}</span></div><div className="flex justify-between text-muted"><span>運費</span><span>{shippingCost === 0 ? '免運' : `NT$ ${shippingCost}`}</span></div></div><div className="flex justify-between py-5"><span className="text-xs tracking-wider text-ink">應付金額</span><span className="font-serif text-xl text-ink">NT$ {formatPrice(Math.round(total))}</span></div><div className="border border-[#C6A779]/35 bg-[#F5EBE0]/50 p-4"><p className="text-[10px] tracking-wider text-secondary">桂花點數回饋試算</p><p className="mt-2 text-xs leading-6 text-muted">本次預計獲得 <strong className="font-medium text-secondary">{points} 點</strong>，每消費 NT$ 100 累積 1 點。</p><p className="mt-2 text-[10px] leading-5 text-muted/75">會員生日當月可領取生日禮金，完成會員綁定後即可查看。</p></div><button type="submit" disabled={lines.length === 0} className="mt-6 w-full bg-secondary py-4 text-xs tracking-[0.18em] text-primary transition-colors hover:bg-[#3C5540] disabled:cursor-not-allowed disabled:opacity-40">確認訂單・NT$ {formatPrice(Math.round(total))}</button><p className="mt-3 text-center text-[9px] leading-5 text-muted/60">展示用流程不會實際收款或建立物流訂單。<br/>正式上線前請串接金流與物流服務。</p></aside>
    </form>
  );
}
