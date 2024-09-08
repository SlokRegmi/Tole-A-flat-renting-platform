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

const defaultCenter = { lat: 27.6670869, lng: 85.3222305 }; // Lalitpur center

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        preferCanvas={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.lat, loc.lng]}
            eventHandlers={{ click: () => handleMarkerClick(loc) }}
          />
        ))}
      </MapContainer>

      {/* Modal Dialog */}
      <ListingModal
        isOpen={!!selectedLocation}
        onClose={handleCloseModal}
        title={selectedLocation?.name || ''}
        lat={selectedLocation ? selectedLocation.lat: 0}
        lng={selectedLocation ? selectedLocation.lng: 0}
      />
    </div>
  );
};

export default MapComponent;
