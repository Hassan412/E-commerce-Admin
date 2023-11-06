"use client";
import { useProgressModel } from "@/hooks/use-progress-model";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const ProgressModel = () => {
  const progressModel = useProgressModel();
  const [progress, setProgress] = useState(13);
  const paramName = useParams();
  useEffect(() => {
    if (progressModel.isOpen) {
      const timer = setTimeout(() => setProgress(66), 400);
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [paramName, progress]);

  useEffect(() => {
    if (progressModel.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [progressModel.isOpen]);

  return (
    <>
      {progressModel.isOpen === true && (
        <div
          className={cn(
            `absolute z-50 inset-0 h-full w-full bg-white dark:bg-background flex items-center justify-center`,
            progressModel.isOpen ? "overflow-hidden" : ""
          )}
        >
          <Progress
            value={progressModel.Url ? 100 : progress}
            className="w-[30%]"
          />
        </div>
      )}
    </>
  );
};

export default ProgressModel;
