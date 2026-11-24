import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/products/ProductDetail';
import { getProductBySlug, products } from '@/lib/products';

export function generateStaticParams() {
  return products.map((product) => ({ id: product.slug }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = getProductBySlug(params.id);
  if (!product) return { title: '找不到商品｜南庄慢香' };
  return { title: `${product.name}｜南庄慢香`, description: product.description };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductBySlug(params.id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
