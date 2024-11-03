import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #1E1E2E 0%, #13131D 100%);
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 3rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #4ecdc4;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }

  a {
    color: #ff6b6b;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #4ecdc4;
    }
  }
`;

const Footer = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const ContactSection = () => {
  return (
    <Section id="contact">
      <Container>
        <Title>Get in Touch</Title>
        
        <ContactGrid>
          <ContactCard>
            <h3>📧 Email</h3>
            <p>Questions or suggestions?</p>
            <a href="mailto:contact@humanitybridge.org">contact@humanitybridge.org</a>
          </ContactCard>

          <ContactCard>
            <h3>📍 Location</h3>
            <p>11770 US Highway 1</p>
            <p>Palm Beach Gardens</p>
            <p>Florida, FL 33408</p>
          </ContactCard>

          <ContactCard>
            <h3>🤝 Social Impact</h3>
            <p>Follow our journey</p>
            <p>
              <a href="#linkedin" style={{ marginRight: '1rem' }}>LinkedIn</a>
              <a href="#twitter" style={{ marginRight: '1rem' }}>Twitter</a>
              <a href="#instagram">Instagram</a>
            </p>
          </ContactCard>
        </ContactGrid>

        <Footer>
          <p>© 2024 Humanity Bridge. All rights reserved.</p>
          <p>Connecting hearts and hands across the globe</p>
        </Footer>
      </Container>
    </Section>
  );
};

export default ContactSection; 