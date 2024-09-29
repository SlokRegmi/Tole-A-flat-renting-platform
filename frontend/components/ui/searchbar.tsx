import React from 'react';
import { Input } from './input'; // shadcn Input component
import { Button } from './button'; // shadcn Button component
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex items-center max-w-lg rounded-full w-[695px] h-[52px] ">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search an area, city or location...."
        className="flex placeholder:text-black py-2 pl-4 rounded-l-full  focus:border-none focus:outline-none border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-secondary"
      />
      {/* Search Button with Icon */}
      <Button
        variant="ghost"
        className="flex items-center justify-center px-4 py-2 rounded-r-full hover:bg-secondary focus:outline-none bg-secondary"
      >
        <Search />
      </Button>
    </div>
  );
};

export default SearchBar;
