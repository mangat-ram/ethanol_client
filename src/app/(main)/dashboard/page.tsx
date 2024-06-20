"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiBookmarkPlus } from "react-icons/ci";
import React, { useState } from "react"
import { useUser } from "@/hooks/useUser";
import withAuth from "@/lib/withAuth";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const DashboardHome: React.FC = () => {

  const { user } = useUser();
  const { toast } = useToast();
  const [labname, setLabname] = useState<string>("");

  const submitLab = async () => {
    try {
      const res = await axios.post(`https://ethanol-09r4.onrender.com/api/v1/labs/createLabByName/${user?.userName}`,{"labName":labname})
      if(res.data.success === true){
        toast({
          title:"Success",
          description:"Project created Successfully"
        })
      }
    } catch (err:any) {
      console.log("error === ",err);
      toast({
          title:"Failed",
          description:"Error occurred During project cretion"
        })
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Image 
        
        src="/Questions-bro.png"
        height={300}
        width={300}
        alt="Dash Image"
        className=""
      />
      <h2>
        Welcome to {user?.name}&apos;s Ethanol
      </h2>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            className="flex items-center justify-between text-md "
          >
            <CiBookmarkPlus className="h-6 w-6 mr-2" />
            <span>Create A Project</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create A Project</AlertDialogTitle>
            <AlertDialogDescription>
              <span>
                write the name of the project you want to create.
              </span>
              <Input 
                placeholder="Your Project Name Here" 
                onChange={(e) => setLabname(e.target.value)} 
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={submitLab}
            >
              Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default withAuth(DashboardHome);