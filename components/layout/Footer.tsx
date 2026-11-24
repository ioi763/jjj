import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary/80">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-14 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr] md:py-16 lg:px-14">
        <div><Link href="/" className="font-serif text-xl tracking-[0.18em] text-primary">南庄慢香</Link><p className="mt-3 text-[10px] tracking-[0.25em] text-primary/55">NANZHUANG FRAGRANCE</p><p className="mt-6 max-w-xs text-sm leading-7 text-primary/70">以山城風土與客家植萃，收藏一段桂花盛開的慢日常。</p></div>
        <div><h2 className="text-[10px] tracking-editorial text-primary/50">EXPLORE</h2><div className="mt-5 grid gap-3 text-sm"><Link href="/#story" className="transition-colors hover:text-white">品牌故事</Link><Link href="/#collection" className="transition-colors hover:text-white">香氛系列</Link><Link href="/journal" className="transition-colors hover:text-white">南庄慢誌</Link></div></div>
        <div><h2 className="text-[10px] tracking-editorial text-primary/50">VISIT & CONNECT</h2><p className="mt-5 text-sm leading-7">苗栗縣南庄鄉<br/>在山城，慢慢遇見香氣。</p><a href="mailto:hello@nanzhuangfragrance.tw" className="mt-3 inline-block text-sm transition-colors hover:text-white">hello@nanzhuangfragrance.tw</a></div>
      </div>
      <div className="border-t border-primary/15 px-6 py-5 text-center text-[10px] tracking-wider text-primary/50">© 2026 NANZHUANG FRAGRANCE. ALL RIGHTS RESERVED.</div>
    </footer>
  );
}
