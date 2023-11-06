"use client";

import { useState, useEffect } from "react";
import ProgressModel from "@/components/modals/progress-model";

const ProgressProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProgressModel />
    </>
  );
};

export default ProgressProvider;
