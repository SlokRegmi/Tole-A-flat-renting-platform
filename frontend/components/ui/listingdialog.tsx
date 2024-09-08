import React from 'react';
import { Button } from './button';
import MapComponent from './map';
import ListingMapComponent from './listingdialogmap';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    lat: number;
    lng: number;
    description?: string;
    location?: string;
    price?: string;
    landlordDetails?: {
        name: string;
        phone: string;
    };
    dimensions?: string;
    images?: string[];
}


const ListingModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    lat,
    lng,
    description,
    location,
    price,
    landlordDetails,
    dimensions,
    images,
}) => {
    if (!isOpen) return null; // Don't render anything if the modal is closed
    const locationData = [{ name: title, lat: lat, lng: lng }];

    
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] w-full"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg  grid grid-cols-2 gap-4 w-[1224px] h-[773px]"
                onClick={(e) => e.stopPropagation()} // Prevent click propagation to close modal when clicking inside
            >
                <div>
                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                    <p className="text-gray-700 mb-2">{description}</p>

                    <div className="mb-4">
                        <p className="text-gray-900 font-semibold">Location</p>
                        <p className="text-gray-700">{location}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-gray-900 font-semibold">Price</p>
                        <p className="text-gray-700">{price}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-gray-900 font-semibold">Negotiable</p>
                        <p className="text-gray-700">Yes</p>
                    </div>

                    {/* <div className="mb-4">
            <p className="text-gray-900 font-semibold">Landlord details</p>
            <p className="text-gray-700">Name: {landlordDetails.name}</p>
            <p className="text-gray-700">Phone number: {landlordDetails.phone}</p>
          </div> */}

                    <div className="mb-4">
                        <p className="text-gray-900 font-semibold">Dimensions</p>
                        <p className="text-gray-700">{dimensions}</p>
                    </div>

                    <div className="mt-4 flex gap-4">
                        <Button className='w-[253px] h-[40px]'
                        >
                            Request a tour
                        </Button>
                        <Button
                            variant={"secondary"} className='w-[253px] h-[40px]'>
                            Message
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <p className="text-gray-900 font-semibold mb-2">Map</p>
                    <div className="bg-gray-200 w-full h-[300px] mb-4 flex items-center justify-center overflow-hidden">
                    <ListingMapComponent locations={locationData} />
                    </div>

                    {/* <p className="text-gray-900 font-semibold mb-2">Images</p>
          <div className="grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Listing image ${index + 1}`} className="w-full h-32 object-cover rounded" />
            ))}
          </div> */}
                </div>
            </div>
        </div>
    );
};

export default ListingModal;
