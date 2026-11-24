'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/components/store/StoreProvider';
import { products } from '@/lib/products';

const questions = [
  { title: '最理想的慢旅下午？', options: ['在康濟吊橋上感受微風', '漫步十三間老街喝手沖咖啡', '靜坐聽洗衫坑流水聲'] },
  { title: '希望香氣帶來什麼感覺？', options: ['寧靜放鬆', '清新煥發', '溫暖沉穩'] },
  { title: '平常最常擺放香氛的空間？', options: ['臥室床頭', '客廳工作桌', '隨身攜帶'] },
];

const recommendations: Record<string, { productId: string; title: string; detail: string }> = {
  A: { productId: 'home-diffuser', title: '山城桂花室內擴香', detail: '讓山風與花香輕輕留在你的空間。' },
  B: { productId: 'osmanthus-perfume', title: '桂花原精淡香水', detail: '以清透金桂陪伴每一段專注日常。' },
  C: { productId: 'body-lotion', title: '桂花潤膚乳', detail: '以溫柔花木香，為日常留一段安定時光。' },
};

export default function FragranceQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [complete, setComplete] = useState(false);
  const { addItem } = useStore();
  const scores = useMemo(() => answers.reduce((sum, answer) => { const next = [...sum]; next[answer] += 1; return next; }, [0, 0, 0]), [answers]);
  const resultKey = (['A', 'B', 'C'] as const)[scores.indexOf(Math.max(...scores))];
  const recommendation = recommendations[resultKey];
  const product = products.find((item) => item.id === recommendation.productId)!;

  const choose = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const nextAnswers = [...answers, index];
    window.setTimeout(() => {
      setAnswers(nextAnswers);
      setSelected(null);
      if (nextAnswers.length === questions.length) setComplete(true);
    }, 480);
  };

  const restart = () => { setAnswers([]); setSelected(null); setComplete(false); };

  return (
    <section id="quiz" className="bg-[#F1EADF] px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-[900px]">
        <div className="text-center"><p className="text-[10px] tracking-[0.32em] text-secondary/65">FIND YOUR NANZHUANG SCENT</p><h2 className="mt-4 font-serif text-3xl tracking-[0.13em] text-ink md:text-[38px]">慢城尋香測驗</h2><p className="mt-4 text-xs tracking-wider text-muted">三個小問題，找到適合你的南庄氣息。</p></div>
        <div className="mt-10 border border-secondary/15 bg-background/80 px-5 py-8 sm:px-10 sm:py-10">
          {!complete ? <>
            <div className="mb-7 flex items-center justify-between"><p className="text-[10px] tracking-[0.2em] text-muted">QUESTION {answers.length + 1} / {questions.length}</p><div className="flex gap-1.5">{questions.map((question, index) => <span key={question.title} className={`h-1 w-8 transition-colors ${index <= answers.length ? 'bg-secondary' : 'bg-secondary/15'}`} />)}</div></div>
            <AnimatePresence mode="wait"><motion.div key={answers.length} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.25 }}>
              <h3 className="font-serif text-xl tracking-widest text-ink sm:text-2xl">{questions[answers.length].title}</h3>
              <div className="mt-6 grid gap-3">{questions[answers.length].options.map((option, index) => <motion.button key={option} type="button" whileTap={{ scale: 0.99 }} onClick={() => choose(index)} className={`group flex items-center gap-4 border px-4 py-4 text-left text-sm transition-all ${selected === index ? 'border-secondary bg-secondary text-primary shadow-soft' : 'border-secondary/15 bg-white/50 text-muted hover:border-secondary/45 hover:bg-primary/40'}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] transition-colors ${selected === index ? 'border-primary/50 bg-primary/10 text-primary' : 'border-secondary/25 text-secondary'}`}>{String.fromCharCode(65 + index)}</span>{option}<span className="ml-auto text-secondary/50 group-hover:text-secondary">↗</span></motion.button>)}</div>
            </motion.div></AnimatePresence>
          </> : <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center"><p className="text-[10px] tracking-[0.26em] text-secondary/65">YOUR NANZHUANG SCENT</p><h3 className="mt-3 font-serif text-2xl tracking-widest text-ink">為你尋得一縷山城香氣</h3><div className="mx-auto mt-7 max-w-[560px] border border-secondary/15 bg-white/65 p-6"><p className="text-[9px] tracking-[0.2em] text-muted">{product.english}</p><h4 className="mt-3 font-serif text-xl tracking-widest text-secondary">{recommendation.title}</h4><p className="mt-3 text-sm leading-7 text-muted">{recommendation.detail}</p><p className="mt-2 text-xs text-muted">{recommendation.title === '山城桂花室內擴香' ? '金桂・白茶・杉木' : recommendation.title === '桂花原精淡香水' ? '南庄金桂・茉莉・雪松' : '金桂・橙花・白麝香'}</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={() => addItem(recommendation.productId)} className="bg-secondary px-6 py-3 text-xs tracking-widest text-primary hover:bg-[#3C5540]">加入推薦商品・NT$ {product.price.toLocaleString('zh-TW')}</button><button type="button" onClick={() => addItem('sample-kit')} className="border border-secondary/35 px-6 py-3 text-xs tracking-widest text-secondary hover:bg-primary/40">索取 NT$ 199 試香體驗組</button></div><Link href={`/products/${product.slug}`} className="mt-5 inline-block text-[10px] tracking-widest text-secondary underline underline-offset-4">查看商品詳情 ↗</Link></div><button type="button" onClick={restart} className="mt-6 text-[10px] tracking-widest text-muted underline underline-offset-4">重新測驗</button></motion.div>}
        </div>
      </div>
    </section>
  );
}
