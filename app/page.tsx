'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import FragranceQuiz from '@/components/quiz/FragranceQuiz';
import { articles } from '@/lib/articles';
import { products, formatPrice } from '@/lib/products';

const moments = [
  { image: 'photo-1470252649378-9c29740c9fa8', title: '晨霧裡的桂花路', place: '南庄・山城日常', quote: '把山裡的清香，帶進每一個平常的早晨。' },
  { image: 'photo-1515377905703-c4788e51af15', title: '午後的一點留白', place: '慢下來的日子', quote: '淡淡的花香，像把旅行的心情留久一點。' },
  { image: 'photo-1470770841072-f978cf4d019e', title: '沿著山徑散步', place: '山林・植萃靈感', quote: '打開瓶蓋，就想起那天走過的山路。' },
  { image: 'photo-1519681393784-d120267933ba', title: '把夜晚交給山林', place: '日常香氣筆記', quote: '睡前聞到熟悉的木質調，心也跟著安靜了。' },
  { image: 'photo-1511988617509-a57c8a288659', title: '一起收集旅行氣味', place: '南庄・旅人手記', quote: '送給喜歡南庄的朋友，一份剛剛好的紀念。' },
];

const photo = (id: string, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const imageStyle = (id: string, width = 1200) => ({ backgroundImage: `url("${photo(id, width)}"), url("/images/nanzhuang-landscape.svg")`, backgroundSize: 'cover, cover', backgroundPosition: 'center, center' });

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  return (
    <>
      <section id="top" className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-[#394333] pt-[76px] md:min-h-[min(900px,100svh)]">
        <div className="absolute inset-0 -z-20 bg-cover bg-center" style={imageStyle('photo-1470252649378-9c29740c9fa8', 2200)} />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(28,38,28,0.78)_0%,rgba(34,45,34,0.56)_43%,rgba(34,45,34,0.08)_100%),linear-gradient(0deg,rgba(25,32,24,0.28),transparent_45%)]" />
        <svg aria-hidden="true" viewBox="0 0 1200 260" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[10%] h-40 w-full opacity-30 md:top-[16%] md:h-56"><path d="M-40 32 Q600 225 1240 32 M-40 32 L120 83 M80 62 L220 109 M210 98 L340 132 M350 132 L460 157 M480 163 L600 174 M620 174 L740 157 M760 151 L870 132 M900 122 L1020 95 M1040 85 L1200 32" fill="none" stroke="#F5EBE0" strokeWidth="1" /></svg>
        {!reduceMotion && Array.from({ length: 12 }, (_, i) => <motion.span key={i} aria-hidden="true" className="pointer-events-none absolute top-[-5%] z-0 h-2 w-2 rounded-full bg-[#F4E6BD]/75 blur-[1px]" style={{ left: `${8 + ((i * 17) % 86)}%` }} animate={{ y: ['0vh', '108vh'], x: [0, i % 2 ? 24 : -18, 5], rotate: [0, 160, 320], opacity: [0, 0.8, 0.65, 0] }} transition={{ duration: 9 + (i % 5) * 2, delay: (i % 7) * 1.5, repeat: Infinity, ease: 'linear' }} />)}
        <motion.div initial="hidden" animate="visible" variants={reveal} className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-28 pt-24 sm:px-10 md:pb-36 lg:px-20">
          <p className="mb-7 flex items-center gap-3 text-[10px] tracking-[0.34em] text-primary/80 sm:text-xs"><span className="h-px w-9 bg-primary/70" /> MIAOLI · TAIWAN · SLOW LIVING</p>
          <h1 className="max-w-[830px] font-serif text-[38px] leading-[1.65] tracking-[0.14em] text-[#FCF8F0] sm:text-5xl md:text-[64px] md:leading-[1.55]">漫步國際慢城，<br />將南庄的<span className="text-[#E9D3A6]">桂花清香</span><br className="hidden sm:block" />帶回家</h1>
          <p className="mt-7 max-w-md text-sm leading-8 tracking-[0.1em] text-white/75 sm:text-base">循著山霧與桂花香，收藏一段南庄的慢日子。<br className="hidden sm:block" />以客家植萃，寫下山城的氣味風景。</p>
          <div className="mt-10 flex flex-wrap gap-4"><a href="#collection" className="inline-flex items-center gap-5 bg-primary px-6 py-4 text-xs tracking-[0.2em] text-secondary transition-all hover:gap-8">探索香氛系列 <span aria-hidden="true">↗</span></a><a href="#quiz" className="inline-flex items-center gap-3 border border-primary/60 px-6 py-4 text-xs tracking-[0.2em] text-primary transition-colors hover:bg-primary/10">開始慢城尋香</a></div>
        </motion.div>
        <div className="absolute bottom-8 left-6 flex items-center gap-3 text-[9px] tracking-[0.24em] text-white/65 sm:left-10 lg:left-20"><span className="h-px w-9 bg-white/50" /> SCENT OF THE SLOW TOWN</div><div className="absolute bottom-8 right-6 text-[9px] tracking-[0.2em] text-white/65 sm:right-10 lg:right-20">24°35&apos; N　120°59&apos; E</div>
      </section>

      <section id="story" className="relative overflow-hidden bg-background px-6 py-24 sm:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal} className="relative md:pt-12">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#c7c0a8] md:mr-14"><div className="absolute inset-0 bg-cover bg-center" style={imageStyle('photo-1448375240586-882707db888b')} /><div className="absolute inset-0 bg-gradient-to-t from-secondary/45 via-transparent to-secondary/10" /><p className="absolute bottom-6 left-6 text-[10px] tracking-[0.28em] text-white">NANZHUANG · MIAOLI</p>
              <motion.div aria-hidden="true" className="absolute inset-0 overflow-hidden" animate={reduceMotion ? undefined : { backgroundPositionY: ['-15%', '120%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}><div className="absolute inset-x-[-30%] top-[28%] h-20 rounded-[50%] border border-white/25 blur-sm" /><div className="absolute inset-x-[-20%] top-[32%] h-24 rounded-[50%] border border-white/15 blur-md" /></motion.div>
            </div>
            <div className="absolute -bottom-7 right-0 max-w-[230px] bg-[#F1E8DA] p-6 shadow-soft md:right-0"><p className="font-serif text-sm leading-7 tracking-wider text-secondary">「慢慢走，讓山城的風替你說故事。」</p><p className="mt-3 text-[9px] tracking-[0.2em] text-muted">A NOTE FROM NANZHUANG</p></div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <p className="text-[10px] tracking-[0.32em] text-secondary/65">A PLACE THAT GROWS FRAGRANCE</p><h2 className="mt-5 font-serif text-[31px] leading-[1.7] tracking-[0.1em] text-ink sm:text-[38px]">山城的霧氣，<br />養出一縷桂花香。</h2>
            <p className="mt-6 text-sm leading-8 tracking-[0.04em] text-muted">南庄被層疊山巒環抱，潮潤的空氣隨四季流轉，孕育出香氣細緻的黃金桂。古法桂花釀講究花朵挑選、糖與花的比例，以及靜待香氣沉澱的時間；我們將這份耐心放進萃香工序，留住金桂清甜而柔和的層次。</p>
            <p className="mt-4 text-sm leading-8 tracking-[0.04em] text-muted">從水汴頭洗衫坑的潺潺水聲、乃木崎石階的緩步，到十三間老街的木窗與康濟吊橋上的山風，我們把這些慢活、慢遊的片刻，揉進東方植萃哲學。每一縷香氣，都是重新走回南庄的路。</p>
            <div className="mt-8 flex flex-wrap gap-2">{['水汴頭洗衫坑', '乃木崎石階', '十三間老街', '康濟吊橋'].map((place, index) => <span key={place} className={`border border-secondary/20 px-3 py-2 text-[9px] tracking-wider text-secondary ${index % 2 ? 'mt-2' : ''}`}>{place}</span>)}</div>
            <div className="mt-9 flex items-center gap-4"><span className="h-px w-10 bg-[#B88E59]" /><span className="text-[10px] tracking-[0.2em] text-secondary">山城風土・客家植萃・慢香日常</span></div>
          </motion.div>
        </div>
        <svg aria-hidden="true" viewBox="0 0 900 140" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 h-28 w-full text-secondary/10"><path d="M0 15 Q450 165 900 15 M0 15 L100 48 M100 48 L220 76 M220 76 L345 96 M345 96 L450 103 M450 103 L560 96 M560 96 L680 76 M680 76 L800 48 M800 48 L900 15" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
      </section>

      <section id="collection" className="bg-[#F1EADF] px-6 py-20 sm:px-10 md:py-28"><div className="mx-auto max-w-[1280px]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] tracking-[0.32em] text-secondary/65">BOTANICAL SCENTS OF NANZHUANG</p><h2 className="mt-4 font-serif text-3xl tracking-[0.14em] text-ink md:text-[38px]">把山城香氣，帶進日常</h2></div><a href="#journal" className="text-xs tracking-[0.15em] text-secondary transition-colors hover:text-[#9A7349]">慢慢探索　↗</a></motion.div>
        <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">{products.filter((product) => product.id !== 'sample-kit').map((product, index) => <motion.article key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: index * 0.08 } } }} whileHover={{ y: -7 }} className="group cursor-pointer"><Link href={`/products/${product.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"><div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${product.accent} shadow-[0_4px_20px_rgba(45,64,48,0.05)] transition-shadow duration-500 group-hover:shadow-[0_18px_44px_rgba(45,64,48,0.17)]`}><div className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]" style={imageStyle(product.image)} /><div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90"/><span className="absolute left-4 top-4 text-[9px] tracking-[0.2em] text-white/85">N° 0{index + 1}</span><span className="absolute bottom-4 right-4 translate-y-2 text-xs text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">了解香氣　↗</span></div><div className="flex items-start justify-between gap-2 pt-5"><div><h3 className="font-serif text-base tracking-[0.1em] text-ink">{product.name}</h3><p className="mt-2 text-[8px] tracking-[0.17em] text-muted/70">{product.english}</p></div><span className="whitespace-nowrap pt-1 text-[11px] text-muted">NT$ {formatPrice(product.price)}</span></div><p className="mt-3 text-xs leading-6 tracking-wide text-muted/85">{product.description.slice(0, 34)}…</p></Link></motion.article>)}</div>
        <div className="mt-10 flex justify-center"><Link href="/products/sample-kit" className="border border-secondary/35 px-6 py-3 text-xs tracking-[0.16em] text-secondary transition-colors hover:bg-secondary hover:text-primary">從 NT$ 199 試香體驗組開始　↗</Link></div>
      </div></section>

      <FragranceQuiz />

      <section id="journal" className="bg-background px-6 py-20 sm:px-10 md:py-28"><div className="mx-auto max-w-[1280px]"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] tracking-[0.32em] text-secondary/65">FIELD NOTES FROM NANZHUANG</p><h2 className="mt-4 font-serif text-3xl tracking-[0.14em] text-ink md:text-[38px]">南庄慢誌</h2></div><Link href="/journal" className="text-xs tracking-widest text-secondary">閱讀全部文章　↗</Link></div><div className="grid gap-6 md:grid-cols-3">{articles.map((article, index) => <Link key={article.slug} href={`/journal/${article.slug}`} className={`group ${index === 1 ? 'md:mt-10' : ''}`}><div className="relative aspect-[5/3] overflow-hidden bg-[#d5c8b4]"><div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={imageStyle(article.image)} /><span className="absolute left-4 top-4 bg-background/85 px-3 py-1.5 text-[9px] tracking-widest text-secondary">{article.category}</span></div><p className="mt-5 text-[9px] tracking-[0.16em] text-muted/65">{article.date}　·　閱讀 {article.readTime}</p><h3 className="mt-2 font-serif text-lg leading-8 tracking-wide text-ink transition-colors group-hover:text-secondary">{article.title}</h3><p className="mt-2 text-xs leading-6 text-muted">{article.excerpt}</p></Link>)}</div></div></section>

      <section id="social" className="bg-[#F1EADF] px-6 py-24 sm:px-10 md:py-32"><div className="mx-auto max-w-[1280px]"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="mb-12 text-center"><p className="text-[10px] tracking-[0.32em] text-secondary/65">SCENT STORIES, SHARED WITH LOVE</p><h2 className="mt-4 font-serif text-3xl tracking-[0.14em] text-ink md:text-[38px]">每一份喜歡，都有自己的香氣</h2><p className="mt-4 text-xs tracking-wider text-muted">來自南庄桂花香的靈感片段　<span className="text-secondary">#南庄桂花香</span></p></motion.div>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">{moments.map((moment, index) => <motion.article key={moment.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: (index % 3) * 0.09 } } }} className="mb-5 break-inside-avoid overflow-hidden bg-white shadow-[0_7px_28px_rgba(45,64,48,0.06)]"><div className={`relative overflow-hidden ${index % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}><div role="img" aria-label={moment.title} className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style={imageStyle(moment.image, 950)} /><span className="absolute left-4 top-4 bg-background/80 px-3 py-1.5 text-[9px] tracking-[0.17em] text-secondary backdrop-blur-sm">{moment.place}</span></div><div className="p-5"><p className="font-serif text-sm leading-7 tracking-wide text-ink">「{moment.quote}」</p><div className="mt-4 flex items-center justify-between border-t border-secondary/10 pt-3"><span className="text-[9px] tracking-[0.15em] text-muted/70">香氣生活靈感示意</span><span aria-label="五顆星" className="text-[10px] tracking-[0.18em] text-[#B88E59]">★★★★★</span></div></div></motion.article>)}</div><p className="mt-8 text-center text-[10px] leading-6 tracking-wide text-muted/60">照片與評價文字為示意內容；正式上線可替換為經顧客授權的社群分享。</p>
      </div></section>

      <section id="discovery" className="relative isolate overflow-hidden bg-secondary px-6 py-16 text-center sm:px-10 md:py-20"><div className="absolute inset-0 -z-10 opacity-20" style={imageStyle('photo-1448375240586-882707db888b')} /><p className="text-[10px] tracking-[0.32em] text-primary/65">A LITTLE SCENT, A LONG JOURNEY</p><h2 className="mt-4 font-serif text-2xl tracking-[0.12em] text-primary sm:text-3xl">從一縷桂花香，開始你的南庄漫遊。</h2><Link href="/products/sample-kit" className="mt-8 inline-flex border border-primary/60 px-7 py-3.5 text-xs tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-secondary">選一份山城香氣　↗</Link></section>
    </>
  );
}
