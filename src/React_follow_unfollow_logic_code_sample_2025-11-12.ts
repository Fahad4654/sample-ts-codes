import React, { useState } from 'react';

interface FollowButtonProps {
  userId: string;
  initialFollowing: boolean;
  onFollow: (userId: string) => Promise<void>;
  onUnfollow: (userId: string) => Promise<void>;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, initialFollowing, onFollow, onUnfollow }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowToggle = async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        await onUnfollow(userId);
      } else {
        await onFollow(userId);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow:", error);
      // Handle error appropriately, e.g., display an error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleFollowToggle} disabled={isLoading}>
      {isLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;