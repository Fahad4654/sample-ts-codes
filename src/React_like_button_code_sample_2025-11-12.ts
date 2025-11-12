import React, { useState } from 'react';

interface LikeButtonProps {
  initialLikes?: number;
  onLike?: (newCount: number) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes = 0, onLike }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    const newCount = likes + 1;
    setLikes(newCount);
    if (onLike) {
      onLike(newCount);
    }
  };

  return (
    <button onClick={handleLike}>
      Like ({likes})
    </button>
  );
};

export default LikeButton;