import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useLanguage } from '../contexts/LanguageContext'

const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 6rem;
  color: var(--text-primary);
  position: relative;
  background: linear-gradient(180deg, var(--primary) 0%, var(--primary-light) 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
  }

  @media (max-width: 768px) {
    padding: 7rem 1.5rem 4rem;
  }
`

const BackgroundGradient = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(0, 113, 227, 0.08) 0%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 3rem;
  position: relative;
  z-index: 1;
`

const Card = styled.div`
  background: var(--card-background);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 24px;
  padding: 2.5rem;
  margin: 1rem 0;
  transform: translateY(30px);
  opacity: 0;
  animation: fadeIn 0.8s forwards;
  animation-play-state: paused;
  border: 1px solid var(--card-border);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    background: var(--card-hover);
    border-color: rgba(0, 113, 227, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  &.visible {
    animation-play-state: running;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 113, 227, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: var(--text-primary);
    display: inline-block;
    position: relative;
    padding-bottom: 15px;
    font-weight: 600;
    letter-spacing: -0.3px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: var(--accent-blue);
      border-radius: 1.5px;
      transition: width 0.3s ease;
    }
  }

  &:hover h3::after {
    width: 60px;
  }

  p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-secondary);
    position: relative;
    letter-spacing: -0.2px;
    
    & + p {
      margin-top: 1rem;
    }
  }

  a {
    color: var(--accent-blue);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    font-weight: 500;
    
    &:hover {
      color: var(--accent-teal);
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-primary);
  position: relative;
  letter-spacing: -0.5px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  
  span {
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-teal));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`

const RecentUpdate = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 0.7rem;
  color: var(--text-tertiary);
  font-weight: 500;
  letter-spacing: -0.3px;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`

const InfoSection = () => {
  const { t } = useLanguage()
  
  // Add intersection observer to animate cards when they come into view
  const observerRef = useRef(null)
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.info-card').forEach(card => {
      observerRef.current.observe(card)
    })

    return () => observerRef.current.disconnect()
  }, [])

  // Use fixed recent update dates
  const updateDates = [
    '3 days ago',
    '1 week ago',
    '2 weeks ago',
    'Last month',
    'Recently'
  ]

  return (
    <Section id="about">
      <BackgroundGradient />
      <Container>
        <Title><span>{t('about.title')}</span></Title>
        
        <Card className="info-card">
          <h3>{t('about.whoWeAre.title')}</h3>
          <p>{t('about.whoWeAre.content')}</p>
          <RecentUpdate>Updated {updateDates[0]}</RecentUpdate>
        </Card>

        <Card className="info-card">
          <h3>{t('about.mission.title')}</h3>
          <p>{t('about.mission.content')}</p>
          <RecentUpdate>Updated {updateDates[1]}</RecentUpdate>
        </Card>

        <Card className="info-card">
          <h3>{t('about.howItWorks.title')}</h3>
          <p>{t('about.howItWorks.content')}</p>
          <RecentUpdate>Updated {updateDates[2]}</RecentUpdate>
        </Card>

        <Card className="info-card">
          <h3>{t('about.impact.title')}</h3>
          <p>{t('about.impact.content')}</p>
          <RecentUpdate>Updated {updateDates[3]}</RecentUpdate>
        </Card>

        <Card className="info-card">
          <h3>{t('about.getInvolved.title')}</h3>
          <p>{t('about.getInvolved.content')}</p>
          <RecentUpdate>Updated {updateDates[4]}</RecentUpdate>
        </Card>
      </Container>
    </Section>
  )
}

export default InfoSection 