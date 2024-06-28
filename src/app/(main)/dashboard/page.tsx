"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiBookmarkPlus } from "react-icons/ci";
import React, { useState } from "react"
import { useUser } from "@/hooks/useUser";
import withAuth from "@/lib/withAuth";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { LuLoader2 } from "react-icons/lu";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";

const DashboardHome: React.FC = () => {

  const { user } = useUser();
  const { toast } = useToast();
  const [labname, setLabname] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const router = useRouter();

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
        router.push(`/dashboard/${user?.userName}/${labname}`);
        // setIsDialogOpen(true);
      }
    } catch (err:any) {
      console.log("error === ",err);
      toast({
          title:"Failed",
          description:"Error occurred During project creation",
          variant:"destructive"
        })
    }finally {
      setLoading(false);
    }
  }

  const clearWarning = () => {
    setIsDialogOpen(false);
    setWarning("");
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
      <Modal
        trigger={
          <Button className="flex items-center justify-between text-md">
            <CiBookmarkPlus className="h-6 w-6 mr-2" />
            <span>Create A Project</span>
          </Button>
        }
        title="Create A Project"
        description="Write the name of the project you want to create."
        actionLabel="Create"
        cancelLabel="Cancel"
        onAction={submitLab}
        loading={loading}
        onCancel={clearWarning}
      >
        <Input
          placeholder="Your Project Name Here"
          value={labname}
          onChange={(e) => setLabname(e.target.value)}
        />
        {warning && <p className="text-red-500">{warning}</p>}
      </Modal>
    </div>
  )
}

export default withAuth(DashboardHome);