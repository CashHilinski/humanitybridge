import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  color: white;
  position: relative;
  
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

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20px 20px, rgba(78, 205, 196, 0.03) 2px, transparent 0),
      radial-gradient(circle at 40px 40px, rgba(255, 107, 107, 0.03) 2px, transparent 0);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
    pointer-events: none;
    opacity: 0.5;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 4rem;
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem;
  margin: 2rem 0;
  transform: translateY(50px);
  opacity: 0;
  animation: fadeIn 0.8s forwards;
  animation-play-state: paused;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(78, 205, 196, 0.2);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.2),
      inset 0 0 80px rgba(78, 205, 196, 0.05);
  }
  
  &.visible {
    animation-play-state: running;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    border-top: 2px solid rgba(78, 205, 196, 0.3);
    border-left: 2px solid rgba(78, 205, 196, 0.3);
    border-radius: 8px 0 0 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    position: relative;
    padding-bottom: 15px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }

  &:hover h3::after {
    width: 60px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    position: relative;
    padding-left: 16px;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 12px;
      width: 4px;
      height: 4px;
      background: #4ecdc4;
      border-radius: 50%;
      opacity: 0.7;
    }
  }

  a {
    color: #4ecdc4;
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative;
    padding-bottom: 2px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background: currentColor;
      transition: width 0.3s ease;
    }
    
    &:hover::after {
      width: 100%;
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
  font-size: 3.5rem;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: linear-gradient(45deg, #ff6b6b20, #4ecdc420);
    border-radius: 50%;
    filter: blur(15px);
  }

  &::after {
    width: 120px;
    height: 6px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
    border-radius: 3px;
    box-shadow: 0 2px 10px rgba(78, 205, 196, 0.3);
  }
`

const InfoSection = () => {
  // Add intersection observer to animate cards when they come into view
  const observerRef = React.useRef(null)
  
  React.useEffect(() => {
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

  return (
    <Section id="about">
      <Container>
        <Title>About Humanity Bridge</Title>
        
        <Card className="info-card">
          <h3>Who We Are</h3>
          <p>
            Humanity Bridge is a forward-thinking platform dedicated to connecting both volunteers and those in need 
            with local resources, community support, and meaningful opportunities to make a difference.
          </p>
        </Card>

        <Card className="info-card">
          <h3>Our Mission</h3>
          <p>
            Bridging the gap between communities by connecting people with local resources, food banks, shelters, 
            and humanitarian projects worldwide, making support and impact accessible to everyone.
          </p>
        </Card>

        <Card className="info-card">
          <h3>How It Works</h3>
          <p>
            Browse our interactive globe to find nearby community resources, food banks, shelters, and volunteer 
            opportunities. Whether you're looking to help or seeking assistance, we connect you directly with 
            verified local organizations.
          </p>
        </Card>

        <Card className="info-card">
          <h3>Impact</h3>
          <p>
            Connecting over 10K people daily with essential resources and support across 175+ countries, 
            with 1.4 Million+ verified locations including food banks, shelters, and community centers.
          </p>
        </Card>

        <Card className="info-card">
          <h3>Get Involved</h3>
          <p>
            Whether you're seeking community resources or want to help others, we're here for you. 
            Simply explore the interactive globe to find nearby food banks, shelters, and volunteer 
            opportunities in your area.
          </p>
        </Card>
      </Container>
    </Section>
  )
}

export default InfoSection 