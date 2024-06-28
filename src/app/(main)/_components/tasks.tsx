"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import React from "react";

interface TasksProps{
  labname:string | string[]
}

const Tasks = ({
  labname
}:TasksProps) => {

  const params = useParams();
  // const labname = "GitNut";

  return (
    <div>
      <p className="text-[3rem] mx-12 my-8">{labname}</p>
      <div className="flex gap-6 px-12">
        <Input placeholder="Search..." />
        <Button>Add New Task</Button>
      </div>
    </div>
  )
}

export default Tasks;