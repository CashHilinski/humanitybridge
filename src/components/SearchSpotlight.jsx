import { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { useTheme } from '../contexts/ThemeContext'
import { useUI } from '../contexts/UIContext'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1200;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  padding-top: 100px;
  animation: ${fadeIn} 0.2s ease-out;
`

const SearchContainer = styled.div`
  width: 650px;
  max-width: 90vw;
  max-height: 70vh;
  background: rgba(30, 30, 30, 0.9);
  border-radius: 16px;
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${slideDown} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
`

const SearchIcon = styled.div`
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  margin-right: 12px;
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const Input = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  outline: none;
  width: 100%;
  font-family: inherit;
  letter-spacing: -0.2px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`

const ClearButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  padding: 0;
  margin-left: 8px;
  transition: all 0.2s ease;
  
  svg {
    width: 12px;
    height: 12px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const EscKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  margin-left: 8px;
  letter-spacing: -0.2px;
  user-select: none;
`

const ResultsContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 12px 8px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
`

const ResultCategory = styled.div`
  padding: 0 12px;
  margin-bottom: 16px;
`

const CategoryTitle = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  padding: 0 8px;
`

const ResultItem = styled.div`
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 14px;
  animation: ${slideDown} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  animation-delay: ${props => props.$index * 0.03}s;
  opacity: 0;
  animation-fill-mode: forwards;
  background: ${props => props.$isSelected ? 'rgba(0, 113, 227, 0.2)' : 'transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`

const ResultIconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${props => props.$color || 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 18px;
    height: 18px;
    color: white;
  }
`

const ResultContent = styled.div`
  flex: 1;
  overflow: hidden;
`

const ResultTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  strong {
    color: var(--accent-blue);
    font-weight: 500;
  }
`

const ResultSubtitle = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Shortcut = styled.div`
  font-size: 11px;
  background: rgba(255, 255, 255, 0.1);
  padding: 3px 6px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.6);
`

const LoadingPlaceholder = styled.div`
  height: 18px;
  margin-bottom: 4px;
  border-radius: 4px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.05) 8%, rgba(255, 255, 255, 0.1) 18%, rgba(255, 255, 255, 0.05) 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite;
  width: ${props => props.$width || '100%'};
`

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.5);
  animation: ${fadeIn} 0.3s ease;
  text-align: center;
  
  svg {
    width: 40px;
    height: 40px;
    margin-bottom: 16px;
    opacity: 0.4;
  }
  
  h3 {
    font-size: 16px;
    margin: 0 0 8px 0;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }
  
  p {
    font-size: 14px;
    margin: 0;
    max-width: 300px;
    line-height: 1.5;
  }
`

const Footer = styled.div`
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`

const FooterTip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  
  span {
    display: flex;
    align-items: center;
    padding: 2px 5px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    height: 18px;
    font-size: 11px;
  }
`

// Icons
const SearchIconSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
)

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
)

const SunMoonIcon = ({ isDark }) => (
  isDark ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  )
)

const SearchSpotlight = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const resultsRef = useRef([])
  const { theme, toggleTheme } = useTheme()
  const { toggleUI } = useUI()
  
  // Example data
  const pages = [
    { id: 'home', title: 'Home', path: '/', icon: <GlobeIcon />, color: 'var(--accent-blue)' },
    { id: 'about', title: 'About Us', path: '/about', icon: <InfoIcon />, color: 'var(--accent-pink)' },
    { id: 'volunteer', title: 'Volunteer Opportunities', path: '/volunteer', icon: <UserIcon />, color: 'var(--accent-teal)' },
    { id: 'map', title: 'Interactive Map', path: '/map', icon: <MapIcon />, color: 'var(--accent-purple)' },
    { id: 'projects', title: 'Projects', path: '/projects', icon: <FolderIcon />, color: 'var(--accent-orange)' },
    { id: 'faq', title: 'FAQ', path: '/faq', icon: <DocumentIcon />, color: 'var(--accent-blue)' },
  ]
  
  const documents = [
    { id: 'doc1', title: 'Annual Report 2023', path: '/docs/annual-report-2023', icon: <DocumentIcon />, color: 'var(--accent-teal)' },
    { id: 'doc2', title: 'Volunteer Guidelines', path: '/docs/volunteer-guidelines', icon: <DocumentIcon />, color: 'var(--accent-teal)' },
    { id: 'doc3', title: 'Privacy Policy', path: '/privacy-policy', icon: <DocumentIcon />, color: 'var(--accent-teal)' },
  ]
  
  // Commands array for special actions
  const commands = [
    { 
      id: 'theme', 
      title: `/theme (${theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'})`, 
      path: '#theme', 
      icon: <SunMoonIcon isDark={theme === 'dark'} />, 
      color: 'var(--accent-yellow)',
      action: () => {
        toggleTheme();
        onClose();
      }
    }
  ]
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 100)
    }

    // Reset state when closed
    if (!isOpen) {
      setSearchTerm('')
      setSelectedIndex(0)
      setIsLoading(false)
    }
  }, [isOpen])
  
  // Handle search and simulate API request
  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
    
    // Reset selected index when search term changes
    setSelectedIndex(0)
  }, [searchTerm])
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      
      // Close on escape
      if (e.key === 'Escape') {
        onClose()
      }
      
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => {
          const allResults = [...getFilteredCommands(), ...getFilteredPages(), ...getFilteredDocuments()]
          return (prev + 1) % Math.max(allResults.length, 1)
        })
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => {
          const allResults = [...getFilteredCommands(), ...getFilteredPages(), ...getFilteredDocuments()]
          return (prev - 1 + allResults.length) % allResults.length
        })
      }
      
      if (e.key === 'Enter') {
        e.preventDefault()
        const allResults = [...getFilteredCommands(), ...getFilteredPages(), ...getFilteredDocuments()]
        if (allResults[selectedIndex]) {
          handleResultClick(allResults[selectedIndex])
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, searchTerm])
  
  // Filter pages based on search term
  const getFilteredPages = () => {
    if (!searchTerm) return pages.slice(0, 4) // Show some popular pages when no search
    
    return pages.filter(page => 
      page.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  
  // Filter documents based on search term
  const getFilteredDocuments = () => {
    if (!searchTerm) return [] // Don't show documents when no search
    
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  
  // Filter commands based on search term
  const getFilteredCommands = () => {
    // Always show theme command if search term is empty or starts with /theme
    if (!searchTerm || searchTerm.startsWith('/theme')) {
      return commands
    }
    
    // Otherwise, filter commands like other items
    return commands.filter(cmd => 
      cmd.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  
  // Handle clicking on a result
  const handleResultClick = (result) => {
    if (result.action) {
      result.action();
    } else {
      console.log('Navigating to:', result.path)
      onClose()
      // Would normally use router navigation here
    }
  }
  
  // Highlight matching text
  const highlightMatch = (text) => {
    if (!searchTerm) return <span>{text}</span>
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'))
    
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === searchTerm.toLowerCase() 
            ? <strong key={i}>{part}</strong> 
            : part
        )}
      </span>
    )
  }
  
  const filteredPages = getFilteredPages()
  const filteredDocuments = getFilteredDocuments()
  const filteredCommands = getFilteredCommands()
  
  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <SearchContainer onClick={e => e.stopPropagation()}>
        <SearchInputContainer>
          <SearchIcon>
            <SearchIconSvg />
          </SearchIcon>
          <Input 
            ref={inputRef}
            type="text" 
            placeholder="Search for pages, documents, or type /theme to change theme..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ClearButton onClick={() => setSearchTerm('')}>
              <CloseIcon />
            </ClearButton>
          )}
          <EscKey>ESC</EscKey>
        </SearchInputContainer>
        
        <ResultsContainer>
          {isLoading ? (
            <ResultCategory>
              <CategoryTitle>Loading results</CategoryTitle>
              {[1, 2, 3].map(i => (
                <ResultItem key={i}>
                  <ResultIconContainer>
                    <LoadingPlaceholder $width="18px" />
                  </ResultIconContainer>
                  <ResultContent>
                    <LoadingPlaceholder $width="60%" />
                    <LoadingPlaceholder $width="40%" />
                  </ResultContent>
                </ResultItem>
              ))}
            </ResultCategory>
          ) : (
            <>
              {filteredCommands.length > 0 && (
                <ResultCategory>
                  <CategoryTitle>Commands</CategoryTitle>
                  {filteredCommands.map((command, index) => {
                    const absoluteIndex = index;
                    return (
                      <ResultItem 
                        key={command.id} 
                        $index={index}
                        $isSelected={selectedIndex === absoluteIndex}
                        onClick={() => handleResultClick(command)}
                        ref={el => resultsRef.current[absoluteIndex] = el}
                      >
                        <ResultIconContainer $color={command.color}>
                          {command.icon}
                        </ResultIconContainer>
                        <ResultContent>
                          <ResultTitle>
                            {highlightMatch(command.title)}
                          </ResultTitle>
                          <ResultSubtitle>Toggle between light and dark themes</ResultSubtitle>
                        </ResultContent>
                      </ResultItem>
                    );
                  })}
                </ResultCategory>
              )}
            
              {filteredPages.length === 0 && filteredDocuments.length === 0 && filteredCommands.length === 0 ? (
                <NoResultsContainer>
                  <SearchIconSvg />
                  <h3>No results found</h3>
                  <p>
                    We couldn't find anything matching "{searchTerm}". 
                    Try checking for typos or using different keywords.
                  </p>
                </NoResultsContainer>
              ) : (
                <>
                  {filteredPages.length > 0 && (
                    <ResultCategory>
                      <CategoryTitle>Pages</CategoryTitle>
                      {filteredPages.map((page, index) => {
                        const absoluteIndex = filteredCommands.length + index
                        return (
                          <ResultItem 
                            key={page.id} 
                            $index={index}
                            $isSelected={selectedIndex === absoluteIndex}
                            onClick={() => handleResultClick(page)}
                            ref={el => resultsRef.current[absoluteIndex] = el}
                          >
                            <ResultIconContainer $color={page.color}>
                              {page.icon}
                            </ResultIconContainer>
                            <ResultContent>
                              <ResultTitle>
                                {highlightMatch(page.title)}
                              </ResultTitle>
                              <ResultSubtitle>{page.path}</ResultSubtitle>
                            </ResultContent>
                          </ResultItem>
                        )
                      })}
                    </ResultCategory>
                  )}
                  
                  {filteredDocuments.length > 0 && (
                    <ResultCategory>
                      <CategoryTitle>Documents</CategoryTitle>
                      {filteredDocuments.map((doc, index) => {
                        const absoluteIndex = filteredCommands.length + filteredPages.length + index
                        return (
                          <ResultItem 
                            key={doc.id} 
                            $index={index}
                            $isSelected={selectedIndex === absoluteIndex}
                            onClick={() => handleResultClick(doc)}
                            ref={el => resultsRef.current[absoluteIndex] = el}
                          >
                            <ResultIconContainer $color={doc.color}>
                              {doc.icon}
                            </ResultIconContainer>
                            <ResultContent>
                              <ResultTitle>
                                {highlightMatch(doc.title)}
                              </ResultTitle>
                              <ResultSubtitle>{doc.path}</ResultSubtitle>
                            </ResultContent>
                          </ResultItem>
                        )
                      })}
                    </ResultCategory>
                  )}
                </>
              )}
            </>
          )}
        </ResultsContainer>
        
        <Footer>
          <FooterTip>
            Navigate with <span>↑</span> <span>↓</span>
          </FooterTip>
          <FooterTip>
            Select with <span>Enter</span>
          </FooterTip>
        </Footer>
      </SearchContainer>
    </Overlay>
  )
}

export default SearchSpotlight 