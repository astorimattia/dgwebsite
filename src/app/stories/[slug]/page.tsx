import React from 'react';
import { notFound } from 'next/navigation';
import StoryArticle from '@/components/StoryArticle';
import { stories, getStoryBySlug } from '@/lib/stories';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return { title: 'Story Not Found' };
  return {
    title: `${story.title}: ${story.subtitle} — Mattia Astori`,
    description: story.excerpt,
    openGraph: {
      title: `${story.title}: ${story.subtitle}`,
      description: story.excerpt,
      images: [story.heroImage],
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white">
      <main className="story-scroll-container overflow-y-auto h-screen h-[100dvh] p-[0_20px] md:p-[0_40px]">
        <StoryArticle story={story} />
      </main>
    </div>
  );
}
