"use client"

import React, { useState } from "react"
import { 
  FiChevronsDown,
  FiChevronsRight,
  FiMoreHorizontal
} from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { cn } from "@/lib/utils";

interface ItemProps{
  active? : boolean;
  expanded? : boolean;
  isSearch? : boolean;
  level? : number;
  onExpand? : () => void;
  label: string;
  onClick? : () => void;
  icon: IconType;
}

const Item:React.FC<ItemProps> = ({
  active,
  expanded,
  isSearch,
  level,
  onExpand,
  label,
  onClick,
  icon: Icon
}) => {

  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [labName, setLabname] = useState<string>("");

  const createLab = async () => {
    if(!labName) return;
    try{
      const res = await axios.post(`https://ethanol-09r4.onrender.com/api/v1/labs/createLabByName/${user?.userName}`,{"labName":labName})

      if(res.data.success === true){
        toast({
          title:"Success",
          description:"Project created Successfully"
        })
        setLabname("");
        if(!expanded){
          onExpand?.();
        }
      }
    }catch(err){
      toast({
        title:"Failed",
        description:"Error while Creating Project???",
        variant:"destructive"
      })
      setLabname("");
      return {"error":err}
    }
  }

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation(); // Prevent further event bubbling if needed

    try {
      await createLab();
    } catch (error) {
      console.error("Error in onCreate handler:", error);
      toast({
        title: "Error",
        description: "An error occurred during project creation.",
        variant: "destructive",
      });
    }
  };

  const ChevronIcon = expanded ? FiChevronsDown : FiChevronsRight;

  return (
    <div
      role="button"
      onClick={onClick}
      style={{paddingLeft: level ? `${(level * 12) + 12}px` : "12px"}}
      className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">  
          <span className="text-xs">
            ctrl
          </span>k
        </kbd>
      )}
      
    </div>
  )
}

export default Item;