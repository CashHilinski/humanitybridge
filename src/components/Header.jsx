import styled from 'styled-components'
import { useLanguage, translations } from '../contexts/LanguageContext'
import { useState, useEffect } from 'react'
import CommandMenu from './CommandMenu'
import NotificationCenter from './NotificationCenter'
import SearchSpotlight from './SearchSpotlight'
import { useUI } from '../contexts/UIContext'

const HeaderContainer = styled.header`
  height: 64px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 max(24px, 5%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  transition: all var(--transition-normal);

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 56px;
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }
`

const LogoSymbol = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #0071E3, #BF5AF2, #FF375F);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  box-shadow: 0 4px 15px rgba(94, 92, 230, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
    z-index: 1;
  }

  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 8px 20px rgba(94, 92, 230, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.12) inset;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    border-radius: 9px;
  }
`

const LogoIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 1.75px solid white;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -3px;
    right: -3px;
    height: 1.75px;
    background: white;
    transform: translateY(-50%) rotate(45deg);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: -3px;
    bottom: -3px;
    width: 1.75px;
    background: white;
    transform: translateX(-50%);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
  }
`

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2px;
`

const MainTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.3px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const Subtitle = styled.span`
  font-size: 12px;
  color: var(--text-tertiary);
  letter-spacing: -0.1px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 450;
  line-height: 1.4;
  margin-top: 1px;

  @media (max-width: 768px) {
    display: none;
  }
`

const ActivityIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  opacity: 0.9;
  font-weight: 500;
  color: var(--accent-teal);
  text-shadow: 0 0 4px rgba(45, 193, 180, 0.3);
  
  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--accent-teal);
    margin-right: 5px;
    position: relative;
    animation: pulse 2s infinite;
    box-shadow: 0 0 10px rgba(45, 193, 180, 0.8);
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(45, 193, 180, 0.5);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 6px rgba(45, 193, 180, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(45, 193, 180, 0);
    }
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  margin-${props => props.$isRTL ? 'right' : 'left'}: auto;
  align-items: center;

  @media (max-width: 768px) {
    gap: 16px;
  }
`

const NavLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-fast);
  cursor: pointer;
  position: relative;
  padding: 5px 0;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent-teal);
    transition: width var(--transition-fast);
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  &:hover {
    color: var(--text-primary);
    
    &:after {
      width: 100%;
    }
  }
`

const LanguageSelector = styled.select`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  padding: 6px 28px 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  margin-left: 6px;
  font-family: inherit;
  transition: all var(--transition-fast);
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px 16px;

  &:hover, &:focus {
    background-color: rgba(255, 255, 255, 0.12);
    border-color: var(--accent-blue);
    color: var(--text-primary);
  }

  option {
    background: var(--primary-dark);
    color: var(--text-primary);
    font-family: inherit;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 24px 4px 10px;
    margin-left: 4px;
    background-size: 14px 14px;
  }
`

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 16px;

  @media (max-width: 768px) {
    gap: 8px;
    margin-left: 8px;
  }
`

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 6px 12px;
  border-radius: 20px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: var(--text-primary);
    border-color: var(--accent-blue);
  }

  svg {
    width: 14px;
    height: 14px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px 5px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    margin-left: 5px;
    font-size: 11px;
  }

  @media (max-width: 768px) {
    padding: 6px;
    
    span, div {
      display: none;
    }
  }
`

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const CommandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
  </svg>
)

const Header = () => {
  const { language, setLanguage, t } = useLanguage()
  const isRTL = translations[language]?.direction === 'rtl'
  const { uiState, toggleUI, openUI } = useUI()
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Command/Ctrl + K for command menu (handled in CommandMenu component)
      
      // Command/Ctrl + / for search spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        openUI('isSearchOpen')
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [openUI])

  return (
    <>
      <HeaderContainer>
        <LogoContainer onClick={scrollToTop}>
          <LogoSymbol>
            <LogoIcon />
          </LogoSymbol>
          <LogoText>
            <MainTitle>Humanity Bridge</MainTitle>
            <Subtitle>
              Global Impact
              <ActivityIndicator>Active</ActivityIndicator>
            </Subtitle>
          </LogoText>
        </LogoContainer>
        <Nav $isRTL={isRTL}>
          <NavLink onClick={() => scrollToSection('about')}>{t('nav.about')}</NavLink>
          <NavLink onClick={() => scrollToSection('impact')}>{t('nav.impact')}</NavLink>
          <NavLink onClick={() => scrollToSection('contact')}>{t('nav.contact')}</NavLink>
          <LanguageSelector 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Español</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="ar">🇸🇦 العربية</option>
            <option value="he">🇮🇱 עברית</option>
            <option value="zh">🇨🇳 中文</option>
            <option value="ru">🇷🇺 Русский</option>
            <option value="ja">🇯🇵 日本語</option>
            <option value="it">🇮🇹 Italiano</option>
            <option value="sw">🇰🇪 Kiswahili</option>
            <option value="yo">🇳🇬 Yorùbá</option>
            <option value="hi">🇮🇳 हिंदी</option>
          </LanguageSelector>
          
          <ActionGroup>
            <SearchButton onClick={() => toggleUI('isSearchOpen')}>
              <SearchIcon />
              <div>Search</div>
              <span>⌘/</span>
            </SearchButton>
            
            <NotificationCenter />
          </ActionGroup>
        </Nav>
      </HeaderContainer>
      
      {/* New FAANG UI Components */}
      <CommandMenu />
      <SearchSpotlight 
        isOpen={uiState.isSearchOpen} 
        onClose={() => toggleUI('isSearchOpen')} 
      />
    </>
  )
}

export default Header