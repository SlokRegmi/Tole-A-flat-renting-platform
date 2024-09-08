import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ListingModal from './listingdialog'; // Modal component

// Fix for marker icon issue in Leaflet (React apps often fail to load default icons correctly)
const DefaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

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
    <div className="w-full h-[500px] relative">
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
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[locations[0].lat, locations[0].lng]}
        />
      </MapContainer>
    </div>
  );
};

export default ListingMapComponent;
