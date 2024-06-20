import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type InputFormProps = {
  triggerText? : string;
  boxDesc?     : string;
  boxTitle?    : string;
  cancelText?  : string;
  actionText?  : string;
}

const inputForm = ({
  triggerText,
  boxDesc,
  boxTitle,
  cancelText,
  actionText
}:InputFormProps) => {
  return (
    <AlertDialogTrigger>{triggerText}</AlertDialogTrigger>
  )
}

export default inputForm