import React from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-[0_20px] md:p-[30px_40px] min-h-screen min-h-[100dvh] md:h-screen overflow-y-auto ml-0 md:ml-[240px] flex flex-col">
        <MobileHeader />
        <About />
        <Footer />
      </main>
    </div>
  );
}

