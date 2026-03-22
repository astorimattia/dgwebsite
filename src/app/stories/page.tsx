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
  const featured = stories[0];
  const rest = stories.slice(1);

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-[0_20px] md:p-[30px_40px] min-h-screen min-h-[100dvh] md:h-screen overflow-y-auto ml-0 md:ml-[240px] flex flex-col">
        <MobileHeader />

        <div className="flex-1 w-full">
          {/* Featured story — full-bleed hero card */}
          {featured && (
            <Link
              href={`/stories/${featured.slug}`}
              className="group no-underline text-inherit block mb-16"
            >
              <article className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[2.2/1] overflow-hidden">
                <Image
                  src={featured.heroImage}
                  alt={featured.heroAlt}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
                  <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3 font-gt-america-regular">
                    {featured.location}, {featured.date}
                  </p>
                  <h2 className="text-white text-[clamp(28px,5vw,56px)] font-gt-america-regular leading-[1] tracking-[-0.02em] mb-2">
                    {featured.title}
                  </h2>
                  <p className="text-white/70 text-[clamp(14px,2vw,20px)] font-gt-america-thin italic max-w-[500px] leading-[1.3]">
                    {featured.subtitle}
                  </p>
                </div>
              </article>
            </Link>
          )}

          {/* Additional stories — compact cards */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-16 mb-16">
              {rest.map((story) => (
                <Link
                  key={story.slug}
                  href={`/stories/${story.slug}`}
                  className="group no-underline text-inherit block"
                >
                  <article className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[2.2/1] overflow-hidden">
                    <Image
                      src={story.heroImage}
                      alt={story.heroAlt}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
                      <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3 font-gt-america-regular">
                        {story.location}, {story.date}
                      </p>
                      <h2 className="text-white text-[clamp(28px,5vw,56px)] font-gt-america-regular leading-[1] tracking-[-0.02em] mb-2">
                        {story.title}
                      </h2>
                      <p className="text-white/70 text-[clamp(14px,2vw,20px)] font-gt-america-thin italic max-w-[500px] leading-[1.3]">
                        {story.subtitle}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
