'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ResponsiveImage from './ResponsiveImage';

interface ImageData {
  src: string;
  title: string;
  year: string;
}

const imageData: ImageData[] = [
  // Tinku series (Macha, Bolivia)
  { src: '/assets/images/tinku-analog.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog2.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog3.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog4.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog5.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog6.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog7.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog8.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog9.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog10.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog11.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog12.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog13.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog14.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog15.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  { src: '/assets/images/tinku-analog16.webp', title: 'Tinku de Macha, Bolivia', year: '2025' },
  
  // Tultepec series (Mexico)
  { src: '/assets/images/tultepec-analog.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog2.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog3.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog4.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog5.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog6.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog7.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog8.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog9.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog10.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog11.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog12.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog13.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog14.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog15.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog16.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog17.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog18.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' },
  { src: '/assets/images/tultepec-analog19.webp', title: 'Feria Internacional de la Pirotecnìa, Mexico', year: '2025' }
];

const Gallery: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showingThumbnails, setShowingThumbnails] = useState(false);
  const [masonryReady, setMasonryReady] = useState(false);

  const totalSlides = imageData.length;

  const changeSlide = useCallback((direction: number) => {
    setCurrentSlide(prev => {
      let newSlide = prev + direction;
      if (newSlide >= totalSlides) newSlide = 0;
      if (newSlide < 0) newSlide = totalSlides - 1;
      return newSlide;
    });
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (showingThumbnails) {
      setShowingThumbnails(false);
    }
  };

  const toggleThumbnails = () => {
    setMasonryReady(false);
    setShowingThumbnails(prev => !prev);
  };

  // Masonry layout function
  const layoutMasonry = useCallback((columnCount = 3) => {
    if (window.innerWidth <= 768) {
      // Reset any masonry styles on mobile
      const container = document.getElementById('thumbnails');
      if (!container) return;
      const thumbnails = container.querySelectorAll('.thumbnail');
      thumbnails.forEach(thumbnail => {
        (thumbnail as HTMLElement).style.width = '';
        (thumbnail as HTMLElement).style.left = '';
        (thumbnail as HTMLElement).style.top = '';
      });
      container.style.height = '';
      return;
    }
    
    const container = document.getElementById('thumbnails');
    if (!container) return;
    const thumbnails = container.querySelectorAll('.thumbnail');
    
    if (thumbnails.length === 0) return;
    
    const containerWidth = container.offsetWidth;
    const gap = 20;
    const columnWidth = (containerWidth - (gap * (columnCount - 1))) / columnCount;
    
    // Initialize column heights
    const columnHeights = new Array(columnCount).fill(0);
    
    thumbnails.forEach((thumbnail) => {
      const img = thumbnail.querySelector('img') as HTMLImageElement;
      if (!img || !img.complete) return; // Skip if image not loaded
      
      // Calculate which column to place this thumbnail in
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      // Set thumbnail size and position
      (thumbnail as HTMLElement).style.width = `${columnWidth}px`;
      (thumbnail as HTMLElement).style.left = `${shortestColumnIndex * (columnWidth + gap)}px`;
      (thumbnail as HTMLElement).style.top = `${columnHeights[shortestColumnIndex]}px`;
      
      // Calculate the aspect ratio and height
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      const thumbnailHeight = columnWidth * aspectRatio;
      
      // Update column height
      columnHeights[shortestColumnIndex] += thumbnailHeight + gap;
    });
    
    // Set container height
    const maxHeight = Math.max(...columnHeights);
    container.style.height = `${maxHeight}px`;
    
    // Mark masonry as ready
    setMasonryReady(true);
  }, []);

  // Handle responsive layout
  const handleResponsiveLayout = useCallback(() => {
    if (window.innerWidth <= 768) {
      // Mobile layout - thumbnails are always shown
      setMasonryReady(true);
      return;
    } else if (window.innerWidth <= 1366) {
      // Laptop layout
      if (window.innerWidth <= 1200) {
        layoutMasonry(2); // 2 columns for smaller laptops
      } else {
        layoutMasonry(3); // 3 columns for larger laptops
      }
    } else {
      // Desktop layout
      layoutMasonry(3); // 3 columns for desktop
    }
  }, [layoutMasonry]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') changeSlide(-1);
      if (e.key === 'ArrowRight') changeSlide(1);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [changeSlide]);

  // Handle touch/swipe support
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          changeSlide(1);
        } else {
          changeSlide(-1);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [changeSlide]);

  // Initialize masonry layout when thumbnails are shown
  useEffect(() => {
    if (showingThumbnails) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        handleResponsiveLayout();
      }, 50);
    }
  }, [showingThumbnails, handleResponsiveLayout]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      handleResponsiveLayout();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResponsiveLayout]);

  return (
    <div className={`gallery-container ${showingThumbnails ? 'showing-thumbnails' : ''}`} id="home-section">
      <div className="gallery">
        {imageData.map((image, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="nav-zone left" onClick={() => changeSlide(-1)}></div>
            <div className="nav-zone right" onClick={() => changeSlide(1)}></div>
            <ResponsiveImage
              src={image.src}
              alt={image.title}
              width={1200}
              height={800}
              priority={index === currentSlide}
              style={{
                height: '80vh',
                minHeight: '80vh',
                maxHeight: '80vh',
                width: 'auto',
                maxWidth: '90%',
                objectFit: 'contain',
                margin: '0 auto'
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="controls-container">
        <div className="nav-controls">
          <div className="image-title" id="image-title">
            {imageData[currentSlide].title}
            <div className="image-year">{imageData[currentSlide].year}</div>
          </div>
          <div className="nav-buttons">
            <button className="control-btn" onClick={() => changeSlide(-1)}>prev</button>
            <span className="separator">/</span>
            <button className="control-btn" onClick={() => changeSlide(1)}>next</button>
          </div>
          <span className="thumbnails-toggle" onClick={toggleThumbnails}>show all photos</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="thumbnails-container">
        <span 
          className="hide-all-photos" 
          onClick={toggleThumbnails} 
          style={{ display: showingThumbnails ? 'block' : 'none' }}
        >
          hide all photos
        </span>
        {showingThumbnails && <div style={{ height: '60px', width: '100%' }}></div>}
        <div 
          className={`thumbnails ${showingThumbnails ? 'show' : ''}`} 
          id="thumbnails"
          style={{
            opacity: showingThumbnails && masonryReady ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          {imageData.map((image, index) => (
            <div 
              key={index} 
              className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <ResponsiveImage
                src={image.src}
                alt={image.title}
                width={300}
                height={200}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                onLoad={() => {
                  // Trigger masonry layout when image loads
                  if (showingThumbnails) {
                    setTimeout(() => {
                      handleResponsiveLayout();
                    }, 100);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
