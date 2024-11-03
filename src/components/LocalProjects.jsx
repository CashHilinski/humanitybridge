import { useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Custom marker icon for local projects
const localMarkerIcon = new L.Icon({
  iconUrl: '/marker-local.png',  // We'll need to add this icon
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25]
})

// Sample combined data structure
const fetchLocalProjects = async (bounds) => {
  // OpenStreetMap Overpass API query for humanitarian locations
  const query = `
    [out:json][timeout:25];
    (
      node["social_facility"="food_bank"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      node["amenity"="social_facility"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      node["office"="ngo"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
    );
    out body;
    >;
    out skel qt;
  `

  const response = await fetch(`https://overpass-api.de/api/interpreter`, {
    method: 'POST',
    body: query
  })

  return await response.json()
}

function LocalProjects({ map }) {
  useEffect(() => {
    if (!map) return

    const updateMarkers = async () => {
      const bounds = map.getBounds()
      const projects = await fetchLocalProjects({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      })

      // Process and display markers
      // We'll implement this next
    }

    map.on('moveend', updateMarkers)
    updateMarkers()

    return () => {
      map.off('moveend', updateMarkers)
    }
  }, [map])

  return null
}

export default LocalProjects 