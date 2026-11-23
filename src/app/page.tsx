import React from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

// Homepage sharing image follows the opening photograph. Story metadata stays independent.
export const metadata = {
  openGraph: {
    title: 'Mattia Astori - Investor & Founder of Astori Ventures',
    description: 'Mattia Astori is a technology investor and founder of Astori Ventures, backing companies from early stage through growth. He is also a co-creator of Sacratos, a documentary project.',
    url: 'https://mattiaastori.com',
    siteName: 'Mattia Astori',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/assets/images/sansevero2.webp',
      alt: 'Festa del Soccorso, San Severo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mattia Astori - Investor & Founder of Astori Ventures',
    description: 'Mattia Astori is a technology investor and founder of Astori Ventures, backing companies from early stage through growth. He is also a co-creator of Sacratos, a documentary project.',
    images: ['/assets/images/sansevero2.webp'],
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-[0_20px] md:p-[30px_40px] min-h-screen min-h-[100dvh] md:h-screen overflow-y-auto ml-0 md:ml-[240px] flex flex-col">
        <MobileHeader />
        <Gallery />
        <Footer />
      </main>
    </div>
  );
}
