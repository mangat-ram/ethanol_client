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
import { LuLoader2 } from "react-icons/lu";

const DashboardHome: React.FC = () => {

  const { user } = useUser();
  const { toast } = useToast();
  const [labname, setLabname] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const submitLab = async () => {
    if (!labname.trim()) {
      setWarning("Project name cannot be empty");
      return;
    }

    setLoading(true);
    setWarning("");

    try {
      const res = await axios.post(`https://ethanol-09r4.onrender.com/api/v1/labs/createLabByName/${user?.userName}`,{"labName":labname})
      if(res.data.success === true){
        toast({
          title:"Success",
          description:"Project created Successfully"
        })
        setLabname("");
      }
    } catch (err:any) {
      console.log("error === ",err);
      toast({
          title:"Failed",
          description:"Error occurred During project cretion"
        })
    }finally {
      setLoading(false);
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
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild >
          <Button
            className="flex items-center justify-between text-md"
            onClick={() => setIsDialogOpen(true)}
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
              {warning && <p className="text-red-500">{warning}</p>}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={submitLab} disabled={loading}>
                {loading ? (<>
                      <LuLoader2
                        className="mr-2 h-4 w-4 animate-spin" 
                      /> Creating...
                    </>) : ("Create")}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default withAuth(DashboardHome);