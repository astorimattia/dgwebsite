'use client';

import React, { useState, useEffect } from 'react';

interface LocationProps {
  isMobile?: boolean;
}

const Location: React.FC<LocationProps> = ({ isMobile = false }) => {
  const [city, setCity] = useState('Loading...');
  const [cityLink, setCityLink] = useState('#');

  useEffect(() => {
    const GIST_URL = 'https://gist.githubusercontent.com/astorimattia/5d43be1043ca3e39a8d3d214392a870e/raw/location.json';
    
    fetch(GIST_URL)
      .then(res => res.json())
      .then(data => {
        const cityName = data.city || "Unknown";
        setCity(cityName);
        
        if (cityName !== "Unknown") {
          const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(cityName)}`;
          setCityLink(googleMapsUrl);
        } else {
          setCityLink('#');
        }
      })
      .catch(err => {
        console.error('Error loading location:', err);
        setCity("Unavailable");
        setCityLink('#');
      });
  }, []);

  if (isMobile) {
    return (
      <div className="block md:hidden p-0 bg-none border-none mt-[15px]">
        <div id="mobile-location-container" className="flex items-center gap-2">
          <span className="font-gt-america-thin font-[200] text-base text-black antialiased tracking-tight">Currently in:</span>
          <a id="mobile-city-link" href={cityLink} target="_blank" rel="noopener noreferrer" className="no-underline text-inherit hover:opacity-70">
            <div id="mobile-city" className="font-gt-america-regular font-normal text-base text-black antialiased">{city}</div>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div id="location-container" className="flex flex-col items-start gap-1">
        <span className="font-gt-america-thin font-[200] text-base text-black antialiased tracking-tight">Currently in:</span>
        <a id="city-link" href={cityLink} target="_blank" rel="noopener noreferrer" className="no-underline text-inherit hover:opacity-70">
          <div id="city" className="font-gt-america-regular font-normal text-base text-black antialiased">{city}</div>
        </a>
      </div>
    </div>
  );
};

export default Location;

