export type Product = {
  id: string;
  slug: string;
  name: string;
  english: string;
  category: string;
  price: number;
  description: string;
  image: string;
  accent: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  situations: string[];
};

export const products: Product[] = [
  {
    id: 'osmanthus-perfume', slug: 'osmanthus-perfume', name: '桂花原精淡香水', english: 'OSMANTHUS EAU DE PARFUM', category: '淡香水', price: 2280,
    description: '循著古法桂花釀的時間與耐心，將南庄金桂的清甜花韻收進瓶中。初聞是明亮柑橘，隨後桂花與茉莉緩緩盛開，最後落在溫潤雪松與琥珀木質。',
    image: 'photo-1594035910387-fea47794261f', accent: 'from-[#d4b991] via-[#a78d69] to-[#52634d]', topNotes: '甜柑橘・山林青草', heartNotes: '南庄金桂・茉莉', baseNotes: '雪松・琥珀木質', situations: ['居家舒壓', '工作專注', '夜間助眠'],
  },
  {
    id: 'home-diffuser', slug: 'home-diffuser', name: '山城桂花室內擴香', english: 'OSMANTHUS HOME DIFFUSER', category: '居家香氛', price: 1680,
    description: '讓山城的桂花與木質氣息，在空間裡慢慢流動。以天然植物香調為靈感，為日常留下一段靜謐的空白。',
    image: 'photo-1608571423902-eed4a5ad8108', accent: 'from-[#ddd1bc] via-[#ab987c] to-[#57614c]', topNotes: '佛手柑・綠葉', heartNotes: '金桂・白茶', baseNotes: '杉木・柔和麝香', situations: ['客廳迎賓', '閱讀時光', '玄關留香'],
  },
  {
    id: 'body-lotion', slug: 'body-lotion', name: '桂花潤膚乳', english: 'BOTANICAL BODY LOTION', category: '身體保養', price: 980,
    description: '細緻乳液質地融入肌膚，帶來植物油脂的柔潤呵護與淡雅桂花香。日常保養，也是一場輕柔的感官練習。',
    image: 'photo-1608248543803-ba4f8c70ae0b', accent: 'from-[#e5d2b5] via-[#bba47e] to-[#626b53]', topNotes: '青檸・嫩葉', heartNotes: '金桂・橙花', baseNotes: '白麝香・雪松', situations: ['沐浴後保養', '乾燥肌膚', '睡前儀式'],
  },
  {
    id: 'discovery-kit', slug: 'discovery-kit', name: '桂香漫遊精油體驗組', english: 'NANZHUANG DISCOVERY SET', category: '體驗組', price: 1280,
    description: '四款南庄靈感香氣，陪你找到最自在的日常氣味。附旅行香氛小卡與香氣筆記，適合初次探索，也適合送給一位想念山城的人。',
    image: 'photo-1608571423902-eed4a5ad8108', accent: 'from-[#ded1ba] via-[#a5967d] to-[#4e614b]', topNotes: '柑橘・青草', heartNotes: '桂花・山茶', baseNotes: '檜木・琥珀', situations: ['初次尋香', '旅行隨行', '心意贈禮'],
  },
  {
    id: 'sample-kit', slug: 'sample-kit', name: '南庄桂花試香體驗組', english: 'SCENT DISCOVERY KIT', category: '試香體驗', price: 199,
    description: '先用一趟氣味小旅行認識南庄。體驗組售價 NT$ 199，免運；完成訂單後將收到 NT$ 199 官網正裝折抵券，折扣碼寄送至 Email 或 LINE。',
    image: 'photo-1608571423902-eed4a5ad8108', accent: 'from-[#e6d5c3] via-[#bca987] to-[#66745d]', topNotes: '甜柑橘・山林青草', heartNotes: '南庄金桂・茉莉', baseNotes: '雪松・琥珀木質', situations: ['香氣入門', '旅行體驗', '送禮分享'],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('zh-TW').format(price);
}
