import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import { stories } from '@/lib/stories';

export const metadata = {
  title: 'Stories — Mattia Astori',
  description: 'Photo reportages and stories from the field',
};

export default function StoriesPage() {
  const sorted = [...stories].reverse();

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-[0_20px] md:p-[30px_40px] min-h-screen min-h-[100dvh] md:h-screen overflow-y-auto ml-0 md:ml-[240px]">
        <MobileHeader />

        <div className="flex flex-col gap-3 pb-4">
          {sorted.map((story, i) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="group no-underline text-inherit block"
            >
              <article className="relative w-full h-[260px] md:h-[320px] overflow-hidden">
                <Image
                  src={story.heroImage}
                  alt={story.heroAlt}
                  fill
                  priority={i === 0}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, calc(100vw - 240px)"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
                  <p className="text-white/50 text-[10px] uppercase tracking-[0.25em] mb-3 font-gt-america-regular">
                    {story.location} — {story.date}
                  </p>
                  <h2 className="text-white text-[clamp(24px,3vw,42px)] font-gt-america-regular leading-[1] tracking-[-0.02em] mb-2">
                    {story.title}
                  </h2>
                  <p className="text-white/60 text-[clamp(13px,1.1vw,16px)] font-gt-america-thin italic max-w-[480px] leading-[1.4]">
                    {story.subtitle}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
