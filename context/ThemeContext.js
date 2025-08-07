import { createContext, useContext, useState, useEffect } from "react";

// Create a Context for the theme
const ThemeContext = createContext();

// ThemeProvider component that will wrap the app
export const ThemeProvider = ({ children }) => {
  // Set a state to track if the component is mounted (to avoid SSR mismatch)
  const [isMounted, setIsMounted] = useState(false);

  // Get the theme from localStorage (if available)
  const storedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  
  // Default theme is light if none is found in localStorage
  const [theme, setTheme] = useState(storedTheme || "light");

  // Toggle the theme and store it in localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  // Use useEffect to set the body class after the initial render (client-side)
  useEffect(() => {
    document.body.className = theme; // Apply theme class to body
    setIsMounted(true); // Set mounted to true to allow rendering on the client side
  }, [theme]);

  // Avoid rendering the component until after the first render
  if (!isMounted) {
    return null; // Do not render anything on the server-side
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export ThemeContext for use in components
export { ThemeContext };
