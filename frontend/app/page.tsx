'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from "@/components/ui/map";
import Pill from "@/components/ui/pill";
import SearchBar from "@/components/ui/searchbar";

export default function Home() {
  const [locations, setLocations] = useState([]);  // Use state to hold locations
  const [loading, setLoading] = useState(true);    // Use loading state

  useEffect(() => {
    // Fetch locations from Django API
    axios.get('http://localhost:8000/api/places')
    .then(response => {
        setLocations(response.data); 
        setLoading(false);            // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error("There was an error fetching the locations!", error);
        setLoading(false);            // Set loading to false in case of error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Display loading state
  }

  return (
    <div className="w-full flex flex-col h-[110vh] items-center pt-[156px] space-y-[40px]">
      <div>
        <span className="font-bold text-[40px]">
          Rent Smarter, Live Better
        </span>
      </div>
      <SearchBar />

      <div className="relative w-full h-[708px] px-[48px] pb-10 ">
        {/* Pill component is absolutely positioned inside this div */}
        <Pill />

        {/* MapComponent is the background */}
        <MapComponent
          locations={locations} // Pass the fetched locations data to MapComponent
        />
      </div>
    </div>
  );
}