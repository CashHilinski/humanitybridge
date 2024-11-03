import styled from 'styled-components'
import { useProject } from '../contexts/ProjectContext'
import { useState, useEffect } from 'react'

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #1E1E2E 0%, #16162E 100%);
  position: relative;
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
  height: 400px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }
`

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%);
  }
`

const ProjectContent = styled.div`
  padding: 1.5rem;
  color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #4ecdc4;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
    text-decoration: underline;
  }
`

const ProjectStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`

const ProjectsSection = () => {
  const { projects, setSelectedProject } = useProject()
  const [filteredProjects, setFilteredProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      const slicedProjects = projects.slice(0, 8)
      setFilteredProjects(slicedProjects)
      setIsLoading(false)
    }, 0)
  }, [projects])

  if (isLoading) {
    return (
      <Section id="projects">
        <Container>
          <Title>Active Projects</Title>
          <div style={{ color: 'white', textAlign: 'center' }}>Loading projects...</div>
        </Container>
      </Section>
    )
  }

  return (
    <Section id="projects">
      <Container>
        <Title>Active Projects</Title>
        <ProjectGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id}>
              <ProjectImage 
                $image={`https://source.unsplash.com/800x600/?humanitarian,aid${index}`}
              />
              <ProjectContent>
                <ProjectTitle 
                  onClick={() => setSelectedProject(project)}
                >
                  {project.title || 'Untitled Project'}
                </ProjectTitle>
                <p>{project.description ? project.description.substring(0, 100) + '...' : 'No description available'}</p>
                <ProjectStats>
                  <span>📍 {project.location?.name || 'Location unavailable'}</span>
                  <span>📅 {project.date ? new Date(project.date).toLocaleDateString() : 'Date unavailable'}</span>
                </ProjectStats>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </Section>
  )
}

export default ProjectsSection