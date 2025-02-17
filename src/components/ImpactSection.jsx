import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #16162E 0%, #1E1E2E 100%);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  align-items: center;
  margin: 4rem 0;
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      rgba(255, 107, 107, 0.2),
      rgba(78, 205, 196, 0.2)
    );
    mix-blend-mode: overlay;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  color: white;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
      border-radius: 2px;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 3rem;
    position: relative;
    padding-left: 20px;

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      width: 4px;
      height: 4px;
      background: #4ecdc4;
      border-radius: 50%;
    }
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 4rem auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 2rem auto;
  }

  .stat {
    padding: 3rem 2rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    text-align: center;
    position: relative;
    overflow: hidden;

    @media (max-width: 768px) {
      padding: 2rem 1.5rem;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.5), transparent);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }

    &:hover {
      transform: translateY(-10px);
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(78, 205, 196, 0.3);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

      @media (max-width: 768px) {
        transform: translateY(-5px);
      }

      &::before {
        transform: translateX(100%);
      }

      h4 {
        transform: scale(1.1);
      }

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(78, 205, 196, 0.1), transparent);
        animation: pulse 2s infinite;
      }
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 0.5; }
    }

    h4 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: transform 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.8s forwards;
      animation-play-state: paused;

      @media (max-width: 768px) {
        font-size: 2.5rem;
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
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
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
        <Title>{t('impact.title')}</Title>
        
        <Grid>
          <ImageContainer>
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3" 
              alt="Volunteers helping community" 
            />
          </ImageContainer>
          <Content>
            <h3>{t('impact.connecting.title')}</h3>
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
            <h3>{t('impact.realChange.title')}</h3>
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
    </Section>
  );
};

export default ImpactSection; 