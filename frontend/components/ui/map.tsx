import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ListingModal from './listingdialog'; // Modal component

// Define secondary color (You can also use your Tailwind CSS secondary color class here)
const secondaryColor = '#385A71'; // Example secondary color, adjust this value based on your design

// Custom marker icon with secondary color using SVG and the color defined above
const CustomColoredMarker = L.divIcon({
  className: 'custom-marker',
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${secondaryColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M21 10c0 4.667-9 12-9 12S3 14.667 3 10a9 9 0 1 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

interface Location {
  name: string;
  lat: number;
  lng: number;
  id: number;
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
  console.log(locations)

  return (
    <>
      <div className="w-full h-full relative z-[96]">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          scrollWheelZoom={true}
          preferCanvas={true}
          className="w-full h-full rounded-xl"
        >
          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={[loc.lat, loc.lng]}
              icon={CustomColoredMarker} // Use the custom marker with secondary color
              eventHandlers={{ click: () => handleMarkerClick(loc) }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Modal Dialog */}
      <ListingModal
        isOpen={!!selectedLocation}
        onClose={handleCloseModal}
        title={selectedLocation?.name || ''}
        lat={selectedLocation ? selectedLocation.lat : 0}
        lng={selectedLocation ? selectedLocation.lng : 0}
        id={selectedLocation ? selectedLocation.id : 0}

      />
    </>
  );
};

export default MapComponent;