import { useRef, useState, useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const Globe = () => {
  const meshRef = useRef()
  
  // Create starry background
  const stars = useMemo(() => {
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.015,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    })

    const starVertices = []
    for(let i = 0; i < 15000; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100 
      const z = (Math.random() - 0.5) * 100
      const distance = Math.sqrt(x*x + y*y + z*z)
      if (distance > 20) {
        starVertices.push(x, y, z)
      }
    }

    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    )

    return new THREE.Points(starGeometry, starMaterial)
  }, [])

  // Earth texture with high quality settings
  const texture = useTexture('/earth-texture.jpg', (texture) => {
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = true
    texture.anisotropy = 16
  })
  
  return (
    <group>
      <primitive object={stars} />
      
      <mesh ref={meshRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial 
          map={texture}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
    </group>
  )
}

export default Globe 