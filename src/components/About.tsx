import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <div className="about-section">
      <div className="about-content">
        <p>Hi, I&apos;m Mattia!</p>
        <p>
          I&apos;m traveling with a film camera in hand, documenting the <span className="important">extreme</span>, the <span className="important">obscure</span>, and the <span className="important">culturally electric</span>, from underground rituals to chaotic street festivals, the kinds of moments that don&apos;t make headlines but leave a mark. (<a href="https://sacratos.com" target="_blank" rel="noopener noreferrer" className="invisible-link">sacratos.com</a>)
        </p>
        <p>
          I shoot exclusively on <span className="important">analog</span> because I want to capture things as they are: raw, imperfect, and real.
        </p>
        <p>
          Before this chapter, I spent the past several years in <span className="important">tech</span>, building, investing, and experimenting in San Francisco.
        </p>
        <p>
          I worked on AI weather models to enable <span className="important">weather modification and control</span> to increase rainfall and mitigate natural disasters. (<a href="https://www.spyroaero.com/" target="_blank" rel="noopener noreferrer" className="invisible-link">spyroaero.com</a>)
        </p>
        <p>
          I managed over $150M in <span className="important">venture capital</span> for a firm and invested LP&apos;s funds in companies like OpenAI, Anduril, SpaceX, SSI, xAI, Databricks, Plaid, Perplexity, and over 200 seed-stage YC startups. (<a href="https://1199capital.com" target="_blank" rel="noopener noreferrer" className="invisible-link">1199capital.com</a>)
        </p>
        <p>
          A little further back, I co-founded a payments company (<a href="https://idospay.com/en/" target="_blank" rel="noopener noreferrer" className="invisible-link">idospay.com</a>), consulted for large public Italian firms (<a href="https://pwc.com" target="_blank" rel="noopener noreferrer" className="invisible-link">pwc.com</a>), and ran a pickleball and tennis school, where I coached for a while.
        </p>
        <p>
          Now I&apos;m stepping back from the screen and into the world, chasing fire, noise, color, and chaos. <span className="important">This site is where I share what I find.</span>
        </p>
        <p>
          You can reach me at <a href="mailto:mattiastori@gmail.com" className="invisible-link">mattiastori@gmail.com</a>.
        </p>
      </div>
      <Image 
        src="/assets/images/Mattia-Astori.webp" 
        alt="Mattia Astori" 
        className="profile-image"
        width={300}
        height={400}
      />
    </div>
  );
};

export default About;
