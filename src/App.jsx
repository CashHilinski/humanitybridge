import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import styled from 'styled-components'
import { useState, useRef, useEffect, useCallback } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Globe from './components/Globe'
import Header from './components/Header'
import ProjectModal from './components/ProjectModal'
import InfoSection from './components/InfoSection'
import ImpactSection from './components/ImpactSection'
import ContactSection from './components/ContactSection'
import LoadingScreen from './components/LoadingScreen'
import { ProjectProvider } from './contexts/ProjectContext'
import L from 'leaflet'
import { LanguageProvider, useLanguage, translations } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { UIProvider, useUI } from './contexts/UIContext'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background: var(--primary);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  direction: ${props => props.$direction};
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  position: relative;

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background: radial-gradient(circle at 10% 30%, rgba(0, 113, 227, 0.03) 0%, transparent 40%),
                radial-gradient(circle at 90% 70%, rgba(45, 193, 180, 0.03) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(255, 55, 95, 0.03) 0%, transparent 50%);
  }

  @supports (-webkit-touch-callout: none) {
    /* iOS specific fix */
    min-height: -webkit-fill-available;
  }
`

const HeroSection = styled.div`
  height: 100vh;
  position: relative;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`

const CanvasContainer = styled.div`
  position: relative;
  width: 80%;
  height: calc(100% - 80px);
  background: #000000;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 113, 227, 0.2);
  border: 1px solid var(--glass-border);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @media (max-width: 768px) {
    width: 100%;
    height: 60vh;
    margin-top: 60px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      transparent 30%,
      rgba(0, 0, 0, 0.4) 100%
    );
    pointer-events: none;
  }

  & canvas {
    pointer-events: ${props => props.$isHovered ? 'auto' : 'none'};
    width: 100% !important;
    height: 100% !important;
  }
`

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$isVisible ? 1 : 0};
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};
  transition: all 0.5s ease;
  z-index: ${props => props.$isVisible ? 10 : -1};

  .leaflet-container {
    width: 100%;
    height: 100%;
    background: #1a1a2e;
  }
`

const MessagePanel = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.8rem 1.5rem;
  color: var(--text-primary);
  background: var(--glass-background);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  font-size: 0.95rem;
  text-align: center;
  max-width: 400px;
  z-index: 5;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.3px;
  line-height: 1.5;
`

const EmailLink = styled.a`
  color: var(--accent-blue);
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;

  &:hover {
    color: var(--accent-teal);
  }
`

const FilterContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: var(--glass-background);
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 400px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 113, 227, 0.15);
  }

  @media (max-width: 768px) {
    top: 5px;
    right: 5px;
    padding: 10px;
    gap: 6px;
    max-width: 200px;
  }
`

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.$active ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  background: ${props => props.$active ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.$active ? '#fff' : 'var(--text-secondary)'};
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${props => props.$active 
    ? '0 4px 12px rgba(0, 113, 227, 0.3)' 
    : '0 2px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    opacity: ${props => props.$active ? 0 : 1};
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 10px;
    border-radius: 8px;
    min-width: auto;
    flex: 0 1 auto;
    letter-spacing: 0;
  }

  &:hover {
    background: ${props => props.$active ? 'var(--accent-blue)' : 'rgba(0, 113, 227, 0.1)'};
    border-color: var(--accent-blue);
    transform: translateY(-2px);
    box-shadow: ${props => props.$active 
      ? '0 6px 14px rgba(0, 113, 227, 0.4)' 
      : '0 4px 10px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'};
    
    &::after {
      opacity: 0;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${props => props.$active 
      ? '0 2px 8px rgba(0, 113, 227, 0.3)' 
      : '0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.03)'};
  }
`

const FilterLabel = styled.div`
  color: var(--text-secondary);
  font-size: 12px;
  margin-bottom: 4px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;  // Hide the label on mobile
  }
`

// Create a component to handle map events
function MapEventHandler({ onZoomEnd }) {
  const map = useMap();
  
  useEffect(() => {
    map.on('zoomend', () => {
      const currentZoom = map.getZoom();
      if (currentZoom <= 3) {
        onZoomEnd();
      }
    });
  }, [map, onZoomEnd]);
  
  return null;
}

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const InfoMessage = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.8rem 1.2rem;
  color: white;
  background: rgba(13, 13, 32, 0.9);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(78, 205, 196, 0.1);
  font-size: 0.9rem;
  text-align: center;
  max-width: 400px;
  z-index: 5;

  @media (max-width: 768px) {
    width: 90%;
    bottom: 10px;
    font-size: 0.8rem;
  }
`

const HelpPanel = styled.div`
  position: absolute;
  right: 20px;
  top: 100px;
  background: var(--glass-background);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 280px;
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  color: var(--text-primary);
  z-index: 5;
  transition: all 0.3s ease;
  transform: translateX(0);

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 113, 227, 0.15);
    transform: translateX(-5px);
  }

  @media (max-width: 768px) {
    right: 10px;
    top: 70px;
    padding: 1rem;
    max-width: 220px;
  }

  h4 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      width: 16px;
      height: 16px;
      color: var(--accent-blue);
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
    letter-spacing: -0.2px;
    line-height: 1.5;
    display: flex;
    align-items: flex-start;
    gap: 6px;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
      margin-bottom: 0.6rem;
    }
  }
`

const MinimizeButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.1);
  }
`

// Separate the main app content into a new component
const AppContent = () => {
  const [isCanvasHovered, setIsCanvasHovered] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [mapCenter, setMapCenter] = useState([0, 0])
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [localProjects, setLocalProjects] = useState([])
  const controlsRef = useRef()
  const lastFetchRef = useRef(Date.now())
  const projectCache = useRef(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { language, t } = useLanguage()
  const direction = translations[language]?.direction || 'ltr'
  const { uiState, toggleUI } = useUI()

  // Add this effect to detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchLocalProjects = useCallback(async (map) => {
    // Check zoom level with mobile consideration
    const currentZoom = map.getZoom()
    const minZoomLevel = isMobile ? 12 : 12 // Changed from 14 to 12 for mobile
    
    console.log('Current zoom:', currentZoom, 'Mobile:', isMobile) // Debug log
    
    if (currentZoom < minZoomLevel) {
      console.log('Zoom too low, clearing projects') // Debug log
      setLocalProjects([])
      return
    }

    // Rate limiting
    const now = Date.now()
    if (now - lastFetchRef.current < 3000) {
      console.log('Rate limited') // Debug log
      return
    }
    lastFetchRef.current = now

    const bounds = map.getBounds()
    console.log('Fetching projects for bounds:', bounds) // Debug log
    
    try {
      // First get OSM data
      const osmQuery = `
        [out:json][timeout:25];
        (
          node["office"="ngo"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
          node["amenity"="food_bank"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
          node["amenity"="social_facility"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
          node["social_facility"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
          node["office"="charity"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
          node["amenity"="place_of_worship"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
          node["amenity"="school"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
        );
        out body;
        >;
        out skel qt;
      `

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: osmQuery
      })
      const data = await response.json()

      // For each location, try to get additional details from Google Places
      const enrichedProjects = await Promise.all(
        data.elements
          .filter(element => element.lat && element.lon)
          .map(async element => {
            let additionalInfo = {}
            
            // If you have a Google Places API key:
            // try {
            //   const placeResponse = await fetch(
            //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${element.lat},${element.lon}&radius=50&key=YOUR_API_KEY`
            //   )
            //   const placeData = await placeResponse.json()
            //   if (placeData.results[0]) {
            //     additionalInfo = {
            //       phone: placeData.results[0].formatted_phone_number,
            //       website: placeData.results[0].website,
            //       // ... other details
            //     }
            //   }
            // } catch (error) {
            //   console.error('Error fetching place details:', error)
            // }

            // For now, generate placeholder data if real data isn't available
            return {
              id: element.id,
              position: [element.lat, element.lon],
              title: element.tags?.name || 'Community Location',
              description: element.tags?.description || generateDescription(element.tags?.amenity || element.tags?.office),
              type: element.tags?.amenity || element.tags?.office || element.tags?.social_facility || 'General',
              website: element.tags?.website || additionalInfo.website || generateWebsite(element.tags?.name),
              phone: element.tags?.phone || additionalInfo.phone || generatePhone(),
              email: element.tags?.email || generateEmail(element.tags?.name),
              volunteerInfo: generateVolunteerInfo(element.tags?.amenity || element.tags?.office)
            }
          })
      )

      setLocalProjects(enrichedProjects)
    } catch (error) {
      console.error('Error fetching local projects:', error)
      setLocalProjects([])
    }
  }, [isMobile])

  // Helper functions to generate placeholder data
  const generateDescription = (type) => {
    const descriptions = {
      'place_of_worship': 'Local religious center offering community support and volunteer opportunities.',
      'school': 'Educational institution with various volunteer programs and community initiatives.',
      'food_bank': 'Distribution center providing food assistance to those in need.',
      'ngo': 'Non-profit organization working to improve community welfare.',
      'default': 'Local organization contributing to community development.'
    }
    return descriptions[type] || descriptions.default
  }

  const generateWebsite = (name) => {
    if (!name) return null
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '')
    return `http://www.${sanitizedName}.org`
  }

  const generatePhone = () => {
    return '+1 (555) 000-0000'
  }

  const generateEmail = (name) => {
    if (!name) return null
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '')
    return `contact@${sanitizedName}.org`
  }

  const generateVolunteerInfo = (type) => {
    const info = {
      'place_of_worship': 'Contact for community service opportunities and local outreach programs.',
      'school': 'Volunteer opportunities include tutoring, mentoring, and after-school programs.',
      'food_bank': 'Volunteers needed for food sorting, distribution, and delivery.',
      'default': 'Contact for current volunteer opportunities and ways to help.'
    }
    return info[type] || info.default
  }

  const handleGlobeZoom = () => {
    if (!controlsRef.current) return

    const distance = controlsRef.current.getDistance()
    const target = controlsRef.current.target

    const ZOOM_IN_THRESHOLD = 7.5
    const ZOOM_OUT_THRESHOLD = 8.0

    if (distance <= ZOOM_IN_THRESHOLD && !showMap) {
      const lat = target.y * 90
      const lng = target.x * 180
      setMapCenter([lat, lng])
      setShowMap(true)
    } else if (distance > ZOOM_OUT_THRESHOLD && showMap) {
      const mapOverlay = document.querySelector(MapOverlay)
      if (mapOverlay) {
        mapOverlay.style.transition = 'opacity 0.5s ease'
      }
      setShowMap(false)
    }
  }

  useEffect(() => {
    return () => {
      // Cleanup Three.js resources
      if (controlsRef.current) {
        controlsRef.current.dispose()
      }
    }
  }, [])

  return (
    <AppContainer $direction={direction}>
      <Header />
      <HeroSection>
        <CanvasContainer 
          $isHovered={isCanvasHovered}
          onMouseEnter={() => setIsCanvasHovered(true)}
          onMouseLeave={() => setIsCanvasHovered(false)}
        >
          <Canvas 
            camera={{ position: [0, 0, 15], fov: 45 }}
            style={{ width: '100%', height: '100%' }}
            onCreated={({ gl }) => {
              try {
                gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
                gl.setClearColor('#000000', 1)
                setIsLoading(false)
              } catch (error) {
                console.error('Canvas creation error:', error)
                setHasError(true)
              }
            }}
            onError={(error) => {
              console.error('Canvas render error:', error)
              setHasError(true)
            }}
          >
            {!hasError && (
              <>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <Globe />
                <OrbitControls 
                  ref={controlsRef}
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={3.4}
                  maxDistance={20}
                  rotateSpeed={0.5}
                  zoomSpeed={1.0}
                  panSpeed={0.5}
                  onChange={handleGlobeZoom}
                />
              </>
            )}
          </Canvas>

          <MapOverlay 
            $isVisible={showMap}
            onClick={() => {
              if (controlsRef.current) {
                const distance = controlsRef.current.getDistance()
                if (distance > 7.5) {
                  setShowMap(false)
                }
              }
            }}
          >
            <MapContainer
              center={mapCenter}
              zoom={4}
              minZoom={3}
              maxZoom={18}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
              key={`${mapCenter[0]}-${mapCenter[1]}`}
              whenReady={(map) => {
                fetchLocalProjects(map.target)
                map.target.on('moveend', () => fetchLocalProjects(map.target))
                map.target.on('zoomend', () => {
                  if (map.target.getZoom() <= 3) {
                    setShowMap(false)
                  }
                })
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              <FilterContainer>
                <FilterLabel>Filter Locations</FilterLabel>
                <FilterButton 
                  $active={selectedFilter === 'all'}
                  onClick={() => setSelectedFilter('all')}
                >
                  All
                </FilterButton>
                <FilterButton 
                  $active={selectedFilter === 'humanitarian'}
                  onClick={() => setSelectedFilter('humanitarian')}
                >
                  Humanitarian
                </FilterButton>
                <FilterButton 
                  $active={selectedFilter === 'community'}
                  onClick={() => setSelectedFilter('community')}
                >
                  Community
                </FilterButton>
                <FilterButton 
                  $active={selectedFilter === 'education'}
                  onClick={() => setSelectedFilter('education')}
                >
                  Education
                </FilterButton>
                <FilterButton 
                  $active={selectedFilter === 'religious'}
                  onClick={() => setSelectedFilter('religious')}
                >
                  Religious
                </FilterButton>
              </FilterContainer>

              {localProjects
                .filter(project => {
                  if (selectedFilter === 'all') return true;
                  
                  switch (selectedFilter) {
                    case 'humanitarian':
                      return ['ngo', 'charity', 'humanitarian', 'food_bank', 'soup_kitchen', 'shelter', 'volunteer_centre'].includes(project.type);
                    case 'community':
                      return ['community_centre', 'social_centre', 'social_facility'].includes(project.type);
                    case 'education':
                      return ['school', 'library', 'university', 'college'].includes(project.type);
                    case 'religious':
                      return ['place_of_worship'].includes(project.type);
                    default:
                      return true;
                  }
                })
                .map(project => (
                  <Marker 
                    key={project.id}
                    position={project.position}
                    icon={customIcon}
                  >
                    <Popup>
                      <div style={{ 
                        padding: '5px',
                        maxWidth: '300px'
                      }}>
                        <h3 style={{ 
                          color: '#333', 
                          marginBottom: '8px',
                          fontSize: '16px',
                          borderBottom: '2px solid #4ecdc4'
                        }}>
                          {project.title}
                        </h3>
                        <p style={{ 
                          color: '#666',
                          fontSize: '14px',
                          marginBottom: '10px'
                        }}>
                          {project.description}
                        </p>
                        <div style={{ 
                          fontSize: '13px',
                          color: '#888',
                          marginTop: '10px'
                        }}>
                          <p style={{ marginBottom: '5px' }}>Type: {project.type}</p>
                          {project.website && (
                            <p style={{ marginBottom: '5px' }}>
                              <a 
                                href={project.website.startsWith('http') ? project.website : `https://${project.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: '#4ecdc4',
                                  textDecoration: 'none'
                                }}
                              >
                                Visit Website
                              </a>
                            </p>
                          )}
                          {project.email && (
                            <p style={{ marginBottom: '5px' }}>
                              <a 
                                href={`mailto:${project.email}`}
                                style={{
                                  color: '#4ecdc4',
                                  textDecoration: 'none'
                                }}
                              >
                                Contact via Email
                              </a>
                            </p>
                          )}
                          {project.phone && (
                            <p style={{ marginBottom: '5px' }}>
                              <a 
                                href={`tel:${project.phone}`}
                                style={{
                                  color: '#4ecdc4',
                                  textDecoration: 'none'
                                }}
                              >
                                Call {project.phone}
                              </a>
                            </p>
                          )}
                          {!project.website && !project.email && !project.phone && (
                            <p style={{ 
                              color: '#999',
                              fontStyle: 'italic'
                            }}>
                              Search for "{project.title}" to find contact information
                            </p>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </MapOverlay>

          <InfoMessage>
            🚧 We're new here! We're aware of some bugs and are actively working to fix them. 
            Thanks for your patience! 🛠️
          </InfoMessage>
        </CanvasContainer>

        {uiState.isHelpPanelOpen && (
          <HelpPanel>
            <h4>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 1a6 6 0 0 0-6 6v1h12V7a6 6 0 0 0-6-6zM4 10v2a6 6 0 1 0 12 0v-2H4z" />
              </svg>
              {t('hero.helpTitle')}
            </h4>
            <MinimizeButton onClick={() => toggleUI('isHelpPanelOpen')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </MinimizeButton>
            <ul>
              {t('hero.helpItems').map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </HelpPanel>
        )}
        
        {!uiState.isHelpPanelOpen && (
          <MinimizeButton 
            style={{ 
              position: 'fixed', 
              right: '20px', 
              top: '100px',
              background: 'var(--glass-background)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
            }} 
            onClick={() => toggleUI('isHelpPanelOpen')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </MinimizeButton>
        )}
      </HeroSection>
      <InfoSection />
      <ImpactSection />
      <ContactSection />
      <ProjectModal />
    </AppContainer>
  )
}

// Main App component now just provides context
function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <UIProvider>
          <ProjectProvider>
            <LoadingScreen />
            <AppContent />
          </ProjectProvider>
        </UIProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App