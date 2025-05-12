import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(180deg, var(--primary-light) 0%, var(--primary-dark) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -20vh;
    right: -10vw;
    width: 50vw;
    height: 50vw;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(45, 193, 180, 0.05) 0%, transparent 70%);
    filter: blur(60px);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  font-weight: 700;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  
  span {
    background: linear-gradient(135deg, var(--accent-teal), var(--accent-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  align-items: center;
  margin: 6rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 3rem 0;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
  border: 1px solid var(--card-border);

  &:hover {
    transform: translateY(-10px) perspective(1000px) rotateY(-5deg) rotateX(5deg);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(45, 193, 180, 0.15);
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: transform 0.5s ease;
    filter: saturate(1.1) contrast(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      rgba(0, 113, 227, 0.1),
      rgba(45, 193, 180, 0.1)
    );
    mix-blend-mode: overlay;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(45, 193, 180, 0.3), rgba(0, 113, 227, 0));
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
    z-index: 10;
  }
`;

const Content = styled.div`
  color: var(--text-primary);
  max-width: 800px;
  margin: 0 auto;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    position: relative;
    letter-spacing: -0.3px;
    font-weight: 600;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    
    span {
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-teal));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 3px;
      background: var(--accent-teal);
      border-radius: 1.5px;

      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    letter-spacing: -0.2px;

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
    }
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 6rem auto;
  max-width: 1200px;
  perspective: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 3rem auto;
  }

  .stat {
    padding: 3rem 2rem;
    background: var(--card-background);
    border-radius: 24px;
    border: 1px solid var(--card-border);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-align: center;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transform: translateZ(0);

    @media (max-width: 768px) {
      padding: 2rem 1.5rem;
    }

    &:nth-child(1) {
      &:hover {
        transform: translateZ(20px) rotateY(-2deg);
        border-color: rgba(0, 113, 227, 0.3);
        background: rgba(0, 113, 227, 0.05);
      }
      h4 {
        color: var(--accent-blue);
      }
    }

    &:nth-child(2) {
      &:hover {
        transform: translateZ(20px);
        border-color: rgba(255, 55, 95, 0.3);
        background: rgba(255, 55, 95, 0.05);
      }
      h4 {
        color: var(--accent-pink);
      }
    }

    &:nth-child(3) {
      &:hover {
        transform: translateZ(20px) rotateY(2deg);
        border-color: rgba(45, 193, 180, 0.3);
        background: rgba(45, 193, 180, 0.05);
      }
      h4 {
        color: var(--accent-teal);
      }
    }

    &:hover {
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    h4 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
      transition: transform 0.3s ease, color 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.8s forwards;
      animation-play-state: paused;
      letter-spacing: -1px;
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;

      @media (max-width: 768px) {
        font-size: 2.8rem;
      }

      &.visible {
        animation-play-state: running;
      }
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    p {
      font-size: 1rem;
      color: var(--text-secondary);
      margin: 0;
      letter-spacing: -0.2px;

      @media (max-width: 768px) {
        font-size: 0.95rem;
      }
    }
  }
`;

const LiveUsersBar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: var(--glass-background);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  border-radius: 60px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  font-size: 0.85rem;
  color: var(--text-secondary);
  transform: translateY(100px);
  opacity: 0;
  animation: slideUp 0.5s forwards 1s;

  @keyframes slideUp {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    
    @keyframes slideUp {
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }
  }
`;

const UserIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent-teal);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: rgba(45, 193, 180, 0.3);
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

const FeedbackIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--glass-background);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  border-radius: 60px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  font-size: 0.85rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(100px);
  opacity: 0;
  animation: slideUp 0.5s forwards 1.5s;
  
  svg {
    width: 16px;
    height: 16px;
    color: var(--accent-teal);
  }
  
  &:hover {
    background: rgba(45, 193, 180, 0.1);
    border-color: var(--accent-teal);
    color: var(--text-primary);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    right: 50%;
    transform: translateX(50%) translateY(100px);
    
    @keyframes slideUp {
      to {
        transform: translateX(50%) translateY(0);
        opacity: 1;
      }
    }
    
    &:hover {
      transform: translateX(50%) translateY(-3px);
    }
  }
`;

const ImpactSection = () => {
  const statsRef = React.useRef(null);
  const { t } = useLanguage();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('h4').forEach(el => {
              el.classList.add('visible')
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Section id="impact">
      <Container>
        <Title><span>{t('impact.title')}</span></Title>
        
        <Grid>
          <ImageContainer>
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3" 
              alt="Volunteers helping community" 
            />
          </ImageContainer>
          <Content>
            <h3><span>{t('impact.connecting.title')}</span></h3>
            <p>{t('impact.connecting.content1')}</p>
            <p>{t('impact.connecting.content2')}</p>
          </Content>
        </Grid>

        <Stats ref={statsRef}>
          <div className="stat">
            <h4>1.4M+</h4>
            <p>{t('impact.stats.resources')}</p>
          </div>
          <div className="stat">
            <h4>175+</h4>
            <p>{t('impact.stats.countries')}</p>
          </div>
          <div className="stat">
            <h4>10K+</h4>
            <p>{t('impact.stats.volunteers')}</p>
          </div>
        </Stats>

        <Grid>
          <Content>
            <h3><span>{t('impact.realChange.title')}</span></h3>
            <p>{t('impact.realChange.content1')}</p>
            <p>{t('impact.realChange.content2')}</p>
          </Content>
          <ImageContainer>
            <img 
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3" 
              alt="Community impact" 
            />
          </ImageContainer>
        </Grid>
      </Container>
      
      <FeedbackIndicator>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Leave feedback
      </FeedbackIndicator>
    </Section>
  );
};

export default ImpactSection; 