'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Props {
  slug: string;
  password: string;
  children: React.ReactNode;
}

export default function StoryPasswordGate({ slug, password, children }: Props) {
  const key = `unlocked:${slug}`;
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
    if (input.trim().toLowerCase() === password.toLowerCase()) {
      sessionStorage.setItem(key, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setInput('');
    }
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white flex flex-col">
      <nav className="flex justify-between items-center px-5 md:px-10 pt-5 pb-[25px] md:py-4">
        <Link href="/" className="text-[22px] font-gt-america-regular no-underline text-black hover:opacity-60 transition-opacity">
          Mattia Astori
        </Link>
        <Link href="/stories" className="text-base md:text-sm no-underline text-black hover:opacity-60 transition-opacity">
          Stories
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[360px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#999] mb-6 font-gt-america-regular">
            Exclusive preview
          </p>
          <h1 className="text-[32px] md:text-[40px] font-gt-america-regular leading-[1] tracking-[-0.02em] text-black mb-2">
            C&apos; vdim au&apos; fnel
          </h1>
          <p className="text-[15px] font-gt-america-thin italic text-[#666] mb-10">
            Appunti dalla Festa del Soccorso
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false); }}
              placeholder="Enter password"
              autoFocus
              className={`w-full border-b ${error ? 'border-red-400' : 'border-[#ccc]'} bg-transparent py-3 text-[15px] font-gt-america-thin text-black placeholder-[#aaa] outline-none focus:border-black transition-colors`}
            />
            {error && (
              <p className="text-[12px] text-red-400 font-gt-america-thin -mt-1">
                Wrong password.
              </p>
            )}
            <button
              type="submit"
              className="mt-2 w-full bg-black text-white text-[13px] uppercase tracking-[0.15em] font-gt-america-regular py-3 hover:bg-[#222] transition-colors"
            >
              Read story
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
