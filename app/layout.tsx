import type { Metadata } from 'next';
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { StoreProvider } from '@/components/store/StoreProvider';

const notoSans = Noto_Sans_TC({ subsets: ['latin'], variable: '--font-noto-sans-tc', display: 'swap' });
const notoSerif = Noto_Serif_TC({ subsets: ['latin'], variable: '--font-noto-serif-tc', display: 'swap' });

export const metadata: Metadata = {
  title: '南庄慢香 Nanzhuang Fragrance｜山城植萃香氛',
  description: '循著南庄山林氣息，收藏一段客家慢城的香氣記憶。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body className={`${notoSans.variable} ${notoSerif.variable}`}>
        <StoreProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
