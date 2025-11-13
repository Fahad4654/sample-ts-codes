import React, { useState, useCallback, ChangeEvent } from 'react';

interface AvatarUploaderProps {
  initialAvatar?: string;
  onAvatarChange: (avatar: string | null) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ initialAvatar, onAvatarChange }) => {
  const [avatar, setAvatar] = useState<string | null>(initialAvatar || null);

  const handleImageUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAvatar(null);
      onAvatarChange(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setAvatar(base64String);
      onAvatarChange(base64String);
    };
    reader.readAsDataURL(file);
  }, [onAvatarChange]);

  return (
    <div>
      <img
        src={avatar || 'https://via.placeholder.com/150'}
        alt="Avatar"
        style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        id="avatar-upload"
        style={{ display: 'none' }}
      />
      <label htmlFor="avatar-upload">Upload Avatar</label>
    </div>
  );
};

export default AvatarUploader;