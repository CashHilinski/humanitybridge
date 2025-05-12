import { createContext, useContext, useState, useEffect } from 'react'

// Create context
const ThemeContext = createContext(null)

// Set theme in document and localStorage
function setTheme(themeName) {
  localStorage.setItem('theme', themeName)
  document.documentElement.setAttribute('data-theme', themeName)
  
  // Apply theme class to body
  if (themeName === 'dark') {
    document.body.classList.add('dark-theme')
    document.body.classList.remove('light-theme')
  } else {
    document.body.classList.add('light-theme')
    document.body.classList.remove('dark-theme')
  }
}

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [theme, setThemeState] = useState(() => {
    // Check for theme in localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    // Default to dark theme
    return 'dark'
  })
  
  // Apply theme effect
  useEffect(() => {
    setTheme(theme)
  }, [theme])
  
  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setThemeState(e.matches ? 'dark' : 'light')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  // Toggle theme function
  const toggleTheme = () => {
    setThemeState(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark'
      return newTheme
    })
  }
  
  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme: setThemeState, 
        toggleTheme,
        isDark: theme === 'dark'
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 