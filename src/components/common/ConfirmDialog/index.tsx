"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogButton {
  label: string;
  onClick: () => void;
}

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  cancelButton: DialogButton;
  confirmButton: DialogButton;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelButton,
  confirmButton,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={cancelButton.onClick} className="cursor-pointer">
            {cancelButton.label}
          </Button>
          <Button
            className="bg-[#0290A4] hover:bg-[#0290A4]/90 text-white cursor-pointer"
            onClick={confirmButton.onClick}
          >
            {confirmButton.label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
