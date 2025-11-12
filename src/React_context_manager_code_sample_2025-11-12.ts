import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
  primaryColor: string;
  secondaryColor: string;
}

const defaultTheme: Theme = {
  primaryColor: 'blue',
  secondaryColor: 'white',
};

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme, Theme };