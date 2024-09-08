'use client';

import MapComponent from "@/components/ui/map";
import Pill from "@/components/ui/pill";

export default function Home() {
  const locations = [
    { name: 'Lalitpur', lat: 27.6670869, lng: 85.3222305 },
    { name: 'Kirtipur', lat: 27.6763, lng: 85.2804 },
    { name: 'Mahalaxmi', lat: 27.6697, lng: 85.3393 },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-[156px] space-y-[59px]">
      <div className="relative w-full h-[80vh] px-[48px]">
        {/* Pill component is absolutely positioned inside this div */}
        <Pill />
        
        {/* MapComponent is the background */}
        <MapComponent
          locations={locations} // Pass the locations data
        />
      </div>
    </div>
  );
}
