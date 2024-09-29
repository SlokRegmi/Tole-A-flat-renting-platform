import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function LeftSide() {
  return (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-tr from-[#73A4C5] to-secondary text-white px-[5rem] py-[5rem] rounded-lg shadow-lg w-[635px] h-[635px] z-10">
      <div>
        <div className="mb-[2rem] space-y-[73px]">
          <Image src="/logo.png" alt="Tole Logo" width={101} height={90} />
          <h2 className="text-[48px]">We Are <span className='font-bold text-black '>Tole</span></h2>
        </div>
        <p className="text-white mb-[2rem] text-[20px]">
        Start your journey with us, where smarter renting makes life better!
        </p>
        <Button variant={"outline"} className='w-[160px] h-[48px] bg-transparent text-[24px] text-black border-black hover:bg-transparent hover:border-white hover:text-white'>
          Learn More
        </Button>
      </div>
    </div>
  );
};

