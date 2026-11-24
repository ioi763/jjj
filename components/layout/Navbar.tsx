'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useStore, type Locale } from '@/components/store/StoreProvider';

const navItems: Record<Locale, { label: string; href: string }[]> = {
  zh: [{ label: '品牌故事', href: '/#story' }, { label: '香氛系列', href: '/#collection' }, { label: '慢城尋香', href: '/#quiz' }, { label: '試香體驗組', href: '/products/sample-kit' }, { label: '南庄慢誌', href: '/journal' }],
  en: [{ label: 'Our story', href: '/#story' }, { label: 'Fragrances', href: '/#collection' }, { label: 'Scent quiz', href: '/#quiz' }, { label: 'Discovery set', href: '/products/sample-kit' }, { label: 'Journal', href: '/journal' }],
  ja: [{ label: 'ブランド物語', href: '/#story' }, { label: '香りのコレクション', href: '/#collection' }, { label: '香り診断', href: '/#quiz' }, { label: 'お試しセット', href: '/products/sample-kit' }, { label: '山城だより', href: '/journal' }],
};

function CartIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 4.5h2l2.1 10.1a1.8 1.8 0 0 0 1.8 1.4h8.1a1.8 1.8 0 0 0 1.7-1.3l1.4-6.2H6.2"/><circle cx="9.5" cy="19.5" r="1"/><circle cx="18" cy="19.5" r="1"/></svg>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, locale, setLocale } = useStore();
  const items = navItems[locale];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <Link href="/" aria-label="南庄慢香首頁" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/25 text-secondary transition-colors group-hover:bg-secondary group-hover:text-primary"><svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"><path d="M16 26V13m0 6c-5 0-8-3-8-8 5 0 8 3 8 8Zm0-4c0-5 3-8 8-8 0 5-3 8-8 8Z"/><path d="M11 27h10"/></svg></span>
          <span className="leading-none"><span className="block font-serif text-[17px] tracking-[0.18em] text-secondary">南庄慢香</span><span className="mt-1.5 block text-[8px] tracking-[0.27em] text-muted">NANZHUANG FRAGRANCE</span></span>
        </Link>

        <nav aria-label="主要導覽" className="hidden items-center gap-6 xl:flex">{items.map((item) => <Link key={item.href} href={item.href} className="whitespace-nowrap text-[12px] tracking-[0.08em] text-muted transition-colors hover:text-secondary">{item.label}</Link>)}</nav>

        <div className="hidden items-center gap-4 xl:flex">
          <div aria-label="語系切換" className="flex items-center gap-1 text-[10px] tracking-widest text-muted">{(['zh', 'en', 'ja'] as Locale[]).map((code, index) => <span key={code} className="flex items-center gap-1"><button type="button" aria-pressed={locale === code} onClick={() => setLocale(code)} className={`px-1 py-2 transition-colors ${locale === code ? 'font-semibold text-secondary' : 'hover:text-secondary'}`}>{code === 'zh' ? '中' : code.toUpperCase()}</button>{index < 2 && <span className="text-secondary/25">/</span>}</span>)}</div>
          <Link href="/checkout" aria-label={`購物車，目前 ${cartCount} 件商品`} className="relative text-secondary transition-transform hover:scale-105"><CartIcon />{cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#B98962] px-1 text-[9px] leading-none text-white">{cartCount > 99 ? '99+' : cartCount}</span>}</Link>
        </div>

        <div className="flex items-center gap-4 xl:hidden">
          <Link href="/checkout" aria-label={`購物車，目前 ${cartCount} 件商品`} className="relative text-secondary"><CartIcon />{cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B98962] px-1 text-[9px] text-white">{cartCount}</span>}</Link>
          <button type="button" aria-label={isOpen ? '關閉選單' : '開啟選單'} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] text-secondary"><span className={`h-px w-5 bg-current transition-transform ${isOpen ? 'translate-y-[3px] rotate-45' : ''}`} /><span className={`h-px w-5 bg-current transition-transform ${isOpen ? '-translate-y-[3px] -rotate-45' : ''}`} /></button>
        </div>
      </div>

      <div className={`overflow-hidden border-t border-secondary/10 bg-background/95 backdrop-blur-xl transition-all duration-300 xl:hidden ${isOpen ? 'max-h-[560px] opacity-100' : 'max-h-0 border-transparent opacity-0'}`}>
        <nav aria-label="手機導覽" className="mx-auto flex max-w-[1440px] flex-col px-7 pb-6 pt-2">{items.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="border-b border-secondary/10 py-4 font-serif text-lg text-secondary"><span className="mr-4 text-[10px] tracking-widest text-muted/60">0{index + 1}</span>{item.label}</Link>)}
          <div className="flex items-center gap-3 pt-5 text-xs tracking-widest text-muted" aria-label="語系切換">語言：{(['zh', 'en', 'ja'] as Locale[]).map((code) => <button key={code} type="button" aria-pressed={locale === code} onClick={() => setLocale(code)} className={`border-b pb-1 ${locale === code ? 'border-secondary text-secondary' : 'border-transparent'}`}>{code === 'zh' ? '中' : code.toUpperCase()}</button>)}</div>
        </nav>
      </div>
    </header>
  );
}
