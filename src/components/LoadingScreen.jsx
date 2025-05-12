import React, { useState, useEffect, Suspense, lazy, useRef, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Lazy load the Spline component to improve initial load time
const Spline = lazy(() => import('@splinetool/react-spline'));

// ===== SETTINGS =====
const FORCE_LOADING_SCREEN = true; // Set to false for production
const SPLINE_SCENE_URL = "https://prod.spline.design/kza0wanI01S0uDAK/scene.splinecode";
// ====================

// Preload the Spline scene
if (typeof window !== 'undefined') {
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'fetch';
  preloadLink.href = SPLINE_SCENE_URL;
  preloadLink.crossOrigin = 'anonymous';
  document.head.appendChild(preloadLink);
}

// Enhanced animations with more sophisticated easing
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const pulse = keyframes`
  0% { opacity: 0.8; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.8; transform: scale(0.98); }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const breathe = keyframes`
  0% { transform: scale(0.95); filter: brightness(0.9); }
  50% { transform: scale(1.05); filter: brightness(1.1); }
  100% { transform: scale(0.95); filter: brightness(0.9); }
`;

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const dotAnimation = keyframes`
  0%, 20% { opacity: 0; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); }
  100% { opacity: 0; transform: translateY(0); }
`;

// Replace fadeIn with slideInUp for more dynamic animation
const slideInUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

// Replace fadeOut with slideOutDown
const slideOutDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
`;

// Add a reveal animation that slides and scales
const revealScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

// Add a horizontal slide animation
const slideInFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Add a sleek reveal animation
const revealClip = keyframes`
  0% {
    clip-path: inset(0 100% 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
`;

// Update the reveal transition animation with a mobile-optimized version
const revealOut = keyframes`
  0% {
    transform: translateY(0);
    clip-path: inset(0 0 0 0);
  }
  100% {
    transform: translateY(-10%);
    clip-path: inset(100% 0 0 0);
  }
`;

// Simpler mobile animation that focuses on performance
const revealOutMobile = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

// Optimize other animations for mobile
const slideInUpMobile = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const revealScaleMobile = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Enhanced Apple-esque background with subtle noise texture
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, rgba(10, 10, 20, 1) 0%, rgba(0, 0, 0, 1) 80%);
  z-index: 2000;
  visibility: ${props => props.$isFinished ? 'hidden' : 'visible'};
  transform-origin: top center;
  animation: ${props => props.$isFinished ? css`${revealOut} 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none'};
  transition: visibility 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  will-change: transform, clip-path;
  
  @media (max-width: 768px) {
    animation: ${props => props.$isFinished ? css`${revealOutMobile} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none'};
    transition: visibility 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(0, 113, 227, 0.03) 0%, 
      rgba(45, 193, 180, 0.03) 20%, 
      rgba(12, 32, 73, 0.03) 50%, 
      rgba(45, 193, 180, 0.03) 80%,
      rgba(0, 113, 227, 0.03) 100%
    );
    background-size: 400% 400%;
    animation: ${gradientMove} 15s ease infinite;
    z-index: -1;
    
    @media (max-width: 768px) {
      animation: none; // Disable gradient animation on mobile for better performance
      background: linear-gradient(135deg, 
        rgba(0, 113, 227, 0.03) 0%, 
        rgba(12, 32, 73, 0.03) 50%,
        rgba(0, 113, 227, 0.03) 100%
      );
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.015;
    z-index: -1;
    pointer-events: none;
    
    @media (max-width: 768px) {
      opacity: 0; // Disable noise texture on mobile
    }
  }
`;

// Enhanced Spline container with smoother transitions
const SplineContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: ${props => props.$isLoaded ? 1 : 0};
  clip-path: ${props => props.$isLoaded ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)'};
  transform: scale(${props => props.$isLoaded ? 1 : 0.95});
  transform-origin: center;
  transition: opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 1.6s cubic-bezier(0.16, 1, 0.3, 1),
              clip-path 1.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity, clip-path;
  
  @media (max-width: 768px) {
    clip-path: none; // Disable clip-path on mobile for better performance
    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                transform 1s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }
  
  & > div {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
  
  & canvas {
    display: block;
  }
`;

// Enhanced overlay with vignette effect
const SplineOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 1;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, rgba(0,0,0,0.2), transparent);
    pointer-events: none;
  }
`;

// Enhanced placeholder with more sophisticated animation
const PlaceholderContainer = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$isLoaded ? 0 : 1};
  visibility: ${props => props.$isLoaded ? 'hidden' : 'visible'};
  transform: ${props => props.$isLoaded ? 'translateY(20px)' : 'translateY(0)'};
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
              visibility 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
  
  @media (max-width: 768px) {
    // Center the globe loader better on mobile
    padding-bottom: 10%;
  }
`;

// Update GlobeLoader with responsive sizing for mobile
const GlobeLoader = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  animation: ${breathe} 6s infinite cubic-bezier(0.445, 0.05, 0.55, 0.95);
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const GlobeCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(45, 193, 180, 0.05);
  border-top: 2px solid rgba(45, 193, 180, 0.6);
  animation: ${rotate} 1.5s linear infinite;
  box-shadow: 0 0 20px rgba(45, 193, 180, 0.1);
  
  &:nth-child(1) {
    border-width: 1px;
    filter: blur(0.3px);
  }
  
  &:nth-child(2) {
    width: 85%;
    height: 85%;
    top: 7.5%;
    left: 7.5%;
    border-top-color: rgba(0, 113, 227, 0.7);
    animation-duration: 2s;
    animation-direction: reverse;
    filter: blur(0.2px);
  }
  
  &:nth-child(3) {
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    border-top-color: rgba(200, 255, 255, 0.7);
    animation-duration: 2.5s;
    filter: blur(0.2px);
  }
  
  @media (max-width: 768px) {
    border-width: 1.5px;
    
    &:nth-child(1) {
      border-width: 0.5px;
    }
  }
`;

const GlobeCore = styled.div`
  position: absolute;
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  background: radial-gradient(circle at center, 
    rgba(45, 193, 180, 0.7) 0%, 
    rgba(0, 113, 227, 0.5) 60%, 
    transparent 100%
  );
  border-radius: 50%;
  animation: ${pulse} 2s infinite ease-in-out;
  box-shadow: 0 0 30px rgba(45, 193, 180, 0.3);
  filter: blur(0.8px);
  
  @media (max-width: 768px) {
    filter: blur(0.5px);
    box-shadow: 0 0 15px rgba(45, 193, 180, 0.2);
  }
`;

// Enhanced interface container with better spacing and transitions
const InterfaceContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px;
  
  @media (max-width: 768px) {
    padding: 30px;
  }
`;

// Enhanced top bar with better animations
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  ${props => props.$isFinishing && css`
    animation: ${slideOutDown} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `}
`;

// Enhanced logo with more refined styling and animations
const Logo = styled.div`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
  opacity: 0;
  animation: ${revealScale} 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.3s;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  
  @media (max-width: 768px) {
    animation: ${revealScaleMobile} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.2s;
    font-size: 1.3rem;
  }
  
  &:hover {
    transform: translateY(-1px);
    
    &::before {
      transform: rotate(10deg) scale(1.1);
      box-shadow: 0 0 20px rgba(0, 113, 227, 0.6);
    }
  }
  
  &::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    background: linear-gradient(135deg, #0071E3, #2DC1B4);
    border-radius: 5px;
    margin-right: 12px;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 15px rgba(0, 113, 227, 0.4);
    animation: ${revealScale} 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.2s;
    opacity: 0;
    will-change: transform, opacity;
    
    @media (max-width: 768px) {
      animation: ${revealScaleMobile} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      animation-delay: 0.1s;
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
  }
`;

// Enhanced logo text with refined styling
const LogoText = styled.span`
  position: relative;
  
  strong {
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(230,230,255,1) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.5) 50%,
        rgba(255,255,255,0) 100%
      );
      background-size: 200% 100%;
      background-repeat: no-repeat;
      mix-blend-mode: overlay;
      animation: ${shimmer} 3s infinite;
      opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }
  
  span {
    background: linear-gradient(90deg, #0071E3 0%, #2DC1B4 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  ${Logo}:hover & strong::after {
    opacity: 1;
  }
`;

// Enhanced bottom container with better spacing and transitions
const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 50px;
  
  ${props => props.$isFinishing && css`
    animation: ${slideOutDown} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `}
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
  }
`;

// Enhanced progress container with refined styling
const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  
  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

// Improved progress info with better typography
const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  opacity: 0;
  animation: ${slideInFromRight} 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.5s;
`;

// Enhanced progress label with Apple-like font styles
const ProgressLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const ProgressValue = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  font-variant-numeric: tabular-nums;
`;

// Improved progress bar with Apple-like design
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  opacity: 0;
  animation: ${slideInUp} 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.7s;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.05);
    animation: ${revealClip} 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.9s;
  }
`;

// Enhanced progress bar with smoother transitions
const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => `${props.$progress}%`};
  background: linear-gradient(90deg, #0071E3, #2DC1B4);
  border-radius: 4px;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: width;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 25px;
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0));
    animation: ${pulse} 2s infinite;
    filter: blur(1px);
    
    @media (max-width: 768px) {
      width: 15px; // Smaller glow effect on mobile
      filter: none; // Remove blur on mobile for better performance
    }
  }
`;

// Enhanced status message with improved typography and animation
const StatusMessage = styled.div`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: white;
  letter-spacing: -0.02em;
  opacity: 0;
  animation: ${slideInUp} 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.9s;
  max-width: 400px;
  display: flex;
  align-items: center;
  position: relative;
  transform-origin: left center;
  will-change: transform, opacity;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    animation: ${slideInUpMobile} 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.6s;
    margin-top: 0.5rem;
  }
  
  &::after {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    margin-left: 8px;
    animation: ${dotAnimation} 1.4s infinite;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    
    @media (max-width: 768px) {
      width: 4px;
      height: 4px;
      margin-left: 6px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
    margin-top: 0.5rem;
  }
`;

// Enhanced skip button with more sophisticated styling
const SkipButton = styled.button`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
  animation: ${revealScale} 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 1.1s;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-weight: 500;
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

// Enhanced loading messages with more sophisticated descriptions
const loadingMessages = [
  "Initializing experience",
  "Building global network",
  "Optimizing visual elements",
  "Rendering environment",
  "Preparing immersive view"
];

// Enhanced dev mode notice with more elegant styling
const DevModeNotice = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.4);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 10px;
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, monospace;
  z-index: 1000;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  letter-spacing: 0.5px;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    opacity: 0.9;
    color: rgba(255, 255, 255, 0.6);
  }
`;

// Particle effects container
const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.4;
  
  @media (max-width: 768px) {
    opacity: 0.2; // Reduce the number of visible particles on mobile
  }
`;

// Individual particle
const Particle = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: ${props => props.$color};
  border-radius: 50%;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  opacity: ${props => props.$opacity};
  animation: floatParticle ${props => props.$duration}s linear infinite;
  filter: blur(${props => props.$blur}px);
  
  @keyframes floatParticle {
    0% {
      transform: translateY(0) translateX(0);
      opacity: ${props => props.$opacity};
    }
    50% {
      opacity: ${props => props.$opacity * 0.6};
    }
    100% {
      transform: translateY(${props => props.$move}vh) translateX(${props => props.$moveX}vw);
      opacity: 0;
    }
  }
`;

// Main component
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [devModeEnabled] = useState(FORCE_LOADING_SCREEN);
  const startTimeRef = useRef(Date.now());
  const [hasExited, setHasExited] = useState(false);
  
  // Helper function to check if device is mobile
  const isMobileDevice = useRef(window.innerWidth <= 768);
  
  // Generate particles
  const particles = useMemo(() => {
    const count = isMobileDevice.current ? 8 : 15; // Fewer particles on mobile
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 15 + 10,
      move: Math.random() * -30 - 10,
      moveX: (Math.random() - 0.5) * 20,
      color: i % 3 === 0 
        ? 'rgba(0, 113, 227, 0.3)' 
        : i % 3 === 1 
          ? 'rgba(45, 193, 180, 0.3)' 
          : 'rgba(255, 255, 255, 0.15)',
      blur: isMobileDevice.current ? 0 : Math.random() * 2 + 1 // No blur on mobile for better performance
    }));
  }, []);
  
  // Current loading message
  const currentMessage = useMemo(() => {
    return loadingMessages[messageIndex];
  }, [messageIndex]);
  
  // Handle Spline load event
  const handleSplineLoad = () => {
    console.log('Spline scene loaded successfully');
    setSplineLoaded(true);
    
    // Ensure we're at a minimum progress when Spline loads
    if (progress < 70) {
      setProgress(70);
    }
  };

  // Handle skip button click with mobile-optimized transition
  const handleSkip = () => {
    setIsFinishing(true);
    const transitionDelay = isMobileDevice.current ? 300 : 400;
    
    setTimeout(() => {
      setIsFinished(true);
      
      // Different delay for animation completion on mobile vs desktop
      const animationDelay = isMobileDevice.current ? 800 : 1200;
      
      // Add a delay before completely removing from DOM to allow animation to complete
      setTimeout(() => {
        setHasExited(true);
        localStorage.setItem('hasVisitedBefore', 'true');
      }, animationDelay);
    }, transitionDelay);
  };

  // Development keyboard shortcut to toggle loading screen
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Press Escape key to skip loading screen
      if (e.key === 'Escape') {
        handleSkip();
      }

      // Press 'R' key to reset and show the loading screen again
      if (e.key === 'r' && e.ctrlKey) {
        localStorage.removeItem('hasVisitedBefore');
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle loading progress and first visit check
  useEffect(() => {
    if (devModeEnabled) {
      localStorage.removeItem('hasVisitedBefore');
    }
    
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (hasVisited && !devModeEnabled) {
      setFirstVisit(false);
      setIsFinished(true);
      setHasExited(true);
      return;
    }

    // Start with a quick initial progress to make it feel responsive
    setProgress(10);
    
    // Update message based on progress
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 3000);
    
    // Loading timeline - with mobile optimizations
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current;
      
      // If Spline is loaded and we're past minimum time, complete quickly
      if (splineLoaded && elapsedTime > 3000) {
        setProgress(prev => {
          const newProgress = Math.min(100, prev + (isMobileDevice.current ? 3 : 2)); // Faster progress on mobile
          
          // When we reach 100%, finish the loading screen
          if (newProgress >= 100) {
            clearInterval(interval);
            clearInterval(messageInterval);
            
            setTimeout(() => {
              setIsFinishing(true);
              
              const transitionDelay = isMobileDevice.current ? 300 : 400;
              setTimeout(() => {
                setIsFinished(true);
                
                // Different delay for animation completion on mobile vs desktop
                const animationDelay = isMobileDevice.current ? 800 : 1200;
                setTimeout(() => {
                  setHasExited(true);
                  localStorage.setItem('hasVisitedBefore', 'true');
                }, animationDelay);
              }, transitionDelay);
            }, 500);
          }
          
          return newProgress;
        });
        return;
      }
      
      // Mobile-optimized progress calculation
      const targetProgress = Math.min(
        70, // Cap at 70% until Spline loads
        (elapsedTime / (isMobileDevice.current ? 8000 : 10000)) * 100 // Faster loading perception on mobile
      );
      
      setProgress(prev => {
        // Smoother progress steps on mobile
        const step = isMobileDevice.current ? 
          Math.random() * 0.5 + 0.5 : // Larger steps on mobile
          Math.random() * 0.7 + 0.3;  // Normal steps on desktop
        return Math.min(targetProgress, prev + step);
      });
    }, isMobileDevice.current ? 60 : 50); // Slightly less frequent updates on mobile
    
    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [devModeEnabled, splineLoaded]);

  // If not first visit and already finished, don't render
  if (!firstVisit && hasExited && !devModeEnabled) {
    return null;
  }

  return (
    <LoadingContainer $isFinished={isFinished}>
      {/* Particles background effect */}
      <ParticleContainer>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            $size={particle.size}
            $top={particle.top}
            $left={particle.left}
            $opacity={particle.opacity}
            $duration={particle.duration}
            $move={particle.move}
            $moveX={particle.moveX}
            $color={particle.color}
            $blur={particle.blur}
          />
        ))}
      </ParticleContainer>
      
      {/* Placeholder loading animation */}
      <PlaceholderContainer $isLoaded={splineLoaded}>
        <GlobeLoader>
          <GlobeCircle />
          <GlobeCircle />
          <GlobeCircle />
          <GlobeCore />
        </GlobeLoader>
      </PlaceholderContainer>
      
      {/* The actual Spline component */}
      <SplineContainer $isLoaded={splineLoaded}>
        <Suspense fallback={null}>
          <Spline 
            scene={SPLINE_SCENE_URL}
            onLoad={handleSplineLoad}
          />
        </Suspense>
        <SplineOverlay />
      </SplineContainer>
      
      {/* UI Elements */}
      <InterfaceContainer>
        <TopBar $isFinishing={isFinishing}>
          <Logo>
            <LogoText>
              <span>Humanity</span><strong>Bridge</strong>
            </LogoText>
          </Logo>
        </TopBar>
        
        <BottomContainer $isFinishing={isFinishing}>
          <ProgressContainer>
            <ProgressInfo>
              <ProgressLabel>LOADING</ProgressLabel>
              <ProgressValue>{Math.floor(progress)}%</ProgressValue>
            </ProgressInfo>
            <ProgressBarContainer>
              <ProgressBar $progress={progress} />
            </ProgressBarContainer>
          </ProgressContainer>
          
          <StatusMessage>{currentMessage}</StatusMessage>
          
          <SkipButton onClick={handleSkip}>
            Skip
          </SkipButton>
        </BottomContainer>
      </InterfaceContainer>

      {devModeEnabled && (
        <DevModeNotice>
          DEV MODE | ESC: Skip | Ctrl+R: Restart
        </DevModeNotice>
      )}
    </LoadingContainer>
  );
};

export default LoadingScreen; 