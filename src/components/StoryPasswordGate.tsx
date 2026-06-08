'use client';

import React, { useState, useEffect } from 'react';

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
    <div className="relative">
      {/* Story content, clipped */}
      <div className="max-h-[520px] md:max-h-[600px] overflow-hidden pointer-events-none select-none">
        {children}
      </div>

      {/* Fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[320px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />

      {/* Password prompt */}
      <div className="relative bg-white pt-4 pb-16 flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#aaa] mb-6 font-gt-america-regular text-center">
          Exclusive preview — enter password to continue
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-[300px]">
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            className={`w-full border-b ${error ? 'border-red-400' : 'border-[#ccc]'} bg-transparent py-2 text-[15px] font-gt-america-thin text-black placeholder-[#bbb] outline-none focus:border-black transition-colors text-center`}
          />
          {error && (
            <p className="text-[11px] text-red-400 font-gt-america-thin text-center -mt-1">Wrong password.</p>
          )}
          <button
            type="submit"
            className="mt-1 w-full bg-black text-white text-[11px] uppercase tracking-[0.18em] font-gt-america-regular py-3 hover:bg-[#333] transition-colors"
          >
            Continue reading
          </button>
        </form>
      </div>
    </div>
  );
}
