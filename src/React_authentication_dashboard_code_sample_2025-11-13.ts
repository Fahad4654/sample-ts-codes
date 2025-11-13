// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: { id: string; email: string } | null;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate token verification and user retrieval
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({ id: 'user123', email: 'test@example.com' });
      }, 500);
    }
  }, []);

  const login = () => {
    // Simulate login
    localStorage.setItem('token', 'dummy_token');
    setIsAuthenticated(true);
    setUser({ id: 'user123', email: 'test@example.com' });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

// Dashboard.tsx
import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;

// Login.tsx
import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;

// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Dashboard from './Dashboard';
import Login from './Login';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;