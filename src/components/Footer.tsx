'use client';

import React from 'react';
import SocialIcons from './SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-auto block md:hidden">
      <div className="max-w-about-section mx-auto px-[20px] md:px-[40px] py-[30px] md:py-[40px] border-t border-gray-100">
        {/* Copyright */}
        <div>
          <p className="text-xs text-[#999] font-gt-america-thin text-center m-0">
            © {new Date().getFullYear()} Mattia Astori. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
