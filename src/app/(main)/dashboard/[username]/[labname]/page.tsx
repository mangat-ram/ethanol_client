"use client"

import Tasks from "@/app/(main)/_components/tasks";
import { useParams } from "next/navigation";
import React from "react"

const LabnamePage = () => {

  // const { labname } = useParams();
  const labname = "Gitnut";

  return (
    <>
      {/* <div className="text-4xl text-purple-400">LabnamePage : {labname}</div> */}
      <Tasks labname={labname} />
    </>
  )
}

export default LabnamePage;