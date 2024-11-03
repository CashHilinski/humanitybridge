import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const ProjectContext = createContext()

// Multiple endpoints to get more projects
const REPORTS_URL = 'https://api.reliefweb.int/v1/reports?appname=humanitybridge&profile=full&limit=500&preset=latest'
const DISASTERS_URL = 'https://api.reliefweb.int/v1/disasters?appname=humanitybridge&profile=full&limit=200&status=current'

export const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch from both endpoints
        const [reportsRes, disastersRes] = await Promise.all([
          axios.get(REPORTS_URL),
          axios.get(DISASTERS_URL)
        ])

        // Combine and transform projects
        const allProjects = [
          ...reportsRes.data.data.map(item => ({
            id: `report-${item.id}`,
            title: item.fields.title,
            description: item.fields.body || item.fields.headline,
            location: {
              name: item.fields.primary_country?.name,
              latitude: item.fields.primary_country?.location?.lat,
              longitude: item.fields.primary_country?.location?.lon
            },
            type: 'Humanitarian Aid',
            organization: item.fields.source[0].name,
            date: item.fields.date.created,
            status: item.fields.status,
            url: item.fields.url
          })),
          ...disastersRes.data.data.map(item => ({
            id: `disaster-${item.id}`,
            title: item.fields.name,
            description: item.fields.description || 'Active disaster response needed',
            location: {
              name: item.fields.country?.[0]?.name,
              latitude: item.fields.country?.[0]?.location?.lat,
              longitude: item.fields.country?.[0]?.location?.lon
            },
            type: 'Disaster Response',
            organization: 'Multiple Organizations',
            date: item.fields.date.created,
            status: 'current',
            url: item.fields.url
          }))
        ].filter(project => 
          project.location && 
          project.location.latitude && 
          project.location.longitude
        )

        console.log('Total combined projects:', allProjects.length)
        setProjects(allProjects)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      selectedProject, 
      setSelectedProject,
      loading 
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => useContext(ProjectContext)