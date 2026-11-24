import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '@/lib/articles';

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: '找不到文章｜南庄慢誌' };
  return { title: `${article.title}｜南庄慢誌`, description: article.excerpt, openGraph: { title: article.title, description: article.excerpt, type: 'article', publishedTime: article.date.replace(/\./g, '-') } };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  return (
    <article className="bg-background pb-24 pt-[76px]">
      <header className="mx-auto max-w-[900px] px-6 pb-10 pt-10 sm:px-10"><nav aria-label="麵包屑" className="text-[10px] tracking-widest text-muted/70"><Link href="/">首頁</Link><span className="mx-3">/</span><Link href="/journal">南庄慢誌</Link><span className="mx-3">/</span><span className="text-secondary">{article.category}</span></nav><p className="mt-9 text-[10px] tracking-[0.24em] text-secondary/70">{article.category}　·　{article.date}　·　閱讀 {article.readTime}</p><h1 className="mt-4 font-serif text-3xl leading-[1.7] tracking-[0.1em] text-ink sm:text-4xl">{article.title}</h1><p className="mt-5 text-sm leading-8 text-muted">{article.excerpt}</p></header>
      <div role="img" aria-label={article.title} className="mx-auto aspect-[16/8] max-h-[560px] max-w-[1200px] bg-cover bg-center" style={{ backgroundImage: `url("https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=1600&q=85"),url('/images/nanzhuang-landscape.svg')` }}/>
      <div className="mx-auto max-w-[760px] px-6 pt-12 sm:px-10">{article.content.map((paragraph) => <p key={paragraph} className="mb-6 text-[15px] leading-[2.2] tracking-wide text-muted">{paragraph}</p>)}<div className="mt-12 border-y border-secondary/15 py-6"><p className="font-serif text-lg tracking-wider text-secondary">循香而行，慢慢遇見南庄。</p><Link href="/journal" className="mt-4 inline-block text-[10px] tracking-widest text-secondary underline underline-offset-4">返回南庄慢誌 ↗</Link></div></div>
    </article>
  );
}
