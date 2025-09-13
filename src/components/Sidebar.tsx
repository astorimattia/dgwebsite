'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialIcons from './SocialIcons';
import Location from './Location';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about' || pathname === '/about/';

  return (
    <aside className="sidebar" id="sidebar">
      <Link href="/" className="logo">Mattia Astori</Link>
      <nav className="nav">
        <Link href={isAboutPage ? "/" : "/about"}>
          {isAboutPage ? "Home" : "About"}
        </Link>
        
        {/* About Preview Section */}
        <div className="about-preview">
          <p className="about-preview-text">
            Hi, I&apos;m Mattia! I&apos;m traveling with a film camera in hand, documenting the extreme, the obscure, and... 
            <Link href="/about" className="view-more-btn">→</Link>
          </p>
        </div>
        
        {/* Location Section */}
        <Location />
        
        <SocialIcons />
      </nav>
    </aside>
  );
};

export default Sidebar;
