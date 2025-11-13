import React, { createContext, useContext, useState } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// Provider component to wrap your app
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the theme elsewhere
export const useTheme = () => useContext(ThemeContext);
