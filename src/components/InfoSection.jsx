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
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(0) scale(1.02);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  &.visible {
    animation-play-state: running;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }

  a {
    color: #4ecdc4;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff6b6b;
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
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
    border-radius: 2px;
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
            Humanity Bridge is a project by <a href="https://crh.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>CRH & Co</a>, 
            a forward-thinking organization dedicated to connecting people with meaningful opportunities 
            to make a difference in their communities and around the world.
          </p>
        </Card>

        <Card className="info-card">
          <h3>Our Mission</h3>
          <p>Connecting volunteers with humanitarian projects worldwide, making global impact accessible to everyone.</p>
        </Card>

        <Card className="info-card">
          <h3>How It Works</h3>
          <p>Browse projects on our interactive globe, find opportunities that match your skills, and connect directly with organizations making a difference.</p>
        </Card>

        <Card className="info-card">
          <h3>Impact</h3>
          <p>Join thousands of volunteers who have contributed to projects across 50+ countries, helping communities in need and creating lasting change.</p>
        </Card>

        <Card className="info-card">
          <h3>Get Involved</h3>
          <p>Whether you're a skilled professional, student, or simply want to help, there's a project waiting for you. Click on any marker on the globe to start your journey.</p>
        </Card>
      </Container>
    </Section>
  )
}

export default InfoSection 