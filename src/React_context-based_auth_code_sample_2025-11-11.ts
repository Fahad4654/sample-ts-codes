import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem('user', username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = { user, login, logout, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

// Example usage (within a component)

// import { useAuth } from './authContext';

// const MyComponent = () => {
//   const { user, login, logout, isLoading } = useAuth();

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       {user ? (
//         <>
//           <p>Welcome, {user}!</p>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <button onClick={() => login('testuser')}>Login</button>
//       )}
//     </div>
//   );
// };

// export default MyComponent;