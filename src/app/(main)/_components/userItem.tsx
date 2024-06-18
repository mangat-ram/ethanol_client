"use client";

import React from "react";
import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

import { useParams } from "next/navigation";
import useUser from "@/hooks/useUser";

const UserItem = () => { 

  const { user,error } = useUser();
  if(error){
    if(error === "Unauthorized"){
      return (
        <div>Please login to see the content.</div>
      )
    }
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div 
            role="button"
            className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
          >
            <div className="gap-x-2 flex items-center max-w-[150px]">
              <Avatar className="h-5 w-5">
                <AvatarImage />
              </Avatar>
              <span>

                {/* Logic of the User will Come */}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
  )
}

export default UserItem;