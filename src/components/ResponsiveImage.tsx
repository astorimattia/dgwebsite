'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  sizes?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  style = {},
  onLoad,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate optimized image sources
  const getOptimizedSrc = (originalSrc: string, size: string) => {
    const baseName = originalSrc.replace('.webp', '');
    return `${baseName}${size}.webp`;
  };

  const getAvifSrc = (originalSrc: string) => {
    return originalSrc.replace('.webp', '.avif');
  };

  useEffect(() => {
    if (priority) {
      setCurrentSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, src]);

  useEffect(() => {
    if (isInView) {
      // Use appropriate size based on viewport
      const updateSrc = () => {
        if (window.innerWidth <= 768) {
          setCurrentSrc(getOptimizedSrc(src, '-sm'));
        } else if (window.innerWidth <= 1200) {
          setCurrentSrc(getOptimizedSrc(src, '-md'));
        } else {
          setCurrentSrc(getOptimizedSrc(src, '-lg'));
        }
      };

      updateSrc();
      window.addEventListener('resize', updateSrc);
      return () => window.removeEventListener('resize', updateSrc);
    }
  }, [isInView, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const avifSrc = getAvifSrc(src);

  return (
    <div
      ref={imgRef}
      className={`responsive-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {isInView && currentSrc && (
        <picture>
          <source srcSet={avifSrc} type="image/avif" />
          <Image
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes={sizes}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onLoad={handleLoad}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              width: '100%',
              height: 'auto',
              ...style
            }}
          />
        </picture>
      )}
      {!isLoaded && isInView && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite'
          }}
        />
      )}
      <style jsx>{`
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsiveImage;
