'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/lib/stories';

interface StoryArticleProps {
  story: Story;
}

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default function StoryArticle({ story }: StoryArticleProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = articleRef.current?.closest('.story-scroll-container');
    if (!container) return;
    const handleScroll = () => {
      const el = container as HTMLElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      setPastHero(scrollTop > window.innerHeight * 0.7);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  let isFirstParagraph = true;

  return (
    <article ref={articleRef} className="story-article">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-transparent">
        <div
          className="h-full bg-black transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floating nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          pastHero ? 'bg-white' : 'md:mix-blend-difference'
        }`}
      >
        <div className="flex justify-between items-center px-5 md:px-10 pt-5 pb-[25px] md:py-4">
          <Link
            href="/"
            className={`text-[22px] font-gt-america-regular no-underline transition-colors duration-500 hover:opacity-60 ${
              pastHero ? 'text-black' : 'text-black md:text-white'
            }`}
          >
            Mattia Astori
          </Link>
          <div className="flex gap-4 md:gap-5">
            <Link href="/about" className={`text-base md:text-sm no-underline transition-colors duration-500 hover:opacity-60 ${
              pastHero ? 'text-black' : 'text-black md:text-white'
            }`}>
              About
            </Link>
            <Link href="/stories" className={`text-base md:text-sm no-underline transition-colors duration-500 hover:opacity-60 ${
              pastHero ? 'text-black' : 'text-black md:text-white'
            }`}>
              Stories
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative w-[100vw] -ml-[20px] md:-ml-[40px] h-[85vh] md:h-[92vh] overflow-hidden">
        <Image
          src={story.heroImage}
          alt={story.heroAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-[30px_20px] md:p-[60px_80px]">
          <h1 className="text-white text-[clamp(40px,8vw,90px)] font-gt-america-regular leading-[0.95] tracking-[-0.03em] mb-3">
            {story.title}
          </h1>
          <p className="text-white/80 text-[clamp(16px,2.5vw,24px)] font-gt-america-thin italic max-w-[600px] leading-[1.3]">
            {story.subtitle}
          </p>
        </div>
      </div>

      {/* Article meta */}
      <div className="max-w-[680px] mx-auto mt-12 md:mt-16 mb-10 md:mb-14 px-0">
        <p className="text-sm text-black font-gt-america-regular mb-2">{story.author}</p>
        <p className="text-xs text-[#999] tracking-[0.05em]" dangerouslySetInnerHTML={{ __html: story.credit }} />
        <div className="w-full h-[1px] bg-[#e5e5e5] mt-6" />
      </div>

      {/* Sections */}
      <div className="story-body">
        {story.sections.map((section, i) => {
          if (section.type === 'text' && section.content) {
            const showDropCap = isFirstParagraph;
            if (isFirstParagraph) isFirstParagraph = false;
            return (
              <FadeIn key={i} className="max-w-[680px] mx-auto mb-8 px-0">
                <p className={`text-[17px] md:text-[18px] leading-[1.75] text-[#1a1a1a] font-gt-america-thin font-[200] ${showDropCap ? 'story-drop-cap' : ''}`} dangerouslySetInnerHTML={{ __html: section.content }} />
              </FadeIn>
            );
          }

          if (section.type === 'image-full' && section.image) {
            return (
              <FadeIn key={i} className="w-[100vw] -ml-[20px] md:-ml-[40px] my-12 md:my-16">
                <div className="relative aspect-[3/2] md:aspect-[16/9]">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                {section.image.caption && (
                  <p className="text-xs text-[#999] mt-3 px-[20px] md:px-[80px] tracking-[0.02em]">
                    {section.image.caption}
                  </p>
                )}
              </FadeIn>
            );
          }

          if (section.type === 'image-pair' && section.images) {
            return (
              <FadeIn key={i} className="w-[100vw] -ml-[20px] md:-ml-[40px] my-12 md:my-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[4px]">
                  {section.images.map((img, j) => (
                    <div key={j} className="relative aspect-[4/3]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[4px] px-[20px] md:px-[80px]">
                  {section.images.map((img, j) => (
                    img.caption && (
                      <p key={j} className="text-xs text-[#999] mt-3 tracking-[0.02em]">
                        {img.caption}
                      </p>
                    )
                  ))}
                </div>
              </FadeIn>
            );
          }

          if (section.type === 'image-offset' && section.image) {
            const isRight = section.align === 'right';
            return (
              <FadeIn key={i} className={`max-w-[900px] mx-auto my-12 md:my-16 px-0 flex ${isRight ? 'justify-end' : 'justify-start'}`}>
                <div className={`w-full md:w-[60%] ${isRight ? 'md:mr-[-5vw]' : 'md:ml-[-5vw]'}`}>
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                  {section.image.caption && (
                    <p className="text-xs text-[#999] mt-3 tracking-[0.02em]">
                      {section.image.caption}
                    </p>
                  )}
                </div>
              </FadeIn>
            );
          }

          if (section.type === 'pullquote' && section.content) {
            return (
              <FadeIn key={i} className="max-w-[800px] mx-auto my-14 md:my-20 px-0">
                <blockquote className="story-pullquote">
                  <p className="text-[clamp(22px,3.5vw,34px)] leading-[1.35] font-gt-america-thin font-[200] italic text-black tracking-[-0.01em]">
                    {section.content}
                  </p>
                  <div className="w-[40px] h-[1px] bg-black mt-6" />
                </blockquote>
              </FadeIn>
            );
          }

          return null;
        })}
      </div>

      <div className="mb-16 md:mb-24" />
    </article>
  );
}
