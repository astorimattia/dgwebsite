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
    <aside className="w-sidebar-width p-[30px_40px] fixed h-screen overflow-y-auto top-5 left-[15px] flex flex-col flex-shrink-0 hidden md:flex" id="sidebar">
      <Link href="/" className="text-[25px] font-normal mb-[30px] text-black pl-0 font-gt-america-regular no-underline cursor-default hover:opacity-100">Mattia Astori</Link>
      <nav className="flex flex-col gap-[15px] mb-10">
        <Link href={isAboutPage ? "/" : "/about"} className="text-black no-underline text-base cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-50">
          {isAboutPage ? "Home" : "About"}
        </Link>
        
        {/* About Preview Section */}
        <div className="mt-2 mb-5">
          <p className="text-sm leading-[1.4] mb-0 text-[#333]">
            Hi, I&apos;m Mattia! I&apos;m traveling with a film camera in hand, documenting the extreme, the obscure, and... 
            <Link href="/about" className="text-[#999] no-underline text-xs font-[100] transition-opacity duration-200 ease-in-out inline opacity-40 ml-[3px] hover:opacity-100 hover:text-black hover:underline hover:cursor-pointer">→</Link>
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
