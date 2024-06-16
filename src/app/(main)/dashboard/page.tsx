import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiBookmarkPlus } from "react-icons/ci";
import React from "react"

const DashboardHome = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Image 
        // src="/dashome.png"
        src="/Questions-bro.png"
        height={300}
        width={300}
        alt="Dash Image"
        className=""
      />
      <Button
        className="flex items-center justify-between text-md "
      >
        <CiBookmarkPlus className="h-6 w-6 mr-2" />
        <span>Create A Project</span>
      </Button>
    </div>
  )
}

export default DashboardHome;