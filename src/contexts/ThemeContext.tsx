import { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
  isDarkMode: boolean;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [theme, setTheme] = useState<Theme>({
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme.isDarkMode]);

  const toggleTheme = () => {
    setTheme(prev => ({
      ...prev,
      isDarkMode: !prev.isDarkMode,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
