import React, { ReactNode } from "react";
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
} from "~/components/ui/alert-dialog";

type AlertDialogProps = {
  trigger?: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  title: ReactNode;
  description: ReactNode;
  onConfirm: () => void;
  isActionDisabled: boolean;
};

function AlertDialogWrapper({
  trigger,
  setIsOpen,
  isOpen,
  description,
  title,
  isActionDisabled,
  onConfirm,
}: AlertDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isActionDisabled}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogWrapper;
