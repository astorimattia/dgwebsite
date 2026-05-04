import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <div className="flex gap-[30px] md:gap-[60px] items-start max-w-about-section mx-auto pt-0 md:pt-[60px] pb-0 flex-col md:flex-row items-center md:items-start">
      <div className="max-w-about-content leading-[1.5] font-gt-america-thin">
        <p className="mb-5 text-base text-black">Hi, I&apos;m Mattia!</p>
        <p className="mb-5 text-base text-black">
          I run a <span className="font-gt-america-regular font-normal antialiased">private markets</span> firm in San Francisco, investing and structuring transactions in early to late stage startups.
        </p>
        <p className="mb-5 text-base text-black">
          For fun, I document the world&apos;s most <span className="font-gt-america-regular font-normal antialiased">extreme</span> rituals, from fist fights in Bolivia to spirit mediums in Thailand. Stories that deserve to be told, way outside of our city bubbles. (<a href="https://sacratos.com" target="_blank" rel="noopener noreferrer" className="invisible-link">sacratos.com</a>)
        </p>
        <p className="mb-5 text-base text-black">
          I worked on AI weather models with one of my portfolio companies to enable <span className="font-gt-america-regular font-normal antialiased">weather modification</span> and mitigate natural disasters. (<a href="https://recastsystems.com" target="_blank" rel="noopener noreferrer" className="invisible-link">recastsystems.com</a>)
        </p>
        <p className="mb-5 text-base text-black">
          I managed $150m and <span className="font-gt-america-regular font-normal antialiased">backed</span> companies like OpenAI, Anduril, SpaceX, SSI, xAI, Databricks, Plaid, Perplexity, and over 200 seed-stage YC startups. (<a href="https://1199capital.com" target="_blank" rel="noopener noreferrer" className="invisible-link">1199capital.com</a>)
        </p>
        <p className="mb-5 text-base text-black">
          A little further back, I co-founded a payments company with friends (<a href="https://idospay.com/en/" target="_blank" rel="noopener noreferrer" className="invisible-link">idospay.com</a>), briefly consulted for large public Italian firms (<a href="https://pwc.com" target="_blank" rel="noopener noreferrer" className="invisible-link">pwc.com</a>), and ran a pickleball and tennis school, where I coached for a bit.
        </p>
        <p className="mb-5 text-base text-black">
          You can reach me at <a href="mailto:mattiastori@gmail.com" className="invisible-link">mattiastori@gmail.com</a>.
        </p>
      </div>
      <Image
        src="/assets/images/Mattia-Astori.webp"
        alt="Mattia Astori"
        className="w-[300px] h-[400px] object-cover flex-shrink-0 mt-0 max-w-[300px] order-[-1] md:order-none mx-auto md:mx-0"
        width={300}
        height={400}
      />
    </div>
  );
};

export default About;
