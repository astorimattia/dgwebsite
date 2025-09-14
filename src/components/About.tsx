import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <div className="flex gap-[30px] md:gap-[60px] items-start max-w-about-section mx-auto pt-0 md:pt-[60px] pb-0 flex-col md:flex-row items-center md:items-start">
      <div className="max-w-about-content leading-[1.5] font-gt-america-thin">
        <p className="mb-5 text-base text-black">Hi, I&apos;m Mattia!</p>
        <p className="mb-5 text-base text-black">
          I&apos;m traveling with a film camera in hand, documenting the <span className="font-gt-america-regular font-normal antialiased">extreme</span>, the <span className="font-gt-america-regular font-normal antialiased">obscure</span>, and the <span className="font-gt-america-regular font-normal antialiased">culturally electric</span>, from underground rituals to chaotic street festivals, the kinds of moments that don&apos;t make headlines but leave a mark. (<a href="https://sacratos.com" target="_blank" rel="noopener noreferrer" className="invisible-link">sacratos.com</a>)
        </p>
        <p className="mb-5 text-base text-black">
          I shoot exclusively on <span className="font-gt-america-regular font-normal antialiased">analog</span> because I want to capture things as they are: raw, imperfect, and real.
        </p>
        <p className="mb-5 text-base text-black">
          Before this chapter, I spent the past several years in <span className="font-gt-america-regular font-normal antialiased">tech</span>, building, investing, and experimenting in San Francisco.
        </p>
        <p className="mb-5 text-base text-black">
          I worked on AI weather models to enable <span className="font-gt-america-regular font-normal antialiased">weather modification and control</span> to increase rainfall and mitigate natural disasters. (<a href="https://www.spyroaero.com/" target="_blank" rel="noopener noreferrer" className="invisible-link">spyroaero.com</a>)
        </p>
        <p className="mb-5 text-base text-black">
          I managed over $150M in <span className="font-gt-america-regular font-normal antialiased">venture capital</span> for a firm and invested LP&apos;s funds in companies like OpenAI, Anduril, SpaceX, SSI, xAI, Databricks, Plaid, Perplexity, and over 200 seed-stage YC startups. (<a href="https://1199capital.com" target="_blank" rel="noopener noreferrer" className="invisible-link">1199capital.com</a>)
        </p>
        <p className="mb-5 text-base text-black">
          A little further back, I co-founded a payments company (<a href="https://idospay.com/en/" target="_blank" rel="noopener noreferrer" className="invisible-link">idospay.com</a>), consulted for large public Italian firms (<a href="https://pwc.com" target="_blank" rel="noopener noreferrer" className="invisible-link">pwc.com</a>), and ran a pickleball and tennis school, where I coached for a while.
        </p>
        <p className="mb-5 text-base text-black">
          Now I&apos;m stepping back from the screen and into the world, chasing fire, noise, color, and chaos. <span className="font-gt-america-regular font-normal antialiased">This site is where I share what I find.</span>
        </p>
        <p className="mb-5 text-base text-black">
          You can reach me at <a href="mailto:mattiastori@gmail.com" className="invisible-link">mattiastori@gmail.com</a>.
        </p>
      </div>
      <Image 
        src="/assets/images/Mattia-Astori.webp" 
        alt="Mattia Astori" 
        className="w-[300px] h-[400px] object-cover flex-shrink-0 mt-0 w-full max-w-[300px] h-[400px] order-[-1] md:order-none"
        width={300}
        height={400}
      />
    </div>
  );
};

export default About;
