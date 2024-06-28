"use client"

import { useParams } from "next/navigation";
import React from "react"

const LabnamePage = () => {

  const { labname } = useParams();

  return (
    <div className="text-4xl text-purple-400">LabnamePage : {labname}</div>
  )
}

export default LabnamePage;