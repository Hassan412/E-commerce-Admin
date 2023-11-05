"use client";

import { useStoredModel } from "@/hooks/use-store-model";
import { useEffect } from "react";

export default function SetupPage() {
  
  const onOpen = useStoredModel((state) => state.onOpen)
  const isOpen = useStoredModel((state) => state.isOpen)

  useEffect(()=>{
     if (!isOpen) {
      onOpen()
     }
  },[isOpen, onOpen])
  return null
}
