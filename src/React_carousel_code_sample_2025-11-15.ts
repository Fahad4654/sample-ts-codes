import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div style={{ width: '300px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', transition: 'transform 0.3s ease-in-out', transform: `translateX(-${currentIndex * 300}px)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index + 1}`} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
        ))}
      </div>
      <button onClick={handlePrev} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}>Prev</button>
      <button onClick={handleNext} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>Next</button>
    </div>
  );
};

export default Carousel;