import { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const scaleIn = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

const slideInBottom = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const Container = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;

  @media (max-width: 768px) {
    right: 16px;
    bottom: 16px;
  }
`

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  ${props => props.$isOpen && `
    opacity: 1;
    pointer-events: auto;
    animation: ${fadeIn} 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  `}
`

const MainButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: var(--accent-blue);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 1000;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 113, 227, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  ${props => props.$isOpen && `
    background: var(--accent-pink);
    box-shadow: 0 4px 12px rgba(255, 55, 95, 0.4);
    
    &:hover {
      box-shadow: 0 6px 16px rgba(255, 55, 95, 0.5);
    }
    
    svg {
      transform: rotate(45deg);
    }
  `}
`

const ActionMenu = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  ${props => props.$isOpen && `
    opacity: 1;
    pointer-events: auto;
  `}
`

const ActionItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--glass-background);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 12px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  animation: ${slideInBottom} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: ${props => props.$index * 0.05}s;
  opacity: 0;
  transform: translateY(20px);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.12);
  }

  @media (max-width: 768px) {
    padding: 10px;
    gap: 8px;
  }
`

const ActionIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color || 'var(--accent-blue)'};
  color: white;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`

const ActionText = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  @media (max-width: 768px) {
    white-space: normal;
    max-width: 100px;
  }
`

const ActionTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.2px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const ActionDescription = styled.span`
  font-size: 12px;
  color: var(--text-tertiary);
  letter-spacing: -0.1px;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`

const ActionBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--accent-pink);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  letter-spacing: -0.2px;
  animation: ${scaleIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

// Icons
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const actions = [
    {
      id: 'explore',
      title: 'Explore Projects',
      description: 'Discover global initiatives',
      icon: <GlobeIcon />,
      color: 'var(--accent-teal)',
      action: () => {
        // Scroll to top to explore globe
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setIsOpen(false)
      }
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Join a humanitarian cause',
      icon: <HeartIcon />,
      color: 'var(--accent-pink)',
      badge: 'New',
      action: () => {
        // Scroll to volunteer section or open modal
        console.log('Volunteer action')
        setIsOpen(false)
      }
    },
    {
      id: 'account',
      title: 'My Profile',
      description: 'Manage your account',
      icon: <UserIcon />,
      color: 'var(--accent-purple)',
      action: () => {
        // Open profile section or login modal
        console.log('Profile action')
        setIsOpen(false)
      }
    }
  ]

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <Container ref={containerRef}>
        <ActionMenu $isOpen={isOpen}>
          {actions.map((action, index) => (
            <ActionItem 
              key={action.id}
              $index={actions.length - index}
              onClick={action.action}
            >
              <ActionIconWrapper $color={action.color}>
                {action.icon}
              </ActionIconWrapper>
              <ActionText>
                <ActionTitle>{action.title}</ActionTitle>
                <ActionDescription>{action.description}</ActionDescription>
              </ActionText>
              {action.badge && <ActionBadge>{action.badge}</ActionBadge>}
            </ActionItem>
          ))}
        </ActionMenu>
        <MainButton 
          $isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Quick actions"
        >
          <PlusIcon />
        </MainButton>
      </Container>
    </>
  )
}

export default FloatingActionButton 