import { House } from "lucide-react";
import Image from "next/image";

export default function LeftSide() {
  return (
    <div className="flex flex-col ml-6 sm:ml-8 lg:ml-[3rem] space-y-8 sm:space-y-12 lg:space-y-[5rem] ">
      <div className="flex space-x-4 sm:space-x-6 lg:space-x-[1rem] text-lg sm:text-xl lg:text-2xl items-center">
        <Image src="/logo.png" width={126} height={91} alt="logo" />
      </div>

      <div className="text-2xl sm:text-3xl lg:text-4xl leading-snug lg:leading-relaxed mr-8 sm:mr-12 lg:mr-[6rem]">
        <span>Start your journey with us, where smarter renting makes life better!</span>
      </div>

      <div className="flex items-center justify-center">
        <Image src="/signupillu.svg" width={500} height={400} alt="home" />
      </div>
    </div>
  );
}
