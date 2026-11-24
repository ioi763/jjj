'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { useStore } from '@/components/store/StoreProvider';

const imageUrl = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=85`;

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [purchaseMode, setPurchaseMode] = useState<'once' | 'subscription'>('once');
  const [engraving, setEngraving] = useState('');
  const [added, setAdded] = useState(false);
  const { addItem } = useStore();
  const imageIds = [product.image, 'photo-1608571423902-eed4a5ad8108', 'photo-1594035910387-fea47794261f'];
  const isSample = product.id === 'sample-kit';
  const price = purchaseMode === 'subscription' ? Math.round(product.price * 0.85) : product.price;

  const addToCart = () => {
    addItem(product.id, 1, purchaseMode === 'subscription', engraving.trim());
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  return (
    <div className="bg-background pt-[76px]">
      <div className="mx-auto max-w-[1280px] px-6 py-8 sm:px-10"><nav aria-label="麵包屑" className="text-[10px] tracking-widest text-muted/70"><Link href="/">首頁</Link><span className="mx-3">/</span><Link href="/#collection">香氛系列</Link><span className="mx-3">/</span><span className="text-secondary">{product.name}</span></nav></div>
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 pb-20 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-28">
        <div>
          <motion.div key={activeImage} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${product.accent}`}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${imageUrl(imageIds[activeImage])}")` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/25 to-transparent" />
            <span className="absolute bottom-5 left-5 text-[9px] tracking-[0.24em] text-white/90">NANZHUANG BOTANICAL SCENT</span>
          </motion.div>
          <div className="mt-3 grid grid-cols-3 gap-3">{imageIds.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setActiveImage(index)} aria-label={`查看商品圖片 ${index + 1}`} aria-pressed={activeImage === index} className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${product.accent} ${activeImage === index ? 'ring-1 ring-secondary ring-offset-2' : 'opacity-70 hover:opacity-100'}`}><span className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${imageUrl(image)}")` }} /></button>)}</div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[10px] tracking-[0.28em] text-secondary/65">{product.english}</p>
          <h1 className="mt-4 font-serif text-3xl leading-relaxed tracking-[0.1em] text-ink md:text-4xl">{product.name}</h1>
          <p className="mt-5 text-sm leading-8 tracking-wide text-muted">{product.description}</p>
          <div className="mt-5 flex items-center gap-3"><span aria-label="五顆星" className="text-xs tracking-[0.15em] text-[#B88E59]">★★★★★</span><span className="text-[10px] text-muted">山城香氣・細緻調香</span></div>

          <div className="mt-8 border-y border-secondary/15 py-6"><h2 className="font-serif text-lg tracking-widest">香氣金字塔</h2><div className="mt-5 grid gap-4"><div className="grid grid-cols-[76px_1fr] items-start gap-3"><span className="pt-1 text-[9px] tracking-widest text-muted/65">TOP NOTES</span><div><p className="text-xs tracking-widest text-ink">{product.topNotes}</p><p className="mt-1 text-[10px] text-muted">前調・初次相遇的清新</p></div></div><div className="grid grid-cols-[76px_1fr] items-start gap-3"><span className="pt-1 text-[9px] tracking-widest text-muted/65">HEART NOTES</span><div><p className="text-xs tracking-widest text-ink">{product.heartNotes}</p><p className="mt-1 text-[10px] text-muted">中調・南庄金桂的柔美花韻</p></div></div><div className="grid grid-cols-[76px_1fr] items-start gap-3"><span className="pt-1 text-[9px] tracking-widest text-muted/65">BASE NOTES</span><div><p className="text-xs tracking-widest text-ink">{product.baseNotes}</p><p className="mt-1 text-[10px] text-muted">後調・安定而溫暖的餘韻</p></div></div></div>
            <div className="mt-6 flex flex-wrap gap-2">{product.situations.map((situation) => <span key={situation} className="border border-secondary/15 px-3 py-1.5 text-[9px] tracking-wider text-secondary">{situation}</span>)}</div>
          </div>

          {isSample && <div className="mt-6 border border-[#C6A779]/50 bg-[#F5EBE0]/60 p-5"><p className="font-serif text-sm tracking-wider text-secondary">試香體驗組｜NT$ 199 免運</p><p className="mt-2 text-xs leading-6 text-muted">完成訂單後，將收到 NT$ 199 官網正裝商品折抵券，折扣碼將寄送至您的 Email / LINE。</p></div>}

          {!isSample && <div className="mt-6"><p className="mb-3 text-[10px] tracking-widest text-muted">選擇購買方式</p><div className="grid grid-cols-2 gap-3"><button type="button" aria-pressed={purchaseMode === 'once'} onClick={() => setPurchaseMode('once')} className={`border p-4 text-left transition-colors ${purchaseMode === 'once' ? 'border-secondary bg-secondary/[0.04]' : 'border-secondary/15'}`}><span className="block text-xs text-ink">單次購買</span><span className="mt-2 block text-[10px] text-muted">NT$ {formatPrice(product.price)}</span></button><button type="button" aria-pressed={purchaseMode === 'subscription'} onClick={() => setPurchaseMode('subscription')} className={`border p-4 text-left transition-colors ${purchaseMode === 'subscription' ? 'border-secondary bg-secondary/[0.04]' : 'border-secondary/15'}`}><span className="block text-xs text-ink">每 2 個月定期配送</span><span className="mt-2 block text-[10px] text-secondary">享 85 折・NT$ {formatPrice(Math.round(product.price * 0.85))}</span></button></div></div>}

          <div className="mt-6"><label htmlFor="engraving" className="text-[10px] tracking-widest text-muted">瓶身刻字預覽（選填）</label><input id="engraving" value={engraving} onChange={(event) => setEngraving(event.target.value.slice(0, 14))} maxLength={14} placeholder="輸入姓名或祝福語，最多 14 字" className="mt-2 w-full border border-secondary/20 bg-white/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/40 focus:border-secondary"/><div className="mt-3 flex min-h-14 items-center justify-center border border-dashed border-secondary/20 bg-[#F4EFE7] px-3"><span className="font-serif text-lg tracking-[0.2em] text-secondary">{engraving || '南庄慢香'}</span></div></div>

          <div className="mt-7 flex items-end justify-between"><span className="text-[10px] tracking-widest text-muted">商品售價</span><span className="font-serif text-2xl tracking-wider text-ink">NT$ {formatPrice(price)}</span></div>
          <button type="button" onClick={addToCart} className="mt-5 w-full bg-secondary py-4 text-xs tracking-[0.2em] text-primary transition-colors hover:bg-[#3C5540]">{added ? '已加入購物車 ✓' : '加入購物車　＋'}</button>
          <p className="mt-3 text-center text-[9px] tracking-wider text-muted/65">滿 NT$ 1,500 享免運・消費累積桂花點數</p>
        </div>
      </div>
    </div>
  );
}
