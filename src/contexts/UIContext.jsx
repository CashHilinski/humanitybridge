import { createContext, useContext, useState } from 'react'

// Create context
const UIContext = createContext(null)

export const UIProvider = ({ children }) => {
  // Track visibility states of various UI components
  const [uiState, setUIState] = useState({
    isSearchOpen: false,
    isCommandOpen: false,
    isNotificationOpen: false,
    isHelpPanelOpen: true, // Globe instructions panel
    isFloatingActionOpen: false
  })

  // Function to open one component and close others
  const openUI = (componentName, value = true) => {
    // Create a new state where everything is closed
    const newState = Object.keys(uiState).reduce((acc, key) => {
      acc[key] = false
      return acc
    }, {})
    
    // Then set the requested component to the specified value (default is true)
    setUIState({
      ...newState,
      [componentName]: value
    })
  }

  // Function to close a specific component
  const closeUI = (componentName) => {
    setUIState(prevState => ({
      ...prevState,
      [componentName]: false
    }))
  }

  // Function to toggle a component's state (and close others)
  const toggleUI = (componentName) => {
    if (uiState[componentName]) {
      // If it's already open, just close it
      closeUI(componentName)
    } else {
      // If it's closed, open it and close others
      openUI(componentName)
    }
  }

  return (
    <UIContext.Provider 
      value={{ 
        uiState,
        openUI,
        closeUI,
        toggleUI
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

// Custom hook to use the UI context
export const useUI = () => {
  const context = useContext(UIContext)
  if (context === null) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
} 