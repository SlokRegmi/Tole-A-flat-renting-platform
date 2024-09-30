import React from 'react';
import { Button } from './button';
import MapComponent from './map';
import ListingMapComponent from './listingdialogmap';
import Link from 'next/link';

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
    id: number;
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
    id
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
                className="bg-white rounded-xl shadow-lg  grid grid-cols-2 gap-4 w-[1224px] h-[693px] overflow-hidden "
                onClick={(e) => e.stopPropagation()} // Prevent click propagation to close modal when clicking inside
            >
                <div className='p-10 flex flex-col justify-between'>


                    <div>
                        <div className="mb-4">
                            <p className="text-gray-900 font-bold text-xl">Description</p>
                            <p className="text-gray-700">A charming traditional home in the hills of Nepal with stunning Himalayan views, wooden interiors, and a cozy veranda for enjoying peaceful mornings. Perfect for nature lovers seeking tranquility and cultural richness.</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-900 font-bold text-xl">Location</p>
                            <p className="text-gray-700">{title}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-900 font-bold text-xl">Price</p>
                            <p className="text-gray-700">NRs.1000 per month</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-900 font-bold text-xl">Negotiable</p>
                            <p className="text-gray-700">Yes</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-900 font-bold text-xl">Landlord details</p>
                            <p className="text-gray-700">Inap Maharjan</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-900 font-bold text-xl">Phone number</p>
                            <p className="text-gray-700">+977 9848439052</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-900 font-bold text-xl">Dimensions</p>
                            <p className="text-gray-700">1000 x 1000 x 1000 sqft</p>
                        </div>
                    </div>


                    <div className="mt-4 flex gap-4 items-center justify-center">
                    <Link href={`/payment?place_id=${id}`}>
                            <Button variant={"default"} className='w-[253px]'>Request Booking</Button>

                        </Link>
                        <Button variant={"secondary"} className='w-[253px]'>Message</Button>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full ">
                    {/* First 50% - Map */}
                    <div className="bg-gray-200 w-full h-1/2 flex items-center justify-center overflow-hidden">
                        <ListingMapComponent locations={locationData} />
                    </div>

                    {/* Second 50% - Images */}
                    <div className="h-1/2 w-full">
                        <div className="flex flex-wrap h-full">
                            {/* Photo 1 */}
                            <div className="w-1/2 h-[50%]  flex justify-center items-center">
                                <img src="https://picsum.photos/500/300" alt="Image 1" className="w-full h-full object-cover" />
                            </div>

                            {/* Photo 2 */}
                            <div className="w-1/2 h-[50%]  flex justify-center items-center">
                                <img src="https://picsum.photos/500/300" alt="Image 2" className="w-full h-full object-cover" />
                            </div>

                            {/* Photo 3 */}
                            <div className="w-1/2 h-[50%]  flex justify-center items-center">
                                <img src="https://picsum.photos/500/300" alt="Image 3" className="w-full h-full object-cover" />
                            </div>

                            {/* Photo 4 */}
                            <div className="w-1/2 h-[50%]  flex justify-center items-center">
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
