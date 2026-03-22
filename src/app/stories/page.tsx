import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import Footer from '@/components/Footer';
import { stories } from '@/lib/stories';

export const metadata = {
  title: 'Stories — Mattia Astori',
  description: 'Photo reportages and stories from the field',
};

export default function StoriesPage() {
  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-[0_20px] md:p-[30px_40px] min-h-screen min-h-[100dvh] md:h-screen overflow-y-auto ml-0 md:ml-[240px] flex flex-col">
        <MobileHeader />

        <div className="flex-1 max-w-[900px] w-full">
          <div className="flex flex-col gap-16">
            {stories.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="group no-underline text-inherit block"
              >
                <article className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="relative w-full md:w-[55%] aspect-[3/2] overflow-hidden">
                    <Image
                      src={story.heroImage}
                      alt={story.heroAlt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center md:w-[45%]">
                    <p className="text-xs text-[#999] uppercase tracking-[0.1em] mb-3 font-gt-america-regular">
                      {story.location}, {story.date}
                    </p>
                    <h2 className="text-[clamp(22px,3vw,32px)] font-gt-america-regular leading-[1.1] mb-1 tracking-tight">
                      {story.title}
                    </h2>
                    <p className="text-base text-[#666] mb-4 italic font-gt-america-thin">
                      {story.subtitle}
                    </p>
                    <p className="text-sm leading-[1.6] text-[#444] mb-4">
                      {story.excerpt}
                    </p>
                    <span className="text-xs text-[#999] uppercase tracking-[0.08em]">
                      {story.readingTime}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
