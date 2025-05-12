import { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { useUI } from '../contexts/UIContext'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const blurIn = keyframes`
  from {
    backdrop-filter: blur(0px);
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    backdrop-filter: blur(30px);
    background-color: rgba(0, 0, 0, 0.7);
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: flex-start;
  padding-top: 15vh;
  z-index: 9999;
  animation: ${blurIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`

const CommandContainer = styled.div`
  width: 600px;
  max-width: 90%;
  background: rgba(20, 20, 20, 0.95);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  animation: ${fadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  @media (max-width: 768px) {
    width: 90%;
  }
`

const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  padding: 18px 20px;
  font-size: 16px;
  color: var(--text-primary);
  outline: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-family: inherit;
  letter-spacing: -0.2px;

  &::placeholder {
    color: var(--text-tertiary);
  }
`

const CommandList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 10px 0;

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

const CommandGroup = styled.div`
  padding: 6px 16px;
  
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`

const GroupTitle = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  color: var(--text-tertiary);
  padding: 8px 0;
  letter-spacing: 0.5px;
  font-weight: 500;
`

const CommandItem = styled.div`
  padding: 10px 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${props => props.$isSelected ? 'rgba(0, 113, 227, 0.2)' : 'transparent'};
  margin-bottom: 2px;
  animation: ${slideUp} 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  animation-delay: ${props => props.$index * 0.03}s;
  animation-fill-mode: both;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`

const IconWrapper = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  background: ${props => props.$bg || 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$color || 'var(--text-primary)'};
`

const CommandContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const CommandText = styled.div`
  display: flex;
  flex-direction: column;
`

const CommandTitle = styled.div`
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
  letter-spacing: -0.2px;
  margin-bottom: 2px;
`

const CommandDescription = styled.div`
  font-size: 12px;
  color: var(--text-tertiary);
  letter-spacing: -0.1px;
`

const ShortcutTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-tertiary);
  font-size: 12px;
`

const KeyboardKey = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 500;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
`

const StatusBadge = styled.span`
  background: ${props => props.$type === 'new' ? 'var(--accent-blue)' : 'var(--accent-teal)'};
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const FooterHint = styled.div`
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-tertiary);
  font-size: 12px;
`

const CommandMenu = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(0)
  const inputRef = useRef(null)
  const { language, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { uiState, toggleUI, openUI } = useUI()
  const isOpen = uiState.isCommandOpen

  // Command menu navigation sections and items
  const commandGroups = [
    {
      title: 'Navigation',
      items: [
        { 
          icon: '🏠', 
          title: 'Home', 
          description: 'Return to homepage', 
          shortcut: 'G H',
          action: () => scrollToTop(),
          bg: 'rgba(0, 113, 227, 0.2)',
          color: 'var(--accent-blue)'
        },
        { 
          icon: 'ℹ️', 
          title: 'About', 
          description: 'Learn about us', 
          shortcut: 'G A',
          action: () => scrollToSection('about'),
          bg: 'rgba(255, 55, 95, 0.2)',
          color: 'var(--accent-pink)'
        },
        { 
          icon: '📊', 
          title: 'Impact', 
          description: 'See our global impact', 
          shortcut: 'G I',
          action: () => scrollToSection('impact'),
          bg: 'rgba(45, 193, 180, 0.2)',
          color: 'var(--accent-teal)'
        },
        { 
          icon: '📞', 
          title: 'Contact', 
          description: 'Get in touch with us', 
          shortcut: 'G C',
          action: () => scrollToSection('contact'),
          bg: 'rgba(94, 92, 230, 0.2)',
          color: 'var(--accent-purple)'
        }
      ]
    },
    {
      title: 'Actions',
      items: [
        { 
          icon: '🌐', 
          title: 'View Interactive Globe', 
          description: 'Explore our global presence', 
          shortcut: '⌘ G',
          badge: 'new',
          action: () => scrollToTop(),
          bg: 'rgba(45, 193, 180, 0.2)',
          color: 'var(--accent-teal)'
        },
        { 
          icon: '🤝', 
          title: 'Volunteer', 
          description: 'Find opportunities to help', 
          shortcut: '⌘ V',
          action: () => window.location.href = "#volunteer",
          bg: 'rgba(255, 149, 0, 0.2)',
          color: 'var(--accent-orange)'
        },
        { 
          icon: '📝', 
          title: 'Feedback', 
          description: 'Share your thoughts', 
          shortcut: '⌘ F',
          action: () => console.log('Feedback'),
          bg: 'rgba(94, 92, 230, 0.2)',
          color: 'var(--accent-purple)'
        },
        {
          icon: theme === 'dark' ? '☀️' : '🌙',
          title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
          description: 'Change the appearance of the website',
          shortcut: '⌘ T',
          action: () => toggleTheme(),
          bg: 'rgba(255, 204, 0, 0.2)',
          color: 'var(--accent-yellow)'
        }
      ]
    }
  ]

  useEffect(() => {
    // Open command menu with keyboard shortcut
    const handleKeyDown = (e) => {
      // Command/Ctrl + K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleUI('isCommandOpen')
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        toggleUI('isCommandOpen')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, toggleUI])

  useEffect(() => {
    // Focus the input when menu opens
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 50)
    }

    // Reset search term when menu is closed
    if (!isOpen) {
      setSearchTerm('')
      setSelectedItem(0)
    }
  }, [isOpen])

  // Filter items based on search term
  const filteredGroups = commandGroups.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.items.length > 0)

  // Count total filtered items for selection navigation
  const allItems = filteredGroups.flatMap(group => group.items)

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedItem(prev => (prev + 1) % allItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedItem(prev => (prev - 1 + allItems.length) % allItems.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (allItems[selectedItem]) {
        allItems[selectedItem].action()
        toggleUI('isCommandOpen')
      }
    }
  }

  // Helper navigation functions
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    toggleUI('isCommandOpen')
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    toggleUI('isCommandOpen')
  }

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={() => toggleUI('isCommandOpen')}>
        <CommandContainer onClick={e => e.stopPropagation()}>
          <SearchInput 
            ref={inputRef}
            placeholder="Search commands..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <CommandList>
            {filteredGroups.map((group, groupIndex) => (
              <CommandGroup key={groupIndex}>
                <GroupTitle>{group.title}</GroupTitle>
                {group.items.map((item, itemIndex) => {
                  // Calculate absolute index for selection tracking
                  const absoluteIndex = filteredGroups
                    .slice(0, groupIndex)
                    .reduce((sum, g) => sum + g.items.length, 0) + itemIndex
                  
                  return (
                    <CommandItem 
                      key={itemIndex} 
                      $isSelected={selectedItem === absoluteIndex}
                      $index={itemIndex}
                      onClick={() => {
                        item.action()
                        toggleUI('isCommandOpen')
                      }}
                    >
                      <CommandContent>
                        <IconWrapper $bg={item.bg} $color={item.color}>
                          {item.icon}
                        </IconWrapper>
                        <CommandText>
                          <CommandTitle>
                            {item.title}
                            {item.badge && <StatusBadge $type={item.badge}>{item.badge}</StatusBadge>}
                          </CommandTitle>
                          <CommandDescription>{item.description}</CommandDescription>
                        </CommandText>
                      </CommandContent>
                      
                      {item.shortcut && (
                        <ShortcutTag>
                          {item.shortcut.split(' ').map((key, i) => (
                            <KeyboardKey key={i}>{key}</KeyboardKey>
                          ))}
                        </ShortcutTag>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}

            {filteredGroups.length === 0 && searchTerm && (
              <div style={{
                padding: '20px',
                textAlign: 'center',
                color: 'var(--text-tertiary)',
                fontSize: '14px'
              }}>
                No results found for "{searchTerm}"
              </div>
            )}
          </CommandList>
          
          <FooterHint>
            <span>Use ↑ ↓ to navigate</span>
            <span>↵ to select</span>
          </FooterHint>
        </CommandContainer>
      </Overlay>
    </>
  )
}

export default CommandMenu 