import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '南庄慢誌｜山城香氣與慢遊提案',
  description: '從古法桂花釀、室內香氛指南到南庄散步地圖，讀一段山城日常。',
  openGraph: { title: '南庄慢誌｜南庄慢香', description: '以香氣記錄南庄慢活日常。', type: 'website' },
};

export default function JournalPage() {
  return (
    <div className="bg-background pb-24 pt-[76px]">
      <section className="relative isolate overflow-hidden bg-secondary px-6 py-24 text-center text-primary sm:px-10 md:py-32"><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(34,48,35,0.91),rgba(45,64,48,0.58)),url('/images/nanzhuang-landscape.svg')] bg-cover bg-center"/><p className="text-[10px] tracking-[0.32em] text-primary/65">FIELD NOTES FROM NANZHUANG</p><h1 className="mt-5 font-serif text-4xl tracking-[0.16em] md:text-5xl">南庄慢誌</h1><p className="mx-auto mt-5 max-w-lg text-sm leading-8 tracking-wider text-primary/75">讀一段山城日常，循著桂花與木質香，慢慢認識南庄。</p></section>
      <section className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 md:py-20"><div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{articles.map((article, index) => <article key={article.slug} className={index === 1 ? 'lg:mt-10' : ''}><Link href={`/journal/${article.slug}`} className="group block"><div className="relative aspect-[4/3] overflow-hidden bg-[#d9cfbd]"><div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=1000&q=85"),url('/images/nanzhuang-landscape.svg')` }}/><span className="absolute left-4 top-4 bg-background/85 px-3 py-1.5 text-[9px] tracking-widest text-secondary">{article.category}</span></div><p className="mt-5 text-[9px] tracking-[0.16em] text-muted/65">{article.date}　·　閱讀 {article.readTime}</p><h2 className="mt-2 font-serif text-lg leading-8 tracking-wide text-ink transition-colors group-hover:text-secondary">{article.title}</h2><p className="mt-3 text-xs leading-6 text-muted">{article.excerpt}</p><span className="mt-4 inline-block text-[10px] tracking-widest text-secondary">閱讀文章　↗</span></Link></article>)}</div></section>
    </div>
  );
}
