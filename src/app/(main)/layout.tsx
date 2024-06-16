"use client";

import { ChildrenType } from "@/interfaces"
import React from "react"
import Navigation from "./_components/navigation";

const MainLayout = ({children}: ChildrenType) => {

  // Loading Login pending

  return (
    <div className="h-full flex">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default MainLayout