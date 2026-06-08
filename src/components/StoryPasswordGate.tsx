'use client';

import React, { useState, useEffect } from 'react';
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
    <div className="relative">
      {/* Clipped article — hero + a bit of text visible */}
      <div style={{ maxHeight: '155vh', overflow: 'clip' }}>
        {children}
      </div>

      {/* Gradient fade */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{ height: '55vh', background: 'linear-gradient(to bottom, transparent 0%, white 55%)' }}
      />

      {/* Password box */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-24 -mt-[10vh]">
        <div className="w-full max-w-[320px] text-center">
          <div className="w-8 h-[1px] bg-[#ccc] mx-auto mb-6" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#aaa] mb-2 font-gt-america-regular">
            Exclusive preview
          </p>
          <p className="text-[13px] font-gt-america-thin italic text-[#999] mb-8 leading-[1.5]">
            Enter the password to keep reading.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className={`w-full border-b ${error ? 'border-red-400' : 'border-[#d0d0d0]'} bg-transparent py-2 text-[15px] font-gt-america-thin text-black placeholder-[#bbb] outline-none focus:border-black transition-colors text-center tracking-widest`}
            />
            {error && (
              <p className="text-[11px] text-red-400 font-gt-america-thin -mt-2">Wrong password.</p>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white text-[11px] uppercase tracking-[0.2em] font-gt-america-regular py-[14px] hover:bg-[#222] transition-colors"
            >
              Continue reading
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
