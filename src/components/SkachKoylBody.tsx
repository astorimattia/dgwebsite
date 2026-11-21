'use client';

import Image from 'next/image';
import type { Story, StoryImage } from '@/lib/stories';

// This layout is deliberately limited to Skach Koyl. Other stories keep their renderer.
export default function SkachKoylBody({ story }: { story: Story }) {
  const paragraphs = story.sections.filter(s => s.type === 'text' && s.content);
  const photographs = story.sections.flatMap(s => s.image ? [s.image] : []);
  const accurateAlts: Record<number, string> = {
    9: 'A man raises a bottle among people gathered indoors',
    10: 'An elderly woman in a patterned headscarf among people gathered indoors',
    11: 'A man and woman stand together beneath colorful decorations indoors',
  };

  function text(start: number, end: number) {
    return paragraphs.slice(start, end).map((section, offset) => {
      const index = start + offset;
      const heading = section.content!.match(/^<strong>(.*?)<\/strong>$/);
      return heading ? (
        <h2 key={index} className="max-w-[680px] mx-auto mt-14 md:mt-20 mb-6 text-[24px] md:text-[28px] leading-[1.2] tracking-[-0.015em] font-gt-america-regular font-semibold text-black">
          {heading[1]}
        </h2>
      ) : (
        <div key={index} className="max-w-[680px] mx-auto mb-8">
          <p className={`text-[17px] md:text-[18px] leading-[1.75] text-[#1a1a1a] font-gt-america-thin font-[200] ${index === 0 ? 'story-drop-cap' : ''}`} dangerouslySetInnerHTML={{ __html: section.content! }} />
        </div>
      );
    });
  }

  function sequence(start: number, count: number) {
    const images = photographs.slice(start, start + count);
    return (
      <div className="max-w-[1120px] mx-auto my-12 md:my-16" data-photo-sequence={count}>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {images.map((image: StoryImage, offset: number) => (
            <a key={image.src} href={image.src} target="_blank" rel="noopener noreferrer"
              aria-label={`View full photograph: ${accurateAlts[start + offset] || image.alt}`}
              className={`block relative aspect-[3/2] overflow-hidden bg-[#f5f5f5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${count === 3 && offset === 0 ? 'col-span-2' : ''}`}>
              <Image src={image.src} alt={accurateAlts[start + offset] || image.alt} fill className="object-contain" sizes={count === 3 && offset === 0 ? '(max-width: 1200px) 100vw, 1120px' : '(max-width: 768px) 50vw, 560px'} />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return <div className="skach-koyl-body">
    {text(0, 6)}
    {sequence(0, 3)}
    {text(6, 14)}
    {sequence(3, 4)}
    {text(14, 18)}
    {sequence(7, 2)}
    {text(18, paragraphs.length)}
    {sequence(9, 3)}
  </div>;
}
