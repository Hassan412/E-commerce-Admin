'use client';

import { useEffect, useState } from "react";
import { Model } from "../ui/model";
import { Button } from "../ui/button";

interface AlertModelProps {
    isOpen: boolean,
    onClose: () => void,
    onConform: () => void,
    loading: boolean
}

export const AlertModel: React.FC<AlertModelProps> = ({
    isOpen,
    onClose,
    onConform,
    loading
}) => {
    const [isMounted, SetIsMounted] = useState(false)

    useEffect(()=>{
        SetIsMounted(true)
    },[])
    if (!isMounted) {
        return null
    }


  return (

    <Model
    title="Are you sure?"
    description="This action cannot be undone."
    isOpen={isOpen}
    onclose={onClose}
    >
        <div className="pt-6 space-x-2 items-center flex justify-end w-full">
            <Button disabled={loading} variant={'outline'} onClick={onClose}>
                Cancel
            </Button>
            <Button disabled={loading} variant={'destructive'} onClick={onConform}>
                Continue
            </Button>
        </div>
    </Model>
  )
}

