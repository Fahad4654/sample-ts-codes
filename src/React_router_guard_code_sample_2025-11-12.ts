import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Navigate,
    Routes,
    useLocation
} from 'react-router-dom';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const value: AuthContextProps = {
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


const LoginPage: React.FC = () => {
    const { login } = useAuth();
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={login}>Login</button>
        </div>
    );
};

const DashboardPage: React.FC = () => {
    const { logout } = useAuth();
    return (
        <div>
            <h1>Dashboard Page</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

const PublicPage: React.FC = () => (
    <div>
        <h1>Public Page</h1>
    </div>
);


interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/public" element={<PublicPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <DashboardPage />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<Navigate to="/public" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;