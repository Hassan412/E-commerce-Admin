"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ModelProps {
  title: string;
  description: string;
  isOpen: boolean;
  onclose: () => void;
  children: React.ReactNode;
}

export const Model: React.FC<ModelProps> = ({
  title,
  description,
  isOpen,
  onclose,
  children,
}) => {
  const onchange = (open: boolean) => {
    if (!open) {
      onclose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onchange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <div>{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
