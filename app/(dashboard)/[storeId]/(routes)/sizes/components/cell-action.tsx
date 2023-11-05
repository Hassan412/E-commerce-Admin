"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SizesColumn } from "./columns";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { AlertModel } from "@/components/modals/alert-model";

interface CellActionProps {
  data: SizesColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Size id copied to the clipboard");
  };
  const [loading, setLoading] = useState(false)
  const [open,setOpen] = useState(false)
  const router = useRouter();
  const params = useParams();
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
      router.refresh();
      toast.success("Size deleted.");
    } catch (error) {
      toast.error("Make sure you removed all categories using this size first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
    <AlertModel 
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConform={onDelete}
    loading={loading}
    />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setOpen(true)}>
          <Trash className="mr-2 h-4 w-4"/>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};
