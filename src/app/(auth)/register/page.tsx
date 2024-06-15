"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const Register = () => {

  const [username, setUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceCallback(setUsername, 500);
  const router = useRouter();

  return (
    <div></div>
  )
}

export default Register;