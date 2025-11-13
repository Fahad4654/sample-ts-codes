import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
}

const LazyImage = ({ src, alt, placeholder }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = src;
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
    }
    };
  }, [src]);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <img
      ref={imageRef}
      src={placeholder}
      alt={alt}
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        width: '100%',
        height: 'auto',
      }}
      onLoad={handleImageLoad}
    />
  );
};

export default LazyImage;

// Example Usage (within another component):

interface MyComponentProps {
  imageUrl: string;
  imageAlt: string;
  placeholderUrl: string;
}

const MyComponent: React.FC<MyComponentProps> = ({imageUrl, imageAlt, placeholderUrl}) => {
    return (
        <LazyImage src={imageUrl} alt={imageAlt} placeholder={placeholderUrl} />
    );
}

export { MyComponent }