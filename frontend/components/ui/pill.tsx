import { Clipboard, TrendingUp } from "lucide-react";
import { Button } from "./button";
import { Separator } from "./separator";

const Pill: React.FC = () => {
    return (
        <div 
            className="absolute top-[16px] right-[80px] flex space-x-[24px] items-center justify-center rounded-[8px] w-[332px] h-[80px] shadow-[0_4px_24px_rgba(0,0,0,0.25)] z-[1000] bg-white" >
            
            <Button variant={"secondary"} className="flex space-x-[8px] py-[12px] px-[16px] w-[148px] h-[48px] items-center justify-center ">
                <span className="text-[16px]">Recents</span>
                <TrendingUp className="w-[16px] h-[16px]"/>
            </Button>

            <Button className="flex space-x-[8px] py-[12px] px-[16px] w-[121px] h-[48px] items-center justify-center ">
                <span className="text-[16px]">Filter</span>
                <Clipboard className="w-[16px] h-[16px]"/>
            </Button>
        </div>
    );
};

export default Pill;
