"use client";

import React from "react";
import { LuChevronsLeftRight } from "react-icons/lu";
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
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";

const UserItem = () => { 

  const { logout,user,status } = useUser();

  if(status === "loading"){
    return (
      <p>Loading...</p>
    )
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
                <AvatarImage src="/dashome.png" />
              </Avatar>
              <span className="text-start font-medium line-clamp-1">
                {user?.name}&apos;s Ethanol
              </span>
            </div>
            <LuChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4"/>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-80"
          align="start"
          alignOffset={11}
          forceMount
        >
          <div className="flex flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.email}
            </p>
            <div className="flex items-center gap-x-2">
              <div className="rounded-md bg-secondary p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/dashome.png" />
                </Avatar>
              </div>
              <div className="space-y-1">
                <p className="text-sm line-clamp-1">
                  {user?.name}&apos;s Ethanol
                </p>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
            <Button onClick={logout}>Log Out</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default UserItem;