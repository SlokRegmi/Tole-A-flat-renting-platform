'use client'
import { ArrowLeft } from "lucide-react"; // Import the back arrow icon
import { useRouter } from "next/navigation"; // Use the Next.js router for navigation
import RightSide from '@/components/signup/rightside';
import LeftSide from '../../components/signup/leftside';

export default function SignupPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Navigates to the previous page in the browser history
  };

  return (
    <>
      <div className="relative flex w-full min-h-screen">
        {/* Back Arrow */}
        <button
          onClick={handleBack}
          className="absolute top-8 left-8 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </button>

        {/* Left Side */}
        <div className="w-[40%] bg-secondary pt-[8rem]">
          <LeftSide />
        </div>

        {/* Right Side */}
        <div className="w-[60%] flex flex-col justify-center items-center">
          <RightSide />
        </div>
      </div>
    </>
  );
}
