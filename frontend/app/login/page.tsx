
import LeftSide from "@/components/login/leftside";
import RightSide from "@/components/login/rightside";

export default function LoginPage(){
    return (
        <>
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="relative flex items-center justify-center">
        <LeftSide />
        <RightSide />
        </div>
        </div>
        </>
    )
}