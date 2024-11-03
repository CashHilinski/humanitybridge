import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #1E1E2E 0%, #13131D 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const LoadingContent = styled.div`
  text-align: center;
  color: white;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .loading-dots {
    display: inline-block;
    
    &::after {
      content: '.';
      animation: dots 1.5s steps(5, end) infinite;
    }
  }

  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60% { content: '...'; }
    80% { content: '....'; }
    100% { content: '.....'; }
  }
`;

const LoadingScreen = () => (
  <LoadingContainer>
    <LoadingContent>
      <h2>Humanity Bridge</h2>
      <p>Loading projects<span className="loading-dots"></span></p>
    </LoadingContent>
  </LoadingContainer>
);

export default LoadingScreen; 