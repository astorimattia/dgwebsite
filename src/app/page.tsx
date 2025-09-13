import React from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import Gallery from '@/components/Gallery';

export default function Home() {
  return (
    <div className="container">
      <MobileHeader />
      <Sidebar />
      <main className="main-content">
        <Gallery />
      </main>
    </div>
  );
}