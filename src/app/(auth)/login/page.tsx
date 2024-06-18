"use client";

import React from "react"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LuLoader2 } from 'react-icons/lu';
import { loginSchema } from "@/types";
import Link from "next/link";
import { Credentials } from "@/store/authSlice";
import { useUser } from "@/hooks/useUser";

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  const { toast } = useToast();
  const { login,status,error } = useUser()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      passWord: "",
    },
  });

  const submitLogin = async (credentials: Credentials) => {
    setIsSubmitting(true);
      try {
        await login(credentials);
        if(status === "success"){
          toast({
            title: "Success",
            description: "User Logged In Successfully!",
          });
          router.push("/dashboard")
        }else if(status === "failed"){
          throw new Error(error as any);
        }
        
      } catch (err) {
        console.error(err);
        toast({
          title: "Login Failed",
          description: "Error in Logging In User!",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
  };


  return (
      <div className="grainy font-cabinet flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-white/30 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 font-featureDeck">
              Join Ethanol Now
            </h1>
            <p className="mb-4">
              enter email and password to Sign In
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitLogin)} className="space-y-6">
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
                    </>) : ("SignIn")
                }
              </Button>
            </form>
          </Form>
          <span className="flex items-center justify-center">
            <p>
              New to Ethanol ?  
              <Link href="/register" className="text-blue-600 hover:text-blue-800">
                {" "}Register
              </Link>
            </p>
          </span>
        </div>
      </div>
  )
}

export default SignIn;