import { useRef, useState, useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useProject } from '../contexts/ProjectContext'

const Globe = () => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(null)
  const { projects, setSelectedProject } = useProject()
  
  // Create starry background with smaller, more subtle stars
  const stars = useMemo(() => {
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.015,  // Much smaller size
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    })

    const starVertices = []
    for(let i = 0; i < 15000; i++) {  // More stars
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100 
      const z = (Math.random() - 0.5) * 100
      // Add more stars closer to the globe
      const distance = Math.sqrt(x*x + y*y + z*z)
      if (distance > 20) {  // Only add stars beyond a certain distance
        starVertices.push(x, y, z)
      }
    }

    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    )

    return new THREE.Points(starGeometry, starMaterial)
  }, [])

  // Earth texture
  const texture = useTexture('/earth-texture.jpg', (texture) => {
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = true
    texture.anisotropy = 16
  })
  
  const projectMarkers = projects.map((project) => {
    const { latitude, longitude } = project.location
    const position = latLongToVector3(latitude, longitude, 5.2)
    
    return (
      <mesh
        key={project.id}
        position={position}
        onPointerOver={() => setHovered(project.id)}
        onPointerOut={() => setHovered(null)}
        onClick={() => setSelectedProject(project)}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={hovered === project.id ? '#ff4444' : '#ff0000'} 
          emissive={hovered === project.id ? '#ff4444' : '#000000'}
          emissiveIntensity={hovered === project.id ? 0.5 : 0}
        />
      </mesh>
    )
  })

  return (
    <group>
      {/* Add stars to scene */}
      <primitive object={stars} />
      
      <mesh ref={meshRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial 
          map={texture}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      {projectMarkers}
    </group>
  )
}

function latLongToVector3(lat, long, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (long + 180) * (Math.PI / 180)
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

export default Globe 