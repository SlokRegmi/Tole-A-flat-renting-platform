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
    im1: string;
    im2: string;
    im3: string;
    im4: string;
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
    im1,
    im2, im3, im4
}) => {
    if (!isOpen) return null; // Don't render anything if the modal is closed
    const locationData = [{ name: title, lat: lat, lng: lng }];

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] w-full transition-all duration-300 ${isOpen ? 'backdrop-blur-sm' : ''
                }`} // Add blur effect when modal is open
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-lg  grid grid-cols-2 gap-4 w-[1224px] h-[693px] overflow-hidden"
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

                    <div className="mb-4">
                        <p className="text-gray-900 font-semibold">Dimensions</p>
                        <p className="text-gray-700">{dimensions}</p>
                    </div>

                    <div className="mt-4 flex gap-4">
                        <Button className="w-[253px] h-[40px]">Request a tour</Button>
                        <Button variant={"secondary"} className="w-[253px] h-[40px]">
                            Message
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col w-full h-full bg-black">
                    {/* First 50% - Map */}
                    <div className="bg-gray-200 w-full h-1/2 flex items-center justify-center overflow-hidden">
                        <ListingMapComponent locations={locationData} />
                    </div>

                    {/* Second 50% - Images */}
                    <div className="h-1/2 w-full">
                        <div className="flex flex-wrap h-full">
                            {/* Photo 1 */}
                            <div className="w-1/2 h-[50%] bg-black flex justify-center items-center">
                                <img src={im1} alt="Image 1" className="w-full h-full object-cover" />
                            </div>

                            {/* Photo 2 */}
                            <div className="w-1/2 h-[50%] bg-red-500 flex justify-center items-center">
                                <img src={im2} alt="Image 2" className="w-full h-full object-cover" />
                            </div>

                            {/* Photo 3 */}
                            <div className="w-1/2 h-[50%] bg-green-500 flex justify-center items-center">
                                <img src={im3} alt="Image 3" className="w-full h-full object-cover" />
                            </div>

                            {/* Photo 4 */}
                            <div className="w-1/2 h-[50%] bg-blue-500 flex justify-center items-center">
                                <img src="https://picsum.photos/500/300" alt="Image 4" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ListingModal;
