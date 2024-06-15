"use client"

import { useParams } from "next/navigation"
import React from "react"

const ProjectPage = () => {

  const { username } = useParams();

  return (
    <div className="flex items-center justify-center flex-col">
      <p className="text-4xl text-blue-800">Project Page</p>
      <span className="text-3xl text-purple-600">Welcome {username}</span>
    </div>
  )
}

export default ProjectPage;