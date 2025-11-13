import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
}

interface GalleryProps {
  products: Product[];
}

const ProductGallery: React.FC<GalleryProps> = ({ products }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(products[0]?.imageUrl || null);

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {selectedImage && (
        <img src={selectedImage} alt="Selected Product" style={{ maxWidth: '500px', maxHeight: '400px' }} />
      )}
      <div style={{ display: 'flex', marginTop: '10px' }}>
        {products.map((product) => (
          <img
            key={product.id}
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '80px', height: '60px', margin: '5px', cursor: 'pointer', border: selectedImage === product.imageUrl ? '2px solid blue' : 'none' }}
            onClick={() => handleThumbnailClick(product.imageUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

// Example Usage
const productsData: Product[] = [
  { id: 1, name: 'Product 1', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', imageUrl: 'https://via.placeholder.com/200' },
  { id: 3, name: 'Product 3', imageUrl: 'https://via.placeholder.com/250' },
];

const App: React.FC = () => {
  return (
    <div>
      <ProductGallery products={productsData} />
    </div>
  );
};

export { App };