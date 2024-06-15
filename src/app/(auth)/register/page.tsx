"use client";

import { registerSchema } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuLoader2 } from "react-icons/lu";
import Link from "next/link";

const Register = () => {

  const [username, setUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceCallback(setUsername, 500);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      name: "",
      email: "",
      passWord:""
    }
  })

    useEffect(() => {
    const checkUsernameUni = async () => {
      if(username){
        setIsCheckingUser(true)
        setUsernameMsg("")
        try {
          const res = await axios.get(`https://ethanol-09r4.onrender.com/api/v1/users/checkUniqueUser/${username}`)
          setUsernameMsg(res.data.message);
        } catch (error) {
          console.log("Error in catch Part useEffect:", error);
          toast({
            title:"Sign Up Failed",
            description:"Error in catch Part useEffect checking unique user.",
            variant:"destructive"
          })
        } finally {
          setIsCheckingUser(false);
        }
      } else {
        setUsernameMsg("");
      }
    }
    checkUsernameUni(); 
  },[username,toast]);

  const submitRegister = async (data: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`https://ethanol-09r4.onrender.com/api/v1/users/register`, data);
      toast({
        title:"Success",
        description:res.data.message
      })
      router.replace(`/verifyEmail/${username}`)
    } catch (error) {
      toast({
          title:"Sign Up Failed",
          description:"Error in Registering User!",
          variant:"destructive"
      })
    }
  }

  return (
    <div className="grainy font-cabinet flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white/50 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 font-featureDeck">
              Join Ethanol Now
            </h1>
            <p className="mb-4">
              register yourself
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitRegister)} className="space-y-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your username here" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          debouncedUsername(e.target.value)
                        }}
                      />
                    </FormControl>
                    {isCheckingUser && <LuLoader2 className="animate-spin" />}
                    <p className={`text-sm font-bold ${usernameMsg === "Username is available." ? 'text-green-500' : 'text-red-600'}`}>{usernameMsg}</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your fullname here" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your email here" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passWord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="password" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {
                    isSubmitting ? (<>
                      <LuLoader2 
                        className="mr-2 h-4 w-4 animate-spin" 
                      /> Please wait
                    </>) : ("SignUp")
                }
              </Button>
            </form>
          </Form>
        <span className="flex items-center justify-center">
          <p>Already a User ? 
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>
          </p>
        </span>
        </div>
      </div>
  )
}

export default Register;