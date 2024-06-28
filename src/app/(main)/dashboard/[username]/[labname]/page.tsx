"use client"

import Filters from "@/app/(main)/_components/filters";
import Tasks from "@/app/(main)/_components/tasks";
import { useParams } from "next/navigation";
import React from "react"

const LabnamePage = () => {

  // const { labname } = useParams();
  const labname = "Gitnut";
  const options = ["To do","In Progress","Pending","Done","Quality Assurance"];

  return (
    <>
      {/* <div className="text-4xl text-purple-400">LabnamePage : {labname}</div> */}
      <Tasks labname={labname} />
      <div className="px-12 pb-2 gap-6 flex">
        <Filters  
          selectName="Status Filter"
          selectLabel="Select Status"
          options={options}
        />
        <Filters  
          selectName="Status"
          selectLabel="Select Status"
          options={options}
        />
        <Filters  
          selectName="Status"
          selectLabel="Select Status"
          options={options}
        />
        <Filters  
          selectName="Status"
          selectLabel="Select Status"
          options={options}
        />
      </div>
    </>
  )
}

export default LabnamePage;