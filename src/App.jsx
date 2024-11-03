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
import ProjectsSection from './components/ProjectsSection'
import ImpactSection from './components/ImpactSection'
import ContactSection from './components/ContactSection'
import { ProjectProvider } from './contexts/ProjectContext'
import L from 'leaflet'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #1E1E2E;
  overflow-x: hidden;
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
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);

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
  padding: 0.8rem 1.2rem;
  color: white;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
  text-align: center;
  max-width: 400px;
  z-index: 5;
`

const EmailLink = styled.a`
  color: #ff6b6b;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #4ecdc4;
  }
`

const FilterContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: rgba(30, 30, 46, 0.95);
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 400px;

  @media (max-width: 768px) {
    top: 5px;
    right: 5px;
    padding: 4px;
    gap: 2px;
    max-width: 200px;
    background: rgba(20, 20, 30, 0.98);
  }
`

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.$active ? '#4ecdc4' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  background: ${props => props.$active ? '#4ecdc4' : 'transparent'};
  color: ${props => props.$active ? '#1E1E2E' : '#fff'};
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    padding: 4px 6px;
    font-size: 9px;
    border-radius: 4px;
    min-width: auto;
    flex: 0 1 auto;
    letter-spacing: 0;
    border-width: 1px;
  }

  &:hover {
    background: ${props => props.$active ? '#4ecdc4' : 'rgba(78, 205, 196, 0.1)'};
    border-color: #4ecdc4;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
  }
`

const FilterLabel = styled.div`
  color: #fff;
  font-size: 12px;
  opacity: 0.7;
  margin-bottom: 4px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;

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
  width: 280px;
  background: #1E1E2E;
  padding: 24px;
  border-radius: 15px;
  color: white;
  font-size: 0.9rem;
  border: 1px solid rgba(78, 205, 196, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  height: fit-content;
  margin-top: 80px;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
    padding: 16px;
  }
`

const HelpTitle = styled.h3`
  color: #4ecdc4;
  font-size: 1.2rem;
  margin-bottom: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
`

const HelpList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 16px;
    color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    line-height: 1.4;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(78, 205, 196, 0.1);
      transform: translateX(5px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`

function App() {
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

  const fetchLocalProjects = useCallback(async (map) => {
    const now = Date.now()
    if (now - lastFetchRef.current < 3000) return
    lastFetchRef.current = now

    const bounds = map.getBounds()
    
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
    }
  }, [])

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
    <ProjectProvider>
      <AppContainer>
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

          <HelpPanel>
            <HelpTitle>How to Use the Globe</HelpTitle>
            <HelpList>
              <li>🌍 Click and drag to rotate the globe</li>
              <li>🔍 Scroll to zoom in/out</li>
              <li>🎯 Zoom in on any area to see local projects</li>
              <li>📍 Click markers to see project details</li>
              <li>🏷️ Use filters to find specific opportunities</li>
            </HelpList>
          </HelpPanel>
        </HeroSection>
        <InfoSection />
        <ProjectsSection />
        <ImpactSection />
        <ContactSection />
        <ProjectModal />
      </AppContainer>
    </ProjectProvider>
  )
}

export default App