import React, { ReactNode, useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LuLoader2 } from "react-icons/lu";

interface ModalProps{
  trigger: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  cancelLabel: string;
  children: ReactNode;
  onAction: () => void;
  loading?: boolean;
  onCancel?: () => void;
}

const Modal:React.FC<ModalProps> = ({
  trigger,
  title,
  description,
  actionLabel,
  cancelLabel,
  children,
  onAction,
  loading,
  onCancel
}) => {

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <div onClick={() => setIsDialogOpen(true)}>
          {trigger}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelLabel}
          </AlertDialogCancel>
          <div>
            <Button onClick={onAction} disabled={loading}>
              {loading ? (
                <>
                  <LuLoader2 className="mr-2 h-4 w-4 animate-spin" /> {actionLabel}
                </>
              ) : (
                actionLabel
              )}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;