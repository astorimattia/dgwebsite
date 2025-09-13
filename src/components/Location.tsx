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
      <div className="mobile-location-section">
        <div id="mobile-location-container">
          <span className="mobile-location-label">Currently in:</span>
          <a id="mobile-city-link" href={cityLink} target="_blank" rel="noopener noreferrer">
            <div id="mobile-city">{city}</div>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="location-section">
      <div id="location-container">
        <span className="location-label">Currently in:</span>
        <a id="city-link" href={cityLink} target="_blank" rel="noopener noreferrer">
          <div id="city">{city}</div>
        </a>
      </div>
    </div>
  );
};

export default Location;

