import React from 'react';
import Link from 'next/link';
import SocialIcons from './SocialIcons';
import Location from './Location';

const MobileHeader: React.FC = () => {
  return (
    <div className="mobile-header">
      <div className="mobile-top">
        <Link href="/" className="mobile-logo">Mattia Astori</Link>
        <Link href="/about" className="mobile-about">About</Link>
      </div>
      <div className="mobile-bottom">
        <SocialIcons />
        <Location isMobile={true} />
      </div>
      
      {/* Mobile About Preview */}
      <div className="mobile-about-preview">
        <Link href="/about" className="mobile-about-preview-link">
          <p className="mobile-about-preview-text">
            Hi, I&apos;m Mattia! I&apos;m traveling with a film camera in hand, documenting the extreme, the obscure, and... 
            <span className="mobile-view-more-btn">→</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
