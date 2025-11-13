import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) || 'light'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return [theme, toggleTheme];
};

export default useTheme;