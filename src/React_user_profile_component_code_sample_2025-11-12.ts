import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  bio?: string;
}

const defaultUser: User = {
  id: 0,
  name: 'Loading...',
  email: '',
  avatarUrl: '',
};

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(`https://example.com/api/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User = await response.json();
        setUser(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-profile">
      <img src={user.avatarUrl} alt={`Avatar of ${user.name}`} />
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      {user.bio && <p>Bio: {user.bio}</p>}
    </div>
  );
};

export default UserProfile;