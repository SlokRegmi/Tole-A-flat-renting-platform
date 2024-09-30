import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react'; // Import Lucide icon

// Custom Lucide marker icon
const CustomLucideMarker = L.divIcon({
  className: 'custom-lucide-marker',
  html: `<div style="color:#EED4A1; font-size: 40px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M21 10c0 4.667-9 12-9 12S3 14.667 3 10a9 9 0 1 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
  iconSize: [40, 40], // You can adjust the size as needed
  iconAnchor: [20, 40], // Adjust anchor to center the icon
  popupAnchor: [0, -40] // Popup anchor position
});

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations: Location[];  // Accept locations as a prop
}

const ListingMapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure that it runs on client side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent rendering on the server
  if (!isClient) {
    return null;
  }

  const defaultCenter = locations.length > 0
    ? { lat: locations[0].lat, lng: locations[0].lng }
    : { lat: 27.676916, lng: 85.3222305 }; // Fallback to Lalitpur if no locations are provided

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={false}
        dragging={false}  // Disable dragging
        touchZoom={false} // Disable touch zoom
        doubleClickZoom={false}  // Disable double-click zoom
        boxZoom={false}  // Disable box zoom
        keyboard={false} // Disable keyboard navigation
        className="w-full h-full"
        zoomControl={false} // Optionally hide zoom controls
      >
        {/* Dark mode Stadia Maps Tile Layer */}
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://stadiamaps.com">Stadia Maps</a>'
        />

        {/* Custom Lucide marker */}
        <Marker
          position={[locations[0].lat, locations[0].lng]}
          icon={CustomLucideMarker} // Use the custom Lucide icon for the marker
        />
      </MapContainer>
    </div>
  );
};

export default ListingMapComponent;