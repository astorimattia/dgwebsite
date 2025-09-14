'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
  const [imageLoading, setImageLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const totalSlides = imageData.length;

  const changeSlide = useCallback((direction: number) => {
    setCurrentSlide(prev => {
      let newSlide = prev + direction;
      if (newSlide >= totalSlides) newSlide = 0;
      if (newSlide < 0) newSlide = totalSlides - 1;
      
      // Set loading state if the new image isn't loaded yet
      if (!loadedImages.has(newSlide)) {
        setImageLoading(true);
      }
      
      return newSlide;
    });
  }, [totalSlides, loadedImages]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
    if (index === currentSlide) {
      setImageLoading(false);
      setShowSpinner(false);
    }
  }, [currentSlide]);

  const handleImageError = useCallback((index: number) => {
    console.error(`Failed to load image at index ${index}`);
    // Still mark as "loaded" to prevent infinite loading
    setLoadedImages(prev => new Set(prev).add(index));
    if (index === currentSlide) {
      setImageLoading(false);
      setShowSpinner(false);
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (showingThumbnails) {
      setShowingThumbnails(false);
    }
    
    // Set loading state if the new image isn't loaded yet
    if (!loadedImages.has(index)) {
      setImageLoading(true);
    }
  };

  const toggleThumbnails = () => {
    setMasonryReady(false);
    setShowingThumbnails(prev => !prev);
  };

  // Handle loading state when current slide changes
  useEffect(() => {
    if (loadedImages.has(currentSlide)) {
      setImageLoading(false);
      setShowSpinner(false);
    } else {
      setImageLoading(true);
      // Add 350ms delay before showing spinner
      const timer = setTimeout(() => {
        setShowSpinner(true);
      }, 350);
      
      return () => clearTimeout(timer);
    }
  }, [currentSlide, loadedImages]);

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
    <>
      {/* Main Gallery Container */}
      <div className={`relative flex flex-col items-center w-full h-full justify-center mx-auto max-w-[1200px] min-h-[calc(100vh-60px)] pt-0 md:pt-[50px] pb-[140px] transition-all duration-300 ease-in-out p-0 md:p-0 min-h-auto md:min-h-[calc(100vh-60px)] ${showingThumbnails ? 'hidden' : ''}`} id="home-section">
        {/* Gallery */}
        <div className={`relative text-center w-full max-w-[1200px] mx-auto flex flex-col flex-shrink-0 items-center hidden md:flex -mt-4 ${showingThumbnails ? 'hidden' : ''}`}>
          {/* Navigation hover zones - outside the image loop */}
          <div className="absolute top-0 h-full w-1/2 cursor-pointer opacity-0 transition-opacity duration-300 ease-in-out left-0 bg-gradient-to-r from-white/20 to-transparent hover:opacity-100 z-10" onClick={() => changeSlide(-1)} style={{cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>') 12 12, auto`, pointerEvents: 'auto'}}></div>
          <div className="absolute top-0 h-full w-1/2 cursor-pointer opacity-0 transition-opacity duration-300 ease-in-out right-0 bg-gradient-to-l from-white/20 to-transparent hover:opacity-100 z-10" onClick={() => changeSlide(1)} style={{cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>') 12 12, auto`, pointerEvents: 'auto'}}></div>
          
          {/* Loading indicator */}
          {imageLoading && showSpinner && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/95 z-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          )}
          
          {imageData.map((image, index) => (
            <div 
              key={index} 
              className={`w-full h-full relative ${index === currentSlide ? 'block' : 'hidden'}`}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={1200}
                height={800}
                priority={index === currentSlide}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                style={{
                  height: 'calc(95vh - 80px)',
                  minHeight: 'calc(95vh - 80px)',
                  maxHeight: 'calc(95vh - 80px)',
                  width: 'auto',
                  maxWidth: '95%',
                  objectFit: 'contain',
                  margin: '0 auto',
                  opacity: loadedImages.has(index) ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
              />
            </div>
          ))}
        </div>

        {/* Mobile Thumbnails - Always visible on mobile */}
        <div className="block md:hidden relative w-full mx-auto flex-shrink-0 z-[1] p-0">
          <div className="relative w-full mx-auto pb-0" id="mobile-thumbnails">
            {imageData.map((image, index) => (
              <div 
                key={index} 
                className="cursor-pointer static w-full mb-5 break-inside-avoid hover:transform-none"
                onClick={() => goToSlide(index)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  width={300}
                  height={200}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className={`hidden md:flex items-center gap-[10px] text-sm justify-center absolute bottom-2 left-0 right-0 z-[2] px-5 ${showingThumbnails ? 'hidden' : ''}`}>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[10px] w-full mx-5">
            <div className="text-sm text-black opacity-100 font-gt-america-regular leading-[1.4] flex flex-row items-center gap-2 text-left col-start-1 justify-self-start" id="image-title">
              {imageData[currentSlide].title}
              <div className="text-xs text-[#666] font-gt-america-thin">{imageData[currentSlide].year}</div>
            </div>
            <div className="flex items-center gap-[10px] justify-center col-start-2">
              <button className="bg-none border-none text-black cursor-pointer text-sm underline transition-opacity duration-200 ease-in-out font-gt-america-thin p-0 hover:opacity-50" onClick={() => changeSlide(-1)}>prev</button>
              <span className="text-black mx-[5px] font-gt-america-thin">/</span>
              <button className="bg-none border-none text-black cursor-pointer text-sm underline transition-opacity duration-200 ease-in-out font-gt-america-thin p-0 hover:opacity-50" onClick={() => changeSlide(1)}>next</button>
            </div>
            <span className="text-black cursor-pointer text-sm underline p-0 text-center font-gt-america-thin bg-none border-none outline-none transition-opacity duration-200 ease-in-out col-start-3 justify-self-end hover:opacity-50" onClick={toggleThumbnails}>show all photos</span>
          </div>
        </div>
      </div>

      {/* Thumbnails Container - Separate from main gallery */}
      <div className={`hidden md:flex justify-center relative flex-col items-center w-full max-w-[1200px] mx-auto flex-shrink-0 z-[1] ${showingThumbnails ? 'pt-[60px]' : 'hidden'}`}>
        <span 
          className="text-black cursor-pointer text-sm underline p-0 text-center w-full font-gt-america-thin bg-none border-none outline-none transition-opacity duration-200 ease-in-out absolute top-4 left-0 right-0 z-[3] hover:opacity-50" 
          onClick={toggleThumbnails} 
          style={{ display: showingThumbnails ? 'block' : 'none' }}
        >
          hide all photos
        </span>
        <div 
          className={`relative w-full mx-auto pb-10 ${showingThumbnails ? 'block' : 'hidden'}`} 
          id="thumbnails"
          style={{
            opacity: showingThumbnails && masonryReady ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          {imageData.map((image, index) => (
            <div 
              key={index} 
              className="thumbnail cursor-pointer absolute transition-transform duration-200 ease-in-out mb-5 hover:scale-[1.02]"
              onClick={() => goToSlide(index)}
            >
              <Image
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
    </>
  );
};

export default Gallery;
