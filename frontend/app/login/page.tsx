'use client'
import { ArrowLeft } from "lucide-react"; // Import an icon for the back arrow
import { useRouter } from "next/navigation"; // Use the Next.js router for navigation
import LeftSide from "@/components/login/leftside";
import RightSide from "@/components/login/rightside";

export default function LoginPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Navigates to the previous page in the browser history
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-secondary to-[#73A4C5] relative">
        {/* Back Arrow */}
        <button
          onClick={handleBack}
          className="absolute top-8 left-8 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </button>
        
        <div className="relative flex items-center justify-center">
          <LeftSide />
          <RightSide />
        </div>
      </div>
    </>
  );
}
