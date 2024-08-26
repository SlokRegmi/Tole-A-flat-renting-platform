import React from 'react';

export default function LeftSide() {
  return (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-[5rem] py-[5rem] rounded-lg shadow-lg w-[35rem] h-[35rem] z-10">
      <div>
        <div className="mb-[1rem]">
          <div className="w-12 h-12 rounded-full bg-white/20 mb-4"></div>
          <h2 className="text-4xl font-bold">We Are Name</h2>
        </div>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy eirmod tempor invidunt ut.
        </p>
      </div>
    </div>
  );
};

