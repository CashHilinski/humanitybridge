import styled from 'styled-components'
import { useProject } from '../contexts/ProjectContext'

const ModalOverlay = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 2rem;
`

const ModalContent = styled.div`
  background: rgba(20, 20, 40, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  color: white;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  max-height: 80vh;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    padding-right: 2rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    margin: 1rem 0;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
  }

  strong {
    color: #4ecdc4;
  }
`

const Button = styled.a`
  display: inline-block;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(78, 205, 196, 0.2);
  }
`

const CloseButton = styled.button`
  position: sticky;
  top: 0;
  right: 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  float: right;
  padding: 0.5rem;
  z-index: 1;

  &:hover {
    color: white;
  }
`

const Badge = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: #4ecdc4;
`

const ProjectModal = () => {
  const { selectedProject, setSelectedProject } = useProject()

  if (!selectedProject) return null

  return (
    <ModalOverlay isOpen={!!selectedProject} onClick={() => setSelectedProject(null)}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={() => setSelectedProject(null)}>×</CloseButton>
        
        <h2>{selectedProject.title}</h2>
        <Badge>{selectedProject.type}</Badge>
        <Badge>{selectedProject.location.name}</Badge>
        
        <p>{selectedProject.description}</p>
        
        <p><strong>Organization:</strong> {selectedProject.organization}</p>
        <p><strong>Status:</strong> {selectedProject.status}</p>
        <p><strong>Posted:</strong> {new Date(selectedProject.date).toLocaleDateString()}</p>
        
        <Button 
          href={selectedProject.url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Learn More & Get Involved →
        </Button>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ProjectModal 