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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
          {sorted.map((story, i) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="group no-underline text-inherit block"
            >
              <article className="relative w-full aspect-[3/2] overflow-hidden">
                <Image
                  src={story.heroImage}
                  alt={story.heroAlt}
                  fill
                  priority={i === 0}
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2 font-gt-america-regular">
                    {story.location}, {story.date}
                  </p>
                  <h2 className="text-white text-[clamp(18px,2vw,32px)] font-gt-america-regular leading-[1.05] tracking-[-0.02em] mb-1">
                    {story.title}
                  </h2>
                  <p className="text-white/70 text-[clamp(12px,1.1vw,16px)] font-gt-america-thin italic max-w-[400px] leading-[1.3]">
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
