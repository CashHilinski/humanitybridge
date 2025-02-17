import styled from 'styled-components'
import { useLanguage, translations } from '../contexts/LanguageContext'

const HeaderContainer = styled.header`
  height: 80px;
  background: rgba(13, 13, 32, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(78, 205, 196, 0.1);

  @media (max-width: 768px) {
    padding: 0 0.5rem;
    height: 60px;
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`

const LogoSymbol = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.6s ease;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid white;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -2px;
    right: -2px;
    height: 2px;
    background: white;
    transform: rotate(45deg);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: -2px;
    bottom: -2px;
    width: 2px;
    background: white;
  }
`

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`

const MainTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(45deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Subtitle = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    display: none;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  margin-${props => props.$isRTL ? 'right' : 'left'}: auto;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.3rem;
    letter-spacing: -0.2px;
  }

  &:hover {
    color: white;
  }
`

const LanguageSelector = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(78, 205, 196, 0.3);
  color: white;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 1rem;
  font-family: inherit;

  option {
    background: #1E1E2E;
    color: white;
    font-family: inherit;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.3rem;
  }
`

const Header = () => {
  const { language, setLanguage, t } = useLanguage()
  const isRTL = translations[language]?.direction === 'rtl'

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

  return (
    <HeaderContainer>
      <LogoContainer onClick={scrollToTop}>
        <LogoSymbol>
          <LogoIcon />
        </LogoSymbol>
        <LogoText>
          <MainTitle>Humanity Bridge</MainTitle>
          <Subtitle>Global Impact</Subtitle>
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
          <option value="yo">n🇬 Yorùbá</option>
          <option value="hi">🇮🇳 हिंदी</option>
        </LanguageSelector>
      </Nav>
    </HeaderContainer>
  )
}

export default Header