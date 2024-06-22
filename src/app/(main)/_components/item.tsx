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

interface ItemProps{
  labname : string;
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
  labname,
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
    try{
      const res = await axios.post(`https://ethanol-09r4.onrender.com/api/v1/labs/createLabByName/${user?.userName}`,{"labName":labName})

      if(res.data.success === true){
        toast({
          title:"Success",
          description:"Project created Successfully"
        })
        setLabname("");
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

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    const res = createLab()
    console.log("res === ",res);
  }

  const ChevronIcon = expanded ? FiChevronsDown : FiChevronsRight;

  return (
    <div>item</div>
  )
}

export default Item;