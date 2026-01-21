'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';


interface ImageData {
  src: string;
  title: string;
  year: string;
}

const imageData: ImageData[] = [
  // Maut Ka Kuan series (India)
  { src: '/assets/images-optimized/mautkakuan-analog.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog3.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog5.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog6.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog7.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog8.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog10.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog12.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog13.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog14.webp', title: 'Maut Ka Kuan, India', year: '2025' },
  { src: '/assets/images-optimized/mautkakuan-analog15.webp', title: 'Maut Ka Kuan, India', year: '2025' },

  // Banni series (India)
  { src: '/assets/images-optimized/banni-analog.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog2.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog3.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog5.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog6.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog7.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog8.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog9.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog10.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog11.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog13.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog14.webp', title: 'Banni, India', year: '2025' },
  { src: '/assets/images-optimized/banni-analog15.webp', title: 'Banni, India', year: '2025' },

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

    // Set loading state if the new image isn't loaded yet
    if (!loadedImages.has(index)) {
      setImageLoading(true);
    }
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

  return (
    <>
      {/* Main Gallery Container */}
      <div className="relative flex flex-col w-full h-full mx-auto max-w-[1200px] min-h-[calc(100dvh-60px)] md:min-h-[calc(100vh-60px)] pt-0 pb-0 transition-all duration-300 ease-in-out p-0 md:p-0 min-h-auto md:min-h-[calc(100vh-60px)]" id="home-section">

        {/* Desktop Gallery - Image Area */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1 relative">
          {/* Navigation hover zones */}
          <div className="absolute top-0 h-full w-1/2 cursor-pointer opacity-0 transition-opacity duration-300 ease-in-out left-0 bg-gradient-to-r from-white/20 to-transparent hover:opacity-100 z-10" onClick={() => changeSlide(-1)} style={{ cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>') 12 12, auto`, pointerEvents: 'auto' }}></div>
          <div className="absolute top-0 h-full w-1/2 cursor-pointer opacity-0 transition-opacity duration-300 ease-in-out right-0 bg-gradient-to-l from-white/20 to-transparent hover:opacity-100 z-10" onClick={() => changeSlide(1)} style={{ cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>') 12 12, auto`, pointerEvents: 'auto' }}></div>

          {/* Loading indicator */}
          {imageLoading && showSpinner && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/95 z-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          )}

          {imageData.map((image, index) => {
            // Calculate if image should be mounted (current, next, or previous)
            // We want to keep adjacent images mounted to allow loading
            const isCurrent = index === currentSlide;
            const isNext = index === (currentSlide + 1) % totalSlides;
            const isPrev = index === (currentSlide - 1 + totalSlides) % totalSlides;

            // Preload strategy: mount current, next, and prev.
            const shouldMount = isCurrent || isNext || isPrev;

            if (!shouldMount && !loadedImages.has(index)) return null;

            return (
              <div
                key={index}
                className={`w-full h-full relative ${shouldMount || loadedImages.has(index) ? 'block' : 'hidden'}`}
                style={{
                  display: shouldMount || loadedImages.has(index) ? 'block' : 'none',
                  position: isCurrent ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: isCurrent ? 1 : 0,
                  opacity: isCurrent ? 1 : 0,
                  pointerEvents: isCurrent ? 'auto' : 'none'
                }}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  width={1200}
                  height={800}
                  priority={isCurrent}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                  style={{
                    height: '100%',
                    minHeight: 'unset',
                    maxHeight: 'unset',
                    width: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    margin: '0 auto',
                    opacity: loadedImages.has(index) ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
                />
              </div>
            )
          })}
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

        {/* Desktop Navigation Controls - Fixed at bottom */}
        <div className="hidden md:flex items-center gap-[10px] text-sm justify-center relative bottom-0 left-0 right-0 z-[2] py-6 bg-white">
          <div className="grid grid-cols-[1fr_auto] items-center gap-[10px] w-full mx-5">
            <div className="text-sm text-black opacity-100 font-gt-america-regular leading-[1.4] flex flex-row items-center gap-2 text-left col-start-1 justify-self-start" id="image-title">
              {imageData[currentSlide].title}
              <div className="text-xs text-[#666] font-gt-america-thin">{imageData[currentSlide].year}</div>
            </div>
            <div className="flex items-center gap-[10px] justify-center col-start-2 justify-self-end">
              <button className="bg-none border-none text-black cursor-pointer text-sm underline transition-opacity duration-200 ease-in-out font-gt-america-thin p-0 hover:opacity-50" onClick={() => changeSlide(-1)}>prev</button>
              <span className="text-black mx-[5px] font-gt-america-thin">/</span>
              <button className="bg-none border-none text-black cursor-pointer text-sm underline transition-opacity duration-200 ease-in-out font-gt-america-thin p-0 hover:opacity-50" onClick={() => changeSlide(1)}>next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Container - Separate from main gallery */}
      <div className="hidden md:flex justify-center relative flex-col items-center w-full max-w-[1200px] mx-auto flex-shrink-0 z-[1]">
        {/* Mobile View - Single Column */}
        <div
          className="relative w-full mx-auto pb-10 space-y-5 md:hidden"
          id="thumbnails-mobile"
        >
          {imageData.map((image, index) => (
            <div
              key={index}
              className="thumbnail cursor-pointer relative transition-transform duration-200 ease-in-out hover:scale-[1.02]"
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

        {/* Desktop View - Split Columns for correct global order */}
        <div
          className="relative w-full mx-auto pb-10 hidden md:grid grid-cols-2 gap-5 items-start"
          id="thumbnails-desktop"
        >
          {/* Left Column - Even Indices (0, 2, 4...) */}
          <div className="flex flex-col gap-5">
            {imageData.filter((_, i) => i % 2 === 0).map((image, i) => {
              const originalIndex = i * 2;
              return (
                <div
                  key={originalIndex}
                  className="thumbnail cursor-pointer relative transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                  onClick={() => goToSlide(originalIndex)}
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
                    sizes="50vw"
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column - Odd Indices (1, 3, 5...) */}
          <div className="flex flex-col gap-5">
            {imageData.filter((_, i) => i % 2 !== 0).map((image, i) => {
              const originalIndex = (i * 2) + 1;
              return (
                <div
                  key={originalIndex}
                  className="thumbnail cursor-pointer relative transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                  onClick={() => goToSlide(originalIndex)}
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
                    sizes="50vw"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
