'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialIcons from './SocialIcons';
import Location from './Location';

const MobileHeader: React.FC = () => {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about' || pathname === '/about/';

  return (
    <div className="flex md:hidden flex-col py-5 bg-white">
      <div className="flex justify-between items-center w-full">
        <Link href="/" className="text-[22px] font-normal text-black font-gt-america-regular no-underline cursor-default hover:opacity-100">Mattia Astori</Link>
        <Link href={isAboutPage ? "/" : "/about"} className="text-base text-black no-underline transition-opacity duration-200 ease-in-out hover:opacity-50">
          {isAboutPage ? "Home" : "About"}
        </Link>
      </div>
      <div className="flex justify-between items-center gap-[18px]">
        <SocialIcons />
        <Location isMobile={true} />
      </div>
      
      {/* Mobile About Preview */}
      <div className="block p-[25px_0_0_0]">
        <Link href="/about" className="no-underline text-inherit block transition-opacity duration-200 ease-in-out cursor-pointer hover:opacity-70">
          <p className="text-sm leading-[1.4] m-0 text-[#333]">
            Hi, I&apos;m Mattia! I&apos;m traveling with a film camera in hand, documenting the extreme, the obscure, and... 
            <span className="text-black text-xs font-[100] transition-opacity duration-200 ease-in-out inline opacity-40 ml-[3px]">→</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
