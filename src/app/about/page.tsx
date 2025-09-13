import React from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import About from '@/components/About';

export default function AboutPage() {
  return (
    <div className="container">
      <MobileHeader />
      <Sidebar />
      <main className="main-content">
        <About />
      </main>
    </div>
  );
}

