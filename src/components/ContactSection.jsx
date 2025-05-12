import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, var(--primary-dark) 0%, #080814 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -30vh;
    left: -20vw;
    width: 60vw;
    height: 60vw;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(255, 55, 95, 0.03) 0%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  
  span {
    background: linear-gradient(135deg, var(--accent-pink), var(--accent-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 4rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContactCard = styled.div`
  background: var(--card-background);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  border: 1px solid var(--card-border);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 55, 95, 0.8), 
      rgba(0, 113, 227, 0.8), 
      transparent
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    transform: translateY(-4px);
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.2),
      0 0 30px rgba(0, 113, 227, 0.1);
      
    &::before {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    letter-spacing: -0.3px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    
    span {
      font-size: 1.8rem;
    }
  }

  p {
    color: var(--text-secondary);
    line-height: 1.7;
    font-size: 1rem;
    letter-spacing: -0.2px;
    margin-bottom: 0.5rem;
  }

  a {
    margin-top: auto;
    padding-top: 1rem;
    color: var(--accent-blue);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    font-weight: 500;
    letter-spacing: -0.2px;
    
    &:hover {
      color: var(--accent-pink);
    }
  }
`;

const Footer = styled.div`
  margin-top: 6rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.9rem;
  color: var(--text-tertiary);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  
  p:last-child {
    opacity: 0.7;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-blue), transparent);
  }
`;

const ContactBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  background: var(--glass-background);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  a {
    color: var(--accent-blue);
    font-weight: 500;
    text-decoration: none;
    margin-left: 5px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactSection = () => {
  const { t } = useLanguage();
  
  return (
    <Section id="contact">
      <Container>
        <Title><span>{t('contact.title')}</span></Title>
        
        <ContactBadge>
          Have questions? Check our <a href="#">FAQ</a> or send us a message
        </ContactBadge>
        
        <ContactGrid>
          <ContactCard>
            <h3><span>📧</span> {t('contact.email.title').replace('📧', '')}</h3>
            <p>{t('contact.email.subtitle')}</p>
            <a href="mailto:contact@humanitybridge.org">contact@humanitybridge.org</a>
          </ContactCard>

          <ContactCard>
            <h3><span>📍</span> {t('contact.location.title').replace('📍', '')}</h3>
            {t('contact.location.address').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </ContactCard>

          <ContactCard>
            <h3><span>🤝</span> {t('contact.join.title').replace('🤝', '')}</h3>
            <p>{t('contact.join.subtitle')}</p>
            <p>{t('contact.join.content')}</p>
          </ContactCard>
        </ContactGrid>

        <Footer>
          <p>{t('contact.footer.copyright')}</p>
          <p>{t('contact.footer.tagline')}</p>
        </Footer>
      </Container>
    </Section>
  );
};

export default ContactSection; 