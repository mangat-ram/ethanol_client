"use client"

import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons/lib";

type ItemsProps = {
  active? : boolean;
  isSearch? : boolean;
  level? : number;
  label: string;
  onClick? : () => void;
  bgColor? : string;
  textColor?: string;
  icon: IconType; 
}

const Items: React.FC<ItemsProps> = ({
  active,
  isSearch,
  label,
  onClick,
  bgColor,
  textColor,
  icon:Icon
}) => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className={cn(
        "w-full p-4 text-xl",
        bgColor || "bg-gray-100",
        textColor || "text-white"
      )}>
        <div
          role="button"
          onClick={onClick}
          className="p-2 text-sm font-light cursor-pointer "
        >
          <div
            className="flex items-center space-x-3 hover:text-red-100 transition-all duration-500 ease-in-out max-h-0 text-[1.08rem]"
          >
            <Icon size={16} className="-ml-[10px]" />
            <span className="">{label}</span>
          </div>
        </div>
    </div>
  )

}

export default Items;