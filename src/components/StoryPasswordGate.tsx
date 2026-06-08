'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/lib/stories';

interface Props {
  story: Story;
  children: React.ReactNode;
}

export default function StoryPasswordGate({ story, children }: Props) {
  const key = `unlocked:${story.slug}`;
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(key) === '1');
    setChecked(true);
  }, [key]);

  if (!checked) return null;
  if (unlocked) return <>{children}</>;

  const firstParagraph = story.sections.find(s => s.type === 'text' && s.content)?.content ?? '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === story.password!.toLowerCase()) {
      sessionStorage.setItem(key, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setInput('');
    }
  }

  return (
    <div className="story-article">
      {/* Floating nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/0 md:mix-blend-difference">
        <div className="flex justify-between items-center px-5 md:px-10 pt-5 pb-[25px] md:py-4">
          <Link href="/" className="text-[22px] font-gt-america-regular no-underline text-black md:text-white hover:opacity-60 transition-opacity">
            Mattia Astori
          </Link>
          <Link href="/stories" className="text-base md:text-sm no-underline text-black md:text-white hover:opacity-60 transition-opacity">
            Stories
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative w-[100vw] -ml-[20px] md:-ml-[40px] h-[85vh] md:h-[92vh] overflow-hidden">
        <Image src={story.heroImage} alt={story.heroAlt} fill priority className="object-cover" sizes="100vw" />
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

      {/* Meta */}
      <div className="max-w-[680px] mx-auto mt-12 md:mt-16 mb-10 md:mb-14 px-0">
        <p className="text-sm text-black font-gt-america-regular mb-2">{story.author}</p>
        <p className="text-xs text-[#999] tracking-[0.05em]" dangerouslySetInnerHTML={{ __html: story.credit }} />
        <div className="w-full h-[1px] bg-[#e5e5e5] mt-6" />
      </div>

      {/* First paragraph */}
      <div className="max-w-[680px] mx-auto mb-8 px-0">
        <p className="text-[17px] md:text-[18px] leading-[1.75] text-[#1a1a1a] font-gt-america-thin font-[200] story-drop-cap"
          dangerouslySetInnerHTML={{ __html: firstParagraph }} />
      </div>

      {/* Fade + password */}
      <div className="max-w-[680px] mx-auto relative">
        <div className="h-16 bg-gradient-to-b from-transparent to-white" />
        <div className="bg-white pt-6 pb-20 flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#aaa] mb-7 font-gt-america-regular text-center">
            Exclusive preview
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-[280px]">
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className={`w-full border-b ${error ? 'border-red-400' : 'border-[#ccc]'} bg-transparent py-2 text-[15px] font-gt-america-thin text-black placeholder-[#bbb] outline-none focus:border-black transition-colors text-center`}
            />
            {error && <p className="text-[11px] text-red-400 font-gt-america-thin text-center -mt-1">Wrong password.</p>}
            <button type="submit" className="mt-1 w-full bg-black text-white text-[11px] uppercase tracking-[0.18em] font-gt-america-regular py-3 hover:bg-[#333] transition-colors">
              Continue reading
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
