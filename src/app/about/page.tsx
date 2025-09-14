import React from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import About from '@/components/About';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <MobileHeader />
      <Sidebar />
      <main className="flex-1 p-[30px_40px] h-screen overflow-y-auto ml-0 md:ml-sidebar-width">
        <About />
      </main>
    </div>
  );
}

